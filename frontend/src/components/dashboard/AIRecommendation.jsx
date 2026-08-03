
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  PiggyBank,
  TrendingUp,
  ShieldCheck,
  ArrowUpRight,
  Loader2,
  AlertCircle,
} from "lucide-react";

import api from "../../services/api";

// ==========================================
// AI RECOMMENDATION
// ==========================================

const AIRecommendation = () => {
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
          "AI RECOMMENDATION DATA ERROR:",
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
  // FINANCIAL METRICS
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
      // TOTALS
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
  // SPENDING CONTROL
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

    return Math.min(
      100,
      Math.max(
        0,
        Math.round(
          100 - expenseRatio * 100
        )
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

    return Math.min(
      100,
      Math.max(
        0,
        Math.round(
          (activeAccounts /
            accounts.length) *
            100
        )
      )
    );
  }, [accounts]);

  // ==========================================
  // OVERALL SCORE
  // ==========================================

  const financialScore = useMemo(() => {
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
    if (financialScore >= 80) {
      return {
        label: "Excellent",
        color: "text-emerald-400",
        bg: "bg-emerald-400/10",
        border: "border-emerald-400/15",
      };
    }

    if (financialScore >= 60) {
      return {
        label: "Good",
        color: "text-cyan-400",
        bg: "bg-cyan-400/10",
        border: "border-cyan-400/15",
      };
    }

    if (financialScore >= 40) {
      return {
        label: "Needs Attention",
        color: "text-amber-400",
        bg: "bg-amber-400/10",
        border: "border-amber-400/15",
      };
    }

    return {
      label: "Needs Improvement",
      color: "text-red-400",
      bg: "bg-red-400/10",
      border: "border-red-400/15",
    };
  }, [financialScore]);

  // ==========================================
  // SAVINGS RATE
  // ==========================================

  const savingsRate = useMemo(() => {
    const {
      totalIncome,
      totalExpense,
    } = financialMetrics;

    if (totalIncome <= 0) {
      return 0;
    }

    return Math.max(
      0,
      Math.round(
        ((totalIncome - totalExpense) /
          totalIncome) *
          100
      )
    );
  }, [financialMetrics]);

  // ==========================================
  // RECOMMENDATIONS
  // ==========================================

  const recommendations = useMemo(() => {
    const {
      recentIncome,
      recentExpense,
      totalBalance,
    } = financialMetrics;

    const monthlySavings = Math.max(
      0,
      recentIncome - recentExpense
    );

    // ==========================================
    // SAVING RECOMMENDATION
    // ==========================================

    let savingRecommendation;

    if (recentIncome <= 0) {
      savingRecommendation = {
        title: "Build Your Savings",
        text:
          "Add regular income activity to SmartBank AI so we can identify a personalized savings opportunity.",
        icon: PiggyBank,
        color: "text-emerald-400",
        bg: "bg-emerald-400/10",
        border: "border-emerald-400/10",
      };
    } else if (monthlySavings > 0) {
      const suggestedSaving = Math.round(
        monthlySavings * 0.2
      );

      savingRecommendation = {
        title: "Smart Saving",
        text: `Based on your recent cash flow, consider setting aside around ${formatMoney(
          suggestedSaving
        )} toward your savings goals.`,
        icon: PiggyBank,
        color: "text-emerald-400",
        bg: "bg-emerald-400/10",
        border: "border-emerald-400/10",
      };
    } else {
      savingRecommendation = {
        title: "Control Spending",
        text:
          "Your recent expenses are consuming most or all of your income. Review discretionary spending before increasing savings commitments.",
        icon: PiggyBank,
        color: "text-amber-400",
        bg: "bg-amber-400/10",
        border: "border-amber-400/10",
      };
    }

    // ==========================================
    // INVESTMENT / CASH FLOW RECOMMENDATION
    // ==========================================

    let growthRecommendation;

    if (recentIncome > 0 && recentExpense < recentIncome) {
      growthRecommendation = {
        title: "Investment Growth",
        text: `You currently have positive recent cash flow. After maintaining an emergency buffer, consider directing part of your surplus toward long-term financial goals.`,
        icon: TrendingUp,
        color: "text-cyan-400",
        bg: "bg-cyan-400/10",
        border: "border-cyan-400/10",
      };
    } else if (totalBalance > 0) {
      growthRecommendation = {
        title: "Optimize Cash Flow",
        text:
          "Your current balance gives you a financial base. Focus on improving monthly cash flow before taking on additional financial commitments.",
        icon: TrendingUp,
        color: "text-cyan-400",
        bg: "bg-cyan-400/10",
        border: "border-cyan-400/10",
      };
    } else {
      growthRecommendation = {
        title: "Build Financial Buffer",
        text:
          "Start building a consistent cash reserve before exploring higher-risk financial opportunities.",
        icon: TrendingUp,
        color: "text-cyan-400",
        bg: "bg-cyan-400/10",
        border: "border-cyan-400/10",
      };
    }

    // ==========================================
    // SECURITY RECOMMENDATION
    // ==========================================

    let securityRecommendation;

    if (securityScore >= 100) {
      securityRecommendation = {
        title: "Security Score",
        text:
          "All connected accounts are currently active. Continue monitoring transactions and keeping your account credentials secure.",
        icon: ShieldCheck,
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        border: "border-blue-400/10",
      };
    } else if (accounts.length > 0) {
      securityRecommendation = {
        title: "Review Account Status",
        text:
          "Some connected accounts are not currently active. Review their status to keep your financial dashboard data complete.",
        icon: ShieldCheck,
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        border: "border-blue-400/10",
      };
    } else {
      securityRecommendation = {
        title: "Connect Your Account",
        text:
          "Connect an active financial account to unlock more accurate financial health and security insights.",
        icon: ShieldCheck,
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        border: "border-blue-400/10",
      };
    }

    return [
      savingRecommendation,
      growthRecommendation,
      securityRecommendation,
    ];
  }, [financialMetrics, securityScore, accounts.length]);

  // ==========================================
  // MONEY FORMATTER
  // ==========================================

  function formatMoney(value) {
    const amount = Number(value || 0);

    if (!Number.isFinite(amount)) {
      return "₹0";
    }

    return `₹${amount.toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    })}`;
  }

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.6,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-gradient-to-br
        from-purple-600/15
        via-blue-600/10
        to-cyan-500/10
        p-6
        text-white
        shadow-xl
        shadow-black/10
        backdrop-blur-xl
        transition-all
        duration-300
        hover:border-purple-400/20
      "
    >
      {/* ==========================================
          BACKGROUND GLOW
      ========================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-24
          -top-24
          h-56
          w-56
          rounded-full
          bg-purple-500/15
          blur-3xl
          transition
          duration-500
          group-hover:scale-125
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-28
          -left-24
          h-56
          w-56
          rounded-full
          bg-cyan-500/[0.06]
          blur-3xl
        "
      />

      <div className="relative z-10">
        {/* ==========================================
            HEADER
        ========================================== */}

        <div
          className="
            relative
            flex
            items-center
            gap-4
          "
        >
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
              border-purple-400/15
              bg-purple-500/10
            "
          >
            <Sparkles
              size={23}
              className="text-yellow-400"
            />
          </div>

          <div className="min-w-0">
            <p
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.18em]
                text-purple-300
              "
            >
              AI Intelligence
            </p>

            <h2
              className="
                mt-1
                text-xl
                font-bold
                tracking-tight
                sm:text-2xl
              "
            >
              SmartBank AI Recommendations
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-slate-400
              "
            >
              Personalized financial guidance based on your
              real account and transaction activity.
            </p>
          </div>
        </div>

        {/* ==========================================
            LOADING
        ========================================== */}

        {loading && (
          <div
            className="
              relative
              mt-8
              flex
              min-h-44
              items-center
              justify-center
              rounded-2xl
              border
              border-white/10
              bg-white/[0.03]
            "
          >
            <div className="flex items-center gap-3 text-sm text-slate-400">
              <Loader2
                size={18}
                className="animate-spin text-cyan-400"
              />

              SmartBank AI is analyzing your finances...
            </div>
          </div>
        )}

        {/* ==========================================
            ERROR
        ========================================== */}

        {!loading && error && (
          <div
            className="
              relative
              mt-8
              flex
              min-h-44
              flex-col
              items-center
              justify-center
              rounded-2xl
              border
              border-red-400/10
              bg-red-400/[0.03]
              px-6
              text-center
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
                border
                border-red-400/10
                bg-red-400/[0.06]
              "
            >
              <AlertCircle
                size={21}
                className="text-red-400"
              />
            </div>

            <p className="mt-4 text-sm font-semibold text-slate-300">
              AI recommendations unavailable
            </p>

            <p className="mt-1 max-w-md text-xs leading-5 text-slate-600">
              We could not load your financial activity
              right now.
            </p>
          </div>
        )}

        {/* ==========================================
            NO DATA
        ========================================== */}

        {!loading &&
          !error &&
          !accounts.length &&
          !transactions.length && (
            <div
              className="
                relative
                mt-8
                rounded-2xl
                border
                border-white/10
                bg-white/[0.03]
                p-6
                text-center
              "
            >
              <div
                className="
                  mx-auto
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  bg-cyan-400/10
                "
              >
                <Sparkles
                  size={21}
                  className="text-cyan-400"
                />
              </div>

              <p className="mt-4 text-sm font-semibold text-slate-300">
                Add financial data to unlock AI insights
              </p>

              <p className="mx-auto mt-1 max-w-md text-xs leading-5 text-slate-600">
                Connect an account or add transactions so
                SmartBank AI can generate personalized
                recommendations.
              </p>
            </div>
          )}

        {/* ==========================================
            RECOMMENDATIONS
        ========================================== */}

        {!loading &&
          !error &&
          (accounts.length > 0 ||
            transactions.length > 0) && (
            <>
              <div
                className="
                  relative
                  mt-8
                  grid
                  gap-4
                  md:grid-cols-3
                "
              >
                {recommendations.map(
                  (item, index) => {
                    const Icon = item.icon;

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
                          delay: index * 0.1,
                          duration: 0.4,
                        }}
                        whileHover={{
                          y: -5,
                        }}
                        className={`
                          group/card
                          rounded-2xl
                          border
                          ${item.border}
                          bg-white/[0.04]
                          p-5
                          transition-all
                          duration-300
                          hover:bg-white/[0.07]
                        `}
                      >
                        {/* Icon */}

                        <div
                          className={`
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-xl
                            ${item.bg}
                            ${item.color}
                          `}
                        >
                          <Icon size={22} />
                        </div>

                        {/* Title */}

                        <div
                          className="
                            mt-4
                            flex
                            items-center
                            justify-between
                            gap-2
                          "
                        >
                          <h3
                            className="
                              text-lg
                              font-bold
                              text-white
                            "
                          >
                            {item.title}
                          </h3>

                          <ArrowUpRight
                            size={17}
                            className="
                              text-slate-600
                              transition
                              duration-300
                              group-hover/card:-translate-y-0.5
                              group-hover/card:translate-x-0.5
                              group-hover/card:text-slate-300
                            "
                          />
                        </div>

                        {/* Description */}

                        <p
                          className="
                            mt-2
                            text-sm
                            leading-6
                            text-slate-400
                          "
                        >
                          {item.text}
                        </p>
                      </motion.div>
                    );
                  }
                )}
              </div>

              {/* ==========================================
                  FINANCIAL SCORE
              ========================================== */}

              <div
                className="
                  relative
                  mt-6
                  flex
                  flex-col
                  gap-4
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.05]
                  p-5
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                <div>
                  <div
                    className="
                      flex
                      items-center
                      gap-2
                    "
                  >
                    <Sparkles
                      size={16}
                      className="text-cyan-400"
                    />

                    <p
                      className="
                        text-sm
                        font-medium
                        text-slate-400
                      "
                    >
                      AI Financial Score
                    </p>
                  </div>

                  <div
                    className="
                      mt-1
                      flex
                      items-end
                      gap-2
                    "
                  >
                    <h2
                      className="
                        text-3xl
                        font-extrabold
                        tracking-tight
                        text-white
                      "
                    >
                      {financialScore}
                    </h2>

                    <span
                      className="
                        mb-1
                        text-sm
                        text-slate-500
                      "
                    >
                      /100
                    </span>
                  </div>

                  <p className="mt-1 text-[11px] text-slate-600">
                    Savings rate: {savingsRate}%
                  </p>
                </div>

                {/* Score Status */}

                <div
                  className={`
                    inline-flex
                    w-fit
                    items-center
                    gap-2
                    rounded-full
                    border
                    px-4
                    py-2
                    text-sm
                    font-semibold
                    ${scoreStatus.border}
                    ${scoreStatus.bg}
                    ${scoreStatus.color}
                  `}
                >
                  <span
                    className={`
                      h-2
                      w-2
                      rounded-full
                      bg-current
                    `}
                  />

                  {scoreStatus.label}
                </div>
              </div>

              {/* ==========================================
                  DATA SUMMARY
              ========================================== */}

              <div
                className="
                  mt-5
                  grid
                  grid-cols-2
                  gap-3
                  sm:grid-cols-3
                "
              >
                <div
                  className="
                    rounded-2xl
                    border
                    border-white/[0.07]
                    bg-white/[0.025]
                    p-4
                  "
                >
                  <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-600">
                    Balance
                  </p>

                  <p className="mt-1 text-sm font-bold text-white">
                    {formatMoney(
                      financialMetrics.totalBalance
                    )}
                  </p>
                </div>

                <div
                  className="
                    rounded-2xl
                    border
                    border-white/[0.07]
                    bg-white/[0.025]
                    p-4
                  "
                >
                  <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-600">
                    Recent Income
                  </p>

                  <p className="mt-1 text-sm font-bold text-emerald-400">
                    {formatMoney(
                      financialMetrics.recentIncome
                    )}
                  </p>
                </div>

                <div
                  className="
                    col-span-2
                    rounded-2xl
                    border
                    border-white/[0.07]
                    bg-white/[0.025]
                    p-4
                    sm:col-span-1
                  "
                >
                  <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-600">
                    Recent Expense
                  </p>

                  <p className="mt-1 text-sm font-bold text-red-400">
                    {formatMoney(
                      financialMetrics.recentExpense
                    )}
                  </p>
                </div>
              </div>
            </>
          )}

        {/* ==========================================
            FOOTER
        ========================================== */}

        {!loading && (
          <div
            className="
              relative
              mt-6
              flex
              items-center
              justify-center
              gap-2
              border-t
              border-white/[0.06]
              pt-5
            "
          >
            <Sparkles
              size={12}
              className="text-cyan-400"
            />

            <p
              className="
                text-[9px]
                font-medium
                uppercase
                tracking-[0.14em]
                text-slate-600
              "
            >
              AI insights generated from your SmartBank
              financial activity
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AIRecommendation;

