import { useMemo } from "react";
import { motion } from "framer-motion";

import {
  TrendingUp,
  ArrowUpRight,
  ShieldCheck,
  Wallet,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

const SpendingLimit = ({
  used = 3200,
  limit = 5000,
  currency = "$",
}) => {
  const percentage = useMemo(() => {
    if (!limit || limit <= 0) return 0;

    return Math.min((used / limit) * 100, 100);
  }, [used, limit]);

  const remaining = Math.max(limit - used, 0);

  const formatCurrency = (value) => {
    return `${currency}${value.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}`;
  };

  const status = useMemo(() => {
    if (percentage >= 90) {
      return {
        label: "Critical",
        description: "You are close to your monthly limit.",
        icon: AlertTriangle,
        color: "text-red-400",
        bg: "bg-red-400/10",
        border: "border-red-400/10",
        bar: "bg-gradient-to-r from-red-500 to-orange-400",
      };
    }

    if (percentage >= 75) {
      return {
        label: "High Usage",
        description: "Consider reducing spending this month.",
        icon: AlertTriangle,
        color: "text-amber-400",
        bg: "bg-amber-400/10",
        border: "border-amber-400/10",
        bar: "bg-gradient-to-r from-amber-400 to-orange-400",
      };
    }

    return {
      label: "Healthy",
      description: "Your spending is within a healthy range.",
      icon: CheckCircle2,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
      border: "border-emerald-400/10",
      bar: "bg-gradient-to-r from-cyan-400 to-blue-500",
    };
  }, [percentage]);

  const StatusIcon = status.icon;

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 22,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className="relative mt-8 overflow-hidden rounded-[28px] border border-white/[0.07] bg-white/[0.025] p-6 shadow-xl shadow-black/10 backdrop-blur-xl sm:p-7"
    >
      {/* ==========================================
          AMBIENT BACKGROUND
      ========================================== */}

      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-400/[0.05] blur-[100px]" />

      <div className="pointer-events-none absolute -bottom-28 left-1/3 h-56 w-56 rounded-full bg-blue-600/[0.04] blur-[100px]" />

      <div className="relative">
        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
                <Wallet size={18} />
              </div>

              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-cyan-400">
                  Spending Intelligence
                </p>

                <h2 className="mt-0.5 text-xl font-bold tracking-tight text-white sm:text-2xl">
                  Monthly Spending Limit
                </h2>
              </div>
            </div>

            <p className="mt-3 max-w-xl text-xs leading-5 text-slate-500 sm:text-sm">
              Track your card usage and stay within your monthly spending
              budget.
            </p>
          </div>

          <div
            className={`flex w-fit items-center gap-2 rounded-full border ${status.border} ${status.bg} px-3 py-1.5`}
          >
            <StatusIcon
              size={13}
              className={status.color}
            />

            <span
              className={`text-[10px] font-bold uppercase tracking-wider ${status.color}`}
            >
              {status.label}
            </span>
          </div>
        </div>

        {/* ==========================================
            MAIN NUMBERS
        ========================================== */}

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {/* USED */}

          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-5">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-600">
                Used
              </p>

              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-400/10 text-red-400">
                <ArrowUpRight size={13} />
              </div>
            </div>

            <p className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {formatCurrency(used)}
            </p>

            <p className="mt-1 text-[10px] text-slate-600">
              Current monthly usage
            </p>
          </div>

          {/* REMAINING */}

          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-5">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-600">
                Remaining
              </p>

              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-400">
                <TrendingUp size={13} />
              </div>
            </div>

            <p className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {formatCurrency(remaining)}
            </p>

            <p className="mt-1 text-[10px] text-slate-600">
              Available this month
            </p>
          </div>

          {/* LIMIT */}

          <div className="rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.035] p-5">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-cyan-500/70">
                Monthly Limit
              </p>

              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400">
                <Wallet size={13} />
              </div>
            </div>

            <p className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {formatCurrency(limit)}
            </p>

            <p className="mt-1 text-[10px] text-slate-600">
              Configured spending cap
            </p>
          </div>
        </div>

        {/* ==========================================
            PROGRESS
        ========================================== */}

        <div className="mt-7">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <p className="text-xs font-semibold text-slate-300">
                Monthly usage
              </p>

              <span className="rounded-full border border-white/[0.06] bg-white/[0.025] px-2 py-0.5 text-[9px] font-bold text-slate-500">
                {percentage.toFixed(0)}%
              </span>
            </div>

            <p className="text-[10px] text-slate-600">
              {formatCurrency(used)} / {formatCurrency(limit)}
            </p>
          </div>

          <div className="relative h-3 overflow-hidden rounded-full bg-white/[0.06]">
            <motion.div
              initial={{
                width: 0,
              }}
              animate={{
                width: `${percentage}%`,
              }}
              transition={{
                duration: 1,
                delay: 0.2,
                ease: "easeOut",
              }}
              className={`relative h-full rounded-full ${status.bar}`}
            >
              <div className="absolute right-0 top-0 h-full w-16 bg-white/20 blur-sm" />
            </motion.div>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <p className="text-[10px] text-slate-600">
              {percentage.toFixed(0)}% of your monthly limit used
            </p>

            <p className={`text-[10px] font-semibold ${status.color}`}>
              {formatCurrency(remaining)} available
            </p>
          </div>
        </div>

        {/* ==========================================
            INSIGHT
        ========================================== */}

        <div
          className={`mt-6 flex flex-col gap-4 rounded-2xl border ${status.border} ${status.bg} p-4 sm:flex-row sm:items-center sm:justify-between`}
        >
          <div className="flex items-start gap-3">
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${status.bg} ${status.color}`}
            >
              <StatusIcon size={16} />
            </div>

            <div>
              <p className={`text-xs font-semibold ${status.color}`}>
                SmartBank AI Insight
              </p>

              <p className="mt-1 text-[10px] leading-5 text-slate-500">
                {status.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-500">
            <ShieldCheck
              size={13}
              className="text-emerald-400"
            />

            Monitored
          </div>
        </div>

        {/* ==========================================
            FOOTER
        ========================================== */}

        <div className="mt-5 flex flex-col gap-2 border-t border-white/[0.05] pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[9px] uppercase tracking-[0.14em] text-slate-700">
            SmartBank AI Financial Monitoring
          </p>

          <p className="text-[9px] text-slate-700">
            Spending data updates automatically
          </p>
        </div>
      </div>
    </motion.section>
  );
};

export default SpendingLimit;

