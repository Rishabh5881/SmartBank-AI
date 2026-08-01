import { motion } from "framer-motion";
import {
  Wifi,
  CreditCard,
  Eye,
  EyeOff,
  Sparkles,
  LockKeyhole,
} from "lucide-react";
import { useEffect, useState } from "react";

import api from "../../services/api";

const BankCard = () => {
  const [user, setUser] = useState(null);
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBalance, setShowBalance] = useState(true);

  // ==========================================
  // LOAD USER
  // ==========================================

  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        setUser(null);
        return;
      }

      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("BANK CARD USER ERROR:", error);
        setUser(null);
      }
    };

    loadUser();

    window.addEventListener("userUpdated", loadUser);

    return () => {
      window.removeEventListener("userUpdated", loadUser);
    };
  }, []);

  // ==========================================
  // FETCH ACCOUNT
  // ==========================================

  useEffect(() => {
    let mounted = true;

    const fetchAccount = async () => {
      try {
        if (mounted) {
          setLoading(true);
        }

        const token = localStorage.getItem("token");

        if (!token) {
          if (mounted) {
            setAccount(null);
            setLoading(false);
          }

          return;
        }

        const response = await api.get("/accounts");

        if (!mounted) {
          return;
        }

        const responseData = response?.data;

        if (!responseData?.success) {
          setAccount(null);
          return;
        }

        const data = responseData?.data;

        if (Array.isArray(data)) {
          setAccount(data.length > 0 ? data[0] : null);
          return;
        }

        if (data && typeof data === "object") {
          setAccount(data);
          return;
        }

        setAccount(null);
      } catch (error) {
        console.error(
          "BANK CARD ACCOUNT ERROR:",
          error?.response?.data || error?.message || error
        );

        if (mounted) {
          setAccount(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchAccount();

    // Dashboard / transaction update ke baad account
    // balance automatically refresh hoga.
    const handleDashboardUpdate = () => {
      fetchAccount();
    };

    window.addEventListener(
      "dashboardUpdated",
      handleDashboardUpdate
    );

    return () => {
      mounted = false;

      window.removeEventListener(
        "dashboardUpdated",
        handleDashboardUpdate
      );
    };
  }, []);

  // ==========================================
  // USER DATA
  // ==========================================

  const userName =
    user?.fullName ||
    user?.name ||
    user?.username ||
    "SMARTBANK USER";

  // ==========================================
  // ACCOUNT DATA
  // ==========================================

  const accountNumber =
    account?.accountNumber ||
    account?.accountNo ||
    "000000000000";

  const accountType =
    account?.accountType ||
    account?.type ||
    "SAVINGS";

  const currency = account?.currency || "INR";

  const rawBalance =
    account?.balance ??
    account?.availableBalance ??
    account?.currentBalance ??
    0;

  const balance = Number(rawBalance) || 0;

  const accountStatus =
    account?.status ||
    "ACTIVE";

  const isActive =
    String(accountStatus).toUpperCase() === "ACTIVE";

  // ==========================================
  // CURRENCY FORMATTER
  // ==========================================

  const normalizedCurrency = String(currency).toUpperCase();

  const currencySymbol =
    normalizedCurrency === "USD"
      ? "$"
      : normalizedCurrency === "EUR"
        ? "€"
        : normalizedCurrency === "GBP"
          ? "£"
          : "₹";

  const formattedBalance = balance.toLocaleString(
    normalizedCurrency === "INR"
      ? "en-IN"
      : "en-US",
    {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }
  );

  // ==========================================
  // ACCOUNT NUMBER FORMATTER
  // ==========================================

  const cleanAccountNumber = String(accountNumber).replace(
    /\s/g,
    ""
  );

  const formattedAccountNumber =
    cleanAccountNumber.length >= 4
      ? `****  ****  ${cleanAccountNumber.slice(-4)}`
      : "****  ****  ****";

  // ==========================================
  // ACCOUNT TYPE FORMATTER
  // ==========================================

  const formattedAccountType = String(accountType)
    .replace(/_/g, " ")
    .toUpperCase();

  // ==========================================
  // STATUS FORMATTER
  // ==========================================

  const formattedStatus = String(accountStatus)
    .replace(/_/g, " ")
    .toUpperCase();

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      whileHover={{
        y: -5,
        scale: 1.005,
      }}
      transition={{
        duration: 0.45,
        ease: "easeOut",
      }}
      className="
        group
        relative
        min-h-[350px]
        w-full
        overflow-hidden
        rounded-[30px]
        border
        border-white/15
        bg-gradient-to-br
        from-[#172554]
        via-[#1d4ed8]
        to-[#0f172a]
        p-6
        text-white
        shadow-2xl
        shadow-blue-950/40
        transition-all
        duration-500
        hover:border-cyan-300/30
        hover:shadow-cyan-500/20
        sm:min-h-[350px]
        sm:p-7
      "
    >
      {/* ==========================================
          AMBIENT GLOW
      ========================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-24
          -top-24
          h-72
          w-72
          rounded-full
          bg-cyan-400/20
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
          -bottom-28
          -left-24
          h-72
          w-72
          rounded-full
          bg-indigo-600/25
          blur-[90px]
        "
      />

      {/* ==========================================
          GLASS OVERLAY
      ========================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-br
          from-white/[0.10]
          via-transparent
          to-black/20
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          left-0
          right-0
          top-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-white/40
          to-transparent
        "
      />

      {/* ==========================================
          CARD CONTENT
      ========================================== */}

      <div className="relative z-10 flex min-h-[298px] flex-col justify-between">

        {/* ========================================
            TOP SECTION
        ======================================== */}

        <div>

          {/* BRAND */}

          <div className="flex items-start justify-between">

            <div className="flex items-center gap-3">

              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-white/20
                  bg-white/10
                  shadow-lg
                  backdrop-blur-xl
                "
              >
                <CreditCard
                  size={20}
                  strokeWidth={1.8}
                />
              </div>

              <div>

                <p
                  className="
                    text-[8px]
                    font-medium
                    uppercase
                    tracking-[0.25em]
                    text-white/50
                  "
                >
                  Digital Banking
                </p>

                <h2
                  className="
                    mt-0.5
                    text-lg
                    font-extrabold
                    tracking-tight
                    sm:text-xl
                  "
                >
                  SmartBank{" "}
                  <span className="text-cyan-200">
                    AI
                  </span>
                </h2>

              </div>
            </div>

            {/* VISA */}

            <div className="text-right">

              <p
                className="
                  text-lg
                  font-black
                  italic
                  tracking-[0.12em]
                  text-white/90
                "
              >
                VISA
              </p>

              <p
                className="
                  text-[7px]
                  uppercase
                  tracking-[0.2em]
                  text-white/40
                "
              >
                Platinum
              </p>

            </div>
          </div>

          {/* CHIP + CONTACTLESS */}

          <div className="mt-5 flex items-center justify-between">

            <div
              className="
                relative
                h-10
                w-[52px]
                overflow-hidden
                rounded-[10px]
                border
                border-yellow-100/50
                bg-gradient-to-br
                from-yellow-100
                via-yellow-300
                to-yellow-600
                shadow-lg
              "
            >
              <div
                className="
                  absolute
                  inset-1
                  rounded-lg
                  border
                  border-yellow-700/30
                "
              />

              <div
                className="
                  absolute
                  left-1/2
                  top-0
                  h-full
                  w-px
                  -translate-x-1/2
                  bg-yellow-700/30
                "
              />

              <div
                className="
                  absolute
                  left-0
                  top-1/2
                  h-px
                  w-full
                  -translate-y-1/2
                  bg-yellow-700/30
                "
              />

              <div
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-4
                  w-4
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  border
                  border-yellow-700/30
                "
              />
            </div>

            <div
              className="
                flex
                items-center
                gap-2
                rounded-full
                border
                border-white/10
                bg-white/[0.06]
                px-2.5
                py-1.5
                backdrop-blur-md
              "
            >
              <Wifi
                size={17}
                className="rotate-90 text-white/70"
              />

              <span
                className="
                  hidden
                  text-[7px]
                  uppercase
                  tracking-[0.15em]
                  text-white/40
                  sm:block
                "
              >
                Contactless
              </span>
            </div>
          </div>

          {/* ACCOUNT NUMBER */}

          <div className="mt-4">

            <div className="flex items-center justify-between gap-3">

              <p
                className="
                  text-[8px]
                  font-medium
                  uppercase
                  tracking-[0.22em]
                  text-white/45
                "
              >
                Account Number
              </p>

              <span
                className="
                  shrink-0
                  rounded-full
                  border
                  border-white/15
                  bg-white/[0.08]
                  px-2.5
                  py-1
                  text-[7px]
                  font-semibold
                  uppercase
                  tracking-[0.12em]
                  text-white/70
                "
              >
                {formattedAccountType}
              </span>

            </div>

            <motion.p
              key={`${loading}-${formattedAccountNumber}`}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              className="
                mt-1
                whitespace-nowrap
                text-base
                font-semibold
                tracking-[0.16em]
                text-white
                sm:text-lg
                sm:tracking-[0.20em]
              "
            >
              {loading
                ? "****  ****  ****"
                : formattedAccountNumber}
            </motion.p>

          </div>
        </div>

        {/* ========================================
            BOTTOM SECTION
        ======================================== */}

        <div className="mt-5">

          {/* BALANCE */}

          <div className="flex items-end justify-between gap-4">

            <div className="min-w-0">

              <div className="flex items-center gap-2">

                <p
                  className="
                    text-[8px]
                    font-medium
                    uppercase
                    tracking-[0.2em]
                    text-white/45
                  "
                >
                  Available Balance
                </p>

                <button
                  type="button"
                  onClick={() =>
                    setShowBalance((value) => !value)
                  }
                  aria-label={
                    showBalance
                      ? "Hide balance"
                      : "Show balance"
                  }
                  className="
                    rounded-full
                    p-1
                    text-white/40
                    transition
                    hover:bg-white/10
                    hover:text-white
                  "
                >
                  {showBalance ? (
                    <EyeOff size={11} />
                  ) : (
                    <Eye size={11} />
                  )}
                </button>

              </div>

              <div className="mt-0.5 flex items-baseline gap-2">

                <span
                  className="
                    text-[10px]
                    font-medium
                    text-white/45
                  "
                >
                  {normalizedCurrency}
                </span>

                <motion.span
                  key={`${showBalance}-${formattedBalance}-${loading}`}
                  initial={{
                    opacity: 0,
                    filter: "blur(4px)",
                  }}
                  animate={{
                    opacity: 1,
                    filter: "blur(0px)",
                  }}
                  className="
                    text-2xl
                    font-extrabold
                    tracking-tight
                    sm:text-3xl
                  "
                >
                  {loading
                    ? "..."
                    : showBalance
                      ? `${currencySymbol}${formattedBalance}`
                      : `${currencySymbol}******`}
                </motion.span>

              </div>
            </div>

            {/* STATUS */}

            <div
              className={`
                flex
                shrink-0
                items-center
                gap-1.5
                rounded-full
                border
                px-2.5
                py-1.5
                ${
                  isActive
                    ? "border-emerald-300/20 bg-emerald-300/[0.08]"
                    : "border-yellow-300/20 bg-yellow-300/[0.08]"
                }
              `}
            >

              <span
                className={`
                  h-1.5
                  w-1.5
                  rounded-full
                  shadow
                  ${
                    isActive
                      ? "bg-emerald-300 shadow-emerald-300/80"
                      : "bg-yellow-300 shadow-yellow-300/80"
                  }
                `}
              />

              <span
                className={`
                  text-[7px]
                  font-bold
                  uppercase
                  tracking-[0.1em]
                  ${
                    isActive
                      ? "text-emerald-200"
                      : "text-yellow-200"
                  }
                `}
              >
                {isActive
                  ? "Active"
                  : formattedStatus}
              </span>

            </div>
          </div>

          {/* DIVIDER */}

          <div className="my-3 border-t border-white/10" />

          {/* FOOTER */}

          <div className="flex items-center justify-between gap-4">

            {/* CARD HOLDER */}

            <div className="min-w-0">

              <p
                className="
                  text-[7px]
                  font-medium
                  uppercase
                  tracking-[0.18em]
                  text-white/40
                "
              >
                Card Holder
              </p>

              <p
                className="
                  mt-0.5
                  max-w-[170px]
                  truncate
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-[0.08em]
                  text-white/90
                  sm:text-xs
                "
              >
                {userName}
              </p>

            </div>

            {/* SECURITY */}

            <div
              className="
                flex
                shrink-0
                items-center
                gap-1.5
                rounded-full
                border
                border-white/10
                bg-white/[0.07]
                px-2.5
                py-1.5
              "
            >
              <LockKeyhole
                size={10}
                className="text-emerald-300"
              />

              <span
                className="
                  text-[7px]
                  font-semibold
                  uppercase
                  tracking-[0.1em]
                  text-white/60
                "
              >
                Secured
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* ==========================================
          AI SIGNATURE
      ========================================== */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-4
          right-5
          hidden
          items-center
          gap-1
          text-[7px]
          font-semibold
          uppercase
          tracking-[0.15em]
          text-white/20
          sm:flex
        "
      >
        <Sparkles size={9} />
        SmartBank AI
      </div>

      {/* ==========================================
          CARD EDGE
      ========================================== */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          right-0
          h-12
          bg-gradient-to-t
          from-black/10
          to-transparent
        "
      />
    </motion.div>
  );
};

export default BankCard;