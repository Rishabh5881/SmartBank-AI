
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calculator,
  CheckCircle2,
  IndianRupee,
  Save,
  Loader2,
  AlertCircle,
} from "lucide-react";

import api from "../../services/api";

const LoanCalculator = () => {
  const [amount, setAmount] = useState(100000);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(5);

  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");

  // ==========================================
  // NORMALIZED VALUES
  // ==========================================

  const numericAmount = Number(amount) || 0;
  const numericRate = Number(rate) || 0;
  const numericYears = Number(years) || 0;

  const months = numericYears * 12;

  // ==========================================
  // EMI CALCULATION
  // ==========================================

  const calculateEMI = () => {
    if (
      numericAmount <= 0 ||
      numericYears <= 0 ||
      months <= 0
    ) {
      return 0;
    }

    // Zero-interest loan
    if (numericRate === 0) {
      return numericAmount / months;
    }

    const monthlyRate = numericRate / 12 / 100;

    const power = Math.pow(
      1 + monthlyRate,
      months
    );

    const emi =
      (numericAmount *
        monthlyRate *
        power) /
      (power - 1);

    return Number.isFinite(emi) ? emi : 0;
  };

  const emi = calculateEMI();

  const totalPayment =
    emi > 0 && months > 0
      ? emi * months
      : 0;

  const totalInterest =
    Math.max(totalPayment - numericAmount, 0);

  // ==========================================
  // FORMAT CURRENCY
  // ==========================================

  const formatCurrency = (value) => {
    return `₹${Number(value || 0).toLocaleString(
      "en-IN",
      {
        maximumFractionDigits: 0,
      }
    )}`;
  };

  // ==========================================
  // SAVE LOAN
  // ==========================================

  const handleSaveLoan = async () => {
    setSaveSuccess(false);
    setSaveError("");

    if (numericAmount <= 0) {
      setSaveError(
        "Please enter a valid loan amount."
      );
      return;
    }

    if (numericRate < 0) {
      setSaveError(
        "Interest rate cannot be negative."
      );
      return;
    }

    if (
      !Number.isInteger(numericYears) ||
      numericYears <= 0
    ) {
      setSaveError(
        "Please enter a valid tenure."
      );
      return;
    }

    if (emi <= 0) {
      setSaveError(
        "Unable to calculate EMI for this loan."
      );
      return;
    }

    try {
      setSaving(true);

      // First payment is scheduled for next month.
      const nextPaymentDate = new Date();

      nextPaymentDate.setMonth(
        nextPaymentDate.getMonth() + 1
      );

      const response = await api.post(
        "/loans",
        {
          loanType: "Personal Loan",
          principalAmount: numericAmount,
          interestRate: numericRate,
          tenureMonths: months,
          monthlyEmi: Number(emi.toFixed(2)),
          totalPayable: Number(
            totalPayment.toFixed(2)
          ),
          paidAmount: 0,
          remainingAmount: Number(
            totalPayment.toFixed(2)
          ),
          nextPaymentDate:
            nextPaymentDate.toISOString(),
          status: "ACTIVE",
        }
      );

      if (response.data?.success) {
        setSaveSuccess(true);

        // Notify other dashboard components
        // that fresh loan data is available.
        window.dispatchEvent(
          new Event("dashboardUpdated")
        );

        window.dispatchEvent(
          new Event("loansUpdated")
        );
      } else {
        setSaveError(
          response.data?.message ||
            "Unable to save loan."
        );
      }
    } catch (error) {
      console.error(
        "SAVE LOAN ERROR:",
        error?.response?.data ||
          error?.message
      );

      setSaveError(
        error?.response?.data?.message ||
          "Unable to save loan. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // INPUT HANDLERS
  // ==========================================

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
    setSaveSuccess(false);
    setSaveError("");
  };

  const handleRateChange = (event) => {
    setRate(event.target.value);
    setSaveSuccess(false);
    setSaveError("");
  };

  const handleYearsChange = (event) => {
    setYears(event.target.value);
    setSaveSuccess(false);
    setSaveError("");
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-white/[0.025] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-7"
    >
      {/* ==========================================
          BACKGROUND GLOW
      ========================================== */}

      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-purple-500/[0.06] blur-[100px]" />

      <div className="pointer-events-none absolute -bottom-24 -left-20 h-52 w-52 rounded-full bg-blue-500/[0.05] blur-[100px]" />

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="relative flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-purple-400/10 bg-purple-400/[0.08]">
          <Calculator
            size={20}
            className="text-purple-400"
          />
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-400">
            Smart Loan Planning
          </p>

          <h2 className="mt-1 text-xl font-bold text-white sm:text-2xl">
            Loan Calculator
          </h2>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            Calculate your EMI and save the loan
            directly to your SmartBank account.
          </p>
        </div>
      </div>

      {/* ==========================================
          INPUTS
      ========================================== */}

      <div className="relative mt-7 grid gap-5 md:grid-cols-3">
        {/* LOAN AMOUNT */}

        <div>
          <label
            htmlFor="loan-amount"
            className="text-xs font-medium text-slate-400"
          >
            Loan Amount
          </label>

          <div className="relative mt-2">
            <IndianRupee
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600"
            />

            <input
              id="loan-amount"
              type="number"
              min="0"
              value={amount}
              onChange={handleAmountChange}
              className="w-full rounded-xl border border-white/[0.08] bg-slate-950/80 py-3 pl-9 pr-3 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-purple-400/30 focus:ring-2 focus:ring-purple-400/10"
              placeholder="100000"
            />
          </div>
        </div>

        {/* INTEREST RATE */}

        <div>
          <label
            htmlFor="loan-rate"
            className="text-xs font-medium text-slate-400"
          >
            Interest Rate (%)
          </label>

          <div className="relative mt-2">
            <input
              id="loan-rate"
              type="number"
              min="0"
              step="0.1"
              value={rate}
              onChange={handleRateChange}
              className="w-full rounded-xl border border-white/[0.08] bg-slate-950/80 px-4 py-3 pr-10 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-purple-400/30 focus:ring-2 focus:ring-purple-400/10"
              placeholder="8"
            />

            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-600">
              %
            </span>
          </div>
        </div>

        {/* TENURE */}

        <div>
          <label
            htmlFor="loan-tenure"
            className="text-xs font-medium text-slate-400"
          >
            Tenure (Years)
          </label>

          <div className="relative mt-2">
            <input
              id="loan-tenure"
              type="number"
              min="1"
              step="1"
              value={years}
              onChange={handleYearsChange}
              className="w-full rounded-xl border border-white/[0.08] bg-slate-950/80 px-4 py-3 pr-16 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-purple-400/30 focus:ring-2 focus:ring-purple-400/10"
              placeholder="5"
            />

            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-600">
              years
            </span>
          </div>
        </div>
      </div>

      {/* ==========================================
          RESULTS
      ========================================== */}

      <div className="relative mt-7 grid gap-4 md:grid-cols-3">
        {/* EMI */}

        <div className="rounded-2xl border border-blue-400/10 bg-blue-500/[0.07] p-5">
          <p className="text-xs font-medium text-slate-400">
            Monthly EMI
          </p>

          <h3 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {formatCurrency(emi)}
          </h3>

          <p className="mt-2 text-[11px] text-slate-600">
            Estimated monthly payment
          </p>
        </div>

        {/* TOTAL PAYMENT */}

        <div className="rounded-2xl border border-emerald-400/10 bg-emerald-500/[0.07] p-5">
          <p className="text-xs font-medium text-slate-400">
            Total Payment
          </p>

          <h3 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {formatCurrency(totalPayment)}
          </h3>

          <p className="mt-2 text-[11px] text-slate-600">
            Principal + interest
          </p>
        </div>

        {/* TOTAL INTEREST */}

        <div className="rounded-2xl border border-purple-400/10 bg-purple-500/[0.07] p-5">
          <p className="text-xs font-medium text-slate-400">
            Total Interest
          </p>

          <h3 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {formatCurrency(totalInterest)}
          </h3>

          <p className="mt-2 text-[11px] text-slate-600">
            Total borrowing cost
          </p>
        </div>
      </div>

      {/* ==========================================
          ERROR
      ========================================== */}

      {saveError && (
        <motion.div
          initial={{
            opacity: 0,
            y: 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="relative mt-5 flex items-start gap-3 rounded-xl border border-red-400/10 bg-red-400/[0.05] p-4"
        >
          <AlertCircle
            size={17}
            className="mt-0.5 shrink-0 text-red-400"
          />

          <p className="text-xs leading-5 text-red-300">
            {saveError}
          </p>
        </motion.div>
      )}

      {/* ==========================================
          SUCCESS
      ========================================== */}

      {saveSuccess && (
        <motion.div
          initial={{
            opacity: 0,
            y: 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="relative mt-5 flex items-start gap-3 rounded-xl border border-emerald-400/10 bg-emerald-400/[0.05] p-4"
        >
          <CheckCircle2
            size={18}
            className="mt-0.5 shrink-0 text-emerald-400"
          />

          <div>
            <p className="text-sm font-semibold text-emerald-400">
              Loan saved successfully
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Your loan has been added to your
              SmartBank account.
            </p>
          </div>
        </motion.div>
      )}

      {/* ==========================================
          SAVE BUTTON
      ========================================== */}

      <div className="relative mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-medium text-slate-400">
            Ready to save this loan?
          </p>

          <p className="mt-1 text-[11px] text-slate-600">
            The calculated loan details will be
            stored securely.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSaveLoan}
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-purple-400/20 bg-purple-500/[0.12] px-5 py-3 text-xs font-bold text-purple-300 transition hover:border-purple-400/30 hover:bg-purple-500/[0.18] hover:text-purple-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? (
            <>
              <Loader2
                size={15}
                className="animate-spin"
              />

              Saving Loan...
            </>
          ) : (
            <>
              <Save size={15} />

              Save Loan
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default LoanCalculator;

