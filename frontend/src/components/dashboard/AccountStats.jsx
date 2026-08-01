
import { motion } from "framer-motion";
import {
  Wallet,
  CreditCard,
  Landmark,
  Star,
  ArrowUpRight,
} from "lucide-react";

const AccountStats = () => {
  const stats = [
    {
      title: "Total Accounts",
      value: "02",
      icon: Wallet,
      desc: "Active accounts",
      accent: "from-blue-500/20 to-cyan-400/10",
      iconColor: "text-cyan-300",
      glow: "bg-cyan-400/10",
    },
    {
      title: "Credit Score",
      value: "780",
      icon: CreditCard,
      desc: "Excellent",
      accent: "from-violet-500/20 to-fuchsia-400/10",
      iconColor: "text-violet-300",
      glow: "bg-violet-400/10",
    },
    {
      title: "Active Loans",
      value: "01",
      icon: Landmark,
      desc: "Running",
      accent: "from-emerald-500/20 to-green-400/10",
      iconColor: "text-emerald-300",
      glow: "bg-emerald-400/10",
    },
    {
      title: "Reward Points",
      value: "12,450",
      icon: Star,
      desc: "Available",
      accent: "from-amber-500/20 to-orange-400/10",
      iconColor: "text-amber-300",
      glow: "bg-amber-400/10",
    },
  ];

  return (
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
              delay: index * 0.08,
              ease: "easeOut",
            }}
            whileHover={{
              y: -5,
            }}
            className="group relative min-h-[175px] overflow-hidden rounded-[26px] border border-white/[0.08] bg-white/[0.035] p-5 text-white shadow-xl shadow-black/10 backdrop-blur-2xl transition-all duration-500 hover:border-white/[0.14] hover:bg-white/[0.055] hover:shadow-2xl"
          >
            {/* ================================
                AMBIENT GLOW
            ================================= */}

            <div
              className={`pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full ${item.glow} blur-[50px] opacity-50 transition-all duration-700 group-hover:scale-125 group-hover:opacity-100`}
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.045] via-transparent to-transparent" />

            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* ================================
                TOP ROW
            ================================= */}

            <div className="relative z-10 flex items-start justify-between">
              <motion.div
                whileHover={{
                  scale: 1.08,
                  rotate: 3,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                }}
                className={`flex h-12 w-12 items-center justify-center rounded-[17px] border border-white/10 bg-gradient-to-br ${item.accent} ${item.iconColor} shadow-lg backdrop-blur-xl transition-all duration-500 group-hover:border-white/20`}
              >
                <Icon
                  size={21}
                  strokeWidth={1.8}
                />
              </motion.div>

              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.07] bg-white/[0.025] text-slate-600 transition-all duration-300 group-hover:border-cyan-400/15 group-hover:bg-cyan-400/5 group-hover:text-cyan-300">
                <ArrowUpRight
                  size={15}
                  strokeWidth={1.8}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </div>
            </div>

            {/* ================================
                CONTENT
            ================================= */}

            <div className="relative z-10 mt-6">
              <div className="flex items-baseline gap-2">
                <h3 className="truncate text-3xl font-extrabold tracking-tight text-white">
                  {item.value}
                </h3>

                {item.title === "Credit Score" && (
                  <span className="rounded-full border border-emerald-400/10 bg-emerald-400/5 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-emerald-400">
                    Great
                  </span>
                )}
              </div>

              <p className="mt-1 text-[13px] font-semibold text-slate-200">
                {item.title}
              </p>

              {/* Status */}

              <div className="mt-3 flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-30" />

                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>

                <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500 transition-colors duration-300 group-hover:text-slate-400">
                  {item.desc}
                </p>
              </div>
            </div>

            {/* ================================
                BOTTOM LINE
            ================================= */}

            <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent transition-all duration-700 group-hover:w-[70%]" />
          </motion.div>
        );
      })}
    </div>
  );
};

export default AccountStats;

