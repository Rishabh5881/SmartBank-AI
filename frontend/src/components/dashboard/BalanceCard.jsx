import { motion } from "framer-motion";

import {
Wallet,
TrendingUp,
TrendingDown,
ArrowUpRight,
ArrowDownRight
} from "lucide-react";

const BalanceCards = () => {
const cards = [
{
title: "Total Balance",
amount: "$24,580",
growth: "+12.5%",
desc: "Compared to last month",
icon: Wallet,
color: "from-blue-600 to-cyan-400",
iconColor: "text-cyan-400",
glow: "bg-cyan-500/20",
positive: true,
progress: "75%",
},
{
title: "Monthly Income",
amount: "$8,500",
growth: "+8.4%",
desc: "Compared to last month",
icon: TrendingUp,
color: "from-emerald-500 to-green-400",
iconColor: "text-emerald-400",
glow: "bg-emerald-500/20",
positive: true,
progress: "65%",
},
{
title: "Monthly Expense",
amount: "$2,300",
growth: "-4.1%",
desc: "You saved more this month",
icon: TrendingDown,
color: "from-orange-500 to-red-400",
iconColor: "text-orange-400",
glow: "bg-orange-500/20",
positive: true,
progress: "40%",
},
];

return (
<div className=" grid gap-5 md:grid-cols-2 xl:grid-cols-3 " >
{cards.map((card, index) => {
const Icon = card.icon;

    return (
      <motion.div
        key={card.title}
        initial={{
          opacity: 0,
          y: 24,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.55,
          delay: index * 0.1,
          ease: "easeOut",
        }}
        whileHover={{
          y: -6,
        }}
        className="
          group
          relative
          overflow-hidden
          rounded-[28px]
          border
          border-white/10
          bg-gradient-to-br
          from-white/[0.08]
          via-white/[0.045]
          to-white/[0.02]
          p-6
          text-white
          shadow-2xl
          shadow-black/20
          backdrop-blur-2xl
          transition-all
          duration-300
          hover:border-white/15
          hover:shadow-cyan-500/10
        "
      >
        {/* Background Glow */}

        <div
          className={`
            pointer-events-none
            absolute
            -right-16
            -top-16
            h-40
            w-40
            rounded-full
            ${card.glow}
            blur-3xl
            transition
            duration-500
            group-hover:scale-150
          `}
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-20
            -left-16
            h-32
            w-32
            rounded-full
            bg-blue-500/5
            blur-3xl
            transition
            duration-500
            group-hover:scale-125
          "
        />

        <div className="relative z-10">
          {/* Header */}

          <div
            className="
              flex
              items-center
              justify-between
            "
          >
            {/* Icon */}

            <motion.div
              whileHover={{
                scale: 1.08,
                rotate: 2,
              }}
              className={`
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                border
                border-white/10
                bg-gradient-to-br
                ${card.color}
                bg-opacity-10
                shadow-lg
                transition
                duration-300
                group-hover:shadow-cyan-500/10
              `}
            >
              <div
                className="
                  flex
                  h-full
                  w-full
                  items-center
                  justify-center
                  rounded-2xl
                  bg-slate-950/40
                "
              >
                <Icon
                  size={22}
                  className={card.iconColor}
                  strokeWidth={2}
                />
              </div>
            </motion.div>

            {/* Growth */}

            <div
              className="
                flex
                items-center
                gap-1.5
                rounded-full
                border
                border-green-400/10
                bg-green-400/10
                px-3
                py-1.5
                text-xs
                font-semibold
                text-green-400
              "
            >
              {card.positive ? (
                <ArrowUpRight size={14} />
              ) : (
                <ArrowDownRight size={14} />
              )}

              {card.growth}
            </div>
          </div>

          {/* Title & Amount */}

          <div className="mt-7">
            <p
              className="
                text-sm
                font-medium
                text-slate-400
              "
            >
              {card.title}
            </p>

            <h2
              className="
                mt-2
                text-3xl
                font-extrabold
                tracking-tight
                text-white
                sm:text-4xl
              "
            >
              {card.amount}
            </h2>

            <p
              className="
                mt-2
                text-xs
                leading-5
                text-slate-500
              "
            >
              {card.desc}
            </p>
          </div>

          {/* Mini Analytics */}

          <div className="mt-6">
            <div
              className="
                mb-2
                flex
                items-center
                justify-between
              "
            >
              <span
                className="
                  text-[11px]
                  font-medium
                  uppercase
                  tracking-wider
                  text-slate-600
                "
              >
                Monthly trend
              </span>

              <span
                className="
                  text-[11px]
                  font-semibold
                  text-slate-500
                "
              >
                {card.progress}
              </span>
            </div>

            <div
              className="
                h-1.5
                overflow-hidden
                rounded-full
                bg-white/[0.07]
              "
            >
              <motion.div
                initial={{
                  width: 0,
                }}
                animate={{
                  width: card.progress,
                }}
                transition={{
                  duration: 1,
                  delay: 0.4 + index * 0.1,
                  ease: "easeOut",
                }}
                className={`
                  h-full
                  rounded-full
                  bg-gradient-to-r
                  ${card.color}
                `}
              />
            </div>
          </div>

          {/* Bottom Indicator */}

          <div
            className="
              mt-5
              flex
              items-center
              justify-between
              border-t
              border-white/[0.06]
              pt-4
            "
          >
            <span
              className="
                text-xs
                text-slate-600
              "
            >
              SmartBank overview
            </span>

            <div
              className="
                flex
                items-center
                gap-1
                text-xs
                font-medium
                text-slate-500
                transition
                duration-300
                group-hover:text-slate-300
              "
            >
              View details

              <ArrowUpRight
                size={13}
                className="
                  transition
                  duration-300
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
              />
            </div>
          </div>
        </div>
      </motion.div>
    );
  })}
</div>

);
};

export default BalanceCards;