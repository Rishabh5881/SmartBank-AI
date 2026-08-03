import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  TrendingUp,
  Wallet,
  Lock,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

import api from "../../services/api";

const FinancialScore = () => {
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // ==========================================
  // FETCH FINANCIAL DATA
  // ==========================================

  useEffect(() => {
    let mounted = true;

    const fetchFinancialData = async () => {
      try {
        if (mounted) {
          setLoading(true);
          setError(false);
        }

        const token = localStorage.getItem("token");

        if (!token) {
          if (mounted) {
            setAccounts([]);
            setTransactions([]);
            setLoading(false);
          }

          return;
        }

        const [accountsResponse, transactionsResponse] =
          await Promise.all([
            api.get("/accounts"),
            api.get("/transactions"),
          ]);

        if (!mounted) {
          return;
        }

        // ==========================================
        // ACCOUNTS
        // ==========================================

        const accountsResponseData =
          accountsResponse?.data;

        if (accountsResponseData?.success) {
          const accountData =
            accountsResponseData?.data;

          if (Array.isArray(accountData)) {
            setAccounts(accountData);
          } else if (
            accountData &&
            typeof accountData === "object"
          ) {
            setAccounts([accountData]);
          } else {
            setAccounts([]);
          }
        } else {
          setAccounts([]);
        }

        // ==========================================
        // TRANSACTIONS
        // ==========================================

        const transactionsResponseData =
          transactionsResponse?.data;

        if (transactionsResponseData?.success) {
          const transactionData =
            transactionsResponseData?.data;

          setTransactions(
            Array.isArray(transactionData)
              ? transactionData
              : []
          );
        } else {
          setTransactions([]);
        }
      } catch (err) {
        console.error(
          "FINANCIAL SCORE DATA ERROR:",
          err?.response?.data ||
            err?.message ||
            err
        );

        if (mounted) {
          setAccounts([]);
          setTransactions([]);
          setError(true);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchFinancialData();

    // ==========================================
    // DASHBOARD REFRESH
    // ==========================================

    const handleDashboardUpdate = () => {
      fetchFinancialData();
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
  // FINANCIAL CALCULATIONS
  // ==========================================

  const financialMetrics = useMemo(() => {
    const totalBalance = accounts.reduce(
      (sum, account) => {
        const balance = Number(
          account?.balance ??
            account?.availableBalance ??
            account?.currentBalance ??
            0
        );

        return (
          sum +
          (Number.isFinite(balance)
            ? Math.max(0, balance)
            : 0)
        );
      },
      0
    );

    const userAccountNumbers = new Set(
      accounts
        .map(
          (account) =>
            account?.accountNumber ||
            account?.accountNo
        )
        .filter(Boolean)
        .map((value) => String(value))
    );

    let totalIncome = 0;
    let totalExpense = 0;

    let recentIncome = 0;
    let recentExpense = 0;

    const now = new Date();

    const thirtyDaysAgo = new Date(
      now.getTime() -
        30 * 24 * 60 * 60 * 1000
    );

    transactions.forEach((transaction) => {
      const amount = Number(
        transaction?.amount ?? 0
      );

      if (!Number.isFinite(amount) || amount <= 0) {
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

      const isSourceAccount =
        sourceAccountNumber
          ? userAccountNumbers.has(
              String(sourceAccountNumber)
            )
          : false;

      const isDestinationAccount =
        destinationAccountNumber
          ? userAccountNumbers.has(
              String(destinationAccountNumber)
            )
          : false;

      let income = false;
      let expense = false;

      // ==========================================
      // INCOME
      // ==========================================

      if (
        type === "DEPOSIT" ||
        type === "CREDIT" ||
        type === "TRANSFER_IN"
      ) {
        income = true;
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
        expense = true;
      }

      // ==========================================
      // TRANSFER
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
      // TOTAL INCOME / EXPENSE
      // ==========================================

      if (income) {
        totalIncome += amount;
      }

      if (expense) {
        totalExpense += amount;
      }

      // ==========================================
      // LAST 30 DAYS
      // ==========================================

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
        Number.isNaN(transactionDate.getTime()) ||
        transactionDate < thirtyDaysAgo
      ) {
        return;
      }

      if (income) {
        recentIncome += amount;
      }

      if (expense) {
        recentExpense += amount;
      }
    });

    return {
      totalBalance,
      totalIncome,
      totalExpense,
      recentIncome,
      recentExpense,
    };
  }, [accounts, transactions]);

  // ==========================================
  // SAVING SCORE
  // ==========================================

  const savingScore = useMemo(() => {
    const {
      totalIncome,
      totalExpense,
    } = financialMetrics;

    if (!totalIncome && !totalExpense) {
      return 0;
    }

    if (totalIncome <= 0) {
      return 0;
    }

    const savingRate =
      ((totalIncome - totalExpense) /
        totalIncome) *
      100;

    return Math.min(
      100,
      Math.max(
        0,
        Math.round(savingRate * 2)
      )
    );
  }, [financialMetrics]);

  // ==========================================
  // SPENDING CONTROL SCORE
  // ==========================================

  const spendingControl = useMemo(() => {
    const {
      recentIncome,
      recentExpense,
    } = financialMetrics;

    if (!recentIncome && !recentExpense) {
      return 0;
    }

    if (recentIncome <= 0) {
      return recentExpense <= 0 ? 100 : 20;
    }

    const expenseRatio =
      recentExpense / recentIncome;

    const score =
      100 - expenseRatio * 100;

    return Math.min(
      100,
      Math.max(
        0,
        Math.round(score)
      )
    );
  }, [financialMetrics]);

  // ==========================================
  // SECURITY SCORE
  // ==========================================

  const securityScore = useMemo(() => {
    if (!accounts.length) {
      return 0;
    }

    const activeAccounts =
      accounts.filter(
        (account) =>
          String(
            account?.status || ""
          ).toUpperCase() === "ACTIVE"
      ).length;

    const activeRatio =
      activeAccounts / accounts.length;

    return Math.min(
      100,
      Math.max(
        0,
        Math.round(activeRatio * 100)
      )
    );
  }, [accounts]);

  // ==========================================
  // OVERALL FINANCIAL SCORE
  // ==========================================

  const score = useMemo(() => {
    if (
      !accounts.length &&
      !transactions.length
    ) {
      return 0;
    }

    const calculatedScore =
      savingScore * 0.45 +
      spendingControl * 0.35 +
      securityScore * 0.20;

    return Math.min(
      100,
      Math.max(
        0,
        Math.round(calculatedScore)
      )
    );
  }, [
    accounts,
    transactions,
    savingScore,
    spendingControl,
    securityScore,
  ]);

  // ==========================================
  // SCORE STATUS
  // ==========================================

  const scoreStatus = useMemo(() => {
    if (score >= 80) {
      return {
        status: "Healthy",
        title: "Excellent Financial Health",
        description:
          "Your financial activity is showing healthy patterns. SmartBank AI recommends maintaining your current savings strategy.",
      };
    }

    if (score >= 60) {
      return {
        status: "Stable",
        title: "Good Financial Health",
        description:
          "Your financial habits are generally stable. SmartBank AI recommends improving your savings consistency and monitoring expenses.",
      };
    }

    if (score >= 40) {
      return {
        status: "Needs Attention",
        title: "Financial Health Needs Attention",
        description:
          "Your recent financial activity could be improved. Reviewing expenses and strengthening your savings strategy may help.",
      };
    }

    return {
      status: "At Risk",
      title: "Financial Health Needs Improvement",
      description:
        "Your current financial activity indicates areas that need attention. Consider reducing unnecessary expenses and building consistent savings.",
    };
  }, [score]);

  // ==========================================
  // SAFE SCORE
  // ==========================================

  const safeScore = Math.min(
    100,
    Math.max(
      0,
      Number(score) || 0
    )
  );

  // ==========================================
  // SCORE BREAKDOWN
  // ==========================================

  const stats = [
    {
      title: "Saving Score",
      value: savingScore,
      icon: Wallet,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
      bar: "bg-emerald-400",
    },
    {
      title: "Spending Control",
      value: spendingControl,
      icon: TrendingUp,
      color: "text-cyan-400",
      bg: "bg-cyan-400/10",
      bar: "bg-cyan-400",
    },
    {
      title: "Security Score",
      value: securityScore,
      icon: Lock,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      bar: "bg-blue-400",
    },
  ];

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
        hover:border-emerald-400/20
        hover:bg-white/[0.055]
        sm:p-6
      "
    >
      {/* =========================================
          AMBIENT BACKGROUND
      ========================================= */}

      <div
        className="
          pointer-events-none
          absolute
          -right-28
          -top-28
          h-64
          w-64
          rounded-full
          bg-emerald-500/10
          blur-[90px]
          transition-all
          duration-700
          group-hover:scale-125
          group-hover:bg-emerald-400/15
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-28
          -left-24
          h-60
          w-60
          rounded-full
          bg-cyan-500/[0.06]
          blur-[85px]
        "
      />

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
          via-emerald-400/30
          to-transparent
        "
      />

      {/* =========================================
          HEADER
      ========================================= */}

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-2xl
              border
              border-emerald-400/15
              bg-gradient-to-br
              from-emerald-400/15
              to-cyan-400/10
              shadow-lg
              shadow-emerald-500/5
              transition-transform
              duration-500
              group-hover:scale-105
            "
          >
            <ShieldCheck
              size={22}
              strokeWidth={1.8}
              className="text-emerald-400"
            />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <Sparkles
                size={11}
                className="shrink-0 text-cyan-400"
              />

              <p
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-emerald-400
                  sm:text-[10px]
                "
              >
                AI Assessment
              </p>
            </div>

            <h2
              className="
                mt-1
                truncate
                text-xl
                font-bold
                tracking-tight
                text-white
                sm:text-2xl
              "
            >
              Financial Health
            </h2>
          </div>
        </div>

        {/* Health Status */}

        <div
          className="
            hidden
            shrink-0
            items-center
            gap-1.5
            rounded-full
            border
            border-emerald-400/10
            bg-emerald-400/[0.05]
            px-3
            py-1.5
            sm:flex
          "
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50" />

          <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-emerald-400">
            {scoreStatus.status}
          </span>
        </div>
      </div>

      {/* =========================================
          SCORE
      ========================================= */}

      <div className="relative mt-8 flex justify-center">
        <div className="relative">
          <div
            className="
              pointer-events-none
              absolute
              inset-[-22px]
              rounded-full
              bg-emerald-400/10
              blur-3xl
              opacity-60
              transition-all
              duration-700
              group-hover:scale-110
              group-hover:opacity-100
            "
          />

          <motion.div
            initial={{
              scale: 0.8,
              opacity: 0,
              rotate: -8,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              rotate: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: "easeOut",
            }}
            className="
              relative
              h-44
              w-44
              rounded-full
              bg-gradient-to-br
              from-emerald-300
              via-cyan-400
              to-blue-500
              p-[5px]
              shadow-2xl
              shadow-cyan-500/15
              sm:h-48
              sm:w-48
            "
          >
            <div
              className="
                flex
                h-full
                w-full
                flex-col
                items-center
                justify-center
                rounded-full
                border
                border-white/[0.06]
                bg-[#020617]
                shadow-inner
              "
            >
              <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-slate-500">
                Score
              </p>

              <motion.h1
                initial={{
                  scale: 0.5,
                  opacity: 0,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.35,
                }}
                className="
                  mt-1
                  text-5xl
                  font-black
                  tracking-tight
                  text-white
                  sm:text-6xl
                "
              >
                {loading ? "—" : safeScore}
              </motion.h1>

              <p className="mt-0.5 text-[11px] font-medium text-slate-500">
                out of 100
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* =========================================
          STATUS
      ========================================= */}

      <div className="relative mt-7 flex justify-center">
        <div
          className="
            inline-flex
            max-w-full
            items-center
            gap-2
            rounded-full
            border
            border-emerald-400/15
            bg-emerald-400/[0.07]
            px-3.5
            py-2
            shadow-lg
            shadow-emerald-500/5
            sm:px-4
          "
        >
          <span
            className="
              h-2
              w-2
              shrink-0
              rounded-full
              bg-emerald-400
              shadow-lg
              shadow-emerald-400/70
            "
          />

          <span className="truncate text-[11px] font-bold text-emerald-400 sm:text-xs">
            {loading
              ? "Analyzing..."
              : error
                ? "Data Unavailable"
                : scoreStatus.title}
          </span>

          {!loading && !error && (
            <ArrowUpRight
              size={13}
              className="shrink-0 text-emerald-400/70"
            />
          )}
        </div>
      </div>

      {/* =========================================
          DESCRIPTION
      ========================================= */}

      <p
        className="
          relative
          mx-auto
          mt-4
          max-w-lg
          text-center
          text-xs
          leading-6
          text-slate-500
          sm:text-sm
        "
      >
        {loading
          ? "SmartBank AI is analyzing your accounts and transaction activity."
          : error
            ? "Financial health data could not be loaded right now."
            : scoreStatus.description}
      </p>

      {/* =========================================
          SCORE BREAKDOWN
      ========================================= */}

      <div
        className="
          relative
          mt-7
          grid
          grid-cols-1
          gap-3
          sm:grid-cols-3
        "
      >
        {stats.map((item, index) => {
          const Icon = item.icon;

          const safeValue = Math.min(
            100,
            Math.max(
              0,
              Number(item.value) || 0
            )
          );

          return (
            <motion.div
              key={item.title}
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.4,
                delay: 0.3 + index * 0.08,
              }}
              whileHover={{
                y: -4,
              }}
              className="
                group/stat
                rounded-2xl
                border
                border-white/[0.08]
                bg-white/[0.035]
                p-4
                transition-all
                duration-300
                hover:border-white/[0.14]
                hover:bg-white/[0.06]
              "
            >
              <div className="flex items-start justify-between gap-3">
                <div
                  className={`
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    ${item.bg}
                    ${item.color}
                    transition-transform
                    duration-300
                    group-hover/stat:scale-110
                  `}
                >
                  <Icon
                    size={18}
                    strokeWidth={1.8}
                  />
                </div>

                <span
                  className={`
                    text-lg
                    font-black
                    tracking-tight
                    ${item.color}
                  `}
                >
                  {loading ? "—" : `${safeValue}%`}
                </span>
              </div>

              <p
                className="
                  mt-4
                  truncate
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.12em]
                  text-slate-500
                "
              >
                {item.title}
              </p>

              <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/[0.06]">
                <motion.div
                  initial={{
                    width: 0,
                  }}
                  animate={{
                    width: loading
                      ? "0%"
                      : `${safeValue}%`,
                  }}
                  transition={{
                    duration: 1,
                    delay: 0.5 + index * 0.1,
                    ease: "easeOut",
                  }}
                  className={`h-full rounded-full ${item.bar}`}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* =========================================
          AI FOOTER
      ========================================= */}

      <div
        className="
          relative
          mt-6
          flex
          flex-col
          items-center
          gap-2
          border-t
          border-white/[0.06]
          pt-5
          sm:flex-row
          sm:justify-center
        "
      >
        <div
          className="
            flex
            h-7
            w-7
            items-center
            justify-center
            rounded-lg
            bg-cyan-400/[0.07]
          "
        >
          <Sparkles
            size={12}
            className="text-cyan-400"
          />
        </div>

        <p
          className="
            text-center
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.15em]
            text-slate-600
          "
        >
          Continuously analyzed by SmartBank AI
        </p>
      </div>
    </motion.div>
  );
};

export default FinancialScore;

