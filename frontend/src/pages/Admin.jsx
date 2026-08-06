import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  UserCheck,
  ShieldCheck,
  WalletCards,
  ArrowUpRight,
  Activity,
  Search,
  Filter,
  MoreHorizontal,
  CheckCircle2,
  Clock3,
  AlertTriangle,
  TrendingUp,
  CreditCard,
  Landmark,
  Eye,
  Download,
  RefreshCw,
  ChevronRight,
  Sparkles,
  ShieldAlert,
  CircleDollarSign,
  X,
  Mail,
  CalendarDays,
  Wallet,
  Loader2,
} from "lucide-react";

import api from "../services/api";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [search, setSearch] = useState("");

  const [overview, setOverview] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [activities, setActivities] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerLoading, setCustomerLoading] = useState(false);
  const [customerError, setCustomerError] = useState("");

  // ==========================================
  // FORMATTERS
  // ==========================================

  const formatCurrency = (value) => {
    const amount = Number(value || 0);

    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatCompactCurrency = (value) => {
    const amount = Number(value || 0);

    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    }

    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} L`;
    }

    if (amount >= 1000) {
      return `₹${(amount / 1000).toFixed(1)}K`;
    }

    return formatCurrency(amount);
  };

  const formatDate = (value) => {
    if (!value) {
      return "—";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "—";
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatRelativeTime = (value) => {
    if (!value) {
      return "—";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "—";
    }

    const difference =
      Date.now() - date.getTime();

    const seconds = Math.floor(
      difference / 1000
    );

    if (seconds < 60) {
      return "just now";
    }

    const minutes = Math.floor(
      seconds / 60
    );

    if (minutes < 60) {
      return `${minutes} min ago`;
    }

    const hours = Math.floor(
      minutes / 60
    );

    if (hours < 24) {
      return `${hours} hr ago`;
    }

    const days = Math.floor(
      hours / 24
    );

    if (days < 30) {
      return `${days} day${days === 1 ? "" : "s"} ago`;
    }

    return formatDate(value);
  };

  const getInitials = (name = "") => {
    const words = String(name)
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    if (!words.length) {
      return "SB";
    }

    if (words.length === 1) {
      return words[0]
        .slice(0, 2)
        .toUpperCase();
    }

    return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
  };

  // ==========================================
  // LOAD ADMIN DATA
  // ==========================================

  const loadAdminData = useCallback(
    async (showRefreshLoader = false) => {
      try {
        if (showRefreshLoader) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        setError("");

        const [
          overviewResponse,
          customersResponse,
          activityResponse,
        ] = await Promise.all([
          api.get("/admin/overview"),
          api.get("/admin/customers", {
            params: {
              limit: 100,
              offset: 0,
            },
          }),
          api.get("/admin/activity", {
            params: {
              limit: 10,
            },
          }),
        ]);

        if (overviewResponse?.data?.success) {
          setOverview(
            overviewResponse.data.data
          );
        } else {
          throw new Error(
            overviewResponse?.data?.message ||
              "Unable to load admin overview"
          );
        }

        if (customersResponse?.data?.success) {
          setCustomers(
            customersResponse.data.data || []
          );
        } else {
          throw new Error(
            customersResponse?.data?.message ||
              "Unable to load customers"
          );
        }

        if (activityResponse?.data?.success) {
          setActivities(
            activityResponse.data.data || []
          );
        } else {
          throw new Error(
            activityResponse?.data?.message ||
              "Unable to load admin activity"
          );
        }
      } catch (requestError) {
        console.error(
          "ADMIN DATA LOAD ERROR:",
          requestError
        );

        const message =
          requestError?.response?.data?.message ||
          requestError?.message ||
          "Unable to load admin dashboard data.";

        setError(message);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    []
  );

  // ==========================================
  // INITIAL LOAD
  // ==========================================

  useEffect(() => {
    loadAdminData(false);
  }, [loadAdminData]);

  // ==========================================
  // CUSTOMER SEARCH
  // ==========================================

  const filteredCustomers = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    if (!query) {
      return customers;
    }

    return customers.filter((customer) => {
      return (
        String(customer.name || "")
          .toLowerCase()
          .includes(query) ||
        String(customer.email || "")
          .toLowerCase()
          .includes(query) ||
        String(customer.id || "")
          .toLowerCase()
          .includes(query)
      );
    });
  }, [customers, search]);

  // ==========================================
  // CUSTOMER DETAILS
  // ==========================================

  const openCustomerDetails = async (
    customerId
  ) => {
    if (!customerId) {
      return;
    }

    try {
      setCustomerLoading(true);
      setCustomerError("");

      const response = await api.get(
        `/admin/customers/${customerId}`
      );

      if (!response?.data?.success) {
        throw new Error(
          response?.data?.message ||
            "Unable to load customer details"
        );
      }

      setSelectedCustomer(
        response.data.data
      );
    } catch (requestError) {
      console.error(
        "CUSTOMER DETAILS ERROR:",
        requestError
      );

      setCustomerError(
        requestError?.response?.data?.message ||
          requestError?.message ||
          "Unable to load customer details."
      );
    } finally {
      setCustomerLoading(false);
    }
  };

  // ==========================================
  // EXPORT REPORT
  // ==========================================

  const exportReport = () => {
    const report = {
      generatedAt: new Date().toISOString(),
      overview,
      customers,
      activities,
    };

    const blob = new Blob(
      [JSON.stringify(report, null, 2)],
      {
        type: "application/json",
      }
    );

    const url = URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download = `smartbank-admin-report-${Date.now()}.json`;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  // ==========================================
  // STATS
  // ==========================================

  const stats = [
    {
      title: "Total Customers",
      value: overview
        ? Number(
            overview.totalCustomers || 0
          ).toLocaleString("en-IN")
        : "—",
      change: "Live",
      label: "database records",
      icon: Users,
      iconClass: "text-cyan-400",
      bgClass: "bg-cyan-400/[0.08]",
      borderClass: "border-cyan-400/10",
    },
    {
      title: "Active Accounts",
      value: overview
        ? Number(
            overview.activeAccounts || 0
          ).toLocaleString("en-IN")
        : "—",
      change: "Live",
      label: "active accounts",
      icon: UserCheck,
      iconClass: "text-emerald-400",
      bgClass: "bg-emerald-400/[0.08]",
      borderClass: "border-emerald-400/10",
    },
    {
      title: "Total Deposits",
      value: overview
        ? formatCompactCurrency(
            overview.totalDeposits
          )
        : "—",
      change: "Live",
      label: "active account balance",
      icon: WalletCards,
      iconClass: "text-blue-400",
      bgClass: "bg-blue-400/[0.08]",
      borderClass: "border-blue-400/10",
    },
    {
      title: "Security Score",
      value: overview
        ? `${Number(
            overview.securityScore || 0
          ).toFixed(1)}%`
        : "—",
      change: "System",
      label: "security health",
      icon: ShieldCheck,
      iconClass: "text-purple-400",
      bgClass: "bg-purple-400/[0.08]",
      borderClass: "border-purple-400/10",
    },
  ];

  const tabs = [
    "Overview",
    "Customers",
    "Transactions",
    "Security",
  ];

  // ==========================================
  // ACTIVITY ICON
  // ==========================================

  const getActivityVisual = (activity) => {
    switch (activity?.type) {
      case "USER_REGISTERED":
        return {
          icon: UserCheck,
          className:
            "text-emerald-400 bg-emerald-400/10",
        };

      case "TRANSACTION":
        return {
          icon: CircleDollarSign,
          className:
            "text-cyan-400 bg-cyan-400/10",
        };

      case "CARD_CREATED":
        return {
          icon: CreditCard,
          className:
            "text-purple-400 bg-purple-400/10",
        };

      case "LOAN_CREATED":
        return {
          icon: Landmark,
          className:
            "text-blue-400 bg-blue-400/10",
        };

      default:
        return {
          icon: Activity,
          className:
            "text-slate-400 bg-slate-400/10",
        };
    }
  };

  // ==========================================
  // LOADING SCREEN
  // ==========================================

  if (loading) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 top-20 h-[520px] w-[520px] rounded-full bg-blue-600/[0.07] blur-[150px]" />

          <div className="absolute right-[-180px] top-[320px] h-[520px] w-[520px] rounded-full bg-cyan-500/[0.055] blur-[160px]" />
        </div>

        <main className="relative z-10 mx-auto flex min-h-screen max-w-[1680px] items-center justify-center px-6">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.06]">
              <Loader2
                size={28}
                className="animate-spin text-cyan-400"
              />
            </div>

            <h2 className="mt-5 text-lg font-bold text-white">
              Loading Admin Console
            </h2>

            <p className="mt-2 text-xs text-slate-500">
              Fetching live banking data...
            </p>
          </div>
        </main>
      </div>
    );
  }

  // ==========================================
  // MAIN
  // ==========================================

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
      {/* BACKGROUND */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-[520px] w-[520px] rounded-full bg-blue-600/[0.07] blur-[150px]" />

        <div className="absolute right-[-180px] top-[320px] h-[520px] w-[520px] rounded-full bg-cyan-500/[0.055] blur-[160px]" />

        <div className="absolute left-[40%] top-[1200px] h-[400px] w-[400px] rounded-full bg-purple-600/[0.04] blur-[150px]" />
      </div>

      <main className="relative z-10 mx-auto max-w-[1680px] px-4 pb-24 pt-28 sm:px-6 lg:px-10 xl:px-12">
        {/* HEADER */}

        <motion.section
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.55,
          }}
          className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.025] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8 lg:p-10"
        >
          <div className="pointer-events-none absolute right-[-80px] top-[-100px] h-72 w-72 rounded-full bg-cyan-400/[0.07] blur-[110px]" />

          <div className="pointer-events-none absolute bottom-[-100px] left-[30%] h-64 w-64 rounded-full bg-blue-500/[0.05] blur-[100px]" />

          <div className="relative flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/10 bg-cyan-400/[0.06] px-3 py-1.5">
                <ShieldCheck
                  size={12}
                  className="text-cyan-400"
                />

                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-400">
                  Administrative Control Center
                </span>
              </div>

              <h1 className="max-w-4xl text-3xl font-bold tracking-[-0.035em] text-white sm:text-4xl lg:text-5xl">
                SmartBank{" "}
                <span className="bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
                  Admin Console
                </span>
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                Monitor customers, banking activity, security events and
                platform performance from one centralized command center.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/10 bg-emerald-400/[0.05] px-3.5 py-2.5 text-xs text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/60" />
                  System Operational
                </div>

                <div className="inline-flex items-center gap-2 rounded-xl border border-white/[0.07] bg-black/20 px-3.5 py-2.5 text-xs text-slate-400">
                  <Activity
                    size={14}
                    className="text-cyan-400"
                  />
                  Live Monitoring
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                disabled={refreshing}
                onClick={() =>
                  loadAdminData(true)
                }
                className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.035] px-4 py-3 text-xs font-semibold text-slate-300 transition hover:border-cyan-400/20 hover:bg-cyan-400/[0.05] hover:text-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <RefreshCw
                  size={15}
                  className={
                    refreshing
                      ? "animate-spin"
                      : ""
                  }
                />

                {refreshing
                  ? "Refreshing..."
                  : "Refresh"}
              </button>

              <button
                type="button"
                onClick={exportReport}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3 text-xs font-bold text-white shadow-lg shadow-cyan-500/10 transition hover:-translate-y-0.5"
              >
                <Download size={15} />
                Export Report
              </button>
            </div>
          </div>
        </motion.section>

        {/* ERROR */}

        {error && (
          <motion.div
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="mt-5 flex flex-col gap-3 rounded-2xl border border-red-400/10 bg-red-400/[0.045] p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-start gap-3">
              <AlertTriangle
                size={18}
                className="mt-0.5 shrink-0 text-red-400"
              />

              <div>
                <p className="text-xs font-semibold text-red-400">
                  Admin data could not be loaded
                </p>

                <p className="mt-1 text-[10px] leading-5 text-slate-500">
                  {error}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                loadAdminData(true)
              }
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-red-400/10 bg-red-400/[0.05] px-4 py-2.5 text-xs font-semibold text-red-400 transition hover:bg-red-400/[0.08]"
            >
              <RefreshCw size={13} />
              Try Again
            </button>
          </motion.div>
        )}

        {/* STATS */}

        <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => {
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
                whileHover={{
                  y: -4,
                }}
                className={`group relative overflow-hidden rounded-[1.5rem] border ${stat.borderClass} bg-white/[0.025] p-5 shadow-xl shadow-black/10 backdrop-blur-xl`}
              >
                <div
                  className={`absolute -right-10 -top-10 h-28 w-28 rounded-full ${stat.bgClass} blur-3xl transition-transform duration-500 group-hover:scale-125`}
                />

                <div className="relative flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      {stat.title}
                    </p>

                    <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                      {stat.value}
                    </h2>

                    <div className="mt-3 flex items-center gap-2">
                      <ArrowUpRight
                        size={13}
                        className="text-emerald-400"
                      />

                      <span className="text-xs font-semibold text-emerald-400">
                        {stat.change}
                      </span>

                      <span className="text-[10px] text-slate-600">
                        {stat.label}
                      </span>
                    </div>
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

        {/* TABS */}

        <section className="mt-10">
          <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() =>
                  setActiveTab(tab)
                }
                className={`rounded-xl px-4 py-2.5 text-xs font-semibold transition ${
                  activeTab === tab
                    ? "bg-cyan-400/10 text-cyan-400 shadow-lg shadow-cyan-500/[0.03]"
                    : "text-slate-500 hover:bg-white/[0.04] hover:text-slate-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </section>

        {/* ==========================================
            OVERVIEW
        ========================================== */}

        {activeTab === "Overview" && (
          <>
            <section className="mt-8 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
              {/* PLATFORM PERFORMANCE */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="rounded-[1.75rem] border border-white/[0.08] bg-white/[0.025] p-6 shadow-2xl shadow-black/10 backdrop-blur-xl"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />

                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-400">
                        Platform Analytics
                      </p>
                    </div>

                    <h2 className="mt-2 text-xl font-bold text-white">
                      Banking Performance
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                      Live platform transaction statistics.
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] px-3 py-2 text-[10px] font-semibold text-slate-400">
                    Live Database
                  </div>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/[0.05] bg-black/20 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] uppercase tracking-wider text-slate-600">
                        Transactions
                      </p>

                      <CircleDollarSign
                        size={15}
                        className="text-cyan-400"
                      />
                    </div>

                    <p className="mt-3 text-2xl font-bold text-white">
                      {Number(
                        overview?.transactionCount || 0
                      ).toLocaleString("en-IN")}
                    </p>

                    <p className="mt-1 text-[10px] text-slate-600">
                      total processed
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/[0.05] bg-black/20 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] uppercase tracking-wider text-slate-600">
                        Customers
                      </p>

                      <Users
                        size={15}
                        className="text-blue-400"
                      />
                    </div>

                    <p className="mt-3 text-2xl font-bold text-white">
                      {Number(
                        overview?.totalCustomers || 0
                      ).toLocaleString("en-IN")}
                    </p>

                    <p className="mt-1 text-[10px] text-slate-600">
                      registered customers
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/[0.05] bg-black/20 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] uppercase tracking-wider text-slate-600">
                        Deposits
                      </p>

                      <Wallet
                        size={15}
                        className="text-emerald-400"
                      />
                    </div>

                    <p className="mt-3 text-2xl font-bold text-white">
                      {formatCompactCurrency(
                        overview?.totalDeposits
                      )}
                    </p>

                    <p className="mt-1 text-[10px] text-slate-600">
                      active account balances
                    </p>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.035] p-4">
                  <div className="flex items-start gap-3">
                    <TrendingUp
                      size={18}
                      className="mt-0.5 shrink-0 text-cyan-400"
                    />

                    <div>
                      <p className="text-xs font-semibold text-cyan-400">
                        Live platform metrics
                      </p>

                      <p className="mt-1 text-[10px] leading-5 text-slate-500">
                        These values are being calculated directly from
                        SmartBank's PostgreSQL database through the admin API.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* SECURITY */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.1,
                }}
                className="rounded-[1.75rem] border border-white/[0.08] bg-white/[0.025] p-6 shadow-2xl shadow-black/10 backdrop-blur-xl"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-400">
                        Security
                      </p>
                    </div>

                    <h2 className="mt-2 text-xl font-bold text-white">
                      System Health
                    </h2>
                  </div>

                  <ShieldCheck
                    size={21}
                    className="text-emerald-400"
                  />
                </div>

                <div className="mt-7 flex items-center gap-6">
                  <div className="relative flex h-32 w-32 shrink-0 items-center justify-center rounded-full border-[10px] border-emerald-400/10">
                    <div className="absolute inset-[-10px] rounded-full border-[10px] border-transparent border-t-emerald-400 border-r-emerald-400" />

                    <div className="text-center">
                      <p className="text-2xl font-extrabold text-white">
                        {Number(
                          overview?.securityScore || 0
                        ).toFixed(1)}
                      </p>

                      <p className="text-[9px] uppercase tracking-wider text-slate-600">
                        Score
                      </p>
                    </div>
                  </div>

                  <div className="min-w-0 space-y-4">
                    <div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs text-slate-500">
                          Authentication
                        </span>

                        <span className="text-xs font-semibold text-emerald-400">
                          99%
                        </span>
                      </div>

                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                        <div className="h-full w-[99%] rounded-full bg-emerald-400" />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs text-slate-500">
                          Fraud Protection
                        </span>

                        <span className="text-xs font-semibold text-cyan-400">
                          97%
                        </span>
                      </div>

                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                        <div className="h-full w-[97%] rounded-full bg-cyan-400" />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs text-slate-500">
                          System Uptime
                        </span>

                        <span className="text-xs font-semibold text-blue-400">
                          99.9%
                        </span>
                      </div>

                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                        <div className="h-full w-[99.9%] rounded-full bg-blue-400" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-7 rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.045] p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2
                      size={18}
                      className="shrink-0 text-emerald-400"
                    />

                    <div>
                      <p className="text-xs font-semibold text-emerald-400">
                        All systems operational
                      </p>

                      <p className="mt-1 text-[10px] text-slate-600">
                        Admin API is connected to the banking database.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>
          </>
        )}

        {/* ==========================================
            CUSTOMERS
        ========================================== */}

        {(activeTab === "Overview" ||
          activeTab === "Customers") && (
          <section className="mt-8 rounded-[1.75rem] border border-white/[0.08] bg-white/[0.025] shadow-2xl shadow-black/10 backdrop-blur-xl">
            <div className="border-b border-white/[0.06] p-6">
              <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />

                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-blue-400">
                      User Management
                    </p>
                  </div>

                  <h2 className="mt-2 text-xl font-bold text-white">
                    Customer Directory
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Real customers loaded from the SmartBank database.
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
                        setSearch(
                          event.target.value
                        )
                      }
                      placeholder="Search customers..."
                      className="w-full rounded-xl border border-white/[0.07] bg-black/20 py-2.5 pl-10 pr-4 text-xs text-white outline-none placeholder:text-slate-700 transition focus:border-cyan-400/30 sm:w-64"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-2.5 text-xs font-semibold text-slate-400 transition hover:border-cyan-400/20 hover:text-cyan-400"
                  >
                    <Filter size={14} />
                    {search
                      ? "Clear"
                      : "All Customers"}
                  </button>
                </div>
              </div>
            </div>

            {filteredCustomers.length === 0 ? (
              <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.025]">
                  <Users
                    size={22}
                    className="text-slate-600"
                  />
                </div>

                <h3 className="mt-4 text-sm font-semibold text-white">
                  No customers found
                </h3>

                <p className="mt-2 max-w-sm text-xs leading-5 text-slate-600">
                  No customer matches the current search.
                </p>
              </div>
            ) : (
              <>
                <div className="hidden overflow-x-auto lg:block">
                  <table className="w-full min-w-[900px]">
                    <thead>
                      <tr className="border-b border-white/[0.05] text-left">
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-600">
                          Customer
                        </th>

                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-600">
                          Customer ID
                        </th>

                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-600">
                          Status
                        </th>

                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-600">
                          Balance
                        </th>

                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-600">
                          Joined
                        </th>

                        <th className="px-6 py-4 text-right text-[10px] font-bold uppercase tracking-[0.16em] text-slate-600">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredCustomers.map(
                        (customer, index) => (
                          <motion.tr
                            key={customer.id}
                            initial={{
                              opacity: 0,
                            }}
                            animate={{
                              opacity: 1,
                            }}
                            transition={{
                              delay:
                                index * 0.04,
                            }}
                            className="border-b border-white/[0.04] transition hover:bg-white/[0.025]"
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.07] text-xs font-bold text-cyan-400">
                                  {getInitials(
                                    customer.name
                                  )}
                                </div>

                                <div>
                                  <p className="text-sm font-semibold text-white">
                                    {customer.name ||
                                      "Unknown Customer"}
                                  </p>

                                  <p className="mt-0.5 text-[10px] text-slate-600">
                                    {customer.email ||
                                      "No email"}
                                  </p>
                                </div>
                              </div>
                            </td>

                            <td className="px-6 py-4 text-xs font-medium text-slate-500">
                              {customer.id}
                            </td>

                            <td className="px-6 py-4">
                              <span
                                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                                  customer.status ===
                                  "Active"
                                    ? "bg-emerald-400/10 text-emerald-400"
                                    : customer.status ===
                                      "Pending"
                                    ? "bg-amber-400/10 text-amber-400"
                                    : "bg-red-400/10 text-red-400"
                                }`}
                              >
                                <span className="h-1.5 w-1.5 rounded-full bg-current" />

                                {customer.status ||
                                  "Unknown"}
                              </span>
                            </td>

                            <td className="px-6 py-4 text-sm font-bold text-white">
                              {formatCurrency(
                                customer.balance
                              )}
                            </td>

                            <td className="px-6 py-4 text-xs text-slate-600">
                              {formatDate(
                                customer.joined
                              )}
                            </td>

                            <td className="px-6 py-4">
                              <div className="flex justify-end">
                                <button
                                  type="button"
                                  onClick={() =>
                                    openCustomerDetails(
                                      customer.id
                                    )
                                  }
                                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.025] text-slate-500 transition hover:border-cyan-400/20 hover:text-cyan-400"
                                  title="View customer"
                                >
                                  <Eye size={16} />
                                </button>
                              </div>
                            </td>
                          </motion.tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="grid gap-3 p-4 lg:hidden">
                  {filteredCustomers.map(
                    (customer) => (
                      <div
                        key={customer.id}
                        className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/[0.07] text-xs font-bold text-cyan-400">
                              {getInitials(
                                customer.name
                              )}
                            </div>

                            <div>
                              <p className="text-sm font-semibold text-white">
                                {customer.name ||
                                  "Unknown Customer"}
                              </p>

                              <p className="mt-0.5 text-[10px] text-slate-600">
                                {customer.email ||
                                  "No email"}
                              </p>
                            </div>
                          </div>

                          <span
                            className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                              customer.status ===
                              "Active"
                                ? "bg-emerald-400/10 text-emerald-400"
                                : customer.status ===
                                  "Pending"
                                ? "bg-amber-400/10 text-amber-400"
                                : "bg-red-400/10 text-red-400"
                            }`}
                          >
                            {customer.status ||
                              "Unknown"}
                          </span>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-3">
                          <div className="rounded-xl bg-white/[0.025] p-3">
                            <p className="text-[9px] uppercase tracking-wider text-slate-600">
                              Balance
                            </p>

                            <p className="mt-1 text-sm font-bold text-white">
                              {formatCurrency(
                                customer.balance
                              )}
                            </p>
                          </div>

                          <div className="rounded-xl bg-white/[0.025] p-3">
                            <p className="text-[9px] uppercase tracking-wider text-slate-600">
                              Accounts
                            </p>

                            <p className="mt-1 text-xs font-semibold text-slate-400">
                              {customer.accountCount ||
                                0}
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            openCustomerDetails(
                              customer.id
                            )
                          }
                          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.025] py-2.5 text-xs font-semibold text-slate-400 transition hover:border-cyan-400/20 hover:text-cyan-400"
                        >
                          <Eye size={14} />
                          View Details
                        </button>
                      </div>
                    )
                  )}
                </div>
              </>
            )}

            <div className="flex items-center justify-between border-t border-white/[0.05] px-6 py-4">
              <p className="text-[10px] text-slate-600">
                Showing {filteredCustomers.length} of{" "}
                {Number(
                  overview?.totalCustomers ||
                    customers.length ||
                    0
                ).toLocaleString("en-IN")}{" "}
                customers
              </p>

              <button
                type="button"
                onClick={() =>
                  setActiveTab("Customers")
                }
                className="group inline-flex items-center gap-1 text-xs font-semibold text-cyan-400"
              >
                View all
                <ChevronRight
                  size={13}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </button>
            </div>
          </section>
        )}

        {/* ==========================================
            TRANSACTIONS
        ========================================== */}

        {activeTab === "Transactions" && (
          <section className="mt-8 rounded-[1.75rem] border border-white/[0.08] bg-white/[0.025] p-6 shadow-2xl shadow-black/10 backdrop-blur-xl">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-400">
                  Financial Monitoring
                </p>
              </div>

              <h2 className="mt-2 text-xl font-bold text-white">
                Transaction Activity
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Recent transactions detected by the admin activity feed.
              </p>
            </div>

            <div className="mt-6 space-y-3">
              {activities.filter(
                (activity) =>
                  activity.type ===
                  "TRANSACTION"
              ).length === 0 ? (
                <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] px-5 py-12 text-center">
                  <CircleDollarSign
                    size={24}
                    className="mx-auto text-slate-700"
                  />

                  <p className="mt-3 text-xs font-semibold text-slate-500">
                    No recent transactions
                  </p>
                </div>
              ) : (
                activities
                  .filter(
                    (activity) =>
                      activity.type ===
                      "TRANSACTION"
                  )
                  .map((activity) => (
                    <div
                      key={activity.id}
                      className="flex flex-col gap-4 rounded-2xl border border-white/[0.05] bg-white/[0.02] p-4 sm:flex-row sm:items-center"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
                        <CircleDollarSign
                          size={17}
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-white">
                          {activity.title}
                        </p>

                        <p className="mt-1 text-[10px] text-slate-600">
                          {activity.description}
                        </p>
                      </div>

                      <div className="text-left sm:text-right">
                        <p className="text-sm font-bold text-white">
                          {formatCurrency(
                            activity.transaction
                              ?.amount
                          )}
                        </p>

                        <p className="mt-1 text-[9px] text-slate-700">
                          {formatRelativeTime(
                            activity.createdAt
                          )}
                        </p>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </section>
        )}

        {/* ==========================================
            SECURITY
        ========================================== */}

        {activeTab === "Security" && (
          <section className="mt-8 grid gap-6 xl:grid-cols-2">
            <div className="rounded-[1.75rem] border border-white/[0.08] bg-white/[0.025] p-6 shadow-2xl shadow-black/10 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-400">
                      Security
                    </p>
                  </div>

                  <h2 className="mt-2 text-xl font-bold text-white">
                    Security Health
                  </h2>
                </div>

                <ShieldCheck
                  size={21}
                  className="text-emerald-400"
                />
              </div>

              <div className="mt-8 flex items-center justify-center">
                <div className="relative flex h-44 w-44 items-center justify-center rounded-full border-[14px] border-emerald-400/10">
                  <div className="absolute inset-[-14px] rounded-full border-[14px] border-transparent border-t-emerald-400 border-r-emerald-400" />

                  <div className="text-center">
                    <p className="text-4xl font-extrabold text-white">
                      {Number(
                        overview?.securityScore ||
                          0
                      ).toFixed(1)}
                    </p>

                    <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-slate-600">
                      Security Score
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.045] p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 text-emerald-400"
                  />

                  <div>
                    <p className="text-xs font-semibold text-emerald-400">
                      System operational
                    </p>

                    <p className="mt-1 text-[10px] leading-5 text-slate-600">
                      No critical security incidents are currently exposed by
                      the admin monitoring layer.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-white/[0.08] bg-white/[0.025] p-6 shadow-2xl shadow-black/10 backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />

                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-amber-400">
                  Monitoring
                </p>
              </div>

              <h2 className="mt-2 text-xl font-bold text-white">
                Security Activity
              </h2>

              <div className="mt-6 space-y-3">
                {activities.length === 0 ? (
                  <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-6 text-center">
                    <ShieldAlert
                      size={22}
                      className="mx-auto text-slate-700"
                    />

                    <p className="mt-3 text-xs text-slate-600">
                      No security activity available.
                    </p>
                  </div>
                ) : (
                  activities.map(
                    (activity) => {
                      const visual =
                        getActivityVisual(
                          activity
                        );

                      const Icon =
                        visual.icon;

                      return (
                        <div
                          key={activity.id}
                          className="flex items-center gap-3 rounded-2xl border border-white/[0.05] bg-white/[0.02] p-4"
                        >
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${visual.className}`}
                          >
                            <Icon size={17} />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-xs font-semibold text-white">
                              {activity.title}
                            </p>

                            <p className="mt-1 truncate text-[10px] text-slate-600">
                              {activity.description}
                            </p>
                          </div>

                          <span className="shrink-0 text-[9px] text-slate-700">
                            {formatRelativeTime(
                              activity.createdAt
                            )}
                          </span>
                        </div>
                      );
                    }
                  )
                )}
              </div>
            </div>
          </section>
        )}

        {/* ==========================================
            RECENT ACTIVITY
        ========================================== */}

        {(activeTab === "Overview" ||
          activeTab === "Customers") && (
          <section className="mt-8 grid gap-6 xl:grid-cols-2">
            <div className="rounded-[1.75rem] border border-white/[0.08] bg-white/[0.025] p-6 shadow-2xl shadow-black/10 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />

                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-400">
                      Live Feed
                    </p>
                  </div>

                  <h2 className="mt-2 text-xl font-bold text-white">
                    Recent Activity
                  </h2>
                </div>

                <Activity
                  size={19}
                  className="text-cyan-400"
                />
              </div>

              <div className="mt-6 space-y-3">
                {activities.length === 0 ? (
                  <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-8 text-center">
                    <Activity
                      size={22}
                      className="mx-auto text-slate-700"
                    />

                    <p className="mt-3 text-xs text-slate-600">
                      No recent activity.
                    </p>
                  </div>
                ) : (
                  activities.map(
                    (activity) => {
                      const visual =
                        getActivityVisual(
                          activity
                        );

                      const Icon =
                        visual.icon;

                      return (
                        <motion.div
                          key={activity.id}
                          initial={{
                            opacity: 0,
                            x: -10,
                          }}
                          animate={{
                            opacity: 1,
                            x: 0,
                          }}
                          className="group flex items-center gap-4 rounded-2xl border border-white/[0.05] bg-white/[0.02] p-4 transition hover:border-white/[0.09] hover:bg-white/[0.035]"
                        >
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${visual.className}`}
                          >
                            <Icon size={17} />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-xs font-semibold text-white">
                              {activity.title}
                            </p>

                            <p className="mt-1 truncate text-[10px] text-slate-600">
                              {activity.description}
                            </p>
                          </div>

                          <span className="shrink-0 text-[9px] text-slate-700">
                            {formatRelativeTime(
                              activity.createdAt
                            )}
                          </span>
                        </motion.div>
                      );
                    }
                  )
                )}
              </div>
            </div>

            {/* ADMIN CONTROLS */}

            <div className="rounded-[1.75rem] border border-white/[0.08] bg-white/[0.025] p-6 shadow-2xl shadow-black/10 backdrop-blur-xl">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />

                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-purple-400">
                    Control Center
                  </p>
                </div>

                <h2 className="mt-2 text-xl font-bold text-white">
                  Admin Quick Controls
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Administrative monitoring shortcuts.
                </p>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() =>
                    setActiveTab("Customers")
                  }
                  className="group flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 text-left transition hover:-translate-y-0.5 hover:border-cyan-400/20 hover:bg-cyan-400/[0.04]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
                    <Users size={17} />
                  </div>

                  <div className="flex-1">
                    <p className="text-xs font-semibold text-white">
                      Manage Users
                    </p>

                    <p className="mt-1 text-[9px] text-slate-600">
                      Customer accounts
                    </p>
                  </div>

                  <ChevronRight
                    size={14}
                    className="text-slate-700 transition group-hover:translate-x-0.5 group-hover:text-cyan-400"
                  />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setActiveTab(
                      "Transactions"
                    )
                  }
                  className="group flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 text-left transition hover:-translate-y-0.5 hover:border-emerald-400/20 hover:bg-emerald-400/[0.04]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
                    <CircleDollarSign
                      size={17}
                    />
                  </div>

                  <div className="flex-1">
                    <p className="text-xs font-semibold text-white">
                      Transactions
                    </p>

                    <p className="mt-1 text-[9px] text-slate-600">
                      Financial activity
                    </p>
                  </div>

                  <ChevronRight
                    size={14}
                    className="text-slate-700 transition group-hover:translate-x-0.5 group-hover:text-emerald-400"
                  />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setActiveTab("Security")
                  }
                  className="group flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 text-left transition hover:-translate-y-0.5 hover:border-amber-400/20 hover:bg-amber-400/[0.04]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400">
                    <ShieldAlert
                      size={17}
                    />
                  </div>

                  <div className="flex-1">
                    <p className="text-xs font-semibold text-white">
                      Security Logs
                    </p>

                    <p className="mt-1 text-[9px] text-slate-600">
                      Review activity
                    </p>
                  </div>

                  <ChevronRight
                    size={14}
                    className="text-slate-700 transition group-hover:translate-x-0.5 group-hover:text-amber-400"
                  />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    loadAdminData(true)
                  }
                  className="group flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 text-left transition hover:-translate-y-0.5 hover:border-purple-400/20 hover:bg-purple-400/[0.04]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-400/10 text-purple-400">
                    <RefreshCw size={17} />
                  </div>

                  <div className="flex-1">
                    <p className="text-xs font-semibold text-white">
                      Sync Data
                    </p>

                    <p className="mt-1 text-[9px] text-slate-600">
                      Refresh database data
                    </p>
                  </div>

                  <ChevronRight
                    size={14}
                    className="text-slate-700 transition group-hover:translate-x-0.5 group-hover:text-purple-400"
                  />
                </button>
              </div>

              <div className="mt-5 flex items-start gap-3 rounded-2xl border border-amber-400/10 bg-amber-400/[0.04] p-4">
                <AlertTriangle
                  size={17}
                  className="mt-0.5 shrink-0 text-amber-400"
                />

                <div>
                  <p className="text-xs font-semibold text-amber-400">
                    Administrative access
                  </p>

                  <p className="mt-1 text-[10px] leading-5 text-slate-600">
                    Administrative operations are protected by JWT
                    authentication and the ADMIN role.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* FOOTER STATUS */}

        <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-white/[0.05] bg-white/[0.015] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Sparkles
              size={14}
              className="text-cyan-400"
            />

            <p className="text-[10px] text-slate-600">
              SmartBank AI Administrative Intelligence
            </p>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-slate-700">
            <Clock3 size={12} />
            Last sync: {refreshing ? "syncing..." : "live"}
          </div>
        </div>
      </main>

      {/* ==========================================
          CUSTOMER DETAILS MODAL
      ========================================== */}

      {(selectedCustomer ||
        customerLoading ||
        customerError) && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md">
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.96,
              y: 10,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-white/[0.08] bg-[#07111f] p-6 shadow-2xl sm:p-8"
          >
            <button
              type="button"
              onClick={() => {
                setSelectedCustomer(null);
                setCustomerError("");
              }}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025] text-slate-500 transition hover:text-white"
            >
              <X size={16} />
            </button>

            {customerLoading ? (
              <div className="flex min-h-[350px] flex-col items-center justify-center text-center">
                <Loader2
                  size={28}
                  className="animate-spin text-cyan-400"
                />

                <p className="mt-4 text-sm font-semibold text-white">
                  Loading customer details...
                </p>

                <p className="mt-2 text-xs text-slate-600">
                  Fetching accounts, cards and loans.
                </p>
              </div>
            ) : customerError ? (
              <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
                <AlertTriangle
                  size={28}
                  className="text-red-400"
                />

                <p className="mt-4 text-sm font-semibold text-red-400">
                  Unable to load customer
                </p>

                <p className="mt-2 max-w-sm text-xs leading-5 text-slate-600">
                  {customerError}
                </p>
              </div>
            ) : selectedCustomer ? (
              <>
                <div className="pr-10">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.07] text-sm font-bold text-cyan-400">
                      {getInitials(
                        selectedCustomer.name
                      )}
                    </div>

                    <div>
                      <p className="text-lg font-bold text-white">
                        {selectedCustomer.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-600">
                        {selectedCustomer.email}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-4">
                    <p className="text-[9px] uppercase tracking-wider text-slate-600">
                      Total Balance
                    </p>

                    <p className="mt-2 text-lg font-bold text-white">
                      {formatCurrency(
                        selectedCustomer.totalBalance
                      )}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-4">
                    <p className="text-[9px] uppercase tracking-wider text-slate-600">
                      Accounts
                    </p>

                    <p className="mt-2 text-lg font-bold text-white">
                      {selectedCustomer.accountCount ||
                        0}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-4">
                    <p className="text-[9px] uppercase tracking-wider text-slate-600">
                      Joined
                    </p>

                    <p className="mt-2 text-sm font-bold text-white">
                      {formatDate(
                        selectedCustomer.createdAt
                      )}
                    </p>
                  </div>
                </div>

                {/* CUSTOMER INFO */}

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="flex items-center gap-3 rounded-2xl border border-white/[0.05] bg-white/[0.02] p-4">
                    <Mail
                      size={16}
                      className="text-cyan-400"
                    />

                    <div>
                      <p className="text-[9px] uppercase tracking-wider text-slate-600">
                        Email
                      </p>

                      <p className="mt-1 break-all text-xs font-semibold text-slate-300">
                        {selectedCustomer.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl border border-white/[0.05] bg-white/[0.02] p-4">
                    <CalendarDays
                      size={16}
                      className="text-purple-400"
                    />

                    <div>
                      <p className="text-[9px] uppercase tracking-wider text-slate-600">
                        Customer Since
                      </p>

                      <p className="mt-1 text-xs font-semibold text-slate-300">
                        {formatDate(
                          selectedCustomer.createdAt
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* ACCOUNTS */}

                <div className="mt-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">
                        Banking
                      </p>

                      <h3 className="mt-1 text-sm font-bold text-white">
                        Accounts
                      </h3>
                    </div>

                    <span className="rounded-full bg-cyan-400/10 px-2.5 py-1 text-[9px] font-semibold text-cyan-400">
                      {selectedCustomer.accounts
                        ?.length || 0}
                    </span>
                  </div>

                  <div className="mt-4 space-y-3">
                    {selectedCustomer.accounts
                      ?.length ? (
                      selectedCustomer.accounts.map(
                        (account) => (
                          <div
                            key={account.id}
                            className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-4"
                          >
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                              <div>
                                <p className="text-xs font-semibold text-white">
                                  {account.accountType ||
                                    "Account"}
                                </p>

                                <p className="mt-1 text-[10px] text-slate-600">
                                  A/C{" "}
                                  {account.accountNumber ||
                                    "—"}
                                </p>
                              </div>

                              <div className="text-left sm:text-right">
                                <p className="text-sm font-bold text-white">
                                  {formatCurrency(
                                    account.balance
                                  )}
                                </p>

                                <span
                                  className={`mt-1 inline-flex rounded-full px-2 py-1 text-[9px] font-semibold ${
                                    String(
                                      account.status ||
                                        ""
                                    ).toUpperCase() ===
                                    "ACTIVE"
                                      ? "bg-emerald-400/10 text-emerald-400"
                                      : "bg-amber-400/10 text-amber-400"
                                  }`}
                                >
                                  {account.status ||
                                    "Unknown"}
                                </span>
                              </div>
                            </div>
                          </div>
                        )
                      )
                    ) : (
                      <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-6 text-center">
                        <WalletCards
                          size={20}
                          className="mx-auto text-slate-700"
                        />

                        <p className="mt-2 text-xs text-slate-600">
                          No accounts found.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* CARDS */}

                <div className="mt-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-400">
                        Cards
                      </p>

                      <h3 className="mt-1 text-sm font-bold text-white">
                        Customer Cards
                      </h3>
                    </div>

                    <span className="rounded-full bg-purple-400/10 px-2.5 py-1 text-[9px] font-semibold text-purple-400">
                      {selectedCustomer.cards
                        ?.length || 0}
                    </span>
                  </div>

                  <div className="mt-4 space-y-3">
                    {selectedCustomer.cards
                      ?.length ? (
                      selectedCustomer.cards.map(
                        (card) => (
                          <div
                            key={card.id}
                            className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-4"
                          >
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-400/10 text-purple-400">
                                  <CreditCard
                                    size={17}
                                  />
                                </div>

                                <div>
                                  <p className="text-xs font-semibold text-white">
                                    {card.type ||
                                      "Card"}
                                  </p>

                                  <p className="mt-1 text-[10px] text-slate-600">
                                    {card.number ||
                                      "Card number unavailable"}
                                  </p>
                                </div>
                              </div>

                              <span
                                className={`rounded-full px-2 py-1 text-[9px] font-semibold ${
                                  card.frozen
                                    ? "bg-red-400/10 text-red-400"
                                    : "bg-emerald-400/10 text-emerald-400"
                                }`}
                              >
                                {card.frozen
                                  ? "Frozen"
                                  : "Active"}
                              </span>
                            </div>
                          </div>
                        )
                      )
                    ) : (
                      <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-6 text-center">
                        <CreditCard
                          size={20}
                          className="mx-auto text-slate-700"
                        />

                        <p className="mt-2 text-xs text-slate-600">
                          No cards found.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* LOANS */}

                <div className="mt-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400">
                        Lending
                      </p>

                      <h3 className="mt-1 text-sm font-bold text-white">
                        Customer Loans
                      </h3>
                    </div>

                    <span className="rounded-full bg-blue-400/10 px-2.5 py-1 text-[9px] font-semibold text-blue-400">
                      {selectedCustomer.loans
                        ?.length || 0}
                    </span>
                  </div>

                  <div className="mt-4 space-y-3">
                    {selectedCustomer.loans
                      ?.length ? (
                      selectedCustomer.loans.map(
                        (loan) => (
                          <div
                            key={loan.id}
                            className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-4"
                          >
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                              <div>
                                <p className="text-xs font-semibold text-white">
                                  {loan.loanType ||
                                    "Loan"}
                                </p>

                                <p className="mt-1 text-[10px] text-slate-600">
                                  Principal:{" "}
                                  {formatCurrency(
                                    loan.principalAmount
                                  )}
                                </p>
                              </div>

                              <div className="text-left sm:text-right">
                                <p className="text-sm font-bold text-white">
                                  {formatCurrency(
                                    loan.remainingAmount
                                  )}
                                </p>

                                <p className="mt-1 text-[9px] text-slate-600">
                                  remaining
                                </p>
                              </div>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-3">
                              <div className="rounded-xl bg-white/[0.025] p-3">
                                <p className="text-[9px] uppercase tracking-wider text-slate-600">
                                  EMI
                                </p>

                                <p className="mt-1 text-xs font-semibold text-slate-300">
                                  {formatCurrency(
                                    loan.monthlyEmi
                                  )}
                                </p>
                              </div>

                              <div className="rounded-xl bg-white/[0.025] p-3">
                                <p className="text-[9px] uppercase tracking-wider text-slate-600">
                                  Status
                                </p>

                                <p className="mt-1 text-xs font-semibold text-slate-300">
                                  {loan.status ||
                                    "Unknown"}
                                </p>
                              </div>
                            </div>
                          </div>
                        )
                      )
                    ) : (
                      <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-6 text-center">
                        <Landmark
                          size={20}
                          className="mx-auto text-slate-700"
                        />

                        <p className="mt-2 text-xs text-slate-600">
                          No loans found.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : null}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Admin;
