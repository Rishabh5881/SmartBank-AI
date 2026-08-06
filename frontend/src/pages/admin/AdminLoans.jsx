
import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  Banknote,
  CheckCircle2,
  Clock3,
  FileCheck2,
  Filter,
  Landmark,
  Loader2,
  Search,
  ShieldCheck,
  Sparkles,
  XCircle,
  RefreshCw,
} from "lucide-react";

import api from "../../services/api";

const AdminLoans = () => {
  const [loans, setLoans] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [processingId, setProcessingId] = useState(null);
  const [actionMessage, setActionMessage] = useState("");
  const [actionError, setActionError] = useState("");

  // ==========================================
  // NORMALIZE STATUS
  // ==========================================

  const normalizeStatus = (status) => {
    return String(status || "")
      .trim()
      .toUpperCase();
  };

  // ==========================================
  // FETCH ALL ADMIN LOANS
  // ==========================================

  const fetchLoans = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      console.log("AdminLoans: fetching /admin/loans...");

      const apiResponse = await api.get("/admin/loans");

      console.log(
        "AdminLoans: backend response:",
        apiResponse?.data
      );

      const responseBody = apiResponse?.data;

      if (!responseBody?.success) {
        throw new Error(
          responseBody?.message ||
            "Unable to fetch loans."
        );
      }

      const backendLoans = Array.isArray(
        responseBody?.data
      )
        ? responseBody.data
        : [];

      setLoans(backendLoans);
    } catch (err) {
      console.error(
        "AdminLoans: fetch failed:",
        err?.response?.data ||
          err?.message ||
          err
      );

      setLoans([]);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to load loan applications."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // ==========================================
  // INITIAL LOAD
  // ==========================================

  useEffect(() => {
    fetchLoans();
  }, [fetchLoans]);

  // ==========================================
  // APPROVE / REJECT LOAN
  // ==========================================

  const updateLoanStatus = async (loanId, action) => {
    if (!loanId || processingId) {
      return;
    }

    setProcessingId(loanId);
    setActionMessage("");
    setActionError("");

    try {
      const endpoint =
        action === "approve"
          ? `/admin/loans/${loanId}/approve`
          : `/admin/loans/${loanId}/reject`;

      const apiResponse = await api.patch(endpoint);

      console.log(
        `AdminLoans: ${action} response:`,
        apiResponse?.data
      );

      const responseBody = apiResponse?.data;

      if (!responseBody?.success) {
        throw new Error(
          responseBody?.message ||
            `Unable to ${action} loan.`
        );
      }

      const updatedLoan = responseBody?.data;

      // ========================================
      // UPDATE UI FROM BACKEND RESPONSE
      // ========================================

      if (updatedLoan?.id) {
        setLoans((currentLoans) =>
          currentLoans.map((loan) =>
            loan.id === updatedLoan.id
              ? updatedLoan
              : loan
          )
        );
      } else {
        await fetchLoans();
      }

      // ========================================
      // NOTIFY OTHER COMPONENTS
      // ========================================

      window.dispatchEvent(
        new Event("loanUpdated")
      );

      window.dispatchEvent(
        new Event("dashboardUpdated")
      );

      setActionMessage(
        action === "approve"
          ? "Loan application approved successfully."
          : "Loan application rejected successfully."
      );
    } catch (err) {
      console.error(
        `AdminLoans: ${action} failed:`,
        err?.response?.data ||
          err?.message ||
          err
      );

      setActionError(
        err?.response?.data?.message ||
          err?.message ||
          `Unable to ${action} loan.`
      );
    } finally {
      setProcessingId(null);
    }
  };

  // ==========================================
  // AUTO CLEAR MESSAGES
  // ==========================================

  useEffect(() => {
    if (!actionMessage && !actionError) {
      return;
    }

    const timer = setTimeout(() => {
      setActionMessage("");
      setActionError("");
    }, 3500);

    return () => clearTimeout(timer);
  }, [actionMessage, actionError]);

  // ==========================================
  // STATS
  // ==========================================

  const stats = useMemo(() => {
    const pending = loans.filter(
      (loan) =>
        normalizeStatus(loan.status) === "PENDING"
    ).length;

    const approved = loans.filter(
      (loan) =>
        normalizeStatus(loan.status) === "ACTIVE"
    ).length;

    const rejected = loans.filter(
      (loan) =>
        normalizeStatus(loan.status) === "CLOSED"
    ).length;

    return {
      total: loans.length,
      pending,
      approved,
      rejected,
    };
  }, [loans]);

  // ==========================================
  // FILTER LOANS
  // ==========================================

  const filteredLoans = useMemo(() => {
    const query = search.trim().toLowerCase();

    return loans.filter((loan) => {
      const status = normalizeStatus(loan.status);

      const displayStatus =
        status === "ACTIVE"
          ? "Approved"
          : status === "CLOSED"
          ? "Rejected"
          : status === "PENDING"
          ? "Pending"
          : status;

      const matchesSearch =
        !query ||
        String(loan.loanType || "")
          .toLowerCase()
          .includes(query) ||
        String(loan.id || "")
          .toLowerCase()
          .includes(query) ||
        String(loan.user?.name || "")
          .toLowerCase()
          .includes(query) ||
        String(loan.user?.email || "")
          .toLowerCase()
          .includes(query) ||
        displayStatus
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "All" ||
        displayStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [loans, search, statusFilter]);

  // ==========================================
  // STATUS UI
  // ==========================================

  const getStatusStyles = (status) => {
    const normalized = normalizeStatus(status);

    if (normalized === "ACTIVE") {
      return {
        label: "Approved",
        badge:
          "border-emerald-400/10 bg-emerald-400/10 text-emerald-400",
        icon: CheckCircle2,
      };
    }

    if (normalized === "CLOSED") {
      return {
        label: "Rejected",
        badge:
          "border-red-400/10 bg-red-400/10 text-red-400",
        icon: XCircle,
      };
    }

    return {
      label: "Pending",
      badge:
        "border-amber-400/10 bg-amber-400/10 text-amber-400",
      icon: Clock3,
    };
  };

  // ==========================================
  // CURRENCY
  // ==========================================

  const formatAmount = (amount) => {
    const value = Number(amount);

    if (!Number.isFinite(value)) {
      return "₹0.00";
    }

    return `₹${value.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  // ==========================================
  // TENURE
  // ==========================================

  const formatTenure = (months) => {
    const value = Number(months);

    if (!Number.isFinite(value)) {
      return "—";
    }

    if (value % 12 === 0) {
      return `${value / 12} Years`;
    }

    return `${value} Months`;
  };

  // ==========================================
  // DATE
  // ==========================================

  const formatDate = (value) => {
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
  // UI
  // ==========================================

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
      {/* BACKGROUND */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-[520px] w-[520px] rounded-full bg-blue-600/[0.07] blur-[150px]" />

        <div className="absolute right-[-180px] top-[360px] h-[520px] w-[520px] rounded-full bg-cyan-500/[0.055] blur-[160px]" />

        <div className="absolute left-[40%] top-[1100px] h-[400px] w-[400px] rounded-full bg-purple-600/[0.04] blur-[150px]" />
      </div>

      <main className="relative z-10 mx-auto max-w-[1680px] px-4 pb-24 pt-28 sm:px-6 lg:px-10 xl:px-12">
        {/* HEADER */}

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.025] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8 lg:p-10"
        >
          <div className="pointer-events-none absolute right-[-80px] top-[-100px] h-72 w-72 rounded-full bg-cyan-400/[0.07] blur-[110px]" />

          <div className="relative flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/10 bg-cyan-400/[0.06] px-3 py-1.5">
                <ShieldCheck
                  size={12}
                  className="text-cyan-400"
                />

                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-400">
                  Loan Administration
                </span>
              </div>

              <h1 className="max-w-4xl text-3xl font-bold tracking-[-0.035em] text-white sm:text-4xl lg:text-5xl">
                SmartBank{" "}
                <span className="bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
                  Loan Control
                </span>
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                Review customer loan applications, verify
                submitted details and manage approval
                decisions from one centralized workspace.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/10 bg-emerald-400/[0.05] px-3.5 py-2.5 text-xs text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/60" />
                  Loan System Active
                </div>

                <div className="inline-flex items-center gap-2 rounded-xl border border-white/[0.07] bg-black/20 px-3.5 py-2.5 text-xs text-slate-400">
                  <Landmark
                    size={14}
                    className="text-cyan-400"
                  />
                  Application Review Center
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => window.history.back()}
              className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.035] px-4 py-3 text-xs font-semibold text-slate-300 transition hover:border-cyan-400/20 hover:bg-cyan-400/[0.05] hover:text-cyan-400"
            >
              <ArrowLeft size={15} />
              Back to Admin
            </button>
          </div>
        </motion.section>

        {/* STATS */}

        <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              title: "Total Applications",
              value: stats.total,
              icon: FileCheck2,
              iconClass: "text-cyan-400",
              bgClass: "bg-cyan-400/[0.08]",
              borderClass: "border-cyan-400/10",
            },
            {
              title: "Pending Review",
              value: stats.pending,
              icon: Clock3,
              iconClass: "text-amber-400",
              bgClass: "bg-amber-400/[0.08]",
              borderClass: "border-amber-400/10",
            },
            {
              title: "Approved Loans",
              value: stats.approved,
              icon: CheckCircle2,
              iconClass: "text-emerald-400",
              bgClass: "bg-emerald-400/[0.08]",
              borderClass: "border-emerald-400/10",
            },
            {
              title: "Rejected Loans",
              value: stats.rejected,
              icon: XCircle,
              iconClass: "text-red-400",
              bgClass: "bg-red-400/[0.08]",
              borderClass: "border-red-400/10",
            },
          ].map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.title}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.06,
                }}
                whileHover={{ y: -4 }}
                className={`group relative overflow-hidden rounded-[1.5rem] border ${stat.borderClass} bg-white/[0.025] p-5 shadow-xl shadow-black/10 backdrop-blur-xl`}
              >
                <div
                  className={`absolute -right-10 -top-10 h-28 w-28 rounded-full ${stat.bgClass} blur-3xl`}
                />

                <div className="relative flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      {stat.title}
                    </p>

                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
                      {stat.value}
                    </h2>
                  </div>

                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.05] ${stat.bgClass}`}
                  >
                    <Icon
                      size={20}
                      className={stat.iconClass}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </section>

        {/* FILTER */}

        <section className="mt-10 rounded-[1.75rem] border border-white/[0.08] bg-white/[0.025] p-5 shadow-2xl shadow-black/10 backdrop-blur-xl sm:p-6">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />

                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-blue-400">
                  Application Management
                </p>
              </div>

              <h2 className="mt-2 text-xl font-bold text-white">
                Loan Applications
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Search and review customer loan requests.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <Search
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search applications..."
                  className="w-full rounded-xl border border-white/[0.07] bg-black/20 py-2.5 pl-10 pr-4 text-xs text-white outline-none placeholder:text-slate-700 transition focus:border-cyan-400/30 sm:w-64"
                />
              </div>

              <div className="relative">
                <Filter
                  size={14}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600"
                />

                <select
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(event.target.value)
                  }
                  className="appearance-none rounded-xl border border-white/[0.07] bg-black/20 py-2.5 pl-10 pr-9 text-xs font-semibold text-slate-400 outline-none transition focus:border-cyan-400/30"
                >
                  <option value="All">
                    All Status
                  </option>
                  <option value="Pending">
                    Pending
                  </option>
                  <option value="Approved">
                    Approved
                  </option>
                  <option value="Rejected">
                    Rejected
                  </option>
                </select>
              </div>

              <button
                type="button"
                onClick={fetchLoans}
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.07] bg-black/20 px-4 py-2.5 text-xs font-semibold text-slate-400 transition hover:border-cyan-400/20 hover:text-cyan-400 disabled:opacity-50"
              >
                <RefreshCw
                  size={14}
                  className={
                    loading ? "animate-spin" : ""
                  }
                />
                Refresh
              </button>
            </div>
          </div>
        </section>

        {/* SUCCESS MESSAGE */}

        {actionMessage && (
          <motion.div
            initial={{
              opacity: 0,
              y: -8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="mt-5 flex items-center gap-3 rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.05] px-5 py-4"
          >
            <CheckCircle2
              size={17}
              className="text-emerald-400"
            />

            <p className="text-xs font-semibold text-emerald-400">
              {actionMessage}
            </p>
          </motion.div>
        )}

        {/* ACTION ERROR */}

        {actionError && (
          <motion.div
            initial={{
              opacity: 0,
              y: -8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="mt-5 flex items-center gap-3 rounded-2xl border border-red-400/10 bg-red-400/[0.05] px-5 py-4"
          >
            <AlertCircle
              size={17}
              className="text-red-400"
            />

            <p className="text-xs font-semibold text-red-400">
              {actionError}
            </p>
          </motion.div>
        )}

        {/* FETCH ERROR */}

        {!loading && error && (
          <section className="mt-6 rounded-[1.75rem] border border-red-400/10 bg-red-400/[0.035] p-8 text-center">
            <AlertCircle
              size={30}
              className="mx-auto text-red-400"
            />

            <h3 className="mt-4 text-lg font-bold text-white">
              Unable to Load Loan Applications
            </h3>

            <p className="mt-2 text-xs text-slate-500">
              {error}
            </p>

            <button
              type="button"
              onClick={fetchLoans}
              className="mt-5 inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-slate-300 hover:border-cyan-400/20 hover:text-cyan-400"
            >
              <RefreshCw size={14} />
              Try Again
            </button>
          </section>
        )}

        {/* LOADING */}

        {loading && (
          <section className="mt-6 space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-[1.75rem] border border-white/[0.06] bg-white/[0.025] p-7"
              >
                <div className="h-6 w-48 rounded bg-white/[0.06]" />

                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {[1, 2, 3, 4].map((box) => (
                    <div
                      key={box}
                      className="h-24 rounded-2xl bg-white/[0.035]"
                    />
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* EMPTY */}

        {!loading &&
          !error &&
          filteredLoans.length === 0 && (
            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="mt-6 rounded-[1.75rem] border border-white/[0.08] bg-white/[0.025] p-10 text-center"
            >
              <FileCheck2
                size={28}
                className="mx-auto text-slate-600"
              />

              <h3 className="mt-5 text-lg font-bold text-white">
                No Loan Applications Found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-xs leading-6 text-slate-600">
                {loans.length === 0
                  ? "There are currently no loan applications available."
                  : "No applications match your current search or status filter."}
              </p>
            </motion.div>
          )}

        {/* LOAN LIST */}

        {!loading &&
          !error &&
          filteredLoans.length > 0 && (
            <section className="mt-6 space-y-5">
              {filteredLoans.map((loan, index) => {
                const statusStyles =
                  getStatusStyles(loan.status);

                const StatusIcon =
                  statusStyles.icon;

                const normalizedStatus =
                  normalizeStatus(loan.status);

                const isProcessing =
                  processingId === loan.id;

                return (
                  <motion.article
                    key={loan.id}
                    initial={{
                      opacity: 0,
                      y: 15,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.05,
                    }}
                    className="group relative overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-white/[0.025] p-5 shadow-2xl shadow-black/10 backdrop-blur-xl transition hover:border-white/[0.12] sm:p-6 lg:p-7"
                  >
                    <div className="relative">
                      {/* HEADER */}

                      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                        <div className="flex items-start gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.07]">
                            <Landmark
                              size={21}
                              className="text-cyan-400"
                            />
                          </div>

                          <div>
                            <div className="flex flex-wrap items-center gap-3">
                              <h2 className="text-xl font-bold text-white">
                                {loan.loanType ||
                                  "Loan Application"}
                              </h2>

                              <span
                                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold ${statusStyles.badge}`}
                              >
                                <StatusIcon size={12} />
                                {statusStyles.label}
                              </span>
                            </div>

                            <p className="mt-2 text-[10px] uppercase tracking-[0.14em] text-slate-600">
                              Application ID
                            </p>

                            <p className="mt-1 text-xs font-semibold text-slate-400">
                              {loan.id || "N/A"}
                            </p>

                            {loan.user && (
                              <p className="mt-2 text-xs text-slate-500">
                                {loan.user.name}{" "}
                                {loan.user.email
                                  ? `• ${loan.user.email}`
                                  : ""}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-black/20 px-3 py-2">
                          <Clock3
                            size={13}
                            className="text-slate-600"
                          />

                          <span className="text-[10px] text-slate-500">
                            {normalizedStatus ===
                            "PENDING"
                              ? "Review Required"
                              : "Decision Recorded"}
                          </span>
                        </div>
                      </div>

                      {/* DETAILS */}

                      <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-2xl border border-white/[0.05] bg-black/20 p-4">
                          <div className="flex items-center gap-2">
                            <Banknote
                              size={14}
                              className="text-cyan-400"
                            />

                            <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-600">
                              Principal
                            </p>
                          </div>

                          <h3 className="mt-3 text-lg font-bold text-white">
                            {formatAmount(
                              loan.principalAmount
                            )}
                          </h3>
                        </div>

                        <div className="rounded-2xl border border-white/[0.05] bg-black/20 p-4">
                          <div className="flex items-center gap-2">
                            <Clock3
                              size={14}
                              className="text-blue-400"
                            />

                            <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-600">
                              Tenure
                            </p>
                          </div>

                          <h3 className="mt-3 text-lg font-bold text-white">
                            {formatTenure(
                              loan.tenureMonths
                            )}
                          </h3>
                        </div>

                        <div className="rounded-2xl border border-white/[0.05] bg-black/20 p-4">
                          <div className="flex items-center gap-2">
                            <Banknote
                              size={14}
                              className="text-emerald-400"
                            />

                            <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-600">
                              Monthly EMI
                            </p>
                          </div>

                          <h3 className="mt-3 text-lg font-bold text-white">
                            {formatAmount(
                              loan.monthlyEmi
                            )}
                          </h3>
                        </div>

                        <div className="rounded-2xl border border-white/[0.05] bg-black/20 p-4">
                          <div className="flex items-center gap-2">
                            <ShieldCheck
                              size={14}
                              className="text-purple-400"
                            />

                            <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-600">
                              Next Payment
                            </p>
                          </div>

                          <h3 className="mt-3 text-sm font-bold text-white">
                            {formatDate(
                              loan.nextPaymentDate
                            )}
                          </h3>
                        </div>
                      </div>

                      {/* FINANCIAL SUMMARY */}

                      <div className="mt-4 grid gap-3 sm:grid-cols-3">
                        <div className="rounded-2xl border border-white/[0.05] bg-white/[0.015] p-4">
                          <p className="text-[9px] uppercase tracking-[0.15em] text-slate-600">
                            Interest Rate
                          </p>

                          <p className="mt-2 text-sm font-bold text-slate-300">
                            {Number.isFinite(
                              Number(
                                loan.interestRate
                              )
                            )
                              ? `${loan.interestRate}%`
                              : "—"}
                          </p>
                        </div>

                        <div className="rounded-2xl border border-white/[0.05] bg-white/[0.015] p-4">
                          <p className="text-[9px] uppercase tracking-[0.15em] text-slate-600">
                            Remaining
                          </p>

                          <p className="mt-2 text-sm font-bold text-slate-300">
                            {formatAmount(
                              loan.remainingAmount
                            )}
                          </p>
                        </div>

                        <div className="rounded-2xl border border-white/[0.05] bg-white/[0.015] p-4">
                          <p className="text-[9px] uppercase tracking-[0.15em] text-slate-600">
                            Total Payable
                          </p>

                          <p className="mt-2 text-sm font-bold text-slate-300">
                            {formatAmount(
                              loan.totalPayable
                            )}
                          </p>
                        </div>
                      </div>

                      {/* ACTIONS */}

                      {normalizedStatus ===
                        "PENDING" && (
                        <div className="mt-6 flex flex-col gap-3 border-t border-white/[0.05] pt-6 sm:flex-row sm:justify-end">
                          <button
                            type="button"
                            disabled={isProcessing}
                            onClick={() =>
                              updateLoanStatus(
                                loan.id,
                                "reject"
                              )
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-400/10 bg-red-400/[0.06] px-5 py-3 text-xs font-bold text-red-400 transition hover:border-red-400/20 hover:bg-red-400/10 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {isProcessing ? (
                              <Loader2
                                size={15}
                                className="animate-spin"
                              />
                            ) : (
                              <XCircle size={15} />
                            )}

                            Reject Application
                          </button>

                          <button
                            type="button"
                            disabled={isProcessing}
                            onClick={() =>
                              updateLoanStatus(
                                loan.id,
                                "approve"
                              )
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-emerald-500/10 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {isProcessing ? (
                              <Loader2
                                size={15}
                                className="animate-spin"
                              />
                            ) : (
                              <CheckCircle2 size={15} />
                            )}

                            Approve Application
                          </button>
                        </div>
                      )}

                      {/* FINAL DECISION */}

                      {normalizedStatus !==
                        "PENDING" && (
                        <div className="mt-6 flex items-center gap-3 border-t border-white/[0.05] pt-5">
                          {normalizedStatus ===
                          "ACTIVE" ? (
                            <CheckCircle2
                              size={16}
                              className="text-emerald-400"
                            />
                          ) : (
                            <XCircle
                              size={16}
                              className="text-red-400"
                            />
                          )}

                          <p className="text-xs text-slate-500">
                            This application has
                            already been{" "}
                            <span
                              className={
                                normalizedStatus ===
                                "ACTIVE"
                                  ? "font-semibold text-emerald-400"
                                  : "font-semibold text-red-400"
                              }
                            >
                              {statusStyles.label.toLowerCase()}
                            </span>
                            .
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.article>
                );
              })}
            </section>
          )}

        {/* WARNING */}

        <section className="mt-8">
          <div className="flex items-start gap-3 rounded-2xl border border-amber-400/10 bg-amber-400/[0.04] p-5">
            <AlertCircle
              size={18}
              className="mt-0.5 shrink-0 text-amber-400"
            />

            <div>
              <p className="text-xs font-semibold text-amber-400">
                Administrative loan controls
              </p>

              <p className="mt-1 max-w-3xl text-[10px] leading-5 text-slate-600">
                Loan approval and rejection decisions can
                affect customer financial operations. Verify
                application information carefully before
                confirming a decision.
              </p>
            </div>
          </div>
        </section>

        {/* FOOTER */}

        <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-white/[0.05] bg-white/[0.015] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Sparkles
              size={14}
              className="text-cyan-400"
            />

            <p className="text-[10px] text-slate-600">
              SmartBank AI Loan Administration
            </p>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-slate-700">
            <ShieldCheck size={12} />
            Administrative review protected
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLoans;
