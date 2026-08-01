import { motion } from "framer-motion";

import {
  BarChart3,
  TrendingUp,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  CalendarDays,
  Sparkles,
  Activity
} from "lucide-react";

import Reveal from "../common/Reveal";

const weeklySpending = [
  { day: "Mon", value: 45 },
  { day: "Tue", value: 65 },
  { day: "Wed", value: 38 },
  { day: "Thu", value: 78 },
  { day: "Fri", value: 58 },
  { day: "Sat", value: 88 },
  { day: "Sun", value: 52 }
];

const Analytics = () => {
  return (
    <Reveal>
      <section
        id="analytics"
        className="
          relative
          scroll-mt-24
          overflow-hidden
          bg-slate-950
          py-28
        "
      >
        {/* ========================================= */}
        {/* BACKGROUND GLOWS */}
        {/* ========================================= */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-0
            h-[600px]
            w-[800px]
            -translate-x-1/2
            rounded-full
            bg-blue-600/10
            blur-[160px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            bottom-0
            right-0
            h-[400px]
            w-[400px]
            rounded-full
            bg-cyan-500/10
            blur-[140px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            left-0
            top-1/2
            h-[300px]
            w-[300px]
            -translate-y-1/2
            rounded-full
            bg-blue-500/5
            blur-[120px]
          "
        />

        {/* ========================================= */}
        {/* CONTAINER */}
        {/* ========================================= */}

        <div
          className="
            relative
            mx-auto
            max-w-[1440px]
            px-6
            sm:px-8
            lg:px-12
          "
        >
          {/* ========================================= */}
          {/* HEADING */}
          {/* ========================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 25
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true,
              amount: 0.2
            }}
            transition={{
              duration: 0.7
            }}
            className="mx-auto max-w-3xl text-center"
          >
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-blue-400/20
                bg-blue-500/10
                px-5
                py-2
                text-sm
                font-medium
                text-blue-400
                shadow-lg
                shadow-blue-500/5
              "
            >
              <BarChart3 size={17} />

              Smart Financial Analytics
            </div>

            <h2
              className="
                mt-7
                text-4xl
                font-extrabold
                tracking-tight
                text-white
                sm:text-5xl
                lg:text-6xl
              "
            >
              Understand your money.

              <br />

              <span
                className="
                  bg-gradient-to-r
                  from-blue-500
                  via-cyan-400
                  to-cyan-300
                  bg-clip-text
                  text-transparent
                "
              >
                Control your future.
              </span>
            </h2>

            <p
              className="
                mx-auto
                mt-6
                max-w-2xl
                text-lg
                leading-8
                text-slate-400
              "
            >
              Track your income, expenses and financial performance
              with powerful analytics designed to make every financial
              decision easier.
            </p>
          </motion.div>

          {/* ========================================= */}
          {/* MAIN ANALYTICS GRID */}
          {/* ========================================= */}

          <div
            className="
              mt-16
              grid
              gap-6
              lg:grid-cols-3
            "
          >
            {/* ========================================= */}
            {/* SPENDING OVERVIEW */}
            {/* ========================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: 30
              }}
              whileInView={{
                opacity: 1,
                y: 0
              }}
              viewport={{
                once: true,
                amount: 0.15
              }}
              transition={{
                duration: 0.6
              }}
              whileHover={{
                y: -4
              }}
              className="
                group
                relative
                overflow-hidden
                rounded-[28px]
                border
                border-white/10
                bg-white/[0.04]
                p-6
                shadow-2xl
                shadow-blue-500/5
                backdrop-blur-xl
                transition-all
                duration-300
                hover:border-blue-400/20
                lg:col-span-2
              "
            >
              {/* CARD GLOW */}

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
                  blur-[80px]
                  transition
                  duration-500
                  group-hover:bg-blue-500/20
                "
              />

              {/* HEADER */}

              <div
                className="
                  relative
                  flex
                  items-start
                  justify-between
                "
              >
                <div>
                  <div className="flex items-center gap-3">
                    <div
                      className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-blue-400/10
                        bg-blue-500/10
                      "
                    >
                      <BarChart3
                        size={21}
                        className="text-blue-400"
                      />
                    </div>

                    <div>
                      <p
                        className="
                          text-sm
                          font-semibold
                          text-white
                        "
                      >
                        Spending Overview
                      </p>

                      <p
                        className="
                          mt-0.5
                          text-xs
                          text-slate-500
                        "
                      >
                        Monthly financial activity
                      </p>
                    </div>
                  </div>

                  <div className="mt-7">
                    <p className="text-sm text-slate-500">
                      Total Spending
                    </p>

                    <h3
                      className="
                        mt-1
                        text-4xl
                        font-bold
                        tracking-tight
                        text-white
                      "
                    >
                      $3,200
                    </h3>

                    <div
                      className="
                        mt-2
                        flex
                        items-center
                        gap-1.5
                        text-xs
                        font-medium
                        text-green-400
                      "
                    >
                      <TrendingUp size={14} />

                      8.4% lower than last month
                    </div>
                  </div>
                </div>

                <div
                  className="
                    hidden
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-white/10
                    bg-white/5
                    px-3
                    py-2
                    text-xs
                    text-slate-400
                    sm:flex
                  "
                >
                  <CalendarDays size={14} />

                  This Month
                </div>
              </div>

              {/* CHART */}

              <div className="relative mt-10">
                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    flex
                    flex-col
                    justify-between
                  "
                >
                  <div className="border-t border-white/5" />
                  <div className="border-t border-white/5" />
                  <div className="border-t border-white/5" />
                  <div className="border-t border-white/5" />
                </div>

                <div
                  className="
                    relative
                    flex
                    h-52
                    items-end
                    gap-3
                    sm:gap-5
                  "
                >
                  {weeklySpending.map((item, index) => (
                    <div
                      key={item.day}
                      className="
                        flex
                        h-full
                        flex-1
                        flex-col
                        items-center
                        justify-end
                        gap-3
                      "
                    >
                      <div
                        className="
                          relative
                          flex
                          h-full
                          w-full
                          items-end
                        "
                      >
                        <motion.div
                          initial={{
                            height: 0
                          }}
                          whileInView={{
                            height: `${item.value}%`
                          }}
                          viewport={{
                            once: true
                          }}
                          transition={{
                            duration: 0.8,
                            delay: index * 0.08,
                            ease: [0.22, 1, 0.36, 1]
                          }}
                          className="
                            relative
                            w-full
                            overflow-hidden
                            rounded-t-xl
                            bg-gradient-to-t
                            from-blue-700
                            via-blue-500
                            to-cyan-400
                            opacity-75
                            transition-all
                            duration-300
                            hover:opacity-100
                          "
                        >
                          <div
                            className="
                              absolute
                              inset-x-0
                              top-0
                              h-px
                              bg-white/40
                            "
                          />
                        </motion.div>
                      </div>

                      <span
                        className="
                          text-[10px]
                          font-medium
                          text-slate-500
                        "
                      >
                        {item.day}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ========================================= */}
            {/* FINANCIAL HEALTH */}
            {/* ========================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: 30
              }}
              whileInView={{
                opacity: 1,
                y: 0
              }}
              viewport={{
                once: true,
                amount: 0.15
              }}
              transition={{
                duration: 0.6,
                delay: 0.1
              }}
              whileHover={{
                y: -4
              }}
              className="
                group
                relative
                overflow-hidden
                rounded-[28px]
                border
                border-white/10
                bg-gradient-to-br
                from-blue-500/10
                via-white/[0.04]
                to-cyan-500/5
                p-6
                shadow-2xl
                shadow-cyan-500/5
                transition-all
                duration-300
                hover:border-cyan-400/20
              "
            >
              <div
                className="
                  pointer-events-none
                  absolute
                  -right-16
                  -top-16
                  h-40
                  w-40
                  rounded-full
                  bg-cyan-400/10
                  blur-3xl
                "
              />

              <div className="relative">
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-xl
                      bg-green-500/10
                    "
                  >
                    <TrendingUp
                      size={21}
                      className="text-green-400"
                    />
                  </div>

                  <div>
                    <p
                      className="
                        text-sm
                        font-semibold
                        text-white
                      "
                    >
                      Financial Health
                    </p>

                    <p className="mt-0.5 text-xs text-slate-500">
                      Overall score
                    </p>
                  </div>
                </div>

                {/* SCORE */}

                <div className="mt-10 flex justify-center">
                  <div
                    className="
                      relative
                      flex
                      h-44
                      w-44
                      items-center
                      justify-center
                      rounded-full
                      border-[12px]
                      border-green-400/10
                      bg-green-400/5
                      shadow-xl
                      shadow-green-500/10
                    "
                  >
                    <div
                      className="
                        absolute
                        inset-[-12px]
                        rounded-full
                        border-[12px]
                        border-transparent
                        border-t-green-400
                        border-r-green-400
                        rotate-[35deg]
                      "
                    />

                    <div className="text-center">
                      <h3
                        className="
                          text-4xl
                          font-bold
                          text-white
                        "
                      >
                        86
                      </h3>

                      <p
                        className="
                          mt-1
                          text-xs
                          font-medium
                          text-green-400
                        "
                      >
                        Excellent
                      </p>
                    </div>
                  </div>
                </div>

                {/* SAVING PROGRESS */}

                <div
                  className="
                    mt-8
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/5
                    p-4
                  "
                >
                  <div className="flex justify-between">
                    <span className="text-xs text-slate-500">
                      Saving progress
                    </span>

                    <span
                      className="
                        text-xs
                        font-medium
                        text-cyan-400
                      "
                    >
                      72%
                    </span>
                  </div>

                  <div
                    className="
                      mt-3
                      h-2
                      overflow-hidden
                      rounded-full
                      bg-white/10
                    "
                  >
                    <motion.div
                      initial={{
                        width: 0
                      }}
                      whileInView={{
                        width: "72%"
                      }}
                      viewport={{
                        once: true
                      }}
                      transition={{
                        duration: 1
                      }}
                      className="
                        h-full
                        rounded-full
                        bg-gradient-to-r
                        from-blue-600
                        to-cyan-400
                      "
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ========================================= */}
            {/* INCOME */}
            {/* ========================================= */}

            <motion.div
              whileHover={{
                y: -4
              }}
              className="
                group
                rounded-[28px]
                border
                border-white/10
                bg-white/[0.04]
                p-6
                backdrop-blur-xl
                transition-all
                duration-300
                hover:border-green-400/20
                hover:bg-white/[0.06]
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
                    bg-green-500/10
                  "
                >
                  <ArrowUpRight
                    size={21}
                    className="text-green-400"
                  />
                </div>

                <span
                  className="
                    rounded-full
                    bg-green-400/10
                    px-2.5
                    py-1
                    text-[10px]
                    font-medium
                    text-green-400
                  "
                >
                  +8.4%
                </span>
              </div>

              <p
                className="
                  mt-6
                  text-sm
                  text-slate-500
                "
              >
                Monthly Income
              </p>

              <h3
                className="
                  mt-1
                  text-3xl
                  font-bold
                  text-white
                "
              >
                $8,500
              </h3>

              <div className="mt-4 flex items-center gap-2">
                <div
                  className="
                    h-1.5
                    flex-1
                    overflow-hidden
                    rounded-full
                    bg-white/10
                  "
                >
                  <div
                    className="
                      h-full
                      w-[84%]
                      rounded-full
                      bg-green-400/70
                    "
                  />
                </div>

                <span className="text-[10px] text-slate-500">
                  Strong
                </span>
              </div>
            </motion.div>

            {/* ========================================= */}
            {/* EXPENSES */}
            {/* ========================================= */}

            <motion.div
              whileHover={{
                y: -4
              }}
              className="
                group
                rounded-[28px]
                border
                border-white/10
                bg-white/[0.04]
                p-6
                backdrop-blur-xl
                transition-all
                duration-300
                hover:border-red-400/20
                hover:bg-white/[0.06]
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
                    bg-red-500/10
                  "
                >
                  <ArrowDownRight
                    size={21}
                    className="text-red-400"
                  />
                </div>

                <span
                  className="
                    rounded-full
                    bg-green-400/10
                    px-2.5
                    py-1
                    text-[10px]
                    font-medium
                    text-green-400
                  "
                >
                  -4.1%
                </span>
              </div>

              <p
                className="
                  mt-6
                  text-sm
                  text-slate-500
                "
              >
                Monthly Expenses
              </p>

              <h3
                className="
                  mt-1
                  text-3xl
                  font-bold
                  text-white
                "
              >
                $3,200
              </h3>

              <div className="mt-4 flex items-center gap-2">
                <div
                  className="
                    h-1.5
                    flex-1
                    overflow-hidden
                    rounded-full
                    bg-white/10
                  "
                >
                  <div
                    className="
                      h-full
                      w-[38%]
                      rounded-full
                      bg-gradient-to-r
                      from-red-400
                      to-orange-400
                    "
                  />
                </div>

                <span className="text-[10px] text-green-400">
                  Healthy
                </span>
              </div>
            </motion.div>

            {/* ========================================= */}
            {/* SAVINGS */}
            {/* ========================================= */}

            <motion.div
              whileHover={{
                y: -4
              }}
              className="
                group
                relative
                overflow-hidden
                rounded-[28px]
                border
                border-blue-500/20
                bg-gradient-to-br
                from-blue-500/10
                via-blue-500/5
                to-cyan-500/5
                p-6
                transition-all
                duration-300
                hover:border-cyan-400/30
              "
            >
              <div
                className="
                  pointer-events-none
                  absolute
                  -bottom-12
                  -right-12
                  h-32
                  w-32
                  rounded-full
                  bg-cyan-400/10
                  blur-3xl
                "
              />

              <div
                className="
                  relative
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-cyan-400/10
                "
              >
                <Wallet
                  size={21}
                  className="text-cyan-400"
                />
              </div>

              <p
                className="
                  relative
                  mt-6
                  text-sm
                  text-slate-500
                "
              >
                Total Savings
              </p>

              <h3
                className="
                  relative
                  mt-1
                  text-3xl
                  font-bold
                  text-white
                "
              >
                $12,450
              </h3>

              <div
                className="
                  relative
                  mt-3
                  flex
                  items-center
                  gap-1.5
                  text-xs
                  font-medium
                  text-cyan-400
                "
              >
                <TrendingUp size={13} />

                Growing steadily
              </div>
            </motion.div>
          </div>

          {/* ========================================= */}
          {/* BOTTOM AI INSIGHT */}
          {/* ========================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.6
            }}
            className="
              relative
              mt-6
              overflow-hidden
              rounded-[28px]
              border
              border-cyan-400/10
              bg-gradient-to-r
              from-blue-500/10
              via-blue-500/5
              to-cyan-400/5
              p-6
            "
          >
            <div
              className="
                pointer-events-none
                absolute
                right-0
                top-0
                h-32
                w-32
                rounded-full
                bg-cyan-400/10
                blur-3xl
              "
            />

            <div
              className="
                relative
                flex
                flex-col
                gap-5
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              <div className="flex items-center gap-4">
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
                    bg-cyan-400/10
                  "
                >
                  <Sparkles
                    size={22}
                    className="text-cyan-400"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <p
                      className="
                        text-sm
                        font-semibold
                        text-white
                      "
                    >
                      AI Financial Insight
                    </p>

                    <span
                      className="
                        rounded-full
                        bg-green-400/10
                        px-2
                        py-0.5
                        text-[9px]
                        font-medium
                        text-green-400
                      "
                    >
                      LIVE
                    </span>
                  </div>

                  <p
                    className="
                      mt-1
                      text-xs
                      leading-5
                      text-slate-500
                    "
                  >
                    You saved more and reduced your monthly spending.
                    Your financial performance is improving.
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-white/10
                  bg-white/5
                  px-5
                  py-3
                  text-sm
                  font-medium
                  text-slate-200
                  transition-all
                  duration-300
                  hover:border-cyan-400/30
                  hover:bg-cyan-400/10
                  hover:text-white
                "
              >
                <Activity size={15} />

                View Analytics

                <ArrowUpRight size={15} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </Reveal>
  );
};

export default Analytics;