import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  TrendingUp,
  WalletCards,
  RefreshCw,
} from "lucide-react";

import api from "../../services/api";

const BalanceCard = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showBalance, setShowBalance] = useState(true);

  // ==========================================
  // FETCH ACCOUNTS
  // ==========================================

  useEffect(() => {
    let mounted = true;

    const fetchAccounts = async () => {
      try {
        if (mounted) {
          setLoading(true);
          setError(false);
        }

        const token = localStorage.getItem("token");

        if (!token) {
          if (mounted) {
            setAccounts([]);
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
          setAccounts([]);
          setError(true);
          return;
        }

        const data = responseData?.data;

        if (Array.isArray(data)) {
          setAccounts(data);
          return;
        }

        if (data && typeof data === "object") {
          setAccounts([data]);
          return;
        }

        setAccounts([]);
      } catch (error) {
        console.error(
          "BALANCE CARD ERROR:",
          error?.response?.data ||
            error?.message ||
            error
        );

        if (mounted) {
          setAccounts([]);
          setError(true);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchAccounts();

    // ==========================================
    // REFRESH AFTER DASHBOARD UPDATE
    // ==========================================

    const handleDashboardUpdate = () => {
      fetchAccounts();
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
  // TOTAL BALANCE
  // ==========================================

  const totalBalance = accounts.reduce((total, account) => {
    const balance =
      account?.balance ??
      account?.availableBalance ??
      account?.currentBalance ??
      0;

    const numericBalance = Number(balance);

    if (!Number.isFinite(numericBalance)) {
      return total;
    }

    return total + numericBalance;
  }, 0);

  // ==========================================
  // CURRENCY
  // ==========================================

  const currency =
    accounts?.[0]?.currency || "INR";

  const normalizedCurrency =
    String(currency).toUpperCase();

  const currencySymbol =
    normalizedCurrency === "USD"
      ? "$"
      : normalizedCurrency === "EUR"
      ? "€"
      : normalizedCurrency === "GBP"
      ? "£"
      : "₹";

  // ==========================================
  // FORMAT BALANCE
  // ==========================================

  const formattedBalance =
    totalBalance.toLocaleString(
      normalizedCurrency === "INR"
        ? "en-IN"
        : "en-US",
      {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }
    );

  // ==========================================
  // ACCOUNT COUNT
  // ==========================================

  const accountCount = accounts.length;

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
      }}
      transition={{
        duration: 0.45,
        ease: "easeOut",
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-white/[0.08]
        bg-white/[0.035]
        p-6
        text-white
        shadow-2xl
        shadow-black/20
        backdrop-blur-2xl
        transition-all
        duration-500
        hover:border-cyan-400/20
        hover:bg-white/[0.05]
        sm:p-7
      "
    >
      {/* ==========================================
          BACKGROUND GLOW
      ========================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-24
          -top-24
          h-64
          w-64
          rounded-full
          bg-cyan-400/[0.08]
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
          -left-24
          h-64
          w-64
          rounded-full
          bg-blue-600/[0.08]
          blur-[90px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-br
          from-white/[0.04]
          via-transparent
          to-transparent
        "
      />

      {/* ==========================================
          CONTENT
      ========================================== */}

      <div className="relative z-10">
        {/* HEADER */}

        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                border
                border-cyan-400/10
                bg-cyan-400/[0.08]
                text-cyan-300
                shadow-lg
                shadow-cyan-500/[0.05]
              "
            >
              <WalletCards
                size={21}
                strokeWidth={1.8}
              />
            </div>

            <div>
              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-slate-500
                "
              >
                Financial Overview
              </p>

              <h2
                className="
                  mt-1
                  text-base
                  font-bold
                  text-white
                  sm:text-lg
                "
              >
                Total Balance
              </h2>
            </div>
          </div>

          {/* ACCOUNT COUNT */}

          <div
            className="
              rounded-full
              border
              border-white/[0.07]
              bg-white/[0.025]
              px-3
              py-1.5
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.12em]
              text-slate-500
            "
          >
            {loading
              ? "--"
              : `${accountCount} ${
                  accountCount === 1
                    ? "Account"
                    : "Accounts"
                }`}
          </div>
        </div>

        {/* BALANCE */}

        <div className="mt-8">
          <p
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.2em]
              text-slate-500
            "
          >
            Available Balance
          </p>

          <div className="mt-2 flex items-center gap-3">
            <motion.h3
              key={`${loading}-${showBalance}-${formattedBalance}`}
              initial={{
                opacity: 0,
                filter: "blur(5px)",
              }}
              animate={{
                opacity: 1,
                filter: "blur(0px)",
              }}
              className="
                text-4xl
                font-extrabold
                tracking-[-0.04em]
                text-white
                sm:text-5xl
              "
            >
              {loading
                ? "..."
                : error
                ? "—"
                : showBalance
                ? `${currencySymbol}${formattedBalance}`
                : `${currencySymbol}••••••`}
            </motion.h3>

            {!loading && !error && (
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
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/[0.07]
                  bg-white/[0.03]
                  text-slate-500
                  transition
                  hover:border-cyan-400/20
                  hover:bg-cyan-400/[0.06]
                  hover:text-cyan-300
                "
              >
                {showBalance ? (
                  <EyeOff size={16} />
                ) : (
                  <Eye size={16} />
                )}
              </button>
            )}
          </div>
        </div>

        {/* FOOTER */}

        <div
          className="
            mt-8
            flex
            flex-col
            gap-4
            border-t
            border-white/[0.06]
            pt-5
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          {/* CASH FLOW */}

          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                border
                border-emerald-400/10
                bg-emerald-400/[0.07]
              "
            >
              <TrendingUp
                size={16}
                className="text-emerald-400"
              />
            </div>

            <div>
              <p
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.15em]
                  text-slate-600
                "
              >
                Account Status
              </p>

              <p
                className="
                  mt-0.5
                  text-xs
                  font-semibold
                  text-emerald-400
                "
              >
                {error
                  ? "Unable to load"
                  : loading
                  ? "Loading..."
                  : "Active & Secure"}
              </p>
            </div>
          </div>

          {/* CURRENCY */}

          <div
            className="
              flex
              items-center
              gap-2
              self-start
              rounded-full
              border
              border-white/[0.07]
              bg-white/[0.025]
              px-3
              py-1.5
              sm:self-auto
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
                font-bold
                uppercase
                tracking-[0.14em]
                text-slate-500
              "
            >
              {normalizedCurrency}
            </span>
          </div>
        </div>
      </div>

      {/* ==========================================
          BOTTOM LINE
      ========================================== */}

      <div
        className="
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
          duration-700
          group-hover:w-[65%]
        "
      />
    </motion.div>
  );
};

export default BalanceCard;