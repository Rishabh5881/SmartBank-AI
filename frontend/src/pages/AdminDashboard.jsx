import { motion } from "framer-motion";
import {
  ShieldCheck,
  Users,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  AlertTriangle,
  UserCheck,
  UserX,
  TrendingUp,
  Wallet,
  Eye,
  ChevronRight,
  CheckCircle2,
  Clock3,
  Ban,
  Settings,
  BarChart3,
  Search,
  MoreHorizontal,
} from "lucide-react";

const stats = [
  {
    title: "Total Customers",
    value: "12,480",
    change: "+12.8%",
    description: "vs last month",
    icon: Users,
    iconClass: "text-blue-400 bg-blue-400/10 border-blue-400/10",
    changeClass: "text-emerald-400",
  },
  {
    title: "Active Accounts",
    value: "10,842",
    change: "+8.4%",
    description: "currently active",
    icon: CreditCard,
    iconClass: "text-cyan-400 bg-cyan-400/10 border-cyan-400/10",
    changeClass: "text-emerald-400",
  },
  {
    title: "Transaction Volume",
    value: "$2.84M",
    change: "+16.2%",
    description: "this month",
    icon: TrendingUp,
    iconClass: "text-emerald-400 bg-emerald-400/10 border-emerald-400/10",
    changeClass: "text-emerald-400",
  },
  {
    title: "Security Alerts",
    value: "24",
    change: "-18.5%",
    description: "from last month",
    icon: ShieldCheck,
    iconClass: "text-amber-400 bg-amber-400/10 border-amber-400/10",
    changeClass: "text-emerald-400",
  },
];

const transactions = [
  {
    id: "TXN-98421",
    user: "Aarav Sharma",
    type: "Deposit",
    amount: "+$4,500",
    status: "Completed",
    time: "2 min ago",
    icon: ArrowUpRight,
    iconClass: "text-emerald-400 bg-emerald-400/10",
    amountClass: "text-emerald-400",
  },
  {
    id: "TXN-98420",
    user: "Emma Wilson",
    type: "Transfer",
    amount: "-$1,250",
    status: "Completed",
    time: "8 min ago",
    icon: ArrowDownRight,
    iconClass: "text-blue-400 bg-blue-400/10",
    amountClass: "text-slate-200",
  },
  {
    id: "TXN-98419",
    user: "Rahul Verma",
    type: "Withdrawal",
    amount: "-$680",
    status: "Pending",
    time: "14 min ago",
    icon: ArrowDownRight,
    iconClass: "text-amber-400 bg-amber-400/10",
    amountClass: "text-slate-200",
  },
  {
    id: "TXN-98418",
    user: "Sophia Martin",
    type: "Deposit",
    amount: "+$2,100",
    status: "Completed",
    time: "21 min ago",
    icon: ArrowUpRight,
    iconClass: "text-emerald-400 bg-emerald-400/10",
    amountClass: "text-emerald-400",
  },
  {
    id: "TXN-98417",
    user: "Daniel Smith",
    type: "Transfer",
    amount: "-$920",
    status: "Review",
    time: "34 min ago",
    icon: AlertTriangle,
    iconClass: "text-red-400 bg-red-400/10",
    amountClass: "text-slate-200",
  },
];

const users = [
  {
    name: "Aarav Sharma",
    email: "aarav@example.com",
    role: "Customer",
    status: "Active",
    initials: "AS",
    activity: "2 min ago",
  },
  {
    name: "Emma Wilson",
    email: "emma@example.com",
    role: "Customer",
    status: "Active",
    initials: "EW",
    activity: "8 min ago",
  },
  {
    name: "Rahul Verma",
    email: "rahul@example.com",
    role: "Customer",
    status: "Pending",
    initials: "RV",
    activity: "14 min ago",
  },
  {
    name: "Sophia Martin",
    email: "sophia@example.com",
    role: "Employee",
    status: "Active",
    initials: "SM",
    activity: "21 min ago",
  },
];

const alerts = [
  {
    title: "Multiple failed login attempts",
    description: "User account requires security review.",
    time: "5 min ago",
    level: "High",
    icon: AlertTriangle,
    className: "text-red-400 bg-red-400/10 border-red-400/10",
  },
  {
    title: "Large transaction detected",
    description: "Transaction above configured monitoring threshold.",
    time: "18 min ago",
    level: "Medium",
    icon: Activity,
    className: "text-amber-400 bg-amber-400/10 border-amber-400/10",
  },
  {
    title: "New employee account created",
    description: "Employee access has been successfully provisioned.",
    time: "42 min ago",
    level: "Info",
    icon: UserCheck,
    className: "text-cyan-400 bg-cyan-400/10 border-cyan-400/10",
  },
];

const AdminDashboard = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
      {/* =========================================================
          BACKGROUND
      ========================================================= */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-48 top-20 h-[500px] w-[500px] rounded-full bg-blue-600/[0.07] blur-[150px]" />

        <div className="absolute right-[-180px] top-[300px] h-[500px] w-[500px] rounded-full bg-cyan-500/[0.06] blur-[160px]" />

        <div className="absolute bottom-[-180px] left-[30%] h-[450px] w-[450px] rounded-full bg-indigo-600/[0.05] blur-[150px]" />
      </div>

      <main className="relative z-10 mx-auto max-w-[1500px] px-4 pb-24 pt-28 sm:px-6 lg:px-10 xl:px-12">
        {/* =========================================================
            HEADER
        ========================================================= */}

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
          className="
            relative
            overflow-hidden
            rounded-[2rem]
            border
            border-white/[0.08]
            bg-white/[0.025]
            p-6
            shadow-2xl
            shadow-black/20
            backdrop-blur-xl
            sm:p-8
            lg:p-10
          "
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/[0.07] blur-[100px]" />

          <div className="pointer-events-none absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-blue-500/[0.05] blur-[90px]" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/60" />

                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-cyan-400">
                  Administration Center
                </p>
              </div>

              <h1 className="mt-3 text-3xl font-extrabold tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl">
                Admin Dashboard
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
                Monitor customers, transactions, security activity and
                overall SmartBank AI operations from one centralized
                control center.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/10 bg-emerald-400/[0.06] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  System Operational
                </span>

                <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/10 bg-blue-400/[0.06] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-blue-400">
                  <ShieldCheck size={12} />
                  Admin Access
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-white/[0.08]
                  bg-white/[0.035]
                  px-4
                  py-3
                  text-xs
                  font-semibold
                  text-slate-300
                  transition
                  hover:border-white/[0.14]
                  hover:bg-white/[0.06]
                  hover:text-white
                "
              >
                <BarChart3 size={15} />
                Analytics
              </button>

              <button
                type="button"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-gradient-to-r
                  from-blue-600
                  to-cyan-500
                  px-4
                  py-3
                  text-xs
                  font-bold
                  text-white
                  shadow-lg
                  shadow-blue-500/10
                  transition
                  hover:-translate-y-0.5
                "
              >
                <Settings size={15} />
                Admin Settings
              </button>
            </div>
          </div>
        </motion.section>

        {/* =========================================================
            STAT CARDS
        ========================================================= */}

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[1.7rem]
                  border
                  border-white/[0.08]
                  bg-white/[0.025]
                  p-5
                  shadow-xl
                  shadow-black/10
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:border-white/[0.12]
                "
              >
                <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-500/[0.04] blur-3xl" />

                <div className="relative flex items-start justify-between">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl border ${stat.iconClass}`}
                  >
                    <Icon size={19} />
                  </div>

                  <span
                    className={`text-[10px] font-bold ${stat.changeClass}`}
                  >
                    {stat.change}
                  </span>
                </div>

                <p className="relative mt-5 text-xs font-medium text-slate-500">
                  {stat.title}
                </p>

                <h2 className="relative mt-1 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                  {stat.value}
                </h2>

                <p className="relative mt-2 text-[10px] text-slate-600">
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </section>

        {/* =========================================================
            MAIN GRID
        ========================================================= */}

        <section className="mt-6 grid gap-6 xl:grid-cols-[1.55fr_0.85fr]">
          {/* =======================================================
              TRANSACTION ACTIVITY
          ======================================================= */}

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
              duration: 0.5,
              delay: 0.15,
            }}
            className="
              overflow-hidden
              rounded-[2rem]
              border
              border-white/[0.08]
              bg-white/[0.025]
              shadow-xl
              shadow-black/10
              backdrop-blur-xl
            "
          >
            <div className="flex flex-col gap-4 border-b border-white/[0.06] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />

                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-blue-400">
                    Financial Activity
                  </p>
                </div>

                <h2 className="mt-2 text-lg font-bold text-white sm:text-xl">
                  Recent Transactions
                </h2>

                <p className="mt-1 text-xs text-slate-600">
                  Latest financial activity across the platform.
                </p>
              </div>

              <button
                type="button"
                className="inline-flex w-fit items-center gap-1 text-xs font-semibold text-cyan-400 transition hover:text-cyan-300"
              >
                View all
                <ChevronRight size={14} />
              </button>
            </div>

            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[680px]">
                <thead>
                  <tr className="border-b border-white/[0.05] text-left">
                    <th className="px-6 py-4 text-[9px] font-bold uppercase tracking-wider text-slate-600">
                      Transaction
                    </th>

                    <th className="px-6 py-4 text-[9px] font-bold uppercase tracking-wider text-slate-600">
                      User
                    </th>

                    <th className="px-6 py-4 text-[9px] font-bold uppercase tracking-wider text-slate-600">
                      Amount
                    </th>

                    <th className="px-6 py-4 text-[9px] font-bold uppercase tracking-wider text-slate-600">
                      Status
                    </th>

                    <th className="px-6 py-4 text-[9px] font-bold uppercase tracking-wider text-slate-600">
                      Time
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {transactions.map((transaction) => {
                    const Icon = transaction.icon;

                    return (
                      <tr
                        key={transaction.id}
                        className="border-b border-white/[0.04] transition hover:bg-white/[0.02]"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-9 w-9 items-center justify-center rounded-xl ${transaction.iconClass}`}
                            >
                              <Icon size={15} />
                            </div>

                            <div>
                              <p className="text-xs font-semibold text-slate-200">
                                {transaction.type}
                              </p>

                              <p className="mt-0.5 text-[9px] text-slate-600">
                                {transaction.id}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-xs font-medium text-slate-400">
                          {transaction.user}
                        </td>

                        <td
                          className={`px-6 py-4 text-xs font-bold ${transaction.amountClass}`}
                        >
                          {transaction.amount}
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`rounded-full px-2.5 py-1 text-[8px] font-bold uppercase tracking-wider ${
                              transaction.status === "Completed"
                                ? "bg-emerald-400/10 text-emerald-400"
                                : transaction.status === "Pending"
                                  ? "bg-amber-400/10 text-amber-400"
                                  : "bg-red-400/10 text-red-400"
                            }`}
                          >
                            {transaction.status}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-[10px] text-slate-600">
                          {transaction.time}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-white/[0.04] md:hidden">
              {transactions.map((transaction) => {
                const Icon = transaction.icon;

                return (
                  <div key={transaction.id} className="p-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${transaction.iconClass}`}
                      >
                        <Icon size={16} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <p className="truncate text-xs font-semibold text-white">
                            {transaction.user}
                          </p>

                          <p
                            className={`text-xs font-bold ${transaction.amountClass}`}
                          >
                            {transaction.amount}
                          </p>
                        </div>

                        <div className="mt-1 flex items-center justify-between gap-3">
                          <p className="text-[9px] text-slate-600">
                            {transaction.type} · {transaction.time}
                          </p>

                          <span
                            className={`text-[8px] font-bold uppercase ${
                              transaction.status === "Completed"
                                ? "text-emerald-400"
                                : transaction.status === "Pending"
                                  ? "text-amber-400"
                                  : "text-red-400"
                            }`}
                          >
                            {transaction.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.section>

          {/* =======================================================
              SECURITY ALERTS
          ======================================================= */}

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
              duration: 0.5,
              delay: 0.2,
            }}
            className="
              overflow-hidden
              rounded-[2rem]
              border
              border-white/[0.08]
              bg-white/[0.025]
              shadow-xl
              shadow-black/10
              backdrop-blur-xl
            "
          >
            <div className="border-b border-white/[0.06] p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-400" />

                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-red-400">
                      Security Center
                    </p>
                  </div>

                  <h2 className="mt-2 text-lg font-bold text-white">
                    Security Alerts
                  </h2>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-400/10 text-red-400">
                  <ShieldCheck size={17} />
                </div>
              </div>
            </div>

            <div className="divide-y divide-white/[0.04]">
              {alerts.map((alert) => {
                const Icon = alert.icon;

                return (
                  <div
                    key={alert.title}
                    className="p-5 transition hover:bg-white/[0.02]"
                  >
                    <div className="flex gap-3">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${alert.className}`}
                      >
                        <Icon size={15} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-xs font-semibold leading-5 text-slate-200">
                            {alert.title}
                          </p>

                          <span
                            className={`shrink-0 text-[8px] font-bold uppercase tracking-wider ${
                              alert.level === "High"
                                ? "text-red-400"
                                : alert.level === "Medium"
                                  ? "text-amber-400"
                                  : "text-cyan-400"
                            }`}
                          >
                            {alert.level}
                          </span>
                        </div>

                        <p className="mt-1 text-[10px] leading-5 text-slate-600">
                          {alert.description}
                        </p>

                        <div className="mt-2 flex items-center gap-1 text-[9px] text-slate-700">
                          <Clock3 size={11} />
                          {alert.time}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-white/[0.06] p-4">
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] py-2.5 text-[10px] font-semibold text-slate-400 transition hover:border-red-400/10 hover:bg-red-400/[0.04] hover:text-red-400"
              >
                Review Security Center
                <ChevronRight size={13} />
              </button>
            </div>
          </motion.section>
        </section>

        {/* =========================================================
            USER MANAGEMENT
        ========================================================= */}

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
            duration: 0.5,
            delay: 0.25,
          }}
          className="
            mt-6
            overflow-hidden
            rounded-[2rem]
            border
            border-white/[0.08]
            bg-white/[0.025]
            shadow-xl
            shadow-black/10
            backdrop-blur-xl
          "
        >
          <div className="flex flex-col gap-4 border-b border-white/[0.06] p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />

                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-cyan-400">
                  User Management
                </p>
              </div>

              <h2 className="mt-2 text-lg font-bold text-white sm:text-xl">
                Customers & Employees
              </h2>

              <p className="mt-1 text-xs text-slate-600">
                Manage user access and account activity.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.02] px-3 py-2.5">
                <Search size={14} className="text-slate-600" />

                <input
                  type="text"
                  placeholder="Search users..."
                  className="w-full bg-transparent text-xs text-slate-300 outline-none placeholder:text-slate-700 sm:w-48"
                />
              </div>

              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600/10 px-4 py-2.5 text-xs font-semibold text-blue-400 transition hover:bg-blue-600/15"
              >
                <Users size={14} />
                Manage Users
              </button>
            </div>
          </div>

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-white/[0.05] text-left">
                  <th className="px-6 py-4 text-[9px] font-bold uppercase tracking-wider text-slate-600">
                    User
                  </th>

                  <th className="px-6 py-4 text-[9px] font-bold uppercase tracking-wider text-slate-600">
                    Role
                  </th>

                  <th className="px-6 py-4 text-[9px] font-bold uppercase tracking-wider text-slate-600">
                    Status
                  </th>

                  <th className="px-6 py-4 text-[9px] font-bold uppercase tracking-wider text-slate-600">
                    Last Activity
                  </th>

                  <th className="px-6 py-4 text-right text-[9px] font-bold uppercase tracking-wider text-slate-600">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.email}
                    className="border-b border-white/[0.04] transition hover:bg-white/[0.02]"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/30 to-cyan-500/20 text-[10px] font-bold text-cyan-300">
                          {user.initials}
                        </div>

                        <div>
                          <p className="text-xs font-semibold text-slate-200">
                            {user.name}
                          </p>

                          <p className="mt-0.5 text-[9px] text-slate-600">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-full border border-blue-400/10 bg-blue-400/[0.06] px-2.5 py-1 text-[8px] font-bold uppercase tracking-wider text-blue-300">
                        {user.role}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            user.status === "Active"
                              ? "bg-emerald-400"
                              : "bg-amber-400"
                          }`}
                        />

                        <span
                          className={`text-[9px] font-semibold ${
                            user.status === "Active"
                              ? "text-emerald-400"
                              : "text-amber-400"
                          }`}
                        >
                          {user.status}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-[10px] text-slate-600">
                      {user.activity}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] text-slate-500 transition hover:border-cyan-400/10 hover:text-cyan-400"
                        >
                          <Eye size={14} />
                        </button>

                        <button
                          type="button"
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] text-slate-500 transition hover:border-red-400/10 hover:text-red-400"
                        >
                          <MoreHorizontal size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="divide-y divide-white/[0.04] md:hidden">
            {users.map((user) => (
              <div key={user.email} className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/30 to-cyan-500/20 text-[10px] font-bold text-cyan-300">
                    {user.initials}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <p className="truncate text-xs font-semibold text-white">
                        {user.name}
                      </p>

                      <span
                        className={`text-[8px] font-bold uppercase ${
                          user.status === "Active"
                            ? "text-emerald-400"
                            : "text-amber-400"
                        }`}
                      >
                        {user.status}
                      </span>
                    </div>

                    <p className="mt-1 truncate text-[9px] text-slate-600">
                      {user.email}
                    </p>

                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[8px] font-semibold uppercase tracking-wider text-blue-300">
                        {user.role}
                      </span>

                      <button
                        type="button"
                        className="text-slate-600 transition hover:text-cyan-400"
                      >
                        <Eye size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* =========================================================
            SYSTEM OVERVIEW
        ========================================================= */}

        <section className="mt-6 grid gap-6 lg:grid-cols-3">
          <motion.div
            whileHover={{
              y: -4,
            }}
            className="
              rounded-[2rem]
              border
              border-white/[0.08]
              bg-white/[0.025]
              p-6
              shadow-xl
              shadow-black/10
              backdrop-blur-xl
            "
          >
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
                <UserCheck size={19} />
              </div>

              <CheckCircle2 size={16} className="text-emerald-400" />
            </div>

            <p className="mt-6 text-xs text-slate-500">
              Verified Customers
            </p>

            <h3 className="mt-1 text-3xl font-extrabold text-white">
              9,624
            </h3>

            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
              <div className="h-full w-[82%] rounded-full bg-emerald-400" />
            </div>

            <p className="mt-2 text-[9px] text-slate-600">
              82% of registered customers verified
            </p>
          </motion.div>

          <motion.div
            whileHover={{
              y: -4,
            }}
            className="
              rounded-[2rem]
              border
              border-white/[0.08]
              bg-white/[0.025]
              p-6
              shadow-xl
              shadow-black/10
              backdrop-blur-xl
            "
          >
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400">
                <Clock3 size={19} />
              </div>

              <span className="text-[9px] font-bold uppercase tracking-wider text-amber-400">
                Review
              </span>
            </div>

            <p className="mt-6 text-xs text-slate-500">
              Pending Verification
            </p>

            <h3 className="mt-1 text-3xl font-extrabold text-white">
              186
            </h3>

            <p className="mt-3 text-[9px] leading-5 text-slate-600">
              Accounts are waiting for identity or account verification.
            </p>

            <button
              type="button"
              className="mt-4 inline-flex items-center gap-1 text-[10px] font-semibold text-amber-400"
            >
              Review requests
              <ChevronRight size={12} />
            </button>
          </motion.div>

          <motion.div
            whileHover={{
              y: -4,
            }}
            className="
              rounded-[2rem]
              border
              border-white/[0.08]
              bg-white/[0.025]
              p-6
              shadow-xl
              shadow-black/10
              backdrop-blur-xl
            "
          >
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-400/10 text-red-400">
                <Ban size={19} />
              </div>

              <span className="text-[9px] font-bold uppercase tracking-wider text-red-400">
                Restricted
              </span>
            </div>

            <p className="mt-6 text-xs text-slate-500">
              Restricted Accounts
            </p>

            <h3 className="mt-1 text-3xl font-extrabold text-white">
              42
            </h3>

            <p className="mt-3 text-[9px] leading-5 text-slate-600">
              Accounts currently restricted due to security or compliance
              checks.
            </p>

            <button
              type="button"
              className="mt-4 inline-flex items-center gap-1 text-[10px] font-semibold text-red-400"
            >
              Review accounts
              <ChevronRight size={12} />
            </button>
          </motion.div>
        </section>

        {/* =========================================================
            ADMIN SECURITY FOOTER
        ========================================================= */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.4,
          }}
          className="
            mt-8
            flex
            flex-col
            gap-3
            rounded-2xl
            border
            border-cyan-400/10
            bg-cyan-400/[0.025]
            px-5
            py-4
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
              <ShieldCheck size={16} />
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-300">
                Administrative environment protected
              </p>

              <p className="mt-0.5 text-[9px] text-slate-600">
                SmartBank AI monitoring and security systems are active.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-wider text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50" />
            All systems operational
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default AdminDashboard;