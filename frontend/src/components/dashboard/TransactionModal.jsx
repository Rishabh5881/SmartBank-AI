import { useEffect, useState } from "react";
import {
  X,
  IndianRupee,
  WalletCards,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

import api from "../../services/api";

const TransactionModal = ({ open, close }) => {
  const [accounts, setAccounts] = useState([]);
  const [accountId, setAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");

  const [loadingAccounts, setLoadingAccounts] = useState(false);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!open) {
      return;
    }

    const fetchAccounts = async () => {
      try {
        setLoadingAccounts(true);
        setError("");
        setSuccess("");

        const token = localStorage.getItem("token");

        if (!token) {
          setAccounts([]);
          setError("Please login again to continue.");
          return;
        }

        const response = await api.get("/accounts");

        if (response.data?.success) {
          const data = Array.isArray(response.data?.data)
            ? response.data.data
            : [];

          setAccounts(data);

          if (data.length > 0) {
            setAccountId((currentAccountId) => {
              const accountStillExists = data.some(
                (account) => account?.id === currentAccountId
              );

              return accountStillExists
                ? currentAccountId
                : data[0]?.id || "";
            });
          } else {
            setAccountId("");
          }
        } else {
          setAccounts([]);
          setError("Unable to load your accounts.");
        }
      } catch (err) {
        console.error(
          "TRANSACTION MODAL ACCOUNTS ERROR:",
          err?.response?.data || err?.message
        );

        setAccounts([]);

        setError(
          err?.response?.data?.message ||
            "Unable to load your accounts. Please try again."
        );
      } finally {
        setLoadingAccounts(false);
      }
    };

    fetchAccounts();
  }, [open]);

  useEffect(() => {
    if (!open) {
      setAmount("");
      setType("income");
      setError("");
      setSuccess("");
    }
  }, [open]);

  if (!open) {
    return null;
  }

  const selectedAccount = accounts.find(
    (account) => account?.id === accountId
  );

  const formatCurrency = (value) => {
    const numericValue = Number(value || 0);

    if (!Number.isFinite(numericValue)) {
      return "₹0";
    }

    return `₹${numericValue.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    })}`;
  };

  const handleAmountChange = (value) => {
    if (value === "") {
      setAmount("");
      return;
    }

    const numericValue = Number(value);

    if (!Number.isFinite(numericValue) || numericValue < 0) {
      return;
    }

    setAmount(value);
  };

  const resetForm = () => {
    setAmount("");
    setType("income");
    setError("");
  };

  const handleClose = () => {
    if (saving) {
      return;
    }

    resetForm();
    close();
  };

  const saveTransaction = async () => {
    setError("");
    setSuccess("");

    const numericAmount = Number(amount);

    if (!accountId) {
      setError("Please select an account.");
      return;
    }

    if (
      amount === "" ||
      !Number.isFinite(numericAmount) ||
      numericAmount <= 0
    ) {
      setError("Please enter a valid amount greater than zero.");
      return;
    }

    try {
      setSaving(true);

      let response;

      if (type === "income") {
        response = await api.post("/transactions/deposit", {
          accountId,
          amount: numericAmount,
        });
      } else {
        response = await api.post("/transactions/withdraw", {
          accountId,
          amount: numericAmount,
        });
      }

      if (!response.data?.success) {
        throw new Error(
          response.data?.message || "Transaction failed."
        );
      }

      setSuccess(
        type === "income"
          ? "Money deposited successfully."
          : "Money withdrawn successfully."
      );

      window.dispatchEvent(new Event("transactionUpdated"));
      window.dispatchEvent(new Event("dashboardUpdated"));

      setAmount("");

      window.setTimeout(() => {
        close();
        setSuccess("");
        setError("");
        setType("income");
      }, 700);
    } catch (err) {
      console.error(
        "TRANSACTION CREATE ERROR:",
        err?.response?.data || err?.message
      );

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Transaction failed. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/75
        p-4
        backdrop-blur-sm
      "
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        className="
          relative
          w-full
          max-w-md
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-slate-900
          p-6
          text-white
          shadow-2xl
          shadow-black/40
        "
      >
        {/* Background Glow */}

        <div
          className="
            pointer-events-none
            absolute
            -right-20
            -top-20
            h-40
            w-40
            rounded-full
            bg-cyan-500/10
            blur-3xl
          "
        />

        {/* Header */}

        <div
          className="
            relative
            flex
            items-center
            justify-between
            gap-4
          "
        >
          <div>
            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-cyan-400
              "
            >
              SmartBank
            </p>

            <h2
              className="
                mt-1
                text-2xl
                font-bold
                tracking-tight
              "
            >
              Add Transaction
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Update your account balance securely
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={saving}
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              border-white/10
              bg-white/[0.04]
              text-slate-400
              transition
              hover:border-white/20
              hover:bg-white/[0.08]
              hover:text-white
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
            aria-label="Close transaction modal"
          >
            <X size={19} />
          </button>
        </div>

        {/* Content */}

        <div className="relative mt-7 space-y-5">
          {/* Account */}

          <div>
            <label
              htmlFor="transaction-account"
              className="
                mb-2
                flex
                items-center
                gap-2
                text-xs
                font-semibold
                uppercase
                tracking-[0.12em]
                text-slate-400
              "
            >
              <WalletCards
                size={14}
                className="text-cyan-400"
              />

              Account
            </label>

            <select
              id="transaction-account"
              value={accountId}
              onChange={(event) =>
                setAccountId(event.target.value)
              }
              disabled={
                loadingAccounts ||
                saving ||
                accounts.length === 0
              }
              className="
                w-full
                rounded-2xl
                border
                border-white/10
                bg-slate-950/70
                px-4
                py-3.5
                text-sm
                font-medium
                text-white
                outline-none
                transition
                focus:border-cyan-400/40
                focus:ring-4
                focus:ring-cyan-400/5
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {loadingAccounts ? (
                <option value="">
                  Loading accounts...
                </option>
              ) : accounts.length === 0 ? (
                <option value="">
                  No accounts available
                </option>
              ) : (
                <>
                  <option value="">
                    Select an account
                  </option>

                  {accounts.map((account) => (
                    <option
                      key={account?.id}
                      value={account?.id}
                    >
                      {account?.accountType ||
                        "Account"}{" "}
                      •{" "}
                      {account?.accountNumber ||
                        "Account"}
                    </option>
                  ))}
                </>
              )}
            </select>

            {selectedAccount && (
              <div
                className="
                  mt-2
                  flex
                  items-center
                  justify-between
                  rounded-xl
                  border
                  border-white/[0.06]
                  bg-white/[0.025]
                  px-3
                  py-2
                "
              >
                <span className="text-[11px] text-slate-500">
                  Available Balance
                </span>

                <span className="text-xs font-semibold text-slate-300">
                  {formatCurrency(
                    selectedAccount?.balance
                  )}
                </span>
              </div>
            )}
          </div>

          {/* Transaction Type */}

          <div>
            <p
              className="
                mb-2
                text-xs
                font-semibold
                uppercase
                tracking-[0.12em]
                text-slate-400
              "
            >
              Transaction Type
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setType("income");
                  setError("");
                  setSuccess("");
                }}
                disabled={saving}
                className={`
                  rounded-2xl
                  border
                  px-4
                  py-3
                  text-sm
                  font-semibold
                  transition
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  ${
                    type === "income"
                      ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-400"
                      : "border-white/10 bg-white/[0.03] text-slate-500 hover:bg-white/[0.06] hover:text-slate-300"
                  }
                `}
              >
                Deposit
              </button>

              <button
                type="button"
                onClick={() => {
                  setType("expense");
                  setError("");
                  setSuccess("");
                }}
                disabled={saving}
                className={`
                  rounded-2xl
                  border
                  px-4
                  py-3
                  text-sm
                  font-semibold
                  transition
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  ${
                    type === "expense"
                      ? "border-red-400/30 bg-red-400/10 text-red-400"
                      : "border-white/10 bg-white/[0.03] text-slate-500 hover:bg-white/[0.06] hover:text-slate-300"
                  }
                `}
              >
                Withdraw
              </button>
            </div>
          </div>

          {/* Amount */}

          <div>
            <label
              htmlFor="transaction-amount"
              className="
                mb-2
                flex
                items-center
                gap-2
                text-xs
                font-semibold
                uppercase
                tracking-[0.12em]
                text-slate-400
              "
            >
              <IndianRupee
                size={14}
                className="text-cyan-400"
              />

              Amount
            </label>

            <div className="relative">
              <IndianRupee
                size={18}
                className="
                  pointer-events-none
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-500
                "
              />

              <input
                id="transaction-amount"
                type="number"
                min="0"
                step="0.01"
                value={amount}
                onChange={(event) =>
                  handleAmountChange(
                    event.target.value
                  )
                }
                placeholder="Enter amount"
                disabled={saving}
                className="
                  w-full
                  rounded-2xl
                  border
                  border-white/10
                  bg-slate-950/70
                  py-3.5
                  pl-11
                  pr-4
                  text-sm
                  font-semibold
                  text-white
                  outline-none
                  transition
                  placeholder:text-slate-600
                  focus:border-cyan-400/40
                  focus:ring-4
                  focus:ring-cyan-400/5
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              />
            </div>
          </div>

          {/* Error */}

          {error && (
            <div
              className="
                flex
                items-start
                gap-3
                rounded-2xl
                border
                border-red-400/15
                bg-red-400/[0.06]
                p-3.5
              "
            >
              <AlertCircle
                size={17}
                className="
                  mt-0.5
                  shrink-0
                  text-red-400
                "
              />

              <p className="text-xs leading-5 text-red-300">
                {error}
              </p>
            </div>
          )}

          {/* Success */}

          {success && (
            <div
              className="
                flex
                items-start
                gap-3
                rounded-2xl
                border
                border-emerald-400/15
                bg-emerald-400/[0.06]
                p-3.5
              "
            >
              <CheckCircle2
                size={17}
                className="
                  mt-0.5
                  shrink-0
                  text-emerald-400
                "
              />

              <p className="text-xs leading-5 text-emerald-300">
                {success}
              </p>
            </div>
          )}

          {/* Submit */}

          <button
            type="button"
            onClick={saveTransaction}
            disabled={
              saving ||
              loadingAccounts ||
              accounts.length === 0
            }
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-2xl
              bg-gradient-to-r
              from-blue-600
              to-cyan-500
              py-3.5
              text-sm
              font-bold
              text-white
              shadow-lg
              shadow-cyan-500/10
              transition
              hover:-translate-y-0.5
              hover:shadow-xl
              hover:shadow-cyan-500/15
              active:translate-y-0
              disabled:cursor-not-allowed
              disabled:opacity-50
              disabled:hover:translate-y-0
            "
          >
            {saving ? (
              <>
                <Loader2
                  size={17}
                  className="animate-spin"
                />

                Processing...
              </>
            ) : (
              <>
                {type === "income"
                  ? "Deposit Money"
                  : "Withdraw Money"}
              </>
            )}
          </button>
        </div>

        {/* Footer */}

        <div
          className="
            relative
            mt-5
            border-t
            border-white/[0.06]
            pt-4
            text-center
          "
        >
          <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-slate-600">
            SmartBank secure transaction processing
          </p>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;