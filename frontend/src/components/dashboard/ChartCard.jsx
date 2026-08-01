import { motion } from "framer-motion";
import {
BarChart3,
TrendingUp,
CalendarDays,
ArrowUpRight,
} from "lucide-react";
import {
ResponsiveContainer,
AreaChart,
Area,
XAxis,
YAxis,
CartesianGrid,
Tooltip,
} from "recharts";

const ChartCard = () => {
const data = [
{ month: "Jan", income: 5200, expense: 2100 },
{ month: "Feb", income: 6100, expense: 2500 },
{ month: "Mar", income: 5800, expense: 2300 },
{ month: "Apr", income: 7200, expense: 2800 },
{ month: "May", income: 6800, expense: 2600 },
{ month: "Jun", income: 7900, expense: 3100 },
{ month: "Jul", income: 8500, expense: 2300 },
];

const totalIncome = data[data.length - 1].income;
const totalExpense = data[data.length - 1].expense;

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
duration: 0.55,
ease: "easeOut",
}}
className="
group
relative
overflow-hidden
rounded-3xl
border
border-white/10
bg-gradient-to-br
from-slate-900/95
via-slate-900/80
to-blue-950/70
p-5
text-white
shadow-2xl
shadow-black/20
backdrop-blur-2xl
transition-all
duration-500
hover/20
hover/10
sm
"
>
{/* Ambient Glow */}

  <div
    className="
      pointer-events-none
      absolute
      -right-24
      -top-24
      h-64
      w-64
      rounded-full
      bg-cyan-500/10
      blur-3xl
      transition-transform
      duration-700
      group-hover:scale-125
    "
  />

  <div
    className="
      pointer-events-none
      absolute
      -bottom-28
      -left-24
      h-64
      w-64
      rounded-full
      bg-blue-600/10
      blur-3xl
    "
  />

  {/* Main Content */}

  <div className="relative z-10">
    {/* Header */}

    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-2xl
            border
            border-cyan-400/10
            bg-cyan-400/10
            text-cyan-400
            shadow-lg
            shadow-cyan-500/5
          "
        >
          <BarChart3 size={21} />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold tracking-tight sm:text-xl">
              Financial Overview
            </h2>

            <span
              className="
                rounded-full
                border
                border-green-400/15
                bg-green-400/10
                px-2
                py-0.5
                text-[9px]
                font-bold
                uppercase
                tracking-wider
                text-green-400
              "
            >
              Live
            </span>
          </div>

          <p className="mt-1 text-xs text-slate-400 sm:text-sm">
            Income and expense performance
          </p>
        </div>
      </div>

      {/* Period */}

      <button
        type="button"
        className="
          flex
          w-fit
          items-center
          gap-2
          rounded-xl
          border
          border-white/10
          bg-white/[0.05]
          px-3
          py-2
          text-xs
          font-medium
          text-slate-300
          transition
          hover:border-cyan-400/20
          hover:bg-white/[0.08]
          hover:text-white
        "
      >
        <CalendarDays size={14} className="text-cyan-400" />
        Last 7 months
      </button>
    </div>

    {/* Summary Stats */}

    <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
      <div
        className="
          rounded-2xl
          border
          border-white/10
          bg-white/[0.04]
          p-4
          transition
          duration-300
          hover:bg-white/[0.06]
        "
      >
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50" />

          <span className="text-xs text-slate-400">
            Income
          </span>
        </div>

        <div className="mt-2 flex items-end gap-2">
          <span className="text-xl font-bold sm:text-2xl">
            ₹{totalIncome.toLocaleString("en-IN")}
          </span>

          <span className="mb-1 text-[10px] font-semibold text-green-400">
            +8.4%
          </span>
        </div>
      </div>

      <div
        className="
          rounded-2xl
          border
          border-white/10
          bg-white/[0.04]
          p-4
          transition
          duration-300
          hover:bg-white/[0.06]
        "
      >
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50" />

          <span className="text-xs text-slate-400">
            Expenses
          </span>
        </div>

        <div className="mt-2 flex items-end gap-2">
          <span className="text-xl font-bold sm:text-2xl">
            ₹{totalExpense.toLocaleString("en-IN")}
          </span>

          <span className="mb-1 text-[10px] font-semibold text-green-400">
            -4.1%
          </span>
        </div>
      </div>

      <div
        className="
          col-span-2
          rounded-2xl
          border
          border-cyan-400/10
          bg-gradient-to-br
          from-cyan-400/[0.08]
          to-blue-500/[0.05]
          p-4
          sm:col-span-1
        "
      >
        <div className="flex items-center gap-2">
          <TrendingUp
            size={14}
            className="text-cyan-400"
          />

          <span className="text-xs text-slate-400">
            Net Savings
          </span>
        </div>

        <div className="mt-2 flex items-end gap-2">
          <span className="text-xl font-bold text-cyan-300 sm:text-2xl">
            ₹{(totalIncome - totalExpense).toLocaleString("en-IN")}
          </span>

          <ArrowUpRight
            size={16}
            className="mb-1 text-green-400"
          />
        </div>
      </div>
    </div>

    {/* Chart */}

    <div className="mt-7 h-[280px] w-full sm:h-[320px]">
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <AreaChart
          data={data}
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
                stopOpacity={0.35}
              />
              <stop
                offset="100%"
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
                stopOpacity={0.18}
              />
              <stop
                offset="100%"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            strokeOpacity={0.08}
          />

          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{
              fontSize: 11,
              fill: "#64748b",
            }}
            dy={10}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{
              fontSize: 10,
              fill: "#64748b",
            }}
            tickFormatter={(value) =>
              `₹${value / 1000}k`
            }
          />

          <Tooltip
            cursor={{
              stroke: "rgba(255,255,255,0.12)",
              strokeWidth: 1,
            }}
            contentStyle={{
              background:
                "rgba(15, 23, 42, 0.95)",
              border:
                "1px solid rgba(255,255,255,0.10)",
              borderRadius: "14px",
              boxShadow:
                "0 20px 50px rgba(0,0,0,0.35)",
              color: "#fff",
            }}
            labelStyle={{
              color: "#94a3b8",
              marginBottom: "5px",
            }}
            formatter={(value, name) => [
              `₹${Number(value).toLocaleString(
                "en-IN"
              )}`,
              name === "income"
                ? "Income"
                : "Expenses",
            ]}
          />

          <Area
            type="monotone"
            dataKey="income"
            stroke="#22d3ee"
            strokeWidth={2.5}
            fill="url(#incomeGradient)"
            dot={false}
            activeDot={{
              r: 5,
              strokeWidth: 3,
            }}
          />

          <Area
            type="monotone"
            dataKey="expense"
            stroke="#60a5fa"
            strokeWidth={2}
            fill="url(#expenseGradient)"
            dot={false}
            activeDot={{
              r: 4,
              strokeWidth: 2,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>

    {/* Legend */}

    <div
      className="
        mt-2
        flex
        flex-wrap
        items-center
        justify-between
        gap-4
        border-t
        border-white/[0.06]
        pt-4
      "
    >
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-cyan-400" />
          <span className="text-xs text-slate-400">
            Income
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-blue-400" />
          <span className="text-xs text-slate-400">
            Expenses
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-slate-500">
        <TrendingUp
          size={13}
          className="text-green-400"
        />
        Healthy financial trend
      </div>
    </div>
  </div>
</motion.div>

);
};

export default ChartCard;