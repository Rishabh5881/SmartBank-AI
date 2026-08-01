import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import {
  X,
  Trash2,
  Snowflake,
  Unlock,
  CreditCard,
  ShieldCheck,
  LockKeyhole,
  CalendarDays,
  CircleDollarSign,
  AlertTriangle,
  CheckCircle2,
  Activity,
  ChevronRight,
} from "lucide-react";

const CardDetails = ({
  card,
  close,
  onDelete,
  onFreeze,
}) => {
  useEffect(() => {
    if (!card) {
      return;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        close();
      }
    };

    document.addEventListener("keydown", handleEscape);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [card, close]);

  if (!card) {
    return null;
  }

  const isFrozen = card.frozen;

  return (
    <AnimatePresence>
      <motion.div
        key="card-details-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) {
            close();
          }
        }}
        className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/80 px-4 py-8 backdrop-blur-xl sm:px-6"
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: 15,
            scale: 0.97,
          }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
          className="relative w-full max-w-2xl overflow-hidden rounded-[30px] border border-white/[0.08] bg-[#07101f] text-white shadow-2xl shadow-black/60"
        >
          {/* =====================================================
              AMBIENT BACKGROUND
          ===================================================== */}

          <div className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full bg-cyan-500/[0.07] blur-[100px]" />

          <div className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-blue-600/[0.07] blur-[110px]" />

          {/* =====================================================
              HEADER
          ===================================================== */}

          <div className="relative flex items-start justify-between border-b border-white/[0.06] px-5 py-5 sm:px-7 sm:py-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.08] text-cyan-400">
                <CreditCard size={19} />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold tracking-tight text-white sm:text-xl">
                    Card Details
                  </h2>

                  <span className="hidden rounded-full border border-white/[0.07] bg-white/[0.03] px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-slate-500 sm:block">
                    Secure
                  </span>
                </div>

                <p className="mt-1 text-xs text-slate-500">
                  Manage your card and security controls
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={close}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.025] text-slate-500 transition-all duration-200 hover:border-white/[0.12] hover:bg-white/[0.06] hover:text-white"
              aria-label="Close card details"
            >
              <X size={17} />
            </button>
          </div>

          {/* =====================================================
              CONTENT
          ===================================================== */}

          <div className="relative space-y-5 p-5 sm:p-7">
            {/* =================================================
                CARD PREVIEW
            ================================================= */}

            <div
              className={`group relative h-56 overflow-hidden rounded-[27px] bg-gradient-to-br ${card.color} p-[1px] shadow-2xl ${
                isFrozen
                  ? "shadow-blue-950/20"
                  : "shadow-black/30"
              }`}
            >
              <div
                className={`relative h-full overflow-hidden rounded-[26px] p-5 ${
                  isFrozen
                    ? "bg-slate-950/60"
                    : "bg-slate-950/10"
                }`}
              >
                {/* Glow */}

                <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-white/15 blur-3xl" />

                <div className="pointer-events-none absolute -bottom-24 -left-16 h-40 w-40 rounded-full bg-cyan-300/10 blur-3xl" />

                {/* Header */}

                <div className="relative flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md">
                      <CreditCard size={17} />
                    </div>

                    <div>
                      <p className="text-[8px] uppercase tracking-[0.18em] text-white/50">
                        SmartBank
                      </p>

                      <p className="mt-0.5 text-sm font-bold">
                        {card.type}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <ShieldCheck
                      size={16}
                      className="text-white/70"
                    />

                    <span className="rounded-full bg-white/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white/80">
                      {isFrozen ? "Frozen" : "Active"}
                    </span>
                  </div>
                </div>

                {/* Chip */}

                <div className="relative mt-6 h-8 w-12 overflow-hidden rounded-md border border-yellow-100/30 bg-gradient-to-br from-yellow-100 via-yellow-300 to-yellow-500">
                  <div className="absolute left-1/2 top-0 h-full w-px bg-yellow-700/20" />

                  <div className="absolute left-0 top-1/2 h-px w-full bg-yellow-700/20" />

                  <div className="absolute left-1/2 top-1/2 h-4 w-5 -translate-x-1/2 -translate-y-1/2 rounded border border-yellow-700/20" />
                </div>

                {/* Number */}

                <p className="relative mt-4 font-mono text-[16px] font-semibold tracking-[0.17em] text-white sm:text-lg">
                  {card.number}
                </p>

                {/* Bottom */}

                <div className="relative mt-4 flex items-end justify-between gap-5">
                  <div className="min-w-0">
                    <p className="text-[8px] uppercase tracking-[0.18em] text-white/45">
                      Card Holder
                    </p>

                    <p className="mt-1 truncate text-[10px] font-bold tracking-wider">
                      {card.holder}
                    </p>
                  </div>

                  <div>
                    <p className="text-[8px] uppercase tracking-[0.18em] text-white/45">
                      Expires
                    </p>

                    <p className="mt-1 text-[10px] font-bold">
                      {card.expiry}
                    </p>
                  </div>
                </div>

                {/* Frozen Overlay */}

                {isFrozen && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40 backdrop-blur-[1px]">
                    <div className="flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-950/70 px-4 py-2.5 shadow-xl backdrop-blur-xl">
                      <Snowflake
                        size={15}
                        className="text-blue-300"
                      />

                      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-blue-200">
                        Card Frozen
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* =================================================
                STATUS
            ================================================= */}

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/10">
                    {isFrozen ? (
                      <Snowflake
                        size={17}
                        className="text-blue-400"
                      />
                    ) : (
                      <CheckCircle2
                        size={17}
                        className="text-emerald-400"
                      />
                    )}
                  </div>

                  <span
                    className={`text-[9px] font-bold uppercase tracking-[0.15em] ${
                      isFrozen
                        ? "text-blue-400"
                        : "text-emerald-400"
                    }`}
                  >
                    {isFrozen ? "Security Lock" : "Operational"}
                  </span>
                </div>

                <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-600">
                  Card Status
                </p>

                <p className="mt-1 text-lg font-bold text-white">
                  {isFrozen ? "Frozen" : "Active"}
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400/10">
                    <CircleDollarSign
                      size={17}
                      className="text-cyan-400"
                    />
                  </div>

                  <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-600">
                    Limit
                  </span>
                </div>

                <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-600">
                  Card Limit
                </p>

                <p className="mt-1 text-lg font-bold text-white">
                  {card.limit || "$0"}
                </p>
              </div>
            </div>

            {/* =================================================
                CARD INFORMATION
            ================================================= */}

            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02]">
              <div className="border-b border-white/[0.05] px-4 py-3">
                <div className="flex items-center gap-2">
                  <Activity
                    size={15}
                    className="text-cyan-400"
                  />

                  <p className="text-xs font-semibold text-white">
                    Card Information
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-px bg-white/[0.04]">
                <div className="bg-[#07101f] p-4">
                  <div className="flex items-center gap-2">
                    <CalendarDays
                      size={13}
                      className="text-slate-600"
                    />

                    <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-600">
                      Validity
                    </p>
                  </div>

                  <p className="mt-2 text-sm font-semibold text-slate-200">
                    {card.validity || "Not specified"}
                  </p>
                </div>

                <div className="bg-[#07101f] p-4">
                  <div className="flex items-center gap-2">
                    <CircleDollarSign
                      size={13}
                      className="text-slate-600"
                    />

                    <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-600">
                      Interest
                    </p>
                  </div>

                  <p className="mt-2 text-sm font-semibold text-slate-200">
                    {card.interest || "0%"}
                  </p>
                </div>
              </div>
            </div>

            {/* =================================================
                SECURITY NOTICE
            ================================================= */}

            <div
              className={`rounded-2xl border p-4 ${
                isFrozen
                  ? "border-blue-400/10 bg-blue-400/[0.035]"
                  : "border-emerald-400/10 bg-emerald-400/[0.035]"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                    isFrozen
                      ? "bg-blue-400/10 text-blue-400"
                      : "bg-emerald-400/10 text-emerald-400"
                  }`}
                >
                  {isFrozen ? (
                    <LockKeyhole size={16} />
                  ) : (
                    <ShieldCheck size={16} />
                  )}
                </div>

                <div>
                  <p className="text-xs font-semibold text-white">
                    {isFrozen
                      ? "Card is temporarily locked"
                      : "Card security is active"}
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-slate-500">
                    {isFrozen
                      ? "Payments and card usage should remain blocked until you unfreeze this card."
                      : "SmartBank continuously monitors this card for suspicious payment activity."}
                  </p>
                </div>
              </div>
            </div>

            {/* =================================================
                ACTIONS
            ================================================= */}

            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => onFreeze(card)}
                className={`group flex min-h-12 items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold transition-all duration-300 ${
                  isFrozen
                    ? "border border-emerald-400/15 bg-emerald-400/10 text-emerald-400 hover:border-emerald-400/25 hover:bg-emerald-400/15"
                    : "border border-blue-400/15 bg-blue-500/10 text-blue-300 hover:border-blue-400/25 hover:bg-blue-500/15"
                }`}
              >
                {isFrozen ? (
                  <Unlock size={17} />
                ) : (
                  <Snowflake size={17} />
                )}

                {isFrozen ? "Unfreeze Card" : "Freeze Card"}

                <ChevronRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </button>

              <button
                type="button"
                onClick={() => onDelete(card)}
                className="group flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-red-400/10 bg-red-400/[0.06] px-4 py-3 text-sm font-bold text-red-400 transition-all duration-300 hover:border-red-400/20 hover:bg-red-400/10"
              >
                <Trash2 size={17} />

                Delete Card
              </button>
            </div>

            {/* =================================================
                DELETE WARNING
            ================================================= */}

            <div className="flex items-start gap-2 px-1">
              <AlertTriangle
                size={12}
                className="mt-0.5 shrink-0 text-slate-700"
              />

              <p className="text-[9px] leading-4 text-slate-700">
                Card controls are currently local UI actions. In the
                production backend, freeze, unfreeze, and delete
                operations should be authenticated and persisted
                server-side.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CardDetails;