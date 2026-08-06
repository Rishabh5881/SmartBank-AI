
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BadgeIndianRupee,
  Banknote,
  Building2,
  Calculator,
  CheckCircle2,
  Clock3,
  FileText,
  Home,
  IndianRupee,
  Percent,
  ShieldCheck,
  Sparkles,
  WalletCards,
} from "lucide-react";

const HomeLoan = () => {
  const [loanAmount, setLoanAmount] = useState(4000000);
  const [tenure, setTenure] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);

  const emiData = useMemo(() => {
    const principal = Number(loanAmount);
    const annualRate = Number(interestRate);
    const years = Number(tenure);

    if (!principal || !years || annualRate < 0) {
      return {
        emi: 0,
        totalInterest: 0,
        totalPayment: 0,
      };
    }

    const monthlyRate = annualRate / 12 / 100;
    const months = years * 12;

    let emi = 0;

    if (monthlyRate === 0) {
      emi = principal / months;
    } else {
      const factor = Math.pow(1 + monthlyRate, months);

      emi =
        (principal * monthlyRate * factor) /
        (factor - 1);
    }

    const totalPayment = emi * months;
    const totalInterest = totalPayment - principal;

    return {
      emi,
      totalInterest,
      totalPayment,
    };
  }, [loanAmount, tenure, interestRate]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value || 0);
  };

  const handleAmountChange = (event) => {
    setLoanAmount(Number(event.target.value));
  };

  const handleTenureChange = (event) => {
    setTenure(Number(event.target.value));
  };

  const handleInterestChange = (event) => {
    setInterestRate(Number(event.target.value));
  };

  const benefits = [
    {
      icon: Percent,
      title: "Competitive Rates",
      description:
        "Explore flexible interest-rate options designed for long-term home financing.",
    },
    {
      icon: Clock3,
      title: "Flexible Tenure",
      description:
        "Choose a repayment tenure that fits comfortably within your monthly budget.",
    },
    {
      icon: ShieldCheck,
      title: "Secure Process",
      description:
        "Your application and financial information stay protected throughout the journey.",
    },
    {
      icon: Sparkles,
      title: "Smart Assistance",
      description:
        "SmartBank AI can help you understand affordability and repayment scenarios.",
    },
  ];

  const processSteps = [
    {
      number: "01",
      title: "Check Eligibility",
      description:
        "Review your estimated borrowing capacity and monthly repayment.",
    },
    {
      number: "02",
      title: "Submit Application",
      description:
        "Provide your basic personal, income and property information.",
    },
    {
      number: "03",
      title: "Document Verification",
      description:
        "Required documents are reviewed before the loan decision.",
    },
    {
      number: "04",
      title: "Approval & Disbursal",
      description:
        "Once approved, the loan proceeds move toward the property purchase.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-blue-600/10 blur-[150px]" />

        <div className="absolute right-[-180px] top-[20%] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[160px]" />

        <div className="absolute bottom-[-180px] left-[45%] h-[450px] w-[450px] rounded-full bg-indigo-600/10 blur-[150px]" />
      </div>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <main className="relative z-10 mx-auto max-w-[1500px] px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        {/* ===================================================
            BACK
        ==================================================== */}

        <Link
          to="/loans"
          className="mb-8 inline-flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-cyan-400/20 hover:bg-cyan-400/[0.05] hover:text-cyan-400"
        >
          <ArrowLeft size={16} />
          Back to Loans
        </Link>

        {/* ===================================================
            HERO
        ==================================================== */}

        <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/15 bg-cyan-400/[0.06] px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-400">
              <Home size={14} />
              Home Loan
            </div>

            <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Turn your dream home
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                into a smart financial plan.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
              Estimate your home loan EMI, understand the total repayment,
              and explore a repayment plan before starting your application.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#calculator"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-400 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:shadow-blue-500/30"
              >
                Calculate EMI
                <ArrowRight size={17} />
              </a>

              <a
                href="#process"
                className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-white/[0.14] hover:bg-white/[0.05] hover:text-white"
              >
                How it works
              </a>
            </div>

            <div className="mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4">
                <Home className="mb-3 text-cyan-400" size={19} />
                <p className="text-xs text-slate-500">Purpose</p>
                <p className="mt-1 text-sm font-semibold text-white">
                  Property
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4">
                <Percent className="mb-3 text-cyan-400" size={19} />
                <p className="text-xs text-slate-500">Rate From</p>
                <p className="mt-1 text-sm font-semibold text-white">
                  8.5%*
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4">
                <Clock3 className="mb-3 text-cyan-400" size={19} />
                <p className="text-xs text-slate-500">Tenure</p>
                <p className="mt-1 text-sm font-semibold text-white">
                  Up to 30Y
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4">
                <ShieldCheck className="mb-3 text-cyan-400" size={19} />
                <p className="text-xs text-slate-500">Process</p>
                <p className="mt-1 text-sm font-semibold text-white">
                  Secure
                </p>
              </div>
            </div>
          </div>

          {/* HERO VISUAL */}

          <div className="relative">
            <div className="absolute inset-0 rounded-[32px] bg-cyan-400/10 blur-3xl" />

            <div className="relative overflow-hidden rounded-[32px] border border-white/[0.08] bg-slate-900/70 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8">
              <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-cyan-400/10 blur-3xl" />

              <div className="relative">
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                      Estimated Monthly EMI
                    </p>

                    <p className="mt-2 text-4xl font-bold tracking-tight text-white">
                      {formatCurrency(emiData.emi)}
                    </p>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/15 bg-cyan-400/[0.08]">
                    <Calculator
                      size={22}
                      className="text-cyan-400"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-xl border border-white/[0.05] bg-white/[0.025] px-4 py-3">
                    <span className="text-sm text-slate-400">
                      Loan Amount
                    </span>

                    <span className="text-sm font-semibold text-white">
                      {formatCurrency(loanAmount)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-white/[0.05] bg-white/[0.025] px-4 py-3">
                    <span className="text-sm text-slate-400">
                      Interest Rate
                    </span>

                    <span className="text-sm font-semibold text-white">
                      {interestRate}% p.a.
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-white/[0.05] bg-white/[0.025] px-4 py-3">
                    <span className="text-sm text-slate-400">
                      Tenure
                    </span>

                    <span className="text-sm font-semibold text-white">
                      {tenure} years
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2 rounded-xl border border-emerald-400/10 bg-emerald-400/[0.05] px-4 py-3 text-xs text-emerald-400">
                  <CheckCircle2 size={15} />
                  Indicative calculation based on entered values
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            CALCULATOR
        ==================================================== */}

        <section id="calculator" className="scroll-mt-28 pt-24">
          <div className="mb-8">
            <div className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-cyan-400">
              <Calculator size={17} />
              EMI Calculator
            </div>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Plan your home loan before applying.
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
              Adjust the amount, tenure and interest rate to understand
              your estimated monthly repayment.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
            {/* INPUT PANEL */}

            <div className="rounded-[28px] border border-white/[0.07] bg-white/[0.025] p-6 backdrop-blur-xl sm:p-8">
              <div className="space-y-8">
                {/* LOAN AMOUNT */}

                <div>
                  <div className="mb-3 flex items-center justify-between gap-4">
                    <label
                      htmlFor="loanAmount"
                      className="text-sm font-medium text-slate-300"
                    >
                      Loan Amount
                    </label>

                    <div className="flex items-center rounded-xl border border-white/[0.07] bg-white/[0.035] px-3 py-2">
                      <IndianRupee
                        size={14}
                        className="text-cyan-400"
                      />

                      <input
                        id="loanAmount"
                        type="number"
                        min="500000"
                        max="100000000"
                        step="100000"
                        value={loanAmount}
                        onChange={handleAmountChange}
                        className="w-28 bg-transparent text-right text-sm font-semibold text-white outline-none"
                      />
                    </div>
                  </div>

                  <input
                    type="range"
                    min="500000"
                    max="100000000"
                    step="100000"
                    value={loanAmount}
                    onChange={handleAmountChange}
                    className="w-full accent-cyan-400"
                  />

                  <div className="mt-2 flex justify-between text-[11px] text-slate-600">
                    <span>₹5 Lakh</span>
                    <span>₹10 Crore</span>
                  </div>
                </div>

                {/* TENURE */}

                <div>
                  <div className="mb-3 flex items-center justify-between gap-4">
                    <label
                      htmlFor="tenure"
                      className="text-sm font-medium text-slate-300"
                    >
                      Loan Tenure
                    </label>

                    <div className="rounded-xl border border-white/[0.07] bg-white/[0.035] px-3 py-2 text-sm font-semibold text-white">
                      {tenure} years
                    </div>
                  </div>

                  <input
                    id="tenure"
                    type="range"
                    min="5"
                    max="30"
                    step="1"
                    value={tenure}
                    onChange={handleTenureChange}
                    className="w-full accent-cyan-400"
                  />

                  <div className="mt-2 flex justify-between text-[11px] text-slate-600">
                    <span>5 years</span>
                    <span>30 years</span>
                  </div>
                </div>

                {/* INTEREST */}

                <div>
                  <div className="mb-3 flex items-center justify-between gap-4">
                    <label
                      htmlFor="interestRate"
                      className="text-sm font-medium text-slate-300"
                    >
                      Interest Rate
                    </label>

                    <div className="rounded-xl border border-white/[0.07] bg-white/[0.035] px-3 py-2 text-sm font-semibold text-white">
                      {interestRate.toFixed(1)}%
                    </div>
                  </div>

                  <input
                    id="interestRate"
                    type="range"
                    min="6"
                    max="15"
                    step="0.1"
                    value={interestRate}
                    onChange={handleInterestChange}
                    className="w-full accent-cyan-400"
                  />

                  <div className="mt-2 flex justify-between text-[11px] text-slate-600">
                    <span>6%</span>
                    <span>15%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RESULT PANEL */}

            <div className="relative overflow-hidden rounded-[28px] border border-cyan-400/10 bg-gradient-to-br from-blue-600/[0.12] via-cyan-400/[0.05] to-white/[0.02] p-6 sm:p-8">
              <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl" />

              <div className="relative">
                <div className="mb-7 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10">
                    <BadgeIndianRupee
                      size={21}
                      className="text-cyan-400"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-white">
                      Your Estimate
                    </p>

                    <p className="text-xs text-slate-500">
                      Indicative repayment
                    </p>
                  </div>
                </div>

                <p className="text-xs uppercase tracking-[0.15em] text-slate-500">
                  Monthly EMI
                </p>

                <p className="mt-2 text-4xl font-bold tracking-tight text-white">
                  {formatCurrency(emiData.emi)}
                </p>

                <div className="my-7 border-t border-white/[0.07]" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">
                      Principal
                    </span>

                    <span className="text-sm font-semibold text-white">
                      {formatCurrency(loanAmount)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">
                      Total Interest
                    </span>

                    <span className="text-sm font-semibold text-white">
                      {formatCurrency(emiData.totalInterest)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">
                      Total Payment
                    </span>

                    <span className="text-sm font-semibold text-cyan-400">
                      {formatCurrency(emiData.totalPayment)}
                    </span>
                  </div>
                </div>

                <div className="mt-7 rounded-xl border border-white/[0.06] bg-black/10 p-4">
                  <p className="text-xs leading-5 text-slate-500">
                    Actual EMI, interest rate, fees, eligibility and
                    approval terms may vary based on your profile and
                    lender assessment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            BENEFITS
        ==================================================== */}

        <section className="pt-24">
          <div className="mb-8">
            <p className="text-sm font-semibold text-cyan-400">
              Why SmartBank AI
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Built around smarter borrowing.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.title}
                  className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/15 hover:bg-white/[0.04]"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.06]">
                    <Icon
                      size={20}
                      className="text-cyan-400 transition group-hover:scale-110"
                    />
                  </div>

                  <h3 className="text-base font-semibold text-white">
                    {benefit.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ===================================================
            ELIGIBILITY
        ==================================================== */}

        <section className="pt-24">
          <div className="overflow-hidden rounded-[28px] border border-white/[0.07] bg-white/[0.025]">
            <div className="grid lg:grid-cols-2">
              <div className="p-6 sm:p-8 lg:p-10">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10">
                  <WalletCards
                    size={22}
                    className="text-blue-400"
                  />
                </div>

                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Basic eligibility
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
                  Final eligibility depends on your income, existing
                  obligations, credit profile, property details and
                  lender policies.
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {[
                    "Stable income source",
                    "Valid identity documents",
                    "Acceptable credit profile",
                    "Eligible residential property",
                    "Repayment capacity",
                    "Required financial records",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 rounded-xl border border-white/[0.05] bg-white/[0.02] px-3 py-3 text-sm text-slate-300"
                    >
                      <CheckCircle2
                        size={16}
                        className="shrink-0 text-emerald-400"
                      />

                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/[0.07] bg-gradient-to-br from-blue-600/[0.08] to-cyan-400/[0.04] p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
                <div className="flex items-center gap-3">
                  <Building2
                    size={21}
                    className="text-cyan-400"
                  />

                  <h3 className="text-lg font-semibold text-white">
                    Documents you may need
                  </h3>
                </div>

                <div className="mt-6 space-y-3">
                  {[
                    "Identity and address proof",
                    "Income and employment proof",
                    "Recent bank statements",
                    "Property-related documents",
                    "Additional documents if requested",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-black/10 px-4 py-3"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.04]">
                        <FileText
                          size={15}
                          className="text-slate-400"
                        />
                      </div>

                      <span className="text-sm text-slate-300">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            PROCESS
        ==================================================== */}

        <section id="process" className="scroll-mt-28 pt-24">
          <div className="mb-8">
            <p className="text-sm font-semibold text-cyan-400">
              Application Journey
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              A simple path from plan to property.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <div
                key={step.number}
                className="relative rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6"
              >
                <span className="text-xs font-bold tracking-[0.2em] text-cyan-400">
                  {step.number}
                </span>

                <h3 className="mt-4 text-base font-semibold text-white">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ===================================================
            CTA
        ==================================================== */}

        <section className="pt-24">
          <div className="relative overflow-hidden rounded-[30px] border border-cyan-400/10 bg-gradient-to-r from-blue-600/[0.12] via-cyan-400/[0.06] to-indigo-600/[0.10] p-7 sm:p-10 lg:p-12">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <div className="mb-3 flex items-center gap-2 text-cyan-400">
                  <Banknote size={18} />

                  <span className="text-sm font-semibold">
                    Ready to explore?
                  </span>
                </div>

                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Start with your numbers, not assumptions.
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Use the calculator above to understand your estimated
                  repayment before moving forward.
                </p>
              </div>

              <a
                href="#calculator"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-400 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5"
              >
                Recalculate EMI
                <ArrowRight size={17} />
              </a>
            </div>
          </div>
        </section>

        {/* ===================================================
            DISCLAIMER
        ==================================================== */}

        <p className="mx-auto mt-10 max-w-4xl text-center text-[11px] leading-5 text-slate-600">
          *Displayed rates, EMI calculations, eligibility criteria and
          loan terms are illustrative and may change. Final terms are
          subject to lender policies, applicant profile, verification
          and applicable regulations.
        </p>
      </main>
    </div>
  );
};

export default HomeLoan;

