import { motion } from "framer-motion";
import {
  BrainCircuit,
  TrendingUp,
  ShieldCheck,
  Target,
  Sparkles
} from "lucide-react";

const AIScoreCard = ({
  score = 92,
  savingScore = 92,
  spendingScore = 85,
  securityScore = 95
}) => {

  const getScoreStatus = (value) => {
    if (value >= 90) return "Excellent";
    if (value >= 75) return "Good";
    if (value >= 60) return "Average";
    return "Needs Attention";
  };

  const scoreStatus = getScoreStatus(score);

  const scoreItems = [
    {
      title: "Saving",
      value: savingScore,
      icon: <Target size={18} />,
      color: "text-green-400",
      bg: "bg-green-400/10"
    },
    {
      title: "Spending",
      value: spendingScore,
      icon: <TrendingUp size={18} />,
      color: "text-cyan-400",
      bg: "bg-cyan-400/10"
    },
    {
      title: "Security",
      value: securityScore,
      icon: <ShieldCheck size={18} />,
      color: "text-blue-400",
      bg: "bg-blue-400/10"
    }
  ];

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: 0.6
      }}
      whileHover={{
        y: -4
      }}
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-gradient-to-br
        from-slate-900
        via-blue-950/70
        to-cyan-950/50
        p-6
        text-white
        shadow-xl
        shadow-blue-500/10
        backdrop-blur-xl
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
          bg-cyan-400/10
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-24
          -left-20
          h-48
          w-48
          rounded-full
          bg-blue-600/10
          blur-3xl
        "
      />

      <div className="relative z-10">

        {/* Header */}

        <div className="flex items-start justify-between">

          <div className="flex items-center gap-3">

            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                bg-cyan-400/10
                text-cyan-400
              "
            >
              <BrainCircuit size={25} />
            </div>

            <div>

              <h2 className="text-xl font-bold">
                AI Score Card
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Smart financial analysis
              </p>

            </div>

          </div>

          <div
            className="
              flex
              items-center
              gap-1.5
              rounded-full
              border
              border-cyan-400/20
              bg-cyan-400/10
              px-3
              py-1.5
              text-xs
              font-medium
              text-cyan-400
            "
          >
            <Sparkles size={13} />
            AI Powered
          </div>

        </div>


        {/* Main Score */}

        <div
          className="
            mt-8
            flex
            flex-col
            items-center
            justify-center
            sm:flex-row
            sm:justify-between
          "
        >

          <div className="text-center sm:text-left">

            <p className="text-sm text-slate-400">
              Overall Financial Score
            </p>

            <div className="mt-2 flex items-end justify-center gap-2 sm:justify-start">

              <h3
                className="
                  text-6xl
                  font-bold
                  tracking-tight
                  text-cyan-400
                "
              >
                {score}
              </h3>

              <span className="mb-2 text-lg text-slate-500">
                /100
              </span>

            </div>

            <div
              className="
                mt-3
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-green-400/10
                px-3
                py-1.5
                text-sm
                font-semibold
                text-green-400
              "
            >
              <TrendingUp size={15} />
              {scoreStatus}
            </div>

          </div>


          {/* Circular Score */}

          <div
            className="
              relative
              mt-6
              flex
              h-32
              w-32
              items-center
              justify-center
              rounded-full
              bg-gradient-to-br
              from-cyan-400/20
              to-blue-600/20
              p-2
              sm:mt-0
            "
          >

            <div
              className="
                flex
                h-full
                w-full
                items-center
                justify-center
                rounded-full
                border-4
                border-cyan-400/30
                bg-slate-950
              "
            >

              <div className="text-center">

                <p className="text-2xl font-bold">
                  {score}%
                </p>

                <p className="text-xs text-slate-500">
                  Health
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* Progress */}

        <div className="mt-8">

          <div className="mb-2 flex justify-between text-xs">

            <span className="text-slate-400">
              Financial health
            </span>

            <span className="font-semibold text-cyan-400">
              {score}%
            </span>

          </div>

          <div
            className="
              h-2
              overflow-hidden
              rounded-full
              bg-white/10
            "
          >

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${score}%` }}
              transition={{
                duration: 1,
                delay: 0.3
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


        {/* Score Breakdown */}

        <div className="mt-7 grid grid-cols-3 gap-3">

          {scoreItems.map((item, index) => (

            <motion.div
              key={index}
              whileHover={{
                y: -3
              }}
              className="
                rounded-2xl
                border
                border-white/10
                bg-white/5
                p-3
              "
            >

              <div
                className={`
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  ${item.bg}
                  ${item.color}
                `}
              >
                {item.icon}
              </div>

              <p className="mt-3 text-xs text-slate-400">
                {item.title}
              </p>

              <p className="mt-1 text-lg font-bold">
                {item.value}%
              </p>

            </motion.div>

          ))}

        </div>


        {/* AI Insight */}

        <div
          className="
            mt-6
            rounded-2xl
            border
            border-cyan-400/10
            bg-cyan-400/5
            p-4
          "
        >

          <div className="flex items-start gap-3">

            <Sparkles
              size={18}
              className="
                mt-0.5
                shrink-0
                text-cyan-400
              "
            />

            <div>

              <p className="text-sm font-semibold text-cyan-400">
                AI Insight
              </p>

              <p className="mt-1 text-sm leading-6 text-slate-300">
                Your financial health is strong. Maintaining
                your current saving habits can help improve
                your overall score further.
              </p>

            </div>

          </div>

        </div>

      </div>

    </motion.div>
  );
};

export default AIScoreCard;