import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Search,
  ArrowDownLeft,
  ArrowUpRight,
  Wallet,
  CreditCard,
  Filter,
  TrendingUp,
  TrendingDown,
  Activity,
  ChevronRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  ReceiptText,
  X,
  Download,
  MoreHorizontal,
  SlidersHorizontal,
  ArrowUp,
  ArrowDown,
  CircleDollarSign,
  PiggyBank,
  Send,
  Plus,
  Eye,
  ShieldCheck,
  Copy,
  Check,
  Hash,
  Landmark,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

import api from "../../services/api";

const TRANSACTION_CATEGORIES = [
  "All",
  "Income",
  "Expense",
  "Transfer",
];

const TRANSACTION_STATUSES = [
  "All",
  "Completed",
  "Pending",
  "Failed",
];

const SORT_OPTIONS = [
  {
    value: "Newest",
    label: "Newest",
  },
  {
    value: "Highest",
    label: "Highest Amount",
  },
  {
    value: "Lowest",
    label: "Lowest Amount",
  },
];

const currencyFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const timeFormatter = new Intl.DateTimeFormat("en-IN", {
  hour: "2-digit",
  minute: "2-digit",
});

const formatCurrency = (value) => {
  const amount = Number(value || 0);

  return `$${currencyFormatter.format(Math.abs(amount))}`;
};

const formatSignedCurrency = (value) => {
  const amount = Number(value || 0);

  return `${amount >= 0 ? "+" : "-"}${formatCurrency(amount)}`;
};

const normalizeTransactionStatus = (status) => {
  const value = String(status || "").toUpperCase();

  if (
    value === "COMPLETED" ||
    value === "SUCCESS" ||
    value === "SUCCESSFUL"
  ) {
    return "Completed";
  }

  if (
    value === "FAILED" ||
    value === "CANCELLED" ||
    value === "REJECTED"
  ) {
    return "Failed";
  }

  return "Pending";
};

const mapTransaction = (transaction) => {
  const amount = Number(transaction?.amount || 0);

  const type = String(transaction?.type || "").toUpperCase();

  const status = normalizeTransactionStatus(
    transaction?.status
  );

  const createdAt = transaction?.createdAt
    ? new Date(transaction.createdAt)
    : null;

  const isValidDate =
    createdAt instanceof Date &&
    !Number.isNaN(createdAt.getTime());

  let category = "Transfer";
  let title = "Money Transfer";
  let icon = Send;
  let signedAmount = -Math.abs(amount);

  if (type === "DEPOSIT") {
    category = "Income";
    title = "Money Deposited";
    icon = ArrowDownLeft;
    signedAmount = Math.abs(amount);
  }

  if (
    type === "WITHDRAWAL" ||
    type === "WITHDRAW"
  ) {
    category = "Expense";
    title = "Money Withdrawn";
    icon = ArrowUpRight;
    signedAmount = -Math.abs(amount);
  }

  if (type === "TRANSFER") {
    category = "Transfer";
    title = "Money Transfer";
    icon = Send;
    signedAmount = -Math.abs(amount);
  }

  const sourceAccount =
    transaction?.sourceAccount?.accountNumber || "";

  const destinationAccount =
    transaction?.destinationAccount?.accountNumber || "";

  let account = "Bank Account";

  if (sourceAccount && destinationAccount) {
    account = `${sourceAccount} → ${destinationAccount}`;
  } else if (sourceAccount) {
    account = sourceAccount;
  } else if (destinationAccount) {
    account = destinationAccount;
  }

  return {
    id: transaction?.id || "N/A",
    title,
    category,
    amount: signedAmount,
    date: isValidDate
      ? dateFormatter.format(createdAt)
      : "Date unavailable",
    time: isValidDate
      ? timeFormatter.format(createdAt)
      : "Time unavailable",
    status,
    description:
      transaction?.description ||
      "Transaction processed through SmartBank AI",
    account,
    reference:
      transaction?.id ||
      "Reference unavailable",
    merchant:
      transaction?.description ||
      "SmartBank AI",
    icon,
    rawType: type || "TRANSACTION",
    balanceAfter:
      transaction?.balanceAfter !== null &&
      transaction?.balanceAfter !== undefined
        ? Number(transaction.balanceAfter)
        : null,
    createdAt: isValidDate
      ? createdAt.getTime()
      : 0,
  };
};

const Transactions = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const [selectedTransaction, setSelectedTransaction] =
    useState(null);

  const [copiedId, setCopiedId] = useState(false);

  const fetchTransactions = useCallback(
    async ({ silent = false } = {}) => {
      try {
        if (silent) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        setError("");

        const response = await api.get("/transactions");

        const rawTransactions =
          response?.data?.data?.transactions || [];

        const mappedTransactions = Array.isArray(
          rawTransactions
        )
          ? rawTransactions.map(mapTransaction)
          : [];

        setTransactions(mappedTransactions);
      } catch (err) {
        console.error(
          "TRANSACTIONS FETCH ERROR:",
          err
        );

        const responseMessage =
          err?.response?.data?.message;

        const fallbackMessage =
          err?.message ||
          "Unable to load transactions.";

        setError(
          responseMessage ||
            fallbackMessage
        );

        if (!silent) {
          setTransactions([]);
        }
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  useEffect(() => {
    const handleDashboardUpdate = () => {
      fetchTransactions({
        silent: true,
      });
    };

    window.addEventListener(
      "dashboardUpdated",
      handleDashboardUpdate
    );

    return () => {
      window.removeEventListener(
        "dashboardUpdated",
        handleDashboardUpdate
      );
    };
  }, [fetchTransactions]);

  useEffect(() => {
    if (!selectedTransaction) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setSelectedTransaction(null);
        setCopiedId(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [selectedTransaction]);

  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    const searchValue =
      search.trim().toLowerCase();

    if (searchValue) {
      result = result.filter((item) => {
        const searchableFields = [
          item.title,
          item.description,
          item.account,
          item.id,
          item.merchant,
          item.category,
          item.status,
          item.rawType,
        ];

        return searchableFields.some((field) =>
          String(field || "")
            .toLowerCase()
            .includes(searchValue)
        );
      });
    }

    if (category !== "All") {
      result = result.filter(
        (item) => item.category === category
      );
    }

    if (status !== "All") {
      result = result.filter(
        (item) => item.status === status
      );
    }

    if (sortBy === "Newest") {
      result.sort(
        (a, b) =>
          Number(b.createdAt || 0) -
          Number(a.createdAt || 0)
      );
    }

    if (sortBy === "Highest") {
      result.sort(
        (a, b) =>
          Math.abs(Number(b.amount || 0)) -
          Math.abs(Number(a.amount || 0))
      );
    }

    if (sortBy === "Lowest") {
      result.sort(
        (a, b) =>
          Math.abs(Number(a.amount || 0)) -
          Math.abs(Number(b.amount || 0))
      );
    }

    return result;
  }, [
    transactions,
    search,
    category,
    status,
    sortBy,
  ]);

  const financialSummary = useMemo(() => {
    let income = 0;
    let expense = 0;

    transactions.forEach((item) => {
      const amount = Number(item.amount || 0);

      if (amount > 0) {
        income += amount;
      } else {
        expense += Math.abs(amount);
      }
    });

    return {
      income,
      expense,
      netFlow: income - expense,
    };
  }, [transactions]);

  const completedCount = useMemo(
    () =>
      transactions.filter(
        (item) => item.status === "Completed"
      ).length,
    [transactions]
  );

  const pendingCount = useMemo(
    () =>
      transactions.filter(
        (item) => item.status === "Pending"
      ).length,
    [transactions]
  );

  const failedCount = useMemo(
    () =>
      transactions.filter(
        (item) => item.status === "Failed"
      ).length,
    [transactions]
  );

  const periodLabel = useMemo(() => {
    if (!transactions.length) {
      return "All Activity";
    }

    const validDates = transactions
      .map((item) => item.createdAt)
      .filter(
        (value) =>
          Number.isFinite(value) && value > 0
      );

    if (!validDates.length) {
      return "All Activity";
    }

    const newest = new Date(
      Math.max(...validDates)
    );

    const oldest = new Date(
      Math.min(...validDates)
    );

    const sameMonth =
      newest.getMonth() ===
        oldest.getMonth() &&
      newest.getFullYear() ===
        oldest.getFullYear();

    if (sameMonth) {
      return newest.toLocaleDateString(
        "en-IN",
        {
          month: "long",
          year: "numeric",
        }
      );
    }

    return `${oldest.toLocaleDateString(
      "en-IN",
      {
        month: "short",
        year: "numeric",
      }
    )} – ${newest.toLocaleDateString(
      "en-IN",
      {
        month: "short",
        year: "numeric",
      }
    )}`;
  }, [transactions]);

  const hasActiveFilters =
    Boolean(search.trim()) ||
    category !== "All" ||
    status !== "All" ||
    sortBy !== "Newest";

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setStatus("All");
    setSortBy("Newest");
  };

  const openTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setCopiedId(false);
  };

  const closeTransaction = () => {
    setSelectedTransaction(null);
    setCopiedId(false);
  };

  const copyTransactionId = async () => {
    if (!selectedTransaction?.id) {
      return;
    }

    try {
      await navigator.clipboard.writeText(
        selectedTransaction.id
      );

      setCopiedId(true);

      window.setTimeout(() => {
        setCopiedId(false);
      }, 1800);
    } catch (copyError) {
      console.error(
        "COPY TRANSACTION ID ERROR:",
        copyError
      );
    }
  };

  const exportTransactions = () => {
    if (!filteredTransactions.length) {
      return;
    }

    const headers = [
      "Transaction ID",
      "Title",
      "Category",
      "Amount",
      "Date",
      "Time",
      "Status",
      "Description",
      "Account",
    ];

    const rows = filteredTransactions.map(
      (item) => [
        item.id,
        item.title,
        item.category,
        Number(item.amount || 0).toFixed(2),
        item.date,
        item.time,
        item.status,
        item.description,
        item.account,
      ]
    );

    const csvContent = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row
          .map(
            (value) =>
              `"${String(value).replace(
                /"/g,
                '""'
              )}"`
          )
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download =
      "smartbank-transactions.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const handleRetry = () => {
    fetchTransactions();
  };

  const handleRefresh = () => {
    fetchTransactions({
      silent: true,
    });
  };

  return (
    <div className="min-h-screen bg-[#020617] px-5 pb-14 pt-28 text-white sm:px-7 lg:px-10">
      <div className="pointer-events-none fixed left-0 top-20 -z-0 h-[350px] w-[350px] rounded-full bg-blue-600/[0.06] blur-[130px]" />

      <div className="pointer-events-none fixed bottom-0 right-0 -z-0 h-[400px] w-[400px] rounded-full bg-cyan-500/[0.05] blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-[1650px]">
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
            duration: 0.5,
          }}
          className="flex flex-col justify-between gap-6 xl:flex-row xl:items-end"
        >
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/10 bg-blue-400/[0.06] px-3 py-1.5">
              <Activity
                size={13}
                className="text-cyan-400"
              />

              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-300">
                Transaction Center
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-[42px]">
              Transactions
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
              Monitor every transaction, understand
              your cash flow, and stay in control of
              your financial activity.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] px-4 py-3 backdrop-blur-xl">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <CalendarDays size={17} />
              </div>

              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-600">
                  Period
                </p>

                <p className="mt-0.5 text-sm font-semibold text-slate-200">
                  {periodLabel}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleRefresh}
              disabled={loading || refreshing}
              className="flex items-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.035] px-4 py-3 text-sm font-semibold text-slate-300 transition hover:border-cyan-400/20 hover:bg-cyan-400/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RefreshCw
                size={17}
                className={
                  refreshing
                    ? "animate-spin"
                    : ""
                }
              />

              Refresh
            </button>

            <button
              type="button"
              onClick={exportTransactions}
              disabled={
                loading ||
                filteredTransactions.length === 0
              }
              className="flex items-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.035] px-4 py-3 text-sm font-semibold text-slate-300 transition hover:border-cyan-400/20 hover:bg-cyan-400/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Download size={17} />

              Export
            </button>
          </div>
        </motion.div>

        <div className="mt-9 grid gap-5 lg:grid-cols-3">
          <SummaryCard
            label="Money In"
            value={`+${formatCurrency(
              financialSummary.income
            )}`}
            subtitle="Total incoming funds"
            icon={<ArrowDown size={20} />}
            iconClass="bg-emerald-400/10 text-emerald-400"
            valueClass="text-emerald-400"
            trend="Live"
            trendClass="text-emerald-400"
            delay={0.05}
          />

          <SummaryCard
            label="Money Out"
            value={`-${formatCurrency(
              financialSummary.expense
            )}`}
            subtitle="Total outgoing funds"
            icon={<ArrowUp size={20} />}
            iconClass="bg-red-400/10 text-red-400"
            valueClass="text-white"
            trend="Live"
            trendClass="text-emerald-400"
            delay={0.1}
          />

          <SummaryCard
            label="Net Cash Flow"
            value={formatSignedCurrency(
              financialSummary.netFlow
            )}
            subtitle="Income minus expenses"
            icon={
              <CircleDollarSign size={20} />
            }
            iconClass="bg-cyan-400/10 text-cyan-400"
            valueClass={
              financialSummary.netFlow >= 0
                ? "text-cyan-400"
                : "text-red-400"
            }
            trend="Live"
            trendClass="text-cyan-400"
            delay={0.15}
          />
        </div>

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.2,
          }}
          className="mt-6 grid gap-4 sm:grid-cols-3"
        >
          <HealthCard
            icon={<CheckCircle2 size={17} />}
            label="Completed"
            value={completedCount}
            description="Successfully processed"
            iconClass="bg-emerald-400/10 text-emerald-400"
          />

          <HealthCard
            icon={<Clock3 size={17} />}
            label="Pending"
            value={pendingCount}
            description="Awaiting confirmation"
            iconClass="bg-amber-400/10 text-amber-400"
          />

          <HealthCard
            icon={<AlertCircle size={17} />}
            label="Failed"
            value={failedCount}
            description="Requires attention"
            iconClass="bg-red-400/10 text-red-400"
          />
        </motion.div>

        <motion.div
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
          className="mt-6 grid gap-5 lg:grid-cols-3"
        >
          <InsightCard
            icon={<TrendingUp size={18} />}
            title="Income Performance"
            value={`+${formatCurrency(
              financialSummary.income
            )}`}
            description="Calculated from real transactions."
            type="positive"
          />

          <InsightCard
            icon={<TrendingDown size={18} />}
            title="Spending Pattern"
            value={formatCurrency(
              financialSummary.expense
            )}
            description="Calculated from real transactions."
            type="neutral"
          />

          <InsightCard
            icon={<PiggyBank size={18} />}
            title="Net Cash Flow"
            value={formatSignedCurrency(
              financialSummary.netFlow
            )}
            description="Based on available transaction history."
            type="saving"
          />
        </motion.div>

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
            delay: 0.3,
            duration: 0.5,
          }}
          className="mt-8 overflow-hidden rounded-[30px] border border-white/[0.07] bg-white/[0.025] shadow-2xl shadow-black/20 backdrop-blur-xl"
        >
          <div className="border-b border-white/[0.07] p-5 sm:p-7">
            <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
                  <ReceiptText size={20} />
                </div>

                <div>
                  <h2 className="text-lg font-bold">
                    All Transactions
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Search, filter, and review your
                    banking activity
                  </p>
                </div>
              </div>

              <div className="group flex min-w-0 items-center gap-3 rounded-2xl border border-white/[0.08] bg-slate-950/70 px-4 transition focus-within:border-cyan-400/30 focus-within:ring-4 focus-within:ring-cyan-400/[0.04] xl:w-[360px]">
                <Search
                  size={18}
                  className="shrink-0 text-slate-500 transition group-focus-within:text-cyan-400"
                />

                <input
                  type="text"
                  placeholder="Search by name, account, ID..."
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  className="w-full bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-slate-600"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="flex h-6 w-6 items-center justify-center rounded-lg text-slate-500 hover:bg-white/10 hover:text-white"
                    aria-label="Clear search"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <div className="mr-1 flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <SlidersHorizontal size={14} />
                  Filters
                </div>

                {TRANSACTION_CATEGORIES.map(
                  (item) => (
                    <FilterButton
                      key={item}
                      active={category === item}
                      onClick={() =>
                        setCategory(item)
                      }
                    >
                      {item}
                    </FilterButton>
                  )
                )}

                <div className="mx-1 hidden h-5 w-px bg-white/[0.08] sm:block" />

                {TRANSACTION_STATUSES.slice(
                  1
                ).map((item) => (
                  <FilterButton
                    key={item}
                    active={status === item}
                    onClick={() =>
                      setStatus(
                        status === item
                          ? "All"
                          : item
                      )
                    }
                  >
                    {item}
                  </FilterButton>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] text-slate-600">
                  Sort:
                </span>

                <select
                  value={sortBy}
                  onChange={(event) =>
                    setSortBy(event.target.value)
                  }
                  className="cursor-pointer rounded-xl border border-white/[0.07] bg-slate-950 px-3 py-2 text-xs font-semibold text-slate-300 outline-none"
                >
                  {SORT_OPTIONS.map(
                    (option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        className="bg-slate-950"
                      >
                        {option.label}
                      </option>
                    )
                  )}
                </select>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-xs font-semibold text-slate-400 transition hover:bg-white/[0.06] hover:text-white"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-b border-white/[0.05] px-5 py-4 sm:px-7">
            <p className="text-xs text-slate-500">
              Showing{" "}
              <span className="font-bold text-slate-300">
                {filteredTransactions.length}
              </span>{" "}
              of{" "}
              <span className="font-bold text-slate-300">
                {transactions.length}
              </span>{" "}
              transactions
            </p>

            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50" />

              <span className="hidden text-[10px] font-medium text-slate-600 sm:block">
                Secure activity sync
              </span>
            </div>
          </div>

          {loading && (
            <TransactionLoadingState />
          )}

          {!loading && error && (
            <TransactionErrorState
              message={error}
              onRetry={handleRetry}
            />
          )}

          {!loading && !error && (
            <div className="divide-y divide-white/[0.05]">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map(
                  (item, index) => (
                    <TransactionRow
                      key={`${item.id}-${index}`}
                      item={item}
                      index={index}
                      onOpen={openTransaction}
                    />
                  )
                )
              ) : (
                <EmptyState
                  hasTransactions={
                    transactions.length > 0
                  }
                  onReset={clearFilters}
                />
              )}
            </div>
          )}

          {!loading &&
            !error &&
            filteredTransactions.length > 0 && (
              <div className="flex flex-col justify-between gap-3 border-t border-white/[0.06] px-5 py-5 sm:flex-row sm:items-center sm:px-7">
                <p className="text-[11px] text-slate-600">
                  Showing latest banking activity
                </p>

                <button
                  type="button"
                  onClick={exportTransactions}
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-2.5 text-xs font-semibold text-slate-400 transition hover:bg-white/[0.06] hover:text-white"
                >
                  Export Current Results
                  <Download size={14} />
                </button>
              </div>
            )}
        </motion.div>

        <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <QuickAction
            icon={<Send size={18} />}
            title="Send Money"
            description="Transfer funds securely"
          />

          <QuickAction
            icon={<Plus size={18} />}
            title="Add Money"
            description="Fund your account"
          />

          <QuickAction
            icon={<Eye size={18} />}
            title="View Accounts"
            description="Monitor account balances"
          />

          <QuickAction
            icon={<CreditCard size={18} />}
            title="Manage Cards"
            description="View linked cards"
          />
        </div>
      </div>

      <AnimatePresence>
        {selectedTransaction && (
          <TransactionDetailsModal
            transaction={selectedTransaction}
            copiedId={copiedId}
            onCopy={copyTransactionId}
            onClose={closeTransaction}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const SummaryCard = ({
  label,
  value,
  subtitle,
  icon,
  iconClass,
  valueClass,
  trend,
  trendClass,
  delay,
}) => {
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
        delay,
        duration: 0.45,
      }}
      whileHover={{
        y: -3,
      }}
      className="group rounded-[26px] border border-white/[0.07] bg-white/[0.025] p-6 shadow-xl shadow-black/10 backdrop-blur-xl transition hover:border-white/[0.11] hover:bg-white/[0.04]"
    >
      <div className="flex items-start justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-2xl ${iconClass}`}
        >
          {icon}
        </div>

        <span
          className={`rounded-full bg-white/[0.035] px-2.5 py-1 text-[10px] font-bold ${trendClass}`}
        >
          {trend}
        </span>
      </div>

      <p className="mt-5 text-xs font-medium text-slate-500">
        {label}
      </p>

      <h2
        className={`mt-1 text-2xl font-bold tracking-tight sm:text-3xl ${valueClass}`}
      >
        {value}
      </h2>

      <p className="mt-1.5 text-[11px] text-slate-600">
        {subtitle}
      </p>
    </motion.div>
  );
};

const HealthCard = ({
  icon,
  label,
  value,
  description,
  iconClass,
}) => {
  return (
    <motion.div
      whileHover={{
        y: -2,
      }}
      className="flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition hover:bg-white/[0.035]"
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
          {label}
        </p>

        <div className="mt-0.5 flex items-center justify-between gap-3">
          <span className="text-lg font-bold text-white">
            {value}
          </span>

          <span className="hidden text-[10px] text-slate-600 sm:block">
            {description}
          </span>
        </div>

        <p className="mt-0.5 text-[10px] text-slate-600 sm:hidden">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

const InsightCard = ({
  icon,
  title,
  value,
  description,
  type,
}) => {
  const styles = {
    positive: {
      icon: "bg-emerald-400/10 text-emerald-400",
      value: "text-emerald-400",
    },
    neutral: {
      icon: "bg-blue-400/10 text-blue-400",
      value: "text-white",
    },
    saving: {
      icon: "bg-cyan-400/10 text-cyan-400",
      value: "text-cyan-400",
    },
  };

  const currentStyle =
    styles[type] || styles.neutral;

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${currentStyle.icon}`}
      >
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
          {title}
        </p>

        <div className="mt-0.5 flex items-center gap-2">
          <span
            className={`text-sm font-bold ${currentStyle.value}`}
          >
            {value}
          </span>

          <span className="hidden text-[10px] text-slate-600 sm:block">
            {description}
          </span>
        </div>

        <p className="mt-1 text-[10px] text-slate-600 sm:hidden">
          {description}
        </p>
      </div>
    </div>
  );
};

const FilterButton = ({
  active,
  onClick,
  children,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition-all duration-200 ${
        active
          ? "bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-400/15"
          : "text-slate-500 hover:bg-white/[0.04] hover:text-slate-300"
      }`}
    >
      {children}
    </button>
  );
};

const TransactionRow = ({
  item,
  index,
  onOpen,
}) => {
  const isIncome = item.amount > 0;
  const Icon = item.icon || ReceiptText;

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -12,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        delay: index * 0.04,
        duration: 0.35,
      }}
      className="group px-5 py-5 transition-all duration-200 hover:bg-white/[0.025] sm:px-7"
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <div
            className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${
              isIncome
                ? "border-emerald-400/10 bg-emerald-400/[0.07] text-emerald-400"
                : "border-red-400/10 bg-red-400/[0.06] text-red-400"
            }`}
          >
            <Icon size={20} />

            <span
              className={`absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#07101f] ${
                isIncome
                  ? "bg-emerald-400"
                  : "bg-red-400"
              }`}
            >
              {isIncome ? (
                <ArrowDown
                  size={8}
                  className="text-slate-950"
                />
              ) : (
                <ArrowUp
                  size={8}
                  className="text-slate-950"
                />
              )}
            </span>
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate text-sm font-bold text-slate-100 sm:text-base">
                {item.title}
              </h3>

              <span
                className={`rounded-full px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider ${
                  item.category === "Income"
                    ? "bg-emerald-400/10 text-emerald-400"
                    : item.category === "Transfer"
                    ? "bg-blue-400/10 text-blue-400"
                    : "bg-red-400/10 text-red-400"
                }`}
              >
                {item.category}
              </span>
            </div>

            <p className="mt-1 truncate text-xs text-slate-500">
              {item.description}
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px] text-slate-600">
              <span>{item.date}</span>

              <span className="h-1 w-1 rounded-full bg-slate-700" />

              <span>{item.time}</span>

              <span className="hidden h-1 w-1 rounded-full bg-slate-700 sm:block" />

              <span className="hidden max-w-[240px] truncate sm:block">
                {item.account}
              </span>
            </div>
          </div>
        </div>

        <div className="hidden min-w-[130px] xl:block">
          <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-700">
            Transaction ID
          </p>

          <p className="mt-1 max-w-[180px] truncate font-mono text-[10px] text-slate-500">
            {item.id}
          </p>
        </div>

        <div className="flex items-center justify-between gap-5 lg:justify-end">
          <div className="text-left lg:text-right">
            <p
              className={`text-base font-bold sm:text-lg ${
                isIncome
                  ? "text-emerald-400"
                  : "text-slate-100"
              }`}
            >
              {formatSignedCurrency(
                item.amount
              )}
            </p>

            <div className="mt-1.5 flex items-center gap-1.5 lg:justify-end">
              {item.status === "Completed" ? (
                <>
                  <CheckCircle2
                    size={12}
                    className="text-emerald-400"
                  />

                  <span className="text-[10px] font-semibold text-emerald-400/80">
                    Completed
                  </span>
                </>
              ) : item.status === "Failed" ? (
                <>
                  <AlertCircle
                    size={12}
                    className="text-red-400"
                  />

                  <span className="text-[10px] font-semibold text-red-400/80">
                    Failed
                  </span>
                </>
              ) : (
                <>
                  <Clock3
                    size={12}
                    className="text-amber-400"
                  />

                  <span className="text-[10px] font-semibold text-amber-400/80">
                    Pending
                  </span>
                </>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpen(item)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025] text-slate-600 transition-all duration-200 hover:border-cyan-400/20 hover:bg-cyan-400/[0.06] hover:text-cyan-400 lg:opacity-0 lg:group-hover:opacity-100"
            aria-label={`View ${item.title} details`}
          >
            <MoreHorizontal size={17} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const TransactionLoadingState = () => {
  return (
    <div className="divide-y divide-white/[0.05]">
      {Array.from({
        length: 5,
      }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse px-5 py-5 sm:px-7"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-white/[0.06]" />

              <div className="space-y-2">
                <div className="h-4 w-40 rounded bg-white/[0.06]" />
                <div className="h-3 w-56 rounded bg-white/[0.04]" />
                <div className="h-2.5 w-32 rounded bg-white/[0.035]" />
              </div>
            </div>

            <div className="hidden space-y-2 xl:block">
              <div className="h-2.5 w-24 rounded bg-white/[0.04]" />
              <div className="h-3 w-32 rounded bg-white/[0.05]" />
            </div>

            <div className="flex items-center justify-between lg:justify-end lg:gap-5">
              <div className="space-y-2">
                <div className="h-5 w-24 rounded bg-white/[0.06]" />
                <div className="h-2.5 w-16 rounded bg-white/[0.04]" />
              </div>

              <div className="h-9 w-9 rounded-xl bg-white/[0.04]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const TransactionErrorState = ({
  message,
  onRetry,
}) => {
  return (
    <div className="px-6 py-20 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-red-400/10 bg-red-400/[0.05] text-red-400">
        <AlertCircle size={25} />
      </div>

      <h3 className="mt-5 text-base font-bold text-slate-200">
        Unable to load transactions
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">
        {message}
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-slate-300 transition hover:bg-white/[0.08] hover:text-white"
      >
        <RefreshCw size={14} />
        Retry
      </button>
    </div>
  );
};

const DetailBox = ({
  icon,
  label,
  value,
}) => {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4">
      <div className="flex items-center gap-2 text-slate-600">
        {icon}

        <p className="text-[9px] font-bold uppercase tracking-[0.15em]">
          {label}
        </p>
      </div>

      <p className="mt-2 break-words text-sm font-semibold text-slate-200">
        {value}
      </p>
    </div>
  );
};

const EmptyState = ({
  hasTransactions,
  onReset,
}) => {
  return (
    <div className="px-6 py-24 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.07] bg-white/[0.025] text-slate-500">
        <Search size={24} />
      </div>

      <h3 className="mt-5 text-base font-bold text-slate-200">
        {hasTransactions
          ? "No transactions found"
          : "No transactions yet"}
      </h3>

      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-600">
        {hasTransactions
          ? "No transaction matches your current search and filter settings."
          : "Your real banking transactions will appear here once activity is recorded."}
      </p>

      {hasTransactions && (
        <button
          type="button"
          onClick={onReset}
          className="mt-5 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-slate-300 transition hover:bg-white/[0.08] hover:text-white"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );
};

const QuickAction = ({
  icon,
  title,
  description,
}) => {
  return (
    <button
      type="button"
      className="group flex items-center justify-between rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/15 hover:bg-white/[0.045]"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/[0.07] text-cyan-400 transition-transform duration-300 group-hover:scale-105">
          {icon}
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-200">
            {title}
          </h3>

          <p className="mt-0.5 text-[10px] text-slate-600">
            {description}
          </p>
        </div>
      </div>

      <ChevronRight
        size={17}
        className="text-slate-700 transition-all duration-300 group-hover:translate-x-1 group-hover:text-cyan-400"
      />
    </button>
  );
};

const TransactionDetailsModal = ({
  transaction,
  copiedId,
  onCopy,
  onClose,
}) => {
  const isIncome = transaction.amount > 0;

  return (
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
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 px-4 py-8 backdrop-blur-md"
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
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                isIncome
                  ? "bg-emerald-400/10 text-emerald-400"
                  : "bg-red-400/10 text-red-400"
              }`}
            >
              <ReceiptText size={21} />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-400">
                Transaction Details
              </p>

              <h2 className="mt-1 text-xl font-bold">
                {transaction.title}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04] text-slate-500 transition hover:bg-white/[0.08] hover:text-white"
            aria-label="Close transaction details"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-7 rounded-[24px] border border-white/[0.07] bg-white/[0.025] p-6 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-600">
            Transaction Amount
          </p>

          <h3
            className={`mt-3 text-4xl font-bold tracking-tight ${
              isIncome
                ? "text-emerald-400"
                : "text-white"
            }`}
          >
            {formatSignedCurrency(
              transaction.amount
            )}
          </h3>

          <div className="mt-4 flex justify-center">
            <TransactionStatusBadge
              status={transaction.status}
            />
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <DetailBox
            icon={<Hash size={14} />}
            label="Transaction ID"
            value={transaction.id}
          />

          <DetailBox
            icon={<Landmark size={14} />}
            label="Account"
            value={transaction.account}
          />

          <DetailBox
            icon={<CalendarDays size={14} />}
            label="Date"
            value={transaction.date}
          />

          <DetailBox
            icon={<Clock3 size={14} />}
            label="Time"
            value={transaction.time}
          />

          <DetailBox
            icon={<CircleDollarSign size={14} />}
            label="Category"
            value={transaction.category}
          />

          <DetailBox
            icon={<CreditCard size={14} />}
            label="Type"
            value={
              transaction.rawType ||
              "Transaction"
            }
          />

          {transaction.balanceAfter !==
            null &&
            transaction.balanceAfter !==
              undefined && (
              <DetailBox
                icon={<Wallet size={14} />}
                label="Balance After"
                value={formatCurrency(
                  transaction.balanceAfter
                )}
              />
            )}
        </div>

        <div className="mt-5 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-5">
          <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-600">
            Description
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-300">
            {transaction.description}
          </p>

          <div className="mt-4 border-t border-white/[0.06] pt-4">
            <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-600">
              Reference
            </p>

            <p className="mt-2 break-all font-mono text-xs text-slate-500">
              {transaction.reference}
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-3 rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.035] p-4">
          <ShieldCheck
            size={18}
            className="shrink-0 text-emerald-400"
          />

          <div>
            <p className="text-xs font-semibold text-slate-200">
              Transaction secured
            </p>

            <p className="mt-1 text-[10px] leading-5 text-slate-600">
              SmartBank AI continuously monitors
              financial activity for suspicious
              behavior.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={onCopy}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.035] px-4 py-3 text-xs font-semibold text-slate-300 transition hover:bg-white/[0.07] hover:text-white"
          >
            {copiedId ? (
              <>
                <Check
                  size={15}
                  className="text-emerald-400"
                />
                Copied
              </>
            ) : (
              <>
                <Copy size={15} />
                Copy Transaction ID
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 text-xs font-bold text-slate-950 transition hover:bg-cyan-300"
          >
            Close Details
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const TransactionStatusBadge = ({
  status,
}) => {
  if (status === "Completed") {
    return (
      <span className="flex items-center gap-2 rounded-full border border-emerald-400/10 bg-emerald-400/[0.06] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
        <CheckCircle2 size={12} />
        Completed
      </span>
    );
  }

  if (status === "Failed") {
    return (
      <span className="flex items-center gap-2 rounded-full border border-red-400/10 bg-red-400/[0.06] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-red-400">
        <AlertCircle size={12} />
        Failed
      </span>
    );
  }

  return (
    <span className="flex items-center gap-2 rounded-full border border-amber-400/10 bg-amber-400/[0.06] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-amber-400">
      <Clock3 size={12} />
      Pending
    </span>
  );
};

export default Transactions;