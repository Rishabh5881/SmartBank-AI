import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  ArrowRight,
  ArrowDownLeft,
  ArrowUpRight,
  Wallet,
  Search,
  Check,
  ShieldCheck,
  LockKeyhole,
  ChevronRight,
  Clock3,
  AlertCircle,
  CircleDollarSign,
  UserRound,
  Building2,
  CreditCard,
  X,
  Send,
  Sparkles,
  Copy,
  CheckCircle2,
} from "lucide-react";

const Transfer = () => {
  const [transferType, setTransferType] = useState("bank");
  const [recipient, setRecipient] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [selectedAccount, setSelectedAccount] = useState("Savings Account");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [transferSuccess, setTransferSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const accounts = [
    {
      name: "Savings Account",
      number: "SB-4589-7821",
      balance: 25840.5,
      icon: Wallet,
      gradient: "from-blue-600 to-cyan-500",
    },
    {
      name: "Current Account",
      number: "CA-9821-4456",
      balance: 80250,
      icon: Building2,
      gradient: "from-violet-600 to-indigo-600",
    },
    {
      name: "Salary Account",
      number: "SA-7845-2231",
      balance: 12500,
      icon: CreditCard,
      gradient: "from-emerald-500 to-teal-500",
    },
  ];

  const recentRecipients = [
    {
      id: 1,
      name: "Rahul Sharma",
      account: "•••• 4582",
      type: "Bank Account",
      initials: "RS",
    },
    {
      id: 2,
      name: "Priya Verma",
      account: "•••• 7821",
      type: "Bank Account",
      initials: "PV",
    },
    {
      id: 3,
      name: "SmartBank Wallet",
      account: "•••• 2294",
      type: "Wallet",
      initials: "SW",
    },
  ];

  const selectedSource = useMemo(() => {
    return accounts.find(
      (account) => account.name === selectedAccount
    );
  }, [selectedAccount]);

  const numericAmount = Number(amount) || 0;

  const transferFee = numericAmount > 0 ? 0 : 0;

  const totalAmount = numericAmount + transferFee;

  const isValid =
    recipient.trim().length >= 4 &&
    numericAmount > 0 &&
    numericAmount <= (selectedSource?.balance || 0);

  const formatCurrency = (value) => {
    return `$${Number(value).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isValid) {
      return;
    }

    setShowConfirmation(true);
  };

  const confirmTransfer = () => {
    setShowConfirmation(false);
    setTransferSuccess(true);
  };

  const resetTransfer = () => {
    setRecipient("");
    setRecipientName("");
    setAmount("");
    setNote("");
    setShowConfirmation(false);
    setTransferSuccess(false);
  };

  const handleRecentRecipient = (item) => {
    setRecipient(item.account);
    setRecipientName(item.name);
  };

  const copyReference = async () => {
    try {
      await navigator.clipboard.writeText("SBA-TXN-92851");

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch (error) {
      console.error("COPY ERROR:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] px-4 pb-16 pt-28 text-white sm:px-6 lg:px-10">
      {/* =====================================================
          AMBIENT BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none fixed left-0 top-20 -z-0 h-[420px] w-[420px] rounded-full bg-blue-600/[0.06] blur-[140px]" />

      <div className="pointer-events-none fixed bottom-0 right-0 -z-0 h-[450px] w-[450px] rounded-full bg-cyan-500/[0.05] blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-[1450px]">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/10 bg-cyan-400/[0.06] px-3 py-1.5">
              <Send
                size={13}
                className="text-cyan-400"
              />

              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-400">
                Secure Money Transfer
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Send Money
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
              Transfer money securely to another bank account,
              wallet, or recipient in just a few steps.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-emerald-400/10 bg-emerald-400/[0.04] px-4 py-3">
            <ShieldCheck
              size={17}
              className="text-emerald-400"
            />

            <span className="text-xs font-semibold text-slate-400">
              Bank-grade security enabled
            </span>
          </div>
        </motion.div>

        {/* =====================================================
            MAIN GRID
        ===================================================== */}

        <div className="mt-9 grid gap-6 xl:grid-cols-[minmax(0,1fr)_390px]">
          {/* ===================================================
              TRANSFER FORM
          =================================================== */}

          <motion.section
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.55,
              delay: 0.08,
            }}
            className="overflow-hidden rounded-[30px] border border-white/[0.07] bg-white/[0.025] shadow-2xl shadow-black/20"
          >
            {/* Form Header */}

            <div className="border-b border-white/[0.06] p-6 sm:p-8">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-400">
                  <ArrowUpRight size={21} />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-400">
                    New Transfer
                  </p>

                  <h2 className="mt-1 text-xl font-bold">
                    Transfer Details
                  </h2>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8"
            >
              {/* Transfer Type */}

              <div>
                <label className="mb-3 block text-xs font-semibold text-slate-400">
                  Transfer Type
                </label>

                <div className="grid gap-3 sm:grid-cols-2">
                  <TransferTypeButton
                    active={transferType === "bank"}
                    onClick={() => setTransferType("bank")}
                    icon={<Building2 size={18} />}
                    title="Bank Transfer"
                    description="Send to a bank account"
                  />

                  <TransferTypeButton
                    active={transferType === "wallet"}
                    onClick={() => setTransferType("wallet")}
                    icon={<Wallet size={18} />}
                    title="Wallet Transfer"
                    description="Send to a digital wallet"
                  />
                </div>
              </div>

              {/* Recipient */}

              <div className="mt-7">
                <div className="mb-3 flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-400">
                    Recipient
                  </label>

                  <span className="text-[10px] text-slate-600">
                    Required
                  </span>
                </div>

                <div className="relative">
                  <UserRound
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                  />

                  <input
                    type="text"
                    value={recipient}
                    onChange={(event) =>
                      setRecipient(event.target.value)
                    }
                    placeholder={
                      transferType === "bank"
                        ? "Account number or recipient ID"
                        : "Wallet ID or phone number"
                    }
                    className="w-full rounded-2xl border border-white/[0.08] bg-slate-950/60 py-4 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/30 focus:ring-4 focus:ring-cyan-400/[0.04]"
                  />
                </div>

                {recipientName && (
                  <div className="mt-2 flex items-center gap-2 text-[10px] text-emerald-400">
                    <CheckCircle2 size={13} />
                    {recipientName} selected
                  </div>
                )}
              </div>

              {/* Amount */}

              <div className="mt-7">
                <div className="mb-3 flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-400">
                    Amount
                  </label>

                  <span className="text-[10px] text-slate-600">
                    Available:{" "}
                    {formatCurrency(
                      selectedSource?.balance || 0
                    )}
                  </span>
                </div>

                <div className="relative">
                  <CircleDollarSign
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400"
                  />

                  <span className="absolute left-11 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500">
                    $
                  </span>

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={amount}
                    onChange={(event) =>
                      setAmount(event.target.value)
                    }
                    placeholder="0.00"
                    className="w-full rounded-2xl border border-white/[0.08] bg-slate-950/60 py-5 pl-20 pr-4 text-2xl font-bold text-white outline-none transition placeholder:text-slate-700 focus:border-cyan-400/30 focus:ring-4 focus:ring-cyan-400/[0.04]"
                  />
                </div>

                {numericAmount > 0 &&
                  numericAmount >
                    (selectedSource?.balance || 0) && (
                    <div className="mt-2 flex items-center gap-2 text-[10px] text-red-400">
                      <AlertCircle size={13} />
                      Insufficient balance in selected account
                    </div>
                  )}
              </div>

              {/* Source Account */}

              <div className="mt-7">
                <label className="mb-3 block text-xs font-semibold text-slate-400">
                  Send From
                </label>

                <div className="grid gap-3">
                  {accounts.map((account) => {
                    const Icon = account.icon;
                    const active =
                      selectedAccount === account.name;

                    return (
                      <button
                        key={account.name}
                        type="button"
                        onClick={() =>
                          setSelectedAccount(account.name)
                        }
                        className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-all ${
                          active
                            ? "border-cyan-400/25 bg-cyan-400/[0.06]"
                            : "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.04]"
                        }`}
                      >
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${account.gradient}`}
                        >
                          <Icon size={17} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold text-white">
                            {account.name}
                          </p>

                          <p className="mt-1 text-[10px] text-slate-600">
                            {account.number}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-xs font-bold text-slate-200">
                            {formatCurrency(account.balance)}
                          </p>

                          {active && (
                            <div className="mt-1 flex items-center justify-end gap-1 text-[9px] font-semibold text-cyan-400">
                              <Check size={10} />
                              Selected
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Note */}

              <div className="mt-7">
                <label className="mb-3 block text-xs font-semibold text-slate-400">
                  Transfer Note
                  <span className="ml-2 text-[10px] font-normal text-slate-600">
                    Optional
                  </span>
                </label>

                <textarea
                  rows="3"
                  value={note}
                  onChange={(event) =>
                    setNote(event.target.value)
                  }
                  placeholder="Add a note for this transfer..."
                  className="w-full resize-none rounded-2xl border border-white/[0.08] bg-slate-950/60 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/30 focus:ring-4 focus:ring-cyan-400/[0.04]"
                />
              </div>

              {/* Security Notice */}

              <div className="mt-7 flex gap-3 rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.035] p-4">
                <LockKeyhole
                  size={17}
                  className="mt-0.5 shrink-0 text-emerald-400"
                />

                <div>
                  <p className="text-xs font-semibold text-slate-200">
                    Secure transfer
                  </p>

                  <p className="mt-1 text-[10px] leading-5 text-slate-600">
                    Your transfer is protected with SmartBank
                    AI fraud monitoring and encrypted banking
                    protocols.
                  </p>
                </div>
              </div>

              {/* Submit */}

              <button
                type="submit"
                disabled={!isValid}
                className={`mt-7 flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 text-sm font-bold transition-all ${
                  isValid
                    ? "bg-cyan-400 text-slate-950 shadow-xl shadow-cyan-500/10 hover:bg-cyan-300 hover:shadow-cyan-500/20"
                    : "cursor-not-allowed bg-white/[0.06] text-slate-600"
                }`}
              >
                <Send size={17} />

                Review Transfer

                <ArrowRight size={17} />
              </button>
            </form>
          </motion.section>

          {/* ===================================================
              RIGHT SIDEBAR
          =================================================== */}

          <div className="space-y-6">
            {/* Balance Card */}

            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.15,
              }}
              className="relative overflow-hidden rounded-[28px] border border-cyan-400/10 bg-gradient-to-br from-blue-600 via-blue-600 to-cyan-500 p-[1px]"
            >
              <div className="relative overflow-hidden rounded-[27px] bg-[#07101f]/85 p-6 backdrop-blur-xl">
                <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CircleDollarSign size={17} />

                      <span className="text-xs font-semibold text-white/70">
                        Selected Account
                      </span>
                    </div>

                    <span className="rounded-full bg-emerald-400/15 px-2.5 py-1 text-[9px] font-bold text-emerald-200">
                      ACTIVE
                    </span>
                  </div>

                  <p className="mt-6 text-xs text-white/50">
                    {selectedSource?.name}
                  </p>

                  <h2 className="mt-1 text-4xl font-bold tracking-tight">
                    {formatCurrency(
                      selectedSource?.balance || 0
                    )}
                  </h2>

                  <p className="mt-2 font-mono text-[10px] tracking-wider text-white/40">
                    {selectedSource?.number}
                  </p>

                  <div className="mt-6 border-t border-white/10 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-white/50">
                        After transfer
                      </span>

                      <span className="text-sm font-bold">
                        {formatCurrency(
                          Math.max(
                            0,
                            (selectedSource?.balance || 0) -
                              numericAmount
                          )
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Recent Recipients */}

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.22,
              }}
              className="overflow-hidden rounded-[28px] border border-white/[0.07] bg-white/[0.025]"
            >
              <div className="flex items-center justify-between border-b border-white/[0.06] p-5">
                <div>
                  <h2 className="text-sm font-bold">
                    Recent Recipients
                  </h2>

                  <p className="mt-1 text-[10px] text-slate-600">
                    Quickly select a saved recipient
                  </p>
                </div>

                <Clock3
                  size={16}
                  className="text-slate-600"
                />
              </div>

              <div className="divide-y divide-white/[0.05]">
                {recentRecipients.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      handleRecentRecipient(item)
                    }
                    className="group flex w-full items-center gap-3 p-4 text-left transition hover:bg-white/[0.03]"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-xs font-bold text-cyan-400">
                      {item.initials}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-semibold text-slate-200">
                        {item.name}
                      </p>

                      <p className="mt-1 text-[10px] text-slate-600">
                        {item.type} • {item.account}
                      </p>
                    </div>

                    <ChevronRight
                      size={15}
                      className="text-slate-700 transition group-hover:translate-x-1 group-hover:text-cyan-400"
                    />
                  </button>
                ))}
              </div>
            </motion.section>

            {/* AI Insight */}

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.28,
              }}
              className="rounded-[24px] border border-cyan-400/10 bg-cyan-400/[0.035] p-5"
            >
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
                  <Sparkles size={17} />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-cyan-400">
                    SmartBank AI
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    Transfers are monitored automatically for
                    unusual activity and potential fraud.
                  </p>
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </div>

      {/* =====================================================
          CONFIRMATION MODAL
      ===================================================== */}

      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 px-4 py-8 backdrop-blur-md"
            onClick={() => setShowConfirmation(false)}
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
                y: 25,
                scale: 0.96,
              }}
              onClick={(event) =>
                event.stopPropagation()
              }
              className="w-full max-w-md rounded-[30px] border border-white/[0.08] bg-[#07101f] p-6 shadow-2xl sm:p-8"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-400">
                    <Send size={20} />
                  </div>

                  <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.15em] text-cyan-400">
                    Review Transfer
                  </p>

                  <h2 className="mt-1 text-xl font-bold">
                    Confirm payment
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmation(false)
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04] text-slate-500 transition hover:bg-white/[0.08] hover:text-white"
                >
                  <X size={17} />
                </button>
              </div>

              <div className="mt-7 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-5">
                <p className="text-xs text-slate-500">
                  Transfer Amount
                </p>

                <h3 className="mt-1 text-4xl font-bold text-cyan-400">
                  {formatCurrency(numericAmount)}
                </h3>

                <div className="mt-5 space-y-3 border-t border-white/[0.06] pt-4">
                  <ConfirmRow
                    label="Recipient"
                    value={
                      recipientName || recipient
                    }
                  />

                  <ConfirmRow
                    label="From"
                    value={selectedAccount}
                  />

                  <ConfirmRow
                    label="Transfer fee"
                    value={formatCurrency(transferFee)}
                  />

                  <ConfirmRow
                    label="Total"
                    value={formatCurrency(totalAmount)}
                    strong
                  />
                </div>
              </div>

              {note && (
                <div className="mt-4 rounded-xl bg-white/[0.025] p-3">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-600">
                    Note
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {note}
                  </p>
                </div>
              )}

              <div className="mt-5 flex gap-2 rounded-xl border border-amber-400/10 bg-amber-400/[0.035] p-3">
                <AlertCircle
                  size={15}
                  className="mt-0.5 shrink-0 text-amber-400"
                />

                <p className="text-[10px] leading-5 text-slate-500">
                  Please verify the recipient details before
                  confirming this transfer.
                </p>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmation(false)
                  }
                  className="rounded-xl border border-white/[0.08] bg-white/[0.035] px-4 py-3 text-xs font-semibold text-slate-300 transition hover:bg-white/[0.07] hover:text-white"
                >
                  Go Back
                </button>

                <button
                  type="button"
                  onClick={confirmTransfer}
                  className="flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 text-xs font-bold text-slate-950 transition hover:bg-cyan-300"
                >
                  <Check size={15} />
                  Confirm Transfer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================
          SUCCESS MODAL
      ===================================================== */}

      <AnimatePresence>
        {transferSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/75 px-4 py-8 backdrop-blur-md"
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 25,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              className="w-full max-w-md rounded-[30px] border border-emerald-400/10 bg-[#07101f] p-7 text-center shadow-2xl sm:p-9"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-400">
                <CheckCircle2 size={32} />
              </div>

              <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-400">
                Transfer Successful
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Money sent successfully
              </h2>

              <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-slate-500">
                Your transfer request has been securely
                processed and recorded.
              </p>

              <div className="mt-6 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-5">
                <p className="text-xs text-slate-500">
                  Amount Sent
                </p>

                <p className="mt-1 text-3xl font-bold text-emerald-400">
                  {formatCurrency(numericAmount)}
                </p>

                <div className="mt-5 border-t border-white/[0.06] pt-4">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-600">
                    Reference ID
                  </p>

                  <div className="mt-2 flex items-center justify-center gap-2">
                    <span className="font-mono text-xs text-slate-300">
                      SBA-TXN-92851
                    </span>

                    <button
                      type="button"
                      onClick={copyReference}
                      className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.05] text-slate-500 transition hover:bg-white/[0.09] hover:text-white"
                    >
                      {copied ? (
                        <Check
                          size={13}
                          className="text-emerald-400"
                        />
                      ) : (
                        <Copy size={13} />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={resetTransfer}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-3.5 text-xs font-bold text-slate-950 transition hover:bg-cyan-300"
              >
                <Send size={15} />
                Make Another Transfer
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* =========================================================
   TRANSFER TYPE BUTTON
========================================================= */

const TransferTypeButton = ({
  active,
  onClick,
  icon,
  title,
  description,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-all ${
        active
          ? "border-cyan-400/25 bg-cyan-400/[0.06]"
          : "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.04]"
      }`}
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
          active
            ? "bg-cyan-400/10 text-cyan-400"
            : "bg-white/[0.04] text-slate-500"
        }`}
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p
          className={`text-xs font-bold ${
            active
              ? "text-white"
              : "text-slate-300"
          }`}
        >
          {title}
        </p>

        <p className="mt-1 text-[10px] text-slate-600">
          {description}
        </p>
      </div>

      {active && (
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-400 text-slate-950">
          <Check size={11} />
        </div>
      )}
    </button>
  );
};

/* =========================================================
   CONFIRM ROW
========================================================= */

const ConfirmRow = ({
  label,
  value,
  strong = false,
}) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-[10px] text-slate-600">
        {label}
      </span>

      <span
        className={`max-w-[65%] truncate text-right text-xs ${
          strong
            ? "font-bold text-cyan-400"
            : "font-semibold text-slate-300"
        }`}
      >
        {value}
      </span>
    </div>
  );
};

export default Transfer;