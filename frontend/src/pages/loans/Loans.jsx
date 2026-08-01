import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import {
  Home,
  Car,
  GraduationCap,
  Wallet,
  Calculator,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Percent,
  CalendarDays,
  DollarSign,
} from "lucide-react";

import ApplyLoanModal from "../../components/loans/ApplyLoan";

const Loans = () => {
  // ==========================================
  // LOAN PRODUCTS
  // ==========================================

  const loans = [
    {
      id: "home",
      title: "Home Loan",
      amount: "$250,000",
      rate: "7.5%",
      tenure: "20 Years",
      icon: Home,
      color: "from-blue-600 to-cyan-400",
      description:
        "Finance your dream home with flexible repayment options.",
    },
    {
      id: "personal",
      title: "Personal Loan",
      amount: "$50,000",
      rate: "10.5%",
      tenure: "5 Years",
      icon: Wallet,
      color: "from-purple-600 to-indigo-600",
      description:
        "Quick personal financing for your important needs.",
    },
    {
      id: "car",
      title: "Car Loan",
      amount: "$80,000",
      rate: "8.2%",
      tenure: "7 Years",
      icon: Car,
      color: "from-green-500 to-emerald-600",
      description:
        "Drive your next car with convenient monthly payments.",
    },
    {
      id: "education",
      title: "Education Loan",
      amount: "$100,000",
      rate: "6.8%",
      tenure: "10 Years",
      icon: GraduationCap,
      color: "from-orange-500 to-red-500",
      description:
        "Invest in education with affordable financing support.",
    },
  ];

  // ==========================================
  // STATES
  // ==========================================

  const [selectedLoan, setSelectedLoan] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(7.5);
  const [loanTenure, setLoanTenure] = useState(20);

  // ==========================================
  // EMI CALCULATION
  // ==========================================

  const emiData = useMemo(() => {
    const principal = Number(loanAmount);
    const annualRate = Number(interestRate);
    const years = Number(loanTenure);

    const months = years * 12;
    const monthlyRate = annualRate / 12 / 100;

    if (
      !principal ||
      !months ||
      principal <= 0 ||
      annualRate < 0
    ) {
      return {
        emi: 0,
        totalPayment: 0,
        totalInterest: 0,
      };
    }

    let emi;

    if (monthlyRate === 0) {
      emi = principal / months;
    } else {
      emi =
        (principal *
          monthlyRate *
          Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
    }

    const totalPayment = emi * months;
    const totalInterest = totalPayment - principal;

    return {
      emi,
      totalPayment,
      totalInterest,
    };
  }, [loanAmount, interestRate, loanTenure]);

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
  // APPLY LOAN
  // ==========================================

  const handleApplyLoan = (loan) => {
    setSelectedLoan(loan);
    setShowModal(true);
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="min-h-screen bg-slate-950 px-4 pb-16 pt-28 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1500px]">

        {/* ==========================================
            HEADER
        ========================================== */}

        <motion.div
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
          className="relative overflow-hidden rounded-[32px] border border-white/[0.08] bg-white/[0.025] p-6 sm:p-8 lg:p-10"
        >
          {/* Background Glow */}

          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/[0.08] blur-3xl" />

          <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-blue-600/[0.08] blur-3xl" />

          <div className="relative">

            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/15 bg-cyan-400/[0.06] px-3 py-1.5 text-xs font-semibold text-cyan-400">
              <Sparkles size={13} />
              AI Powered Lending
            </div>

            <h1 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Smart Loans
              <span className="ml-2 text-cyan-400">
                🏦
              </span>
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
              Choose the right financing option for your
              goals with AI-powered recommendations,
              transparent rates, and flexible repayment
              plans.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">

              <div className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-xs text-slate-300">
                <CheckCircle2
                  size={15}
                  className="text-emerald-400"
                />
                Transparent Rates
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-xs text-slate-300">
                <CheckCircle2
                  size={15}
                  className="text-emerald-400"
                />
                Flexible Tenure
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-xs text-slate-300">
                <CheckCircle2
                  size={15}
                  className="text-emerald-400"
                />
                Secure Application
              </div>

            </div>

          </div>
        </motion.div>

        {/* ==========================================
            AI RECOMMENDATION
        ========================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.1,
            duration: 0.5,
          }}
          className="relative mt-8 overflow-hidden rounded-[28px] border border-cyan-400/10 bg-gradient-to-r from-blue-600/[0.14] via-cyan-500/[0.08] to-transparent p-6 sm:p-8"
        >
          <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-cyan-400/[0.08] blur-3xl" />

          <div className="relative flex flex-col gap-5 md:flex-row md:items-center">

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/15 bg-cyan-400/[0.08]">
              <TrendingUp
                size={25}
                className="text-cyan-400"
              />
            </div>

            <div className="flex-1">

              <div className="flex flex-wrap items-center gap-2">

                <h2 className="text-xl font-bold text-white sm:text-2xl">
                  AI Loan Recommendation
                </h2>

                <span className="rounded-full border border-emerald-400/15 bg-emerald-400/[0.07] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  Smart Match
                </span>

              </div>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
                Based on your financial profile, SmartBank AI
                can help identify suitable loan products,
                repayment periods, and affordable EMI ranges.
              </p>

            </div>

            <button
              type="button"
              onClick={() => {
                const calculator =
                  document.getElementById(
                    "loan-calculator"
                  );

                calculator?.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }}
              className="flex shrink-0 items-center justify-center gap-2 rounded-xl border border-cyan-400/15 bg-cyan-400/[0.07] px-4 py-3 text-sm font-semibold text-cyan-400 transition hover:bg-cyan-400/[0.12]"
            >
              Calculate EMI
              <ArrowRight size={16} />
            </button>

          </div>
        </motion.div>

        {/* ==========================================
            AVAILABLE LOANS
        ========================================== */}

        <div className="mt-12">

          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
                Financing Options
              </p>

              <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                Available Loans
              </h2>

            </div>

            <p className="text-sm text-slate-500">
              Select a loan to start your application
            </p>

          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

            {loans.map((loan, index) => {
              const Icon = loan.icon;

              return (
                <motion.div
                  key={loan.id}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.12 + index * 0.06,
                    duration: 0.45,
                  }}
                  whileHover={{
                    y: -6,
                  }}
                  className="group relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.035] p-5 shadow-xl shadow-black/10 transition-colors duration-300 hover:border-white/[0.14]"
                >

                  {/* Top Gradient */}

                  <div
                    className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${loan.color}`}
                  />

                  {/* Glow */}

                  <div
                    className={`pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-gradient-to-br ${loan.color} opacity-[0.08] blur-3xl transition-opacity duration-300 group-hover:opacity-[0.16]`}
                  />

                  <div className="relative">

                    <div className="flex items-start justify-between">

                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${loan.color} shadow-lg`}
                      >
                        <Icon
                          size={22}
                          strokeWidth={1.8}
                          className="text-white"
                        />
                      </div>

                      <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[10px] font-semibold text-slate-400">
                        {loan.tenure}
                      </span>

                    </div>

                    <h3 className="mt-6 text-xl font-bold text-white">
                      {loan.title}
                    </h3>

                    <p className="mt-2 min-h-[42px] text-xs leading-5 text-slate-500">
                      {loan.description}
                    </p>

                    <div className="mt-6 space-y-3">

                      <div className="flex items-center justify-between rounded-xl border border-white/[0.05] bg-white/[0.025] px-3 py-2.5">
                        <span className="text-xs text-slate-500">
                          Maximum Amount
                        </span>

                        <span className="text-sm font-bold text-white">
                          {loan.amount}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">

                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Percent size={14} />
                          Interest
                        </div>

                        <span className="text-sm font-semibold text-white">
                          {loan.rate}
                        </span>

                      </div>

                      <div className="flex items-center justify-between">

                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <CalendarDays size={14} />
                          Tenure
                        </div>

                        <span className="text-sm font-semibold text-white">
                          {loan.tenure}
                        </span>

                      </div>

                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        handleApplyLoan(loan)
                      }
                      className={`group/button mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r ${loan.color} py-3 text-sm font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:shadow-xl`}
                    >
                      Apply Now

                      <ArrowRight
                        size={16}
                        className="transition-transform duration-200 group-hover/button:translate-x-1"
                      />
                    </button>

                  </div>

                </motion.div>
              );
            })}

          </div>
        </div>

        {/* ==========================================
            EMI CALCULATOR
        ========================================== */}

        <motion.div
          id="loan-calculator"
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.25,
            duration: 0.5,
          }}
          className="mt-12 overflow-hidden rounded-[30px] border border-white/[0.08] bg-white/[0.035]"
        >

          <div className="border-b border-white/[0.07] p-6 sm:p-8">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/[0.08]">
                <Calculator
                  size={21}
                  className="text-cyan-400"
                />
              </div>

              <div>

                <h2 className="text-xl font-bold text-white sm:text-2xl">
                  Loan EMI Calculator
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Adjust the values to estimate your monthly payment.
                </p>

              </div>

            </div>

          </div>

          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.2fr_0.8fr]">

            {/* CONTROLS */}

            <div className="space-y-7">

              {/* LOAN AMOUNT */}

              <div>

                <div className="flex items-center justify-between">

                  <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                    <DollarSign
                      size={15}
                      className="text-cyan-400"
                    />
                    Loan Amount
                  </label>

                  <span className="text-lg font-bold text-white">
                    {formatCurrency(loanAmount)}
                  </span>

                </div>

                <input
                  type="range"
                  min="10000"
                  max="250000"
                  step="5000"
                  value={loanAmount}
                  onChange={(e) =>
                    setLoanAmount(
                      Number(e.target.value)
                    )
                  }
                  className="mt-5 w-full cursor-pointer accent-cyan-400"
                />

                <div className="mt-2 flex justify-between text-[10px] text-slate-600">
                  <span>$10K</span>
                  <span>$250K</span>
                </div>

              </div>

              {/* INTEREST RATE */}

              <div>

                <div className="flex items-center justify-between">

                  <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                    <Percent
                      size={15}
                      className="text-cyan-400"
                    />
                    Interest Rate
                  </label>

                  <span className="text-lg font-bold text-white">
                    {interestRate.toFixed(1)}%
                  </span>

                </div>

                <input
                  type="range"
                  min="4"
                  max="18"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) =>
                    setInterestRate(
                      Number(e.target.value)
                    )
                  }
                  className="mt-5 w-full cursor-pointer accent-cyan-400"
                />

                <div className="mt-2 flex justify-between text-[10px] text-slate-600">
                  <span>4%</span>
                  <span>18%</span>
                </div>

              </div>

              {/* TENURE */}

              <div>

                <div className="flex items-center justify-between">

                  <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                    <CalendarDays
                      size={15}
                      className="text-cyan-400"
                    />
                    Loan Tenure
                  </label>

                  <span className="text-lg font-bold text-white">
                    {loanTenure} Years
                  </span>

                </div>

                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={loanTenure}
                  onChange={(e) =>
                    setLoanTenure(
                      Number(e.target.value)
                    )
                  }
                  className="mt-5 w-full cursor-pointer accent-cyan-400"
                />

                <div className="mt-2 flex justify-between text-[10px] text-slate-600">
                  <span>1 Year</span>
                  <span>30 Years</span>
                </div>

              </div>

            </div>

            {/* RESULTS */}

            <div className="rounded-3xl border border-cyan-400/10 bg-gradient-to-br from-cyan-400/[0.08] to-blue-600/[0.06] p-6">

              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-400">
                Estimated Payment
              </p>

              <p className="mt-3 text-4xl font-bold tracking-tight text-white">
                {formatCurrency(emiData.emi)}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                per month
              </p>

              <div className="my-6 h-px bg-white/[0.07]" />

              <div className="space-y-4">

                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">
                    Principal
                  </span>

                  <span className="text-sm font-semibold text-white">
                    {formatCurrency(loanAmount)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">
                    Total Interest
                  </span>

                  <span className="text-sm font-semibold text-cyan-400">
                    {formatCurrency(
                      emiData.totalInterest
                    )}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">
                    Total Payment
                  </span>

                  <span className="text-sm font-semibold text-white">
                    {formatCurrency(
                      emiData.totalPayment
                    )}
                  </span>
                </div>

              </div>

              <div className="mt-6 rounded-2xl border border-white/[0.06] bg-black/10 p-4">

                <p className="text-xs leading-5 text-slate-500">
                  This calculator provides an estimate only.
                  Actual rates and repayment terms may vary
                  after loan approval.
                </p>

              </div>

            </div>

          </div>

        </motion.div>

        {/* ==========================================
            SECURITY FOOTER
        ========================================== */}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10px] font-medium uppercase tracking-[0.15em] text-slate-600">

          <span className="flex items-center gap-1.5">
            <CheckCircle2
              size={12}
              className="text-emerald-400"
            />
            Secure Application
          </span>

          <span className="h-1 w-1 rounded-full bg-slate-700" />

          <span>AI Assisted</span>

          <span className="h-1 w-1 rounded-full bg-slate-700" />

          <span>SmartBank AI</span>

        </div>

      </div>

      {/* ==========================================
          APPLY LOAN MODAL
      ========================================== */}

      <ApplyLoanModal
        open={showModal}
        close={() => setShowModal(false)}
        loan={selectedLoan}
      />

    </div>
  );
};

export default Loans;