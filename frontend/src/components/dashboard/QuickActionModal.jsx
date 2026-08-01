import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  X,
  Send,
  PlusCircle,
  Receipt,
  CreditCard,
  ArrowRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Sparkles,
  ArrowDownToLine,
  ArrowUpFromLine,
  WalletCards,
} from "lucide-react";

import api from "../../services/api";

const QuickActionModal = ({
  open,
  close,
  title,
  accountId,
  accounts = [],
}) => {
  const [amount, setAmount] = useState("");
  const [details, setDetails] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  if (!open) return null;

  // =========================
  // ACTION CONFIG
  // =========================

  const getActionConfig = () => {
    switch (title) {
      case "Transfer Money":
        return {
          icon: Send,
          label: "Transfer",
          eyebrow: "Send Money",
          description:
            "Move money securely to another SmartBank account.",
          gradient: "from-blue-600 via-indigo-600 to-cyan-500",
          glow: "bg-cyan-500/20",
          iconBg: "bg-cyan-400/10",
          iconColor: "text-cyan-300",
        };

      case "Deposit Money":
        return {
          icon: ArrowDownToLine,
          label: "Deposit",
          eyebrow: "Add Money",
          description:
            "Add funds securely to your selected account.",
          gradient: "from-emerald-500 via-teal-500 to-cyan-500",
          glow: "bg-emerald-400/20",
          iconBg: "bg-emerald-400/10",
          iconColor: "text-emerald-300",
        };

      case "Withdraw Money":
        return {
          icon: ArrowUpFromLine,
          label: "Withdraw",
          eyebrow: "Withdraw Funds",
          description:
            "Withdraw funds from your selected account.",
          gradient: "from-orange-500 via-amber-500 to-red-500",
          glow: "bg-orange-400/20",
          iconBg: "bg-orange-400/10",
          iconColor: "text-orange-300",
        };

      case "Pay Bills":
        return {
          icon: Receipt,
          label: "Pay Bill",
          eyebrow: "Bill Payment",
          description:
            "Manage your upcoming payments and bills.",
          gradient: "from-violet-600 via-purple-600 to-fuchsia-500",
          glow: "bg-purple-500/20",
          iconBg: "bg-purple-400/10",
          iconColor: "text-purple-300",
        };

      case "Manage Cards":
        return {
          icon: WalletCards,
          label: "Manage",
          eyebrow: "Card Management",
          description:
            "Manage your SmartBank cards and card settings.",
          gradient: "from-slate-700 via-blue-700 to-indigo-600",
          glow: "bg-blue-500/20",
          iconBg: "bg-blue-400/10",
          iconColor: "text-blue-300",
        };

      default:
        return {
          icon: CreditCard,
          label: "Action",
          eyebrow: "Quick Action",
          description:
            "Continue with your selected banking action.",
          gradient: "from-blue-600 to-cyan-400",
          glow: "bg-cyan-500/20",
          iconBg: "bg-cyan-400/10",
          iconColor: "text-cyan-300",
        };
    }
  };

  const config = getActionConfig();
  const Icon = config.icon;

  // =========================
  // RESET
  // =========================

  const resetForm = () => {
    setAmount("");
    setDetails("");
    setSuccess("");
    setError("");
  };

  // =========================
  // CLOSE
  // =========================

  const handleClose = () => {
    if (loading) return;

    resetForm();
    close();
  };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (
      title !== "Manage Cards" &&
      title !== "Pay Bills" &&
      (!amount || Number(amount) <= 0)
    ) {
      setError("Please enter a valid amount.");
      return;
    }

    if (
      !accountId &&
      title !== "Manage Cards" &&
      title !== "Pay Bills"
    ) {
      setError(
        "No account selected. Please select an account and try again."
      );
      return;
    }

    setLoading(true);

    try {
      let response;

      // =========================
      // DEPOSIT
      // =========================

      if (title === "Deposit Money") {
        response = await api.post("/transactions/deposit", {
          accountId,
          amount: Number(amount),
        });
      }

      // =========================
      // WITHDRAW
      // =========================

      else if (title === "Withdraw Money") {
        response = await api.post("/transactions/withdraw", {
          accountId,
          amount: Number(amount),
        });
      }

      // =========================
      // TRANSFER
      // =========================

      else if (title === "Transfer Money") {
        if (!details.trim()) {
          setError("Please enter the receiver account ID.");
          setLoading(false);
          return;
        }

        if (details.trim() === String(accountId)) {
          setError(
            "You cannot transfer money to the same account."
          );
          setLoading(false);
          return;
        }

        response = await api.post("/transactions/transfer", {
          fromAccountId: accountId,
          toAccountId: details.trim(),
          amount: Number(amount),
        });
      }

      // =========================
      // OTHER ACTIONS
      // =========================

      else {
        setSuccess(
          `${title} is ready for the next banking module.`
        );

        setLoading(false);
        return;
      }

      // =========================
      // SUCCESS
      // =========================

      if (response?.data?.success) {
        setSuccess(
          response.data.message ||
            `${title} completed successfully.`
        );

        window.dispatchEvent(
          new Event("dashboardUpdated")
        );

        setTimeout(() => {
          resetForm();
          close();
        }, 1500);
      } else {
        setError(
          response?.data?.message ||
            "Something went wrong. Please try again."
        );
      }
    } catch (err) {
      console.error("QUICK ACTION ERROR:", err);

      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Transaction failed. Please try again.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            overflow-y-auto
            bg-slate-950/80
            px-4
            py-8
            backdrop-blur-xl
          "
        >
          {/* Ambient Background */}

          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div
              className={`
                absolute
                left-1/2
                top-1/2
                h-[420px]
                w-[420px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                ${config.glow}
                opacity-40
                blur-[120px]
              `}
            />
          </div>

          {/* Modal */}

          <motion.div
            initial={{
              opacity: 0,
              y: 35,
              scale: 0.94,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.96,
            }}
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            onClick={(e) => e.stopPropagation()}
            className="
              relative
              w-full
              max-w-lg
              overflow-hidden
              rounded-[32px]
              border
              border-white/[0.12]
              bg-[#07111f]/95
              text-white
              shadow-[0_30px_100px_rgba(0,0,0,0.55)]
              backdrop-blur-2xl
            "
          >
            {/* Top Gradient */}

            <div
              className={`
                absolute
                inset-x-0
                top-0
                h-1
                bg-gradient-to-r
                ${config.gradient}
              `}
            />

            {/* Decorative Glow */}

            <div
              className={`
                pointer-events-none
                absolute
                -right-24
                -top-24
                h-64
                w-64
                rounded-full
                ${config.glow}
                blur-3xl
              `}
            />

            <div className="relative p-6 sm:p-7">
              {/* =========================
                  HEADER
              ========================= */}

              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                    }}
                    transition={{
                      delay: 0.1,
                    }}
                    className={`
                      flex
                      h-14
                      w-14
                      shrink-0
                      items-center
                      justify-center
                      rounded-2xl
                      border
                      border-white/10
                      ${config.iconBg}
                      ${config.iconColor}
                      shadow-lg
                    `}
                  >
                    <Icon
                      size={25}
                      strokeWidth={1.8}
                    />
                  </motion.div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`
                          text-[10px]
                          font-bold
                          uppercase
                          tracking-[0.22em]
                          ${config.iconColor}
                        `}
                      >
                        {config.eyebrow}
                      </span>

                      <Sparkles
                        size={11}
                        className="text-yellow-300"
                      />
                    </div>

                    <h2
                      className="
                        mt-1
                        text-2xl
                        font-bold
                        tracking-tight
                        text-white
                      "
                    >
                      {title}
                    </h2>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleClose}
                  disabled={loading}
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-white/10
                    bg-white/[0.04]
                    text-slate-400
                    transition-all
                    duration-200
                    hover:border-white/20
                    hover:bg-white/[0.08]
                    hover:text-white
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                  "
                >
                  <X size={19} />
                </button>
              </div>

              {/* =========================
                  DESCRIPTION
              ========================= */}

              <div
                className="
                  mt-6
                  rounded-2xl
                  border
                  border-white/[0.07]
                  bg-white/[0.025]
                  px-4
                  py-3
                "
              >
                <p className="text-sm leading-6 text-slate-400">
                  {config.description}
                </p>
              </div>

              {/* =========================
                  ACCOUNT INFO
              ========================= */}

              {accountId &&
                title !== "Manage Cards" &&
                title !== "Pay Bills" && (
                  <div
                    className="
                      mt-4
                      flex
                      items-center
                      justify-between
                      rounded-2xl
                      border
                      border-white/[0.07]
                      bg-slate-900/40
                      px-4
                      py-3
                    "
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-xl
                          bg-white/5
                          text-slate-400
                        "
                      >
                        <CreditCard size={17} />
                      </div>

                      <div>
                        <p className="text-[9px] uppercase tracking-[0.18em] text-slate-500">
                          Selected Account
                        </p>

                        <p className="mt-0.5 text-xs font-semibold text-slate-300">
                          Account #{String(accountId).slice(-8)}
                        </p>
                      </div>
                    </div>

                    <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-green-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                      Ready
                    </span>
                  </div>
                )}

              {/* =========================
                  ERROR
              ========================= */}

              <AnimatePresence mode="wait">
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
                    className="
                      mt-4
                      flex
                      items-start
                      gap-3
                      overflow-hidden
                      rounded-2xl
                      border
                      border-red-400/15
                      bg-red-500/[0.08]
                      p-4
                    "
                  >
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                      <AlertCircle size={17} />
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-red-300">
                        Action failed
                      </p>

                      <p className="mt-1 text-xs leading-5 text-red-300/70">
                        {error}
                      </p>
                    </div>
                  </motion.div>
                )}

                {success && (
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
                    className="
                      mt-4
                      flex
                      items-start
                      gap-3
                      overflow-hidden
                      rounded-2xl
                      border
                      border-emerald-400/15
                      bg-emerald-500/[0.08]
                      p-4
                    "
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                      <CheckCircle2 size={17} />
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-emerald-300">
                        Transaction successful
                      </p>

                      <p className="mt-1 text-xs leading-5 text-emerald-300/70">
                        {success}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* =========================
                  FORM
              ========================= */}

              <div className="mt-6 space-y-5">
                {/* Amount */}

                {title !== "Manage Cards" &&
                  title !== "Pay Bills" && (
                    <div>
                      <div className="mb-2.5 flex items-center justify-between">
                        <label className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                          Amount
                        </label>

                        <span className="text-[10px] text-slate-600">
                          INR
                        </span>
                      </div>

                      <div className="group/input relative">
                        <span
                          className="
                            absolute
                            left-4
                            top-1/2
                            -translate-y-1/2
                            text-sm
                            font-semibold
                            text-slate-500
                            transition
                            group-focus-within/input:text-cyan-400
                          "
                        >
                          ₹
                        </span>

                        <input
                          type="number"
                          min="0"
                          value={amount}
                          onChange={(e) =>
                            setAmount(e.target.value)
                          }
                          placeholder="0.00"
                          disabled={loading}
                          className="
                            w-full
                            rounded-2xl
                            border
                            border-white/[0.09]
                            bg-white/[0.035]
                            py-4
                            pl-9
                            pr-4
                            text-lg
                            font-semibold
                            text-white
                            outline-none
                            transition-all
                            duration-200
                            placeholder:text-slate-700
                            hover:border-white/[0.14]
                            focus:border-cyan-400/40
                            focus:bg-white/[0.05]
                            focus:ring-4
                            focus:ring-cyan-400/[0.06]
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                          "
                        />
                      </div>
                    </div>
                  )}

                {/* Details */}

                {title !== "Manage Cards" && (
                  <div>
                    <div className="mb-2.5 flex items-center justify-between">
                      <label className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                        {title === "Transfer Money"
                          ? "Receiver Account"
                          : "Details"}
                      </label>

                      {title === "Transfer Money" && (
                        <span className="text-[10px] text-slate-600">
                          Account ID
                        </span>
                      )}
                    </div>

                    <input
                      type="text"
                      value={details}
                      onChange={(e) =>
                        setDetails(e.target.value)
                      }
                      placeholder={
                        title === "Transfer Money"
                          ? "Enter receiver account ID"
                          : "Enter account or payment details"
                      }
                      disabled={loading}
                      className="
                        w-full
                        rounded-2xl
                        border
                        border-white/[0.09]
                        bg-white/[0.035]
                        px-4
                        py-4
                        text-sm
                        text-white
                        outline-none
                        transition-all
                        duration-200
                        placeholder:text-slate-700
                        hover:border-white/[0.14]
                        focus:border-cyan-400/40
                        focus:bg-white/[0.05]
                        focus:ring-4
                        focus:ring-cyan-400/[0.06]
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                      "
                    />
                  </div>
                )}

                {/* Manage Cards */}

                {title === "Manage Cards" && (
                  <div
                    className="
                      rounded-2xl
                      border
                      border-blue-400/10
                      bg-gradient-to-br
                      from-blue-500/[0.08]
                      to-cyan-500/[0.04]
                      p-5
                    "
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-400/10 text-blue-300">
                        <CreditCard size={19} />
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-white">
                          Card controls are coming soon
                        </h3>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          Freeze, unfreeze and manage your
                          SmartBank cards from this section.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* =========================
                    CONFIRM BUTTON
                ========================= */}

                <motion.button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  whileHover={{
                    y: loading ? 0 : -2,
                  }}
                  whileTap={{
                    scale: loading ? 1 : 0.98,
                  }}
                  className={`
                    group/btn
                    relative
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2.5
                    overflow-hidden
                    rounded-2xl
                    bg-gradient-to-r
                    ${config.gradient}
                    py-4
                    text-sm
                    font-bold
                    text-white
                    shadow-xl
                    transition-all
                    duration-300
                    hover:shadow-2xl
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  `}
                >
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 opacity-0 transition duration-500 group-hover/btn:translate-x-full group-hover/btn:opacity-100" />

                  {loading ? (
                    <>
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />
                      Processing securely...
                    </>
                  ) : (
                    <>
                      {title === "Manage Cards"
                        ? "Open Card Management"
                        : `Confirm ${config.label}`}

                      <ArrowRight
                        size={18}
                        className="transition-transform duration-200 group-hover/btn:translate-x-1"
                      />
                    </>
                  )}
                </motion.button>
              </div>

              {/* =========================
                  SECURITY FOOTER
              ========================= */}

              <div className="mt-6 flex items-center justify-center gap-2">
                <ShieldCheck
                  size={13}
                  className="text-emerald-400"
                />

                <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-slate-600">
                  Secured by SmartBank AI
                </span>

                <span className="h-1 w-1 rounded-full bg-slate-700" />

                <span className="text-[10px] text-slate-600">
                  Encrypted
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuickActionModal;