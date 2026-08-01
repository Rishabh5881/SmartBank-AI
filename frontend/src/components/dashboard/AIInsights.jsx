import { motion } from "framer-motion";

import {
Sparkles,
PiggyBank,
TrendingUp,
ShieldCheck,
Lightbulb,
ArrowUpRight,
} from "lucide-react";

const AIInsights = () => {
const insights = [
{
title: "Smart Saving Opportunity",
text: "Reducing unnecessary subscriptions could help you save around $120 this month.",
icon: <PiggyBank size={20} />,
color: "text-green-400",
bg: "bg-green-500/10",
border: "border-green-400/10",
},
{
title: "Income Growth",
text: "Your monthly income is trending upward compared with previous months.",
icon: <TrendingUp size={20} />,
color: "text-cyan-400",
bg: "bg-cyan-500/10",
border: "border-cyan-400/10",
},
{
title: "Security Status",
text: "Your account security is currently strong. No unusual activity detected.",
icon: <ShieldCheck size={20} />,
color: "text-blue-400",
bg: "bg-blue-500/10",
border: "border-blue-400/10",
},
{
title: "AI Recommendation",
text: "Maintaining your current savings strategy can improve your financial score.",
icon: <Lightbulb size={20} />,
color: "text-yellow-400",
bg: "bg-yellow-500/10",
border: "border-yellow-400/10",
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
hover:border-purple-400/20
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
      bg-purple-500/10
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
      flex-col
      gap-4
      sm:flex-row
      sm:items-center
      sm:justify-between
    "
  >
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
          shrink-0
          items-center
          justify-center
          rounded-2xl
          border
          border-purple-400/15
          bg-purple-500/20
        "
      >
        <Sparkles
          className="text-purple-400"
          size={22}
        />
      </div>

      <div>
        <p
          className="
            text-xs
            font-semibold
            uppercase
            tracking-[0.18em]
            text-purple-400
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
            text-white
            sm:text-2xl
          "
        >
          AI Insights
        </h2>

        <p
          className="
            mt-1
            text-sm
            text-slate-400
          "
        >
          Personalized financial intelligence
        </p>
      </div>
    </div>

    <span
      className="
        inline-flex
        w-fit
        items-center
        gap-2
        rounded-full
        border
        border-purple-400/15
        bg-purple-500/10
        px-3
        py-1.5
        text-xs
        font-semibold
        text-purple-400
      "
    >
      <span
        className="
          h-1.5
          w-1.5
          rounded-full
          bg-purple-400
        "
      />

      AI Powered
    </span>
  </div>

  {/* Insights */}

  <div
    className="
      relative
      mt-7
      grid
      gap-4
      md:grid-cols-2
    "
  >
    {insights.map((item, index) => (
      <motion.div
        key={item.title}
        initial={{
          opacity: 0,
          y: 15,
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
          y: -4,
        }}
        className={`
          group/card
          rounded-2xl
          border
          ${item.border}
          bg-white/[0.03]
          p-4
          transition-all
          duration-300
          hover:bg-white/[0.06]
          hover:border-white/15
        `}
      >
        <div
          className="
            flex
            items-start
            justify-between
            gap-4
          "
        >
          <div
            className={`
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              ${item.bg}
              ${item.color}
            `}
          >
            {item.icon}
          </div>

          <ArrowUpRight
            size={17}
            className="
              text-slate-600
              transition
              duration-300
              group-hover/card:-translate-y-0.5
              group-hover/card:translate-x-0.5
              group-hover/card:text-slate-300
            "
          />
        </div>

        <h3
          className="
            mt-4
            text-base
            font-semibold
            text-white
          "
        >
          {item.title}
        </h3>

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
      </motion.div>
    ))}
  </div>

  {/* Bottom AI Status */}

  <div
    className="
      relative
      mt-5
      flex
      items-center
      gap-3
      rounded-2xl
      border
      border-cyan-400/10
      bg-gradient-to-r
      from-cyan-500/10
      to-blue-500/10
      px-4
      py-3
    "
  >
    <div
      className="
        flex
        h-8
        w-8
        shrink-0
        items-center
        justify-center
        rounded-xl
        bg-cyan-400/10
      "
    >
      <Sparkles
        size={16}
        className="text-cyan-400"
      />
    </div>

    <p
      className="
        text-xs
        leading-5
        text-slate-400
      "
    >
      SmartBank AI continuously analyzes your financial activity to
      generate personalized insights.
    </p>
  </div>
</motion.div>


);
};

export default AIInsights;
