import { motion } from "framer-motion";

import {
  BrainCircuit,
  TrendingUp,
  Sparkles,
  Wallet,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Activity,
  CheckCircle2
} from "lucide-react";

import Reveal from "../common/Reveal";

const insights = [
  {
    icon: TrendingUp,
    title: "Spending Prediction",
    text:
      "AI analyzes your spending patterns and predicts upcoming monthly expenses.",
  },
  {
    icon: Wallet,
    title: "Smart Saving",
    text:
      "Get personalized saving suggestions based on your income and financial behavior.",
  },
  {
    icon: Sparkles,
    title: "AI Recommendations",
    text:
      "Receive intelligent recommendations that help you make better financial decisions.",
  },
];

const AISection = () => {
  return (
    <Reveal>
      <section
        id="ai"
        className="
          relative
          scroll-mt-24
          overflow-hidden
          bg-slate-950
          py-24
          sm:py-28
          lg:py-32
        "
      >
        {/* ===================================================== */}
        {/* PREMIUM BACKGROUND */}
        {/* ===================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[radial-gradient(circle_at_15%_20%,rgba(37,99,235,0.12),transparent_30%),radial-gradient(circle_at_85%_70%,rgba(6,182,212,0.10),transparent_30%)]
          "
        />

        {/* Blue Glow */}

        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.25, 0.4, 0.25],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            pointer-events-none
            absolute
            left-[-180px]
            top-24
            h-[520px]
            w-[520px]
            rounded-full
            bg-blue-600/15
            blur-[150px]
          "
        />

        {/* Cyan Glow */}

        <motion.div
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            pointer-events-none
            absolute
            bottom-[-180px]
            right-[-120px]
            h-[500px]
            w-[500px]
            rounded-full
            bg-cyan-500/10
            blur-[150px]
          "
        />

        {/* Subtle Grid */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-[0.025]
            [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)]
            [background-size:72px_72px]
          "
        />

        {/* ===================================================== */}
        {/* MAIN CONTAINER */}
        {/* ===================================================== */}

        <div
          className="
            relative
            z-10
            mx-auto
            max-w-[1500px]
            px-5
            sm:px-8
            lg:px-12
            xl:px-16
          "
        >
          {/* ===================================================== */}
          {/* SECTION HEADING */}
          {/* ===================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.7,
            }}
            className="
              mx-auto
              max-w-3xl
              text-center
            "
          >
            {/* Badge */}

            <div
              className="
                group
                inline-flex
                items-center
                gap-2.5
                rounded-full
                border
                border-cyan-400/20
                bg-cyan-400/[0.08]
                px-4
                py-2
                text-sm
                font-medium
                text-cyan-400
                shadow-lg
                shadow-cyan-500/5
                backdrop-blur-xl
              "
            >
              <span
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-full
                  bg-cyan-400/10
                "
              >
                <BrainCircuit
                  size={16}
                  className="transition group-hover:scale-110"
                />
              </span>

              AI Financial Intelligence

              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-cyan-400
                  shadow-lg
                  shadow-cyan-400/70
                "
              />
            </div>

            {/* Heading */}

            <h2
              className="
                mt-7
                text-4xl
                font-extrabold
                leading-[1.05]
                tracking-[-0.04em]
                text-white
                sm:text-5xl
                lg:text-6xl
              "
            >
              Your money.

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
                Understands you.
              </span>
            </h2>

            {/* Description */}

            <p
              className="
                mx-auto
                mt-6
                max-w-2xl
                text-base
                leading-7
                text-slate-400
                sm:text-lg
                sm:leading-8
              "
            >
              SmartBank AI transforms your financial data into meaningful
              insights, intelligent predictions and personalized
              recommendations.
            </p>
          </motion.div>

          {/* ===================================================== */}
          {/* MAIN AI AREA */}
          {/* ===================================================== */}

          <div
            className="
              mt-16
              grid
              items-center
              gap-10
              lg:grid-cols-[0.9fr_1.1fr]
              lg:gap-14
              xl:gap-20
            "
          >
            {/* ================================================= */}
            {/* LEFT FEATURES */}
            {/* ================================================= */}

            <div className="space-y-4">
              {insights.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    initial={{
                      opacity: 0,
                      x: -30,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.2,
                    }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.12,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{
                      y: -4,
                    }}
                    className="
                      group
                      relative
                      overflow-hidden
                      rounded-[26px]
                      border
                      border-white/10
                      bg-white/[0.035]
                      p-5
                      shadow-xl
                      shadow-black/10
                      backdrop-blur-xl
                      transition
                      duration-300
                      hover:border-blue-400/25
                      hover:bg-white/[0.055]
                      hover:shadow-blue-500/10
                      sm:p-6
                    "
                  >
                    {/* Hover Glow */}

                    <div
                      className="
                        pointer-events-none
                        absolute
                        -right-16
                        -top-16
                        h-32
                        w-32
                        rounded-full
                        bg-blue-500/10
                        blur-3xl
                        opacity-0
                        transition
                        duration-500
                        group-hover:opacity-100
                      "
                    />

                    <div className="relative flex gap-4 sm:gap-5">
                      {/* Icon */}

                      <div
                        className="
                          flex
                          h-13
                          w-13
                          shrink-0
                          items-center
                          justify-center
                          rounded-2xl
                          border
                          border-blue-400/10
                          bg-gradient-to-br
                          from-blue-500/15
                          to-cyan-400/10
                          text-cyan-400
                          shadow-lg
                          shadow-blue-500/5
                          transition
                          duration-300
                          group-hover:scale-105
                          group-hover:border-cyan-400/20
                        "
                      >
                        <Icon size={23} />
                      </div>

                      {/* Content */}

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3
                            className="
                              text-base
                              font-semibold
                              text-white
                              sm:text-lg
                            "
                          >
                            {item.title}
                          </h3>

                          <CheckCircle2
                            size={14}
                            className="
                              text-cyan-400/50
                              opacity-0
                              transition
                              group-hover:opacity-100
                            "
                          />
                        </div>

                        <p
                          className="
                            mt-2
                            text-sm
                            leading-6
                            text-slate-400
                          "
                        >
                          {item.text}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Accent */}

                    <div
                      className="
                        absolute
                        bottom-0
                        left-0
                        h-px
                        w-0
                        bg-gradient-to-r
                        from-blue-500
                        to-cyan-400
                        transition-all
                        duration-500
                        group-hover:w-full
                      "
                    />
                  </motion.div>
                );
              })}

              {/* AI Trust Strip */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.4,
                }}
                className="
                  mt-6
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-white/5
                  bg-white/[0.02]
                  px-4
                  py-3
                  text-xs
                  text-slate-500
                "
              >
                <Activity
                  size={15}
                  className="text-cyan-400"
                />

                AI continuously analyzes your financial activity
              </motion.div>
            </div>

            {/* ================================================= */}
            {/* RIGHT AI DASHBOARD */}
            {/* ================================================= */}

            <div className="relative">
              {/* Dashboard Glow */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-8
                  rounded-full
                  bg-blue-500/20
                  blur-[110px]
                "
              />

              {/* Dashboard */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 35,
                  scale: 0.97,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -4,
                }}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[32px]
                  border
                  border-white/10
                  bg-slate-900/90
                  p-5
                  shadow-2xl
                  shadow-blue-500/10
                  backdrop-blur-2xl
                  transition
                  duration-500
                  hover:border-blue-400/20
                  sm:p-7
                "
              >
                {/* Dashboard Ambient Glow */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    -right-24
                    -top-24
                    h-64
                    w-64
                    rounded-full
                    bg-blue-500/15
                    blur-[90px]
                  "
                />

                <div
                  className="
                    pointer-events-none
                    absolute
                    -bottom-24
                    -left-24
                    h-64
                    w-64
                    rounded-full
                    bg-cyan-500/10
                    blur-[90px]
                  "
                />

                {/* ================================================= */}
                {/* AI HEADER */}
                {/* ================================================= */}

                <div
                  className="
                    relative
                    flex
                    items-center
                    justify-between
                  "
                >
                  <div className="flex items-center gap-3.5">
                    {/* AI Icon */}

                    <motion.div
                      animate={{
                        boxShadow: [
                          "0 0 0 rgba(37,99,235,0)",
                          "0 0 30px rgba(37,99,235,0.25)",
                          "0 0 0 rgba(37,99,235,0)",
                        ],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-2xl
                        bg-gradient-to-br
                        from-blue-600
                        to-cyan-400
                      "
                    >
                      <BrainCircuit
                        size={24}
                        className="text-white"
                      />
                    </motion.div>

                    <div>
                      <p
                        className="
                          text-base
                          font-semibold
                          text-white
                          sm:text-lg
                        "
                      >
                        AI Assistant
                      </p>

                      <div
                        className="
                          mt-1
                          flex
                          items-center
                          gap-2
                        "
                      >
                        <motion.span
                          animate={{
                            opacity: [0.4, 1, 0.4],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                          className="
                            h-1.5
                            w-1.5
                            rounded-full
                            bg-green-400
                            shadow-lg
                            shadow-green-400/60
                          "
                        />

                        <span
                          className="
                            text-[11px]
                            font-medium
                            text-green-400
                          "
                        >
                          AI Monitoring Active
                        </span>
                      </div>
                    </div>
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
                      border-cyan-400/10
                      bg-cyan-400/5
                    "
                  >
                    <Sparkles
                      size={17}
                      className="text-cyan-400"
                    />
                  </div>
                </div>

                {/* ================================================= */}
                {/* PREDICTION CARD */}
                {/* ================================================= */}

                <motion.div
                  whileHover={{
                    scale: 1.01,
                  }}
                  className="
                    relative
                    mt-7
                    overflow-hidden
                    rounded-[26px]
                    border
                    border-white/10
                    bg-white/[0.035]
                    p-5
                    sm:p-6
                  "
                >
                  <div
                    className="
                      pointer-events-none
                      absolute
                      right-0
                      top-0
                      h-28
                      w-28
                      rounded-full
                      bg-green-400/5
                      blur-3xl
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
                          gap-2
                        "
                      >
                        <p
                          className="
                            text-xs
                            font-medium
                            uppercase
                            tracking-wider
                            text-slate-500
                          "
                        >
                          Next Month Prediction
                        </p>

                        <span
                          className="
                            rounded-full
                            bg-green-400/10
                            px-2
                            py-0.5
                            text-[9px]
                            font-semibold
                            text-green-400
                          "
                        >
                          AI
                        </span>
                      </div>

                      <h3
                        className="
                          mt-2
                          text-3xl
                          font-bold
                          tracking-tight
                          text-white
                          sm:text-4xl
                        "
                      >
                        $4,850
                      </h3>

                      <div
                        className="
                          mt-3
                          flex
                          items-center
                          gap-2
                          text-xs
                          font-medium
                          text-green-400
                        "
                      >
                        <ArrowUpRight size={15} />

                        Saving opportunity +18%
                      </div>
                    </div>

                    <div
                      className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-green-400/10
                        bg-green-500/10
                      "
                    >
                      <TrendingUp
                        size={20}
                        className="text-green-400"
                      />
                    </div>
                  </div>

                  {/* Mini Progress */}

                  <div className="relative mt-5">
                    <div
                      className="
                        h-1.5
                        overflow-hidden
                        rounded-full
                        bg-white/5
                      "
                    >
                      <motion.div
                        initial={{
                          width: 0,
                        }}
                        whileInView={{
                          width: "78%",
                        }}
                        viewport={{
                          once: true,
                        }}
                        transition={{
                          duration: 1,
                          delay: 0.3,
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
                </motion.div>

                {/* ================================================= */}
                {/* SMART RECOMMENDATION */}
                {/* ================================================= */}

                <motion.div
                  whileHover={{
                    y: -2,
                  }}
                  className="
                    relative
                    mt-4
                    overflow-hidden
                    rounded-[26px]
                    border
                    border-blue-500/20
                    bg-gradient-to-br
                    from-blue-500/10
                    via-blue-500/5
                    to-cyan-500/5
                    p-5
                    sm:p-6
                  "
                >
                  <div
                    className="
                      pointer-events-none
                      absolute
                      -right-12
                      -top-12
                      h-32
                      w-32
                      rounded-full
                      bg-blue-500/15
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
                        size={18}
                        className="text-cyan-400"
                      />
                    </div>

                    <div>
                      <p
                        className="
                          text-sm
                          font-semibold
                          text-blue-400
                        "
                      >
                        Smart Recommendation
                      </p>

                      <p
                        className="
                          mt-0.5
                          text-[10px]
                          text-slate-500
                        "
                      >
                        Based on your recent activity
                      </p>
                    </div>
                  </div>

                  <p
                    className="
                      relative
                      mt-4
                      text-sm
                      leading-6
                      text-slate-300
                    "
                  >
                    Your food expenses increased this month. AI recommends
                    reducing dining expenses by approximately 10%.
                  </p>

                  <div
                    className="
                      relative
                      mt-4
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
                        shadow-lg
                        shadow-cyan-400/60
                      "
                    />

                    Smart insight generated automatically
                  </div>
                </motion.div>

                {/* ================================================= */}
                {/* STATUS CARDS */}
                {/* ================================================= */}

                <div
                  className="
                    relative
                    mt-4
                    grid
                    grid-cols-2
                    gap-3
                  "
                >
                  {/* Security */}

                  <motion.div
                    whileHover={{
                      y: -2,
                    }}
                    className="
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/[0.035]
                      p-4
                      transition
                      hover:border-cyan-400/20
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
                        bg-cyan-400/10
                      "
                    >
                      <ShieldCheck
                        size={18}
                        className="text-cyan-400"
                      />
                    </div>

                    <p
                      className="
                        mt-3
                        text-[10px]
                        uppercase
                        tracking-wider
                        text-slate-500
                      "
                    >
                      Financial Security
                    </p>

                    <div
                      className="
                        mt-1
                        flex
                        items-center
                        gap-1.5
                      "
                    >
                      <span
                        className="
                          h-1.5
                          w-1.5
                          rounded-full
                          bg-green-400
                        "
                      />

                      <p
                        className="
                          text-sm
                          font-semibold
                          text-white
                        "
                      >
                        Protected
                      </p>
                    </div>
                  </motion.div>

                  {/* Accuracy */}

                  <motion.div
                    whileHover={{
                      y: -2,
                    }}
                    className="
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/[0.035]
                      p-4
                      transition
                      hover:border-yellow-400/20
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
                        bg-yellow-400/10
                      "
                    >
                      <Zap
                        size={18}
                        className="text-yellow-400"
                      />
                    </div>

                    <p
                      className="
                        mt-3
                        text-[10px]
                        uppercase
                        tracking-wider
                        text-slate-500
                      "
                    >
                      AI Accuracy
                    </p>

                    <div
                      className="
                        mt-1
                        flex
                        items-center
                        gap-1.5
                      "
                    >
                      <p
                        className="
                          text-sm
                          font-semibold
                          text-white
                        "
                      >
                        94.8%
                      </p>

                      <ArrowUpRight
                        size={13}
                        className="text-green-400"
                      />
                    </div>
                  </motion.div>
                </div>

                {/* ================================================= */}
                {/* LIVE ANALYSIS FOOTER */}
                {/* ================================================= */}

                <div
                  className="
                    relative
                    mt-4
                    flex
                    items-center
                    justify-between
                    rounded-2xl
                    border
                    border-white/5
                    bg-black/20
                    px-4
                    py-3
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-2
                    "
                  >
                    <motion.span
                      animate={{
                        scale: [1, 1.25, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                      className="
                        h-1.5
                        w-1.5
                        rounded-full
                        bg-cyan-400
                      "
                    />

                    <span
                      className="
                        text-[10px]
                        font-medium
                        text-slate-500
                      "
                    >
                      Live AI analysis
                    </span>
                  </div>

                  <span
                    className="
                      text-[10px]
                      font-medium
                      text-cyan-400
                    "
                  >
                    Updated now
                  </span>
                </div>
              </motion.div>

              {/* Decorative Dot */}

              <motion.div
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.4, 0.9, 0.4],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  pointer-events-none
                  absolute
                  -right-3
                  top-16
                  h-2.5
                  w-2.5
                  rounded-full
                  bg-cyan-400
                  shadow-lg
                  shadow-cyan-400/70
                "
              />

              <motion.div
                animate={{
                  y: [0, 8, 0],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  pointer-events-none
                  absolute
                  -left-3
                  bottom-24
                  h-2
                  w-2
                  rounded-full
                  bg-blue-400
                  shadow-lg
                  shadow-blue-400/70
                "
              />
            </div>
          </div>
        </div>

        {/* ===================================================== */}
        {/* BOTTOM TRUST STRIP */}
        {/* ===================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
            delay: 0.3,
          }}
          className="
            mx-auto
            mt-16
            max-w-4xl
            border-t
            border-white/5
            pt-7
          "
        >
          <div
            className="
              flex
              flex-wrap
              items-center
              justify-center
              gap-x-7
              gap-y-3
              text-center
            "
          >
            <div
              className="
                flex
                items-center
                gap-2
                text-xs
                font-medium
                uppercase
                tracking-wider
                text-slate-500
              "
            >
              <BrainCircuit
                size={14}
                className="text-cyan-400"
              />
              AI Powered
            </div>

            <span
              className="
                hidden
                h-1
                w-1
                rounded-full
                bg-slate-700
                sm:block
              "
            />

            <div
              className="
                flex
                items-center
                gap-2
                text-xs
                font-medium
                uppercase
                tracking-wider
                text-slate-500
              "
            >
              <ShieldCheck
                size={14}
                className="text-green-400"
              />
              Secure Intelligence
            </div>

            <span
              className="
                hidden
                h-1
                w-1
                rounded-full
                bg-slate-700
                sm:block
              "
            />

            <div
              className="
                flex
                items-center
                gap-2
                text-xs
                font-medium
                uppercase
                tracking-wider
                text-slate-500
              "
            >
              <Zap
                size={14}
                className="text-yellow-400"
              />
              Real-time Insights
            </div>
          </div>
        </motion.div>
      </section>
    </Reveal>
  );
};

export default AISection;