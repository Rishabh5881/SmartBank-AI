import { motion } from "framer-motion";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from "recharts";



const SpendingChart = () => {

  const data = [

    {
      month: "Jan",
      income: 6000,
      expense: 2200
    },

    {
      month: "Feb",
      income: 7200,
      expense: 2800
    },

    {
      month: "Mar",
      income: 6800,
      expense: 2400
    },

    {
      month: "Apr",
      income: 8000,
      expense: 3200
    },

    {
      month: "May",
      income: 8500,
      expense: 2600
    },

    {
      month: "Jun",
      income: 9000,
      expense: 3500
    }

  ];



  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 30
      }}

      animate={{
        opacity: 1,
        y: 0
      }}

      transition={{
        duration: 0.6
      }}

      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-white/[0.05]
        p-6
        text-white
        shadow-xl
        shadow-black/10
        backdrop-blur-xl
        transition-all
        duration-300
        hover:border-cyan-400/20
      "

    >

      {/* Background Glow */}

      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-48
          w-48
          rounded-full
          bg-blue-500/10
          blur-3xl
          transition
          duration-500
          group-hover:scale-125
        "
      />



      {/* Header */}

      <div
        className="
          relative
          flex
          items-start
          justify-between
          gap-4
        "
      >

        <div>

          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.18em]
              text-cyan-400
            "
          >
            Financial Analytics
          </p>


          <h2
            className="
              mt-2
              text-2xl
              font-bold
              tracking-tight
              text-white
            "
          >
            Spending Analytics
          </h2>


          <p
            className="
              mt-1
              text-sm
              text-slate-400
            "
          >
            Income vs Expense analysis
          </p>

        </div>



        <div
          className="
            shrink-0
            rounded-full
            border
            border-cyan-400/20
            bg-cyan-400/10
            px-4
            py-2
            text-xs
            font-semibold
            text-cyan-400
          "
        >
          2026
        </div>

      </div>



      {/* Chart */}

      <div
        className="
          relative
          mt-8
          h-[320px]
          w-full
        "
      >

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <BarChart
            data={data}
            barGap={10}
            margin={{
              top: 10,
              right: 5,
              left: -15,
              bottom: 5
            }}
          >

            <CartesianGrid
              strokeDasharray="4 4"
              stroke="rgba(255,255,255,0.08)"
              vertical={false}
            />


            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#94a3b8",
                fontSize: 12
              }}
            />


            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#94a3b8",
                fontSize: 12
              }}
            />


            <Tooltip
              cursor={{
                fill: "rgba(255,255,255,0.03)"
              }}

              contentStyle={{
                background: "#020617",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "16px",
                color: "#fff",
                boxShadow: "0 20px 40px rgba(0,0,0,0.35)"
              }}

              labelStyle={{
                color: "#22d3ee",
                fontWeight: 600,
                marginBottom: "6px"
              }}

              itemStyle={{
                color: "#e2e8f0"
              }}
            />


            <Legend
              verticalAlign="bottom"
              height={35}
              iconType="circle"
              wrapperStyle={{
                paddingTop: "18px",
                fontSize: "12px",
                color: "#94a3b8"
              }}
            />


            <Bar
              dataKey="income"
              name="Income"
              fill="#22c55e"
              radius={[8, 8, 0, 0]}
              animationDuration={1200}
            />


            <Bar
              dataKey="expense"
              name="Expense"
              fill="#ef4444"
              radius={[8, 8, 0, 0]}
              animationDuration={1200}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>



      {/* AI Insight */}

      <div
        className="
          relative
          mt-5
          overflow-hidden
          rounded-2xl
          border
          border-blue-500/20
          bg-gradient-to-br
          from-blue-500/10
          to-cyan-500/5
          p-5
        "
      >

        <div
          className="
            flex
            items-center
            gap-2
          "
        >

          <span
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-xl
              bg-cyan-400/10
              text-sm
            "
          >
            🤖
          </span>


          <span
            className="
              text-sm
              font-semibold
              text-cyan-400
            "
          >
            AI Insight
          </span>

        </div>


        <p
          className="
            mt-3
            text-sm
            leading-6
            text-slate-300
          "
        >
          Your income increased by 15%. Maintaining current
          spending habits can improve your monthly savings.
        </p>

      </div>

    </motion.div>

  );

};


export default SpendingChart;