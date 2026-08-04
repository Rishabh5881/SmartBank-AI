
import { motion } from "framer-motion";
import {
  Send,
  PlusCircle,
  ArrowDownCircle,
  Receipt,
  CreditCard,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  Zap,
} from "lucide-react";

const QuickActions = ({ openModal }) => {
  const actions = [
    {
      title: "Transfer Money",
      icon: Send,
      description: "Send money securely to another account.",
      accent:
        "from-blue-500/25 via-blue-500/10 to-cyan-400/10",
      iconColor: "text-cyan-300",
      glow: "bg-cyan-400/10",
      border: "hover:border-cyan-400/30",
      badge: "Fast",
    },
    {
      title: "Deposit Money",
      icon: PlusCircle,
      description: "Add funds to your SmartBank account.",
      accent:
        "from-emerald-500/25 via-emerald-500/10 to-green-400/10",
      iconColor: "text-emerald-300",
      glow: "bg-emerald-400/10",
      border: "hover:border-emerald-400/30",
      badge: "Instant",
    },
    {
      title: "Withdraw Money",
      icon: ArrowDownCircle,
      description: "Withdraw funds securely from your account.",
      accent:
        "from-red-500/25 via-red-500/10 to-orange-400/10",
      iconColor: "text-red-300",
      glow: "bg-red-400/10",
      border: "hover:border-red-400/30",
      badge: "Secure",
    },
    {
      title: "Pay Bills",
      icon: Receipt,
      description: "Manage utilities and recurring payments.",
      accent:
        "from-violet-500/25 via-violet-500/10 to-purple-400/10",
      iconColor: "text-violet-300",
      glow: "bg-violet-400/10",
      border: "hover:border-violet-400/30",
      badge: "Easy",
    },
    {
      title: "Manage Cards",
      icon: CreditCard,
      description: "Control cards and banking preferences.",
      accent:
        "from-amber-500/25 via-amber-500/10 to-orange-400/10",
      iconColor: "text-amber-300",
      glow: "bg-amber-400/10",
      border: "hover:border-amber-400/30",
      badge: "Secure",
    },
  ];

  const handleAction = (title) => {
    if (typeof openModal === "function") {
      openModal(title);
      return;
    }

    console.warn(
      `QuickActions: No openModal handler provided for "${title}".`
    );
  };

  return (
    <section className="relative mt-10">
      {/* Ambient Background */}

      <div className="pointer-events-none absolute -left-20 top-20 h-52 w-52 rounded-full bg-cyan-500/[0.04] blur-[100px]" />

      <div className="pointer-events-none absolute bottom-0 right-0 h-48 w-48 rounded-full bg-blue-500/[0.04] blur-[100px]" />

      {/* Section Header */}

      <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.4,
              }}
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-cyan-400/15 bg-cyan-400/10 shadow-lg shadow-cyan-500/5"
            >
              <Sparkles
                size={14}
                strokeWidth={1.8}
                className="text-cyan-300"
              />
            </motion.div>

            <div className="h-px w-7 bg-gradient-to-r from-cyan-400/60 to-transparent" />

            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-cyan-400">
              Banking Tools
            </p>
          </div>

          <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Quick Actions
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
            Access your most-used banking services without leaving your
            dashboard.
          </p>
        </div>

        {/* Security Badge */}

        <motion.div
          initial={{
            opacity: 0,
            x: 15,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="flex w-fit items-center gap-2 rounded-full border border-emerald-400/10 bg-emerald-400/[0.05] px-3.5 py-2"
        >
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/10">
            <ShieldCheck
              size={11}
              className="text-emerald-400"
            />
          </div>

          <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
            Secure Banking
          </span>

          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/60" />
        </motion.div>
      </div>

      {/* Action Grid */}

      <div className="relative z-10 mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {actions.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.button
              key={item.title}
              type="button"
              aria-label={item.title}
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: "easeOut",
              }}
              whileHover={{
                y: -7,
              }}
              whileTap={{
                scale: 0.985,
              }}
              onClick={() => handleAction(item.title)}
              className={`group relative flex min-h-[218px] flex-col overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.035] p-5 text-left shadow-xl shadow-black/10 backdrop-blur-2xl transition-all duration-500 hover:bg-white/[0.065] hover:shadow-2xl ${item.border}`}
            >
              {/* Card Glow */}

              <div
                className={`pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full ${item.glow} blur-[55px] opacity-40 transition-all duration-700 group-hover:scale-[1.35] group-hover:opacity-100`}
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-transparent opacity-80" />

              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              {/* Top Row */}

              <div className="relative z-10 flex items-start justify-between">
                <motion.div
                  whileHover={{
                    rotate: 4,
                    scale: 1.08,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                  }}
                  className={`flex h-14 w-14 items-center justify-center rounded-[18px] border border-white/10 bg-gradient-to-br ${item.accent} ${item.iconColor} shadow-lg backdrop-blur-xl transition-all duration-500 group-hover:border-white/20`}
                >
                  <Icon
                    size={24}
                    strokeWidth={1.7}
                  />
                </motion.div>

                <div className="flex flex-col items-end gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.035] text-slate-500 transition-all duration-500 group-hover:border-cyan-400/20 group-hover:bg-white/10 group-hover:text-cyan-300">
                    <ArrowUpRight
                      size={17}
                      strokeWidth={1.8}
                      className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </div>

                  <span className="rounded-full border border-white/[0.07] bg-white/[0.035] px-2 py-1 text-[8px] font-semibold uppercase tracking-[0.14em] text-slate-500 transition-colors duration-300 group-hover:text-slate-300">
                    {item.badge}
                  </span>
                </div>
              </div>

              {/* Content */}

              <div className="relative z-10 mt-6 flex-1">
                <h3 className="text-[15px] font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-cyan-50">
                  {item.title}
                </h3>

                <p className="mt-2 max-w-[215px] text-xs leading-5 text-slate-500 transition-colors duration-300 group-hover:text-slate-400">
                  {item.description}
                </p>
              </div>

              {/* Footer */}

              <div className="relative z-10 mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />

                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>

                  <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-slate-600 transition-colors duration-300 group-hover:text-slate-500">
                    Available
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Zap
                    size={10}
                    className="text-slate-700 transition-colors duration-300 group-hover:text-cyan-400"
                  />

                  <span className="text-[9px] font-medium uppercase tracking-[0.14em] text-slate-700 transition-colors duration-300 group-hover:text-slate-500">
                    SmartBank AI
                  </span>
                </div>
              </div>

              {/* Hover Line */}

              <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent transition-all duration-700 group-hover:w-[75%]" />
            </motion.button>
          );
        })}
      </div>
    </section>
  );
};

export default QuickActions;

