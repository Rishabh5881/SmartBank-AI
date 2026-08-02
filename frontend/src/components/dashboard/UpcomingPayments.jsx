import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
Home,
CreditCard,
Landmark,
CalendarClock,
ArrowRight,
Clock3,
CheckCircle2,
AlertCircle,
RefreshCw,
WalletCards,
} from "lucide-react";

import api from "../../services/api";

const getLoanIcon = (loanType) => {
const type = String(loanType || "").toLowerCase();

if (
type.includes("home") ||
type.includes("house") ||
type.includes("mortgage")
) {
return Home;
}

if (
type.includes("card") ||
type.includes("credit")
) {
return CreditCard;
}

return Landmark;
};

const getLoanVisuals = (loanType) => {
const type = String(loanType || "").toLowerCase();

if (
type.includes("home") ||
type.includes("house") ||
type.includes("mortgage")
) {
return {
color: "text-blue-400",
iconBg: "bg-blue-400/10",
};
}

if (
type.includes("card") ||
type.includes("credit")
) {
return {
color: "text-purple-400",
iconBg: "bg-purple-400/10",
};
}

return {
color: "text-cyan-400",
iconBg: "bg-cyan-400/10",
};
};

const getPaymentStatus = (nextPaymentDate) => {
if (!nextPaymentDate) {
return {
label: "No Due Date",
className:
"text-slate-400 bg-slate-400/10 border-slate-400/15",
};
}

const paymentDate = new Date(nextPaymentDate);

if (Number.isNaN(paymentDate.getTime())) {
return {
label: "Date Unavailable",
className:
"text-slate-400 bg-slate-400/10 border-slate-400/15",
};
}

const now = new Date();

const today = new Date(
now.getFullYear(),
now.getMonth(),
now.getDate()
);

const dueDate = new Date(
paymentDate.getFullYear(),
paymentDate.getMonth(),
paymentDate.getDate()
);

const difference =
Math.ceil(
(dueDate.getTime() - today.getTime()) /
(1000 * 60 * 60 * 24)
);

if (difference < 0) {
return {
label: "Overdue",
className:
"text-red-400 bg-red-400/10 border-red-400/15",
};
}

if (difference === 0) {
return {
label: "Due Today",
className:
"text-amber-400 bg-amber-400/10 border-amber-400/15",
};
}

if (difference <= 7) {
return {
label: "Due Soon",
className:
"text-amber-400 bg-amber-400/10 border-amber-400/15",
};
}

return {
label: "Upcoming",
className:
"text-cyan-400 bg-cyan-400/10 border-cyan-400/15",
};
};

const formatCurrency = (value) => {
const amount = Number(value || 0);

if (!Number.isFinite(amount)) {
return "₹0";
}

return `₹${amount.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;
};

const formatPaymentDate = (value) => {
if (!value) {
return "Date unavailable";
}

const date = new Date(value);

if (Number.isNaN(date.getTime())) {
return "Date unavailable";
}

return date.toLocaleDateString("en-IN", {
day: "2-digit",
month: "short",
year: "numeric",
});
};

const UpcomingPayments = () => {
const [loans, setLoans] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(false);

const fetchUpcomingPayments = useCallback(async () => {
try {
setLoading(true);
setError(false);


  const token = localStorage.getItem("token");

  if (!token) {
    setLoans([]);
    return;
  }

  const response = await api.get("/loans/active");

  if (response.data?.success) {
    const data = Array.isArray(response.data?.data)
      ? response.data.data
      : [];

    setLoans(data);
  } else {
    setLoans([]);
    setError(true);
  }
} catch (err) {
  console.error(
    "UPCOMING PAYMENTS ERROR:",
    err?.response?.data || err?.message
  );

  setLoans([]);
  setError(true);
} finally {
  setLoading(false);
}


}, []);

useEffect(() => {
fetchUpcomingPayments();


const handleDashboardUpdate = () => {
  fetchUpcomingPayments();
};

const handleLoanUpdate = () => {
  fetchUpcomingPayments();
};

window.addEventListener(
  "dashboardUpdated",
  handleDashboardUpdate
);

window.addEventListener(
  "loanUpdated",
  handleLoanUpdate
);

return () => {
  window.removeEventListener(
    "dashboardUpdated",
    handleDashboardUpdate
  );

  window.removeEventListener(
    "loanUpdated",
    handleLoanUpdate
  );
};


}, [fetchUpcomingPayments]);

const sortedLoans = useMemo(() => {
return [...loans].sort((a, b) => {
if (!a?.nextPaymentDate) {
return 1;
}


  if (!b?.nextPaymentDate) {
    return -1;
  }

  return (
    new Date(a.nextPaymentDate).getTime() -
    new Date(b.nextPaymentDate).getTime()
  );
});


}, [loans]);

const totalUpcoming = useMemo(() => {
return sortedLoans.reduce((total, loan) => {
return total + Number(loan?.monthlyEmi || 0);
}, 0);
}, [sortedLoans]);

const nextDueDate = useMemo(() => {
const firstLoan = sortedLoans.find(
(loan) => loan?.nextPaymentDate
);


return firstLoan?.nextPaymentDate || null;


}, [sortedLoans]);

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
duration: 0.6,
ease: "easeOut",
}}
className="
group
relative
overflow-hidden
rounded-[28px]
border
border-white/[0.08]
bg-white/[0.045]
p-5
text-white
shadow-2xl
shadow-black/20
backdrop-blur-2xl
transition-all
duration-500
hover:border-cyan-400/20
hover:bg-white/[0.055]
sm:p-6
"
>
{/* =========================
BACKGROUND GLOWS
========================== */}


  <div
    className="
      pointer-events-none
      absolute
      -right-24
      -top-24
      h-64
      w-64
      rounded-full
      bg-cyan-500/10
      blur-[90px]
      transition-transform
      duration-700
      group-hover:scale-125
    "
  />

  <div
    className="
      pointer-events-none
      absolute
      -bottom-24
      -left-20
      h-52
      w-52
      rounded-full
      bg-blue-500/[0.06]
      blur-[80px]
    "
  />

  <div
    className="
      pointer-events-none
      absolute
      inset-x-0
      top-0
      h-px
      bg-gradient-to-r
      from-transparent
      via-cyan-400/30
      to-transparent
    "
  />

  {/* =========================
      HEADER
  ========================== */}

  <div className="relative flex items-start justify-between gap-4">
    <div className="flex min-w-0 items-center gap-3">
      <motion.div
        whileHover={{
          scale: 1.06,
          rotate: 3,
        }}
        className="
          flex
          h-12
          w-12
          shrink-0
          items-center
          justify-center
          rounded-2xl
          border
          border-cyan-400/10
          bg-gradient-to-br
          from-cyan-400/15
          to-blue-500/10
          shadow-lg
          shadow-cyan-500/5
        "
      >
        <CalendarClock
          size={22}
          strokeWidth={1.8}
          className="text-cyan-400"
        />
      </motion.div>

      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <Clock3
            size={12}
            className="shrink-0 text-cyan-400"
          />

          <p
            className="
              truncate
              text-[9px]
              font-bold
              uppercase
              tracking-[0.18em]
              text-cyan-400
              sm:text-[10px]
              sm:tracking-[0.2em]
            "
          >
            Payment Schedule
          </p>
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
          Upcoming Payments
        </h2>
      </div>
    </div>

    <div
      className="
        hidden
        shrink-0
        items-center
        gap-1.5
        rounded-full
        border
        border-white/10
        bg-white/[0.04]
        px-3
        py-1.5
        sm:flex
      "
    >
      <span
        className="
          h-1.5
          w-1.5
          rounded-full
          bg-cyan-400
          shadow-lg
          shadow-cyan-400/60
        "
      />

      <span
        className="
          text-[9px]
          font-semibold
          uppercase
          tracking-[0.15em]
          text-slate-500
        "
      >
        {loading ? "Loading" : `${loans.length} Payments`}
      </span>
    </div>
  </div>

  {/* =========================
      LOADING STATE
  ========================== */}

  {loading && (
    <div className="relative mt-7 space-y-3">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="
            animate-pulse
            rounded-2xl
            border
            border-white/[0.06]
            bg-white/[0.025]
            p-4
          "
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-white/[0.06]" />

              <div>
                <div className="h-3 w-32 rounded bg-white/[0.06]" />

                <div className="mt-2 h-2.5 w-24 rounded bg-white/[0.04]" />
              </div>
            </div>

            <div className="text-right">
              <div className="ml-auto h-4 w-20 rounded bg-white/[0.06]" />

              <div className="mt-2 ml-auto h-5 w-16 rounded-full bg-white/[0.04]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )}

  {/* =========================
      ERROR STATE
  ========================== */}

  {!loading && error && (
    <div
      className="
        relative
        mt-7
        rounded-2xl
        border
        border-red-400/10
        bg-red-400/[0.04]
        p-6
        text-center
      "
    >
      <div
        className="
          mx-auto
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-2xl
          border
          border-red-400/10
          bg-red-400/[0.07]
        "
      >
        <AlertCircle
          size={22}
          className="text-red-400"
        />
      </div>

      <p className="mt-4 text-sm font-semibold text-slate-300">
        Unable to load upcoming payments
      </p>

      <p className="mt-1 text-xs leading-5 text-slate-600">
        We could not fetch your active loans right now.
      </p>

      <button
        type="button"
        onClick={fetchUpcomingPayments}
        className="
          mt-5
          inline-flex
          items-center
          gap-2
          rounded-xl
          border
          border-white/[0.08]
          bg-white/[0.04]
          px-4
          py-2.5
          text-xs
          font-semibold
          text-slate-300
          transition
          hover:border-cyan-400/20
          hover:bg-cyan-400/[0.05]
          hover:text-cyan-400
        "
      >
        <RefreshCw size={14} />

        Try Again
      </button>
    </div>
  )}

  {/* =========================
      EMPTY STATE
  ========================== */}

  {!loading && !error && sortedLoans.length === 0 && (
    <div
      className="
        relative
        mt-7
        flex
        min-h-48
        flex-col
        items-center
        justify-center
        rounded-2xl
        border
        border-white/[0.06]
        bg-white/[0.02]
        p-7
        text-center
      "
    >
      <div
        className="
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          border
          border-cyan-400/10
          bg-cyan-400/[0.05]
        "
      >
        <WalletCards
          size={24}
          className="text-cyan-400/70"
        />
      </div>

      <p className="mt-4 text-sm font-semibold text-slate-300">
        No upcoming payments
      </p>

      <p className="mt-1 max-w-xs text-xs leading-5 text-slate-600">
        Your active loan EMI payments will appear here
        automatically.
      </p>
    </div>
  )}

  {/* =========================
      PAYMENT LIST
  ========================== */}

  {!loading && !error && sortedLoans.length > 0 && (
    <div className="relative mt-7 space-y-3">
      {sortedLoans
        .slice(0, 3)
        .map((loan, index) => {
          const Icon = getLoanIcon(loan?.loanType);
          const visuals = getLoanVisuals(
            loan?.loanType
          );
          const paymentStatus = getPaymentStatus(
            loan?.nextPaymentDate
          );

          return (
            <motion.div
              key={loan?.id || index}
              initial={{
                opacity: 0,
                x: -15,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.4,
                delay: 0.15 + index * 0.08,
              }}
              whileHover={{
                y: -3,
              }}
              className="
                group/payment
                relative
                overflow-hidden
                rounded-2xl
                border
                border-white/[0.07]
                bg-white/[0.035]
                p-4
                transition-all
                duration-300
                hover:border-white/[0.14]
                hover:bg-white/[0.06]
              "
            >
              {/* Hover Shine */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-gradient-to-r
                  from-white/[0.05]
                  via-transparent
                  to-transparent
                  opacity-0
                  transition-opacity
                  duration-300
                  group-hover/payment:opacity-100
                "
              />

              <div
                className="
                  relative
                  flex
                  items-center
                  justify-between
                  gap-3
                  sm:gap-4
                "
              >
                {/* LEFT */}

                <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                  <motion.div
                    whileHover={{
                      scale: 1.08,
                    }}
                    className={`
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-2xl
                      border
                      border-white/[0.06]
                      ${visuals.iconBg}
                      ${visuals.color}
                      transition-transform
                      duration-300
                      sm:h-12
                      sm:w-12
                    `}
                  >
                    <Icon
                      size={20}
                      strokeWidth={1.8}
                    />
                  </motion.div>

                  <div className="min-w-0">
                    <h3
                      className="
                        truncate
                        text-[13px]
                        font-bold
                        text-white
                        sm:text-sm
                      "
                    >
                      {loan?.loanType || "Loan EMI"}
                    </h3>

                    <div className="mt-1.5 flex items-center gap-2">
                      <span
                        className="
                          h-1
                          w-1
                          shrink-0
                          rounded-full
                          bg-slate-600
                        "
                      />

                      <p className="truncate text-[11px] text-slate-500 sm:text-xs">
                        {loan?.nextPaymentDate
                          ? `Due ${formatPaymentDate(
                              loan.nextPaymentDate
                            )}`
                          : "Due date unavailable"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* RIGHT */}

                <div className="shrink-0 text-right">
                  <h3
                    className="
                      text-base
                      font-bold
                      tracking-tight
                      text-white
                      sm:text-lg
                    "
                  >
                    {formatCurrency(
                      loan?.monthlyEmi
                    )}
                  </h3>

                  <span
                    className={`
                      mt-1.5
                      inline-flex
                      max-w-full
                      items-center
                      rounded-full
                      border
                      px-2
                      py-1
                      text-[8px]
                      font-bold
                      uppercase
                      tracking-wider
                      sm:px-2.5
                      sm:text-[9px]
                      ${paymentStatus.className}
                    `}
                  >
                    {paymentStatus.label}
                  </span>
                </div>
              </div>

              {/* Remaining Amount */}

              <div
                className="
                  relative
                  mt-4
                  flex
                  items-center
                  justify-between
                  border-t
                  border-white/[0.05]
                  pt-3
                "
              >
                <span className="text-[9px] font-medium uppercase tracking-[0.12em] text-slate-600">
                  Remaining
                </span>

                <span className="text-[11px] font-semibold text-slate-400">
                  {formatCurrency(
                    loan?.remainingAmount
                  )}
                </span>
              </div>

              {/* Bottom Progress Accent */}

              <div
                className="
                  pointer-events-none
                  absolute
                  bottom-0
                  left-1/2
                  h-px
                  w-0
                  -translate-x-1/2
                  bg-gradient-to-r
                  from-transparent
                  via-cyan-400/60
                  to-transparent
                  transition-all
                  duration-500
                  group-hover/payment:w-[70%]
                "
              />
            </motion.div>
          );
        })}
    </div>
  )}

  {/* =========================
      SUMMARY
  ========================== */}

  {!loading && !error && sortedLoans.length > 0 && (
    <div
      className="
        relative
        mt-5
        grid
        grid-cols-2
        gap-3
      "
    >
      <div
        className="
          rounded-2xl
          border
          border-white/[0.06]
          bg-white/[0.025]
          px-4
          py-3.5
        "
      >
        <p
          className="
            text-[8px]
            font-semibold
            uppercase
            tracking-[0.15em]
            text-slate-600
            sm:text-[9px]
          "
        >
          Total Upcoming EMI
        </p>

        <p
          className="
            mt-1
            text-base
            font-bold
            text-slate-200
            sm:text-lg
          "
        >
          {formatCurrency(totalUpcoming)}
        </p>
      </div>

      <div
        className="
          rounded-2xl
          border
          border-cyan-400/10
          bg-cyan-400/[0.035]
          px-4
          py-3.5
          text-right
        "
      >
        <p
          className="
            text-[8px]
            font-semibold
            uppercase
            tracking-[0.15em]
            text-slate-600
            sm:text-[9px]
          "
        >
          Next Due
        </p>

        <p
          className="
            mt-1
            text-base
            font-semibold
            text-cyan-400
            sm:text-lg
          "
        >
          {nextDueDate
            ? formatPaymentDate(nextDueDate)
            : "—"}
        </p>
      </div>
    </div>
  )}

  {/* =========================
      VIEW ALL BUTTON
  ========================== */}

  {!loading && !error && sortedLoans.length > 3 && (
    <button
      type="button"
      className="
        group/button
        relative
        mt-5
        flex
        w-full
        items-center
        justify-center
        gap-2
        overflow-hidden
        rounded-xl
        border
        border-blue-500/20
        bg-gradient-to-r
        from-blue-600
        to-cyan-500
        py-3
        text-sm
        font-bold
        text-white
        shadow-lg
        shadow-blue-500/10
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:shadow-xl
        hover:shadow-blue-500/20
        active:scale-[0.99]
      "
    >
      <span className="relative z-10">
        View All Payments
      </span>

      <ArrowRight
        size={17}
        className="
          relative
          z-10
          transition-transform
          duration-300
          group-hover/button:translate-x-1
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          -translate-x-full
          bg-gradient-to-r
          from-transparent
          via-white/15
          to-transparent
          transition-transform
          duration-700
          group-hover/button:translate-x-full
        "
      />
    </button>
  )}

  {/* =========================
      SECURITY INDICATOR
  ========================== */}

  <div
    className="
      relative
      mt-5
      flex
      items-center
      justify-center
      gap-2
      border-t
      border-white/[0.06]
      pt-5
    "
  >
    <CheckCircle2
      size={12}
      className="text-emerald-400"
    />

    <p
      className="
        text-[8px]
        font-medium
        uppercase
        tracking-[0.14em]
        text-slate-600
        sm:text-[9px]
        sm:tracking-[0.15em]
      "
    >
      SmartBank payment monitoring
    </p>
  </div>
</motion.div>


);
};

export default UpcomingPayments;
