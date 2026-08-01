import { motion } from "framer-motion";

import {
BrainCircuit,
TrendingUp,
ShieldCheck,
Target,
Sparkles,
} from "lucide-react";

const AIScoreCard = ({
score = 92,
savingScore = 92,
spendingScore = 85,
securityScore = 95,
}) => {
const getScoreStatus = (value) => {
if (value >= 90) {
return {
label: "Excellent",
color: "text-green-400",
bg: "bg-green-400/10",
border: "border-green-400/15",
};
}

if (value >= 75) {
  return {
    label: "Good",
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    border: "border-cyan-400/15",
  };
}

if (value >= 60) {
  return {
    label: "Average",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    border: "border-yellow-400/15",
  };
}

return {
  label: "Needs Attention",
  color: "text-red-400",
  bg: "bg-red-400/10",
  border: "border-red-400/15",
};

};

const scoreStatus = getScoreStatus(score);

const scoreItems = [
{
title: "Saving",
value: savingScore,
icon: <Target size={18} />,
color: "text-green-400",
bg: "bg-green-400/10",
},
{
title: "Spending",
value: spendingScore,
icon: <TrendingUp size={18} />,
color: "text-cyan-400",
bg: "bg-cyan-400/10",
},
{
title: "Security",
value: securityScore,
icon: <ShieldCheck size={18} />,
color: "text-blue-400",
bg: "bg-blue-400/10",
},
];

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
duration: 0.6,
}}
whileHover={{
y: -4,
}}
className="
group
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
transition-all
duration-300
hover/20
"
>
{/* Background Glows */}

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
      transition
      duration-500
      group-hover:scale-125
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

    <div
      className="
        flex
        flex-col
        gap-4
        sm:flex-row
        sm:items-start
        sm:justify-between
      "
    >
      <div className="flex items-center gap-3">
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
            text-cyan-400
          "
        >
          <BrainCircuit size={25} />
        </div>

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
            AI Intelligence
          </p>

          <h2
            className="
              mt-1
              text-xl
              font-bold
              tracking-tight
            "
          >
            AI Score Card
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-slate-400
            "
          >
            Smart financial analysis
          </p>
        </div>
      </div>

      <div
        className="
          flex
          w-fit
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
        gap-7
        sm:flex-row
        sm:justify-between
      "
    >
      <div className="text-center sm:text-left">
        <p className="text-sm text-slate-400">
          Overall Financial Score
        </p>

        <div
          className="
            mt-2
            flex
            items-end
            justify-center
            gap-2
            sm:justify-start
          "
        >
          <motion.h3
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.5,
            }}
            className="
              text-6xl
              font-extrabold
              tracking-tight
              text-cyan-400
            "
          >
            {score}
          </motion.h3>

          <span className="mb-2 text-lg text-slate-500">
            /100
          </span>
        </div>

        <div
          className={`
            mt-3
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            ${scoreStatus.border}
            ${scoreStatus.bg}
            px-3
            py-1.5
            text-sm
            font-semibold
            ${scoreStatus.color}
          `}
        >
          <span
            className="
              h-2
              w-2
              rounded-full
              bg-current
            "
          />

          {scoreStatus.label}
        </div>
      </div>

      {/* Circular Score */}

      <div
        className="
          relative
          flex
          h-36
          w-36
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-gradient-to-br
          from-cyan-400
          via-blue-500
          to-purple-500
          p-[4px]
          shadow-lg
          shadow-cyan-500/10
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
            bg-slate-950
          "
        >
          <div className="text-center">
            <p className="text-3xl font-bold text-white">
              {score}%
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Financial Health
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Progress */}

    <div className="mt-8">
      <div className="mb-2 flex items-center justify-between text-xs">
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
          initial={{
            width: 0,
          }}
          animate={{
            width: `${score}%`,
          }}
          transition={{
            duration: 1,
            delay: 0.3,
            ease: "easeOut",
          }}
          className="
            h-full
            rounded-full
            bg-gradient-to-r
            from-blue-600
            via-cyan-500
            to-cyan-300
          "
        />
      </div>
    </div>

    {/* Score Breakdown */}

    <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
      {scoreItems.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: index * 0.08,
            duration: 0.4,
          }}
          whileHover={{
            y: -3,
          }}
          className="
            rounded-2xl
            border
            border-white/10
            bg-white/[0.04]
            p-4
            transition-all
            duration-300
            hover:border-white/15
            hover:bg-white/[0.07]
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

          <div className="mt-3 flex items-end justify-between gap-2">
            <div>
              <p className="text-xs text-slate-400">
                {item.title}
              </p>

              <p className="mt-1 text-lg font-bold text-white">
                {item.value}%
              </p>
            </div>

            <div
              className="
                mb-1
                h-1.5
                w-12
                overflow-hidden
                rounded-full
                bg-white/10
              "
            >
              <motion.div
                initial={{
                  width: 0,
                }}
                animate={{
                  width: `${item.value}%`,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.4 + index * 0.1,
                }}
                className={`
                  h-full
                  rounded-full
                  ${item.color.replace("text-", "bg-")}
                `}
              />
            </div>
          </div>
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
        bg-gradient-to-r
        from-cyan-400/5
        to-blue-500/5
        p-4
      "
    >
      <div className="flex items-start gap-3">
        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-cyan-400/10
          "
        >
          <Sparkles
            size={17}
            className="text-cyan-400"
          />
        </div>

        <div>
          <p className="text-sm font-semibold text-cyan-400">
            AI Insight
          </p>

          <p className="mt-1 text-sm leading-6 text-slate-300">
            Your financial health is strong. Maintaining your
            current saving habits can help improve your overall
            score further.
          </p>
        </div>
      </div>
    </div>
  </div>
</motion.div>

);
};

export default AIScoreCard;