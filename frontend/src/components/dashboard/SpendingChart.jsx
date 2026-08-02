
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

import api from "../../services/api";

const SpendingChart = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // ==========================================
  // FETCH TRANSACTIONS
  // ==========================================

  useEffect(() => {
    let mounted = true;

    const fetchTransactions = async () => {
      try {
        if (mounted) {
          setLoading(true);
          setError(false);
        }

        const token = localStorage.getItem("token");

        if (!token) {
          if (mounted) {
            setTransactions([]);
            setLoading(false);
          }

          return;
        }

        const response = await api.get("/transactions");

        if (!mounted) {
          return;
        }

        const responseData = response?.data;

        if (!responseData?.success) {
          setTransactions([]);
          setError(true);
          return;
        }

        const data = Array.isArray(responseData?.data)
          ? responseData.data
          : [];

        setTransactions(data);
      } catch (err) {
        console.error(
          "SPENDING CHART TRANSACTION ERROR:",
          err?.response?.data || err?.message || err
        );

        if (mounted) {
          setTransactions([]);
          setError(true);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchTransactions();

    // Refresh chart whenever dashboard transaction/account
    // data is updated.
    const handleDashboardUpdate = () => {
      fetchTransactions();
    };

    window.addEventListener(
      "dashboardUpdated",
      handleDashboardUpdate
    );

    return () => {
      mounted = false;

      window.removeEventListener(
        "dashboardUpdated",
        handleDashboardUpdate
      );
    };
  }, []);

  // ==========================================
  // BUILD LAST 6 MONTHS DATA
  // ==========================================

  const data = useMemo(() => {
    const now = new Date();

    const months = [];

    for (let index = 5; index >= 0; index -= 1) {
      const date = new Date(
        now.getFullYear(),
        now.getMonth() - index,
        1
      );

      months.push({
        year: date.getFullYear(),
        monthIndex: date.getMonth(),
        month: date.toLocaleDateString("en-IN", {
          month: "short",
        }),
        income: 0,
        expense: 0,
      });
    }

    // ==========================================
    // COLLECT USER ACCOUNT NUMBERS
    // ==========================================

    const userAccountNumbers = new Set();

    transactions.forEach((transaction) => {
      const sourceAccountNumber =
        transaction?.sourceAccount?.accountNumber ||
        transaction?.sourceAccountNumber ||
        transaction?.fromAccount?.accountNumber ||
        transaction?.fromAccountNumber ||
        null;

      const destinationAccountNumber =
        transaction?.destinationAccount?.accountNumber ||
        transaction?.destinationAccountNumber ||
        transaction?.toAccount?.accountNumber ||
        transaction?.toAccountNumber ||
        null;

      if (sourceAccountNumber) {
        userAccountNumbers.add(
          String(sourceAccountNumber)
        );
      }

      if (destinationAccountNumber) {
        userAccountNumbers.add(
          String(destinationAccountNumber)
        );
      }
    });

    // ==========================================
    // CLASSIFY TRANSACTIONS
    // ==========================================

    transactions.forEach((transaction) => {
      const amount = Number(transaction?.amount ?? 0);

      if (!Number.isFinite(amount) || amount <= 0) {
        return;
      }

      const dateValue =
        transaction?.createdAt ||
        transaction?.date ||
        transaction?.timestamp ||
        transaction?.transactionDate;

      if (!dateValue) {
        return;
      }

      const transactionDate = new Date(dateValue);

      if (Number.isNaN(transactionDate.getTime())) {
        return;
      }

      const type = String(
        transaction?.type ||
          transaction?.transactionType ||
          ""
      ).toUpperCase();

      const sourceAccountNumber =
        transaction?.sourceAccount?.accountNumber ||
        transaction?.sourceAccountNumber ||
        transaction?.fromAccount?.accountNumber ||
        transaction?.fromAccountNumber ||
        null;

      const destinationAccountNumber =
        transaction?.destinationAccount?.accountNumber ||
        transaction?.destinationAccountNumber ||
        transaction?.toAccount?.accountNumber ||
        transaction?.toAccountNumber ||
        null;

      const normalizedSourceAccount =
        sourceAccountNumber
          ? String(sourceAccountNumber)
          : null;

      const normalizedDestinationAccount =
        destinationAccountNumber
          ? String(destinationAccountNumber)
          : null;

      const isSourceAccount =
        normalizedSourceAccount
          ? userAccountNumbers.has(
              normalizedSourceAccount
            )
          : false;

      const isDestinationAccount =
        normalizedDestinationAccount
          ? userAccountNumbers.has(
              normalizedDestinationAccount
            )
          : false;

      let income = false;
      let expense = false;

      // ==========================================
      // INCOME TRANSACTIONS
      // ==========================================

      if (
        type === "DEPOSIT" ||
        type === "CREDIT" ||
        type === "TRANSFER_IN"
      ) {
        income = true;
      }

      // ==========================================
      // EXPENSE TRANSACTIONS
      // ==========================================

      if (
        type === "WITHDRAW" ||
        type === "WITHDRAWAL" ||
        type === "DEBIT" ||
        type === "TRANSFER_OUT"
      ) {
        expense = true;
      }

      // ==========================================
      // TRANSFER TRANSACTIONS
      // ==========================================

      if (type === "TRANSFER") {
        if (
          isDestinationAccount &&
          !isSourceAccount
        ) {
          income = true;
          expense = false;
        } else if (
          isSourceAccount &&
          !isDestinationAccount
        ) {
          expense = true;
          income = false;
        }
      }

      // ==========================================
      // FIND MATCHING MONTH
      // ==========================================

      const matchingMonth = months.find(
        (item) =>
          item.year === transactionDate.getFullYear() &&
          item.monthIndex === transactionDate.getMonth()
      );

      if (!matchingMonth) {
        return;
      }

      if (income) {
        matchingMonth.income += amount;
      }

      if (expense) {
        matchingMonth.expense += amount;
      }
    });

    return months;
  }, [transactions]);

  // ==========================================
  // AVERAGE INCOME
  // ==========================================

  const averageIncome = useMemo(() => {
    if (!data.length) {
      return 0;
    }

    return Math.round(
      data.reduce(
        (sum, item) => sum + item.income,
        0
      ) / data.length
    );
  }, [data]);

  // ==========================================
  // AVERAGE EXPENSE
  // ==========================================

  const averageExpense = useMemo(() => {
    if (!data.length) {
      return 0;
    }

    return Math.round(
      data.reduce(
        (sum, item) => sum + item.expense,
        0
      ) / data.length
    );
  }, [data]);

  // ==========================================
  // CURRENT YEAR
  // ==========================================

  const chartYear = new Date().getFullYear();

  // ==========================================
  // AI INSIGHT
  // ==========================================

  const aiInsight = useMemo(() => {
    const totalIncome = data.reduce(
      (sum, item) => sum + item.income,
      0
    );

    const totalExpense = data.reduce(
      (sum, item) => sum + item.expense,
      0
    );

    if (loading) {
      return "Analyzing your recent financial activity...";
    }

    if (error) {
      return "Unable to analyze your financial activity right now.";
    }

    if (!transactions.length) {
      return "Your financial insight will appear once transaction activity is available.";
    }

    if (totalIncome > totalExpense) {
      return "Your income is currently higher than your expenses. Maintaining this balance could help strengthen your monthly savings.";
    }

    if (totalExpense > totalIncome) {
      return "Your recent expenses are higher than your income. Reviewing discretionary spending could help improve your monthly cash flow.";
    }

    return "Your income and expenses are currently balanced. Continue monitoring your spending to maintain healthy cash flow.";
  }, [data, loading, error, transactions.length]);

  // ==========================================
  // CURRENCY FORMATTER
  // ==========================================

  const formatCurrency = (value) => {
    return `₹${Number(value || 0).toLocaleString(
      "en-IN"
    )}`;
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-white/[0.09]
        bg-white/[0.045]
        p-5
        text-white
        shadow-2xl
        shadow-black/20
        backdrop-blur-2xl
        transition-all
        duration-500
        hover:border-cyan-400/20
        hover:bg-white/[0.055]
        sm:p-6
      "
    >
      {/* =========================================
          AMBIENT GLOW
      ========================================= */}

      <div
        className="
          pointer-events-none
          absolute
          -right-24
          -top-24
          h-56
          w-56
          rounded-full
          bg-blue-500/10
          blur-[70px]
          transition-all
          duration-700
          group-hover:scale-125
          group-hover:bg-cyan-400/10
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-28
          -left-28
          h-56
          w-56
          rounded-full
          bg-cyan-500/[0.06]
          blur-[70px]
        "
      />

      {/* =========================================
          TOP HIGHLIGHT
      ========================================= */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-px
          w-[70%]
          -translate-x-1/2
          bg-gradient-to-r
          from-transparent
          via-cyan-400/30
          to-transparent
        "
      />

      {/* =========================================
          HEADER
      ========================================= */}

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/60" />

            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-400">
              Financial Analytics
            </p>
          </div>

          <h2 className="mt-2 text-xl font-bold tracking-tight text-white sm:text-2xl">
            Spending Analytics
          </h2>

          <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
            Track your income and expenses over time.
          </p>
        </div>

        <div
          className="
            flex
            w-fit
            shrink-0
            items-center
            gap-2
            rounded-full
            border
            border-cyan-400/15
            bg-cyan-400/[0.07]
            px-3.5
            py-2
          "
        >
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />

          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-cyan-300">
            {chartYear}
          </span>
        </div>
      </div>

      {/* =========================================
          SUMMARY
      ========================================= */}

      <div className="relative mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">

        {/* AVERAGE INCOME */}

        <div
          className="
            group/stat
            rounded-2xl
            border
            border-emerald-400/10
            bg-emerald-400/[0.045]
            p-4
            transition
            duration-300
            hover:border-emerald-400/20
            hover:bg-emerald-400/[0.07]
          "
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50" />

              <span className="text-[11px] font-medium text-slate-400">
                Average Income
              </span>
            </div>

            <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-400">
              Income
            </span>
          </div>

          <p className="mt-3 text-xl font-bold tracking-tight text-white">
            {loading || error
              ? "—"
              : formatCurrency(averageIncome)}
          </p>
        </div>

        {/* AVERAGE EXPENSE */}

        <div
          className="
            group/stat
            rounded-2xl
            border
            border-red-400/10
            bg-red-400/[0.045]
            p-4
            transition
            duration-300
            hover:border-red-400/20
            hover:bg-red-400/[0.07]
          "
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-400 shadow-lg shadow-red-400/50" />

              <span className="text-[11px] font-medium text-slate-400">
                Average Expense
              </span>
            </div>

            <span className="text-[9px] font-bold uppercase tracking-wider text-red-400">
              Expense
            </span>
          </div>

          <p className="mt-3 text-xl font-bold tracking-tight text-white">
            {loading || error
              ? "—"
              : formatCurrency(averageExpense)}
          </p>
        </div>
      </div>

      {/* =========================================
          CHART
      ========================================= */}

      <div className="relative mt-7 h-[280px] w-full sm:h-[320px]">

        {loading ? (
          <div className="flex h-full flex-col items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-400/20 border-t-cyan-400" />

            <p className="mt-4 text-xs font-medium text-slate-500">
              Loading financial analytics...
            </p>
          </div>
        ) : error ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-400/10 bg-red-400/[0.06]">
              <span className="text-lg text-red-400">
                !
              </span>
            </div>

            <p className="mt-4 text-sm font-semibold text-slate-400">
              Unable to load analytics
            </p>

            <p className="mt-1 max-w-xs text-xs leading-5 text-slate-600">
              Financial analytics will be available when
              transaction data can be loaded.
            </p>
          </div>
        ) : (
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart
              data={data}
              barGap={7}
              barCategoryGap="22%"
              margin={{
                top: 10,
                right: 4,
                left: -18,
                bottom: 10,
              }}
            >
              <CartesianGrid
                strokeDasharray="4 5"
                stroke="rgba(255,255,255,0.06)"
                vertical={false}
              />

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#64748b",
                  fontSize: 11,
                  fontWeight: 500,
                }}
                dy={8}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                width={48}
                tick={{
                  fill: "#64748b",
                  fontSize: 10,
                }}
                tickFormatter={(value) => {
                  if (value >= 1000) {
                    return `₹${value / 1000}k`;
                  }

                  return `₹${value}`;
                }}
              />

              <Tooltip
                cursor={{
                  fill: "rgba(255,255,255,0.025)",
                }}
                contentStyle={{
                  background: "rgba(2, 6, 23, 0.96)",
                  border:
                    "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "16px",
                  color: "#fff",
                  boxShadow:
                    "0 20px 50px rgba(0,0,0,0.45)",
                  padding: "12px 14px",
                }}
                labelStyle={{
                  color: "#22d3ee",
                  fontWeight: 700,
                  marginBottom: "8px",
                }}
                itemStyle={{
                  color: "#e2e8f0",
                  fontSize: "12px",
                }}
                formatter={(value, name) => [
                  formatCurrency(value),
                  name,
                ]}
              />

              <Legend
                verticalAlign="bottom"
                height={32}
                iconType="circle"
                iconSize={7}
                wrapperStyle={{
                  paddingTop: "16px",
                  fontSize: "11px",
                  color: "#94a3b8",
                }}
              />

              <Bar
                dataKey="income"
                name="Income"
                fill="#22c55e"
                radius={[7, 7, 2, 2]}
                animationDuration={1200}
                maxBarSize={30}
              />

              <Bar
                dataKey="expense"
                name="Expense"
                fill="#ef4444"
                radius={[7, 7, 2, 2]}
                animationDuration={1200}
                maxBarSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* =========================================
          NO TRANSACTION NOTICE
      ========================================= */}

      {!loading &&
        !error &&
        transactions.length === 0 && (
          <div className="relative mt-2 rounded-xl border border-white/[0.06] bg-white/[0.025] px-4 py-3 text-center">
            <p className="text-[11px] leading-5 text-slate-600">
              No transaction activity is available yet.
              Your analytics will update automatically
              after your first transaction.
            </p>
          </div>
        )}

      {/* =========================================
          AI INSIGHT
      ========================================= */}

      <motion.div
        whileHover={{
          y: -2,
        }}
        className="
          relative
          mt-5
          overflow-hidden
          rounded-2xl
          border
          border-cyan-400/15
          bg-gradient-to-br
          from-blue-500/[0.09]
          via-cyan-500/[0.04]
          to-transparent
          p-4
          transition-all
          duration-300
          hover:border-cyan-400/25
        "
      >
        <div
          className="
            pointer-events-none
            absolute
            -right-10
            -top-10
            h-24
            w-24
            rounded-full
            bg-cyan-400/10
            blur-3xl
          "
        />

        <div className="relative flex items-center gap-2.5">
          <div
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              border-cyan-400/15
              bg-cyan-400/10
            "
          >
            <span className="text-sm">
              🤖
            </span>
          </div>

          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-cyan-400">
              Smart Intelligence
            </p>

            <p className="mt-0.5 text-sm font-semibold text-white">
              AI Financial Insight
            </p>
          </div>
        </div>

        <p className="relative mt-3 text-xs leading-6 text-slate-400 sm:text-sm">
          {aiInsight}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default SpendingChart;

