import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  CreditCard,
  Wifi,
  Eye,
  EyeOff,
  ShieldCheck,
  Snowflake,
  LockKeyhole,
  Sparkles,
} from "lucide-react";

const VirtualCard = ({
  cardNumber = "4589 **** **** 7821",
  holder = "SMARTBANK USER",
  expiry = "12/29",
  cvv = "428",
  frozen = false,
}) => {
  const [showSensitiveData, setShowSensitiveData] = useState(false);

  const visibleCardNumber = showSensitiveData
    ? cardNumber.replace(/\*/g, "8")
    : cardNumber;

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className="relative"
    >
      {/* ==========================================
          CARD
      ========================================== */}

      <motion.div
        whileHover={{
          y: -6,
        }}
        transition={{
          duration: 0.3,
        }}
        className={`group relative min-h-[290px] overflow-hidden rounded-[30px] border border-white/10 bg-gradient-to-br from-blue-700 via-indigo-600 to-purple-700 p-6 text-white shadow-2xl shadow-blue-950/40 sm:p-7 ${
          frozen ? "grayscale-[0.65]" : ""
        }`}
      >
        {/* ==========================================
            BACKGROUND EFFECTS
        ========================================== */}

        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl transition duration-500 group-hover:bg-white/15" />

        <div className="pointer-events-none absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-cyan-300/10 blur-3xl" />

        <div className="pointer-events-none absolute right-8 top-16 h-28 w-28 rounded-full border border-white/10" />

        <div className="pointer-events-none absolute right-14 top-22 h-16 w-16 rounded-full border border-white/10" />

        <div className="relative z-10">
          {/* ==========================================
              TOP ROW
          ========================================== */}

          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md">
                <CreditCard size={20} />
              </div>

              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/50">
                  Virtual Card
                </p>

                <h2 className="mt-0.5 text-lg font-bold tracking-tight">
                  SmartBank AI
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Wifi
                size={23}
                className="rotate-90 text-white/80"
              />

              <div className="rounded-lg bg-white/10 px-2.5 py-1 text-[11px] font-black italic tracking-wider backdrop-blur-md">
                VISA
              </div>
            </div>
          </div>

          {/* ==========================================
              CHIP
          ========================================== */}

          <div className="mt-8">
            <div className="relative h-9 w-13 overflow-hidden rounded-lg border border-yellow-100/30 bg-gradient-to-br from-yellow-100 via-yellow-300 to-yellow-500 shadow-lg">
              <div className="absolute left-1/2 top-0 h-full w-px bg-yellow-700/20" />

              <div className="absolute left-0 top-1/2 h-px w-full bg-yellow-700/20" />

              <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-yellow-700/20" />
            </div>
          </div>

          {/* ==========================================
              CARD NUMBER
          ========================================== */}

          <div className="mt-6">
            <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/45">
              Card Number
            </p>

            <div className="mt-1 flex items-center justify-between gap-4">
              <p className="font-mono text-xl font-semibold tracking-[0.18em] text-white sm:text-2xl">
                {visibleCardNumber}
              </p>

              <button
                type="button"
                onClick={() =>
                  setShowSensitiveData((value) => !value)
                }
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white/70 backdrop-blur-md transition hover:bg-white/20 hover:text-white"
                aria-label={
                  showSensitiveData
                    ? "Hide card number"
                    : "Show card number"
                }
              >
                <AnimatePresence
                  mode="wait"
                  initial={false}
                >
                  {showSensitiveData ? (
                    <motion.span
                      key="hidden"
                      initial={{
                        opacity: 0,
                        scale: 0.7,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.7,
                      }}
                    >
                      <EyeOff size={16} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="visible"
                      initial={{
                        opacity: 0,
                        scale: 0.7,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.7,
                      }}
                    >
                      <Eye size={16} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>

          {/* ==========================================
              CARD DETAILS
          ========================================== */}

          <div className="mt-7 grid grid-cols-[1fr_auto_auto] items-end gap-6">
            <div className="min-w-0">
              <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-white/45">
                Card Holder
              </p>

              <p className="mt-1 truncate text-xs font-bold tracking-wider text-white/90 sm:text-sm">
                {holder}
              </p>
            </div>

            <div>
              <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-white/45">
                Expires
              </p>

              <p className="mt-1 text-xs font-bold text-white/90">
                {expiry}
              </p>
            </div>

            <div>
              <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-white/45">
                CVV
              </p>

              <p className="mt-1 font-mono text-xs font-bold tracking-widest text-white/90">
                {showSensitiveData ? cvv : "***"}
              </p>
            </div>
          </div>
        </div>

        {/* ==========================================
            FROZEN OVERLAY
        ========================================== */}

        {frozen && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-950/50 backdrop-blur-[2px]">
            <div className="flex items-center gap-2 rounded-full border border-blue-300/20 bg-slate-950/70 px-4 py-2 text-xs font-bold text-blue-200 shadow-xl backdrop-blur-md">
              <Snowflake size={15} />

              Card Frozen
            </div>
          </div>
        )}
      </motion.div>

      {/* ==========================================
          CARD STATUS BAR
      ========================================== */}

      <div className="mt-3 flex flex-col gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-3.5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-xl ${
              frozen
                ? "bg-blue-400/10 text-blue-400"
                : "bg-emerald-400/10 text-emerald-400"
            }`}
          >
            {frozen ? (
              <LockKeyhole size={16} />
            ) : (
              <ShieldCheck size={16} />
            )}
          </div>

          <div>
            <p className="text-xs font-semibold text-white">
              {frozen ? "Card temporarily frozen" : "Virtual card active"}
            </p>

            <p className="mt-0.5 text-[10px] text-slate-600">
              {frozen
                ? "Payments are currently restricted."
                : "Ready for secure online payments."}
            </p>
          </div>
        </div>

        <div
          className={`flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 ${
            frozen
              ? "border-blue-400/10 bg-blue-400/[0.06] text-blue-400"
              : "border-emerald-400/10 bg-emerald-400/[0.06] text-emerald-400"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              frozen ? "bg-blue-400" : "bg-emerald-400"
            }`}
          />

          <span className="text-[9px] font-bold uppercase tracking-wider">
            {frozen ? "Frozen" : "Active"}
          </span>
        </div>
      </div>

      {/* ==========================================
          SECURITY FOOTER
      ========================================== */}

      <div className="mt-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.12em] text-slate-700">
          <ShieldCheck size={11} />

          SmartBank Protected
        </div>

        <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.12em] text-slate-700">
          <Sparkles size={11} />

          AI Monitoring
        </div>
      </div>
    </motion.section>
  );
};

export default VirtualCard;
