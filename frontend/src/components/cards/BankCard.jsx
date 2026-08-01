import { motion } from "framer-motion";

import {
  CreditCard,
  Wifi,
  Snowflake,
  ShieldCheck,
  LockKeyhole,
  Sparkles,
} from "lucide-react";

const BankCard = ({
  type,
  number,
  holder,
  expiry,
  color,
  frozen,
  onClick,
}) => {
  return (
    <motion.div
      whileHover={
        frozen
          ? {
              y: -2,
            }
          : {
              scale: 1.025,
              y: -6,
            }
      }
      whileTap={{
        scale: 0.985,
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      onClick={onClick}
      className={`group relative h-64 w-full cursor-pointer overflow-hidden rounded-[28px] bg-gradient-to-br ${color} p-[1px] shadow-2xl transition-shadow duration-500 ${
        frozen
          ? "shadow-blue-950/20"
          : "shadow-black/30 hover:shadow-cyan-950/30"
      }`}
    >
      {/* =====================================================
          INNER CARD
      ===================================================== */}

      <div
        className={`relative h-full overflow-hidden rounded-[27px] p-6 ${
          frozen
            ? "bg-slate-950/65"
            : "bg-slate-950/15 backdrop-blur-[2px]"
        }`}
      >
        {/* =====================================================
            AMBIENT GLOW
        ===================================================== */}

        <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-white/15 blur-3xl transition-all duration-500 group-hover:bg-white/20" />

        <div className="pointer-events-none absolute -bottom-24 -left-16 h-40 w-40 rounded-full bg-cyan-300/10 blur-3xl" />

        {/* Decorative circles */}

        <div className="pointer-events-none absolute -right-10 top-8 h-36 w-36 rounded-full border border-white/[0.08]" />

        <div className="pointer-events-none absolute -right-5 top-13 h-26 w-26 rounded-full border border-white/[0.06]" />

        {/* =====================================================
            FROZEN OVERLAY
        ===================================================== */}

        {frozen && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-slate-950/45 backdrop-blur-[2px]">
            <div className="flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-950/70 px-4 py-2.5 shadow-xl backdrop-blur-xl">
              <Snowflake size={15} className="text-blue-300" />

              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-200">
                Card Frozen
              </span>
            </div>
          </div>
        )}

        {/* =====================================================
            CARD CONTENT
        ===================================================== */}

        <div
          className={`relative z-10 flex h-full flex-col ${
            frozen ? "opacity-60" : ""
          }`}
        >
          {/* =================================================
              HEADER
          ================================================= */}

          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/10 backdrop-blur-md">
                <CreditCard size={18} />
              </div>

              <div>
                <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-white/50">
                  SmartBank
                </p>

                <p className="mt-0.5 text-sm font-bold tracking-tight text-white">
                  {type}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {!frozen && (
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/10 backdrop-blur-md">
                  <ShieldCheck
                    size={14}
                    className="text-white/80"
                  />
                </div>
              )}

              <Wifi
                size={24}
                className="rotate-90 text-white/80"
              />
            </div>
          </div>

          {/* =================================================
              CHIP
          ================================================= */}

          <div className="mt-7">
            <div className="relative h-8 w-12 overflow-hidden rounded-md border border-yellow-100/30 bg-gradient-to-br from-yellow-100 via-yellow-300 to-yellow-500 shadow-lg">
              <div className="absolute left-1/2 top-0 h-full w-px bg-yellow-700/20" />

              <div className="absolute left-0 top-1/2 h-px w-full bg-yellow-700/20" />

              <div className="absolute left-1/2 top-1/2 h-4 w-5 -translate-x-1/2 -translate-y-1/2 rounded border border-yellow-700/20" />
            </div>
          </div>

          {/* =================================================
              CARD NUMBER
          ================================================= */}

          <div className="mt-4">
            <p className="mb-1 text-[8px] font-medium uppercase tracking-[0.18em] text-white/40">
              Card Number
            </p>

            <h3 className="font-mono text-[17px] font-semibold tracking-[0.19em] text-white drop-shadow-sm sm:text-lg">
              {number}
            </h3>
          </div>

          {/* =================================================
              BOTTOM DETAILS
          ================================================= */}

          <div className="mt-auto flex items-end justify-between gap-4">
            {/* Holder */}

            <div className="min-w-0">
              <p className="text-[8px] font-medium uppercase tracking-[0.18em] text-white/45">
                Card Holder
              </p>

              <p className="mt-1 truncate text-[11px] font-bold tracking-[0.08em] text-white">
                {holder}
              </p>
            </div>

            {/* Expiry */}

            <div className="shrink-0">
              <p className="text-[8px] font-medium uppercase tracking-[0.18em] text-white/45">
                Expires
              </p>

              <p className="mt-1 text-[11px] font-bold tracking-wider text-white">
                {expiry}
              </p>
            </div>

            {/* Contactless */}

            <div className="flex shrink-0 items-center gap-1.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/10">
                <Sparkles
                  size={12}
                  className="text-white/70"
                />
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            SECURITY BADGE
        ===================================================== */}

        {!frozen && (
          <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/10 px-2.5 py-1 backdrop-blur-md">
            <LockKeyhole
              size={9}
              className="text-white/50"
            />

            <span className="text-[8px] font-bold uppercase tracking-[0.12em] text-white/50">
              Secure
            </span>
          </div>
        )}

        {/* =====================================================
            FROZEN ICON
        ===================================================== */}

        {frozen && (
          <div className="absolute bottom-4 right-4 z-20 flex h-8 w-8 items-center justify-center rounded-xl border border-blue-300/10 bg-blue-400/10">
            <Snowflake
              size={14}
              className="text-blue-300"
            />
          </div>
        )}
      </div>

      {/* =====================================================
          HOVER BORDER
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 rounded-[28px] border border-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </motion.div>
  );
};

export default BankCard;