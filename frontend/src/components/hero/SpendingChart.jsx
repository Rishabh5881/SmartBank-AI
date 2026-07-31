import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  AreaChart
} from "recharts";


const SpendingChart = () => {


  const data = [
    {
      month: "Jan",
      amount: 400
    },
    {
      month: "Feb",
      amount: 700
    },
    {
      month: "Mar",
      amount: 500
    },
    {
      month: "Apr",
      amount: 900
    },
    {
      month: "May",
      amount: 650
    },
    {
      month: "Jun",
      amount: 1000
    }
  ];


  return (

    <div className="h-full w-full">

      <ResponsiveContainer
        width="100%"
        height="100%"
      >

        <AreaChart
          data={data}

          margin={{
            top: 12,
            right: 8,
            left: -8,
            bottom: 0
          }}
        >

          {/* GRID */}

          <CartesianGrid
            strokeDasharray="4 5"
            stroke="rgba(148,163,184,0.08)"
            vertical={false}
          />


          {/* X AXIS */}

          <XAxis
            dataKey="month"

            tick={{
              fill: "#64748b",
              fontSize: 10,
              fontWeight: 500
            }}

            axisLine={{
              stroke: "rgba(148,163,184,0.10)"
            }}

            tickLine={false}

            dy={6}
          />


          {/* Y AXIS */}

          <YAxis
            width={42}

            domain={[
              0,
              1000
            ]}

            ticks={[
              0,
              250,
              500,
              750,
              1000
            ]}

            tick={{
              fill: "#64748b",
              fontSize: 9
            }}

            axisLine={false}

            tickLine={false}

            tickFormatter={(value) =>
              `$${value}`
            }
          />


          {/* TOOLTIP */}

          <Tooltip

            cursor={{
              stroke: "rgba(34,211,238,0.25)",
              strokeWidth: 1
            }}

            contentStyle={{
              background: "rgba(2,6,23,0.96)",
              border:
                "1px solid rgba(255,255,255,0.10)",
              borderRadius: "14px",
              padding: "10px 12px",
              boxShadow:
                "0 15px 40px rgba(0,0,0,0.45)",
              backdropFilter: "blur(12px)"
            }}

            labelStyle={{
              color: "#94a3b8",
              fontSize: "11px",
              fontWeight: 500,
              marginBottom: "5px"
            }}

            itemStyle={{
              color: "#22d3ee",
              fontSize: "13px",
              fontWeight: 600
            }}

            formatter={(value) => [
              `$${value}`,
              "Spending"
            ]}
          />


          {/* AREA */}

          <defs>

            <linearGradient
              id="spendingGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >

              <stop
                offset="0%"
                stopColor="#22d3ee"
                stopOpacity={0.25}
              />

              <stop
                offset="100%"
                stopColor="#22d3ee"
                stopOpacity={0}
              />

            </linearGradient>

          </defs>


          <Area

            type="monotone"

            dataKey="amount"

            stroke="#22d3ee"

            strokeWidth={3}

            fill="url(#spendingGradient)"

            fillOpacity={1}

            activeDot={{
              r: 6,
              fill: "#22d3ee",
              stroke: "#020617",
              strokeWidth: 3
            }}

          />

        </AreaChart>

      </ResponsiveContainer>

    </div>

  );

};


export default SpendingChart;