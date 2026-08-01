import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  ChevronDown,
  CircleDollarSign,
  CreditCard,
  Lightbulb,
  PiggyBank,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const weeklyData = [
  {
    day: "Mon",
    income: 850,
    expenses: 420,
  },
  {
    day: "Tue",
    income: 1100,
    expenses: 520,
  },
  {
    day: "Wed",
    income: 760,
    expenses: 390,
  },
  {
    day: "Thu",
    income: 1250,
    expenses: 680,
  },
  {
    day: "Fri",
    income: 980,
    expenses: 470,
  },
  {
    day: "Sat",
    income: 720,
    expenses: 610,
  },
  {
    day: "Sun",
    income: 920,
    expenses: 510,
  },
];

const monthlyData = [
  {
    month: "Jan",
    income: 7200,
    expenses: 3100,
  },
  {
    month: "Feb",
    income: 7600,
    expenses: 3400,
  },
  {
    month: "Mar",
    income: 8100,
    expenses: 3200,
  },
  {
    month: "Apr",
    income: 7900,
    expenses: 3500,
  },
  {
    month: "May",
    income: 8400,
    expenses: 3300,
  },
  {
    month: "Jun",
    income: 8500,
    expenses: 3200,
  },
];

const expenseCategories = [
  {
    name: "Shopping",
    value: 820,
    percentage: 26,
  },
  {
    name: "Food & Dining",
    value: 640,
    percentage: 20,
  },
  {
    name: "Bills & Utilities",
    value: 570,
    percentage: 18,
  },
  {
    name: "Transport",
    value: 420,
    percentage: 13,
  },
  {
    name: "Entertainment",
    value: 350,
    percentage: 11,
  },
  {
    name: "Others",
    value: 400,
    percentage: 12,
  },
];

const categoryColors = [
  "#06b6d4",
  "#3b82f6",
  "#8b5cf6",
  "#10b981",
  "#f59e0b",
  "#64748b",
];

const Analytics = () => {
  const [range, setRange] = useState("Weekly");

  const chartData = useMemo(() => {
    if (range === "Monthly") {
      return monthlyData;
    }

    return weeklyData;
  }, [range]);

  const totalExpenses = expenseCategories.reduce(
    (total, category) => total + category.value,
    0
  );

  const savingsRate = Math.round(
    ((8500 - 3200) / 8500) * 100
  );

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-6 text-white sm:px-6 lg:px-8">
      {/* =====================================================
          BACKGROUND EFFECTS
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-600/[0.08] blur-[140px]" />

        <div className="absolute -right-40 top-80 h-96 w-96 rounded-full bg-cyan-500/[0.06] blur-[140px]" />

        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-purple-500/[0.04] blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* =====================================================
            HEADER
        ====================================================== */}

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
          className="
            relative
            overflow-hidden
            rounded-[30px]
            border
            border-white/[0.08]
            bg-white/[0.035]
            p-6
            shadow-2xl
            shadow-black/20
            backdrop-blur-2xl
            sm:p-8
          "
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/[0.07] blur-3xl" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-cyan-400/15
                  bg-cyan-400/[0.07]
                  px-3
                  py-1.5
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-wider
                  text-cyan-300
                "
              >
                <BarChart3 size={13} />

                Financial Analytics
              </div>

              <h1
                className="
                  mt-4
                  text-3xl
                  font-extrabold
                  tracking-tight
                  text-white
                  sm:text-4xl
                "
              >
                Your Financial Overview
              </h1>

              <p
                className="
                  mt-2
                  max-w-2xl
                  text-sm
                  leading-6
                  text-slate-500
                  sm:text-base
                "
              >
                Understand your spending, track your savings,
                and make smarter financial decisions with
                SmartBank AI.
              </p>
            </div>

            <div
              className="
                flex
                items-center
                gap-2
                rounded-xl
                border
                border-white/[0.08]
                bg-white/[0.035]
                px-3
                py-2
              "
            >
              <CalendarDays
                size={15}
                className="text-slate-500"
              />

              <select
                value={range}
                onChange={(event) =>
                  setRange(event.target.value)
                }
                className="
                  cursor-pointer
                  appearance-none
                  bg-transparent
                  pr-5
                  text-xs
                  font-semibold
                  text-slate-300
                  outline-none
                "
              >
                <option
                  value="Weekly"
                  className="bg-slate-900"
                >
                  This Week
                </option>

                <option
                  value="Monthly"
                  className="bg-slate-900"
                >
                  This Year
                </option>
              </select>

              <ChevronDown
                size={13}
                className="-ml-5 pointer-events-none text-slate-600"
              />
            </div>
          </div>
        </motion.div>

        {/* =====================================================
            STAT CARDS
        ====================================================== */}

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {/* INCOME */}

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
              delay: 0.05,
            }}
            whileHover={{
              y: -4,
            }}
            className="
              rounded-[24px]
              border
              border-white/[0.07]
              bg-white/[0.035]
              p-5
              backdrop-blur-xl
              transition-all
              hover:border-emerald-400/20
            "
          >
            <div className="flex items-center justify-between">
              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-emerald-400/10
                  bg-emerald-400/[0.08]
                "
              >
                <ArrowUpRight
                  size={20}
                  className="text-emerald-400"
                />
              </div>

              <span
                className="
                  rounded-full
                  bg-emerald-400/[0.08]
                  px-2
                  py-1
                  text-[10px]
                  font-bold
                  text-emerald-400
                "
              >
                +8.4%
              </span>
            </div>

            <p className="mt-5 text-xs font-medium text-slate-500">
              Monthly Income
            </p>

            <h2 className="mt-1 text-2xl font-bold text-white">
              ₹8,500
            </h2>

            <p className="mt-2 text-[10px] text-slate-600">
              Compared with previous month
            </p>
          </motion.div>

          {/* EXPENSES */}

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
              delay: 0.1,
            }}
            whileHover={{
              y: -4,
            }}
            className="
              rounded-[24px]
              border
              border-white/[0.07]
              bg-white/[0.035]
              p-5
              backdrop-blur-xl
              transition-all
              hover:border-red-400/20
            "
          >
            <div className="flex items-center justify-between">
              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-red-400/10
                  bg-red-400/[0.08]
                "
              >
                <ArrowDownRight
                  size={20}
                  className="text-red-400"
                />
              </div>

              <span
                className="
                  rounded-full
                  bg-emerald-400/[0.08]
                  px-2
                  py-1
                  text-[10px]
                  font-bold
                  text-emerald-400
                "
              >
                -4.1%
              </span>
            </div>

            <p className="mt-5 text-xs font-medium text-slate-500">
              Monthly Expenses
            </p>

            <h2 className="mt-1 text-2xl font-bold text-white">
              ₹3,200
            </h2>

            <p className="mt-2 text-[10px] text-slate-600">
              Spending is under control
            </p>
          </motion.div>

          {/* SAVINGS */}

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
              delay: 0.15,
            }}
            whileHover={{
              y: -4,
            }}
            className="
              rounded-[24px]
              border
              border-white/[0.07]
              bg-white/[0.035]
              p-5
              backdrop-blur-xl
              transition-all
              hover:border-cyan-400/20
            "
          >
            <div className="flex items-center justify-between">
              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-cyan-400/10
                  bg-cyan-400/[0.08]
                "
              >
                <PiggyBank
                  size={20}
                  className="text-cyan-400"
                />
              </div>

              <span
                className="
                  rounded-full
                  bg-cyan-400/[0.08]
                  px-2
                  py-1
                  text-[10px]
                  font-bold
                  text-cyan-400
                "
              >
                {savingsRate}%
              </span>
            </div>

            <p className="mt-5 text-xs font-medium text-slate-500">
              Total Savings
            </p>

            <h2 className="mt-1 text-2xl font-bold text-white">
              ₹12,450
            </h2>

            <p className="mt-2 text-[10px] text-slate-600">
              Saving rate is improving
            </p>
          </motion.div>

          {/* FINANCIAL SCORE */}

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
              delay: 0.2,
            }}
            whileHover={{
              y: -4,
            }}
            className="
              rounded-[24px]
              border
              border-white/[0.07]
              bg-white/[0.035]
              p-5
              backdrop-blur-xl
              transition-all
              hover:border-purple-400/20
            "
          >
            <div className="flex items-center justify-between">
              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-purple-400/10
                  bg-purple-400/[0.08]
                "
              >
                <Activity
                  size={20}
                  className="text-purple-400"
                />
              </div>

              <span
                className="
                  rounded-full
                  bg-purple-400/[0.08]
                  px-2
                  py-1
                  text-[10px]
                  font-bold
                  text-purple-300
                "
              >
                Excellent
              </span>
            </div>

            <p className="mt-5 text-xs font-medium text-slate-500">
              Financial Health
            </p>

            <h2 className="mt-1 text-2xl font-bold text-white">
              86 / 100
            </h2>

            <p className="mt-2 text-[10px] text-slate-600">
              Strong financial position
            </p>
          </motion.div>
        </div>

        {/* =====================================================
            MAIN CHART + FINANCIAL HEALTH
        ====================================================== */}

        <div className="mt-6 grid gap-6 xl:grid-cols-3">
          {/* INCOME / EXPENSE CHART */}

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
              delay: 0.25,
            }}
            className="
              rounded-[28px]
              border
              border-white/[0.07]
              bg-white/[0.035]
              p-5
              shadow-2xl
              shadow-black/10
              backdrop-blur-xl
              sm:p-6
              xl:col-span-2
            "
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      bg-blue-400/[0.08]
                    "
                  >
                    <BarChart3
                      size={19}
                      className="text-blue-400"
                    />
                  </div>

                  <div>
                    <h2 className="text-sm font-bold text-white">
                      Income vs Expenses
                    </h2>

                    <p className="mt-0.5 text-[10px] text-slate-600">
                      Financial activity overview
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-cyan-400" />

                  <span className="text-[10px] text-slate-500">
                    Income
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-500" />

                  <span className="text-[10px] text-slate-500">
                    Expenses
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 h-[300px] w-full">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <AreaChart
                  data={chartData}
                  margin={{
                    top: 10,
                    right: 5,
                    left: -20,
                    bottom: 0,
                  }}
                >
                  <defs>
                    <linearGradient
                      id="incomeGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#06b6d4"
                        stopOpacity={0.35}
                      />

                      <stop
                        offset="100%"
                        stopColor="#06b6d4"
                        stopOpacity={0}
                      />
                    </linearGradient>

                    <linearGradient
                      id="expenseGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#3b82f6"
                        stopOpacity={0.3}
                      />

                      <stop
                        offset="100%"
                        stopColor="#3b82f6"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    stroke="rgba(255,255,255,0.05)"
                    vertical={false}
                  />

                  <XAxis
                    dataKey={
                      range === "Monthly"
                        ? "month"
                        : "day"
                    }
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "#64748b",
                      fontSize: 10,
                    }}
                  />

                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "#64748b",
                      fontSize: 10,
                    }}
                  />

                  <Tooltip
                    contentStyle={{
                      background:
                        "rgba(15,23,42,0.95)",
                      border:
                        "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "14px",
                      color: "#fff",
                    }}
                    labelStyle={{
                      color: "#94a3b8",
                      marginBottom: "5px",
                    }}
                  />

                  <Area
                    type="monotone"
                    dataKey="income"
                    stroke="#06b6d4"
                    strokeWidth={2}
                    fill="url(#incomeGradient)"
                  />

                  <Area
                    type="monotone"
                    dataKey="expenses"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    fill="url(#expenseGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* FINANCIAL HEALTH */}

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
            }}
            className="
              relative
              overflow-hidden
              rounded-[28px]
              border
              border-white/[0.07]
              bg-gradient-to-br
              from-cyan-400/[0.07]
              via-white/[0.035]
              to-blue-500/[0.05]
              p-6
              backdrop-blur-xl
            "
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-400/[0.08] blur-3xl" />

            <div className="relative">
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-emerald-400/[0.08]
                  "
                >
                  <TrendingUp
                    size={19}
                    className="text-emerald-400"
                  />
                </div>

                <div>
                  <h2 className="text-sm font-bold text-white">
                    Financial Health
                  </h2>

                  <p className="mt-0.5 text-[10px] text-slate-600">
                    Your current score
                  </p>
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <div className="relative flex h-48 w-48 items-center justify-center rounded-full border-[14px] border-emerald-400/[0.08]">
                  <div
                    className="
                      absolute
                      inset-[-14px]
                      rounded-full
                      border-[14px]
                      border-transparent
                      border-t-emerald-400
                      border-r-cyan-400
                      rotate-[35deg]
                    "
                  />

                  <div className="text-center">
                    <p className="text-5xl font-extrabold text-white">
                      86
                    </p>

                    <p className="mt-1 text-xs font-semibold text-emerald-400">
                      Excellent
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <div>
                  <div className="flex justify-between">
                    <span className="text-[10px] text-slate-500">
                      Savings
                    </span>

                    <span className="text-[10px] font-semibold text-cyan-400">
                      82%
                    </span>
                  </div>

                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                    <div className="h-full w-[82%] rounded-full bg-cyan-400" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between">
                    <span className="text-[10px] text-slate-500">
                      Spending control
                    </span>

                    <span className="text-[10px] font-semibold text-emerald-400">
                      91%
                    </span>
                  </div>

                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                    <div className="h-full w-[91%] rounded-full bg-emerald-400" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* =====================================================
            EXPENSE BREAKDOWN + SAVINGS
        ====================================================== */}

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* EXPENSE BREAKDOWN */}

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
              delay: 0.35,
            }}
            className="
              rounded-[28px]
              border
              border-white/[0.07]
              bg-white/[0.035]
              p-6
              backdrop-blur-xl
            "
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-purple-400/[0.08]
                  "
                >
                  <Wallet
                    size={19}
                    className="text-purple-400"
                  />
                </div>

                <div>
                  <h2 className="text-sm font-bold text-white">
                    Expense Breakdown
                  </h2>

                  <p className="mt-0.5 text-[10px] text-slate-600">
                    Where your money goes
                  </p>
                </div>
              </div>

              <span className="text-sm font-bold text-white">
                ₹{totalExpenses.toLocaleString()}
              </span>
            </div>

            <div className="mt-8 flex flex-col items-center gap-8 sm:flex-row">
              <div className="h-52 w-52 shrink-0">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <PieChart>
                    <Pie
                      data={expenseCategories}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={82}
                      paddingAngle={3}
                      stroke="none"
                    >
                      {expenseCategories.map(
                        (item, index) => (
                          <Cell
                            key={item.name}
                            fill={
                              categoryColors[index]
                            }
                          />
                        )
                      )}
                    </Pie>

                    <Tooltip
                      contentStyle={{
                        background:
                          "rgba(15,23,42,0.95)",
                        border:
                          "1px solid rgba(255,255,255,0.08)",
                        borderRadius: "12px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="w-full space-y-3">
                {expenseCategories.map(
                  (category, index) => (
                    <div
                      key={category.name}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{
                            backgroundColor:
                              categoryColors[
                                index
                              ],
                          }}
                        />

                        <span className="text-xs text-slate-400">
                          {category.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-slate-600">
                          {category.percentage}%
                        </span>

                        <span className="text-xs font-semibold text-white">
                          ₹
                          {category.value.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </motion.div>

          {/* SAVINGS GOALS */}

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
              delay: 0.4,
            }}
            className="
              rounded-[28px]
              border
              border-white/[0.07]
              bg-white/[0.035]
              p-6
              backdrop-blur-xl
            "
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-cyan-400/[0.08]
                  "
                >
                  <PiggyBank
                    size={19}
                    className="text-cyan-400"
                  />
                </div>

                <div>
                  <h2 className="text-sm font-bold text-white">
                    Savings Goals
                  </h2>

                  <p className="mt-0.5 text-[10px] text-slate-600">
                    Track your financial goals
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="
                  rounded-lg
                  border
                  border-white/[0.07]
                  bg-white/[0.03]
                  px-3
                  py-1.5
                  text-[10px]
                  font-semibold
                  text-slate-500
                  transition
                  hover:border-cyan-400/20
                  hover:text-cyan-400
                "
              >
                Manage
              </button>
            </div>

            <div className="mt-8 space-y-6">
              {/* GOAL 1 */}

              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CircleDollarSign
                      size={15}
                      className="text-cyan-400"
                    />

                    <span className="text-xs font-semibold text-slate-300">
                      Emergency Fund
                    </span>
                  </div>

                  <span className="text-[10px] text-slate-500">
                    ₹72,000 / ₹100,000
                  </span>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    animate={{
                      width: "72%",
                    }}
                    transition={{
                      duration: 1,
                      delay: 0.5,
                    }}
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                  />
                </div>

                <p className="mt-2 text-[10px] text-slate-600">
                  72% completed
                </p>
              </div>

              {/* GOAL 2 */}

              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard
                      size={15}
                      className="text-purple-400"
                    />

                    <span className="text-xs font-semibold text-slate-300">
                      New Laptop
                    </span>
                  </div>

                  <span className="text-[10px] text-slate-500">
                    ₹48,000 / ₹80,000
                  </span>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    animate={{
                      width: "60%",
                    }}
                    transition={{
                      duration: 1,
                      delay: 0.6,
                    }}
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-400"
                  />
                </div>

                <p className="mt-2 text-[10px] text-slate-600">
                  60% completed
                </p>
              </div>

              {/* GOAL 3 */}

              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wallet
                      size={15}
                      className="text-emerald-400"
                    />

                    <span className="text-xs font-semibold text-slate-300">
                      Travel Fund
                    </span>
                  </div>

                  <span className="text-[10px] text-slate-500">
                    ₹30,000 / ₹50,000
                  </span>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    animate={{
                      width: "60%",
                    }}
                    transition={{
                      duration: 1,
                      delay: 0.7,
                    }}
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400"
                  />
                </div>

                <p className="mt-2 text-[10px] text-slate-600">
                  60% completed
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* =====================================================
            AI FINANCIAL INSIGHT
        ====================================================== */}

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
            delay: 0.45,
          }}
          className="
            relative
            mt-6
            overflow-hidden
            rounded-[28px]
            border
            border-cyan-400/10
            bg-gradient-to-r
            from-blue-500/[0.08]
            via-cyan-400/[0.04]
            to-purple-500/[0.06]
            p-6
            sm:p-7
          "
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-400/[0.08] blur-3xl" />

          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
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
                  border-cyan-400/10
                  bg-cyan-400/[0.08]
                "
              >
                <Sparkles
                  size={21}
                  className="text-cyan-400"
                />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-bold text-white">
                    SmartBank AI Insight
                  </h3>

                  <span
                    className="
                      rounded-full
                      bg-emerald-400/[0.08]
                      px-2
                      py-0.5
                      text-[8px]
                      font-bold
                      uppercase
                      tracking-wider
                      text-emerald-400
                    "
                  >
                    Personalized
                  </span>
                </div>

                <p className="mt-2 max-w-3xl text-xs leading-6 text-slate-500 sm:text-sm">
                  Your expenses are down by 4.1% this month,
                  while your savings rate remains strong.
                  Shopping is currently your highest spending
                  category. Reducing it by 10% could help you
                  save approximately ₹82 more every month.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="
                inline-flex
                shrink-0
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-cyan-400/15
                bg-cyan-400/[0.07]
                px-5
                py-3
                text-xs
                font-semibold
                text-cyan-300
                transition-all
                hover:border-cyan-400/25
                hover:bg-cyan-400/[0.12]
              "
            >
              <Lightbulb size={15} />

              View AI Recommendations

              <ArrowUpRight size={14} />
            </button>
          </div>
        </motion.div>

        {/* =====================================================
            FOOTER STATUS
        ====================================================== */}

        <div className="mt-6 flex items-center justify-center gap-2 pb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

          <span className="text-[10px] font-medium text-slate-600">
            Analytics updated just now
          </span>

          <TrendingDown
            size={11}
            className="text-emerald-400"
          />
        </div>
      </div>
    </div>
  );
};

export default Analytics;