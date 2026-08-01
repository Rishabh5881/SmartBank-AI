import { useMemo, useState } from "react";
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
} from "lucide-react";

const Transactions = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [copiedId, setCopiedId] = useState(false);

  const transactions = [
    {
      id: "TXN-92841",
      title: "Salary Credited",
      category: "Income",
      amount: 5000,
      date: "28 July 2026",
      time: "09:42 AM",
      status: "Completed",
      description: "Monthly salary",
      account: "Salary Account",
      reference: "SAL-JUL-2026-92841",
      merchant: "Employer Payroll",
      icon: Wallet,
    },
    {
      id: "TXN-92840",
      title: "Amazon Purchase",
      category: "Expense",
      amount: -120,
      date: "27 July 2026",
      time: "06:18 PM",
      status: "Completed",
      description: "Online shopping",
      account: "Savings Account",
      reference: "AMZ-92840-2026",
      merchant: "Amazon",
      icon: CreditCard,
    },
    {
      id: "TXN-92839",
      title: "Money Transfer",
      category: "Expense",
      amount: -800,
      date: "25 July 2026",
      time: "02:35 PM",
      status: "Pending",
      description: "Transfer to savings",
      account: "Current Account",
      reference: "TRF-92839-2026",
      merchant: "SmartBank Transfer",
      icon: ArrowUpRight,
    },
    {
      id: "TXN-92838",
      title: "Freelance Payment",
      category: "Income",
      amount: 1500,
      date: "20 July 2026",
      time: "11:15 AM",
      status: "Completed",
      description: "Freelance project payment",
      account: "Savings Account",
      reference: "FRL-92838-2026",
      merchant: "Freelance Client",
      icon: ArrowDownLeft,
    },
    {
      id: "TXN-92837",
      title: "Cashback Received",
      category: "Income",
      amount: 42.5,
      date: "19 July 2026",
      time: "04:28 PM",
      status: "Completed",
      description: "SmartBank Rewards",
      account: "Savings Account",
      reference: "CBK-92837-2026",
      merchant: "SmartBank Rewards",
      icon: PiggyBank,
    },
    {
      id: "TXN-92836",
      title: "Electricity Bill",
      category: "Expense",
      amount: -85,
      date: "18 July 2026",
      time: "08:05 PM",
      status: "Completed",
      description: "Monthly electricity bill",
      account: "Current Account",
      reference: "ELEC-92836-2026",
      merchant: "Electricity Provider",
      icon: ReceiptText,
    },
    {
      id: "TXN-92835",
      title: "Netflix Subscription",
      category: "Expense",
      amount: -19.99,
      date: "16 July 2026",
      time: "10:12 AM",
      status: "Completed",
      description: "Monthly subscription",
      account: "Current Account",
      reference: "NFLX-92835-2026",
      merchant: "Netflix",
      icon: CreditCard,
    },
    {
      id: "TXN-92834",
      title: "UPI Transfer Received",
      category: "Income",
      amount: 650,
      date: "15 July 2026",
      time: "03:42 PM",
      status: "Completed",
      description: "Transfer from Rahul",
      account: "Savings Account",
      reference: "UPI-92834-2026",
      merchant: "Rahul",
      icon: ArrowDownLeft,
    },
  ];

  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    const searchValue = search.trim().toLowerCase();

    if (searchValue) {
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(searchValue) ||
          item.description.toLowerCase().includes(searchValue) ||
          item.account.toLowerCase().includes(searchValue) ||
          item.id.toLowerCase().includes(searchValue) ||
          item.merchant.toLowerCase().includes(searchValue)
      );
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

    if (sortBy === "Highest") {
      result.sort(
        (a, b) => Math.abs(b.amount) - Math.abs(a.amount)
      );
    }

    if (sortBy === "Lowest") {
      result.sort(
        (a, b) => Math.abs(a.amount) - Math.abs(b.amount)
      );
    }

    return result;
  }, [search, category, status, sortBy]);

  const totalIncome = transactions
    .filter((item) => item.amount > 0)
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpense = Math.abs(
    transactions
      .filter((item) => item.amount < 0)
      .reduce((sum, item) => sum + item.amount, 0)
  );

  const netFlow = totalIncome - totalExpense;

  const completedCount = transactions.filter(
    (item) => item.status === "Completed"
  ).length;

  const pendingCount = transactions.filter(
    (item) => item.status === "Pending"
  ).length;

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setStatus("All");
    setSortBy("Newest");
  };

  const formatAmount = (amount) => {
    return `${amount >= 0 ? "+" : "-"}$${Math.abs(
      amount
    ).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
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
    if (!selectedTransaction) return;

    try {
      await navigator.clipboard.writeText(
        selectedTransaction.id
      );

      setCopiedId(true);

      setTimeout(() => {
        setCopiedId(false);
      }, 1800);
    } catch (error) {
      console.error(
        "COPY TRANSACTION ID ERROR:",
        error
      );
    }
  };

  const exportTransactions = () => {
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

    const rows = filteredTransactions.map((item) => [
      item.id,
      item.title,
      item.category,
      item.amount.toFixed(2),
      item.date,
      item.time,
      item.status,
      item.description,
      item.account,
    ]);

    const csvContent = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "smartbank-transactions.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#020617] px-5 pb-14 pt-28 text-white sm:px-7 lg:px-10">
      {/* =====================================================
          AMBIENT BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none fixed left-0 top-20 -z-0 h-[350px] w-[350px] rounded-full bg-blue-600/[0.06] blur-[130px]" />

      <div className="pointer-events-none fixed bottom-0 right-0 -z-0 h-[400px] w-[400px] rounded-full bg-cyan-500/[0.05] blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-[1650px]">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
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
              Monitor every transaction, understand your cash
              flow, and stay in control of your financial activity.
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
                  July 2026
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={exportTransactions}
              className="flex items-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.035] px-4 py-3 text-sm font-semibold text-slate-300 transition hover:border-cyan-400/20 hover:bg-cyan-400/[0.06] hover:text-white"
            >
              <Download size={17} />

              Export
            </button>
          </div>
        </motion.div>

        {/* =====================================================
            FINANCIAL SUMMARY
        ===================================================== */}

        <div className="mt-9 grid gap-5 lg:grid-cols-3">
          <SummaryCard
            label="Money In"
            value={`+$${totalIncome.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`}
            subtitle="Total incoming funds"
            icon={<ArrowDown size={20} />}
            iconClass="bg-emerald-400/10 text-emerald-400"
            valueClass="text-emerald-400"
            trend="+12.5%"
            trendClass="text-emerald-400"
            delay={0.05}
          />

          <SummaryCard
            label="Money Out"
            value={`-$${totalExpense.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`}
            subtitle="Total outgoing funds"
            icon={<ArrowUp size={20} />}
            iconClass="bg-red-400/10 text-red-400"
            valueClass="text-white"
            trend="-4.6%"
            trendClass="text-emerald-400"
            delay={0.1}
          />

          <SummaryCard
            label="Net Cash Flow"
            value={`+$${netFlow.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`}
            subtitle="Income minus expenses"
            icon={<CircleDollarSign size={20} />}
            iconClass="bg-cyan-400/10 text-cyan-400"
            valueClass="text-cyan-400"
            trend="+8.2%"
            trendClass="text-cyan-400"
            delay={0.15}
          />
        </div>

        {/* =====================================================
            TRANSACTION HEALTH
        ===================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
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
            icon={<ShieldCheck size={17} />}
            label="Secure Activity"
            value="100%"
            description="Protected by SmartBank AI"
            iconClass="bg-cyan-400/10 text-cyan-400"
          />
        </motion.div>

        {/* =====================================================
            INSIGHTS
        ===================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mt-6 grid gap-5 lg:grid-cols-3"
        >
          <InsightCard
            icon={<TrendingUp size={18} />}
            title="Income Performance"
            value="+$6,542.50"
            description="Your income is higher than last month."
            type="positive"
          />

          <InsightCard
            icon={<TrendingDown size={18} />}
            title="Spending Pattern"
            value="$1,005.00"
            description="Your spending is currently under control."
            type="neutral"
          />

          <InsightCard
            icon={<PiggyBank size={18} />}
            title="Savings Potential"
            value="84.6%"
            description="Strong monthly cash-flow efficiency."
            type="saving"
          />
        </motion.div>

        {/* =====================================================
            TRANSACTION CONTAINER
        ===================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.5,
          }}
          className="mt-8 overflow-hidden rounded-[30px] border border-white/[0.07] bg-white/[0.025] shadow-2xl shadow-black/20 backdrop-blur-xl"
        >
          {/* PANEL HEADER */}

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
                    Search, filter, and review your banking activity
                  </p>
                </div>
              </div>

              {/* SEARCH */}

              <div className="group flex min-w-0 items-center gap-3 rounded-2xl border border-white/[0.08] bg-slate-950/70 px-4 transition focus-within:border-cyan-400/30 focus-within:ring-4 focus-within:ring-cyan-400/[0.04] xl:w-[360px]">
                <Search
                  size={18}
                  className="shrink-0 text-slate-500 transition group-focus-within:text-cyan-400"
                />

                <input
                  type="text"
                  placeholder="Search by name, account, ID..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  className="w-full bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-slate-600"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="flex h-6 w-6 items-center justify-center rounded-lg text-slate-500 hover:bg-white/10 hover:text-white"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* FILTERS */}

            <div className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <div className="mr-1 flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <SlidersHorizontal size={14} />

                  Filters
                </div>

                <FilterButton
                  active={category === "All"}
                  onClick={() => setCategory("All")}
                >
                  All
                </FilterButton>

                <FilterButton
                  active={category === "Income"}
                  onClick={() => setCategory("Income")}
                >
                  Income
                </FilterButton>

                <FilterButton
                  active={category === "Expense"}
                  onClick={() => setCategory("Expense")}
                >
                  Expense
                </FilterButton>

                <div className="mx-1 hidden h-5 w-px bg-white/[0.08] sm:block" />

                <FilterButton
                  active={status === "Completed"}
                  onClick={() =>
                    setStatus(
                      status === "Completed"
                        ? "All"
                        : "Completed"
                    )
                  }
                >
                  Completed
                </FilterButton>

                <FilterButton
                  active={status === "Pending"}
                  onClick={() =>
                    setStatus(
                      status === "Pending"
                        ? "All"
                        : "Pending"
                    )
                  }
                >
                  Pending
                </FilterButton>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-600">
                  Sort:
                </span>

                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value)
                  }
                  className="cursor-pointer rounded-xl border border-white/[0.07] bg-slate-950 px-3 py-2 text-xs font-semibold text-slate-300 outline-none"
                >
                  <option
                    value="Newest"
                    className="bg-slate-950"
                  >
                    Newest
                  </option>

                  <option
                    value="Highest"
                    className="bg-slate-950"
                  >
                    Highest Amount
                  </option>

                  <option
                    value="Lowest"
                    className="bg-slate-950"
                  >
                    Lowest Amount
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* RESULTS */}

          <div className="flex items-center justify-between border-b border-white/[0.05] px-5 py-4 sm:px-7">
            <p className="text-xs text-slate-500">
              Showing{" "}
              <span className="font-bold text-slate-300">
                {filteredTransactions.length}
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

          {/* TRANSACTION LIST */}

          <div className="divide-y divide-white/[0.05]">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((item, index) => (
                <TransactionRow
                  key={item.id}
                  item={item}
                  index={index}
                  onOpen={openTransaction}
                />
              ))
            ) : (
              <EmptyState onReset={clearFilters} />
            )}
          </div>

          {/* FOOTER */}

          {filteredTransactions.length > 0 && (
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

        {/* =====================================================
            QUICK ACTIONS
        ===================================================== */}

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

      {/* =====================================================
          TRANSACTION DETAILS MODAL
      ===================================================== */}

      <AnimatePresence>
        {selectedTransaction && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeTransaction}
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
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-[30px] border border-white/[0.08] bg-[#07101f] p-6 shadow-2xl sm:p-8"
            >
              {/* MODAL HEADER */}

              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                      selectedTransaction.amount > 0
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
                      {selectedTransaction.title}
                    </h2>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={closeTransaction}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04] text-slate-500 transition hover:bg-white/[0.08] hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              {/* AMOUNT */}

              <div className="mt-7 rounded-[24px] border border-white/[0.07] bg-white/[0.025] p-6 text-center">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-600">
                  Transaction Amount
                </p>

                <h3
                  className={`mt-3 text-4xl font-bold tracking-tight ${
                    selectedTransaction.amount > 0
                      ? "text-emerald-400"
                      : "text-white"
                  }`}
                >
                  {formatAmount(
                    selectedTransaction.amount
                  )}
                </h3>

                <div className="mt-4 flex justify-center">
                  {selectedTransaction.status ===
                  "Completed" ? (
                    <span className="flex items-center gap-2 rounded-full border border-emerald-400/10 bg-emerald-400/[0.06] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
                      <CheckCircle2 size={12} />
                      Completed
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 rounded-full border border-amber-400/10 bg-amber-400/[0.06] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-amber-400">
                      <Clock3 size={12} />
                      Pending
                    </span>
                  )}
                </div>
              </div>

              {/* DETAILS */}

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <DetailBox
                  icon={<Hash size={14} />}
                  label="Transaction ID"
                  value={selectedTransaction.id}
                />

                <DetailBox
                  icon={<Landmark size={14} />}
                  label="Account"
                  value={selectedTransaction.account}
                />

                <DetailBox
                  icon={<CalendarDays size={14} />}
                  label="Date"
                  value={selectedTransaction.date}
                />

                <DetailBox
                  icon={<Clock3 size={14} />}
                  label="Time"
                  value={selectedTransaction.time}
                />

                <DetailBox
                  icon={<CircleDollarSign size={14} />}
                  label="Category"
                  value={selectedTransaction.category}
                />

                <DetailBox
                  icon={<CreditCard size={14} />}
                  label="Merchant"
                  value={selectedTransaction.merchant}
                />
              </div>

              {/* DESCRIPTION */}

              <div className="mt-5 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-5">
                <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-600">
                  Description
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {selectedTransaction.description}
                </p>

                <div className="mt-4 border-t border-white/[0.06] pt-4">
                  <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-600">
                    Reference
                  </p>

                  <p className="mt-2 font-mono text-xs text-slate-500">
                    {selectedTransaction.reference}
                  </p>
                </div>
              </div>

              {/* SECURITY */}

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
                    SmartBank AI continuously monitors financial
                    activity for suspicious behavior.
                  </p>
                </div>
              </div>

              {/* ACTIONS */}

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={copyTransactionId}
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
                  onClick={closeTransaction}
                  className="flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 text-xs font-bold text-slate-950 transition hover:bg-cyan-300"
                >
                  Close Details
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
   SUMMARY CARD
========================================================= */

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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay,
        duration: 0.45,
      }}
      whileHover={{ y: -3 }}
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

/* =========================================================
   HEALTH CARD
========================================================= */

const HealthCard = ({
  icon,
  label,
  value,
  description,
  iconClass,
}) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
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

/* =========================================================
   INSIGHT CARD
========================================================= */

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

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${styles[type].icon}`}
      >
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
          {title}
        </p>

        <div className="mt-0.5 flex items-center gap-2">
          <span
            className={`text-sm font-bold ${styles[type].value}`}
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

/* =========================================================
   FILTER BUTTON
========================================================= */

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

/* =========================================================
   TRANSACTION ROW
========================================================= */

const TransactionRow = ({
  item,
  index,
  onOpen,
}) => {
  const isIncome = item.amount > 0;
  const Icon = item.icon;

  const formattedAmount = `${
    isIncome ? "+" : "-"
  }$${Math.abs(item.amount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

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
        {/* LEFT */}

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
                  isIncome
                    ? "bg-emerald-400/10 text-emerald-400"
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

              <span className="hidden sm:block">
                {item.account}
              </span>
            </div>
          </div>
        </div>

        {/* CENTER */}

        <div className="hidden min-w-[130px] xl:block">
          <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-700">
            Transaction ID
          </p>

          <p className="mt-1 font-mono text-[10px] text-slate-500">
            {item.id}
          </p>
        </div>

        {/* RIGHT */}

        <div className="flex items-center justify-between gap-5 lg:justify-end">
          <div className="text-left lg:text-right">
            <p
              className={`text-base font-bold sm:text-lg ${
                isIncome
                  ? "text-emerald-400"
                  : "text-slate-100"
              }`}
            >
              {formattedAmount}
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

/* =========================================================
   DETAIL BOX
========================================================= */

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

/* =========================================================
   EMPTY STATE
========================================================= */

const EmptyState = ({
  onReset,
}) => {
  return (
    <div className="px-6 py-24 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.07] bg-white/[0.025] text-slate-500">
        <Search size={24} />
      </div>

      <h3 className="mt-5 text-base font-bold text-slate-200">
        No transactions found
      </h3>

      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-600">
        No transaction matches your current search and filter
        settings.
      </p>

      <button
        type="button"
        onClick={onReset}
        className="mt-5 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-slate-300 transition hover:bg-white/[0.08] hover:text-white"
      >
        Clear All Filters
      </button>
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

export default Transactions;