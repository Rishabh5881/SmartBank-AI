import {
  LogOut,
  User,
  Mail,
  Phone,
  ShieldCheck,
  ChevronRight,
  Settings,
  LockKeyhole,
  CreditCard,
  Activity,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";

const Profile = () => {
  const storedUser = localStorage.getItem("user");

  let user = null;

  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("PROFILE USER ERROR:", error);
  }

  // ==========================================
  // USER DATA
  // ==========================================

  const userName =
    user?.name ||
    user?.fullName ||
    user?.username ||
    "User";

  const userEmail =
    user?.email ||
    "No email available";

  const userRole =
    user?.role ||
    "CUSTOMER";

  const userPhone =
    user?.phone ||
    user?.mobile ||
    "Not added";

  const avatar = userName
    .split(" ")
    .filter(Boolean)
    .map((name) => name.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // ==========================================
  // LOGOUT
  // ==========================================

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    window.dispatchEvent(new Event("userUpdated"));

    window.location.href = "/";
  };

  // ==========================================
  // PROFILE INFORMATION
  // ==========================================

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

  // ==========================================
  // SECURITY ITEMS
  // ==========================================

  const securityItems = [
    {
      title: "Account Security",
      description: "Your account is protected",
      icon: ShieldCheck,
      status: "Active",
      statusClass:
        "border-emerald-400/10 bg-emerald-400/[0.07] text-emerald-400",
      iconClass:
        "border-emerald-400/10 bg-emerald-400/[0.07] text-emerald-400",
    },
    {
      title: "Authentication",
      description: "Secure login protection enabled",
      icon: LockKeyhole,
      status: "Protected",
      statusClass:
        "border-cyan-400/10 bg-cyan-400/[0.07] text-cyan-400",
      iconClass:
        "border-cyan-400/10 bg-cyan-400/[0.07] text-cyan-400",
    },
    {
      title: "Banking Activity",
      description: "Transactions monitored continuously",
      icon: Activity,
      status: "Monitoring",
      statusClass:
        "border-blue-400/10 bg-blue-400/[0.07] text-blue-400",
      iconClass:
        "border-blue-400/10 bg-blue-400/[0.07] text-blue-400",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
      {/* ==========================================
          PREMIUM BACKGROUND
      ========================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-48 top-24 h-[500px] w-[500px] rounded-full bg-blue-600/[0.08] blur-[150px]" />

        <div className="absolute right-[-180px] top-[350px] h-[520px] w-[520px] rounded-full bg-cyan-500/[0.07] blur-[160px]" />

        <div className="absolute left-[30%] top-[900px] h-[420px] w-[420px] rounded-full bg-indigo-600/[0.05] blur-[150px]" />

        <div className="absolute bottom-[-180px] right-[15%] h-[400px] w-[400px] rounded-full bg-emerald-500/[0.035] blur-[150px]" />
      </div>

      {/* ==========================================
          MAIN
      ========================================== */}

      <main className="relative z-10 mx-auto max-w-[1400px] px-4 pb-24 pt-28 sm:px-6 lg:px-10 xl:px-12">
        {/* ==========================================
            PAGE HEADER
        ========================================== */}

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
            ease: "easeOut",
          }}
          className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.025] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8 lg:p-10"
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/[0.07] blur-[100px]" />

          <div className="pointer-events-none absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-blue-500/[0.05] blur-[90px]" />

          <div className="relative">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/60" />

              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-cyan-400">
                Account Center
              </p>
            </div>

            <div className="mt-3 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-[-0.03em] text-white sm:text-4xl">
                  My Profile
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
                  Manage your personal information, account security,
                  and SmartBank AI profile settings.
                </p>
              </div>

              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/10 bg-emerald-400/[0.06] px-3.5 py-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/60" />

                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-400">
                  Account Active
                </span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ==========================================
            PROFILE HERO
        ========================================== */}

        <motion.section
          initial={{
            opacity: 0,
            y: 22,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.55,
            delay: 0.08,
          }}
          className="relative mt-6 overflow-hidden rounded-[2rem] border border-white/[0.08] bg-gradient-to-br from-blue-600/[0.12] via-white/[0.025] to-cyan-500/[0.07] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8"
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-400/[0.08] blur-[90px]" />

          <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-blue-600/[0.07] blur-[100px]" />

          <div className="relative flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-5">
              {/* Avatar */}

              <div className="relative shrink-0">
                <div className="flex h-20 w-20 items-center justify-center rounded-[1.6rem] border border-cyan-400/20 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 text-2xl font-extrabold tracking-tight text-white shadow-xl shadow-blue-500/20 sm:h-24 sm:w-24 sm:text-3xl">
                  {avatar}
                </div>

                <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-4 border-[#07101f] bg-emerald-400">
                  <CheckCircle2
                    size={11}
                    className="text-slate-950"
                    strokeWidth={3}
                  />
                </span>
              </div>

              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">
                  SmartBank Member
                </p>

                <h2 className="mt-1 truncate text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  {userName}
                </h2>

                <p className="mt-1 truncate text-sm text-slate-500">
                  {userEmail}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-blue-400/10 bg-blue-400/[0.07] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-blue-300">
                    {userRole}
                  </span>

                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/10 bg-emerald-400/[0.06] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-400">
                    <ShieldCheck size={11} />
                    Verified
                  </span>
                </div>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-white/[0.07] bg-black/20 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.07]">
                <Sparkles
                  size={18}
                  className="text-cyan-400"
                />
              </div>

              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-600">
                  SmartBank AI
                </p>

                <p className="mt-1 text-xs font-semibold text-slate-300">
                  Profile Protected
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ==========================================
            PROFILE CONTENT
        ========================================== */}

        <section className="mt-8 grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
          {/* ==========================================
              PERSONAL INFORMATION
          ========================================== */}

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
              duration: 0.5,
              delay: 0.14,
            }}
            className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.025] p-5 shadow-xl shadow-black/10 backdrop-blur-xl sm:p-7"
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-blue-500/[0.05] blur-[80px]" />

            <div className="relative flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />

                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-400">
                    Personal Details
                  </p>
                </div>

                <h2 className="mt-2 text-xl font-bold tracking-tight text-white sm:text-2xl">
                  Personal Information
                </h2>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Your registered SmartBank account information.
                </p>
              </div>

              <div className="hidden h-10 w-10 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.025] sm:flex">
                <User
                  size={17}
                  className="text-slate-500"
                />
              </div>
            </div>

            <div className="relative mt-7 grid gap-3 sm:grid-cols-2">
              {information.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.label}
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.2 + index * 0.05,
                      duration: 0.35,
                    }}
                    className="group rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4 transition-all duration-300 hover:border-cyan-400/10 hover:bg-white/[0.04]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.06] text-cyan-400">
                        <Icon size={17} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-600">
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
          </motion.section>

          {/* ==========================================
              ACCOUNT SUMMARY
          ========================================== */}

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
              duration: 0.5,
              delay: 0.18,
            }}
            className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.025] p-5 shadow-xl shadow-black/10 backdrop-blur-xl sm:p-7"
          >
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-cyan-400/[0.06] blur-[80px]" />

            <div className="relative">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />

                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-400">
                  Account Status
                </p>
              </div>

              <h2 className="mt-2 text-xl font-bold tracking-tight text-white">
                Account Overview
              </h2>

              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/[0.07] text-emerald-400">
                      <ShieldCheck size={16} />
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-slate-300">
                        Account Status
                      </p>

                      <p className="mt-0.5 text-[10px] text-slate-600">
                        Current account state
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                    Active
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-400/[0.07] text-blue-400">
                      <CreditCard size={16} />
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-slate-300">
                        Banking Access
                      </p>

                      <p className="mt-0.5 text-[10px] text-slate-600">
                        Digital banking services
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
                    Enabled
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400/[0.07] text-cyan-400">
                      <Activity size={16} />
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-slate-300">
                        Activity Monitoring
                      </p>

                      <p className="mt-0.5 text-[10px] text-slate-600">
                        SmartBank security monitoring
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                    Live
                  </span>
                </div>
              </div>
            </div>
          </motion.section>
        </section>

        {/* ==========================================
            SECURITY
        ========================================== */}

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
            duration: 0.5,
            delay: 0.22,
          }}
          className="mt-6 relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.025] p-5 shadow-xl shadow-black/10 backdrop-blur-xl sm:p-7"
        >
          <div className="pointer-events-none absolute right-0 top-0 h-52 w-52 rounded-full bg-emerald-400/[0.05] blur-[90px]" />

          <div className="relative">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-400">
                    Protection
                  </p>
                </div>

                <h2 className="mt-2 text-xl font-bold tracking-tight text-white sm:text-2xl">
                  Security & Protection
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  SmartBank AI continuously monitors your account.
                </p>
              </div>

              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/10 bg-emerald-400/[0.06] px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-emerald-400">
                <ShieldCheck size={12} />
                Secure
              </div>
            </div>

            <div className="relative mt-6 grid gap-3 lg:grid-cols-3">
              {securityItems.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    whileHover={{
                      y: -3,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                    className="group rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4 transition-all duration-300 hover:border-white/[0.1] hover:bg-white/[0.04]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl border ${item.iconClass}`}
                      >
                        <Icon size={17} />
                      </div>

                      <span
                        className={`rounded-full border px-2 py-1 text-[8px] font-bold uppercase tracking-wider ${item.statusClass}`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <h3 className="mt-4 text-sm font-semibold text-white">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-slate-600">
                      {item.description}
                    </p>

                    <div className="mt-4 flex items-center gap-1 text-[9px] font-semibold text-slate-600 transition group-hover:text-slate-400">
                      Security details
                      <ChevronRight
                        size={12}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* ==========================================
            LOGOUT
        ========================================== */}

        <motion.section
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
            delay: 0.26,
          }}
          className="mt-6 rounded-[2rem] border border-red-400/[0.08] bg-red-400/[0.025] p-5 sm:p-6"
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

              <p className="mt-1 text-xs leading-5 text-slate-600">
                You will be returned to the SmartBank AI home page.
              </p>
            </div>

            <button
              type="button"
              onClick={logout}
              className="group inline-flex items-center justify-center gap-2 rounded-xl border border-red-400/10 bg-red-500/[0.07] px-5 py-3 text-xs font-bold text-red-400 transition-all duration-300 hover:border-red-400/20 hover:bg-red-500/[0.12] hover:text-red-300"
            >
              <LogOut
                size={15}
                className="transition-transform duration-300 group-hover:-translate-x-0.5"
              />

              Logout
            </button>
          </div>
        </motion.section>

        {/* ==========================================
            FOOTER NOTE
        ========================================== */}

        <div className="mt-8 flex items-center justify-center gap-2 text-center">
          <ShieldCheck
            size={13}
            className="text-emerald-400"
          />

          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-700">
            Your banking experience is protected by SmartBank AI
          </p>
        </div>
      </main>
    </div>
  );
};

export default Profile;

