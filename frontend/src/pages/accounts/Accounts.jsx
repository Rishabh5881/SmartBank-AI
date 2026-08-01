import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
Wallet,
Eye,
EyeOff,
Copy,
Check,
TrendingUp,
PiggyBank,
Building2,
ArrowUpRight,
ArrowDownLeft,
MoreHorizontal,
Plus,
ShieldCheck,
CreditCard,
Activity,
ChevronRight,
X,
Landmark,
CircleDollarSign,
BarChart3,
LockKeyhole,
Sparkles,
ExternalLink,
RefreshCw,
} from "lucide-react";

import api from "../../services/api";

const Accounts = () => {
const [showBalance, setShowBalance] = useState(true);
const [copiedAccount, setCopiedAccount] = useState(null);
const [selectedAccount, setSelectedAccount] = useState(null);
const [showAccountModal, setShowAccountModal] = useState(false);

const [accounts, setAccounts] = useState([]);
const [loading, setLoading] = useState(true);
const [refreshing, setRefreshing] = useState(false);
const [error, setError] = useState("");

// ==========================================
// FETCH ACCOUNTS
// ==========================================

useEffect(() => {
let mounted = true;

const fetchAccounts = async (isRefresh = false) => {
  try {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setError("");

    const token = localStorage.getItem("token");

    if (!token) {
      if (mounted) {
        setAccounts([]);
        setError("Please login to view your accounts.");
      }

      return;
    }

    const response = await api.get("/accounts");

    if (!mounted) {
      return;
    }

    const responseData = response?.data;

    if (!responseData?.success) {
      setAccounts([]);
      setError(
        responseData?.message ||
          "Unable to load accounts."
      );

      return;
    }

    const data = responseData?.data;

    const accountList = Array.isArray(data)
      ? data
      : data && typeof data === "object"
        ? [data]
        : [];

    setAccounts(accountList);
  } catch (err) {
    console.error(
      "ACCOUNTS PAGE ERROR:",
      err?.response?.data ||
        err?.message ||
        err
    );

    if (mounted) {
      setAccounts([]);

      setError(
        err?.response?.data?.message ||
          "Unable to load accounts. Please try again."
      );
    }
  } finally {
    if (mounted) {
      setLoading(false);
      setRefreshing(false);
    }
  }
};

fetchAccounts();

// ==========================================
// REFRESH AFTER DASHBOARD / TRANSACTION UPDATE
// ==========================================

const handleDashboardUpdate = () => {
  fetchAccounts(true);
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
// NORMALIZE ACCOUNT DATA
// ==========================================

const normalizedAccounts = useMemo(() => {
return accounts.map((account, index) => {
const accountType =
account?.accountType ||
account?.type ||
"Savings Account";

  const normalizedType = String(accountType)
    .replace(/_/g, " ")
    .toLowerCase();

  const isCurrent =
    normalizedType.includes("current");

  const isSalary =
    normalizedType.includes("salary");

  const Icon = isCurrent
    ? Building2
    : isSalary
      ? Wallet
      : PiggyBank;

  const gradient = isCurrent
    ? "from-violet-600 via-purple-600 to-indigo-600"
    : isSalary
      ? "from-emerald-500 via-green-500 to-teal-500"
      : "from-blue-600 via-blue-500 to-cyan-400";

  const rawBalance =
    account?.balance ??
    account?.currentBalance ??
    0;

  const rawAvailable =
    account?.availableBalance ??
    account?.available ??
    account?.balance ??
    0;

  const rawPending =
    account?.pendingBalance ??
    account?.pending ??
    0;

  const balance = Number(rawBalance) || 0;
  const available = Number(rawAvailable) || 0;
  const pending = Number(rawPending) || 0;

  const accountNumber =
    account?.accountNumber ||
    account?.accountNo ||
    account?.number ||
    "";

  const status =
    account?.status ||
    "ACTIVE";

  return {
    ...account,

    id:
      account?.id ||
      account?._id ||
      `account-${index}`,

    type: String(accountType)
      .replace(/_/g, " "),

    number: String(accountNumber),

    balance,
    available,
    pending,

    icon: Icon,
    gradient,

    status: String(status)
      .replace(/_/g, " "),

    growth:
      account?.growth ||
      account?.growthPercentage ||
      null,

    health:
      Number(account?.health) ||
      null,

    utilization:
      Number(account?.utilization) ||
      null,

    interest:
      account?.interestRate ??
      account?.interest ??
      null,

    opened:
      account?.createdAt ||
      account?.openedAt ||
      null,

    transactions:
      Number(account?.transactionCount) ||
      Number(account?.transactions) ||
      0,
  };
});

}, [accounts]);

// ==========================================
// TOTALS
// ==========================================

const totalBalance = useMemo(() => {
return normalizedAccounts.reduce(
(sum, account) =>
sum + Number(account.balance || 0),
0
);
}, [normalizedAccounts]);

const totalAvailable = useMemo(() => {
return normalizedAccounts.reduce(
(sum, account) =>
sum + Number(account.available || 0),
0
);
}, [normalizedAccounts]);

const totalPending = useMemo(() => {
return normalizedAccounts.reduce(
(sum, account) =>
sum + Number(account.pending || 0),
0
);
}, [normalizedAccounts]);

// ==========================================
// CURRENCY
// ==========================================

const currency =
normalizedAccounts[0]?.currency ||
"INR";

const currencyCode =
String(currency).toUpperCase();

const currencySymbol =
currencyCode === "USD"
? "$"
: currencyCode === "EUR"
? "€"
: currencyCode === "GBP"
? "£"
: "₹";

const locale =
currencyCode === "INR"
? "en-IN"
: "en-US";

// ==========================================
// CURRENCY FORMATTER
// ==========================================

const formatCurrency = (value) => {
const amount = Number(value) || 0;

return `${currencySymbol}${amount.toLocaleString(
  locale,
  {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }
)}`;

};

const formatBalance = (value) => {
return showBalance
? formatCurrency(value)
: "••••••••";
};

// ==========================================
// DATE FORMATTER
// ==========================================

const formatDate = (value) => {
if (!value) {
return "Not available";
}

const date = new Date(value);

if (Number.isNaN(date.getTime())) {
  return String(value);
}

return date.toLocaleDateString("en-IN", {
  month: "short",
  year: "numeric",
});

};

// ==========================================
// COPY ACCOUNT
// ==========================================

const copyAccount = async (number) => {
if (!number) {
return;
}

try {
  await navigator.clipboard.writeText(number);

  setCopiedAccount(number);

  setTimeout(() => {
    setCopiedAccount(null);
  }, 1800);
} catch (error) {
  console.error(
    "COPY ACCOUNT ERROR:",
    error
  );
}

};

// ==========================================
// ACCOUNT DETAILS
// ==========================================

const openAccountDetails = (account) => {
setSelectedAccount(account);
setShowAccountModal(true);
};

const closeAccountModal = () => {
setShowAccountModal(false);
setSelectedAccount(null);
};

// ==========================================
// MANUAL REFRESH
// ==========================================

const handleRefresh = () => {
window.dispatchEvent(
new Event("dashboardUpdated")
);
};

// ==========================================
// RENDER
// ==========================================

return (
<div className="min-h-screen bg-[#020617] px-4 pb-16 pt-28 text-white sm:px-6 lg:px-10">

  {/* =====================================================
      BACKGROUND
  ===================================================== */}

  <div className="pointer-events-none fixed left-0 top-20 -z-0 h-[420px] w-[420px] rounded-full bg-blue-600/[0.06] blur-[140px]" />

  <div className="pointer-events-none fixed bottom-0 right-0 -z-0 h-[450px] w-[450px] rounded-full bg-cyan-500/[0.05] blur-[150px]" />

  <div className="relative z-10 mx-auto max-w-[1550px]">

    {/* =====================================================
        HEADER
    ===================================================== */}

    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
    >
      <div>

        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/10 bg-cyan-400/[0.06] px-3 py-1.5">
          <Wallet
            size={13}
            className="text-cyan-400"
          />

          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-400">
            Financial Overview
          </span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          My Accounts
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
          Manage your accounts, monitor balances, and keep track of your
          financial activity from one secure place.
        </p>

      </div>

      <div className="flex flex-wrap items-center gap-3">

        <div className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3">

          <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50" />

          <span className="text-xs font-semibold text-slate-400">
            {loading
              ? "Loading accounts..."
              : error
                ? "Account service unavailable"
                : "All systems operational"}
          </span>

        </div>

        <button
          type="button"
          onClick={handleRefresh}
          disabled={refreshing}
          className="group flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.035] px-4 py-3 text-sm font-semibold text-slate-300 transition-all duration-300 hover:border-cyan-400/20 hover:bg-cyan-400/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw
            size={16}
            className={`text-cyan-400 ${
              refreshing
                ? "animate-spin"
                : ""
            }`}
          />

          Refresh
        </button>

        <button
          type="button"
          className="group flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.035] px-4 py-3 text-sm font-semibold text-slate-300 transition-all duration-300 hover:border-cyan-400/20 hover:bg-cyan-400/[0.06] hover:text-white"
        >
          <Plus
            size={17}
            className="text-cyan-400 transition-transform duration-300 group-hover:rotate-90"
          />

          Add Account
        </button>

      </div>
    </motion.div>

    {/* =====================================================
        ERROR
    ===================================================== */}

    {error && (
      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="mt-6 flex flex-col gap-3 rounded-2xl border border-red-400/10 bg-red-400/[0.04] p-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <p className="text-sm font-semibold text-red-300">
            Unable to load accounts
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {error}
          </p>
        </div>

        <button
          type="button"
          onClick={handleRefresh}
          className="flex w-fit items-center gap-2 rounded-xl border border-red-400/10 bg-red-400/[0.05] px-4 py-2.5 text-xs font-semibold text-red-300 transition hover:bg-red-400/[0.1]"
        >
          <RefreshCw size={14} />
          Try Again
        </button>
      </motion.div>
    )}

    {/* =====================================================
        TOTAL BALANCE
    ===================================================== */}

    <motion.section
      initial={{
        opacity: 0,
        y: 24,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.55,
        delay: 0.08,
      }}
      className="relative mt-9 overflow-hidden rounded-[32px] border border-cyan-400/10 bg-gradient-to-br from-blue-600 via-blue-600 to-cyan-500 p-6 shadow-2xl shadow-blue-950/30 sm:p-8 lg:p-10"
    >

      <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-cyan-300/10 blur-3xl" />

      <div className="pointer-events-none absolute right-8 top-8 h-32 w-32 rounded-full border border-white/10" />

      <div className="pointer-events-none absolute right-16 top-16 h-16 w-16 rounded-full border border-white/10" />

      <div className="relative grid gap-8 xl:grid-cols-[1fr_auto] xl:items-center">

        <div>

          <div className="flex items-center gap-2">

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
              <CircleDollarSign size={17} />
            </div>

            <p className="text-sm font-medium text-white/70">
              Total Balance
            </p>

          </div>

          <div className="mt-5 flex items-center gap-4">

            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {loading
                ? "..."
                : formatBalance(totalBalance)}
            </h2>

            <button
              type="button"
              onClick={() =>
                setShowBalance(
                  (value) => !value
                )
              }
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white/80 transition hover:bg-white/20 hover:text-white"
            >
              {showBalance ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>

          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">

            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/80">
              <Wallet size={13} />
              {normalizedAccounts.length} account
              {normalizedAccounts.length === 1
                ? ""
                : "s"}
            </span>

            <span className="text-xs text-white/60">
              Real-time account balance
            </span>

          </div>

        </div>

        {/* Balance Metrics */}

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:min-w-[520px]">

          <BalanceMetric
            label="Available"
            value={
              loading
                ? "..."
                : formatBalance(
                    totalAvailable
                  )
            }
            description="Ready to spend"
          />

          <BalanceMetric
            label="Pending"
            value={
              loading
                ? "..."
                : formatBalance(
                    totalPending
                  )
            }
            description="On hold"
          />

          <BalanceMetric
            label="Accounts"
            value={
              loading
                ? "--"
                : String(
                    normalizedAccounts.length
                  ).padStart(2, "0")
            }
            description="Active accounts"
          />

        </div>
      </div>
    </motion.section>

    {/* =====================================================
        QUICK STATS
    ===================================================== */}

    <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

      <StatCard
        label="Monthly Income"
        value="API pending"
        change="Coming soon"
        icon={
          <ArrowDownLeft size={18} />
        }
        iconClass="bg-emerald-400/10 text-emerald-400"
      />

      <StatCard
        label="Monthly Spending"
        value="API pending"
        change="Coming soon"
        icon={
          <ArrowUpRight size={18} />
        }
        iconClass="bg-red-400/10 text-red-400"
      />

      <StatCard
        label="Savings Rate"
        value="API pending"
        change="Coming soon"
        icon={
          <PiggyBank size={18} />
        }
        iconClass="bg-cyan-400/10 text-cyan-400"
      />

      <StatCard
        label="Financial Health"
        value="API pending"
        change="Coming soon"
        icon={
          <Activity size={18} />
        }
        iconClass="bg-purple-400/10 text-purple-400"
      />

    </div>

    {/* =====================================================
        AI INSIGHT
    ===================================================== */}

    <motion.section
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: 0.25,
      }}
      className="mt-6 rounded-[24px] border border-cyan-400/10 bg-gradient-to-r from-cyan-400/[0.06] via-blue-500/[0.04] to-transparent p-5"
    >

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-400">
          <Sparkles size={19} />
        </div>

        <div className="flex-1">

          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-cyan-400">
            SmartBank AI Insight
          </p>

          <p className="mt-1 text-sm leading-6 text-slate-300">
            AI-powered financial insights will appear here once the
            analytics and AI services are connected.
          </p>

        </div>

        <button
          type="button"
          className="flex items-center gap-2 text-xs font-semibold text-cyan-400 transition hover:text-cyan-300"
        >
          View insight
          <ChevronRight size={14} />
        </button>

      </div>
    </motion.section>

    {/* =====================================================
        ACCOUNTS HEADER
    ===================================================== */}

    <motion.div
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      viewport={{
        once: true,
      }}
      className="mt-14 flex items-end justify-between"
    >

      <div>

        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-400">
          Your portfolio
        </p>

        <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
          Your Accounts
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          Monitor balances, activity and account health.
        </p>

      </div>

      <span className="hidden rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 text-xs text-slate-500 sm:block">
        {loading
          ? "Loading..."
          : `${normalizedAccounts.length} Active`}
      </span>

    </motion.div>

    {/* =====================================================
        LOADING STATE
    ===================================================== */}

    {loading && (
      <div className="mt-6 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">

        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="min-h-[430px] animate-pulse rounded-[28px] border border-white/[0.06] bg-white/[0.025] p-6"
          >
            <div className="h-12 w-12 rounded-2xl bg-white/[0.06]" />

            <div className="mt-7 h-3 w-24 rounded bg-white/[0.06]" />

            <div className="mt-2 h-7 w-44 rounded bg-white/[0.06]" />

            <div className="mt-7 h-3 w-28 rounded bg-white/[0.06]" />

            <div className="mt-2 h-5 w-36 rounded bg-white/[0.06]" />

            <div className="mt-8 border-t border-white/[0.06] pt-5">

              <div className="h-3 w-28 rounded bg-white/[0.06]" />

              <div className="mt-2 h-9 w-48 rounded bg-white/[0.06]" />

            </div>

            <div className="mt-5 h-10 rounded-xl bg-white/[0.04]" />

            <div className="mt-5 h-2 rounded-full bg-white/[0.05]" />

          </div>
        ))}

      </div>
    )}

    {/* =====================================================
        EMPTY STATE
    ===================================================== */}

    {!loading &&
      !error &&
      normalizedAccounts.length === 0 && (
        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mt-6 rounded-[28px] border border-white/[0.07] bg-white/[0.025] p-10 text-center"
        >

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-400">
            <Landmark size={26} />
          </div>

          <h3 className="mt-5 text-xl font-bold">
            No accounts found
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            There are no bank accounts associated with your profile yet.
          </p>

          <button
            type="button"
            onClick={handleRefresh}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-xs font-bold text-slate-950 transition hover:bg-cyan-300"
          >
            <RefreshCw size={15} />
            Refresh Accounts
          </button>

        </motion.div>
      )}

    {/* =====================================================
        ACCOUNT CARDS
    ===================================================== */}

    {!loading &&
      normalizedAccounts.length > 0 && (
        <div className="mt-6 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">

          {normalizedAccounts.map(
            (account, index) => {
              const Icon = account.icon;

              return (
                <motion.div
                  key={account.id}
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  whileHover={{
                    y: -6,
                  }}
                  className={`group relative overflow-hidden rounded-[28px] bg-gradient-to-br ${account.gradient} p-[1px] shadow-xl`}
                >

                  <div className="relative h-full overflow-hidden rounded-[27px] bg-[#07101f]/90 p-6 backdrop-blur-xl">

                    <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-white/10 blur-3xl transition duration-500 group-hover:bg-white/15" />

                    {/* Top */}

                    <div className="relative flex items-start justify-between">

                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur-md">
                        <Icon size={21} />
                      </div>

                      <div className="flex items-center gap-2">

                        <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-[10px] font-semibold text-white/90">

                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />

                          {account.status}

                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            openAccountDetails(
                              account
                            )
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white/70 transition hover:bg-white/20 hover:text-white"
                        >
                          <MoreHorizontal
                            size={17}
                          />
                        </button>

                      </div>
                    </div>

                    {/* Account Name */}

                    <div className="relative mt-7">

                      <p className="text-xs font-medium text-white/60">
                        Account Type
                      </p>

                      <h3 className="mt-1 text-2xl font-bold tracking-tight">
                        {account.type}
                      </h3>

                    </div>

                    {/* Number */}

                    <div className="relative mt-6">

                      <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/50">
                        Account Number
                      </p>

                      <div className="mt-2 flex items-center gap-2">

                        <p className="font-mono text-sm font-semibold tracking-wider text-white/90">
                          {account.number || "Not available"}
                        </p>

                        {account.number && (
                          <button
                            type="button"
                            onClick={() =>
                              copyAccount(
                                account.number
                              )
                            }
                            className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-white/70 transition hover:bg-white/20 hover:text-white"
                          >
                            <AnimatePresence
                              mode="wait"
                              initial={false}
                            >
                              {copiedAccount ===
                              account.number ? (
                                <motion.span
                                  key="check"
                                  initial={{
                                    scale: 0.6,
                                    opacity: 0,
                                  }}
                                  animate={{
                                    scale: 1,
                                    opacity: 1,
                                  }}
                                  exit={{
                                    scale: 0.6,
                                    opacity: 0,
                                  }}
                                >
                                  <Check
                                    size={14}
                                    className="text-emerald-300"
                                  />
                                </motion.span>
                              ) : (
                                <motion.span
                                  key="copy"
                                  initial={{
                                    scale: 0.6,
                                    opacity: 0,
                                  }}
                                  animate={{
                                    scale: 1,
                                    opacity: 1,
                                  }}
                                  exit={{
                                    scale: 0.6,
                                    opacity: 0,
                                  }}
                                >
                                  <Copy
                                    size={14}
                                  />
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </button>
                        )}

                      </div>
                    </div>

                    {/* Balance */}

                    <div className="relative mt-7 border-t border-white/10 pt-5">

                      <div className="flex items-end justify-between gap-4">

                        <div>

                          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/50">
                            Current Balance
                          </p>

                          <p className="mt-1 text-3xl font-bold tracking-tight">
                            {formatBalance(
                              account.balance
                            )}
                          </p>

                        </div>

                        <div className="text-right">

                          <p className="text-[10px] text-white/50">
                            Monthly growth
                          </p>

                          <p className="mt-1 text-sm font-bold text-emerald-200">
                            {account.growth
                              ? String(
                                  account.growth
                                ).includes("%")
                                ? account.growth
                                : `+${account.growth}%`
                              : "Not available"}
                          </p>

                        </div>

                      </div>

                    </div>

                    {/* Available */}

                    <div className="relative mt-5 flex items-center justify-between rounded-xl bg-black/10 px-3 py-2.5">

                      <span className="text-[11px] text-white/50">
                        Available balance
                      </span>

                      <span className="text-xs font-semibold text-white/80">
                        {formatBalance(
                          account.available
                        )}
                      </span>

                    </div>

                    {/* Health */}

                    <div className="relative mt-5">

                      <div className="mb-2 flex items-center justify-between">

                        <span className="text-[10px] font-medium text-white/50">
                          Account health
                        </span>

                        <span className="text-[10px] font-bold text-emerald-300">
                          {account.health
                            ? `${account.health}/100`
                            : "Not available"}
                        </span>

                      </div>

                      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">

                        <motion.div
                          initial={{
                            width: 0,
                          }}
                          whileInView={{
                            width: `${
                              account.health ||
                              0
                            }%`,
                          }}
                          viewport={{
                            once: true,
                          }}
                          transition={{
                            duration: 0.8,
                            delay: 0.3,
                          }}
                          className="h-full rounded-full bg-emerald-400"
                        />

                      </div>

                    </div>

                    {/* Footer */}

                    <div className="relative mt-5 flex items-center justify-between border-t border-white/10 pt-4">

                      <div className="flex items-center gap-2 text-[10px] text-white/50">
                        <Activity size={13} />

                        {account.transactions > 0
                          ? `${account.transactions} transactions`
                          : "Transaction data pending"}
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          openAccountDetails(
                            account
                          )
                        }
                        className="flex items-center gap-1 text-[10px] font-semibold text-white/70 transition hover:text-white"
                      >
                        Details
                        <ChevronRight
                          size={13}
                        />
                      </button>

                    </div>

                  </div>
                </motion.div>
              );
            }
          )}

        </div>
      )}

    {/* =====================================================
        ACCOUNT SECURITY
    ===================================================== */}

    <motion.section
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      className="mt-8 rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.035] p-5 sm:p-6"
    >

      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-4">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10">
            <ShieldCheck
              size={20}
              className="text-emerald-400"
            />
          </div>

          <div>

            <h3 className="text-sm font-semibold">
              Your accounts are protected
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              SmartBank AI continuously monitors your account activity for
              suspicious behavior.
            </p>

          </div>

        </div>

        <div className="flex items-center gap-3">

          <span className="hidden text-[10px] text-slate-600 sm:block">
            Live account protection
          </span>

          <span className="flex w-fit items-center gap-2 rounded-full border border-emerald-400/10 bg-emerald-400/[0.06] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-400">

            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

            Protected

          </span>

        </div>

      </div>
    </motion.section>

    {/* =====================================================
        RECENT ACTIVITY
    ===================================================== */}

    <motion.section
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      className="mt-10 overflow-hidden rounded-[28px] border border-white/[0.07] bg-white/[0.025]"
    >

      <div className="flex flex-col gap-4 border-b border-white/[0.06] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">

        <div>

          <div className="flex items-center gap-2">

            <Activity
              size={17}
              className="text-cyan-400"
            />

            <h2 className="text-lg font-bold sm:text-xl">
              Recent Activity
            </h2>

          </div>

          <p className="mt-1 text-xs text-slate-500">
            Transaction history will be connected in the Transactions API
            phase.
          </p>

        </div>

        <button
          type="button"
          className="group flex w-fit items-center gap-1.5 text-xs font-semibold text-cyan-400 transition hover:text-cyan-300"
        >
          View All

          <ChevronRight
            size={14}
            className="transition-transform group-hover:translate-x-1"
          />
        </button>

      </div>

      <div className="flex flex-col items-center justify-center px-5 py-12 text-center">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-400">
          <Activity size={23} />
        </div>

        <h3 className="mt-4 text-sm font-semibold text-slate-200">
          Transaction data coming next
        </h3>

        <p className="mt-2 max-w-md text-xs leading-5 text-slate-600">
          Your real account balances are connected now. Recent
          transactions will be connected through the Transactions API in
          the next integration step.
        </p>

      </div>

    </motion.section>

    {/* =====================================================
        QUICK ACTIONS
    ===================================================== */}

    <section className="mt-10 grid gap-4 sm:grid-cols-3">

      <QuickAction
        icon={<ArrowUpRight size={18} />}
        title="Send Money"
        description="Transfer funds securely"
      />

      <QuickAction
        icon={<ArrowDownLeft size={18} />}
        title="Add Money"
        description="Fund your account"
      />

      <QuickAction
        icon={<CreditCard size={18} />}
        title="Manage Cards"
        description="View linked cards"
      />

    </section>

  </div>

  {/* =====================================================
      ACCOUNT DETAILS MODAL
  ===================================================== */}

  <AnimatePresence>

    {showAccountModal &&
      selectedAccount && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-md"
          onClick={closeAccountModal}
        >

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 25,
              scale: 0.97,
            }}
            transition={{
              duration: 0.25,
            }}
            onClick={(event) =>
              event.stopPropagation()
            }
            className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-[30px] border border-white/[0.08] bg-[#07101f] p-6 shadow-2xl sm:p-8"
          >

            {/* Modal Header */}

            <div className="flex items-start justify-between">

              <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-400">
                  <Landmark size={21} />
                </div>

                <div>

                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-400">
                    Account Details
                  </p>

                  <h2 className="mt-1 text-xl font-bold">
                    {selectedAccount.type}
                  </h2>

                </div>

              </div>

              <button
                type="button"
                onClick={closeAccountModal}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04] text-slate-500 transition hover:bg-white/[0.08] hover:text-white"
              >
                <X size={18} />
              </button>

            </div>

            {/* Modal Balance */}

            <div className="mt-7 rounded-[24px] border border-cyan-400/10 bg-gradient-to-br from-blue-600/20 to-cyan-500/10 p-6">

              <p className="text-xs text-slate-500">
                Current Balance
              </p>

              <h3 className="mt-2 text-4xl font-bold">
                {formatBalance(
                  selectedAccount.balance
                )}
              </h3>

              <div className="mt-5 flex items-center justify-between">

                <div>

                  <p className="text-[10px] text-slate-600">
                    Available
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-300">
                    {formatBalance(
                      selectedAccount.available
                    )}
                  </p>

                </div>

                <div className="text-right">

                  <p className="text-[10px] text-slate-600">
                    Pending
                  </p>

                  <p className="mt-1 text-sm font-semibold text-amber-400">
                    {formatBalance(
                      selectedAccount.pending
                    )}
                  </p>

                </div>

              </div>
            </div>

            {/* Details Grid */}

            <div className="mt-5 grid gap-3 sm:grid-cols-2">

              <DetailBox
                label="Account Number"
                value={
                  selectedAccount.number ||
                  "Not available"
                }
              />

              <DetailBox
                label="Status"
                value={
                  selectedAccount.status ||
                  "Not available"
                }
                valueClass="text-emerald-400"
              />

              <DetailBox
                label="Interest Rate"
                value={
                  selectedAccount.interest
                    ? String(
                        selectedAccount.interest
                      ).includes("%")
                      ? selectedAccount.interest
                      : `${selectedAccount.interest}%`
                    : "Not available"
                }
              />

              <DetailBox
                label="Opened"
                value={formatDate(
                  selectedAccount.opened
                )}
              />

              <DetailBox
                label="Transactions"
                value={
                  selectedAccount.transactions
                    ? `${selectedAccount.transactions}`
                    : "Not available"
                }
              />

              <DetailBox
                label="Monthly Growth"
                value={
                  selectedAccount.growth
                    ? String(
                        selectedAccount.growth
                      ).includes("%")
                      ? selectedAccount.growth
                      : `+${selectedAccount.growth}%`
                    : "Not available"
                }
                valueClass="text-emerald-400"
              />

            </div>

            {/* Account Health */}

            <div className="mt-5 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-5">

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-2">

                  <BarChart3
                    size={16}
                    className="text-cyan-400"
                  />

                  <span className="text-sm font-semibold">
                    Account Health
                  </span>

                </div>

                <span className="text-sm font-bold text-emerald-400">
                  {selectedAccount.health
                    ? `${selectedAccount.health}/100`
                    : "Not available"}
                </span>

              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/[0.06]">

                <div
                  className="h-full rounded-full bg-emerald-400 transition-all duration-700"
                  style={{
                    width: `${
                      selectedAccount.health ||
                      0
                    }%`,
                  }}
                />

              </div>

              <p className="mt-3 text-xs text-slate-600">
                Account health information will reflect backend data when
                available.
              </p>

            </div>

            {/* Security */}

            <div className="mt-5 flex items-center gap-3 rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.035] p-4">

              <LockKeyhole
                size={17}
                className="text-emerald-400"
              />

              <div>

                <p className="text-xs font-semibold text-slate-200">
                  Account secured
                </p>

                <p className="mt-1 text-[10px] text-slate-600">
                  SmartBank AI monitoring is active.
                </p>

              </div>

            </div>

            {/* Actions */}

            <div className="mt-6 grid gap-3 sm:grid-cols-2">

              <button
                type="button"
                onClick={() =>
                  copyAccount(
                    selectedAccount.number
                  )
                }
                disabled={
                  !selectedAccount.number
                }
                className="flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.035] px-4 py-3 text-xs font-semibold text-slate-300 transition hover:bg-white/[0.07] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Copy size={15} />
                Copy Account Number
              </button>

              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 text-xs font-bold text-slate-950 transition hover:bg-cyan-300"
              >
                <ExternalLink size={15} />
                View Transactions
              </button>

            </div>

          </motion.div>

        </motion.div>
      )}

  </AnimatePresence>
</div>

);
};

/* =========================================================
BALANCE METRIC
========================================================= */

const BalanceMetric = ({
label,
value,
description,
}) => {
return (
<div className="rounded-2xl border border-white/10 bg-white/[0.08] p-4 backdrop-blur-md">

  <p className="text-[10px] uppercase tracking-wider text-white/50">
    {label}
  </p>

  <p className="mt-2 text-lg font-bold sm:text-xl">
    {value}
  </p>

  <p className="mt-1 text-[10px] text-white/50">
    {description}
  </p>

</div>

);
};

/* =========================================================
STAT CARD
========================================================= */

const StatCard = ({
label,
value,
change,
icon,
iconClass,
}) => {
return (
<motion.div
whileHover={{
y: -4,
}}
className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition-all duration-300 hover/[0.12] hover/[0.04]"
>

  <div className="flex items-start justify-between">

    <div
      className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconClass}`}
    >
      {icon}
    </div>

    <span className="rounded-full bg-white/[0.03] px-2.5 py-1 text-[10px] font-semibold text-slate-500">
      {change}
    </span>

  </div>

  <p className="mt-5 text-xs font-medium text-slate-500">
    {label}
  </p>

  <p className="mt-1 text-xl font-bold text-white">
    {value}
  </p>

</motion.div>

);
};

/* =========================================================
DETAIL BOX
========================================================= */

const DetailBox = ({
label,
value,
valueClass = "text-slate-200",
}) => {
return (
<div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4">

  <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-600">
    {label}
  </p>

  <p
    className={`mt-2 text-sm font-semibold ${valueClass}`}
  >
    {value}
  </p>

</div>

);
};

/* =========================================================
QUICK ACTION
========================================================= */

const QuickAction = ({
icon,
title,
description,
}) => {
return (
<button type="button" className="group flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/15 hover:bg-cyan-400/[0.035]" >

  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] text-slate-400 transition group-hover:bg-cyan-400/10 group-hover:text-cyan-400">
    {icon}
  </div>

  <div className="min-w-0">

    <p className="text-sm font-semibold text-white">
      {title}
    </p>

    <p className="mt-1 text-xs text-slate-500">
      {description}
    </p>

  </div>

  <ChevronRight
    size={16}
    className="ml-auto text-slate-700 transition group-hover:translate-x-1 group-hover:text-cyan-400"
  />

</button>

);
};

export default Accounts;