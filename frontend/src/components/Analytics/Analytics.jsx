import {
  BarChart3,
  TrendingUp,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  CalendarDays
} from "lucide-react";

import Reveal from "../common/Reveal";

const Analytics = () => {
  return (
    <Reveal>
      <section
        id="analytics"
        className="
          relative
          overflow-hidden
          bg-slate-950
          py-28
          scroll-mt-24
        "
      >

        {/* BACKGROUND GLOW */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-20
            h-[500px]
            w-[700px]
            -translate-x-1/2
            rounded-full
            bg-blue-600/10
            blur-[150px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            bottom-0
            right-0
            h-[350px]
            w-[350px]
            rounded-full
            bg-cyan-500/10
            blur-[130px]
          "
        />


        {/* CONTAINER */}

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

          {/* ========================= */}
          {/* HEADING */}
          {/* ========================= */}

          <div className="mx-auto max-w-3xl text-center">

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

              Track your income, expenses and financial
              performance with powerful analytics designed
              to make every financial decision easier.

            </p>

          </div>


          {/* ========================= */}
          {/* ANALYTICS DASHBOARD */}
          {/* ========================= */}

          <div
            className="
              mt-16
              grid
              gap-6
              lg:grid-cols-3
            "
          >

            {/* ========================= */}
            {/* SPENDING OVERVIEW */}
            {/* ========================= */}

            <div
              className="
                relative
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-white/[0.04]
                p-6
                backdrop-blur-xl
                lg:col-span-2
              "
            >

              <div
                className="
                  absolute
                  right-0
                  top-0
                  h-40
                  w-40
                  rounded-full
                  bg-blue-500/10
                  blur-[80px]
                "
              />


              <div
                className="
                  relative
                  flex
                  items-start
                  justify-between
                "
              >

                <div>

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >

                    <div
                      className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-xl
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

              <div className="mt-10">

                <div
                  className="
                    flex
                    h-52
                    items-end
                    gap-3
                    sm:gap-5
                  "
                >

                  {[
                    { day: "Mon", value: "45%" },
                    { day: "Tue", value: "65%" },
                    { day: "Wed", value: "38%" },
                    { day: "Thu", value: "78%" },
                    { day: "Fri", value: "58%" },
                    { day: "Sat", value: "88%" },
                    { day: "Sun", value: "52%" }
                  ].map((item, index) => (

                    <div
                      key={index}
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
                          w-full
                          items-end
                        "
                        style={{
                          height: item.value
                        }}
                      >

                        <div
                          className="
                            h-full
                            w-full
                            rounded-t-xl
                            bg-gradient-to-t
                            from-blue-600
                            to-cyan-400
                            opacity-80
                            transition
                            duration-300
                            hover:opacity-100
                          "
                        />

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

            </div>


            {/* ========================= */}
            {/* FINANCIAL HEALTH */}
            {/* ========================= */}

            <div
              className="
                relative
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-gradient-to-br
                from-blue-500/10
                via-white/[0.04]
                to-cyan-500/5
                p-6
              "
            >

              <div
                className="
                  absolute
                  -right-10
                  -top-10
                  h-32
                  w-32
                  rounded-full
                  bg-cyan-400/10
                  blur-3xl
                "
              />


              <div className="relative">

                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >

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

                    <p className="text-sm font-semibold text-white">
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
                      flex
                      h-44
                      w-44
                      items-center
                      justify-center
                      rounded-full
                      border-[12px]
                      border-green-400/20
                      bg-green-400/5
                      shadow-xl
                      shadow-green-500/10
                    "
                  >

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

                    <span className="text-xs font-medium text-cyan-400">
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

                    <div
                      className="
                        h-full
                        w-[72%]
                        rounded-full
                        bg-gradient-to-r
                        from-blue-600
                        to-cyan-400
                      "
                    />

                  </div>

                </div>

              </div>

            </div>


            {/* ========================= */}
            {/* INCOME */}
            {/* ========================= */}

            <div
              className="
                rounded-3xl
                border
                border-white/10
                bg-white/[0.04]
                p-6
                backdrop-blur-xl
              "
            >

              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >

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


              <p
                className="
                  mt-2
                  text-xs
                  text-slate-500
                "
              >
                Compared with previous month
              </p>

            </div>


            {/* ========================= */}
            {/* EXPENSES */}
            {/* ========================= */}

            <div
              className="
                rounded-3xl
                border
                border-white/10
                bg-white/[0.04]
                p-6
                backdrop-blur-xl
              "
            >

              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >

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


              <p
                className="
                  mt-2
                  text-xs
                  text-slate-500
                "
              >
                Spending is under control
              </p>

            </div>


            {/* ========================= */}
            {/* SAVINGS */}
            {/* ========================= */}

            <div
              className="
                rounded-3xl
                border
                border-blue-500/20
                bg-gradient-to-br
                from-blue-500/10
                to-cyan-500/5
                p-6
              "
            >

              <div
                className="
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
                  mt-6
                  text-sm
                  text-slate-500
                "
              >
                Total Savings
              </p>


              <h3
                className="
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
                  mt-2
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

            </div>

          </div>


          {/* ========================= */}
          {/* BOTTOM INSIGHT */}
          {/* ========================= */}

          <div
            className="
              mt-6
              flex
              flex-col
              gap-4
              rounded-3xl
              border
              border-cyan-400/10
              bg-gradient-to-r
              from-blue-500/10
              to-cyan-400/5
              p-6
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
                  bg-cyan-400/10
                "
              >

                <BarChart3
                  size={22}
                  className="text-cyan-400"
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
                  Your financial performance is improving
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    leading-5
                    text-slate-500
                  "
                >
                  You saved more and reduced your monthly spending.
                </p>

              </div>

            </div>


            <button
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
                transition
                hover:border-cyan-400/30
                hover:bg-white/10
                hover:text-white
              "
            >

              View Analytics

              <ArrowUpRight size={15} />

            </button>

          </div>

        </div>

      </section>
    </Reveal>
  );
};

export default Analytics;