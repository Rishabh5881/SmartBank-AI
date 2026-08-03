import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Calculator,
  Sparkles,
  IndianRupee,
  Percent,
  CalendarDays,
  TrendingDown,
  Wallet,
  CircleDollarSign,
  Loader2,
} from "lucide-react";

const LoanCalculator = () => {
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(5);
  const [calculating, setCalculating] = useState(false);

  // ==========================================
  // CALCULATION LOADING STATE
  // ==========================================

  useEffect(() => {
    setCalculating(true);

    const timer = window.setTimeout(() => {
      setCalculating(false);
    }, 250);

    return () => {
      window.clearTimeout(timer);
    };
  }, [amount, rate, years]);

  // ==========================================
  // LOAN CALCULATIONS
  // ==========================================

  const calculations = useMemo(() => {
    const safeAmount = Math.max(0, Number(amount) || 0);
    const safeRate = Math.max(0, Number(rate) || 0);
    const safeYears = Math.max(1, Number(years) || 1);

    const monthlyRate = safeRate / 12 / 100;
    const months = safeYears * 12;

    const emi =
      monthlyRate > 0
        ? (safeAmount *
            monthlyRate *
            Math.pow(1 + monthlyRate, months)) /
          (Math.pow(1 + monthlyRate, months) - 1)
        : safeAmount / months;

    const totalPayment = emi * months;
    const interest = totalPayment - safeAmount;

    return {
      emi,
      totalPayment,
      interest,
      months,
      safeAmount,
      safeRate,
      safeYears,
    };
  }, [amount, rate, years]);

  // ==========================================
  // FORMAT MONEY
  // ==========================================

  const formatMoney = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(Math.max(0, value));

  // ==========================================
  // INTEREST PERCENTAGE
  // ==========================================

  const interestPercentage =
    calculations.totalPayment > 0
      ? (calculations.interest / calculations.totalPayment) * 100
      : 0;

  // ==========================================
  // INPUT HANDLERS
  // ==========================================

  const handleAmountChange = (value) => {
    const numericValue = Number(value);

    if (Number.isNaN(numericValue)) {
      setAmount(0);
      return;
    }

    setAmount(Math.min(Math.max(numericValue, 0), 10000000));
  };

  const handleRateChange = (value) => {
    const numericValue = Number(value);

    if (Number.isNaN(numericValue)) {
      setRate(0);
      return;
    }

    setRate(Math.min(Math.max(numericValue, 0), 30));
  };

  const handleYearsChange = (value) => {
    const numericValue = Number(value);

    if (Number.isNaN(numericValue)) {
      setYears(1);
      return;
    }

    setYears(Math.min(Math.max(numericValue, 1), 30));
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900/95 to-blue-950/80 p-6 text-white shadow-2xl shadow-black/20 backdrop-blur-2xl sm:p-7"
    >
      {/* ==========================================
          AMBIENT GLOWS
      ========================================== */}

      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl transition-transform duration-700 group-hover:scale-125" />

      <div className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />

      <div className="relative z-10">
        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <motion.div
              animate={
                calculating
                  ? {
                      scale: [1, 1.04, 1],
                    }
                  : {
                      scale: 1,
                    }
              }
              transition={{
                duration: 0.5,
              }}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/15 bg-cyan-400/10 text-cyan-400 shadow-lg shadow-cyan-500/10"
            >
              {calculating ? (
                <Loader2
                  size={23}
                  strokeWidth={1.8}
                  className="animate-spin"
                />
              ) : (
                <Calculator
                  size={23}
                  strokeWidth={1.8}
                />
              )}
            </motion.div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-400">
                Smart Finance Tool
              </p>

              <h2 className="mt-1 text-xl font-bold tracking-tight sm:text-2xl">
                Loan Calculator
              </h2>

              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Estimate your monthly repayment instantly
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-1.5 rounded-full border border-cyan-400/15 bg-cyan-400/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-cyan-400 sm:flex">
            {calculating ? (
              <>
                <Loader2
                  size={12}
                  className="animate-spin"
                />

                Calculating
              </>
            ) : (
              <>
                <Sparkles size={12} />
                AI Ready
              </>
            )}
          </div>
        </div>

        {/* ==========================================
            CALCULATOR BODY
        ========================================== */}

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          {/* ==========================================
              INPUTS
          ========================================== */}

          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 sm:p-6">
            <div className="mb-6">
              <p className="text-sm font-semibold text-white">
                Loan Details
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Adjust the values to calculate your EMI.
              </p>
            </div>

            <div className="space-y-6">
              {/* ==========================================
                  LOAN AMOUNT
              ========================================== */}

              <div>
                <div className="flex items-center justify-between gap-3">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                    <IndianRupee
                      size={15}
                      className="text-cyan-400"
                    />

                    Loan Amount
                  </label>

                  <span className="text-xs font-semibold text-cyan-400">
                    Max ₹1 Cr
                  </span>
                </div>

                <div className="relative mt-2">
                  <IndianRupee
                    size={17}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    type="number"
                    min="0"
                    max="10000000"
                    value={amount}
                    onChange={(e) =>
                      handleAmountChange(e.target.value)
                    }
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/60 py-3.5 pl-10 pr-4 text-sm font-semibold text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/40 focus:bg-slate-950/80 focus:ring-4 focus:ring-cyan-400/5"
                  />
                </div>

                <input
                  type="range"
                  min="50000"
                  max="10000000"
                  step="50000"
                  value={Math.min(
                    Math.max(amount, 50000),
                    10000000
                  )}
                  onChange={(e) =>
                    setAmount(Number(e.target.value))
                  }
                  className="mt-3 h-1.5 w-full cursor-pointer accent-cyan-400"
                />
              </div>

              {/* ==========================================
                  INTEREST RATE
              ========================================== */}

              <div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                    <Percent
                      size={15}
                      className="text-cyan-400"
                    />

                    Interest Rate
                  </label>

                  <span className="rounded-full bg-cyan-400/10 px-2.5 py-1 text-xs font-semibold text-cyan-400">
                    {rate}% p.a.
                  </span>
                </div>

                <div className="relative mt-2">
                  <input
                    type="number"
                    min="0"
                    max="30"
                    step="0.1"
                    value={rate}
                    onChange={(e) =>
                      handleRateChange(e.target.value)
                    }
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3.5 pr-12 text-sm font-semibold text-white outline-none transition focus:border-cyan-400/40 focus:bg-slate-950/80 focus:ring-4 focus:ring-cyan-400/5"
                  />

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500">
                    %
                  </span>
                </div>

                <input
                  type="range"
                  min="1"
                  max="30"
                  step="0.1"
                  value={Math.min(
                    Math.max(rate, 1),
                    30
                  )}
                  onChange={(e) =>
                    setRate(Number(e.target.value))
                  }
                  className="mt-3 h-1.5 w-full cursor-pointer accent-cyan-400"
                />
              </div>

              {/* ==========================================
                  LOAN TENURE
              ========================================== */}

              <div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                    <CalendarDays
                      size={15}
                      className="text-cyan-400"
                    />

                    Loan Tenure
                  </label>

                  <span className="text-xs font-semibold text-slate-400">
                    {years}{" "}
                    {years === 1 ? "Year" : "Years"}
                  </span>
                </div>

                <div className="relative mt-2">
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={years}
                    onChange={(e) =>
                      handleYearsChange(e.target.value)
                    }
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3.5 pr-20 text-sm font-semibold text-white outline-none transition focus:border-cyan-400/40 focus:bg-slate-950/80 focus:ring-4 focus:ring-cyan-400/5"
                  />

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-500">
                    Years
                  </span>
                </div>

                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={years}
                  onChange={(e) =>
                    setYears(Number(e.target.value))
                  }
                  className="mt-3 h-1.5 w-full cursor-pointer accent-cyan-400"
                />
              </div>
            </div>
          </div>

          {/* ==========================================
              RESULTS
          ========================================== */}

          <div className="relative overflow-hidden rounded-3xl border border-cyan-400/10 bg-gradient-to-br from-cyan-500/[0.08] via-blue-500/[0.05] to-transparent p-5 sm:p-6">
            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-cyan-400/10 blur-3xl" />

            <motion.div
              animate={{
                opacity: calculating ? 0.45 : 1,
                filter: calculating
                  ? "blur(1px)"
                  : "blur(0px)",
              }}
              transition={{
                duration: 0.2,
              }}
              className="relative"
            >
              {/* ==========================================
                  EMI
              ========================================== */}

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                    Estimated EMI
                  </p>

                  <div className="mt-2 flex min-h-[48px] items-center">
                    {calculating ? (
                      <div className="flex items-center gap-2 text-cyan-400">
                        <Loader2
                          size={20}
                          className="animate-spin"
                        />

                        <span className="text-sm font-semibold">
                          Calculating...
                        </span>
                      </div>
                    ) : (
                      <p className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                        {formatMoney(
                          calculations.emi
                        )}
                      </p>
                    )}
                  </div>

                  <p className="mt-1 text-xs text-slate-500">
                    per month for{" "}
                    {calculations.safeYears} years
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-400">
                  {calculating ? (
                    <Loader2
                      size={21}
                      className="animate-spin"
                    />
                  ) : (
                    <Wallet size={21} />
                  )}
                </div>
              </div>

              {/* ==========================================
                  PRINCIPAL VS INTEREST
              ========================================== */}

              <div className="mt-7">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    Principal vs Interest
                  </span>

                  <span className="text-xs font-semibold text-cyan-400">
                    {interestPercentage.toFixed(1)}%
                    interest
                  </span>
                </div>

                <div className="flex h-2 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    animate={{
                      width: `${100 - interestPercentage}%`,
                    }}
                    transition={{
                      duration: 0.4,
                    }}
                    className="h-full bg-gradient-to-r from-blue-600 to-cyan-400"
                  />

                  <motion.div
                    animate={{
                      width: `${interestPercentage}%`,
                    }}
                    transition={{
                      duration: 0.4,
                    }}
                    className="h-full bg-purple-400/70"
                  />
                </div>
              </div>

              {/* ==========================================
                  RESULT CARDS
              ========================================== */}

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {/* Total Payment */}

                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="flex items-center gap-2 text-slate-500">
                    <CircleDollarSign size={15} />

                    <span className="text-xs">
                      Total Payment
                    </span>
                  </div>

                  <p className="mt-2 text-lg font-bold text-white">
                    {formatMoney(
                      calculations.totalPayment
                    )}
                  </p>
                </div>

                {/* Total Interest */}

                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="flex items-center gap-2 text-slate-500">
                    <TrendingDown size={15} />

                    <span className="text-xs">
                      Total Interest
                    </span>
                  </div>

                  <p className="mt-2 text-lg font-bold text-white">
                    {formatMoney(
                      calculations.interest
                    )}
                  </p>
                </div>
              </div>

              {/* ==========================================
                  SUMMARY
              ========================================== */}

              <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/30 p-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">
                    Loan Amount
                  </span>

                  <span className="font-semibold text-slate-300">
                    {formatMoney(
                      calculations.safeAmount
                    )}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="text-slate-500">
                    Interest Rate
                  </span>

                  <span className="font-semibold text-slate-300">
                    {calculations.safeRate}% p.a.
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="text-slate-500">
                    Total Months
                  </span>

                  <span className="font-semibold text-slate-300">
                    {calculations.months} months
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ==========================================
            AI SUGGESTION
        ========================================== */}

        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-cyan-400/10 bg-gradient-to-r from-cyan-500/[0.08] to-blue-500/[0.06] p-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10">
            {calculating ? (
              <Loader2
                size={17}
                className="animate-spin text-cyan-400"
              />
            ) : (
              <Sparkles
                size={17}
                className="text-cyan-400"
              />
            )}
          </div>

          <div>
            <p className="text-xs font-semibold text-cyan-400">
              SmartBank AI Insight
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-400 sm:text-sm">
              Your estimated monthly EMI is{" "}
              <span className="font-semibold text-slate-200">
                {formatMoney(calculations.emi)}
              </span>
              . Compare this repayment with your monthly
              cash flow before taking a loan.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoanCalculator;