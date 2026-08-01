import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  CreditCard,
  Info,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

const AddCardModal = ({ open, close, createCard }) => {
  const [form, setForm] = useState({
    type: "",
    limit: "",
    validity: "",
    interest: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) {
      setForm({
        type: "",
        limit: "",
        validity: "",
        interest: "",
      });

      setError("");
    }
  }, [open]);

  const selectedCardInfo = useMemo(() => {
    const cardMap = {
      "Platinum Card": {
        gradient: "from-blue-600 via-blue-500 to-cyan-400",
        description: "Premium spending & lifestyle benefits",
      },
      "Credit Card": {
        gradient: "from-purple-600 via-violet-600 to-indigo-600",
        description: "Flexible credit with smart repayment",
      },
      "Debit Card": {
        gradient: "from-emerald-500 via-green-500 to-teal-500",
        description: "Direct access to your bank balance",
      },
    };

    return (
      cardMap[form.type] || {
        gradient: "from-slate-700 to-slate-800",
        description: "Select a card to preview its benefits",
      }
    );
  }, [form.type]);

  const updateField = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const submitCard = () => {
    if (
      !form.type ||
      !form.limit ||
      !form.validity ||
      !form.interest
    ) {
      setError("Please complete all card details before continuing.");
      return;
    }

    createCard(form);

    setForm({
      type: "",
      limit: "",
      validity: "",
      interest: "",
    });

    setError("");
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/75 px-4 py-8 backdrop-blur-md sm:px-6"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) {
            close();
          }
        }}
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: 20,
            scale: 0.97,
          }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
          className="relative my-auto w-full max-w-2xl overflow-hidden rounded-[30px] border border-white/[0.09] bg-[#07101f] text-white shadow-2xl shadow-black/60"
        >
          {/* ==========================================
              AMBIENT GLOW
          ========================================== */}

          <div className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full bg-cyan-500/[0.08] blur-[100px]" />

          <div className="pointer-events-none absolute -bottom-32 -left-28 h-72 w-72 rounded-full bg-blue-600/[0.08] blur-[100px]" />

          {/* ==========================================
              HEADER
          ========================================== */}

          <div className="relative flex items-start justify-between border-b border-white/[0.06] px-6 py-6 sm:px-7">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.08] text-cyan-400">
                <CreditCard size={21} />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                    Add New Card
                  </h2>

                  <span className="hidden rounded-full border border-cyan-400/10 bg-cyan-400/[0.06] px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-cyan-400 sm:inline-flex">
                    SmartBank
                  </span>
                </div>

                <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                  Configure your new payment card securely.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={close}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.025] text-slate-500 transition-all duration-200 hover:border-white/[0.12] hover:bg-white/[0.06] hover:text-white"
              aria-label="Close add card modal"
            >
              <X size={18} />
            </button>
          </div>

          {/* ==========================================
              BODY
          ========================================== */}

          <div className="relative max-h-[75vh] overflow-y-auto px-6 py-6 sm:px-7">
            {/* CARD PREVIEW */}

            <div className="mb-7">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-600">
                    Live Preview
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Your card appearance will update automatically.
                  </p>
                </div>

                <Sparkles size={16} className="text-cyan-400" />
              </div>

              <div
                className={`relative h-48 overflow-hidden rounded-[24px] bg-gradient-to-br ${selectedCardInfo.gradient} p-5 shadow-xl`}
              >
                <div className="pointer-events-none absolute -right-12 -top-16 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

                <div className="pointer-events-none absolute -bottom-20 left-1/3 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

                <div className="relative flex h-full flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 backdrop-blur-md">
                        <CreditCard size={17} />
                      </div>

                      <div>
                        <p className="text-[9px] uppercase tracking-[0.15em] text-white/60">
                          SmartBank
                        </p>

                        <p className="text-xs font-bold">
                          {form.type || "Payment Card"}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-[9px] font-semibold backdrop-blur-md">
                      {form.validity || "Validity"}
                    </div>
                  </div>

                  <div>
                    <div className="mb-3 h-7 w-10 rounded-md border border-yellow-200/30 bg-yellow-300/80 shadow-inner" />

                    <p className="font-mono text-sm font-semibold tracking-[0.22em] text-white/90">
                      4589 •••• •••• 7821
                    </p>

                    <div className="mt-3 flex items-end justify-between">
                      <div>
                        <p className="text-[7px] uppercase tracking-wider text-white/50">
                          Card Holder
                        </p>

                        <p className="mt-0.5 text-[10px] font-semibold">
                          SMARTBANK USER
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-[7px] uppercase tracking-wider text-white/50">
                          Limit
                        </p>

                        <p className="mt-0.5 text-[10px] font-semibold">
                          {form.limit || "—"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-2 text-xs text-slate-600">
                {selectedCardInfo.description}
              </p>
            </div>

            {/* ==========================================
                FORM
            ========================================== */}

            <div className="grid gap-5 sm:grid-cols-2">
              {/* CARD TYPE */}

              <div>
                <label
                  htmlFor="card-type"
                  className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500"
                >
                  Card Type
                </label>

                <div className="relative">
                  <select
                    id="card-type"
                    value={form.type}
                    onChange={(event) =>
                      updateField("type", event.target.value)
                    }
                    className="w-full appearance-none rounded-xl border border-white/[0.08] bg-white/[0.035] px-4 py-3.5 pr-10 text-sm font-medium text-white outline-none transition-all duration-200 hover:border-white/[0.12] focus:border-cyan-400/40 focus:bg-white/[0.05] focus:ring-2 focus:ring-cyan-400/10"
                  >
                    <option value="" className="bg-slate-900">
                      Select Card Type
                    </option>

                    <option
                      value="Platinum Card"
                      className="bg-slate-900"
                    >
                      Platinum Card
                    </option>

                    <option
                      value="Credit Card"
                      className="bg-slate-900"
                    >
                      Credit Card
                    </option>

                    <option
                      value="Debit Card"
                      className="bg-slate-900"
                    >
                      Debit Card
                    </option>
                  </select>

                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                </div>
              </div>

              {/* LIMIT */}

              <div>
                <label
                  htmlFor="card-limit"
                  className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500"
                >
                  Spending Limit
                </label>

                <div className="relative">
                  <select
                    id="card-limit"
                    value={form.limit}
                    onChange={(event) =>
                      updateField("limit", event.target.value)
                    }
                    className="w-full appearance-none rounded-xl border border-white/[0.08] bg-white/[0.035] px-4 py-3.5 pr-10 text-sm font-medium text-white outline-none transition-all duration-200 hover:border-white/[0.12] focus:border-cyan-400/40 focus:bg-white/[0.05] focus:ring-2 focus:ring-cyan-400/10"
                  >
                    <option value="" className="bg-slate-900">
                      Select Limit
                    </option>

                    <option value="$25,000" className="bg-slate-900">
                      $25,000
                    </option>

                    <option value="$50,000" className="bg-slate-900">
                      $50,000
                    </option>

                    <option value="$100,000" className="bg-slate-900">
                      $100,000
                    </option>

                    <option value="$500,000" className="bg-slate-900">
                      $500,000
                    </option>
                  </select>

                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                </div>
              </div>

              {/* VALIDITY */}

              <div>
                <label
                  htmlFor="card-validity"
                  className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500"
                >
                  Card Validity
                </label>

                <div className="relative">
                  <select
                    id="card-validity"
                    value={form.validity}
                    onChange={(event) =>
                      updateField("validity", event.target.value)
                    }
                    className="w-full appearance-none rounded-xl border border-white/[0.08] bg-white/[0.035] px-4 py-3.5 pr-10 text-sm font-medium text-white outline-none transition-all duration-200 hover:border-white/[0.12] focus:border-cyan-400/40 focus:bg-white/[0.05] focus:ring-2 focus:ring-cyan-400/10"
                  >
                    <option value="" className="bg-slate-900">
                      Select Validity
                    </option>

                    <option value="3 Years" className="bg-slate-900">
                      3 Years
                    </option>

                    <option value="5 Years" className="bg-slate-900">
                      5 Years
                    </option>

                    <option value="7 Years" className="bg-slate-900">
                      7 Years
                    </option>
                  </select>

                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                </div>
              </div>

              {/* INTEREST */}

              <div>
                <label
                  htmlFor="card-interest"
                  className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500"
                >
                  Interest Rate
                </label>

                <div className="relative">
                  <select
                    id="card-interest"
                    value={form.interest}
                    onChange={(event) =>
                      updateField("interest", event.target.value)
                    }
                    className="w-full appearance-none rounded-xl border border-white/[0.08] bg-white/[0.035] px-4 py-3.5 pr-10 text-sm font-medium text-white outline-none transition-all duration-200 hover:border-white/[0.12] focus:border-cyan-400/40 focus:bg-white/[0.05] focus:ring-2 focus:ring-cyan-400/10"
                  >
                    <option value="" className="bg-slate-900">
                      Select Interest Rate
                    </option>

                    <option value="0%" className="bg-slate-900">
                      0%
                    </option>

                    <option value="12%" className="bg-slate-900">
                      12%
                    </option>

                    <option value="18%" className="bg-slate-900">
                      18%
                    </option>

                    <option value="24%" className="bg-slate-900">
                      24%
                    </option>
                  </select>

                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                </div>
              </div>
            </div>

            {/* ERROR */}

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{
                    opacity: 0,
                    height: 0,
                    y: -5,
                  }}
                  animate={{
                    opacity: 1,
                    height: "auto",
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                    y: -5,
                  }}
                  className="mt-5 overflow-hidden"
                >
                  <div className="flex items-center gap-3 rounded-xl border border-red-400/10 bg-red-400/[0.06] px-4 py-3">
                    <AlertCircle
                      size={16}
                      className="shrink-0 text-red-400"
                    />

                    <p className="text-xs font-medium text-red-300">
                      {error}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ==========================================
                SECURITY INFO
            ========================================== */}

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck
                    size={14}
                    className="text-emerald-400"
                  />

                  <span className="text-[10px] font-semibold text-slate-400">
                    Secure
                  </span>
                </div>

                <p className="mt-2 text-[9px] leading-4 text-slate-600">
                  Protected card management
                </p>
              </div>

              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                <div className="flex items-center gap-2">
                  <LockKeyhole
                    size={14}
                    className="text-cyan-400"
                  />

                  <span className="text-[10px] font-semibold text-slate-400">
                    Encrypted
                  </span>
                </div>

                <p className="mt-2 text-[9px] leading-4 text-slate-600">
                  Payment details stay protected
                </p>
              </div>

              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2
                    size={14}
                    className="text-blue-400"
                  />

                  <span className="text-[10px] font-semibold text-slate-400">
                    Instant
                  </span>
                </div>

                <p className="mt-2 text-[9px] leading-4 text-slate-600">
                  Ready after card creation
                </p>
              </div>
            </div>

            {/* ==========================================
                NOTICE
            ========================================== */}

            <div className="mt-5 flex gap-3 rounded-xl border border-blue-400/10 bg-blue-400/[0.035] p-4">
              <Info
                size={15}
                className="mt-0.5 shrink-0 text-blue-400"
              />

              <p className="text-[10px] leading-5 text-slate-500">
                Card limits and interest rates shown here are
                demo values for the SmartBank AI portfolio
                interface. Production values will be fetched
                securely from the banking backend.
              </p>
            </div>
          </div>

          {/* ==========================================
              FOOTER
          ========================================== */}

          <div className="relative flex flex-col-reverse gap-3 border-t border-white/[0.06] bg-white/[0.015] px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <button
              type="button"
              onClick={close}
              className="rounded-xl border border-white/[0.08] bg-white/[0.025] px-5 py-3 text-sm font-semibold text-slate-400 transition-all duration-200 hover:border-white/[0.14] hover:bg-white/[0.05] hover:text-white"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={submitCard}
              className="group flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-300 hover:shadow-cyan-500/20"
            >
              <CreditCard
                size={16}
                className="transition-transform duration-300 group-hover:-rotate-6"
              />

              Create Card
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddCardModal;