import { motion } from "framer-motion";
import {
ResponsiveContainer,
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
CartesianGrid,
Legend,
} from "recharts";

const SpendingChart = () => {
const data = [
{ month: "Jan", income: 6000, expense: 2200 },
{ month: "Feb", income: 7200, expense: 2800 },
{ month: "Mar", income: 6800, expense: 2400 },
{ month: "Apr", income: 8000, expense: 3200 },
{ month: "May", income: 8500, expense: 2600 },
{ month: "Jun", income: 9000, expense: 3500 },
];

const averageIncome = Math.round(
data.reduce((sum, item) => sum + item.income, 0) / data.length
);

const averageExpense = Math.round(
data.reduce((sum, item) => sum + item.expense, 0) / data.length
);

return (
<motion.div
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, ease: "easeOut" }}
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
hover:border-cyan-400/20
hover:bg-white/[0.055]
sm:p-6
"
>
{/* Ambient Glow */}


  <div
    className="
      pointer-events-none
      absolute
      -right-24
      -top-24
      h-56
      w-56
      rounded-full
      bg-blue-500/10
      blur-[70px]
      transition-all
      duration-700
      group-hover:scale-125
      group-hover:bg-cyan-400/10
    "
  />

  <div
    className="
      pointer-events-none
      absolute
      -bottom-28
      -left-28
      h-56
      w-56
      rounded-full
      bg-cyan-500/[0.06]
      blur-[70px]
    "
  />

  {/* Top Highlight */}

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
      via-cyan-400/30
      to-transparent
    "
  />

  {/* Header */}

  <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
    <div className="min-w-0">
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/60" />

        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-400">
          Financial Analytics
        </p>
      </div>

      <h2 className="mt-2 text-xl font-bold tracking-tight text-white sm:text-2xl">
        Spending Analytics
      </h2>

      <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
        Track your income and expenses over time.
      </p>
    </div>

    <div
      className="
        flex
        w-fit
        shrink-0
        items-center
        gap-2
        rounded-full
        border
        border-cyan-400/15
        bg-cyan-400/[0.07]
        px-3.5
        py-2
      "
    >
      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />

      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-cyan-300">
        2026
      </span>
    </div>
  </div>

  {/* Summary */}

  <div className="relative mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
    <div
      className="
        group/stat
        rounded-2xl
        border
        border-emerald-400/10
        bg-emerald-400/[0.045]
        p-4
        transition
        duration-300
        hover:border-emerald-400/20
        hover:bg-emerald-400/[0.07]
      "
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50" />

          <span className="text-[11px] font-medium text-slate-400">
            Average Income
          </span>
        </div>

        <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-400">
          Income
        </span>
      </div>

      <p className="mt-3 text-xl font-bold tracking-tight text-white">
        ₹{averageIncome.toLocaleString("en-IN")}
      </p>
    </div>

    <div
      className="
        group/stat
        rounded-2xl
        border
        border-red-400/10
        bg-red-400/[0.045]
        p-4
        transition
        duration-300
        hover:border-red-400/20
        hover:bg-red-400/[0.07]
      "
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-red-400 shadow-lg shadow-red-400/50" />

          <span className="text-[11px] font-medium text-slate-400">
            Average Expense
          </span>
        </div>

        <span className="text-[9px] font-bold uppercase tracking-wider text-red-400">
          Expense
        </span>
      </div>

      <p className="mt-3 text-xl font-bold tracking-tight text-white">
        ₹{averageExpense.toLocaleString("en-IN")}
      </p>
    </div>
  </div>

  {/* Chart */}

  <div className="relative mt-7 h-[280px] w-full sm:h-[320px]">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        barGap={7}
        barCategoryGap="22%"
        margin={{
          top: 10,
          right: 4,
          left: -18,
          bottom: 10,
        }}
      >
        <CartesianGrid
          strokeDasharray="4 5"
          stroke="rgba(255,255,255,0.06)"
          vertical={false}
        />

        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          tick={{
            fill: "#64748b",
            fontSize: 11,
            fontWeight: 500,
          }}
          dy={8}
        />

        <YAxis
          axisLine={false}
          tickLine={false}
          width={48}
          tick={{
            fill: "#64748b",
            fontSize: 10,
          }}
          tickFormatter={(value) => {
            if (value >= 1000) {
              return `₹${value / 1000}k`;
            }

            return `₹${value}`;
          }}
        />

        <Tooltip
          cursor={{
            fill: "rgba(255,255,255,0.025)",
          }}
          contentStyle={{
            background: "rgba(2, 6, 23, 0.96)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "16px",
            color: "#fff",
            boxShadow: "0 20px 50px rgba(0,0,0,0.45)",
            padding: "12px 14px",
          }}
          labelStyle={{
            color: "#22d3ee",
            fontWeight: 700,
            marginBottom: "8px",
          }}
          itemStyle={{
            color: "#e2e8f0",
            fontSize: "12px",
          }}
          formatter={(value, name) => [
            `₹${Number(value).toLocaleString("en-IN")}`,
            name,
          ]}
        />

        <Legend
          verticalAlign="bottom"
          height={32}
          iconType="circle"
          iconSize={7}
          wrapperStyle={{
            paddingTop: "16px",
            fontSize: "11px",
            color: "#94a3b8",
          }}
        />

        <Bar
          dataKey="income"
          name="Income"
          fill="#22c55e"
          radius={[7, 7, 2, 2]}
          animationDuration={1200}
          maxBarSize={30}
        />

        <Bar
          dataKey="expense"
          name="Expense"
          fill="#ef4444"
          radius={[7, 7, 2, 2]}
          animationDuration={1200}
          maxBarSize={30}
        />
      </BarChart>
    </ResponsiveContainer>
  </div>

  {/* AI Insight */}

  <motion.div
    whileHover={{ y: -2 }}
    className="
      relative
      mt-5
      overflow-hidden
      rounded-2xl
      border
      border-cyan-400/15
      bg-gradient-to-br
      from-blue-500/[0.09]
      via-cyan-500/[0.04]
      to-transparent
      p-4
      transition-all
      duration-300
      hover:border-cyan-400/25
    "
  >
    <div
      className="
        pointer-events-none
        absolute
        -right-10
        -top-10
        h-24
        w-24
        rounded-full
        bg-cyan-400/10
        blur-3xl
      "
    />

    <div className="relative flex items-center gap-2.5">
      <div
        className="
          flex
          h-8
          w-8
          shrink-0
          items-center
          justify-center
          rounded-xl
          border
          border-cyan-400/15
          bg-cyan-400/10
        "
      >
        <span className="text-sm">🤖</span>
      </div>

      <div>
        <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-cyan-400">
          Smart Intelligence
        </p>

        <p className="mt-0.5 text-sm font-semibold text-white">
          AI Financial Insight
        </p>
      </div>
    </div>

    <p className="relative mt-3 text-xs leading-6 text-slate-400 sm:text-sm">
      Your income is trending upward while expenses remain controlled.
      Maintaining your current spending habits could improve your monthly
      savings.
    </p>
  </motion.div>
</motion.div>


);
};

export default SpendingChart;
