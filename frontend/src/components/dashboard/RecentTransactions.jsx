
import { motion } from "framer-motion";
import {
  Activity,
  ArrowDownLeft,
  ArrowUpRight as ArrowUpRightIcon,
  RefreshCw,
  TrendingDown,
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // FETCH TRANSACTIONS
  // =========================

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login again.");
        return;
      }

      const response = await axios.get(
        "http://localhost:5000/api/v1/transactions",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("RECENT TRANSACTIONS DATA:", response.data);

      if (response.data?.success) {
        const data = response.data.data || [];

        setTransactions(
          Array.isArray(data) ? data.slice(0, 5) : []
        );
      } else {
        setError(
          response.data?.message ||
            "Unable to load transactions."
        );
      }
    } catch (err) {
      console.error("RECENT TRANSACTIONS ERROR:", err);

      if (err.response?.status === 401) {
        setError("Session expired. Please login again.");
      } else {
        setError(
          err.response?.data?.message ||
            "Unable to load transactions."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {
    fetchTransactions();

    const handleDashboardUpdate = () => {
      fetchTransactions();
    };

    window.addEventListener(
      "dashboardUpdated",
      handleDashboardUpdate
    );

    return () => {
      window.removeEventListener(
        "dashboardUpdated",
        handleDashboardUpdate
      );
    };
  }, []);

  // =========================
  // GET TRANSACTION TYPE
  // =========================

  const getRawType = (transaction) => {
    return String(
      transaction?.type ||
        transaction?.transactionType ||
        ""
    ).toUpperCase();
  };

  // =========================
  // GET INCOME / EXPENSE
  // =========================

  const getTransactionType = (transaction) => {
    const type = getRawType(transaction);

    if (type === "DEPOSIT" || type === "CREDIT") {
      return "income";
    }

    if (type === "WITHDRAW" || type === "WITHDRAWAL") {
      return "expense";
    }

    if (type === "TRANSFER") {
      return "expense";
    }

    return "expense";
  };

  // =========================
  // GET TITLE
  // =========================

  const getTitle = (transaction) => {
    const type = getRawType(transaction);

    if (type === "DEPOSIT") {
      return "Money Deposited";
    }

    if (
      type === "WITHDRAW" ||
      type === "WITHDRAWAL"
    ) {
      return "Cash Withdrawal";
    }

    if (type === "TRANSFER") {
      return "Money Transfer";
    }

    return (
      transaction?.description ||
      "Bank Transaction"
    );
  };

  // =========================
  // GET AMOUNT
  // =========================

  const getAmount = (transaction) => {
    const amount = Math.abs(
      Number(transaction?.amount || 0)
    );

    const type = getTransactionType(transaction);

    return `${
      type === "income" ? "+" : "-"
    }₹${amount.toLocaleString("en-IN")}`;
  };

  // =========================
  // GET DATE
  // =========================

  const getDate = (transaction) => {
    const dateValue =
      transaction?.createdAt ||
      transaction?.date ||
      transaction?.timestamp;

    if (!dateValue) {
      return "Recent";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "Recent";
    }

    return date.toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  // =========================
  // GET STATUS
  // =========================

  const getStatus = (transaction) => {
    return String(
      transaction?.status || "COMPLETED"
    ).toUpperCase();
  };

  // =========================
  // UI
  // =========================

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
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
        shadow-black/10
        backdrop-blur-xl
        sm:p-6
      "
    >
      {/* =========================
          AMBIENT GLOW
      ========================= */}

      <div
        className="
          pointer-events-none
          absolute
          -right-24
          -top-24
          h-64
          w-64
          rounded-full
          bg-cyan-500/[0.07]
          blur-3xl
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
          h-56
          w-56
          rounded-full
          bg-blue-600/[0.06]
          blur-3xl
        "
      />

      {/* =========================
          HEADER
      ========================= */}

      <div
        className="
          relative
          z-10
          flex
          items-center
          justify-between
          gap-4
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-2xl
              border
              border-cyan-400/10
              bg-gradient-to-br
              from-cyan-400/15
              to-blue-500/10
              text-cyan-400
              shadow-lg
              shadow-cyan-500/5
            "
          >
            <Activity
              size={21}
              strokeWidth={1.8}
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3
                className="
                  text-lg
                  font-bold
                  tracking-tight
                  text-white
                  sm:text-xl
                "
              >
                Recent Transactions
              </h3>

              {!loading &&
                transactions.length > 0 && (
                  <span
                    className="
                      hidden
                      rounded-full
                      border
                      border-white/10
                      bg-white/[0.04]
                      px-2
                      py-0.5
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-wider
                      text-slate-500
                      sm:inline-flex
                    "
                  >
                    Live
                  </span>
                )}
            </div>

            <p
              className="
                mt-1
                text-xs
                text-slate-500
              "
            >
              Your latest account activity
            </p>
          </div>
        </div>

        {/* Refresh */}

        <button
          type="button"
          onClick={fetchTransactions}
          disabled={loading}
          aria-label="Refresh transactions"
          className="
            group/refresh
            flex
            h-9
            items-center
            gap-2
            rounded-xl
            border
            border-white/[0.08]
            bg-white/[0.04]
            px-3
            text-xs
            font-semibold
            text-slate-400
            transition-all
            duration-300
            hover:border-cyan-400/20
            hover:bg-cyan-400/10
            hover:text-cyan-400
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <RefreshCw
            size={14}
            className={
              loading
                ? "animate-spin"
                : "transition-transform duration-500 group-hover/refresh:rotate-180"
            }
          />

          <span className="hidden sm:inline">
            Refresh
          </span>
        </button>
      </div>

      {/* =========================
          LOADING
      ========================= */}

      {loading && (
        <div className="relative z-10 mt-6 space-y-2">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-white/[0.04]
                bg-white/[0.025]
                p-3
              "
            >
              <div
                className="
                  h-11
                  w-11
                  animate-pulse
                  rounded-xl
                  bg-white/[0.06]
                "
              />

              <div className="flex-1 space-y-2">
                <div
                  className="
                    h-3
                    w-32
                    animate-pulse
                    rounded-full
                    bg-white/[0.06]
                  "
                />

                <div
                  className="
                    h-2
                    w-20
                    animate-pulse
                    rounded-full
                    bg-white/[0.04]
                  "
                />
              </div>

              <div
                className="
                  h-3
                  w-16
                  animate-pulse
                  rounded-full
                  bg-white/[0.06]
                "
              />
            </div>
          ))}
        </div>
      )}

      {/* =========================
          ERROR
      ========================= */}

      {!loading && error && (
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.98,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          className="
            relative
            z-10
            mt-6
            rounded-2xl
            border
            border-red-400/10
            bg-red-500/[0.06]
            p-5
          "
        >
          <div className="flex items-start gap-3">
            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-red-400/10
                text-red-400
              "
            >
              <TrendingDown size={17} />
            </div>

            <div>
              <p
                className="
                  text-sm
                  font-semibold
                  text-red-200
                "
              >
                Unable to load transactions
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  leading-5
                  text-red-300/60
                "
              >
                {error}
              </p>

              <button
                type="button"
                onClick={fetchTransactions}
                className="
                  mt-3
                  text-xs
                  font-bold
                  text-cyan-400
                  transition
                  hover:text-cyan-300
                "
              >
                Try again →
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* =========================
          EMPTY STATE
      ========================= */}

      {!loading &&
        !error &&
        transactions.length === 0 && (
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="
              relative
              z-10
              mt-6
              rounded-2xl
              border
              border-dashed
              border-white/[0.08]
              bg-white/[0.025]
              px-5
              py-12
              text-center
            "
          >
            <div
              className="
                mx-auto
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                border
                border-cyan-400/10
                bg-cyan-400/[0.06]
                text-cyan-400
              "
            >
              <Activity size={23} />
            </div>

            <p
              className="
                mt-4
                text-sm
                font-semibold
                text-slate-200
              "
            >
              No transactions yet
            </p>

            <p
              className="
                mx-auto
                mt-1
                max-w-xs
                text-xs
                leading-5
                text-slate-500
              "
            >
              Your account activity will appear
              here once you make your first
              transaction.
            </p>
          </motion.div>
        )}

      {/* =========================
          TRANSACTION LIST
      ========================= */}

      {!loading &&
        !error &&
        transactions.length > 0 && (
          <div className="relative z-10 mt-6">
            <div className="space-y-1">
              {transactions.map(
                (transaction, index) => {
                  const transactionType =
                    getTransactionType(
                      transaction
                    );

                  const isIncome =
                    transactionType ===
                    "income";

                  const status =
                    getStatus(transaction);

                  return (
                    <motion.div
                      key={
                        transaction.id ||
                        index
                      }
                      initial={{
                        opacity: 0,
                        x: -15,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: index * 0.06,
                        duration: 0.35,
                      }}
                      whileHover={{
                        x: 4,
                      }}
                      className="
                        group/item
                        relative
                        flex
                        items-center
                        justify-between
                        gap-3
                        rounded-2xl
                        border
                        border-transparent
                        px-2
                        py-3
                        transition-all
                        duration-300
                        hover:border-white/[0.06]
                        hover:bg-white/[0.035]
                        sm:px-3
                      "
                    >
                      {/* LEFT */}

                      <div
                        className="
                          flex
                          min-w-0
                          items-center
                          gap-3
                        "
                      >
                        <div
                          className={`
                            relative
                            flex
                            h-11
                            w-11
                            shrink-0
                            items-center
                            justify-center
                            rounded-2xl
                            border
                            transition-all
                            duration-300
                            ${
                              isIncome
                                ? "border-emerald-400/10 bg-emerald-400/[0.08] text-emerald-400 group-hover/item:border-emerald-400/20 group-hover/item:bg-emerald-400/[0.12]"
                                : "border-red-400/10 bg-red-400/[0.07] text-red-400 group-hover/item:border-red-400/20 group-hover/item:bg-red-400/[0.11]"
                            }
                          `}
                        >
                          {isIncome ? (
                            <ArrowDownLeft
                              size={19}
                              strokeWidth={1.8}
                            />
                          ) : (
                            <ArrowUpRightIcon
                              size={19}
                              strokeWidth={1.8}
                            />
                          )}

                          <span
                            className={`
                              absolute
                              -bottom-0.5
                              -right-0.5
                              h-2
                              w-2
                              rounded-full
                              border-2
                              border-slate-950
                              ${
                                isIncome
                                  ? "bg-emerald-400"
                                  : "bg-red-400"
                              }
                            `}
                          />
                        </div>

                        <div className="min-w-0">
                          <p
                            className="
                              truncate
                              text-sm
                              font-semibold
                              text-white
                              transition-colors
                              group-hover/item:text-cyan-50
                            "
                          >
                            {getTitle(
                              transaction
                            )}
                          </p>

                          <div className="mt-1 flex items-center gap-2">
                            <p
                              className="
                                text-[10px]
                                text-slate-500
                              "
                            >
                              {getDate(
                                transaction
                              )}
                            </p>

                            <span
                              className="
                                h-1
                                w-1
                                rounded-full
                                bg-slate-700
                              "
                            />

                            <span
                              className="
                                text-[9px]
                                font-semibold
                                uppercase
                                tracking-wider
                                text-slate-600
                              "
                            >
                              {status}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* RIGHT */}

                      <div className="shrink-0 text-right">
                        <p
                          className={`
                            text-sm
                            font-bold
                            tracking-tight
                            ${
                              isIncome
                                ? "text-emerald-400"
                                : "text-red-400"
                            }
                          `}
                        >
                          {getAmount(
                            transaction
                          )}
                        </p>

                        <p
                          className="
                            mt-1
                            text-[9px]
                            font-medium
                            uppercase
                            tracking-wider
                            text-slate-600
                          "
                        >
                          {isIncome
                            ? "Credit"
                            : "Debit"}
                        </p>
                      </div>
                    </motion.div>
                  );
                }
              )}
            </div>

            {/* =========================
                VIEW ALL
            ========================= */}

            <button
              type="button"
              className="
                group/view
                mt-5
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-white/[0.07]
                bg-white/[0.025]
                py-3
                text-xs
                font-semibold
                text-slate-400
                transition-all
                duration-300
                hover:border-cyan-400/15
                hover:bg-cyan-400/[0.05]
                hover:text-cyan-400
              "
            >
              View all transactions

              <ArrowUpRightIcon
                size={14}
                className="
                  transition-transform
                  duration-300
                  group-hover/view:-translate-y-0.5
                  group-hover/view:translate-x-0.5
                "
              />
            </button>
          </div>
        )}
    </motion.section>
  );
};

export default RecentTransactions;

