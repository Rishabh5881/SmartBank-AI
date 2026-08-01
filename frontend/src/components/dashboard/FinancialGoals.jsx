import { motion } from "framer-motion";
import {
  Target,
  Plane,
  ShieldCheck,
  ArrowUpRight,
  Sparkles,
  Plus,
  TrendingUp,
} from "lucide-react";

const goals = [
  {
    title: "Emergency Fund",
    icon: ShieldCheck,
    saved: "$6,500",
    target: "$10,000",
    progress: 65,
    accent: "from-emerald-400/20 via-emerald-400/10 to-cyan-400/10",
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-400/10",
    progressBar: "bg-emerald-400",
    glow: "bg-emerald-400/10",
    status: "On Track",
  },
  {
    title: "Vacation Plan",
    icon: Plane,
    saved: "$2,250",
    target: "$5,000",
    progress: 45,
    accent: "from-violet-400/20 via-violet-400/10 to-purple-400/10",
    iconColor: "text-violet-400",
    iconBg: "bg-violet-400/10",
    progressBar: "bg-violet-400",
    glow: "bg-violet-400/10",
    status: "In Progress",
  },
  {
    title: "Investment Goal",
    icon: Target,
    saved: "$8,000",
    target: "$15,000",
    progress: 55,
    accent: "from-cyan-400/20 via-cyan-400/10 to-blue-400/10",
    iconColor: "text-cyan-400",
    iconBg: "bg-cyan-400/10",
    progressBar: "bg-cyan-400",
    glow: "bg-cyan-400/10",
    status: "Growing",
  },
];

const FinancialGoals = ({ onViewAll, onAddGoal }) => {
  const handleViewAll = () => {
    if (typeof onViewAll === "function") {
      onViewAll();
    }
  };

  const handleAddGoal = () => {
    if (typeof onAddGoal === "function") {
      onAddGoal();
    }
  };

  return (
    <section className="relative mt-10">
      {/* =========================================
          AMBIENT BACKGROUND
      ========================================= */}

      <div className="pointer-events-none absolute -left-20 top-12 h-52 w-52 rounded-full bg-blue-500/[0.035] blur-[100px]" />

      <div className="pointer-events-none absolute bottom-0 right-0 h-56 w-56 rounded-full bg-cyan-500/[0.035] blur-[110px]" />

      {/* =========================================
          HEADER
      ========================================= */}

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
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-blue-400/15 bg-blue-400/10 shadow-lg shadow-blue-500/5"
            >
              <Target
                size={14}
                strokeWidth={1.8}
                className="text-blue-300"
              />
            </motion.div>

            <div className="h-px w-7 bg-gradient-to-r from-blue-400/60 to-transparent" />

            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-blue-400">
              Financial Planning
            </p>
          </div>

          <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Financial Goals
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
            Track your savings milestones and stay focused on what matters
            most.
          </p>
        </div>

        {/* Header Actions */}

        <div className="flex items-center gap-2">
          <motion.button
            type="button"
            whileHover={{
              y: -2,
            }}
            whileTap={{
              scale: 0.97,
            }}
            onClick={handleAddGoal}
            className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.035] px-3.5 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400 transition-all duration-300 hover:border-cyan-400/20 hover:bg-white/[0.06] hover:text-cyan-300"
          >
            <Plus
              size={14}
              strokeWidth={2}
            />

            <span>Add Goal</span>
          </motion.button>

          <motion.button
            type="button"
            whileHover={{
              y: -2,
            }}
            whileTap={{
              scale: 0.97,
            }}
            onClick={handleViewAll}
            className="flex items-center gap-2 rounded-xl border border-blue-400/15 bg-blue-400/[0.06] px-3.5 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-blue-400 transition-all duration-300 hover:border-blue-400/30 hover:bg-blue-400/10 hover:text-blue-300"
          >
            <span>View All</span>

            <ArrowUpRight
              size={14}
              strokeWidth={1.8}
            />
          </motion.button>
        </div>
      </div>

      {/* =========================================
          GOALS GRID
      ========================================= */}

      <div className="relative z-10 mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {goals.map((goal, index) => {
          const Icon = goal.icon;

          return (
            <motion.div
              key={goal.title}
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
                y: -6,
              }}
              className="group relative overflow-hidden rounded-[26px] border border-white/[0.08] bg-white/[0.035] p-5 shadow-xl shadow-black/10 backdrop-blur-2xl transition-all duration-500 hover:border-white/[0.14] hover:bg-white/[0.055] hover:shadow-2xl"
            >
              {/* Card Glow */}

              <div
                className={`pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full ${goal.glow} blur-[60px] opacity-40 transition-all duration-700 group-hover:scale-[1.3] group-hover:opacity-100`}
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent" />

              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              {/* =========================================
                  CARD HEADER
              ========================================= */}

              <div className="relative z-10 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <motion.div
                    whileHover={{
                      scale: 1.08,
                      rotate: 4,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 15,
                    }}
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-gradient-to-br ${goal.accent} ${goal.iconColor} shadow-lg backdrop-blur-xl`}
                  >
                    <Icon
                      size={21}
                      strokeWidth={1.8}
                    />
                  </motion.div>

                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-cyan-50">
                      {goal.title}
                    </h3>

                    <div className="mt-1.5 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50" />

                      <span className="text-[9px] font-semibold uppercase tracking-[0.13em] text-slate-500">
                        {goal.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/[0.07] bg-white/[0.025] text-slate-600 transition-all duration-300 group-hover:border-cyan-400/20 group-hover:bg-cyan-400/[0.06] group-hover:text-cyan-300">
                  <ArrowUpRight
                    size={15}
                    strokeWidth={1.8}
                  />
                </div>
              </div>

              {/* =========================================
                  SAVINGS INFO
              ========================================= */}

              <div className="relative z-10 mt-7 flex items-end justify-between gap-4">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-600">
                    Saved
                  </p>

                  <p className="mt-1 text-xl font-black tracking-tight text-white">
                    {goal.saved}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-600">
                    Target
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-400">
                    {goal.target}
                  </p>
                </div>
              </div>

              {/* =========================================
                  PROGRESS
              ========================================= */}

              <div className="relative z-10 mt-6">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-600">
                    Progress
                  </span>

                  <span className={`text-sm font-black ${goal.iconColor}`}>
                    {goal.progress}%
                  </span>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full border border-white/[0.04] bg-white/[0.06]">
                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    animate={{
                      width: `${goal.progress}%`,
                    }}
                    transition={{
                      duration: 1,
                      delay: 0.4 + index * 0.1,
                      ease: "easeOut",
                    }}
                    className={`relative h-full rounded-full ${goal.progressBar}`}
                  >
                    <div className="absolute inset-y-0 right-0 w-10 bg-white/30 blur-[5px]" />
                  </motion.div>
                </div>
              </div>

              {/* =========================================
                  CARD FOOTER
              ========================================= */}

              <div className="relative z-10 mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-400/[0.06]">
                    <TrendingUp
                      size={12}
                      className="text-cyan-400"
                    />
                  </div>

                  <span className="text-[9px] font-semibold uppercase tracking-[0.13em] text-slate-600">
                    Goal Progress
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Sparkles
                    size={11}
                    className="text-cyan-400/60"
                  />

                  <span className="text-[9px] font-medium uppercase tracking-[0.12em] text-slate-600">
                    SmartBank AI
                  </span>
                </div>
              </div>

              {/* Bottom Hover Line */}

              <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent transition-all duration-700 group-hover:w-[72%]" />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default FinancialGoals;