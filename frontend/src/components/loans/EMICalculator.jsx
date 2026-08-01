import { useMemo, useState } from "react";

import {
Calculator,
DollarSign,
Percent,
CalendarDays,
TrendingUp,
WalletCards,
Info,
} from "lucide-react";

const EMICalculator = () => {
const [amount, setAmount] = useState(500000);
const [rate, setRate] = useState(8);
const [years, setYears] = useState(5);

const emiData = useMemo(() => {
const principal = Number(amount);
const annualRate = Number(rate);
const tenureYears = Number(years);

if (
  !Number.isFinite(principal) ||
  !Number.isFinite(annualRate) ||
  !Number.isFinite(tenureYears) ||
  principal <= 0 ||
  annualRate < 0 ||
  tenureYears <= 0
) {
  return {
    emi: 0,
    totalPayment: 0,
    totalInterest: 0,
  };
}

const months = tenureYears * 12;
const monthlyRate = annualRate / 12 / 100;

let emi;

if (monthlyRate === 0) {
  emi = principal / months;
} else {
  const factor = Math.pow(1 + monthlyRate, months);

  emi = (principal * monthlyRate * factor) / (factor - 1);
}

const totalPayment = emi * months;
const totalInterest = totalPayment - principal;

return {
  emi,
  totalPayment,
  totalInterest,
};

}, [amount, rate, years]);

const formatCurrency = (value) => {
return new Intl.NumberFormat("en-US", {
style: "currency",
currency: "USD",
maximumFractionDigits: 0,
}).format(Number(value) || 0);
};

const handleAmountChange = (event) => {
const value = Number(event.target.value);

setAmount(
  Number.isFinite(value) && value >= 0 ? value : 0
);

};

const handleRateChange = (event) => {
const value = Number(event.target.value);

setRate(
  Number.isFinite(value) && value >= 0 ? value : 0
);

};

const handleYearsChange = (event) => {
const value = Number(event.target.value);

setYears(
  Number.isFinite(value) && value >= 1 ? value : 1
);

};

return (
<section className="mt-10 overflow-hidden rounded-[30px] border border-white/[0.08] bg-white/[0.025] shadow-2xl shadow-black/10">
{/* =========================================
HEADER
========================================= */}

  <div className="relative overflow-hidden border-b border-white/[0.07] p-6 sm:p-8">
    <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-cyan-400/[0.06] blur-3xl" />

    <div className="pointer-events-none absolute -bottom-32 left-1/3 h-60 w-60 rounded-full bg-blue-600/[0.05] blur-3xl" />

    <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/15 bg-cyan-400/[0.08]">
          <Calculator
            size={21}
            className="text-cyan-400"
          />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-400">
              Smart Calculator
            </p>

            <span className="rounded-full border border-emerald-400/10 bg-emerald-400/[0.05] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-emerald-400">
              Live
            </span>
          </div>

          <h2 className="mt-1 text-xl font-bold tracking-tight text-white sm:text-2xl">
            EMI Calculator
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Estimate your monthly loan repayment instantly.
          </p>
        </div>
      </div>

      <div className="hidden items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.025] px-3 py-2 sm:flex">
        <TrendingUp
          size={14}
          className="text-emerald-400"
        />

        <span className="text-[10px] font-semibold text-slate-500">
          Real-time estimate
        </span>
      </div>
    </div>
  </div>

  {/* =========================================
      MAIN CONTENT
  ========================================= */}

  <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.15fr_0.85fr]">
    {/* =========================================
        CONTROLS
    ========================================= */}

    <div className="space-y-7">
      {/* LOAN AMOUNT */}

      <div>
        <div className="flex items-center justify-between gap-4">
          <label
            htmlFor="emi-loan-amount"
            className="flex items-center gap-2 text-sm font-medium text-slate-300"
          >
            <DollarSign
              size={15}
              className="text-cyan-400"
            />

            Loan Amount
          </label>

          <span className="text-lg font-bold text-white">
            {formatCurrency(amount)}
          </span>
        </div>

        <input
          id="emi-loan-amount"
          type="number"
          min="10000"
          max="5000000"
          step="5000"
          value={amount}
          onChange={handleAmountChange}
          className="mt-4 w-full rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-cyan-400/30 focus:bg-cyan-400/[0.02]"
        />

        <input
          type="range"
          min="10000"
          max="5000000"
          step="5000"
          value={Math.min(
            Math.max(Number(amount) || 10000, 10000),
            5000000
          )}
          onChange={handleAmountChange}
          className="mt-4 w-full cursor-pointer accent-cyan-400"
        />

        <div className="mt-2 flex justify-between text-[10px] font-medium text-slate-700">
          <span>$10K</span>
          <span>$5M</span>
        </div>
      </div>

      {/* INTEREST RATE */}

      <div>
        <div className="flex items-center justify-between gap-4">
          <label
            htmlFor="emi-interest-rate"
            className="flex items-center gap-2 text-sm font-medium text-slate-300"
          >
            <Percent
              size={15}
              className="text-cyan-400"
            />

            Interest Rate
          </label>

          <span className="text-lg font-bold text-white">
            {Number(rate).toFixed(1)}%
          </span>
        </div>

        <input
          id="emi-interest-rate"
          type="number"
          min="0"
          max="25"
          step="0.1"
          value={rate}
          onChange={handleRateChange}
          className="mt-4 w-full rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/30 focus:bg-cyan-400/[0.02]"
        />

        <input
          type="range"
          min="0"
          max="25"
          step="0.1"
          value={Math.min(
            Math.max(Number(rate) || 0, 0),
            25
          )}
          onChange={handleRateChange}
          className="mt-4 w-full cursor-pointer accent-cyan-400"
        />

        <div className="mt-2 flex justify-between text-[10px] font-medium text-slate-700">
          <span>0%</span>
          <span>25%</span>
        </div>
      </div>

      {/* TENURE */}

      <div>
        <div className="flex items-center justify-between gap-4">
          <label
            htmlFor="emi-loan-tenure"
            className="flex items-center gap-2 text-sm font-medium text-slate-300"
          >
            <CalendarDays
              size={15}
              className="text-cyan-400"
            />

            Loan Tenure
          </label>

          <span className="text-lg font-bold text-white">
            {years} {Number(years) === 1 ? "Year" : "Years"}
          </span>
        </div>

        <input
          id="emi-loan-tenure"
          type="number"
          min="1"
          max="30"
          step="1"
          value={years}
          onChange={handleYearsChange}
          className="mt-4 w-full rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/30 focus:bg-cyan-400/[0.02]"
        />

        <input
          type="range"
          min="1"
          max="30"
          step="1"
          value={Math.min(
            Math.max(Number(years) || 1, 1),
            30
          )}
          onChange={handleYearsChange}
          className="mt-4 w-full cursor-pointer accent-cyan-400"
        />

        <div className="mt-2 flex justify-between text-[10px] font-medium text-slate-700">
          <span>1 Year</span>
          <span>30 Years</span>
        </div>
      </div>

      {/* INFO */}

      <div className="flex items-start gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
        <Info
          size={16}
          className="mt-0.5 shrink-0 text-slate-600"
        />

        <p className="text-[10px] leading-5 text-slate-600">
          Adjust the loan amount, interest rate, and tenure
          to see how your estimated monthly payment changes.
        </p>
      </div>
    </div>

    {/* =========================================
        RESULTS
    ========================================= */}

    <div className="relative overflow-hidden rounded-[28px] border border-cyan-400/10 bg-gradient-to-br from-cyan-400/[0.09] via-blue-600/[0.06] to-transparent p-6 sm:p-7">
      <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-400/[0.08] blur-3xl" />

      <div className="relative">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-400">
              Estimated Payment
            </p>

            <p className="mt-2 text-xs text-slate-500">
              Your approximate monthly EMI
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/[0.08]">
            <WalletCards
              size={18}
              className="text-cyan-400"
            />
          </div>
        </div>

        <div className="mt-6">
          <p className="text-4xl font-bold tracking-tight text-white sm:text-[42px]">
            {formatCurrency(emiData.emi)}
          </p>

          <p className="mt-1 text-xs text-slate-600">
            per month
          </p>
        </div>

        <div className="my-6 h-px bg-white/[0.07]" />

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs text-slate-500">
              Principal Amount
            </span>

            <span className="text-sm font-semibold text-white">
              {formatCurrency(amount)}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-xs text-slate-500">
              Total Interest
            </span>

            <span className="text-sm font-semibold text-cyan-400">
              {formatCurrency(emiData.totalInterest)}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-xs text-slate-500">
              Total Payment
            </span>

            <span className="text-sm font-semibold text-white">
              {formatCurrency(emiData.totalPayment)}
            </span>
          </div>
        </div>

        {/* PAYMENT SUMMARY */}

        <div className="mt-7 rounded-2xl border border-white/[0.06] bg-black/10 p-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">
              Loan Summary
            </span>

            <span className="text-[10px] font-semibold text-emerald-400">
              {years}Y / {Number(rate).toFixed(1)}%
            </span>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/[0.06]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500"
              style={{
                width: `${
                  emiData.totalPayment > 0
                    ? Math.min(
                        Math.max(
                          (emiData.totalInterest /
                            emiData.totalPayment) *
                            100,
                          0
                        ),
                        100
                      )
                    : 0
                }%`,
              }}
            />
          </div>

          <div className="mt-3 flex items-center justify-between text-[9px]">
            <span className="text-slate-600">
              Principal
            </span>

            <span className="text-slate-600">
              Interest
            </span>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-amber-400/10 bg-amber-400/[0.025] p-4">
          <p className="text-[10px] leading-5 text-slate-600">
            This calculator provides an estimate only. Actual
            interest rates, fees, and repayment terms may vary
            based on your approved loan application.
          </p>
        </div>
      </div>
    </div>
  </div>

  {/* =========================================
      FOOTER NOTE
  ========================================= */}

  <div className="border-t border-white/[0.06] px-6 py-4 sm:px-8">
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-700">
      <span className="flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        Live Calculation
      </span>

      <span className="h-1 w-1 rounded-full bg-slate-700" />

      <span>SmartBank AI</span>

      <span className="h-1 w-1 rounded-full bg-slate-700" />

      <span>Estimated Results</span>
    </div>
  </div>
</section>

);
};

export default EMICalculator;