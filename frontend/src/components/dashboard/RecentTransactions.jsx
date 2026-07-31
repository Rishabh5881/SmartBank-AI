import { motion } from "framer-motion";
import {
ArrowUpRight,
TrendingUp,
TrendingDown,
RefreshCw
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

  const token =
    localStorage.getItem("token");


  if (!token) {

    setError("Please login again.");

    return;

  }


  const response = await axios.get(
    "http://localhost:5000/api/v1/transactions",
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );


  console.log(
    "RECENT TRANSACTIONS DATA:",
    response.data
  );


  if (response.data?.success) {

    const data =
      response.data.data || [];

    setTransactions(
      Array.isArray(data)
        ? data.slice(0, 5)
        : []
    );

  } else {

    setError(
      response.data?.message ||
      "Unable to load transactions."
    );

  }

} catch (err) {

  console.error(
    "RECENT TRANSACTIONS ERROR:",
    err
  );


  if (
    err.response?.status === 401
  ) {

    setError(
      "Session expired. Please login again."
    );

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


}, []);

// =========================
// TRANSACTION HELPERS
// =========================

const getTransactionType = (
transaction
) => {


const type =
  String(
    transaction?.type ||
    transaction?.transactionType ||
    ""
  ).toUpperCase();


if (
  type === "DEPOSIT" ||
  type === "CREDIT"
) {

  return "income";

}


return "expense";


};

const getTitle = (
transaction
) => {


const type =
  String(
    transaction?.type ||
    transaction?.transactionType ||
    ""
  ).toUpperCase();


if (type === "DEPOSIT") {

  return "Money Deposited";

}


if (type === "WITHDRAW") {

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

const getAmount = (
transaction
) => {


const amount =
  Number(
    transaction?.amount || 0
  );


const type =
  getTransactionType(
    transaction
  );


return `${
  type === "income"
    ? "+"
    : "-"
}₹${amount.toLocaleString("en-IN")}`;


};

const getDate = (
transaction
) => {


const dateValue =
  transaction?.createdAt ||
  transaction?.date ||
  transaction?.timestamp;


if (!dateValue) {

  return "Recent";

}


const date =
  new Date(dateValue);


if (
  Number.isNaN(
    date.getTime()
  )
) {

  return "Recent";

}


return date.toLocaleString(
  "en-IN",
  {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit"
  }
);


};

// =========================
// UI
// =========================

return (


<motion.div

  initial={{
    opacity: 0,
    y: 20
  }}

  animate={{
    opacity: 1,
    y: 0
  }}

  className="
    rounded-3xl
    border
    border-white/10
    bg-white/[0.05]
    p-5
    shadow-xl
    shadow-black/10
    backdrop-blur-xl
    sm:p-6
  "
>

  {/* HEADER */}

  <div
    className="
      flex
      items-center
      justify-between
      gap-4
    "
  >

    <div>

      <h3
        className="
          text-xl
          font-bold
          text-white
        "
      >
        Recent Transactions
      </h3>

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


    <button
      type="button"
      onClick={fetchTransactions}
      disabled={loading}
      className="
        flex
        items-center
        gap-1
        rounded-lg
        px-2
        py-1
        text-xs
        font-semibold
        text-cyan-400
        transition
        hover:bg-cyan-400/10
        hover:text-cyan-300
        disabled:cursor-not-allowed
        disabled:opacity-50
      "
    >

      <RefreshCw
        size={14}
        className={
          loading
            ? "animate-spin"
            : ""
        }
      />

      Refresh

    </button>

  </div>


  {/* LOADING */}

  {loading && (

    <div className="mt-6 space-y-3">

      {[1, 2, 3].map(
        (item) => (

          <div
            key={item}
            className="
              h-16
              animate-pulse
              rounded-2xl
              bg-white/[0.05]
            "
          />

        )
      )}

    </div>

  )}


  {/* ERROR */}

  {!loading && error && (

    <div
      className="
        mt-6
        rounded-2xl
        border
        border-red-400/10
        bg-red-400/5
        p-4
      "
    >

      <p
        className="
          text-sm
          text-red-300
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
          font-semibold
          text-cyan-400
          hover:text-cyan-300
        "
      >
        Try again
      </button>

    </div>

  )}


  {/* EMPTY */}

  {!loading &&
    !error &&
    transactions.length === 0 && (

      <div
        className="
          mt-6
          rounded-2xl
          border
          border-white/10
          bg-white/[0.03]
          px-4
          py-10
          text-center
        "
      >

        <p
          className="
            text-sm
            font-medium
            text-slate-300
          "
        >
          No transactions yet
        </p>

        <p
          className="
            mt-1
            text-xs
            text-slate-500
          "
        >
          Your account activity will appear here.
        </p>

      </div>

    )}


  {/* TRANSACTIONS */}

  {!loading &&
    !error &&
    transactions.length > 0 && (

      <div className="mt-6 space-y-1">

        {transactions.map(
          (transaction, index) => {

            const transactionType =
              getTransactionType(
                transaction
              );

            const isIncome =
              transactionType ===
              "income";


            return (

              <motion.div

                key={
                  transaction.id ||
                  index
                }

                initial={{
                  opacity: 0,
                  x: -10
                }}

                animate={{
                  opacity: 1,
                  x: 0
                }}

                transition={{
                  delay:
                    index * 0.05
                }}

                whileHover={{
                  x: 3
                }}

                className="
                  flex
                  items-center
                  justify-between
                  gap-4
                  rounded-2xl
                  border-b
                  border-white/[0.06]
                  px-2
                  py-4
                  transition
                  last:border-b-0
                  hover:bg-white/[0.03]
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
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      ${
                        isIncome
                          ? "bg-green-400/10 text-green-400"
                          : "bg-red-400/10 text-red-400"
                      }
                    `}
                  >

                    {isIncome ? (

                      <TrendingUp
                        size={18}
                      />

                    ) : (

                      <TrendingDown
                        size={18}
                      />

                    )}

                  </div>


                  <div
                    className="
                      min-w-0
                    "
                  >

                    <p
                      className="
                        truncate
                        text-sm
                        font-semibold
                        text-white
                      "
                    >
                      {getTitle(
                        transaction
                      )}
                    </p>

                    <p
                      className="
                        mt-1
                        text-xs
                        text-slate-500
                      "
                    >
                      {getDate(
                        transaction
                      )}
                    </p>

                  </div>

                </div>


                {/* RIGHT */}

                <div
                  className="
                    shrink-0
                    text-right
                  "
                >

                  <p
                    className={`
                      text-sm
                      font-bold
                      ${
                        isIncome
                          ? "text-green-400"
                          : "text-red-400"
                      }
                    `}
                  >
                    {getAmount(
                      transaction
                    )}
                  </p>

                </div>

              </motion.div>

            );

          }
        )}

      </div>

    )}


  {/* VIEW ALL */}

  {!loading &&
    !error &&
    transactions.length > 0 && (

      <button
        type="button"
        className="
          mt-5
          flex
          items-center
          gap-1
          text-xs
          font-semibold
          text-cyan-400
          transition
          hover:text-cyan-300
        "
      >

        View all

        <ArrowUpRight
          size={14}
        />

      </button>

    )}

</motion.div>


);

};

export default RecentTransactions;
