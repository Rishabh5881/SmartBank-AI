import {
  LogOut,
  User,
  Mail,
  Phone,
  ShieldCheck,
  ChevronRight,
  LockKeyhole,
  CreditCard,
  Activity,
  Sparkles,
  CheckCircle2,
  Pencil,
  Save,
  X,
  RefreshCw,
  Shield,
  Smartphone,
  AlertTriangle,
  CircleCheck,
  Gauge,
  MonitorCheck,
} from "lucide-react";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import api from "../services/api";

const Profile = () => {
  // =========================================================
  // PROFILE STATE
  // =========================================================

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");

  // =========================================================
  // SECURITY STATE
  // =========================================================

  const [security, setSecurity] = useState(null);
  const [securityLoading, setSecurityLoading] = useState(true);
  const [securityError, setSecurityError] = useState("");
  const [refreshingSecurity, setRefreshingSecurity] = useState(false);

  // =========================================================
  // FORM
  // =========================================================

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
  });

  // =========================================================
  // FETCH PROFILE
  // =========================================================

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await api.get("/users/profile");
      const user = response?.data?.data;

      if (!user) {
        throw new Error("Profile data unavailable");
      }

      setProfile(user);

      setFormData({
        name: user.name || "",
        phoneNumber: user.phoneNumber || "",
      });

      const storedUser = localStorage.getItem("user");

      let existingUser = {};

      try {
        existingUser = storedUser ? JSON.parse(storedUser) : {};
      } catch {
        existingUser = {};
      }

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...existingUser,
          ...user,
        })
      );

      window.dispatchEvent(new Event("userUpdated"));
    } catch (err) {
      console.error("PROFILE FETCH ERROR:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to load profile"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // FETCH SECURITY
  // =========================================================

  const fetchSecurity = async (showRefreshLoader = false) => {
    try {
      if (showRefreshLoader) {
        setRefreshingSecurity(true);
      } else {
        setSecurityLoading(true);
      }

      setSecurityError("");

      const response = await api.get("/users/security");
      const securityData = response?.data?.data;

      if (!securityData) {
        throw new Error("Security data unavailable");
      }

      setSecurity(securityData);
    } catch (err) {
      console.error("SECURITY FETCH ERROR:", err);

      setSecurityError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to load security status"
      );
    } finally {
      setSecurityLoading(false);
      setRefreshingSecurity(false);
    }
  };

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    fetchProfile();
    fetchSecurity();
  }, []);

  // =========================================================
  // FORM CHANGE
  // =========================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =========================================================
  // EDIT
  // =========================================================

  const startEditing = () => {
    setSuccess("");
    setError("");

    setFormData({
      name: profile?.name || "",
      phoneNumber: profile?.phoneNumber || "",
    });

    setEditing(true);
  };

  const cancelEditing = () => {
    setFormData({
      name: profile?.name || "",
      phoneNumber: profile?.phoneNumber || "",
    });

    setEditing(false);
    setError("");
  };

  // =========================================================
  // SAVE
  // =========================================================

  const saveProfile = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const response = await api.put("/users/profile", {
        name: formData.name.trim(),
        phoneNumber: formData.phoneNumber.trim() || null,
      });

      const updatedUser = response?.data?.data;

      if (!updatedUser) {
        throw new Error("Updated profile data unavailable");
      }

      setProfile(updatedUser);

      setFormData({
        name: updatedUser.name || "",
        phoneNumber: updatedUser.phoneNumber || "",
      });

      const storedUser = localStorage.getItem("user");

      let existingUser = {};

      try {
        existingUser = storedUser ? JSON.parse(storedUser) : {};
      } catch {
        existingUser = {};
      }

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...existingUser,
          ...updatedUser,
        })
      );

      window.dispatchEvent(new Event("userUpdated"));

      setEditing(false);
      setSuccess("Profile updated successfully.");

      setTimeout(() => {
        setSuccess("");
      }, 3500);
    } catch (err) {
      console.error("PROFILE UPDATE ERROR:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to update profile"
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // LOGOUT
  // =========================================================

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    window.dispatchEvent(new Event("userUpdated"));

    window.location.href = "/";
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050914] px-4 pb-20 pt-28 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1450px] space-y-6">
          <div className="h-12 w-48 animate-pulse rounded-xl bg-white/[0.04]" />

          <div className="h-[280px] animate-pulse rounded-[2rem] border border-white/[0.06] bg-white/[0.025]" />

          <div className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
            <div className="h-[350px] animate-pulse rounded-[2rem] bg-white/[0.025]" />
            <div className="h-[350px] animate-pulse rounded-[2rem] bg-white/[0.025]" />
          </div>

          <div className="h-[520px] animate-pulse rounded-[2rem] bg-white/[0.025]" />
        </div>
      </main>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (error && !profile) {
    return (
      <main className="min-h-screen bg-[#050914] px-4 pb-20 pt-32 sm:px-6">
        <div className="mx-auto max-w-xl rounded-[2rem] border border-red-400/10 bg-white/[0.025] p-8 text-center backdrop-blur-xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-400/[0.08] text-red-400">
            <AlertTriangle size={24} />
          </div>

          <h2 className="mt-5 text-xl font-bold text-white">
            Unable to load profile
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {error}
          </p>

          <button
            type="button"
            onClick={fetchProfile}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-cyan-400/[0.08] px-5 py-3 text-xs font-bold text-cyan-400 transition hover:bg-cyan-400/[0.14]"
          >
            <RefreshCw size={14} />
            Try Again
          </button>
        </div>
      </main>
    );
  }

  // =========================================================
  // DATA
  // =========================================================

  const userName = profile?.name || "User";
  const userEmail = profile?.email || "No email available";
  const userRole = profile?.role || "CUSTOMER";
  const userPhone = profile?.phoneNumber || "Not added";

  const avatar = userName
    .split(" ")
    .filter(Boolean)
    .map((name) => name.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const securityScore = security?.securityScore?.score ?? 0;

  const securityLevel =
    security?.securityScore?.level || "Unknown";

  const activeSessions = security?.sessions?.active ?? 0;
  const totalSessions = security?.sessions?.total ?? 0;

  const authentication = security?.authentication || {};
  const accountSecurity = security?.accountSecurity || {};
  const bankingActivity = security?.bankingActivity || {};
  const recommendations = security?.recommendations || [];

  const getScoreLabel = (score) => {
    if (score >= 90) return "Excellent";
    if (score >= 75) return "Strong";
    if (score >= 60) return "Good";
    if (score >= 40) return "Moderate";
    return "Needs Attention";
  };

  const information = [
    {
      label: "Full Name",
      value: userName,
      icon: User,
    },
    {
      label: "Email Address",
      value: userEmail,
      icon: Mail,
    },
    {
      label: "Phone Number",
      value: userPhone,
      icon: Phone,
    },
    {
      label: "Account Role",
      value: userRole,
      icon: ShieldCheck,
    },
  ];

  const securityCards = [
    {
      title: "Account Security",
      description:
        accountSecurity.description ||
        "Your account is protected.",
      status: accountSecurity.status || "Protected",
      icon: Shield,
      protected: accountSecurity.protected,
    },
    {
      title: "Authentication",
      description:
        authentication.description ||
        "Secure login protection status.",
      status: authentication.status || "Secure",
      icon: LockKeyhole,
      protected:
        authentication.passwordEnabled ||
        authentication.googleLoginEnabled,
    },
    {
      title: "Banking Activity",
      description:
        bankingActivity.description ||
        "Banking activity is monitored.",
      status: bankingActivity.status || "Monitored",
      icon: Activity,
      protected: bankingActivity.monitored,
    },
  ];

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050914] text-white">
      {/* =====================================================
          AMBIENT LUXURY BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-64 top-0 h-[650px] w-[650px] rounded-full bg-blue-600/[0.07] blur-[170px]" />

        <div className="absolute right-[-250px] top-[250px] h-[650px] w-[650px] rounded-full bg-cyan-500/[0.055] blur-[180px]" />

        <div className="absolute left-[35%] top-[900px] h-[500px] w-[500px] rounded-full bg-indigo-600/[0.035] blur-[170px]" />
      </div>

      <main className="relative z-10 mx-auto max-w-[1450px] px-4 pb-28 pt-28 sm:px-6 lg:px-10 xl:px-12">
        {/* =====================================================
            PAGE HEADER
        ===================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-7"
        >
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/60" />

            <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-cyan-400">
              Private Banking
            </span>
          </div>

          <div className="mt-3 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
                Profile & Security
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-500">
                Your personal identity, banking access and
                security controls — managed in one place.
              </p>
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/10 bg-emerald-400/[0.05] px-4 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50" />

              <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-emerald-400">
                Account Active
              </span>
            </div>
          </div>
        </motion.div>

        {/* =====================================================
            ALERTS
        ===================================================== */}

        {success && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 flex items-center gap-3 rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.05] px-4 py-3 text-xs font-medium text-emerald-400"
          >
            <CheckCircle2 size={16} />
            {success}
          </motion.div>
        )}

        {error && profile && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 flex items-center justify-between gap-4 rounded-2xl border border-red-400/10 bg-red-400/[0.05] px-4 py-3 text-xs text-red-400"
          >
            <span>{error}</span>

            <button
              type="button"
              onClick={() => setError("")}
              className="font-bold"
            >
              Dismiss
            </button>
          </motion.div>
        )}

        {/* =====================================================
            PREMIUM PROFILE HERO
        ===================================================== */}

        <motion.section
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2rem] border border-white/[0.09] bg-gradient-to-br from-blue-600/[0.12] via-white/[0.025] to-cyan-400/[0.06] p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-8 lg:p-10"
        >
          <div className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full bg-cyan-400/[0.08] blur-[110px]" />

          <div className="pointer-events-none absolute bottom-[-150px] left-[25%] h-72 w-72 rounded-full bg-blue-500/[0.06] blur-[110px]" />

          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              {/* AVATAR */}

              <div className="relative w-fit shrink-0">
                <div className="flex h-24 w-24 items-center justify-center rounded-[1.8rem] border border-cyan-400/20 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 text-3xl font-black text-white shadow-2xl shadow-blue-500/20 sm:h-28 sm:w-28 sm:text-4xl">
                  {avatar}
                </div>

                <div className="absolute -bottom-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full border-[3px] border-[#08101d] bg-emerald-400">
                  <CheckCircle2
                    size={13}
                    className="text-slate-950"
                    strokeWidth={3}
                  />
                </div>
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-blue-400/10 bg-blue-400/[0.07] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-blue-300">
                    {userRole}
                  </span>

                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/10 bg-emerald-400/[0.05] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-emerald-400">
                    <ShieldCheck size={11} />
                    Protected
                  </span>
                </div>

                <h2 className="mt-3 truncate text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl">
                  {userName}
                </h2>

                <p className="mt-1 truncate text-sm text-slate-500">
                  {userEmail}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <div className="inline-flex items-center gap-2 rounded-xl border border-white/[0.07] bg-black/20 px-3 py-2">
                    <CreditCard
                      size={13}
                      className="text-cyan-400"
                    />

                    <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-500">
                      Digital Banking
                    </span>

                    <span className="text-[9px] font-bold text-emerald-400">
                      Enabled
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-2 rounded-xl border border-white/[0.07] bg-black/20 px-3 py-2">
                    <Activity
                      size={13}
                      className="text-blue-400"
                    />

                    <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-500">
                      Monitoring
                    </span>

                    <span className="text-[9px] font-bold text-cyan-400">
                      Live
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* SECURITY MINI PANEL */}

            <div className="relative min-w-[260px] rounded-[1.5rem] border border-white/[0.07] bg-black/20 p-5 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles
                    size={14}
                    className="text-cyan-400"
                  />

                  <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500">
                    SmartBank AI
                  </span>
                </div>

                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/60" />
              </div>

              <p className="mt-4 text-sm font-bold text-white">
                Security monitoring active
              </p>

              <p className="mt-1 text-[10px] leading-5 text-slate-600">
                Your account activity is continuously
                evaluated for protection.
              </p>

              <div className="mt-4 h-px bg-white/[0.06]" />

              <div className="mt-4 flex items-center justify-between">
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-600">
                  Protection
                </span>

                <span className="text-[10px] font-bold text-emerald-400">
                  ACTIVE
                </span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* =====================================================
            PERSONAL + ACCOUNT
        ===================================================== */}

        <section className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
          {/* PERSONAL */}

          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="rounded-[2rem] border border-white/[0.08] bg-white/[0.025] p-5 shadow-xl shadow-black/10 backdrop-blur-xl sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />

                  <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-cyan-400">
                    Identity
                  </span>
                </div>

                <h2 className="mt-2 text-xl font-bold text-white">
                  Personal Information
                </h2>

                <p className="mt-1 text-xs text-slate-600">
                  Your registered account details.
                </p>
              </div>

              <button
                type="button"
                onClick={
                  editing ? cancelEditing : startEditing
                }
                className="inline-flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-[10px] font-bold text-slate-300 transition hover:border-cyan-400/20 hover:text-cyan-400"
              >
                {editing ? (
                  <>
                    <X size={13} />
                    Cancel
                  </>
                ) : (
                  <>
                    <Pencil size={13} />
                    Edit
                  </>
                )}
              </button>
            </div>

            {editing ? (
              <form
                onSubmit={saveProfile}
                className="mt-7 space-y-4"
              >
                <div>
                  <label className="mb-2 block text-[9px] font-bold uppercase tracking-[0.16em] text-slate-600">
                    Full Name
                  </label>

                  <div className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-black/20 px-4">
                    <User
                      size={16}
                      className="text-cyan-400"
                    />

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={saving}
                      className="w-full bg-transparent py-4 text-sm font-semibold text-white outline-none placeholder:text-slate-700"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-[9px] font-bold uppercase tracking-[0.16em] text-slate-600">
                    Email Address
                  </label>

                  <div className="flex items-center gap-3 rounded-2xl border border-white/[0.05] bg-white/[0.015] px-4">
                    <Mail
                      size={16}
                      className="text-slate-700"
                    />

                    <div className="py-4 text-sm font-semibold text-slate-500">
                      {userEmail}
                    </div>
                  </div>

                  <p className="mt-2 text-[9px] text-slate-700">
                    Email changes are not supported
                    through profile editing.
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-[9px] font-bold uppercase tracking-[0.16em] text-slate-600">
                    Phone Number
                  </label>

                  <div className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-black/20 px-4">
                    <Phone
                      size={16}
                      className="text-cyan-400"
                    />

                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      disabled={saving}
                      className="w-full bg-transparent py-4 text-sm font-semibold text-white outline-none placeholder:text-slate-700"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-cyan-400/[0.08] px-5 py-3 text-[10px] font-bold text-cyan-400 transition hover:bg-cyan-400/[0.14] disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <RefreshCw
                        size={13}
                        className="animate-spin"
                      />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={13} />
                      Save Changes
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {information.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.label}
                      initial={{
                        opacity: 0,
                        y: 8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: 0.15 + index * 0.05,
                      }}
                      className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition hover:border-cyan-400/10 hover:bg-white/[0.035]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.05] text-cyan-400">
                          <Icon size={16} />
                        </div>

                        <div className="min-w-0">
                          <p className="text-[8px] font-bold uppercase tracking-[0.17em] text-slate-700">
                            {item.label}
                          </p>

                          <p className="mt-1 truncate text-sm font-semibold text-slate-200">
                            {item.value}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.section>

          {/* ACCOUNT OVERVIEW */}

          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="rounded-[2rem] border border-white/[0.08] bg-white/[0.025] p-5 shadow-xl shadow-black/10 backdrop-blur-xl sm:p-7"
          >
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

              <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-emerald-400">
                Account Status
              </span>
            </div>

            <h2 className="mt-2 text-xl font-bold text-white">
              Account Overview
            </h2>

            <div className="mt-6 space-y-3">
              {[
                {
                  icon: ShieldCheck,
                  title: "Account Status",
                  sub: "Current account state",
                  value: "Active",
                  cls: "emerald",
                },
                {
                  icon: CreditCard,
                  title: "Banking Access",
                  sub: "Digital banking services",
                  value: "Enabled",
                  cls: "blue",
                },
                {
                  icon: Activity,
                  title: "Activity Monitoring",
                  sub: "Security monitoring",
                  value: "Live",
                  cls: "cyan",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                          item.cls === "emerald"
                            ? "bg-emerald-400/[0.06] text-emerald-400"
                            : item.cls === "blue"
                              ? "bg-blue-400/[0.06] text-blue-400"
                              : "bg-cyan-400/[0.06] text-cyan-400"
                        }`}
                      >
                        <Icon size={15} />
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-slate-300">
                          {item.title}
                        </p>

                        <p className="mt-0.5 text-[9px] text-slate-700">
                          {item.sub}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`text-[9px] font-bold uppercase tracking-wider ${
                        item.cls === "emerald"
                          ? "text-emerald-400"
                          : item.cls === "blue"
                            ? "text-blue-400"
                            : "text-cyan-400"
                      }`}
                    >
                      {item.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.section>
        </section>

        {/* =====================================================
            SECURITY CENTER
        ===================================================== */}

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
          className="relative mt-6 overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.025] p-5 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-7 lg:p-8"
        >
          <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-emerald-400/[0.035] blur-[140px]" />

          {/* HEADER */}

          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/60" />

                <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-emerald-400">
                  Protection Center
                </span>
              </div>

              <h2 className="mt-2 text-2xl font-black tracking-tight text-white">
                Security & Protection
              </h2>

              <p className="mt-1 max-w-xl text-xs leading-6 text-slate-600">
                SmartBank AI continuously monitors your
                account security and banking activity.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/10 bg-emerald-400/[0.05] px-3 py-1.5 text-[8px] font-bold uppercase tracking-wider text-emerald-400">
                <ShieldCheck size={11} />
                Secure
              </div>

              <button
                type="button"
                onClick={() => fetchSecurity(true)}
                disabled={refreshingSecurity}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.07] bg-white/[0.025] text-slate-600 transition hover:border-cyan-400/20 hover:text-cyan-400 disabled:opacity-50"
                title="Refresh security"
              >
                <RefreshCw
                  size={12}
                  className={
                    refreshingSecurity
                      ? "animate-spin"
                      : ""
                  }
                />
              </button>
            </div>
          </div>

          {/* SECURITY ERROR */}

          {securityError && (
            <div className="mt-5 flex items-center justify-between gap-3 rounded-2xl border border-red-400/10 bg-red-400/[0.04] px-4 py-3 text-xs text-red-400">
              <span>{securityError}</span>

              <button
                type="button"
                onClick={() => fetchSecurity(true)}
                className="font-bold underline underline-offset-4"
              >
                Retry
              </button>
            </div>
          )}

          {/* ===================================================
              SCORE + METRICS
          =================================================== */}

          {securityLoading ? (
            <div className="mt-7 grid gap-4 lg:grid-cols-[1fr_1.5fr]">
              <div className="h-64 animate-pulse rounded-[1.7rem] bg-white/[0.025]" />

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="h-64 animate-pulse rounded-[1.7rem] bg-white/[0.025]" />

                <div className="h-64 animate-pulse rounded-[1.7rem] bg-white/[0.025]" />
              </div>
            </div>
          ) : security ? (
            <>
              <div className="relative mt-7 grid gap-4 lg:grid-cols-[1fr_1.5fr]">
                {/* SCORE */}

                <div className="relative overflow-hidden rounded-[1.8rem] border border-emerald-400/10 bg-gradient-to-br from-emerald-400/[0.09] via-white/[0.025] to-transparent p-6 sm:p-7">
                  <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-emerald-400/[0.08] blur-[80px]" />

                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Gauge
                          size={15}
                          className="text-emerald-400"
                        />

                        <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-emerald-400">
                          Security Score
                        </span>
                      </div>

                      <span className="rounded-full border border-emerald-400/10 bg-emerald-400/[0.06] px-2.5 py-1 text-[8px] font-bold uppercase tracking-wider text-emerald-400">
                        {securityLevel}
                      </span>
                    </div>

                    <div className="mt-8 flex items-end gap-2">
                      <span className="text-6xl font-black tracking-[-0.06em] text-white">
                        {securityScore}
                      </span>

                      <span className="mb-2 text-sm font-semibold text-slate-700">
                        / 100
                      </span>
                    </div>

                    <p className="mt-1 text-xs font-medium text-slate-500">
                      {getScoreLabel(securityScore)} protection level
                    </p>

                    <div className="mt-7 h-2 overflow-hidden rounded-full bg-white/[0.06]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${Math.min(
                            securityScore,
                            100
                          )}%`,
                        }}
                        transition={{
                          duration: 1.1,
                          ease: "easeOut",
                        }}
                        className="h-full rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/30"
                      />
                    </div>

                    <div className="mt-2 flex justify-between text-[7px] font-bold uppercase tracking-wider text-slate-700">
                      <span>Needs Attention</span>
                      <span>Excellent</span>
                    </div>
                  </div>
                </div>

                {/* METRICS */}

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[1.8rem] border border-white/[0.06] bg-white/[0.02] p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-400/10 bg-emerald-400/[0.06] text-emerald-400">
                        <Shield size={17} />
                      </div>

                      <CircleCheck
                        size={15}
                        className="text-emerald-400"
                      />
                    </div>

                    <p className="mt-6 text-[8px] font-bold uppercase tracking-[0.17em] text-slate-700">
                      Account Security
                    </p>

                    <h3 className="mt-1 text-xl font-bold text-white">
                      {accountSecurity.status ||
                        "Protected"}
                    </h3>

                    <p className="mt-1 text-[10px] leading-5 text-slate-600">
                      {accountSecurity.description ||
                        "Your account is protected."}
                    </p>
                  </div>

                  <div className="rounded-[1.8rem] border border-white/[0.06] bg-white/[0.02] p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.06] text-cyan-400">
                        <MonitorCheck size={17} />
                      </div>

                      <CircleCheck
                        size={15}
                        className="text-cyan-400"
                      />
                    </div>

                    <p className="mt-6 text-[8px] font-bold uppercase tracking-[0.17em] text-slate-700">
                      Active Sessions
                    </p>

                    <h3 className="mt-1 text-xl font-bold text-white">
                      {activeSessions}
                      <span className="ml-1 text-sm text-slate-700">
                        / {totalSessions}
                      </span>
                    </h3>

                    <p className="mt-1 text-[10px] leading-5 text-slate-600">
                      Currently active account sessions.
                    </p>
                  </div>
                </div>
              </div>

              {/* =================================================
                  SECURITY DETAIL CARDS
              ================================================= */}

              <div className="mt-4 grid gap-3 lg:grid-cols-3">
                {securityCards.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.title}
                      initial={{
                        opacity: 0,
                        y: 12,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: 0.1 + index * 0.08,
                      }}
                      whileHover={{ y: -3 }}
                      className="group rounded-[1.7rem] border border-white/[0.06] bg-white/[0.02] p-5 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.035]"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.05] text-cyan-400">
                          <Icon size={17} />
                        </div>

                        <span
                          className={`rounded-full border px-2.5 py-1 text-[8px] font-bold uppercase tracking-wider ${
                            item.protected
                              ? "border-emerald-400/10 bg-emerald-400/[0.05] text-emerald-400"
                              : "border-amber-400/10 bg-amber-400/[0.05] text-amber-400"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>

                      <h3 className="mt-5 text-sm font-bold text-white">
                        {item.title}
                      </h3>

                      <p className="mt-1 min-h-[40px] text-xs leading-5 text-slate-600">
                        {item.description}
                      </p>

                      <div className="mt-4 flex items-center justify-between border-t border-white/[0.05] pt-4">
                        <span className="text-[8px] font-semibold uppercase tracking-wider text-slate-700">
                          Security details
                        </span>

                        <ChevronRight
                          size={13}
                          className="text-slate-700 transition group-hover:translate-x-1 group-hover:text-cyan-400"
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* =================================================
                  AUTHENTICATION
              ================================================= */}

              <div className="mt-4 grid gap-3 lg:grid-cols-3">
                {[
                  {
                    icon: LockKeyhole,
                    label: "Login Method",
                    value:
                      authentication.method ||
                      "Password",
                    cls: "cyan",
                  },
                  {
                    icon: Smartphone,
                    label: "Phone Security",
                    value:
                      authentication.phoneNumberAdded
                        ? "Added"
                        : "Not Added",
                    cls: "blue",
                  },
                  {
                    icon: ShieldCheck,
                    label: "Banking Activity",
                    value:
                      bankingActivity.monitored
                        ? "Continuously Monitored"
                        : "Monitoring Unavailable",
                    cls: "emerald",
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="rounded-[1.5rem] border border-white/[0.06] bg-black/10 p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                            item.cls === "cyan"
                              ? "bg-cyan-400/[0.06] text-cyan-400"
                              : item.cls === "blue"
                                ? "bg-blue-400/[0.06] text-blue-400"
                                : "bg-emerald-400/[0.06] text-emerald-400"
                          }`}
                        >
                          <Icon size={15} />
                        </div>

                        <div className="min-w-0">
                          <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-slate-700">
                            {item.label}
                          </p>

                          <p className="mt-1 truncate text-xs font-bold text-slate-300">
                            {item.value}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* =================================================
                  AI RECOMMENDATION
              ================================================= */}

              {recommendations.length > 0 && (
                <div className="mt-4 rounded-[1.7rem] border border-amber-400/10 bg-gradient-to-br from-amber-400/[0.045] to-transparent p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-400/10 bg-amber-400/[0.06] text-amber-400">
                      <Sparkles size={16} />
                    </div>

                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-amber-400">
                        SmartBank AI Insight
                      </p>

                      <div className="mt-2 space-y-2">
                        {recommendations.map(
                          (recommendation, index) => (
                            <p
                              key={index}
                              className="text-xs leading-5 text-slate-500"
                            >
                              {recommendation}
                            </p>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : null}
        </motion.section>

        {/* =====================================================
            LOGOUT
        ===================================================== */}

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 rounded-[2rem] border border-red-400/[0.08] bg-red-400/[0.02] p-5 sm:p-6"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <LogOut
                  size={15}
                  className="text-red-400"
                />

                <p className="text-sm font-semibold text-slate-300">
                  Sign out of SmartBank AI
                </p>
              </div>

              <p className="mt-1 text-xs leading-5 text-slate-700">
                End your current SmartBank session securely.
              </p>
            </div>

            <button
              type="button"
              onClick={logout}
              className="group inline-flex items-center justify-center gap-2 rounded-xl border border-red-400/10 bg-red-500/[0.06] px-5 py-3 text-[10px] font-bold text-red-400 transition-all hover:border-red-400/20 hover:bg-red-500/[0.1]"
            >
              <LogOut
                size={14}
                className="transition-transform group-hover:-translate-x-0.5"
              />
              Logout
            </button>
          </div>
        </motion.section>

        {/* =====================================================
            FOOTER
        ===================================================== */}

        <div className="mt-8 flex items-center justify-center gap-2">
          <ShieldCheck
            size={12}
            className="text-emerald-400"
          />

          <p className="text-center text-[8px] font-medium uppercase tracking-[0.18em] text-slate-700">
            Your banking experience is protected by SmartBank AI
          </p>
        </div>
      </main>
    </div>
  );
};

export default Profile;