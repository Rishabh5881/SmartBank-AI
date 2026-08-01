import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  UserCheck,
  ShieldCheck,
  WalletCards,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Search,
  Filter,
  MoreHorizontal,
  CheckCircle2,
  Clock3,
  AlertTriangle,
  TrendingUp,
  CreditCard,
  Landmark,
  Eye,
  RefreshCw,
  ChevronRight,
  Sparkles,
  ShieldAlert,
  CircleDollarSign,
  FileCheck2,
  UserPlus,
  Banknote,
  ClipboardCheck,
  XCircle,
} from "lucide-react";

const Employee = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [search, setSearch] = useState("");

  // ==========================================
  // EMPLOYEE STATS
  // ==========================================

  const stats = [
    {
      title: "Customers Assisted",
      value: "1,284",
      change: "+8.6%",
      label: "this month",
      icon: Users,
      iconClass: "text-cyan-400",
      bgClass: "bg-cyan-400/[0.08]",
      borderClass: "border-cyan-400/10",
      positive: true,
    },
    {
      title: "Pending Requests",
      value: "42",
      change: "-14.2%",
      label: "vs last week",
      icon: ClipboardCheck,
      iconClass: "text-amber-400",
      bgClass: "bg-amber-400/[0.08]",
      borderClass: "border-amber-400/10",
      positive: false,
    },
    {
      title: "Transactions Reviewed",
      value: "8,426",
      change: "+12.4%",
      label: "this month",
      icon: CircleDollarSign,
      iconClass: "text-emerald-400",
      bgClass: "bg-emerald-400/[0.08]",
      borderClass: "border-emerald-400/10",
      positive: true,
    },
    {
      title: "KYC Verified",
      value: "97.8%",
      change: "+2.8%",
      label: "verification rate",
      icon: ShieldCheck,
      iconClass: "text-purple-400",
      bgClass: "bg-purple-400/[0.08]",
      borderClass: "border-purple-400/10",
      positive: true,
    },
  ];

  // ==========================================
  // CUSTOMER REQUESTS
  // ==========================================

  const requests = [
    {
      id: "REQ-48291",
      name: "Golu Sharma",
      email: "golu@example.com",
      type: "KYC Verification",
      status: "Pending",
      priority: "High",
      time: "8 min ago",
      avatar: "GS",
    },
    {
      id: "REQ-48287",
      name: "Rahul Verma",
      email: "rahul@example.com",
      type: "Account Upgrade",
      status: "Review",
      priority: "Medium",
      time: "21 min ago",
      avatar: "RV",
    },
    {
      id: "REQ-48282",
      name: "Ananya Singh",
      email: "ananya@example.com",
      type: "Loan Document",
      status: "Pending",
      priority: "High",
      time: "35 min ago",
      avatar: "AS",
    },
    {
      id: "REQ-48276",
      name: "Aman Gupta",
      email: "aman@example.com",
      type: "Card Request",
      status: "Approved",
      priority: "Low",
      time: "1 hr ago",
      avatar: "AG",
    },
    {
      id: "REQ-48269",
      name: "Priya Mehta",
      email: "priya@example.com",
      type: "Profile Update",
      status: "Review",
      priority: "Medium",
      time: "2 hrs ago",
      avatar: "PM",
    },
  ];

  // ==========================================
  // RECENT TRANSACTIONS
  // ==========================================

  const transactions = [
    {
      id: "TXN-82941",
      customer: "Golu Sharma",
      type: "Transfer",
      amount: "₹84,500",
      status: "Completed",
      time: "4 min ago",
      icon: ArrowUpRight,
      iconClass: "text-blue-400 bg-blue-400/10",
    },
    {
      id: "TXN-82938",
      customer: "Rahul Verma",
      type: "Deposit",
      amount: "₹1,20,000",
      status: "Completed",
      time: "12 min ago",
      icon: ArrowDownRight,
      iconClass: "text-emerald-400 bg-emerald-400/10",
    },
    {
      id: "TXN-82931",
      customer: "Ananya Singh",
      type: "Withdrawal",
      amount: "₹18,500",
      status: "Review",
      time: "26 min ago",
      icon: Banknote,
      iconClass: "text-amber-400 bg-amber-400/10",
    },
    {
      id: "TXN-82924",
      customer: "Aman Gupta",
      type: "Card Payment",
      amount: "₹7,850",
      status: "Completed",
      time: "42 min ago",
      icon: CreditCard,
      iconClass: "text-purple-400 bg-purple-400/10",
    },
  ];

  // ==========================================
  // ACTIVITY
  // ==========================================

  const activities = [
    {
      title: "KYC document approved",
      description: "Rahul Verma's identity verification was approved",
      time: "5 min ago",
      icon: FileCheck2,
      className: "text-emerald-400 bg-emerald-400/10",
    },
    {
      title: "Transaction requires review",
      description: "₹2,40,000 transfer has been flagged for monitoring",
      time: "18 min ago",
      icon: ShieldAlert,
      className: "text-amber-400 bg-amber-400/10",
    },
    {
      title: "New customer assigned",
      description: "Ananya Singh has been assigned to your queue",
      time: "31 min ago",
      icon: UserPlus,
      className: "text-blue-400 bg-blue-400/10",
    },
    {
      title: "Loan documents received",
      description: "A new personal loan document package was submitted",
      time: "1 hr ago",
      icon: Landmark,
      className: "text-purple-400 bg-purple-400/10",
    },
  ];

  // ==========================================
  // TABS
  // ==========================================

  const tabs = [
    "Overview",
    "Customers",
    "Requests",
    "Transactions",
  ];

  // ==========================================
  // FILTER
  // ==========================================

  const filteredRequests = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return requests;
    }

    return requests.filter(
      (request) =>
        request.name.toLowerCase().includes(query) ||
        request.email.toLowerCase().includes(query) ||
        request.id.toLowerCase().includes(query) ||
        request.type.toLowerCase().includes(query)
    );
  }, [search]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
      {/* ==========================================
          PREMIUM BACKGROUND
      ========================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-[520px] w-[520px] rounded-full bg-blue-600/[0.07] blur-[150px]" />

        <div className="absolute right-[-180px] top-[320px] h-[520px] w-[520px] rounded-full bg-cyan-500/[0.055] blur-[160px]" />

        <div className="absolute left-[40%] top-[1100px] h-[400px] w-[400px] rounded-full bg-purple-600/[0.04] blur-[150px]" />

        <div className="absolute bottom-[-180px] left-[10%] h-[400px] w-[400px] rounded-full bg-emerald-500/[0.035] blur-[150px]" />
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
            y: 20,
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
          <div className="pointer-events-none absolute right-[-80px] top-[-100px] h-72 w-72 rounded-full bg-cyan-400/[0.07] blur-[110px]" />

          <div className="pointer-events-none absolute bottom-[-100px] left-[30%] h-64 w-64 rounded-full bg-blue-500/[0.05] blur-[100px]" />

          <div className="relative flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/10 bg-cyan-400/[0.06] px-3 py-1.5">
                <UserCheck
                  size={12}
                  className="text-cyan-400"
                />

                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-400">
                  Employee Operations Center
                </span>
              </div>

              <h1 className="max-w-4xl text-3xl font-bold tracking-[-0.035em] text-white sm:text-4xl lg:text-5xl">
                SmartBank{" "}
                <span className="bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
                  Employee Console
                </span>
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                Manage customer requests, verify documents, review
                transactions and support daily banking operations from one
                centralized workspace.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/10 bg-emerald-400/[0.05] px-3.5 py-2.5 text-xs text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/60" />
                  Employee Active
                </div>

                <div className="inline-flex items-center gap-2 rounded-xl border border-white/[0.07] bg-black/20 px-3.5 py-2.5 text-xs text-slate-400">
                  <Activity
                    size={14}
                    className="text-cyan-400"
                  />
                  Live Operations
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.035] px-4 py-3 text-xs font-semibold text-slate-300 transition hover:border-cyan-400/20 hover:bg-cyan-400/[0.05] hover:text-cyan-400"
              >
                <RefreshCw size={15} />
                Refresh
              </button>

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3 text-xs font-bold text-white shadow-lg shadow-cyan-500/10 transition hover:-translate-y-0.5"
              >
                <UserPlus size={15} />
                Assist Customer
              </button>
            </div>
          </div>
        </motion.section>

        {/* ==========================================
            STATS
        ========================================== */}

        <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.title}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.06,
                }}
                whileHover={{
                  y: -4,
                }}
                className={`group relative overflow-hidden rounded-[1.5rem] border ${stat.borderClass} bg-white/[0.025] p-5 shadow-xl shadow-black/10 backdrop-blur-xl`}
              >
                <div
                  className={`absolute -right-10 -top-10 h-28 w-28 rounded-full ${stat.bgClass} blur-3xl transition-transform duration-500 group-hover:scale-125`}
                />

                <div className="relative flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      {stat.title}
                    </p>

                    <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                      {stat.value}
                    </h2>

                    <div className="mt-3 flex items-center gap-2">
                      {stat.positive ? (
                        <ArrowUpRight
                          size={13}
                          className="text-emerald-400"
                        />
                      ) : (
                        <ArrowDownRight
                          size={13}
                          className="text-emerald-400"
                        />
                      )}

                      <span className="text-xs font-semibold text-emerald-400">
                        {stat.change}
                      </span>

                      <span className="text-[10px] text-slate-600">
                        {stat.label}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.05] ${stat.bgClass}`}
                  >
                    <Icon
                      size={20}
                      className={stat.iconClass}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </section>

        {/* ==========================================
            TABS
        ========================================== */}

        <section className="mt-10">
          <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-xl px-4 py-2.5 text-xs font-semibold transition ${
                  activeTab === tab
                    ? "bg-cyan-400/10 text-cyan-400 shadow-lg shadow-cyan-500/[0.03]"
                    : "text-slate-500 hover:bg-white/[0.04] hover:text-slate-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </section>

        {/* ==========================================
            OPERATIONS OVERVIEW
        ========================================== */}

        <section className="mt-8 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          {/* OPERATIONS CHART */}

          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="rounded-[1.75rem] border border-white/[0.08] bg-white/[0.025] p-6 shadow-2xl shadow-black/10 backdrop-blur-xl"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />

                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-400">
                    Employee Analytics
                  </p>
                </div>

                <h2 className="mt-2 text-xl font-bold text-white">
                  Operations Performance
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Customer requests and transactions handled over the last
                  six months.
                </p>
              </div>

              <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] px-3 py-2 text-[10px] font-semibold text-slate-400">
                Last 6 Months
              </div>
            </div>

            <div className="mt-8 flex h-64 items-end gap-3 sm:gap-5">
              {[
                {
                  month: "Feb",
                  value: 48,
                  amount: "482 tasks",
                },
                {
                  month: "Mar",
                  value: 57,
                  amount: "574 tasks",
                },
                {
                  month: "Apr",
                  value: 64,
                  amount: "642 tasks",
                },
                {
                  month: "May",
                  value: 72,
                  amount: "728 tasks",
                },
                {
                  month: "Jun",
                  value: 83,
                  amount: "836 tasks",
                },
                {
                  month: "Jul",
                  value: 94,
                  amount: "942 tasks",
                },
              ].map((item, index) => (
                <div
                  key={item.month}
                  className="group flex h-full flex-1 flex-col justify-end"
                >
                  <div className="mb-2 text-center text-[9px] font-semibold text-slate-600 opacity-0 transition group-hover:opacity-100">
                    {item.amount}
                  </div>

                  <motion.div
                    initial={{
                      height: 0,
                    }}
                    animate={{
                      height: `${item.value}%`,
                    }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.08,
                    }}
                    className="relative min-h-[20px] rounded-t-xl bg-gradient-to-t from-blue-600/60 via-cyan-500/70 to-cyan-300/90"
                  >
                    <div className="absolute inset-x-0 top-0 h-px bg-cyan-200/70" />
                  </motion.div>

                  <p className="mt-3 text-center text-[10px] font-medium text-slate-600">
                    {item.month}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-5 border-t border-white/[0.05] pt-5">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-cyan-400" />

                <span className="text-[11px] text-slate-500">
                  Completed Operations
                </span>
              </div>

              <div className="flex items-center gap-2">
                <TrendingUp
                  size={13}
                  className="text-emerald-400"
                />

                <span className="text-[11px] font-semibold text-emerald-400">
                  18.7% productivity growth
                </span>
              </div>
            </div>
          </motion.div>

          {/* EMPLOYEE HEALTH */}

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
              delay: 0.1,
            }}
            className="rounded-[1.75rem] border border-white/[0.08] bg-white/[0.025] p-6 shadow-2xl shadow-black/10 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-400">
                    Operations Health
                  </p>
                </div>

                <h2 className="mt-2 text-xl font-bold text-white">
                  Work Queue
                </h2>
              </div>

              <Activity
                size={21}
                className="text-emerald-400"
              />
            </div>

            <div className="mt-7 flex items-center gap-6">
              <div className="relative flex h-32 w-32 shrink-0 items-center justify-center rounded-full border-[10px] border-cyan-400/10">
                <div className="absolute inset-[-10px] rounded-full border-[10px] border-transparent border-t-cyan-400 border-r-cyan-400" />

                <div className="text-center">
                  <p className="text-2xl font-extrabold text-white">
                    94.6
                  </p>

                  <p className="text-[9px] uppercase tracking-wider text-slate-600">
                    Score
                  </p>
                </div>
              </div>

              <div className="min-w-0 space-y-4">
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs text-slate-500">
                      Customer Support
                    </span>

                    <span className="text-xs font-semibold text-emerald-400">
                      96%
                    </span>
                  </div>

                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                    <div className="h-full w-[96%] rounded-full bg-emerald-400" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs text-slate-500">
                      Request Processing
                    </span>

                    <span className="text-xs font-semibold text-cyan-400">
                      94%
                    </span>
                  </div>

                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                    <div className="h-full w-[94%] rounded-full bg-cyan-400" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs text-slate-500">
                      Review Accuracy
                    </span>

                    <span className="text-xs font-semibold text-blue-400">
                      98%
                    </span>
                  </div>

                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                    <div className="h-full w-[98%] rounded-full bg-blue-400" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-7 rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.045] p-4">
              <div className="flex items-center gap-3">
                <CheckCircle2
                  size={18}
                  className="shrink-0 text-emerald-400"
                />

                <div>
                  <p className="text-xs font-semibold text-emerald-400">
                    Operations running smoothly
                  </p>

                  <p className="mt-1 text-[10px] text-slate-600">
                    No critical workflow blockers detected.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ==========================================
            CUSTOMER REQUESTS
        ========================================== */}

        <section className="mt-8 rounded-[1.75rem] border border-white/[0.08] bg-white/[0.025] shadow-2xl shadow-black/10 backdrop-blur-xl">
          <div className="border-b border-white/[0.06] p-6">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />

                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-blue-400">
                    Customer Operations
                  </p>
                </div>

                <h2 className="mt-2 text-xl font-bold text-white">
                  Customer Requests
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Review and process customer service and banking requests.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative">
                  <Search
                    size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search requests..."
                    className="w-full rounded-xl border border-white/[0.07] bg-black/20 py-2.5 pl-10 pr-4 text-xs text-white outline-none placeholder:text-slate-700 transition focus:border-cyan-400/30 sm:w-64"
                  />
                </div>

                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-2.5 text-xs font-semibold text-slate-400 transition hover:border-cyan-400/20 hover:text-cyan-400"
                >
                  <Filter size={14} />
                  Filter
                </button>
              </div>
            </div>
          </div>

          {/* DESKTOP TABLE */}

          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-[1000px]">
              <thead>
                <tr className="border-b border-white/[0.05] text-left">
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-600">
                    Customer
                  </th>

                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-600">
                    Request
                  </th>

                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-600">
                    Priority
                  </th>

                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-600">
                    Status
                  </th>

                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-600">
                    Received
                  </th>

                  <th className="px-6 py-4 text-right text-[10px] font-bold uppercase tracking-[0.16em] text-slate-600">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredRequests.map((request, index) => (
                  <motion.tr
                    key={request.id}
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    transition={{
                      delay: index * 0.04,
                    }}
                    className="border-b border-white/[0.04] transition hover:bg-white/[0.025]"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.07] text-xs font-bold text-cyan-400">
                          {request.avatar}
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-white">
                            {request.name}
                          </p>

                          <p className="mt-0.5 text-[10px] text-slate-600">
                            {request.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-xs font-semibold text-slate-300">
                        {request.type}
                      </p>

                      <p className="mt-1 text-[10px] text-slate-600">
                        {request.id}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                          request.priority === "High"
                            ? "bg-red-400/10 text-red-400"
                            : request.priority === "Medium"
                            ? "bg-amber-400/10 text-amber-400"
                            : "bg-slate-400/10 text-slate-400"
                        }`}
                      >
                        {request.priority}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                          request.status === "Approved"
                            ? "bg-emerald-400/10 text-emerald-400"
                            : request.status === "Review"
                            ? "bg-cyan-400/10 text-cyan-400"
                            : "bg-amber-400/10 text-amber-400"
                        }`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {request.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-xs text-slate-600">
                      {request.time}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.025] text-slate-500 transition hover:border-cyan-400/20 hover:text-cyan-400"
                        >
                          <Eye size={15} />
                        </button>

                        <button
                          type="button"
                          className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.025] text-slate-500 transition hover:border-white/[0.12] hover:text-white"
                        >
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE */}

          <div className="grid gap-3 p-4 lg:hidden">
            {filteredRequests.map((request) => (
              <div
                key={request.id}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/[0.07] text-xs font-bold text-cyan-400">
                      {request.avatar}
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-white">
                        {request.name}
                      </p>

                      <p className="mt-0.5 text-[10px] text-slate-600">
                        {request.type}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                      request.status === "Approved"
                        ? "bg-emerald-400/10 text-emerald-400"
                        : request.status === "Review"
                        ? "bg-cyan-400/10 text-cyan-400"
                        : "bg-amber-400/10 text-amber-400"
                    }`}
                  >
                    {request.status}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-white/[0.025] p-3">
                    <p className="text-[9px] uppercase tracking-wider text-slate-600">
                      Priority
                    </p>

                    <p className="mt-1 text-xs font-semibold text-slate-300">
                      {request.priority}
                    </p>
                  </div>

                  <div className="rounded-xl bg-white/[0.025] p-3">
                    <p className="text-[9px] uppercase tracking-wider text-slate-600">
                      Received
                    </p>

                    <p className="mt-1 text-xs font-semibold text-slate-300">
                      {request.time}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-400/10 bg-cyan-400/[0.05] py-2.5 text-xs font-semibold text-cyan-400"
                >
                  <Eye size={14} />
                  Review Request
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-white/[0.05] px-6 py-4">
            <p className="text-[10px] text-slate-600">
              Showing {filteredRequests.length} of 42 pending requests
            </p>

            <button
              type="button"
              className="group inline-flex items-center gap-1 text-xs font-semibold text-cyan-400"
            >
              View all
              <ChevronRight
                size={13}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </button>
          </div>
        </section>

        {/* ==========================================
            TRANSACTIONS + ACTIVITY
        ========================================== */}

        <section className="mt-8 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          {/* TRANSACTIONS */}

          <div className="rounded-[1.75rem] border border-white/[0.08] bg-white/[0.025] p-6 shadow-2xl shadow-black/10 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-400">
                    Financial Operations
                  </p>
                </div>

                <h2 className="mt-2 text-xl font-bold text-white">
                  Recent Transactions
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Latest customer transactions assigned for review.
                </p>
              </div>

              <CircleDollarSign
                size={20}
                className="text-emerald-400"
              />
            </div>

            <div className="mt-6 space-y-3">
              {transactions.map((transaction, index) => {
                const Icon = transaction.icon;

                return (
                  <motion.div
                    key={transaction.id}
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
                    }}
                    className="group flex items-center gap-4 rounded-2xl border border-white/[0.05] bg-white/[0.02] p-4 transition hover:border-white/[0.09] hover:bg-white/[0.035]"
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${transaction.iconClass}`}
                    >
                      <Icon size={17} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-semibold text-white">
                        {transaction.customer}
                      </p>

                      <p className="mt-1 text-[10px] text-slate-600">
                        {transaction.type} • {transaction.id}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs font-bold text-white">
                        {transaction.amount}
                      </p>

                      <p
                        className={`mt-1 text-[9px] font-semibold ${
                          transaction.status === "Completed"
                            ? "text-emerald-400"
                            : "text-amber-400"
                        }`}
                      >
                        {transaction.status}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <button
              type="button"
              className="group mt-5 inline-flex items-center gap-1 text-xs font-semibold text-cyan-400"
            >
              View transaction history
              <ChevronRight
                size={13}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </button>
          </div>

          {/* ACTIVITY */}

          <div className="rounded-[1.75rem] border border-white/[0.08] bg-white/[0.025] p-6 shadow-2xl shadow-black/10 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />

                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-400">
                    Live Feed
                  </p>
                </div>

                <h2 className="mt-2 text-xl font-bold text-white">
                  Recent Activity
                </h2>
              </div>

              <Activity
                size={19}
                className="text-cyan-400"
              />
            </div>

            <div className="mt-6 space-y-3">
              {activities.map((activity, index) => {
                const Icon = activity.icon;

                return (
                  <motion.div
                    key={activity.title}
                    initial={{
                      opacity: 0,
                      x: -10,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: index * 0.06,
                    }}
                    className="group flex items-center gap-4 rounded-2xl border border-white/[0.05] bg-white/[0.02] p-4 transition hover:border-white/[0.09] hover:bg-white/[0.035]"
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${activity.className}`}
                    >
                      <Icon size={17} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-semibold text-white">
                        {activity.title}
                      </p>

                      <p className="mt-1 truncate text-[10px] text-slate-600">
                        {activity.description}
                      </p>
                    </div>

                    <span className="shrink-0 text-[9px] text-slate-700">
                      {activity.time}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ==========================================
            QUICK ACTIONS
        ========================================== */}

        <section className="mt-8 rounded-[1.75rem] border border-white/[0.08] bg-white/[0.025] p-6 shadow-2xl shadow-black/10 backdrop-blur-xl">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />

              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-purple-400">
                Employee Workspace
              </p>
            </div>

            <h2 className="mt-2 text-xl font-bold text-white">
              Quick Actions
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Frequently used customer and banking operations.
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <button
              type="button"
              className="group flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 text-left transition hover:-translate-y-0.5 hover:border-cyan-400/20 hover:bg-cyan-400/[0.04]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
                <UserPlus size={17} />
              </div>

              <div className="flex-1">
                <p className="text-xs font-semibold text-white">
                  Add Customer
                </p>

                <p className="mt-1 text-[9px] text-slate-600">
                  Create customer profile
                </p>
              </div>

              <ChevronRight
                size={14}
                className="text-slate-700 transition group-hover:translate-x-0.5 group-hover:text-cyan-400"
              />
            </button>

            <button
              type="button"
              className="group flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 text-left transition hover:-translate-y-0.5 hover:border-emerald-400/20 hover:bg-emerald-400/[0.04]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
                <FileCheck2 size={17} />
              </div>

              <div className="flex-1">
                <p className="text-xs font-semibold text-white">
                  Verify KYC
                </p>

                <p className="mt-1 text-[9px] text-slate-600">
                  Review documents
                </p>
              </div>

              <ChevronRight
                size={14}
                className="text-slate-700 transition group-hover:translate-x-0.5 group-hover:text-emerald-400"
              />
            </button>

            <button
              type="button"
              className="group flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 text-left transition hover:-translate-y-0.5 hover:border-amber-400/20 hover:bg-amber-400/[0.04]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400">
                <ClipboardCheck size={17} />
              </div>

              <div className="flex-1">
                <p className="text-xs font-semibold text-white">
                  Review Requests
                </p>

                <p className="mt-1 text-[9px] text-slate-600">
                  Pending customer tasks
                </p>
              </div>

              <ChevronRight
                size={14}
                className="text-slate-700 transition group-hover:translate-x-0.5 group-hover:text-amber-400"
              />
            </button>

            <button
              type="button"
              className="group flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 text-left transition hover:-translate-y-0.5 hover:border-purple-400/20 hover:bg-purple-400/[0.04]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-400/10 text-purple-400">
                <ShieldCheck size={17} />
              </div>

              <div className="flex-1">
                <p className="text-xs font-semibold text-white">
                  Security Review
                </p>

                <p className="mt-1 text-[9px] text-slate-600">
                  Review flagged activity
                </p>
              </div>

              <ChevronRight
                size={14}
                className="text-slate-700 transition group-hover:translate-x-0.5 group-hover:text-purple-400"
              />
            </button>
          </div>

          {/* NOTICE */}

          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-amber-400/10 bg-amber-400/[0.04] p-4">
            <AlertTriangle
              size={17}
              className="mt-0.5 shrink-0 text-amber-400"
            />

            <div>
              <p className="text-xs font-semibold text-amber-400">
                Employee access notice
              </p>

              <p className="mt-1 text-[10px] leading-5 text-slate-600">
                Employee actions may affect customer accounts, KYC
                verification and banking operations. Verify information
                carefully before approving requests.
              </p>
            </div>
          </div>
        </section>

        {/* ==========================================
            FOOTER STATUS
        ========================================== */}

        <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-white/[0.05] bg-white/[0.015] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Sparkles
              size={14}
              className="text-cyan-400"
            />

            <p className="text-[10px] text-slate-600">
              SmartBank AI Employee Operations Intelligence
            </p>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-slate-700">
            <Clock3 size={12} />
            Last workspace sync: just now
          </div>
        </div>
      </main>
    </div>
  );
};

export default Employee;