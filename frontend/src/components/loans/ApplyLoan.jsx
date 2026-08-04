
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import {
  X,
  DollarSign,
  CalendarDays,
  FileText,
  BriefcaseBusiness,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Loader2,
  AlertCircle,
  Percent,
} from "lucide-react";

import api from "../../services/api";

const ApplyLoan = ({ open, close, loan }) => {
  const [form, setForm] = useState({
    amount: "",
    tenure: "",
    purpose: "",
    employment: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // ==========================================
  // RESET FORM
  // ==========================================

  useEffect(() => {
    if (!open) {
      return;
    }

    setForm({
      amount: "",
      tenure: "",
      purpose: "",
      employment: "",
    });

    setErrors({});
    setSubmitting(false);
    setSubmitted(false);
  }, [open, loan]);

  // ==========================================
  // BODY SCROLL LOCK
  // ==========================================

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // ==========================================
  // RESOLVE LOAN TYPE
  // ==========================================

  const loanType = useMemo(() => {
    if (!loan) {
      return "";
    }

    const possibleLoanType =
      loan.loanType ||
      loan.type ||
      loan.title ||
      loan.name ||
      "";

    return String(possibleLoanType).trim();
  }, [loan]);

  // ==========================================
  // UPDATE FIELD
  // ==========================================

  const updateField = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [field]: "",
      submit: "",
    }));
  };

  // ==========================================
  // SELECTED INTEREST RATE
  // ==========================================

  const selectedRate = useMemo(() => {
    if (!loan) {
      return 0;
    }

    const rawRate =
      loan.rate ??
      loan.interestRate ??
      loan.interest ??
      0;

    const parsedRate = Number(
      String(rawRate)
        .replace("%", "")
        .trim()
    );

    return Number.isFinite(parsedRate)
      ? parsedRate
      : 0;
  }, [loan]);

  // ==========================================
  // TENURE OPTIONS
  // ==========================================

  const tenureOptions = useMemo(
    () => [
      {
        label: "1 Year",
        months: 12,
      },
      {
        label: "3 Years",
        months: 36,
      },
      {
        label: "5 Years",
        months: 60,
      },
      {
        label: "10 Years",
        months: 120,
      },
      {
        label: "15 Years",
        months: 180,
      },
      {
        label: "20 Years",
        months: 240,
      },
      {
        label: "30 Years",
        months: 360,
      },
    ],
    []
  );

  // ==========================================
  // EMI CALCULATION
  // ==========================================

  const emiData = useMemo(() => {
    const principal = Number(form.amount);

    const selectedTenure = tenureOptions.find(
      (option) => option.label === form.tenure
    );

    const months = selectedTenure?.months || 0;

    if (
      !Number.isFinite(principal) ||
      principal <= 0 ||
      !months ||
      selectedRate < 0
    ) {
      return {
        monthlyEmi: 0,
        totalPayable: 0,
        totalInterest: 0,
        tenureMonths: months,
      };
    }

    const monthlyRate =
      selectedRate / 12 / 100;

    let monthlyEmi;

    if (monthlyRate === 0) {
      monthlyEmi = principal / months;
    } else {
      monthlyEmi =
        (principal *
          monthlyRate *
          Math.pow(
            1 + monthlyRate,
            months
          )) /
        (Math.pow(
          1 + monthlyRate,
          months
        ) - 1);
    }

    const totalPayable =
      monthlyEmi * months;

    const totalInterest = Math.max(
      totalPayable - principal,
      0
    );

    return {
      monthlyEmi,
      totalPayable,
      totalInterest,
      tenureMonths: months,
    };
  }, [
    form.amount,
    form.tenure,
    selectedRate,
    tenureOptions,
  ]);

  // ==========================================
  // MAXIMUM LOAN AMOUNT
  // ==========================================

  const maximumLoanAmount = useMemo(() => {
    if (!loan) {
      return null;
    }

    const rawAmount =
      loan.maxAmount ??
      loan.maximumAmount ??
      loan.amount ??
      loan.maxLoanAmount ??
      null;

    if (rawAmount === null) {
      return null;
    }

    const parsedAmount = Number(
      String(rawAmount).replace(
        /[^0-9.]/g,
        ""
      )
    );

    return Number.isFinite(parsedAmount)
      ? parsedAmount
      : null;
  }, [loan]);

  // ==========================================
  // VALIDATION
  // ==========================================

  const validateForm = () => {
    const newErrors = {};

    const amount = Number(form.amount);

    if (!form.amount.trim()) {
      newErrors.amount =
        "Please enter the loan amount.";
    } else if (
      !Number.isFinite(amount) ||
      amount <= 0
    ) {
      newErrors.amount =
        "Enter a valid loan amount.";
    }

    if (
      maximumLoanAmount !== null &&
      amount > maximumLoanAmount
    ) {
      newErrors.amount =
        `Maximum available amount is ${formatCurrency(
          maximumLoanAmount
        )}.`;
    }

    if (!form.tenure) {
      newErrors.tenure =
        "Please select a tenure.";
    }

    if (!form.purpose.trim()) {
      newErrors.purpose =
        "Please enter the loan purpose.";
    }

    if (!form.employment) {
      newErrors.employment =
        "Please select your employment type.";
    }

    if (!loanType) {
      newErrors.submit =
        "Loan type could not be determined from the selected loan.";
    }

    if (
      !emiData.tenureMonths ||
      emiData.monthlyEmi <= 0
    ) {
      newErrors.submit =
        "Unable to calculate the loan EMI. Please check the amount and tenure.";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  // ==========================================
  // SUBMIT LOAN
  // ==========================================

  const submitLoan = async (event) => {
    event.preventDefault();

    if (submitting) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    setErrors({});

    try {
      // ========================================
      // BACKEND PAYLOAD
      // ========================================

      const payload = {
        loanType,
        principalAmount: Number(form.amount),
        interestRate: Number(
          selectedRate.toFixed(2)
        ),
        tenureMonths:
          emiData.tenureMonths,
        monthlyEmi: Number(
          emiData.monthlyEmi.toFixed(2)
        ),
        totalPayable: Number(
          emiData.totalPayable.toFixed(2)
        ),
        paidAmount: 0,
        remainingAmount: Number(
          emiData.totalPayable.toFixed(2)
        ),
        nextPaymentDate: null,
        status: "PENDING",
      };

      console.log(
        "Creating loan:",
        payload
      );

      // ========================================
      // CREATE LOAN
      // ========================================

      const response = await api.post(
        "/loans",
        payload
      );

      console.log(
        "Loan created successfully:",
        response?.data
      );

      // ========================================
      // SUCCESS
      // ========================================

      setSubmitting(false);
      setSubmitted(true);

      // Dashboard refresh event
      window.dispatchEvent(
        new Event("dashboardUpdated")
      );

      // Loans page refresh event
      window.dispatchEvent(
        new Event("loansUpdated")
      );

      // ========================================
      // CLOSE MODAL
      // ========================================

      setTimeout(() => {
        close();
      }, 1500);
    } catch (error) {
      console.error(
        "Loan creation failed:",
        error
      );

      setSubmitting(false);

      const backendMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Unable to submit loan application. Please try again.";

      setErrors({
        submit: backendMessage,
      });
    }
  };

  // ==========================================
  // BACKDROP CLICK
  // ==========================================

  const handleBackdropClick = (event) => {
    if (
      event.target === event.currentTarget &&
      !submitting
    ) {
      close();
    }
  };

  // ==========================================
  // FORMAT AMOUNT
  // ==========================================

  const formatAmount = (value) => {
    if (!value) {
      return "";
    }

    const numericValue = Number(value);

    if (!Number.isFinite(numericValue)) {
      return value;
    }

    return new Intl.NumberFormat(
      "en-US"
    ).format(numericValue);
  };

  // ==========================================
  // FORMAT CURRENCY
  // ==========================================

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value || 0);
  };

  // ==========================================
  // LOAN DISPLAY VALUES
  // ==========================================

  const loanTitle =
    loanType || "Loan";

  const loanAmount =
    loan?.amount ||
    loan?.maxAmount ||
    loan?.maximumAmount ||
    "—";

  const loanRate =
    loan?.rate ||
    loan?.interestRate ||
    `${selectedRate}%`;

  const loanTenure =
    loan?.tenure ||
    "Flexible";

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.2,
          }}
          onMouseDown={handleBackdropClick}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/75 px-4 py-6 backdrop-blur-md"
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 25,
              scale: 0.97,
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
              duration: 0.25,
              ease: "easeOut",
            }}
            onMouseDown={(event) =>
              event.stopPropagation()
            }
            className="relative my-auto w-full max-w-xl overflow-hidden rounded-[30px] border border-white/[0.09] bg-[#07101f] text-white shadow-2xl shadow-black/50"
          >
            {/* BACKGROUND GLOW */}

            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-400/[0.08] blur-3xl" />

            <div className="pointer-events-none absolute -bottom-32 -left-20 h-64 w-64 rounded-full bg-blue-600/[0.07] blur-3xl" />

            {/* HEADER */}

            <div className="relative border-b border-white/[0.07] p-6 sm:p-7">
              <div className="flex items-start justify-between gap-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/15 bg-cyan-400/[0.08] text-cyan-400">
                    <Sparkles size={21} />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-400">
                        Loan Application
                      </span>

                      <span className="rounded-full border border-emerald-400/10 bg-emerald-400/[0.06] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-400">
                        Secure
                      </span>
                    </div>

                    <h2 className="mt-2 text-xl font-bold tracking-tight text-white sm:text-2xl">
                      Apply for {loanTitle}
                    </h2>

                    <p className="mt-1.5 text-xs leading-5 text-slate-500">
                      Submit your details for a
                      personalized loan review.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={close}
                  disabled={submitting}
                  aria-label="Close loan application"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.025] text-slate-500 transition hover:bg-white/[0.07] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <X size={18} />
                </button>
              </div>

              {/* LOAN SUMMARY */}

              {loan && (
                <div className="mt-6 grid grid-cols-3 gap-2">
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-3">
                    <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-slate-600">
                      <DollarSign size={11} />
                      Maximum
                    </div>

                    <p className="mt-1.5 text-sm font-bold text-white">
                      {loanAmount}
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-3">
                    <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-slate-600">
                      <Percent size={11} />
                      Rate
                    </div>

                    <p className="mt-1.5 text-sm font-bold text-white">
                      {loanRate}
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-3">
                    <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-slate-600">
                      <CalendarDays size={11} />
                      Tenure
                    </div>

                    <p className="mt-1.5 text-sm font-bold text-white">
                      {loanTenure}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* SUCCESS STATE */}

            {submitted ? (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="relative flex min-h-[360px] flex-col items-center justify-center px-6 py-10 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/15 bg-emerald-400/[0.08]">
                  <CheckCircle2
                    size={31}
                    className="text-emerald-400"
                  />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-white">
                  Application Submitted
                </h3>

                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                  Your {loanTitle} application has
                  been submitted successfully and
                  is now pending review.
                </p>

                <div className="mt-6 flex items-center gap-2 rounded-full border border-emerald-400/10 bg-emerald-400/[0.05] px-4 py-2 text-xs font-semibold text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Application under review
                </div>
              </motion.div>
            ) : (
              <form
                onSubmit={submitLoan}
                className="relative p-6 sm:p-7"
              >
                <div className="mb-5">
                  <h3 className="text-sm font-semibold text-white">
                    Application Details
                  </h3>

                  <p className="mt-1 text-xs text-slate-600">
                    Provide accurate information to
                    continue.
                  </p>
                </div>

                {/* BACKEND ERROR */}

                {errors.submit && (
                  <div className="mb-5 flex items-start gap-2 rounded-xl border border-red-400/15 bg-red-400/[0.05] p-3 text-xs text-red-400">
                    <AlertCircle
                      size={15}
                      className="mt-0.5 shrink-0"
                    />

                    <span>{errors.submit}</span>
                  </div>
                )}

                <div className="space-y-4">
                  {/* LOAN AMOUNT */}

                  <div>
                    <label
                      htmlFor="loan-amount"
                      className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-400"
                    >
                      <DollarSign
                        size={14}
                        className="text-cyan-400"
                      />
                      Loan Amount
                    </label>

                    <input
                      id="loan-amount"
                      type="number"
                      min="1"
                      step="1000"
                      value={form.amount}
                      onChange={(event) =>
                        updateField(
                          "amount",
                          event.target.value
                        )
                      }
                      placeholder="Enter required amount"
                      disabled={submitting}
                      className={`w-full rounded-xl border bg-white/[0.025] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-700 ${
                        errors.amount
                          ? "border-red-400/30 focus:border-red-400/50"
                          : "border-white/[0.07] focus:border-cyan-400/30 focus:bg-cyan-400/[0.02]"
                      } disabled:cursor-not-allowed disabled:opacity-50`}
                    />

                    {form.amount &&
                      !errors.amount && (
                        <p className="mt-1.5 text-[10px] text-slate-600">
                          Requested: $
                          {formatAmount(
                            form.amount
                          )}
                        </p>
                      )}

                    {errors.amount && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-[10px] text-red-400">
                        <AlertCircle size={12} />
                        {errors.amount}
                      </p>
                    )}
                  </div>

                  {/* TENURE */}

                  <div>
                    <label
                      htmlFor="loan-tenure"
                      className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-400"
                    >
                      <CalendarDays
                        size={14}
                        className="text-cyan-400"
                      />
                      Preferred Tenure
                    </label>

                    <select
                      id="loan-tenure"
                      value={form.tenure}
                      onChange={(event) =>
                        updateField(
                          "tenure",
                          event.target.value
                        )
                      }
                      disabled={submitting}
                      className={`w-full appearance-none rounded-xl border bg-white/[0.025] px-4 py-3 text-sm outline-none transition ${
                        form.tenure
                          ? "text-white"
                          : "text-slate-700"
                      } ${
                        errors.tenure
                          ? "border-red-400/30 focus:border-red-400/50"
                          : "border-white/[0.07] focus:border-cyan-400/30"
                      } disabled:cursor-not-allowed disabled:opacity-50`}
                    >
                      <option
                        value=""
                        disabled
                      >
                        Select repayment tenure
                      </option>

                      {tenureOptions.map(
                        (option) => (
                          <option
                            key={option.months}
                            value={option.label}
                            className="bg-slate-900 text-white"
                          >
                            {option.label}
                          </option>
                        )
                      )}
                    </select>

                    {errors.tenure && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-[10px] text-red-400">
                        <AlertCircle size={12} />
                        {errors.tenure}
                      </p>
                    )}
                  </div>

                  {/* EMI PREVIEW */}

                  {form.amount &&
                    form.tenure &&
                    emiData.monthlyEmi > 0 && (
                      <div className="rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.035] p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-500">
                            Estimated Monthly EMI
                          </span>

                          <span className="text-base font-bold text-cyan-400">
                            {formatCurrency(
                              emiData.monthlyEmi
                            )}
                          </span>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-xs text-slate-500">
                            Estimated Total Payable
                          </span>

                          <span className="text-sm font-semibold text-white">
                            {formatCurrency(
                              emiData.totalPayable
                            )}
                          </span>
                        </div>
                      </div>
                    )}

                  {/* PURPOSE */}

                  <div>
                    <label
                      htmlFor="loan-purpose"
                      className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-400"
                    >
                      <FileText
                        size={14}
                        className="text-cyan-400"
                      />
                      Loan Purpose
                    </label>

                    <textarea
                      id="loan-purpose"
                      rows="3"
                      value={form.purpose}
                      onChange={(event) =>
                        updateField(
                          "purpose",
                          event.target.value
                        )
                      }
                      placeholder="Tell us briefly what you need the loan for..."
                      disabled={submitting}
                      className={`w-full resize-none rounded-xl border bg-white/[0.025] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-700 ${
                        errors.purpose
                          ? "border-red-400/30 focus:border-red-400/50"
                          : "border-white/[0.07] focus:border-cyan-400/30 focus:bg-cyan-400/[0.02]"
                      } disabled:cursor-not-allowed disabled:opacity-50`}
                    />

                    {errors.purpose && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-[10px] text-red-400">
                        <AlertCircle size={12} />
                        {errors.purpose}
                      </p>
                    )}
                  </div>

                  {/* EMPLOYMENT */}

                  <div>
                    <label
                      htmlFor="employment-type"
                      className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-400"
                    >
                      <BriefcaseBusiness
                        size={14}
                        className="text-cyan-400"
                      />
                      Employment Type
                    </label>

                    <select
                      id="employment-type"
                      value={form.employment}
                      onChange={(event) =>
                        updateField(
                          "employment",
                          event.target.value
                        )
                      }
                      disabled={submitting}
                      className={`w-full appearance-none rounded-xl border bg-white/[0.025] px-4 py-3 text-sm outline-none transition ${
                        form.employment
                          ? "text-white"
                          : "text-slate-700"
                      } ${
                        errors.employment
                          ? "border-red-400/30 focus:border-red-400/50"
                          : "border-white/[0.07] focus:border-cyan-400/30"
                      } disabled:cursor-not-allowed disabled:opacity-50`}
                    >
                      <option
                        value=""
                        disabled
                      >
                        Select employment type
                      </option>

                      <option
                        value="Salaried"
                        className="bg-slate-900 text-white"
                      >
                        Salaried
                      </option>

                      <option
                        value="Business"
                        className="bg-slate-900 text-white"
                      >
                        Business / Self Employed
                      </option>

                      <option
                        value="Student"
                        className="bg-slate-900 text-white"
                      >
                        Student
                      </option>

                      <option
                        value="Other"
                        className="bg-slate-900 text-white"
                      >
                        Other
                      </option>
                    </select>

                    {errors.employment && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-[10px] text-red-400">
                        <AlertCircle size={12} />
                        {errors.employment}
                      </p>
                    )}
                  </div>
                </div>

                {/* SECURITY NOTE */}

                <div className="mt-5 flex items-start gap-3 rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.035] p-4">
                  <ShieldCheck
                    size={17}
                    className="mt-0.5 shrink-0 text-emerald-400"
                  />

                  <div>
                    <p className="text-xs font-semibold text-slate-300">
                      Your information is secure
                    </p>

                    <p className="mt-1 text-[10px] leading-5 text-slate-600">
                      SmartBank AI uses your
                      information only to evaluate
                      and process your loan
                      application.
                    </p>
                  </div>
                </div>

                {/* SUBMIT */}

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-300 hover:shadow-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {submitting ? (
                    <>
                      <Loader2
                        size={17}
                        className="animate-spin"
                      />
                      Submitting Application...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <CheckCircle2 size={17} />
                    </>
                  )}
                </button>

                <p className="mt-3 text-center text-[9px] uppercase tracking-[0.14em] text-slate-700">
                  SmartBank AI • Secure Loan
                  Processing
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ApplyLoan;

