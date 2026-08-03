import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  X,
  Send,
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
  ChevronDown,
  CircleDollarSign,
  Wallet,
  LockKeyhole,
  Info,
  RefreshCw,
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

  const [selectedAccountId, setSelectedAccountId] = useState(
    accountId || ""
  );

  const [availableAccounts, setAvailableAccounts] =
    useState(accounts);

  const [accountsLoading, setAccountsLoading] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // =========================================================
  // ACTION TYPE
  // =========================================================

  const isTransactionAction =
    title === "Transfer Money" ||
    title === "Deposit Money" ||
    title === "Withdraw Money";

  const requiresAmount =
    title !== "Manage Cards" &&
    title !== "Pay Bills";

  // =========================================================
  // ACTION CONFIG
  // =========================================================

  const config = useMemo(() => {
    switch (title) {
      case "Transfer Money":
        return {
          icon: Send,
          label: "Transfer",
          eyebrow: "Money Transfer",
          description:
            "Send money securely from your SmartBank account to another account.",
          gradient:
            "from-blue-600 via-indigo-600 to-cyan-500",
          glow: "bg-cyan-500/20",
          iconBg: "bg-cyan-400/10",
          iconColor: "text-cyan-300",
          accent: "cyan",
        };

      case "Deposit Money":
        return {
          icon: ArrowDownToLine,
          label: "Deposit",
          eyebrow: "Add Funds",
          description:
            "Add funds to your selected SmartBank account securely.",
          gradient:
            "from-emerald-500 via-teal-500 to-cyan-500",
          glow: "bg-emerald-400/20",
          iconBg: "bg-emerald-400/10",
          iconColor: "text-emerald-300",
          accent: "emerald",
        };

      case "Withdraw Money":
        return {
          icon: ArrowUpFromLine,
          label: "Withdraw",
          eyebrow: "Withdraw Funds",
          description:
            "Withdraw available funds from your selected SmartBank account.",
          gradient:
            "from-orange-500 via-amber-500 to-red-500",
          glow: "bg-orange-400/20",
          iconBg: "bg-orange-400/10",
          iconColor: "text-orange-300",
          accent: "orange",
        };

      case "Pay Bills":
        return {
          icon: Receipt,
          label: "Pay Bill",
          eyebrow: "Bill Payments",
          description:
            "Manage your upcoming utility and recurring payments.",
          gradient:
            "from-violet-600 via-purple-600 to-fuchsia-500",
          glow: "bg-purple-500/20",
          iconBg: "bg-purple-400/10",
          iconColor: "text-purple-300",
          accent: "purple",
        };

      case "Manage Cards":
        return {
          icon: WalletCards,
          label: "Manage",
          eyebrow: "Card Management",
          description:
            "Access your SmartBank card controls and card settings.",
          gradient:
            "from-slate-700 via-blue-700 to-indigo-600",
          glow: "bg-blue-500/20",
          iconBg: "bg-blue-400/10",
          iconColor: "text-blue-300",
          accent: "blue",
        };

      default:
        return {
          icon: CreditCard,
          label: "Continue",
          eyebrow: "Quick Action",
          description:
            "Continue with your selected SmartBank action.",
          gradient:
            "from-blue-600 to-cyan-400",
          glow: "bg-cyan-500/20",
          iconBg: "bg-cyan-400/10",
          iconColor: "text-cyan-300",
          accent: "cyan",
        };
    }
  }, [title]);

  const Icon = config.icon;

  // =========================================================
  // SELECTED ACCOUNT
  // =========================================================

  const selectedAccount = useMemo(
    () =>
      availableAccounts.find(
        (account) => account?.id === selectedAccountId
      ),
    [availableAccounts, selectedAccountId]
  );

  const selectedBalance = Number(
    selectedAccount?.balance || 0
  );

  // =========================================================
  // ACCOUNT LABEL
  // =========================================================

  const getAccountLabel = (account) => {
    if (!account) {
      return "Account";
    }

    const accountType =
      account?.accountType ||
      account?.type ||
      "Account";

    const accountNumber =
      account?.accountNumber ||
      account?.id ||
      "";

    const stringNumber = String(accountNumber);

    const maskedNumber =
      stringNumber.length > 8
        ? `•••• ${stringNumber.slice(-4)}`
        : stringNumber;

    return `${accountType} · ${maskedNumber}`;
  };

  const formatCurrency = (value) => {
    return Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // =========================================================
  // FETCH ACCOUNTS
  // =========================================================

  const loadAccounts = async () => {
    if (!open || !isTransactionAction) {
      return;
    }

    try {
      setAccountsLoading(true);
      setError("");

      if (Array.isArray(accounts) && accounts.length > 0) {
        setAvailableAccounts(accounts);

        const requestedAccountExists =
          accountId &&
          accounts.some(
            (account) => account?.id === accountId
          );

        if (requestedAccountExists) {
          setSelectedAccountId(accountId);
        } else if (accounts[0]?.id) {
          setSelectedAccountId(accounts[0].id);
        } else {
          setSelectedAccountId("");
        }

        return;
      }

      const response = await api.get("/accounts");

      const fetchedAccounts = Array.isArray(
        response?.data?.data
      )
        ? response.data.data
        : [];

      setAvailableAccounts(fetchedAccounts);

      const requestedAccountExists =
        accountId &&
        fetchedAccounts.some(
          (account) => account?.id === accountId
        );

      if (requestedAccountExists) {
        setSelectedAccountId(accountId);
      } else if (fetchedAccounts[0]?.id) {
        setSelectedAccountId(fetchedAccounts[0].id);
      } else {
        setSelectedAccountId("");
      }
    } catch (err) {
      console.error(
        "QUICK ACTION ACCOUNT FETCH ERROR:",
        err?.response?.data || err?.message
      );

      setAvailableAccounts([]);
      setSelectedAccountId("");

      setError(
        err?.response?.data?.message ||
          "Unable to load your accounts. Please try again."
      );
    } finally {
      setAccountsLoading(false);
    }
  };

  useEffect(() => {
    if (!open) {
      return;
    }

    loadAccounts();
  }, [open, accountId]);

  // =========================================================
  // RESET
  // =========================================================

  const resetForm = () => {
    setAmount("");
    setDetails("");
    setSuccess("");
    setError("");

    if (accountId) {
      setSelectedAccountId(accountId);
    } else if (availableAccounts[0]?.id) {
      setSelectedAccountId(availableAccounts[0].id);
    } else {
      setSelectedAccountId("");
    }
  };

  // =========================================================
  // CLOSE
  // =========================================================

  const handleClose = () => {
    if (loading) {
      return;
    }

    resetForm();
    close();
  };

  // =========================================================
  // ESCAPE KEY
  // =========================================================

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape" && !loading) {
        handleClose();
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [open, loading]);

  // =========================================================
  // AMOUNT HANDLER
  // =========================================================

  const handleAmountChange = (event) => {
    const value = event.target.value;

    if (value === "") {
      setAmount("");
      setError("");
      return;
    }

    if (!/^\d*\.?\d{0,2}$/.test(value)) {
      return;
    }

    setAmount(value);
    setError("");
  };

  // =========================================================
  // VALIDATION
  // =========================================================

  const validateTransaction = () => {
    if (!selectedAccountId) {
      return "Please select an account before continuing.";
    }

    const numericAmount = Number(amount);

    if (
      !amount ||
      !Number.isFinite(numericAmount) ||
      numericAmount <= 0
    ) {
      return "Please enter a valid amount greater than zero.";
    }

    if (numericAmount > 10000000) {
      return "For security, the maximum transaction amount is ₹1,00,00,000.";
    }

    if (
      title === "Withdraw Money" &&
      numericAmount > selectedBalance
    ) {
      return `Insufficient balance. Available balance is ₹${formatCurrency(
        selectedBalance
      )}.`;
    }

    if (title === "Transfer Money") {
      const receiver = details.trim();

      if (!receiver) {
        return "Please enter the receiver account ID.";
      }

      if (receiver === String(selectedAccountId)) {
        return "You cannot transfer money to the same account.";
      }
    }

    return "";
  };

  // =========================================================
  // SUBMIT
  // =========================================================

  const handleSubmit = async () => {
    if (loading) {
      return;
    }

    setError("");
    setSuccess("");

    // =======================================================
    // SPECIAL MODULES
    // =======================================================

    if (title === "Manage Cards") {
      setSuccess(
        "Card management workspace is ready for the next banking module."
      );

      return;
    }

    if (title === "Pay Bills") {
      setSuccess(
        "Bill payment workspace is ready for the next banking module."
      );

      return;
    }

    // =======================================================
    // VALIDATION
    // =======================================================

    const validationError =
      validateTransaction();

    if (validationError) {
      setError(validationError);
      return;
    }

    const numericAmount = Number(amount);

    setLoading(true);

    try {
      let response;

      // =====================================================
      // DEPOSIT
      // =====================================================

      if (title === "Deposit Money") {
        response = await api.post(
          "/transactions/deposit",
          {
            accountId: selectedAccountId,
            amount: numericAmount,
          }
        );
      }

      // =====================================================
      // WITHDRAW
      // =====================================================

      else if (title === "Withdraw Money") {
        response = await api.post(
          "/transactions/withdraw",
          {
            accountId: selectedAccountId,
            amount: numericAmount,
          }
        );
      }

      // =====================================================
      // TRANSFER
      // =====================================================

      else if (title === "Transfer Money") {
        response = await api.post(
          "/transactions/transfer",
          {
            fromAccountId: selectedAccountId,
            toAccountId: details.trim(),
            amount: numericAmount,
          }
        );
      }

      // =====================================================
      // SUCCESS
      // =====================================================

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
        }, 1600);
      } else {
        setError(
          response?.data?.message ||
            "Something went wrong. Please try again."
        );
      }
    } catch (err) {
      console.error(
        "QUICK ACTION ERROR:",
        err?.response?.data || err
      );

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

  // =========================================================
  // BUTTON LABEL
  // =========================================================

  const getButtonLabel = () => {
    if (title === "Manage Cards") {
      return "Open Card Management";
    }

    if (title === "Pay Bills") {
      return "Open Bill Payments";
    }

    return `Confirm ${config.label}`;
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={handleClose}
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            overflow-y-auto
            bg-slate-950/85
            px-4
            py-6
            backdrop-blur-xl
            sm:px-6
            sm:py-10
          "
        >
          {/* =================================================
              AMBIENT BACKGROUND
          ================================================= */}

          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div
              className={`
                absolute
                left-1/2
                top-1/2
                h-[360px]
                w-[360px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                ${config.glow}
                opacity-30
                blur-[110px]
                sm:h-[520px]
                sm:w-[520px]
              `}
            />

            <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-blue-500/[0.04] blur-3xl" />
            <div className="absolute bottom-0 right-0 h-52 w-52 rounded-full bg-cyan-500/[0.04] blur-3xl" />
          </div>

          {/* =================================================
              MODAL
          ================================================= */}

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
              ease: [0.22, 1, 0.36, 1],
            }}
            onMouseDown={(event) =>
              event.stopPropagation()
            }
            className="
              relative
              w-full
              max-w-xl
              overflow-hidden
              rounded-[30px]
              border
              border-white/[0.12]
              bg-[#07111f]/[0.97]
              text-white
              shadow-[0_35px_120px_rgba(0,0,0,0.65)]
              backdrop-blur-2xl
            "
          >
            {/* =================================================
                TOP ACCENT
            ================================================= */}

            <div
              className={`
                absolute
                inset-x-0
                top-0
                h-[2px]
                bg-gradient-to-r
                ${config.gradient}
              `}
            />

            {/* =================================================
                DECORATIVE GLOW
            ================================================= */}

            <div
              className={`
                pointer-events-none
                absolute
                -right-28
                -top-28
                h-72
                w-72
                rounded-full
                ${config.glow}
                opacity-30
                blur-3xl
              `}
            />

            <div className="relative p-5 sm:p-7">
              {/* =================================================
                  HEADER
              ================================================= */}

              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-center gap-4">
                  <motion.div
                    initial={{
                      scale: 0.8,
                      opacity: 0,
                    }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                    }}
                    transition={{
                      delay: 0.08,
                      duration: 0.25,
                    }}
                    className={`
                      flex
                      h-13
                      w-13
                      shrink-0
                      items-center
                      justify-center
                      rounded-2xl
                      border
                      border-white/10
                      ${config.iconBg}
                      ${config.iconColor}
                      shadow-lg
                      sm:h-14
                      sm:w-14
                    `}
                  >
                    <Icon
                      size={24}
                      strokeWidth={1.8}
                    />
                  </motion.div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={`
                          truncate
                          text-[9px]
                          font-bold
                          uppercase
                          tracking-[0.22em]
                          ${config.iconColor}
                          sm:text-[10px]
                        `}
                      >
                        {config.eyebrow}
                      </span>

                      <Sparkles
                        size={11}
                        className="shrink-0 text-yellow-300"
                      />
                    </div>

                    <h2
                      className="
                        mt-1
                        truncate
                        text-xl
                        font-bold
                        tracking-tight
                        text-white
                        sm:text-2xl
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
                  aria-label="Close modal"
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
                  <X size={18} />
                </button>
              </div>

              {/* =================================================
                  DESCRIPTION
              ================================================= */}

              <div
                className="
                  mt-5
                  flex
                  items-start
                  gap-3
                  rounded-2xl
                  border
                  border-white/[0.07]
                  bg-white/[0.025]
                  px-4
                  py-3.5
                "
              >
                <Info
                  size={15}
                  className="mt-0.5 shrink-0 text-slate-600"
                />

                <p className="text-xs leading-5 text-slate-400 sm:text-sm sm:leading-6">
                  {config.description}
                </p>
              </div>

              {/* =================================================
                  ACCOUNT SELECTOR
              ================================================= */}

              {isTransactionAction && (
                <div className="mt-5">
                  <div className="mb-2.5 flex items-center justify-between">
                    <label
                      htmlFor="smartbank-account"
                      className="
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.15em]
                        text-slate-400
                      "
                    >
                      Source Account
                    </label>

                    {accountsLoading && (
                      <span
                        className="
                          flex
                          items-center
                          gap-1.5
                          text-[10px]
                          font-medium
                          text-slate-600
                        "
                      >
                        <Loader2
                          size={11}
                          className="animate-spin"
                        />
                        Fetching accounts
                      </span>
                    )}
                  </div>

                  <div className="relative">
                    <select
                      id="smartbank-account"
                      value={selectedAccountId}
                      onChange={(event) => {
                        setSelectedAccountId(
                          event.target.value
                        );
                        setError("");
                      }}
                      disabled={
                        loading ||
                        accountsLoading
                      }
                      className="
                        w-full
                        appearance-none
                        rounded-2xl
                        border
                        border-white/[0.09]
                        bg-slate-900/80
                        px-4
                        py-4
                        pr-12
                        text-sm
                        font-semibold
                        text-white
                        outline-none
                        transition-all
                        duration-200
                        hover:border-white/[0.15]
                        focus:border-cyan-400/40
                        focus:bg-slate-900
                        focus:ring-4
                        focus:ring-cyan-400/[0.06]
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                      "
                    >
                      <option
                        value=""
                        className="bg-slate-900"
                      >
                        Select an account
                      </option>

                      {availableAccounts.map(
                        (account) => (
                          <option
                            key={account.id}
                            value={account.id}
                            className="bg-slate-900"
                          >
                            {getAccountLabel(
                              account
                            )}
                          </option>
                        )
                      )}
                    </select>

                    <ChevronDown
                      size={17}
                      className="
                        pointer-events-none
                        absolute
                        right-4
                        top-1/2
                        -translate-y-1/2
                        text-slate-500
                      "
                    />
                  </div>

                  {/* ACCOUNT BALANCE */}
                  <AnimatePresence mode="wait">
                    {selectedAccount && (
                      <motion.div
                        key={selectedAccount.id}
                        initial={{
                          opacity: 0,
                          y: -4,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        className="
                          mt-2.5
                          flex
                          items-center
                          justify-between
                          rounded-xl
                          border
                          border-white/[0.05]
                          bg-white/[0.018]
                          px-3
                          py-2.5
                        "
                      >
                        <div className="flex items-center gap-2">
                          <Wallet
                            size={13}
                            className="text-slate-600"
                          />

                          <span className="text-[10px] text-slate-600">
                            Available balance
                          </span>
                        </div>

                        <span className="text-xs font-bold text-slate-300">
                          ₹{formatCurrency(
                            selectedBalance
                          )}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* NO ACCOUNTS */}
                  {!accountsLoading &&
                    availableAccounts.length ===
                      0 && (
                      <div
                        className="
                          mt-3
                          flex
                          items-center
                          justify-between
                          rounded-xl
                          border
                          border-amber-400/10
                          bg-amber-500/[0.04]
                          px-3
                          py-2.5
                        "
                      >
                        <div className="flex items-center gap-2">
                          <AlertCircle
                            size={14}
                            className="text-amber-400"
                          />

                          <span className="text-[10px] text-amber-300/70">
                            No active account found.
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={loadAccounts}
                          disabled={accountsLoading}
                          className="
                            flex
                            items-center
                            gap-1.5
                            text-[10px]
                            font-semibold
                            text-amber-300
                            transition
                            hover:text-amber-200
                            disabled:opacity-50
                          "
                        >
                          <RefreshCw
                            size={11}
                            className={
                              accountsLoading
                                ? "animate-spin"
                                : ""
                            }
                          />
                          Retry
                        </button>
                      </div>
                    )}
                </div>
              )}

              {/* =================================================
                  STATUS MESSAGES
              ================================================= */}

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
                      bg-red-500/[0.07]
                      p-3.5
                    "
                  >
                    <div
                      className="
                        mt-0.5
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-red-500/10
                        text-red-400
                      "
                    >
                      <AlertCircle size={16} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-bold text-red-300">
                        Action could not be completed
                      </p>

                      <p className="mt-1 text-xs leading-5 text-red-300/65">
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
                      bg-emerald-500/[0.07]
                      p-3.5
                    "
                  >
                    <div
                      className="
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-emerald-500/10
                        text-emerald-400
                      "
                    >
                      <CheckCircle2 size={16} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-bold text-emerald-300">
                        Action completed
                      </p>

                      <p className="mt-1 text-xs leading-5 text-emerald-300/65">
                        {success}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* =================================================
                  FORM
              ================================================= */}

              <div className="mt-5 space-y-5">
                {/* =================================================
                    AMOUNT
                ================================================= */}

                {requiresAmount && (
                  <div>
                    <div className="mb-2.5 flex items-center justify-between">
                      <label
                        htmlFor="smartbank-amount"
                        className="
                          text-[10px]
                          font-bold
                          uppercase
                          tracking-[0.15em]
                          text-slate-400
                        "
                      >
                        Transaction Amount
                      </label>

                      <span className="text-[10px] font-semibold text-slate-600">
                        INR
                      </span>
                    </div>

                    <div className="group/input relative">
                      <CircleDollarSign
                        size={17}
                        className="
                          pointer-events-none
                          absolute
                          left-4
                          top-1/2
                          -translate-y-1/2
                          text-slate-600
                          transition
                          group-focus-within/input:text-cyan-400
                        "
                      />

                      <input
                        id="smartbank-amount"
                        type="text"
                        inputMode="decimal"
                        value={amount}
                        onChange={handleAmountChange}
                        placeholder="0.00"
                        disabled={loading}
                        autoComplete="off"
                        className="
                          w-full
                          rounded-2xl
                          border
                          border-white/[0.09]
                          bg-white/[0.035]
                          py-4
                          pl-11
                          pr-4
                          text-xl
                          font-bold
                          tracking-tight
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

                    {/* WITHDRAW LIMIT */}
                    {title === "Withdraw Money" &&
                      selectedAccount && (
                        <div className="mt-2 flex items-center justify-between px-1">
                          <span className="text-[10px] text-slate-600">
                            Maximum available
                          </span>

                          <span className="text-[10px] font-semibold text-slate-500">
                            ₹
                            {formatCurrency(
                              selectedBalance
                            )}
                          </span>
                        </div>
                      )}
                  </div>
                )}

                {/* =================================================
                    TRANSFER RECEIVER
                ================================================= */}

                {title === "Transfer Money" && (
                  <div>
                    <div className="mb-2.5 flex items-center justify-between">
                      <label
                        htmlFor="smartbank-receiver"
                        className="
                          text-[10px]
                          font-bold
                          uppercase
                          tracking-[0.15em]
                          text-slate-400
                        "
                      >
                        Receiver Account
                      </label>

                      <span className="text-[10px] font-semibold text-slate-600">
                        Account ID
                      </span>
                    </div>

                    <input
                      id="smartbank-receiver"
                      type="text"
                      value={details}
                      onChange={(event) => {
                        setDetails(
                          event.target.value
                        );
                        setError("");
                      }}
                      placeholder="Enter receiver account ID"
                      disabled={loading}
                      autoComplete="off"
                      className="
                        w-full
                        rounded-2xl
                        border
                        border-white/[0.09]
                        bg-white/[0.035]
                        px-4
                        py-4
                        text-sm
                        font-medium
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

                    <div className="mt-2 flex items-center gap-1.5 px-1">
                      <LockKeyhole
                        size={10}
                        className="text-slate-700"
                      />

                      <span className="text-[10px] text-slate-600">
                        Verify the receiver account ID before confirming.
                      </span>
                    </div>
                  </div>
                )}

                {/* =================================================
                    PAY BILLS
                ================================================= */}

                {title === "Pay Bills" && (
                  <div
                    className="
                      rounded-2xl
                      border
                      border-purple-400/10
                      bg-gradient-to-br
                      from-purple-500/[0.08]
                      to-fuchsia-500/[0.04]
                      p-5
                    "
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="
                          flex
                          h-11
                          w-11
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          bg-purple-400/10
                          text-purple-300
                        "
                      >
                        <Receipt size={19} />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-semibold text-white">
                            Bill payments
                          </h3>

                          <span className="rounded-full border border-purple-400/10 bg-purple-400/5 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-purple-300">
                            Coming next
                          </span>
                        </div>

                        <p className="mt-1.5 text-xs leading-5 text-slate-500">
                          Electricity, mobile, internet and recurring bill payments will be connected through the dedicated payments module.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* =================================================
                    MANAGE CARDS
                ================================================= */}

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
                      <div
                        className="
                          flex
                          h-11
                          w-11
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          bg-blue-400/10
                          text-blue-300
                        "
                      >
                        <CreditCard size={19} />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-semibold text-white">
                            Card controls
                          </h3>

                          <span className="rounded-full border border-blue-400/10 bg-blue-400/5 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-blue-300">
                            Banking module
                          </span>
                        </div>

                        <p className="mt-1.5 text-xs leading-5 text-slate-500">
                          Freeze, unfreeze and manage your SmartBank cards from the dedicated card management workspace.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* =================================================
                    TRANSACTION PREVIEW
                ================================================= */}

                {isTransactionAction &&
                  selectedAccount &&
                  amount &&
                  Number(amount) > 0 && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 5,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      className="
                        rounded-2xl
                        border
                        border-white/[0.07]
                        bg-white/[0.02]
                        p-4
                      "
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-600">
                          Transaction preview
                        </span>

                        <span className="flex items-center gap-1.5 text-[10px] text-emerald-400/70">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          Ready
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500">
                          {config.label} amount
                        </span>

                        <span className="text-sm font-bold text-white">
                          ₹{formatCurrency(amount)}
                        </span>
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs text-slate-500">
                          Source account
                        </span>

                        <span className="max-w-[55%] truncate text-xs font-medium text-slate-300">
                          {getAccountLabel(
                            selectedAccount
                          )}
                        </span>
                      </div>

                      {title === "Transfer Money" &&
                        details.trim() && (
                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-xs text-slate-500">
                              Receiver
                            </span>

                            <span className="max-w-[55%] truncate text-xs font-medium text-slate-300">
                              {details.trim()}
                            </span>
                          </div>
                        )}
                    </motion.div>
                  )}

                {/* =================================================
                    CONFIRM BUTTON
                ================================================= */}

                <motion.button
                  type="button"
                  onClick={handleSubmit}
                  disabled={
                    loading ||
                    accountsLoading
                  }
                  whileHover={{
                    y:
                      loading ||
                      accountsLoading
                        ? 0
                        : -2,
                  }}
                  whileTap={{
                    scale:
                      loading ||
                      accountsLoading
                        ? 1
                        : 0.985,
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
                  <span
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      -translate-x-full
                      bg-gradient-to-r
                      from-white/0
                      via-white/15
                      to-white/0
                      transition-transform
                      duration-700
                      group-hover/btn:translate-x-full
                    "
                  />

                  <span className="relative flex items-center gap-2.5">
                    {loading ? (
                      <>
                        <Loader2
                          size={18}
                          className="animate-spin"
                        />
                        Processing securely...
                      </>
                    ) : accountsLoading ? (
                      <>
                        <Loader2
                          size={18}
                          className="animate-spin"
                        />
                        Loading account...
                      </>
                    ) : (
                      <>
                        {getButtonLabel()}

                        <ArrowRight
                          size={18}
                          className="
                            transition-transform
                            duration-200
                            group-hover/btn:translate-x-1
                          "
                        />
                      </>
                    )}
                  </span>
                </motion.button>
              </div>

              {/* =================================================
                  SECURITY FOOTER
              ================================================= */}

              <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                <ShieldCheck
                  size={13}
                  className="text-emerald-400"
                />

                <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-slate-600">
                  SmartBank Secure
                </span>

                <span className="h-1 w-1 rounded-full bg-slate-700" />

                <span className="text-[9px] text-slate-600">
                  Encrypted
                </span>

                <span className="h-1 w-1 rounded-full bg-slate-700" />

                <span className="text-[9px] text-slate-600">
                  Protected session
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