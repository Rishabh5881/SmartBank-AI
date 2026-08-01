import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  ShieldCheck,
  Lock,
  Eye,
  Moon,
  Mail,
  Smartphone,
  CreditCard,
  UserRound,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  LogOut,
  KeyRound,
  Fingerprint,
  Globe2,
  Trash2,
  Save,
} from "lucide-react";

const Settings = () => {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(true);
  const [transactionAlerts, setTransactionAlerts] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [biometricLogin, setBiometricLogin] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const Toggle = ({ enabled, onChange }) => {
    return (
      <button
        type="button"
        onClick={() => onChange(!enabled)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-all duration-300 ${
          enabled ? "bg-cyan-500" : "bg-slate-700"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-md transition-all duration-300 ${
            enabled ? "left-6" : "left-1"
          }`}
        />
      </button>
    );
  };

  const SettingRow = ({
    icon: Icon,
    title,
    description,
    children,
    iconClass = "text-cyan-400 bg-cyan-400/10 border-cyan-400/10",
  }) => {
    return (
      <div className="flex flex-col gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition hover:border-white/[0.1] hover:bg-white/[0.03] sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${iconClass}`}
          >
            <Icon size={17} />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-semibold text-white">{title}</p>

            <p className="mt-1 text-[10px] leading-5 text-slate-600 sm:text-xs">
              {description}
            </p>
          </div>
        </div>

        <div className="shrink-0">{children}</div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 pb-20 pt-28 text-white sm:px-6 lg:px-8">
      {/* =========================================================
          BACKGROUND
      ========================================================= */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-blue-600/[0.07] blur-[130px]" />

        <div className="absolute -right-40 top-60 h-96 w-96 rounded-full bg-cyan-500/[0.06] blur-[130px]" />

        <div className="absolute bottom-[-180px] left-[35%] h-96 w-96 rounded-full bg-purple-600/[0.04] blur-[130px]" />
      </div>

      <main className="relative mx-auto max-w-6xl">
        {/* =========================================================
            HEADER
        ========================================================= */}

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[30px] border border-white/[0.08] bg-white/[0.035] p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl sm:p-8"
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/[0.08] blur-[110px]" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/15 bg-cyan-400/[0.08] text-cyan-400 shadow-lg shadow-cyan-500/10">
                <UserRound size={25} strokeWidth={1.8} />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
                    Settings
                  </h1>

                  <span className="rounded-full border border-emerald-400/15 bg-emerald-400/[0.08] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-emerald-300">
                    Secure
                  </span>
                </div>

                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                  Manage your SmartBank AI account, security,
                  notifications, privacy and personal preferences.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-cyan-500/10 transition hover:-translate-y-0.5"
            >
              {saved ? <CheckCircle2 size={15} /> : <Save size={15} />}

              {saved ? "Changes Saved" : "Save Changes"}
            </button>
          </div>
        </motion.section>

        {/* =========================================================
            ACCOUNT
        ========================================================= */}

        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="mt-6"
        >
          <div className="mb-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-400">
              Account
            </p>

            <h2 className="mt-2 text-xl font-bold text-white">
              Account Preferences
            </h2>

            <p className="mt-1 text-xs text-slate-600">
              Manage your profile and banking preferences.
            </p>
          </div>

          <div className="space-y-3">
            <SettingRow
              icon={UserRound}
              title="Personal Information"
              description="Update your name, email, phone number and profile information."
            >
              <button
                type="button"
                className="flex items-center gap-1 text-xs font-semibold text-cyan-400 transition hover:text-cyan-300"
              >
                Manage
                <ChevronRight size={14} />
              </button>
            </SettingRow>

            <SettingRow
              icon={CreditCard}
              title="Banking Preferences"
              description="Manage your default account and transaction preferences."
              iconClass="text-emerald-400 bg-emerald-400/10 border-emerald-400/10"
            >
              <button
                type="button"
                className="flex items-center gap-1 text-xs font-semibold text-emerald-400 transition hover:text-emerald-300"
              >
                Manage
                <ChevronRight size={14} />
              </button>
            </SettingRow>

            <SettingRow
              icon={Globe2}
              title="Language & Region"
              description="Choose your preferred language, currency and regional settings."
              iconClass="text-blue-400 bg-blue-400/10 border-blue-400/10"
            >
              <span className="text-xs font-semibold text-slate-400">
                English · INR
              </span>
            </SettingRow>
          </div>
        </motion.section>

        {/* =========================================================
            SECURITY
        ========================================================= */}

        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14 }}
          className="mt-8"
        >
          <div className="mb-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-400">
              Security
            </p>

            <h2 className="mt-2 text-xl font-bold text-white">
              Security & Authentication
            </h2>

            <p className="mt-1 text-xs text-slate-600">
              Protect your account with advanced security controls.
            </p>
          </div>

          <div className="space-y-3">
            <SettingRow
              icon={Lock}
              title="Change Password"
              description="Create a strong password to protect your SmartBank AI account."
              iconClass="text-amber-400 bg-amber-400/10 border-amber-400/10"
            >
              <button
                type="button"
                className="flex items-center gap-1 text-xs font-semibold text-amber-400 transition hover:text-amber-300"
              >
                Change
                <ChevronRight size={14} />
              </button>
            </SettingRow>

            <SettingRow
              icon={KeyRound}
              title="Two-Factor Authentication"
              description="Add an extra layer of security to your account."
              iconClass="text-purple-400 bg-purple-400/10 border-purple-400/10"
            >
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-[9px] font-bold text-emerald-400">
                  Enabled
                </span>
              </div>
            </SettingRow>

            <SettingRow
              icon={Fingerprint}
              title="Biometric Login"
              description="Use biometric authentication for faster and safer access."
              iconClass="text-cyan-400 bg-cyan-400/10 border-cyan-400/10"
            >
              <Toggle
                enabled={biometricLogin}
                onChange={setBiometricLogin}
              />
            </SettingRow>

            <SettingRow
              icon={ShieldCheck}
              title="Login Activity"
              description="Review recent login sessions and connected devices."
              iconClass="text-blue-400 bg-blue-400/10 border-blue-400/10"
            >
              <button
                type="button"
                className="flex items-center gap-1 text-xs font-semibold text-blue-400 transition hover:text-blue-300"
              >
                View Activity
                <ChevronRight size={14} />
              </button>
            </SettingRow>
          </div>
        </motion.section>

        {/* =========================================================
            NOTIFICATIONS
        ========================================================= */}

        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8"
        >
          <div className="mb-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-purple-400">
              Notifications
            </p>

            <h2 className="mt-2 text-xl font-bold text-white">
              Notification Preferences
            </h2>

            <p className="mt-1 text-xs text-slate-600">
              Decide which alerts and updates you want to receive.
            </p>
          </div>

          <div className="space-y-3">
            <SettingRow
              icon={Mail}
              title="Email Notifications"
              description="Receive important banking updates and account information by email."
              iconClass="text-blue-400 bg-blue-400/10 border-blue-400/10"
            >
              <Toggle
                enabled={emailAlerts}
                onChange={setEmailAlerts}
              />
            </SettingRow>

            <SettingRow
              icon={Smartphone}
              title="Push Notifications"
              description="Receive real-time notifications directly on your device."
              iconClass="text-cyan-400 bg-cyan-400/10 border-cyan-400/10"
            >
              <Toggle
                enabled={pushAlerts}
                onChange={setPushAlerts}
              />
            </SettingRow>

            <SettingRow
              icon={CreditCard}
              title="Transaction Alerts"
              description="Get notified whenever money is deposited, withdrawn or transferred."
              iconClass="text-emerald-400 bg-emerald-400/10 border-emerald-400/10"
            >
              <Toggle
                enabled={transactionAlerts}
                onChange={setTransactionAlerts}
              />
            </SettingRow>

            <SettingRow
              icon={ShieldCheck}
              title="Security Alerts"
              description="Receive alerts for suspicious activity and new login attempts."
              iconClass="text-amber-400 bg-amber-400/10 border-amber-400/10"
            >
              <Toggle
                enabled={securityAlerts}
                onChange={setSecurityAlerts}
              />
            </SettingRow>
          </div>
        </motion.section>

        {/* =========================================================
            PRIVACY
        ========================================================= */}

        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mt-8"
        >
          <div className="mb-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-blue-400">
              Privacy
            </p>

            <h2 className="mt-2 text-xl font-bold text-white">
              Privacy & Visibility
            </h2>

            <p className="mt-1 text-xs text-slate-600">
              Control how your account information is handled.
            </p>
          </div>

          <div className="space-y-3">
            <SettingRow
              icon={Eye}
              title="Account Visibility"
              description="Your personal banking information is private and visible only to authorized services."
              iconClass="text-cyan-400 bg-cyan-400/10 border-cyan-400/10"
            >
              <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-[9px] font-bold text-emerald-400">
                Private
              </span>
            </SettingRow>

            <SettingRow
              icon={Sparkles}
              title="AI Financial Insights"
              description="Allow SmartBank AI to analyze your financial activity for personalized insights."
              iconClass="text-purple-400 bg-purple-400/10 border-purple-400/10"
            >
              <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-[9px] font-bold text-emerald-400">
                Active
              </span>
            </SettingRow>

            <SettingRow
              icon={Moon}
              title="Dark Appearance"
              description="Use the dark SmartBank AI interface across your account."
              iconClass="text-slate-300 bg-white/5 border-white/10"
            >
              <Toggle
                enabled={darkMode}
                onChange={setDarkMode}
              />
            </SettingRow>
          </div>
        </motion.section>

        {/* =========================================================
            SECURITY STATUS
        ========================================================= */}

        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 rounded-[24px] border border-emerald-400/10 bg-emerald-400/[0.025] p-5"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-400/10 bg-emerald-400/10 text-emerald-400">
              <ShieldCheck size={18} />
            </div>

            <div>
              <p className="text-sm font-semibold text-emerald-400">
                Your account is protected
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-600">
                SmartBank AI continuously monitors your account for
                suspicious activity and unauthorized access.
              </p>
            </div>
          </div>
        </motion.section>

        {/* =========================================================
            ACCOUNT ACTIONS
        ========================================================= */}

        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-8"
        >
          <div className="mb-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-red-400">
              Account Actions
            </p>

            <h2 className="mt-2 text-xl font-bold text-white">
              Manage Account
            </h2>

            <p className="mt-1 text-xs text-slate-600">
              Important actions related to your SmartBank AI account.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={handleLogout}
              className="group flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 text-left transition hover:border-amber-400/15 hover:bg-amber-400/[0.035]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400">
                <LogOut size={17} />
              </div>

              <div className="flex-1">
                <p className="text-xs font-semibold text-white">
                  Logout
                </p>

                <p className="mt-1 text-[9px] text-slate-600">
                  Securely sign out from this device.
                </p>
              </div>

              <ChevronRight
                size={15}
                className="text-slate-700 transition group-hover:translate-x-0.5 group-hover:text-amber-400"
              />
            </button>

            <button
              type="button"
              className="group flex items-center gap-3 rounded-2xl border border-red-400/10 bg-red-400/[0.025] p-4 text-left transition hover:border-red-400/20 hover:bg-red-400/[0.045]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-400/10 text-red-400">
                <Trash2 size={17} />
              </div>

              <div className="flex-1">
                <p className="text-xs font-semibold text-white">
                  Delete Account
                </p>

                <p className="mt-1 text-[9px] text-slate-600">
                  Permanently remove your account.
                </p>
              </div>

              <ChevronRight
                size={15}
                className="text-slate-700 transition group-hover:translate-x-0.5 group-hover:text-red-400"
              />
            </button>
          </div>
        </motion.section>

        {/* =========================================================
            WARNING
        ========================================================= */}

        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-400/10 bg-amber-400/[0.025] px-4 py-4">
          <AlertTriangle
            size={17}
            className="mt-0.5 shrink-0 text-amber-400"
          />

          <div>
            <p className="text-xs font-semibold text-amber-400">
              Keep your account secure
            </p>

            <p className="mt-1 text-[10px] leading-5 text-slate-600 sm:text-xs">
              Never share your password, OTP, PIN or banking credentials
              with anyone. SmartBank AI will never ask you to share these
              details through calls or messages.
            </p>
          </div>
        </div>

        {/* =========================================================
            FOOTER
        ========================================================= */}

        <div className="mt-8 flex flex-col gap-2 border-t border-white/[0.05] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] text-slate-700">
            SmartBank AI · Account Settings
          </p>

          <div className="flex items-center gap-2 text-[10px] text-emerald-400">
            <CheckCircle2 size={12} />
            Security systems active
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;