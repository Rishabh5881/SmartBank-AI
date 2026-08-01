
import { motion } from "framer-motion";

import {
  CreditCard,
  ShieldCheck,
  Wallet,
  TrendingUp,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

const CardStats = ({
  totalCards = 3,
  cardLimit = "$175,000",
  securityScore = "98%",
  cashback = "$450",
}) => {
  const stats = [
    {
      title: "Total Cards",
      value: totalCards,
      description: "Cards linked to profile",
      icon: CreditCard,
      iconBg: "bg-blue-400/10",
      iconColor: "text-blue-400",
      badge: "Portfolio",
      trend: "Active",
    },
    {
      title: "Card Limit",
      value: cardLimit,
      description: "Combined spending limit",
      icon: Wallet,
      iconBg: "bg-cyan-400/10",
      iconColor: "text-cyan-400",
      badge: "Available",
      trend: "Across cards",
    },
    {
      title: "Security Score",
      value: securityScore,
      description: "SmartBank protection",
      icon: ShieldCheck,
      iconBg: "bg-emerald-400/10",
      iconColor: "text-emerald-400",
      badge: "Excellent",
      trend: "Protected",
    },
    {
      title: "Cashback",
      value: cashback,
      description: "Available rewards",
      icon: TrendingUp,
      iconBg: "bg-purple-400/10",
      iconColor: "text-purple-400",
      badge: "Rewards",
      trend: "Available",
    },
  ];

  return (
    <section className="mt-8">
      {/* ==========================================
          SECTION HEADER
      ========================================== */}

      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-cyan-400" />

            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-400">
              Card Intelligence
            </p>
          </div>

          <h2 className="mt-2 text-xl font-bold tracking-tight text-white sm:text-2xl">
            Card Overview
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            A quick snapshot of your card portfolio.
          </p>
        </div>

        <div className="flex w-fit items-center gap-2 rounded-full border border-emerald-400/10 bg-emerald-400/[0.05] px-3 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/40" />

          <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
            Live Overview
          </span>
        </div>
      </div>

      {/* ==========================================
          STAT CARDS
      ========================================== */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.45,
                delay: index * 0.07,
              }}
              whileHover={{
                y: -5,
              }}
              className="group relative overflow-hidden rounded-[24px] border border-white/[0.07] bg-white/[0.025] p-5 transition-all duration-300 hover:border-white/[0.13] hover:bg-white/[0.04] hover:shadow-xl hover:shadow-black/10"
            >
              {/* Ambient Glow */}

              <div
                className={`pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full ${item.iconBg} opacity-40 blur-3xl transition duration-500 group-hover:opacity-70`}
              />

              {/* Top Row */}

              <div className="relative flex items-start justify-between">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl ${item.iconBg} ${item.iconColor} transition-transform duration-300 group-hover:scale-105`}
                >
                  <Icon size={19} />
                </div>

                <div className="flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.025] px-2.5 py-1">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      index === 2
                        ? "bg-emerald-400"
                        : "bg-cyan-400"
                    }`}
                  />

                  <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-500">
                    {item.badge}
                  </span>
                </div>
              </div>

              {/* Content */}

              <div className="relative mt-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-600">
                  {item.title}
                </p>

                <div className="mt-2 flex items-end justify-between gap-3">
                  <h3 className="truncate text-2xl font-bold tracking-tight text-white sm:text-[27px]">
                    {item.value}
                  </h3>

                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${item.iconBg} ${item.iconColor} opacity-70 transition-all duration-300 group-hover:opacity-100`}
                  >
                    <ArrowUpRight size={13} />
                  </div>
                </div>

                <p className="mt-2 truncate text-[11px] text-slate-500">
                  {item.description}
                </p>
              </div>

              {/* Bottom Status */}

              <div className="relative mt-5 flex items-center justify-between border-t border-white/[0.05] pt-3">
                <span className="text-[9px] uppercase tracking-[0.12em] text-slate-700">
                  SmartBank AI
                </span>

                <span className="text-[10px] font-medium text-slate-600">
                  {item.trend}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default CardStats;

