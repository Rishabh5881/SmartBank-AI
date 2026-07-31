import { motion } from "framer-motion";

import {
  CreditCard,
  TrendingUp,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
  Activity
} from "lucide-react";

import SpendingChart from "./SpendingChart";


const DashboardPreview = () => {

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 20
      }}

      animate={{
        opacity: 1,
        y: 0
      }}

      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }}

      className="
        group
        relative
        w-full
        overflow-hidden
        rounded-[32px]
        border
        border-white/10
        bg-slate-900/90
        p-5
        shadow-2xl
        shadow-blue-500/10
        backdrop-blur-2xl
        sm:p-6
      "
    >

      {/* ================================= */}
      {/* AMBIENT GLOW */}
      {/* ================================= */}

      <div
        className="
          pointer-events-none
          absolute
          -right-32
          -top-32
          h-80
          w-80
          rounded-full
          bg-blue-500/20
          blur-[100px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-40
          -left-40
          h-80
          w-80
          rounded-full
          bg-cyan-500/10
          blur-[110px]
        "
      />



      {/* ================================= */}
      {/* HEADER / BALANCE */}
      {/* ================================= */}

      <div
        className="
          relative
          flex
          items-center
          justify-between
        "
      >

        <div>

          <div
            className="
              flex
              items-center
              gap-2
            "
          >

            <p className="text-sm text-slate-400">
              Total Balance
            </p>

            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-green-400
                shadow-lg
                shadow-green-400/50
              "
            />

          </div>


          <h2
            className="
              mt-1
              text-3xl
              font-bold
              tracking-tight
              text-white
              sm:text-4xl
            "
          >
            $24,580
          </h2>


          <div
            className="
              mt-2
              flex
              items-center
              gap-1.5
              text-xs
              text-green-400
            "
          >

            <TrendingUp size={14} />

            <span>
              +12.5% this month
            </span>

          </div>

        </div>


        <div
          className="
            rounded-2xl
            border
            border-blue-400/10
            bg-blue-500/10
            p-3
            shadow-lg
            shadow-blue-500/5
          "
        >

          <CreditCard
            size={27}
            className="text-cyan-400"
          />

        </div>

      </div>



      {/* ================================= */}
      {/* PREMIUM BANK CARD */}
      {/* ================================= */}

      <motion.div

        whileHover={{
          y: -3
        }}

        className="
          relative
          mt-5
          overflow-hidden
          rounded-3xl
          bg-gradient-to-br
          from-blue-700
          via-blue-600
          to-cyan-400
          p-5
          text-white
          shadow-xl
          shadow-blue-500/25
          transition
        "
      >

        {/* Card Glow */}

        <div
          className="
            pointer-events-none
            absolute
            -right-16
            -top-20
            h-48
            w-48
            rounded-full
            bg-white/20
            blur-3xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            bottom-0
            left-1/3
            h-24
            w-40
            rounded-full
            bg-cyan-300/20
            blur-2xl
          "
        />


        <div
          className="
            relative
            flex
            items-center
            justify-between
          "
        >

          <div>

            <p
              className="
                text-[10px]
                uppercase
                tracking-[0.2em]
                text-white/60
              "
            >
              Digital Banking
            </p>

            <span
              className="
                mt-1
                block
                text-sm
                font-semibold
                tracking-wide
              "
            >
              SmartBank AI
            </span>

          </div>


          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              border
              border-white/20
              bg-white/10
              text-lg
              backdrop-blur-sm
            "
          >
            💳
          </div>

        </div>


        {/* Chip */}

        <div
          className="
            relative
            mt-7
            h-7
            w-10
            rounded-md
            border
            border-white/30
            bg-white/20
          "
        >

          <div className="mt-2 h-px bg-white/20" />

          <div className="mt-2 h-px bg-white/20" />

        </div>


        <h3
          className="
            relative
            mt-4
            text-lg
            font-medium
            tracking-[4px]
            sm:text-xl
          "
        >
          **** **** **** 4289
        </h3>


        <div
          className="
            relative
            mt-6
            flex
            items-end
            justify-between
            text-sm
          "
        >

          <div>

            <p
              className="
                text-[9px]
                uppercase
                tracking-wider
                text-white/50
              "
            >
              Card Holder
            </p>

            <span className="mt-1 block font-medium">
              Rishabh
            </span>

          </div>


          <div>

            <p
              className="
                text-[9px]
                uppercase
                tracking-wider
                text-white/50
              "
            >
              Expiry
            </p>

            <span className="mt-1 block font-medium">
              12/29
            </span>

          </div>


          <div
            className="
              text-xs
              font-semibold
              tracking-widest
              text-white/80
            "
          >
            VISA
          </div>

        </div>

      </motion.div>



      {/* ================================= */}
      {/* MINI STATS */}
      {/* ================================= */}

      <div
        className="
          mt-5
          grid
          grid-cols-2
          gap-4
        "
      >

        {/* Growth */}

        <motion.div

          whileHover={{
            y: -2
          }}

          className="
            rounded-2xl
            border
            border-white/10
            bg-white/[0.04]
            p-4
            transition
            hover:border-green-400/20
            hover:bg-white/[0.06]
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
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                bg-green-500/10
              "
            >

              <TrendingUp
                size={18}
                className="text-green-400"
              />

            </div>


            <span
              className="
                rounded-full
                bg-green-400/10
                px-2
                py-1
                text-[10px]
                font-medium
                text-green-400
              "
            >
              +12.5%
            </span>

          </div>


          <p
            className="
              mt-3
              text-xs
              text-slate-500
            "
          >
            Monthly Growth
          </p>


          <h3
            className="
              mt-1
              text-xl
              font-bold
              text-white
            "
          >
            +12.5%
          </h3>

        </motion.div>



        {/* Security */}

        <motion.div

          whileHover={{
            y: -2
          }}

          className="
            rounded-2xl
            border
            border-white/10
            bg-white/[0.04]
            p-4
            transition
            hover:border-cyan-400/20
            hover:bg-white/[0.06]
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
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                bg-cyan-500/10
              "
            >

              <ShieldCheck
                size={18}
                className="text-cyan-400"
              />

            </div>


            <span
              className="
                rounded-full
                bg-cyan-400/10
                px-2
                py-1
                text-[10px]
                font-medium
                text-cyan-400
              "
            >
              Secure
            </span>

          </div>


          <p
            className="
              mt-3
              text-xs
              text-slate-500
            "
          >
            Security Score
          </p>


          <h3
            className="
              mt-1
              text-xl
              font-bold
              text-white
            "
          >
            99.9%
          </h3>

        </motion.div>

      </div>



      {/* ================================= */}
      {/* SPENDING CHART */}
      {/* ================================= */}

      <div
        className="
          relative
          mt-5
          overflow-hidden
          rounded-2xl
          border
          border-white/10
          bg-black/20
          p-4
        "
      >

        <div
          className="
            absolute
            right-0
            top-0
            h-24
            w-24
            rounded-full
            bg-cyan-400/5
            blur-2xl
          "
        />


        <div
          className="
            relative
            mb-2
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
                gap-2
              "
            >

              <Activity
                size={15}
                className="text-cyan-400"
              />

              <p className="text-sm text-slate-400">
                Monthly Spending
              </p>

            </div>


            <p
              className="
                mt-1
                text-xl
                font-bold
                text-white
              "
            >
              $3,200
            </p>

          </div>


          <div
            className="
              flex
              items-center
              gap-1.5
              rounded-full
              border
              border-cyan-400/10
              bg-cyan-400/10
              px-3
              py-1.5
              text-[10px]
              font-medium
              text-cyan-400
            "
          >

            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-cyan-400
              "
            />

            Analytics

          </div>

        </div>


        {/* IMPORTANT: chart gets full available height */}

        <div
          className="
            relative
            h-44
            w-full
            min-w-0
          "
        >

          <SpendingChart />

        </div>

      </div>



      {/* ================================= */}
      {/* RECENT TRANSACTIONS */}
      {/* ================================= */}

      <div
        className="
          mt-5
          rounded-2xl
          border
          border-white/10
          bg-white/[0.04]
          p-4
        "
      >

        <div
          className="
            flex
            items-center
            justify-between
          "
        >

          <div>

            <p
              className="
                text-sm
                font-semibold
                text-white
              "
            >
              Recent Transactions
            </p>

            <p
              className="
                mt-0.5
                text-[11px]
                text-slate-500
              "
            >
              Latest account activity
            </p>

          </div>


          <button
            className="
              inline-flex
              items-center
              gap-1
              text-xs
              font-medium
              text-cyan-400
              transition
              hover:text-cyan-300
            "
          >

            View all

            <ArrowUpRight size={13} />

          </button>

        </div>



        <div className="mt-4 space-y-2.5">


          {/* Amazon */}

          <div
            className="
              flex
              items-center
              justify-between
              rounded-xl
              border
              border-white/5
              bg-white/[0.035]
              p-3
              transition
              hover:bg-white/[0.06]
            "
          >

            <div className="flex items-center gap-3">

              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  bg-red-500/10
                  text-sm
                  font-bold
                  text-red-400
                "
              >
                A
              </div>


              <div>

                <p
                  className="
                    text-sm
                    font-medium
                    text-white
                  "
                >
                  Amazon
                </p>

                <p
                  className="
                    text-[11px]
                    text-slate-500
                  "
                >
                  Shopping
                </p>

              </div>

            </div>


            <span
              className="
                text-sm
                font-semibold
                text-red-400
              "
            >
              -$120
            </span>

          </div>



          {/* Netflix */}

          <div
            className="
              flex
              items-center
              justify-between
              rounded-xl
              border
              border-white/5
              bg-white/[0.035]
              p-3
              transition
              hover:bg-white/[0.06]
            "
          >

            <div className="flex items-center gap-3">

              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  bg-red-500/10
                  text-sm
                  font-bold
                  text-red-400
                "
              >
                N
              </div>


              <div>

                <p
                  className="
                    text-sm
                    font-medium
                    text-white
                  "
                >
                  Netflix
                </p>

                <p
                  className="
                    text-[11px]
                    text-slate-500
                  "
                >
                  Subscription
                </p>

              </div>

            </div>


            <span
              className="
                text-sm
                font-semibold
                text-red-400
              "
            >
              -$20
            </span>

          </div>



          {/* Salary */}

          <div
            className="
              flex
              items-center
              justify-between
              rounded-xl
              border
              border-white/5
              bg-white/[0.035]
              p-3
              transition
              hover:bg-white/[0.06]
            "
          >

            <div className="flex items-center gap-3">

              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  bg-green-500/10
                  text-sm
                  font-bold
                  text-green-400
                "
              >
                $
              </div>


              <div>

                <p
                  className="
                    text-sm
                    font-medium
                    text-white
                  "
                >
                  Salary
                </p>

                <p
                  className="
                    text-[11px]
                    text-slate-500
                  "
                >
                  Income
                </p>

              </div>

            </div>


            <span
              className="
                text-sm
                font-semibold
                text-green-400
              "
            >
              +$2,500
            </span>

          </div>


        </div>

      </div>



      {/* ================================= */}
      {/* AI ASSISTANT */}
      {/* ================================= */}

      <motion.div

        whileHover={{
          y: -2
        }}

        className="
          relative
          mt-5
          overflow-hidden
          rounded-2xl
          border
          border-blue-500/20
          bg-gradient-to-br
          from-blue-500/10
          via-blue-500/5
          to-cyan-400/5
          p-4
        "
      >

        {/* AI Glow */}

        <div
          className="
            pointer-events-none
            absolute
            -right-10
            -top-10
            h-28
            w-28
            rounded-full
            bg-blue-500/20
            blur-3xl
          "
        />


        <div
          className="
            relative
            flex
            items-center
            gap-3
          "
        >

          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              border-blue-400/10
              bg-blue-500/10
            "
          >

            <Sparkles
              size={19}
              className="text-cyan-400"
            />

          </div>


          <div className="min-w-0">

            <div
              className="
                flex
                items-center
                gap-2
              "
            >

              <p
                className="
                  text-sm
                  font-semibold
                  text-white
                "
              >
                AI Financial Assistant
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
                mt-0.5
                text-[11px]
                text-slate-500
              "
            >
              Personalized recommendation
            </p>

          </div>

        </div>


        <p
          className="
            relative
            mt-3
            text-sm
            leading-6
            text-slate-300
          "
        >
          Your spending is healthy.
          AI suggests saving 15% more this month.
        </p>


        <div
          className="
            relative
            mt-3
            flex
            items-center
            gap-2
            text-[11px]
            font-medium
            text-cyan-400
          "
        >

          <span
            className="
              h-1.5
              w-1.5
              rounded-full
              bg-cyan-400
            "
          />

          Smart insight generated automatically

        </div>

      </motion.div>


    </motion.div>

  );

};


export default DashboardPreview;