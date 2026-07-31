
import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import {
  X,
  Send,
  PlusCircle,
  Receipt,
  CreditCard,
  ArrowRight,
  Loader2,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

import api from "../../services/api";



const QuickActionModal = ({
  open,
  close,
  title,
  accountId,
  accounts = []
}) => {

  const [amount, setAmount] = useState("");
  const [details, setDetails] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");



  if (!open) return null;



  const getIcon = () => {

    if (title === "Transfer Money") {
      return <Send size={22} />;
    }

    if (title === "Deposit Money") {
      return <PlusCircle size={22} />;
    }

    if (title === "Pay Bills") {
      return <Receipt size={22} />;
    }

    if (title === "Manage Cards") {
      return <CreditCard size={22} />;
    }

    return <Send size={22} />;

  };



  const resetForm = () => {

    setAmount("");
    setDetails("");
    setSuccess("");
    setError("");

  };



  const handleClose = () => {

    if (loading) return;

    resetForm();
    close();

  };



  const handleSubmit = async () => {

    setError("");
    setSuccess("");



    if (!amount || Number(amount) <= 0) {

      setError("Please enter a valid amount.");
      return;

    }



    if (!accountId && title !== "Manage Cards" && title !== "Pay Bills") {

      setError("No account selected. Please try again.");

      return;

    }



    setLoading(true);



    try {

      let response;



      // =========================
      // DEPOSIT
      // =========================

      if (title === "Deposit Money") {

        response = await api.post(
          "/transactions/deposit",
          {
            accountId: accountId,
            amount: Number(amount)
          }
        );

      }



      // =========================
      // WITHDRAW
      // =========================

      else if (title === "Withdraw Money") {

        response = await api.post(
          "/transactions/withdraw",
          {
            accountId: accountId,
            amount: Number(amount)
          }
        );

      }



      // =========================
      // TRANSFER
      // =========================

      else if (title === "Transfer Money") {

        if (!details.trim()) {

          setError("Please enter the receiver account ID.");

          setLoading(false);

          return;

        }



        response = await api.post(
          "/transactions/transfer",
          {
            fromAccountId: accountId,
            toAccountId: details.trim(),
            amount: Number(amount)
          }
        );

      }



      // =========================
      // OTHER ACTIONS
      // =========================

      else {

        setSuccess(
          `${title} is ready for the next banking module.`
        );

        setLoading(false);

        return;

      }



      if (response?.data?.success) {

        setSuccess(
          response.data.message ||
          `${title} completed successfully.`
        );



        // Tell Dashboard that account/transaction data changed

        window.dispatchEvent(
          new Event("dashboardUpdated")
        );



        setTimeout(() => {

          resetForm();
          close();

        }, 1500);

      } else {

        setError(
          response?.data?.message ||
          "Something went wrong."
        );

      }

    } catch (err) {

      console.error(
        "QUICK ACTION ERROR:",
        err
      );



      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Transaction failed. Please try again.";



      setError(message);

    } finally {

      setLoading(false);

    }

  };



  return (

    <AnimatePresence>

      <motion.div

        initial={{
          opacity: 0
        }}

        animate={{
          opacity: 1
        }}

        exit={{
          opacity: 0
        }}

        onClick={handleClose}

        className="
          fixed
          inset-0
          z-[60]
          flex
          items-center
          justify-center
          bg-black/70
          px-4
          backdrop-blur-md
        "
      >

        <motion.div

          initial={{
            opacity: 0,
            y: 30,
            scale: 0.96
          }}

          animate={{
            opacity: 1,
            y: 0,
            scale: 1
          }}

          exit={{
            opacity: 0,
            y: 20,
            scale: 0.96
          }}

          transition={{
            duration: 0.25
          }}

          onClick={(e) => e.stopPropagation()}

          className="
            relative
            w-full
            max-w-md
            overflow-hidden
            rounded-[28px]
            border
            border-white/10
            bg-slate-950
            p-6
            text-white
            shadow-2xl
            shadow-black/50
          "
        >

          {/* Background Glow */}

          <div
            className="
              pointer-events-none
              absolute
              -right-20
              -top-20
              h-48
              w-48
              rounded-full
              bg-cyan-500/10
              blur-3xl
            "
          />



          <div className="relative">

            {/* Header */}

            <div
              className="
                flex
                items-start
                justify-between
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >

                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    from-blue-600
                    to-cyan-400
                    text-white
                    shadow-lg
                    shadow-blue-500/20
                  "
                >

                  {getIcon()}

                </div>



                <div>

                  <p
                    className="
                      text-xs
                      font-medium
                      uppercase
                      tracking-wider
                      text-cyan-400
                    "
                  >
                    Quick Action
                  </p>

                  <h2
                    className="
                      mt-1
                      text-xl
                      font-bold
                    "
                  >
                    {title}
                  </h2>

                </div>

              </div>



              <button

                type="button"

                onClick={handleClose}

                disabled={loading}

                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-white/10
                  bg-white/5
                  text-slate-400
                  transition
                  hover:bg-white/10
                  hover:text-white
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >

                <X size={19} />

              </button>

            </div>



            {/* Description */}

            <p
              className="
                mt-5
                text-sm
                leading-6
                text-slate-400
              "
            >

              Enter the required details below to continue with this action.

            </p>



            {/* Error */}

            {error && (

              <div
                className="
                  mt-5
                  flex
                  items-start
                  gap-3
                  rounded-xl
                  border
                  border-red-400/20
                  bg-red-500/10
                  p-3
                  text-sm
                  text-red-300
                "
              >

                <AlertCircle
                  size={18}
                  className="mt-0.5 shrink-0"
                />

                <span>
                  {error}
                </span>

              </div>

            )}



            {/* Success */}

            {success && (

              <div
                className="
                  mt-5
                  flex
                  items-start
                  gap-3
                  rounded-xl
                  border
                  border-green-400/20
                  bg-green-500/10
                  p-3
                  text-sm
                  text-green-300
                "
              >

                <CheckCircle2
                  size={18}
                  className="mt-0.5 shrink-0"
                />

                <span>
                  {success}
                </span>

              </div>

            )}



            {/* Form */}

            <div className="mt-6 space-y-4">

              {/* Amount */}

              {title !== "Manage Cards" &&
                title !== "Pay Bills" && (

                <div>

                  <label
                    className="
                      mb-2
                      block
                      text-sm
                      font-medium
                      text-slate-300
                    "
                  >
                    Amount
                  </label>

                  <div className="relative">

                    <span
                      className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-slate-500
                      "
                    >
                      $
                    </span>

                    <input

                      type="number"

                      min="0"

                      value={amount}

                      onChange={(e) =>
                        setAmount(e.target.value)
                      }

                      placeholder="0.00"

                      disabled={loading}

                      className="
                        w-full
                        rounded-xl
                        border
                        border-white/10
                        bg-white/[0.05]
                        py-3.5
                        pl-9
                        pr-4
                        text-white
                        outline-none
                        transition
                        placeholder:text-slate-600
                        focus:border-cyan-400/50
                        focus:ring-2
                        focus:ring-cyan-400/10
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                      "

                    />

                  </div>

                </div>

              )}



              {/* Details */}

              {title !== "Manage Cards" && (

                <div>

                  <label
                    className="
                      mb-2
                      block
                      text-sm
                      font-medium
                      text-slate-300
                    "
                  >
                    {title === "Transfer Money"
                      ? "Receiver Account ID"
                      : "Account / Details"}
                  </label>

                  <input

                    type="text"

                    value={details}

                    onChange={(e) =>
                      setDetails(e.target.value)
                    }

                    placeholder={
                      title === "Transfer Money"
                        ? "Enter receiver account ID"
                        : "Enter account or payment details"
                    }

                    disabled={loading}

                    className="
                      w-full
                      rounded-xl
                      border
                      border-white/10
                      bg-white/[0.05]
                      px-4
                      py-3.5
                      text-white
                      outline-none
                      transition
                      placeholder:text-slate-600
                      focus:border-cyan-400/50
                      focus:ring-2
                      focus:ring-cyan-400/10
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "

                  />

                </div>

              )}



              {/* Confirm */}

              <button

                type="button"

                onClick={handleSubmit}

                disabled={loading}

                className="
                  group
                  mt-2
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-gradient-to-r
                  from-blue-600
                  to-cyan-400
                  py-3.5
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-blue-500/20
                  transition
                  hover:-translate-y-0.5
                  hover:shadow-blue-500/30
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  disabled:hover:translate-y-0
                "
              >

                {loading ? (

                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />

                    Processing...

                  </>

                ) : (

                  <>

                    Confirm {title}

                    <ArrowRight
                      size={18}
                      className="
                        transition
                        group-hover:translate-x-1
                      "
                    />

                  </>

                )}

              </button>

            </div>



            {/* Security Note */}

            <div
              className="
                mt-5
                flex
                items-center
                justify-center
                gap-2
                text-xs
                text-slate-500
              "
            >

              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-green-400
                "
              />

              Secured by SmartBank AI

            </div>

          </div>

        </motion.div>

      </motion.div>

    </AnimatePresence>

  );

};



export default QuickActionModal;