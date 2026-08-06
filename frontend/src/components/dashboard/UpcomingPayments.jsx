
import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
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
  ChevronRight,
} from "lucide-react";

import api from "../../services/api";

// ==========================================
// LOAN ICON
// ==========================================

const getLoanIcon = (loanType) => {
  const type = String(loanType || "").toLowerCase();

  if (
    type.includes("home") ||
    type.includes("house") ||
    type.includes("mortgage")
  ) {
    return Home;
  }

  if (type.includes("card") || type.includes("credit")) {
    return CreditCard;
  }

  return Landmark;
};

// ==========================================
// LOAN VISUALS
// ==========================================

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
      border: "border-blue-400/10",
    };
  }

  if (type.includes("card") || type.includes("credit")) {
    return {
      color: "text-purple-400",
      iconBg: "bg-purple-400/10",
      border: "border-purple-400/10",
    };
  }

  return {
    color: "text-cyan-400",
    iconBg: "bg-cyan-400/10",
    border: "border-cyan-400/10",
  };
};

// ==========================================
// PAYMENT STATUS
// ==========================================

const getPaymentStatus = (nextPaymentDate) => {
  if (!nextPaymentDate) {
    return {
      label: "Not Scheduled",
      className:
        "border-slate-400/15 bg-slate-400/10 text-slate-400",
    };
  }

  const paymentDate = new Date(nextPaymentDate);

  if (Number.isNaN(paymentDate.getTime())) {
    return {
      label: "Not Scheduled",
      className:
        "border-slate-400/15 bg-slate-400/10 text-slate-400",
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

  const difference = Math.ceil(
    (dueDate.getTime() - today.getTime()) /
      (1000 * 60 * 60 * 24)
  );

  if (difference < 0) {
    return {
      label: "Overdue",
      className:
        "border-red-400/15 bg-red-400/10 text-red-400",
    };
  }

  if (difference === 0) {
    return {
      label: "Due Today",
      className:
        "border-amber-400/15 bg-amber-400/10 text-amber-400",
    };
  }

  if (difference <= 7) {
    return {
      label: "Due Soon",
      className:
        "border-amber-400/15 bg-amber-400/10 text-amber-400",
    };
  }

  return {
    label: "Upcoming",
    className:
      "border-cyan-400/15 bg-cyan-400/10 text-cyan-400",
  };
};

// ==========================================
// CURRENCY
// ==========================================

const formatCurrency = (value) => {
  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    return "₹0.00";
  }

  return `₹${amount.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

// ==========================================
// DATE
// ==========================================

const formatPaymentDate = (value) => {
  if (!value) {
    return "Not scheduled";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not scheduled";
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// ==========================================
// VALUE NORMALIZER
// ==========================================

const getNumericValue = (...values) => {
  for (const value of values) {
    if (
      value !== null &&
      value !== undefined &&
      value !== "" &&
      Number.isFinite(Number(value))
    ) {
      return Number(value);
    }
  }

  return 0;
};

// ==========================================
// UPCOMING PAYMENTS
// ==========================================

const UpcomingPayments = () => {
  const navigate = useNavigate();

  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // ==========================================
  // FETCH ACTIVE LOANS
  // ==========================================

  const fetchUpcomingPayments = useCallback(async () => {
    setLoading(true);
    setError(false);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.warn(
          "UpcomingPayments: authentication token not found."
        );

        setLoans([]);
        return;
      }

      console.log(
        "UpcomingPayments: fetching /loans/active..."
      );

      const response = await api.get("/loans/active");

      console.log(
        "UpcomingPayments: backend response:",
        response?.data
      );

      const responseBody = response?.data;

      if (!responseBody?.success) {
        console.error(
          "UpcomingPayments: API returned success=false",
          responseBody
        );

        setLoans([]);
        setError(true);
        return;
      }

      /*
       * Backend may return:
       *
       * data: [...]
       *
       * or
       *
       * data: {
       *   loans: [...]
       * }
       *
       * Support both safely.
       */

      let backendLoans = responseBody?.data;

      if (!Array.isArray(backendLoans)) {
        if (Array.isArray(responseBody?.data?.loans)) {
          backendLoans = responseBody.data.loans;
        } else if (Array.isArray(responseBody?.loans)) {
          backendLoans = responseBody.loans;
        } else {
          backendLoans = [];
        }
      }

      if (!Array.isArray(backendLoans)) {
        console.error(
          "UpcomingPayments: backend data is not an array:",
          backendLoans
        );

        setLoans([]);
        setError(true);
        return;
      }

      // ==========================================
      // NORMALIZE BACKEND LOAN DATA
      // ==========================================

      const normalizedLoans = backendLoans
        .map((loan) => {
          /*
           * IMPORTANT:
           *
           * Current backend loan card is giving data like:
           *
           * Home
           * ACTIVE
           * Principal $4,001
           * Remaining $4,810
           * Monthly EMI $80
           * Next Payment Not scheduled
           *
           * Therefore we support both the expected backend
           * names and alternate names used by the UI/API.
           */

          const loanType =
            loan?.loanType ||
            loan?.type ||
            loan?.loan_type ||
            "PERSONAL";

          const monthlyEmi = getNumericValue(
            loan?.monthlyEmi,
            loan?.monthlyEMI,
            loan?.emi,
            loan?.monthlyPayment
          );

          const remainingAmount = getNumericValue(
            loan?.remainingAmount,
            loan?.remaining,
            loan?.remainingBalance,
            loan?.outstandingAmount,
            loan?.outstandingBalance,
            loan?.balance
          );

          const principalAmount = getNumericValue(
            loan?.principalAmount,
            loan?.principal,
            loan?.loanAmount,
            loan?.amount
          );

          const nextPaymentDate =
            loan?.nextPaymentDate ||
            loan?.nextDueDate ||
            loan?.nextPayment ||
            null;

          const normalized = {
            id:
              loan?.id ||
              loan?._id ||
              loan?.loanId ||
              "",

            loanType,

            status: String(
              loan?.status ||
                loan?.loanStatus ||
                "ACTIVE"
            ).toUpperCase(),

            principalAmount,

            monthlyEmi,

            remainingAmount,

            nextPaymentDate,
          };

          console.log(
            "UpcomingPayments: normalized loan:",
            normalized
          );

          return normalized;
        })
        .filter((loan) => {
          /*
           * A valid loan must have an ID.
           *
           * We do NOT reject the loan merely because
           * EMI is missing, because the backend can still
           * legitimately return a loan with:
           *
           * Next Payment: Not scheduled
           */

          return Boolean(loan.id);
        });

      console.log(
        "UpcomingPayments: FINAL LOANS:",
        normalizedLoans
      );

      setLoans(normalizedLoans);
    } catch (err) {
      console.error(
        "UpcomingPayments: request failed:",
        err?.response?.data ||
          err?.message ||
          err
      );

      setLoans([]);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  // ==========================================
  // INITIAL LOAD
  // ==========================================

  useEffect(() => {
    fetchUpcomingPayments();

    const handleDashboardUpdated = () => {
      fetchUpcomingPayments();
    };

    const handleLoanUpdated = () => {
      fetchUpcomingPayments();
    };

    window.addEventListener(
      "dashboardUpdated",
      handleDashboardUpdated
    );

    window.addEventListener(
      "loanUpdated",
      handleLoanUpdated
    );

    return () => {
      window.removeEventListener(
        "dashboardUpdated",
        handleDashboardUpdated
      );

      window.removeEventListener(
        "loanUpdated",
        handleLoanUpdated
      );
    };
  }, [fetchUpcomingPayments]);

  // ==========================================
  // SORT BY NEXT PAYMENT DATE
  // ==========================================

  const sortedLoans = useMemo(() => {
    return [...loans].sort((a, b) => {
      if (!a.nextPaymentDate) {
        return 1;
      }

      if (!b.nextPaymentDate) {
        return -1;
      }

      const dateA = new Date(
        a.nextPaymentDate
      ).getTime();

      const dateB = new Date(
        b.nextPaymentDate
      ).getTime();

      if (!Number.isFinite(dateA)) {
        return 1;
      }

      if (!Number.isFinite(dateB)) {
        return -1;
      }

      return dateA - dateB;
    });
  }, [loans]);

  // ==========================================
  // TOTAL UPCOMING EMI
  // ==========================================

  const totalUpcoming = useMemo(() => {
    return sortedLoans.reduce(
      (total, loan) => {
        const emi = Number(loan?.monthlyEmi);

        if (!Number.isFinite(emi) || emi <= 0) {
          return total;
        }

        return total + emi;
      },
      0
    );
  }, [sortedLoans]);

  // ==========================================
  // NEXT DUE DATE
  // ==========================================

  const nextDueDate = useMemo(() => {
    const loan = sortedLoans.find(
      (item) => item?.nextPaymentDate
    );

    return loan?.nextPaymentDate || null;
  }, [sortedLoans]);

  // ==========================================
  // VIEW ALL
  // ==========================================

  const handleViewAllPayments = () => {
    navigate("/loans");
  };

  // ==========================================
  // UI
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
      {/* DECORATION */}

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

      {/* HEADER */}

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div
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
            "
          >
            <CalendarClock
              size={22}
              strokeWidth={1.8}
              className="text-cyan-400"
            />
          </div>

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
            {loading
              ? "Loading"
              : `${loans.length} ${
                  loans.length === 1
                    ? "Payment"
                    : "Payments"
                }`}
          </span>
        </div>
      </div>

      {/* LOADING */}

      {loading && (
        <div className="relative mt-7 space-y-3">
          {[1, 2].map((item) => (
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

      {/* ERROR */}

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

      {/* EMPTY */}

      {!loading &&
        !error &&
        sortedLoans.length === 0 && (
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

            <button
              type="button"
              onClick={handleViewAllPayments}
              className="
                mt-5
                inline-flex
                items-center
                gap-2
                rounded-xl
                border
                border-cyan-400/15
                bg-cyan-400/[0.05]
                px-4
                py-2.5
                text-xs
                font-semibold
                text-cyan-400
                transition-all
                hover:border-cyan-400/30
                hover:bg-cyan-400/10
              "
            >
              Go to Loans
              <ChevronRight size={14} />
            </button>
          </div>
        )}

      {/* PAYMENTS */}

      {!loading &&
        !error &&
        sortedLoans.length > 0 && (
          <div className="relative mt-7 space-y-3">
            {sortedLoans
              .slice(0, 3)
              .map((loan, index) => {
                const Icon = getLoanIcon(
                  loan.loanType
                );

                const visuals = getLoanVisuals(
                  loan.loanType
                );

                const paymentStatus =
                  getPaymentStatus(
                    loan.nextPaymentDate
                  );

                return (
                  <motion.div
                    key={loan.id || index}
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
                      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                        <div
                          className={`
                            flex
                            h-11
                            w-11
                            shrink-0
                            items-center
                            justify-center
                            rounded-2xl
                            border
                            ${visuals.border}
                            ${visuals.iconBg}
                            ${visuals.color}
                            sm:h-12
                            sm:w-12
                          `}
                        >
                          <Icon
                            size={20}
                            strokeWidth={1.8}
                          />
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h3
                              className="
                                truncate
                                text-[13px]
                                font-bold
                                text-white
                                sm:text-sm
                              "
                            >
                              {loan.loanType}
                            </h3>

                            <span
                              className="
                                shrink-0
                                rounded-full
                                border
                                border-emerald-400/10
                                bg-emerald-400/[0.06]
                                px-2
                                py-0.5
                                text-[7px]
                                font-bold
                                uppercase
                                tracking-wider
                                text-emerald-400
                              "
                            >
                              {loan.status}
                            </span>
                          </div>

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
                              {loan.nextPaymentDate
                                ? `Due ${formatPaymentDate(
                                    loan.nextPaymentDate
                                  )}`
                                : "Next payment not scheduled"}
                            </p>
                          </div>
                        </div>
                      </div>

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
                            loan.monthlyEmi
                          )}
                        </h3>

                        <span
                          className={`
                            mt-1.5
                            inline-flex
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

                    <div
                      className="
                        relative
                        mt-4
                        grid
                        grid-cols-2
                        gap-3
                        border-t
                        border-white/[0.05]
                        pt-3
                      "
                    >
                      <div>
                        <span
                          className="
                            block
                            text-[9px]
                            font-medium
                            uppercase
                            tracking-[0.12em]
                            text-slate-600
                          "
                        >
                          Principal
                        </span>

                        <span
                          className="
                            mt-1
                            block
                            text-[11px]
                            font-semibold
                            text-slate-400
                          "
                        >
                          {formatCurrency(
                            loan.principalAmount
                          )}
                        </span>
                      </div>

                      <div className="text-right">
                        <span
                          className="
                            block
                            text-[9px]
                            font-medium
                            uppercase
                            tracking-[0.12em]
                            text-slate-600
                          "
                        >
                          Remaining
                        </span>

                        <span
                          className="
                            mt-1
                            block
                            text-[11px]
                            font-semibold
                            text-slate-400
                          "
                        >
                          {formatCurrency(
                            loan.remainingAmount
                          )}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
          </div>
        )}

      {/* SUMMARY */}

      {!loading &&
        !error &&
        sortedLoans.length > 0 && (
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
                  : "Not scheduled"}
              </p>
            </div>
          </div>
        )}

      {/* VIEW ALL */}

      {!loading &&
        !error &&
        sortedLoans.length > 0 && (
          <motion.button
            type="button"
            onClick={handleViewAllPayments}
            whileHover={{
              y: -2,
            }}
            whileTap={{
              scale: 0.985,
            }}
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
              hover:border-cyan-300/30
              hover:shadow-xl
              hover:shadow-blue-500/20
            "
          >
            <span
              className="
                relative
                z-10
                flex
                items-center
                gap-2
              "
            >
              View All Payments

              <ArrowRight
                size={17}
                className="
                  transition-transform
                  duration-300
                  group-hover/button:translate-x-1
                "
              />
            </span>
          </motion.button>
        )}

      {/* FOOTER */}

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
          "
        >
          SmartBank payment monitoring
        </p>
      </div>
    </motion.div>
  );
};

export default UpcomingPayments;

