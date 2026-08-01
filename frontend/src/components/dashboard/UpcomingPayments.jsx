
import { motion } from "framer-motion";
import {
  Home,
  CreditCard,
  Zap,
  CalendarClock,
  ArrowRight,
  Clock3,
  CheckCircle2,
} from "lucide-react";

const UpcomingPayments = () => {
  const payments = [
    {
      title: "Home Loan EMI",
      amount: "₹850",
      date: "28 July",
      status: "Due Soon",
      icon: Home,
      color: "text-blue-400",
      iconBg: "bg-blue-400/10",
      statusColor:
        "text-amber-400 bg-amber-400/10 border-amber-400/15",
    },
    {
      title: "Credit Card Bill",
      amount: "₹320",
      date: "30 July",
      status: "Upcoming",
      icon: CreditCard,
      color: "text-purple-400",
      iconBg: "bg-purple-400/10",
      statusColor:
        "text-cyan-400 bg-cyan-400/10 border-cyan-400/15",
    },
    {
      title: "Electricity Bill",
      amount: "₹80",
      date: "2 August",
      status: "Scheduled",
      icon: Zap,
      color: "text-yellow-400",
      iconBg: "bg-yellow-400/10",
      statusColor:
        "text-emerald-400 bg-emerald-400/10 border-emerald-400/15",
    },
  ];

  const totalUpcoming = payments.reduce((total, payment) => {
    return (
      total +
      Number(payment.amount.replace(/[^\d]/g, ""))
    );
  }, 0);

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
            {payments.length} Payments
          </span>
        </div>
      </div>

      {/* =========================
          PAYMENT LIST
      ========================== */}

      <div className="relative mt-7 space-y-3">
        {payments.map((payment, index) => {
          const Icon = payment.icon;

          return (
            <motion.div
              key={payment.title}
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
                      ${payment.iconBg}
                      ${payment.color}
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
                      {payment.title}
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
                        Due {payment.date}
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
                    {payment.amount}
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
                      ${payment.statusColor}
                    `}
                  >
                    {payment.status}
                  </span>
                </div>
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

      {/* =========================
          SUMMARY
      ========================== */}

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
            Total Upcoming
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
            ₹{totalUpcoming.toLocaleString("en-IN")}
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
            28 July
          </p>
        </div>
      </div>

      {/* =========================
          VIEW ALL BUTTON
      ========================== */}

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

