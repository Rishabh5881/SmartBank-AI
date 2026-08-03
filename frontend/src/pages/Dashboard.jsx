
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  TrendingDown,
  WalletCards,
  Activity,
  ShieldCheck,
  ChevronRight,
  Clock3,
  Zap,
  AlertCircle,
  RefreshCw,
  CreditCard,
} from "lucide-react";

import api from "../services/api";

import BankCard from "../components/dashboard/BankCard";
import QuickActions from "../components/dashboard/QuickActions";
import SpendingChart from "../components/dashboard/SpendingChart";
import FinancialScore from "../components/dashboard/FinancialScore";
import LoanCalculator from "../components/dashboard/LoanCalculator";
import UpcomingPayments from "../components/dashboard/UpcomingPayments";
import AIRecommendation from "../components/dashboard/AIRecommendation";
import AccountStats from "../components/dashboard/AccountStats";
import AIAssistant from "../components/dashboard/AIAssistant";
import QuickActionModal from "../components/dashboard/QuickActionModal";
import FinancialGoals from "../components/dashboard/FinancialGoals";

// ==========================================
// TRANSACTION CLASSIFICATION
// ==========================================

const getTransactionFlow = (transaction, userAccountNumbers) => {
  const type = String(
    transaction?.type ||
      transaction?.transactionType ||
      ""
  ).toUpperCase();

  const sourceAccountNumber =
    transaction?.sourceAccount?.accountNumber || null;

  const destinationAccountNumber =
    transaction?.destinationAccount?.accountNumber || null;

  const isSourceAccount =
    Boolean(sourceAccountNumber) &&
    userAccountNumbers.has(sourceAccountNumber);

  const isDestinationAccount =
    Boolean(destinationAccountNumber) &&
    userAccountNumbers.has(destinationAccountNumber);

  if (
    type === "DEPOSIT" ||
    type === "CREDIT" ||
    type === "TRANSFER_IN"
  ) {
    return "income";
  }

  if (
    type === "WITHDRAW" ||
    type === "WITHDRAWAL" ||
    type === "TRANSFER_OUT"
  ) {
    return "expense";
  }

  if (type === "TRANSFER") {
    if (isDestinationAccount && !isSourceAccount) {
      return "income";
    }

    if (isSourceAccount && !isDestinationAccount) {
      return "expense";
    }

    if (isSourceAccount && isDestinationAccount) {
      return "neutral";
    }

    return "neutral";
  }

  return "neutral";
};

// ==========================================
// DASHBOARD
// ==========================================

const Dashboard = () => {
  const [modal, setModal] = useState(false);
  const [action, setAction] = useState("");

  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  const [accounts, setAccounts] = useState([]);
  const [accountsLoading, setAccountsLoading] = useState(true);
  const [accountsError, setAccountsError] = useState(false);
  const [accountsRetryKey, setAccountsRetryKey] = useState(0);

  const [transactions, setTransactions] = useState([]);
  const [transactionsLoading, setTransactionsLoading] = useState(true);
  const [transactionsError, setTransactionsError] = useState(false);
  const [transactionsRetryKey, setTransactionsRetryKey] = useState(0);

  // ==========================================
  // FINANCIAL SUMMARY
  // ==========================================

  const [financialSummary, setFinancialSummary] = useState({
    totalBalance: 0,
    monthlyIncome: 0,
    monthlyExpense: 0,
    previousMonthIncome: 0,
    previousMonthExpense: 0,
    incomeGrowth: null,
    expenseGrowth: null,
    netCashFlow: 0,
    previousNetCashFlow: 0,
  });

  const [summaryLoading, setSummaryLoading] = useState(true);

  // ==========================================
  // DASHBOARD-LEVEL LOADING
  // ==========================================

  const dashboardLoading =
    userLoading ||
    accountsLoading ||
    transactionsLoading ||
    summaryLoading;

  // ==========================================
  // LOAD AUTHENTICATED USER
  // ==========================================

  useEffect(() => {
    let mounted = true;

    const loadUser = async () => {
      try {
        setUserLoading(true);

        const token = localStorage.getItem("token");

        if (!token) {
          if (mounted) {
            setUser(null);
          }

          return;
        }

        const response = await api.get("/auth/me");

        if (!mounted) {
          return;
        }

        if (response.data?.success) {
          setUser(
            response.data?.data?.user ||
              response.data?.user ||
              response.data?.data ||
              null
          );
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error(
          "USER FETCH ERROR:",
          error?.response?.data || error?.message
        );

        if (mounted) {
          setUser(null);
        }
      } finally {
        if (mounted) {
          setUserLoading(false);
        }
      }
    };

    loadUser();

    const handleUserUpdate = () => {
      loadUser();
    };

    window.addEventListener("userUpdated", handleUserUpdate);

    return () => {
      mounted = false;
      window.removeEventListener("userUpdated", handleUserUpdate);
    };
  }, []);

  // ==========================================
  // USER DATA
  // ==========================================

  const userName =
    user?.name ||
    user?.fullName ||
    user?.username ||
    "User";

  const firstName = userName.split(" ")[0];

  // ==========================================
  // QUICK ACTION
  // ==========================================

  const openModal = (name) => {
    setAction(name);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    setAction("");
  };

  // ==========================================
  // FETCH ACCOUNTS
  // ==========================================

  useEffect(() => {
    let mounted = true;

    const fetchAccounts = async () => {
      try {
        setAccountsLoading(true);
        setAccountsError(false);

        const token = localStorage.getItem("token");

        if (!token) {
          if (mounted) {
            setAccounts([]);
            setAccountsLoading(false);
            setAccountsError(true);
          }

          return;
        }

        const response = await api.get("/accounts");

        if (!mounted) {
          return;
        }

        if (response.data?.success) {
          const data = Array.isArray(response.data?.data)
            ? response.data.data
            : [];

          setAccounts(data);
          setAccountsError(false);
        } else {
          setAccounts([]);
          setAccountsError(true);
        }
      } catch (error) {
        console.error(
          "ACCOUNT FETCH ERROR:",
          error?.response?.data || error?.message
        );

        if (mounted) {
          setAccounts([]);
          setAccountsError(true);
        }
      } finally {
        if (mounted) {
          setAccountsLoading(false);
        }
      }
    };

    fetchAccounts();

    const handleDashboardUpdate = () => {
      fetchAccounts();
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
  }, [accountsRetryKey]);

  // ==========================================
  // FETCH TRANSACTIONS
  // ==========================================

  useEffect(() => {
    let mounted = true;

    const fetchTransactions = async () => {
      try {
        setTransactionsLoading(true);
        setTransactionsError(false);

        const token = localStorage.getItem("token");

        if (!token) {
          if (mounted) {
            setTransactions([]);
            setTransactionsLoading(false);
            setTransactionsError(true);
          }

          return;
        }

        const response = await api.get("/transactions");

        if (!mounted) {
          return;
        }

        if (response.data?.success) {
          const data = Array.isArray(response.data?.data)
            ? response.data.data
            : [];

          setTransactions(data);
          setTransactionsError(false);
        } else {
          setTransactions([]);
          setTransactionsError(true);
        }
      } catch (error) {
        console.error(
          "TRANSACTION FETCH ERROR:",
          error?.response?.data || error?.message
        );

        if (mounted) {
          setTransactions([]);
          setTransactionsError(true);
        }
      } finally {
        if (mounted) {
          setTransactionsLoading(false);
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
  }, [transactionsRetryKey]);

  // ==========================================
  // FINANCIAL SUMMARY CALCULATION
  // ==========================================

  useEffect(() => {
    if (accountsLoading || transactionsLoading) {
      return;
    }

    const calculateSummary = () => {
      const totalBalance = accounts.reduce((total, account) => {
        return total + Number(account?.balance || 0);
      }, 0);

      const userAccountNumbers = new Set(
        accounts
          .map((account) => account?.accountNumber)
          .filter(Boolean)
      );

      const now = new Date();

      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth();

      const previousMonthDate = new Date(
        currentYear,
        currentMonth - 1,
        1
      );

      const previousYear = previousMonthDate.getFullYear();
      const previousMonth = previousMonthDate.getMonth();

      let monthlyIncome = 0;
      let monthlyExpense = 0;

      let previousMonthIncome = 0;
      let previousMonthExpense = 0;

      transactions.forEach((transaction) => {
        const amount = Number(transaction?.amount || 0);

        if (!Number.isFinite(amount) || amount <= 0) {
          return;
        }

        const dateValue =
          transaction?.createdAt ||
          transaction?.date ||
          transaction?.timestamp;

        const transactionDate = dateValue
          ? new Date(dateValue)
          : null;

        if (
          !transactionDate ||
          Number.isNaN(transactionDate.getTime())
        ) {
          return;
        }

        const flow = getTransactionFlow(
          transaction,
          userAccountNumbers
        );

        if (flow === "neutral") {
          return;
        }

        const isCurrentMonth =
          transactionDate.getFullYear() === currentYear &&
          transactionDate.getMonth() === currentMonth;

        if (isCurrentMonth) {
          if (flow === "income") {
            monthlyIncome += amount;
          }

          if (flow === "expense") {
            monthlyExpense += amount;
          }
        }

        const isPreviousMonth =
          transactionDate.getFullYear() === previousYear &&
          transactionDate.getMonth() === previousMonth;

        if (isPreviousMonth) {
          if (flow === "income") {
            previousMonthIncome += amount;
          }

          if (flow === "expense") {
            previousMonthExpense += amount;
          }
        }
      });

      const calculateGrowth = (current, previous) => {
        if (previous === 0) {
          if (current === 0) {
            return 0;
          }

          return null;
        }

        return ((current - previous) / previous) * 100;
      };

      const incomeGrowth = calculateGrowth(
        monthlyIncome,
        previousMonthIncome
      );

      const expenseGrowth = calculateGrowth(
        monthlyExpense,
        previousMonthExpense
      );

      const netCashFlow =
        monthlyIncome - monthlyExpense;

      const previousNetCashFlow =
        previousMonthIncome - previousMonthExpense;

      setFinancialSummary({
        totalBalance,
        monthlyIncome,
        monthlyExpense,
        previousMonthIncome,
        previousMonthExpense,
        incomeGrowth,
        expenseGrowth,
        netCashFlow,
        previousNetCashFlow,
      });

      setSummaryLoading(false);
    };

    calculateSummary();
  }, [
    accounts,
    transactions,
    accountsLoading,
    transactionsLoading,
  ]);

  // ==========================================
  // FINANCIAL HELPERS
  // ==========================================

  const formatCurrency = (amount) => {
    const numericAmount = Number(amount || 0);

    return `₹${numericAmount.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    })}`;
  };

  const formatGrowth = (growth) => {
    if (growth === null || growth === undefined) {
      return "No previous data";
    }

    const numericGrowth = Number(growth);

    if (!Number.isFinite(numericGrowth)) {
      return "No previous data";
    }

    const sign = numericGrowth > 0 ? "+" : "";

    return `${sign}${numericGrowth.toFixed(1)}%`;
  };

  const getGrowthClass = (growth, type) => {
    if (growth === null || growth === undefined) {
      return "bg-white/[0.05] text-slate-500";
    }

    const numericGrowth = Number(growth);

    if (type === "expense") {
      if (numericGrowth < 0) {
        return "bg-emerald-400/10 text-emerald-400";
      }

      if (numericGrowth > 0) {
        return "bg-red-400/10 text-red-400";
      }

      return "bg-white/[0.05] text-slate-500";
    }

    if (numericGrowth > 0) {
      return "bg-emerald-400/10 text-emerald-400";
    }

    if (numericGrowth < 0) {
      return "bg-red-400/10 text-red-400";
    }

    return "bg-white/[0.05] text-slate-500";
  };

  // ==========================================
  // TRANSACTION HELPERS
  // ==========================================

  const getUserAccountNumbers = () => {
    return new Set(
      accounts
        .map((account) => account?.accountNumber)
        .filter(Boolean)
    );
  };

  const getTransactionType = (transaction) => {
    const userAccountNumbers = getUserAccountNumbers();

    return getTransactionFlow(
      transaction,
      userAccountNumbers
    );
  };

  const formatAmount = (transaction) => {
    const amount = Number(transaction?.amount || 0);

    const flow = getTransactionType(transaction);

    const prefix =
      flow === "income"
        ? "+"
        : flow === "expense"
        ? "-"
        : "";

    return `${prefix}₹${Math.abs(amount).toLocaleString(
      "en-IN"
    )}`;
  };

  const getTransactionTitle = (transaction) => {
    return (
      transaction?.description ||
      transaction?.title ||
      transaction?.type ||
      transaction?.transactionType ||
      "Bank Transaction"
    );
  };

  const getTransactionDate = (transaction) => {
    const dateValue =
      transaction?.createdAt ||
      transaction?.date ||
      transaction?.timestamp;

    if (!dateValue) {
      return "Recent";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "Recent";
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ==========================================
  // RETRY HANDLERS — 5.10
  // ==========================================

  const retryAccounts = () => {
    setAccountsError(false);
    setAccountsRetryKey((value) => value + 1);
  };

  const retryTransactions = () => {
    setTransactionsError(false);
    setTransactionsRetryKey((value) => value + 1);
  };

  // ==========================================
  // DASHBOARD-LEVEL LOADING SCREEN
  // ==========================================

  if (dashboardLoading) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-48 top-20 h-[500px] w-[500px] rounded-full bg-blue-600/[0.08] blur-[150px]" />

          <div className="absolute right-[-180px] top-[420px] h-[520px] w-[520px] rounded-full bg-cyan-500/[0.07] blur-[160px]" />

          <div className="absolute left-[35%] top-[1100px] h-[420px] w-[420px] rounded-full bg-indigo-600/[0.05] blur-[150px]" />
        </div>

        <main className="relative z-10 mx-auto flex min-h-screen max-w-[1680px] items-center justify-center px-4 py-24 sm:px-6 lg:px-10 xl:px-12">
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.45,
              ease: "easeOut",
            }}
            className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.035] p-8 text-center shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-10"
          >
            <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[75%] -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

            <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-400/[0.08] blur-[70px]" />

            <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-blue-500/[0.07] blur-[70px]" />

            <div className="relative">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/15 bg-cyan-400/[0.07] shadow-lg shadow-cyan-500/[0.08]">
                <div className="h-7 w-7 animate-spin rounded-full border-2 border-cyan-400/20 border-t-cyan-400" />
              </div>

              <div className="mt-6 flex items-center justify-center gap-2">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/60" />

                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-cyan-400">
                  SmartBank AI
                </p>
              </div>

              <h1 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Preparing your dashboard
              </h1>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
                Loading your accounts, transactions, and financial insights.
              </p>

              <div className="mt-7 rounded-2xl border border-white/[0.06] bg-black/20 p-4 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">
                    Financial data
                  </span>

                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                    Loading
                  </span>
                </div>

                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.div
                    initial={{
                      x: "-100%",
                    }}
                    animate={{
                      x: "100%",
                    }}
                    transition={{
                      duration: 1.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="h-full w-1/2 rounded-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
      {/* ==========================================
          PREMIUM BACKGROUND
      ========================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-48 top-20 h-[500px] w-[500px] rounded-full bg-blue-600/[0.08] blur-[150px]" />

        <div className="absolute right-[-180px] top-[420px] h-[520px] w-[520px] rounded-full bg-cyan-500/[0.07] blur-[160px]" />

        <div className="absolute left-[35%] top-[1100px] h-[420px] w-[420px] rounded-full bg-indigo-600/[0.05] blur-[150px]" />

        <div className="absolute right-[25%] top-[1900px] h-[420px] w-[420px] rounded-full bg-emerald-500/[0.035] blur-[150px]" />
      </div>

      {/* ==========================================
          MAIN
      ========================================== */}

      <main className="relative z-10 mx-auto max-w-[1680px] px-4 pb-24 pt-28 sm:px-6 lg:px-10 xl:px-12">
        {/* ==========================================
            HEADER
        ========================================== */}

        <motion.section
          initial={{
            opacity: 0,
            y: 18,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.55,
          }}
          className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.025] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8 lg:p-10"
        >
          <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-cyan-400/[0.06] blur-[100px]" />

          <div className="pointer-events-none absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-blue-500/[0.04] blur-[90px]" />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/10 bg-cyan-400/[0.06] px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/60" />

                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-400">
                  Financial Overview
                </p>
              </div>

              <h1 className="max-w-3xl text-3xl font-bold tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl">
                Welcome back{" "}
                <span className="bg-gradient-to-r from-white via-white to-cyan-300 bg-clip-text text-transparent">
                  {userLoading ? "User" : firstName}
                </span>{" "}
                👋
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                Your complete financial command center. Track your money,
                manage your accounts, and make smarter decisions with
                SmartBank AI.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-xl border border-white/[0.07] bg-black/20 px-3.5 py-2.5 text-xs text-slate-400">
                  <Clock3 size={14} className="text-slate-500" />
                  Updated just now
                </div>

                <div className="inline-flex items-center gap-2 rounded-xl border border-white/[0.07] bg-black/20 px-3.5 py-2.5 text-xs text-slate-400">
                  <Zap size={14} className="text-cyan-400" />
                  AI-powered insights
                </div>
              </div>
            </div>

            <div className="w-full max-w-sm rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.045] p-4 shadow-xl shadow-emerald-500/[0.03]">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-400/10 bg-emerald-400/[0.08]">
                  <ShieldCheck size={20} className="text-emerald-400" />
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                    Account Security
                  </p>

                  <p className="mt-1 text-sm font-semibold text-emerald-400">
                    Active & Secure
                  </p>
                </div>

                <div className="ml-auto h-2 w-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/60" />
              </div>
            </div>
          </div>
        </motion.section>

        {/* ==========================================
            BANK CARD
        ========================================== */}

        <motion.section
          initial={{
            opacity: 0,
            y: 22,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.55,
            delay: 0.08,
          }}
          className="mt-8"
        >
          <BankCard />
        </motion.section>

        {/* ==========================================
            ACCOUNT ERROR / EMPTY STATE — 5.10
        ========================================== */}

        {accountsError && (
          <motion.section
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="mt-6 overflow-hidden rounded-[1.5rem] border border-red-400/10 bg-red-400/[0.035] p-5 sm:p-6"
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-red-400/10 bg-red-400/[0.07]">
                <AlertCircle
                  size={21}
                  className="text-red-400"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white">
                  Unable to load your accounts
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  We could not retrieve your account information right now.
                  Your existing financial data has not been changed.
                </p>
              </div>

              <button
                type="button"
                onClick={retryAccounts}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-red-400/15 bg-red-400/[0.07] px-4 py-2.5 text-xs font-bold text-red-300 transition hover:border-red-400/30 hover:bg-red-400/[0.12] hover:text-red-200"
              >
                <RefreshCw size={14} />
                Retry
              </button>
            </div>
          </motion.section>
        )}

        {!accountsError &&
          !accountsLoading &&
          accounts.length === 0 && (
            <motion.section
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="mt-6 overflow-hidden rounded-[1.5rem] border border-cyan-400/10 bg-cyan-400/[0.025] p-5 sm:p-6"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.07]">
                  <CreditCard
                    size={21}
                    className="text-cyan-400"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-white">
                    No bank account connected
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Add your first account to start tracking balances,
                    transactions, and financial insights.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => openModal("Add Account")}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-cyan-400/15 bg-cyan-400/[0.07] px-4 py-2.5 text-xs font-bold text-cyan-300 transition hover:border-cyan-400/30 hover:bg-cyan-400/[0.12] hover:text-cyan-200"
                >
                  Add Account
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </motion.section>
          )}

        {/* ==========================================
            ACCOUNT STATS
        ========================================== */}

        <section className="mt-8">
          <AccountStats />
        </section>

        {/* ==========================================
            QUICK ACTIONS
        ========================================== */}

        <section className="mt-10">
          <QuickActions openModal={openModal} />
        </section>

        {/* ==========================================
            FINANCIAL OVERVIEW
        ========================================== */}

        <section className="mt-20">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />

                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-cyan-400">
                  Your Money
                </p>
              </div>

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Financial Overview
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                A quick snapshot of your financial position.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 self-start rounded-full border border-white/[0.06] bg-white/[0.025] px-3 py-2 text-xs text-slate-500 sm:self-auto">
              <Activity size={13} className="text-cyan-400" />
              Live financial summary
            </div>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {/* TOTAL BALANCE */}

            <motion.div
              whileHover={{
                y: -5,
              }}
              transition={{
                duration: 0.2,
              }}
              className="group relative overflow-hidden rounded-[1.75rem] border border-blue-400/20 bg-gradient-to-br from-blue-600 via-blue-600 to-cyan-500 p-6 shadow-2xl shadow-blue-500/10"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-white/[0.12] blur-3xl" />

              <div className="relative">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium text-white/65">
                      Total Balance
                    </p>

                    <h3 className="mt-3 text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
                      {summaryLoading || accountsError
                        ? "—"
                        : formatCurrency(financialSummary.totalBalance)}
                    </h3>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/10">
                    <WalletCards size={20} />
                  </div>
                </div>

                <div className="mt-7 flex items-center gap-2 text-xs font-semibold text-white/90">
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/10">
                    <TrendingUp size={13} />
                  </div>

                  {accountsError
                    ? "Unable to load accounts"
                    : summaryLoading
                    ? "Loading balance..."
                    : `${formatCurrency(
                        financialSummary.netCashFlow
                      )} net cash flow this month`}
                </div>
              </div>
            </motion.div>

            {/* MONTHLY INCOME */}

            <motion.div
              whileHover={{
                y: -5,
              }}
              transition={{
                duration: 0.2,
              }}
              className="group rounded-[1.75rem] border border-white/[0.08] bg-white/[0.035] p-6 shadow-xl shadow-black/10 backdrop-blur-xl transition-colors hover:border-emerald-400/20"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">
                    Monthly Income
                  </p>

                  <h3 className="mt-3 text-3xl font-bold tracking-[-0.03em] text-white">
                    {summaryLoading || transactionsError
                      ? "—"
                      : formatCurrency(financialSummary.monthlyIncome)}
                  </h3>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-400/10 bg-emerald-400/[0.08]">
                  <TrendingUp size={20} className="text-emerald-400" />
                </div>
              </div>

              <div className="mt-7 flex items-center gap-2">
                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${getGrowthClass(
                    financialSummary.incomeGrowth,
                    "income"
                  )}`}
                >
                  {summaryLoading
                    ? "Loading..."
                    : transactionsError
                    ? "Unavailable"
                    : formatGrowth(financialSummary.incomeGrowth)}
                </span>

                <span className="text-xs text-slate-500">
                  vs last month
                </span>
              </div>
            </motion.div>

            {/* MONTHLY EXPENSE */}

            <motion.div
              whileHover={{
                y: -5,
              }}
              transition={{
                duration: 0.2,
              }}
              className="group rounded-[1.75rem] border border-white/[0.08] bg-white/[0.035] p-6 shadow-xl shadow-black/10 backdrop-blur-xl transition-colors hover:border-red-400/20"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">
                    Monthly Expense
                  </p>

                  <h3 className="mt-3 text-3xl font-bold tracking-[-0.03em] text-white">
                    {summaryLoading || transactionsError
                      ? "—"
                      : formatCurrency(financialSummary.monthlyExpense)}
                  </h3>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-red-400/10 bg-red-400/[0.08]">
                  <TrendingDown size={20} className="text-red-400" />
                </div>
              </div>

              <div className="mt-7 flex items-center gap-2">
                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${getGrowthClass(
                    financialSummary.expenseGrowth,
                    "expense"
                  )}`}
                >
                  {summaryLoading
                    ? "Loading..."
                    : transactionsError
                    ? "Unavailable"
                    : formatGrowth(financialSummary.expenseGrowth)}
                </span>

                <span className="text-xs text-slate-500">
                  vs last month
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ==========================================
            RECENT TRANSACTIONS
        ========================================== */}

        <section className="mt-20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />

                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-cyan-400">
                  Activity
                </p>
              </div>

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Recent Transactions
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Your latest account activity at a glance.
              </p>
            </div>

            <button
              type="button"
              className="group inline-flex items-center gap-2 self-start rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-2.5 text-xs font-semibold text-slate-300 transition hover:border-cyan-400/20 hover:bg-cyan-400/[0.05] hover:text-cyan-400 sm:self-auto"
            >
              View all

              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </button>
          </div>

          {/* TRANSACTION ERROR STATE — 5.10 */}

          {transactionsError && (
            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="mt-8 overflow-hidden rounded-[1.75rem] border border-red-400/10 bg-red-400/[0.035] p-6 shadow-xl shadow-black/10"
            >
              <div className="flex flex-col items-center justify-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-red-400/10 bg-red-400/[0.07]">
                  <AlertCircle
                    size={24}
                    className="text-red-400"
                  />
                </div>

                <h3 className="mt-4 text-sm font-semibold text-white">
                  Transactions could not be loaded
                </h3>

                <p className="mt-2 max-w-md text-xs leading-5 text-slate-500">
                  Something went wrong while retrieving your latest
                  transactions. Please try again.
                </p>

                <button
                  type="button"
                  onClick={retryTransactions}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl border border-red-400/15 bg-red-400/[0.07] px-4 py-2.5 text-xs font-bold text-red-300 transition hover:border-red-400/30 hover:bg-red-400/[0.12] hover:text-red-200"
                >
                  <RefreshCw size={14} />
                  Retry transactions
                </button>
              </div>
            </motion.div>
          )}

          {/* TRANSACTION LIST / EMPTY STATE */}

          {!transactionsError && (
            <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-white/[0.025] shadow-2xl shadow-black/20 backdrop-blur-xl">
              <div className="hidden border-b border-white/[0.06] px-6 py-4 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-600 sm:grid sm:grid-cols-[1fr_auto]">
                <span>Transaction</span>
                <span>Amount</span>
              </div>

              {transactionsLoading && (
                <div className="flex min-h-32 items-center justify-center gap-3 p-6 text-sm text-slate-400">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-cyan-400/20 border-t-cyan-400" />

                  Loading transactions...
                </div>
              )}

              {!transactionsLoading &&
                transactions.length === 0 && (
                  <div className="flex min-h-56 flex-col items-center justify-center p-8 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.03]">
                      <Activity
                        size={24}
                        className="text-slate-600"
                      />
                    </div>

                    <p className="mt-4 text-sm font-semibold text-slate-400">
                      No transactions yet
                    </p>

                    <p className="mt-1 max-w-sm text-xs leading-5 text-slate-600">
                      Your deposits, withdrawals, and transfers will appear
                      here once you start using your account.
                    </p>

                    <button
                      type="button"
                      onClick={() => openModal("Deposit")}
                      className="mt-5 inline-flex items-center gap-2 rounded-xl border border-cyan-400/10 bg-cyan-400/[0.06] px-4 py-2.5 text-xs font-bold text-cyan-400 transition hover:border-cyan-400/25 hover:bg-cyan-400/[0.1]"
                    >
                      Make a transaction
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                )}

              {!transactionsLoading &&
                transactions.length > 0 && (
                  <div>
                    {transactions.slice(0, 5).map((item, index) => {
                      const type = getTransactionType(item);

                      const income = type === "income";
                      const expense = type === "expense";

                      return (
                        <motion.div
                          key={item.id || index}
                          initial={{
                            opacity: 0,
                            x: -10,
                          }}
                          animate={{
                            opacity: 1,
                            x: 0,
                          }}
                          transition={{
                            delay: index * 0.05,
                            duration: 0.35,
                          }}
                          className="group flex items-center justify-between gap-4 border-b border-white/[0.05] p-5 transition duration-200 last:border-b-0 hover:bg-white/[0.035] sm:px-6"
                        >
                          <div className="flex min-w-0 items-center gap-4">
                            <div
                              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${
                                income
                                  ? "border-emerald-400/10 bg-emerald-400/[0.07]"
                                  : expense
                                  ? "border-red-400/10 bg-red-400/[0.07]"
                                  : "border-white/[0.08] bg-white/[0.04]"
                              }`}
                            >
                              {income ? (
                                <TrendingUp
                                  size={17}
                                  className="text-emerald-400"
                                />
                              ) : expense ? (
                                <TrendingDown
                                  size={17}
                                  className="text-red-400"
                                />
                              ) : (
                                <Activity
                                  size={17}
                                  className="text-slate-500"
                                />
                              )}
                            </div>

                            <div className="min-w-0">
                              <p className="truncate text-sm font-semibold text-white">
                                {getTransactionTitle(item)}
                              </p>

                              <div className="mt-1.5 flex items-center gap-2">
                                <p className="text-xs text-slate-600">
                                  {getTransactionDate(item)}
                                </p>

                                <span className="h-1 w-1 rounded-full bg-slate-700" />

                                <p
                                  className={`text-[10px] uppercase tracking-wider ${
                                    income
                                      ? "text-emerald-400/70"
                                      : expense
                                      ? "text-red-400/70"
                                      : "text-slate-600"
                                  }`}
                                >
                                  {income
                                    ? "Credit"
                                    : expense
                                    ? "Debit"
                                    : "Transfer"}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="flex shrink-0 items-center gap-3">
                            <div className="text-right">
                              <p
                                className={`text-sm font-bold ${
                                  income
                                    ? "text-emerald-400"
                                    : expense
                                    ? "text-red-400"
                                    : "text-slate-400"
                                }`}
                              >
                                {formatAmount(item)}
                              </p>
                            </div>

                            <ChevronRight
                              size={15}
                              className="text-slate-700 transition group-hover:translate-x-0.5 group-hover:text-slate-500"
                            />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
            </div>
          )}
        </section>

        {/* ==========================================
            ANALYTICS
        ========================================== */}

        <section className="mt-20">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />

              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-cyan-400">
                Intelligence
              </p>
            </div>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Analytics & Financial Health
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Understand your financial performance at a glance.
            </p>
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-2">
            <div className="min-w-0 overflow-hidden rounded-[1.75rem]">
              <SpendingChart />
            </div>

            <div className="min-w-0 overflow-hidden rounded-[1.75rem]">
              <FinancialScore />
            </div>
          </div>
        </section>

        {/* ==========================================
            FINANCIAL GOALS
        ========================================== */}

        <FinancialGoals />

        {/* ==========================================
            BANKING SERVICES
        ========================================== */}

        <section className="mt-20">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />

              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-cyan-400">
                Services
              </p>
            </div>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Banking Services
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Stay ahead of upcoming financial commitments.
            </p>
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-2">
            <div className="min-w-0 overflow-hidden rounded-[1.75rem]">
              <UpcomingPayments />
            </div>

            <div className="min-w-0 overflow-hidden rounded-[1.75rem]">
              <LoanCalculator />
            </div>
          </div>
        </section>

        {/* ==========================================
            AI RECOMMENDATION
        ========================================== */}

        <section className="mt-20">
          <div className="relative overflow-hidden rounded-[2rem] border border-cyan-400/10 bg-gradient-to-br from-cyan-400/[0.06] via-white/[0.02] to-blue-500/[0.05] p-5 shadow-2xl shadow-cyan-500/[0.03] sm:p-7">
            <div className="pointer-events-none absolute right-0 top-0 h-56 w-56 rounded-full bg-cyan-400/[0.06] blur-[100px]" />

            <div className="relative mb-7 flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.08]">
                <Sparkles size={20} className="text-cyan-400" />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">
                  Smart Intelligence
                </p>

                <h2 className="mt-1 text-xl font-bold text-white sm:text-2xl">
                  AI Financial Recommendations
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Personalized insights based on your financial activity.
                </p>
              </div>
            </div>

            <div className="relative">
              <AIRecommendation />
            </div>
          </div>
        </section>
      </main>

      {/* ==========================================
          AI ASSISTANT
      ========================================== */}

      <AIAssistant />

      {/* ==========================================
          QUICK ACTION MODAL
      ========================================== */}

      <QuickActionModal
        open={modal}
        close={closeModal}
        title={action}
      />
    </div>
  );
};

export default Dashboard;

