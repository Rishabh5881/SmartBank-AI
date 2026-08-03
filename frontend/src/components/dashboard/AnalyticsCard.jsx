import { motion } from "framer-motion";

import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Activity,
} from "lucide-react";

import { useEffect, useMemo, useState } from "react";

import api from "../../services/api";

const AnalyticsCard = () => {
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
          "ANALYTICS CARD TRANSACTION ERROR:",
          err?.response?.data ||
            err?.message ||
            err
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
  // GET USER ACCOUNT NUMBERS
  // ==========================================

  const userAccountNumbers = useMemo(() => {
    const accountNumbers = new Set();

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
        accountNumbers.add(
          String(sourceAccountNumber)
        );
      }

      if (destinationAccountNumber) {
        accountNumbers.add(
          String(destinationAccountNumber)
        );
      }
    });

    return accountNumbers;
  }, [transactions]);

  // ==========================================
  // TRANSACTION CLASSIFIER
  // ==========================================

  const classifyTransaction = (transaction) => {
    const amount = Number(
      transaction?.amount ?? 0
    );

    if (!Number.isFinite(amount) || amount <= 0) {
      return {
        income: 0,
        expense: 0,
      };
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

    let income = 0;
    let expense = 0;

    // ==========================================
    // INCOME
    // ==========================================

    if (
      type === "DEPOSIT" ||
      type === "CREDIT" ||
      type === "TRANSFER_IN"
    ) {
      income = amount;
    }

    // ==========================================
    // EXPENSE
    // ==========================================

    if (
      type === "WITHDRAW" ||
      type === "WITHDRAWAL" ||
      type === "DEBIT" ||
      type === "TRANSFER_OUT"
    ) {
      expense = amount;
    }

    // ==========================================
    // TRANSFER
    // ==========================================

    if (type === "TRANSFER") {
      if (
        isDestinationAccount &&
        !isSourceAccount
      ) {
        income = amount;
        expense = 0;
      } else if (
        isSourceAccount &&
        !isDestinationAccount
      ) {
        expense = amount;
        income = 0;
      }
    }

    return {
      income,
      expense,
    };
  };

  // ==========================================
  // CURRENT + PREVIOUS MONTH ANALYTICS
  // ==========================================

  const analyticsData = useMemo(() => {
    const now = new Date();

    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    const previousMonthDate = new Date(
      currentYear,
      currentMonth - 1,
      1
    );

    const previousYear =
      previousMonthDate.getFullYear();

    const previousMonth =
      previousMonthDate.getMonth();

    let currentIncome = 0;
    let currentExpense = 0;

    let previousIncome = 0;
    let previousExpense = 0;

    transactions.forEach((transaction) => {
      const dateValue =
        transaction?.createdAt ||
        transaction?.date ||
        transaction?.timestamp ||
        transaction?.transactionDate;

      if (!dateValue) {
        return;
      }

      const transactionDate = new Date(dateValue);

      if (
        Number.isNaN(
          transactionDate.getTime()
        )
      ) {
        return;
      }

      const {
        income,
        expense,
      } = classifyTransaction(transaction);

      const transactionYear =
        transactionDate.getFullYear();

      const transactionMonth =
        transactionDate.getMonth();

      if (
        transactionYear === currentYear &&
        transactionMonth === currentMonth
      ) {
        currentIncome += income;
        currentExpense += expense;
      }

      if (
        transactionYear === previousYear &&
        transactionMonth === previousMonth
      ) {
        previousIncome += income;
        previousExpense += expense;
      }
    });

    const currentSavings =
      currentIncome - currentExpense;

    const previousSavings =
      previousIncome - previousExpense;

    const calculateChange = (
      currentValue,
      previousValue
    ) => {
      if (
        previousValue === 0 &&
        currentValue === 0
      ) {
        return 0;
      }

      if (previousValue === 0) {
        return 100;
      }

      return (
        ((currentValue - previousValue) /
          Math.abs(previousValue)) *
        100
      );
    };

    const incomeChange = calculateChange(
      currentIncome,
      previousIncome
    );

    const expenseChange = calculateChange(
      currentExpense,
      previousExpense
    );

    const savingsChange = calculateChange(
      currentSavings,
      previousSavings
    );

    const savingsRate =
      currentIncome > 0
        ? Math.max(
            0,
            (currentSavings / currentIncome) *
              100
          )
        : 0;

    return {
      currentIncome,
      currentExpense,
      currentSavings,
      previousIncome,
      previousExpense,
      previousSavings,
      incomeChange,
      expenseChange,
      savingsChange,
      savingsRate,
    };
  }, [
    transactions,
    userAccountNumbers,
  ]);

  // ==========================================
  // CURRENCY FORMATTER
  // ==========================================

  const formatCurrency = (value) => {
    return `₹${Number(
      value || 0
    ).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    })}`;
  };

  // ==========================================
  // PERCENTAGE FORMATTER
  // ==========================================

  const formatPercentage = (value) => {
    const numericValue = Number(value) || 0;

    return `${numericValue >= 0 ? "+" : ""}${numericValue.toFixed(
      1
    )}%`;
  };

  // ==========================================
  // ANALYTICS
  // ==========================================

  const analytics = [
    {
      title: "Income",
      value: formatCurrency(
        analyticsData.currentIncome
      ),
      change: formatPercentage(
        analyticsData.incomeChange
      ),
      positive:
        analyticsData.incomeChange >= 0,
      icon: TrendingUp,
      description: "vs last month",
    },

    {
      title: "Expenses",
      value: formatCurrency(
        analyticsData.currentExpense
      ),
      change: formatPercentage(
        analyticsData.expenseChange
      ),
      positive:
        analyticsData.expenseChange <= 0,
      icon: TrendingDown,
      description: "vs last month",
    },

    {
      title: "Savings",
      value: formatCurrency(
        analyticsData.currentSavings
      ),
      change: formatPercentage(
        analyticsData.savingsChange
      ),
      positive:
        analyticsData.savingsChange >= 0,
      icon: Activity,
      description: "this month",
    },
  ];

  // ==========================================
  // SAVINGS RATE
  // ==========================================

  const savingsRate = Math.min(
    100,
    Math.max(
      0,
      analyticsData.savingsRate
    )
  );

  const targetRate = 70;

  const isAboveTarget =
    savingsRate >= targetRate;

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-white/10
        p-6
        text-white
        backdrop-blur-xl
      "
    >
      {/* Background Glow */}

      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-48
          w-48
          rounded-full
          bg-cyan-500/10
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-20
          -left-20
          h-48
          w-48
          rounded-full
          bg-blue-600/10
          blur-3xl
        "
      />

      <div className="relative z-10">

        {/* Header */}

        <div
          className="
            flex
            items-center
            justify-between
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                bg-cyan-400/10
                text-cyan-400
              "
            >
              <BarChart3 size={24} />
            </div>

            <div>
              <h2
                className="
                  text-xl
                  font-bold
                "
              >
                Financial Analytics
              </h2>

              <p
                className="
                  mt-1
                  text-sm
                  text-slate-400
                "
              >
                Monthly financial performance
              </p>
            </div>
          </div>

          <div
            className="
              rounded-full
              border
              border-cyan-400/20
              bg-cyan-400/10
              px-3
              py-1.5
              text-xs
              font-semibold
              text-cyan-400
            "
          >
            This Month
          </div>
        </div>

        {/* Main Analytics */}

        <div
          className="
            mt-7
            grid
            gap-4
            md:grid-cols-3
          "
        >
          {analytics.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                whileHover={{
                  y: -4,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  p-4
                "
              >
                <div
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >
                  <div
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-xl
                      bg-white/10
                      text-cyan-400
                    "
                  >
                    <Icon size={18} />
                  </div>

                  <span
                    className={`
                      rounded-full
                      px-2
                      py-1
                      text-xs
                      font-semibold
                      ${
                        item.positive
                          ? "bg-green-500/10 text-green-400"
                          : "bg-red-500/10 text-red-400"
                      }
                    `}
                  >
                    {loading || error
                      ? "—"
                      : item.change}
                  </span>
                </div>

                <p
                  className="
                    mt-4
                    text-sm
                    text-slate-400
                  "
                >
                  {item.title}
                </p>

                <h3
                  className="
                    mt-1
                    text-2xl
                    font-bold
                  "
                >
                  {loading || error
                    ? "—"
                    : item.value}
                </h3>

                <p
                  className="
                    mt-1
                    text-xs
                    text-slate-500
                  "
                >
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Spending Overview */}

        <div
          className="
            mt-6
            rounded-2xl
            border
            border-white/10
            bg-slate-950/30
            p-5
          "
        >
          <div
            className="
              mb-4
              flex
              items-center
              justify-between
            "
          >
            <div>
              <p
                className="
                  text-sm
                  text-slate-400
                "
              >
                Savings Rate
              </p>

              <h3
                className="
                  mt-1
                  text-2xl
                  font-bold
                "
              >
                {loading || error
                  ? "—"
                  : `${savingsRate.toFixed(1)}%`}
              </h3>
            </div>

            <div className="text-right">
              <p
                className="
                  text-xs
                  text-slate-500
                "
              >
                Target
              </p>

              <p
                className="
                  text-sm
                  font-semibold
                  text-cyan-400
                "
              >
                {targetRate}%
              </p>
            </div>
          </div>

          {/* Progress */}

          <div
            className="
              h-3
              overflow-hidden
              rounded-full
              bg-white/10
            "
          >
            <motion.div
              initial={{
                width: 0,
              }}
              animate={{
                width: loading
                  ? "0%"
                  : `${savingsRate}%`,
              }}
              transition={{
                duration: 1,
                delay: 0.3,
              }}
              className="
                h-full
                rounded-full
                bg-gradient-to-r
                from-blue-600
                to-cyan-400
              "
            />
          </div>

          <div
            className="
              mt-3
              flex
              items-center
              justify-between
              text-xs
            "
          >
            <span
              className="
                text-slate-500
              "
            >
              Current savings performance
            </span>

            <span
              className={`
                font-semibold
                ${
                  isAboveTarget
                    ? "text-green-400"
                    : "text-amber-400"
                }
              `}
            >
              {loading || error
                ? "—"
                : isAboveTarget
                  ? "Above target"
                  : "Below target"}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnalyticsCard;