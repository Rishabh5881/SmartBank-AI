import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Lock,
  ArrowRight,
  Loader2,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError("");
    }

    if (success) {
      setSuccess("");
    }
  };

  // ==========================================
  // PASSWORD VALIDATION
  // ==========================================

  const validatePassword = (password) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    }

    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }

    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter.";
    }

    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one number.";
    }

    return "";
  };

  // ==========================================
  // RESET PASSWORD
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!token) {
      setError(
        "Password reset link is invalid or incomplete."
      );
      return;
    }

    const password = formData.password.trim();
    const confirmPassword =
      formData.confirmPassword.trim();

    if (!password || !confirmPassword) {
      setError(
        "Please enter and confirm your new password."
      );
      return;
    }

    const passwordError = validatePassword(password);

    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${API_URL}/auth/reset-password`,
        {
          token,
          password,
          confirmPassword,
        },
        {
          withCredentials: true,
        }
      );

      console.log(
        "RESET PASSWORD RESPONSE:",
        response.data
      );

      setSuccess(
        response?.data?.message ||
          "Password reset successfully. You can now login with your new password."
      );

      setFormData({
        password: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        navigate("/login", {
          replace: true,
          state: {
            message:
              "Password reset successfully. Please login with your new password.",
          },
        });
      }, 1800);
    } catch (err) {
      console.error(
        "RESET PASSWORD ERROR:",
        err
      );

      console.error(
        "RESET PASSWORD RESPONSE:",
        err?.response?.data
      );

      const backendMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.response?.data?.data?.message ||
        "";

      if (err?.response?.status === 400) {
        setError(
          backendMessage ||
            "Invalid or expired password reset link."
        );
      } else if (err?.response?.status === 401) {
        setError(
          backendMessage ||
            "Password reset link is invalid or expired."
        );
      } else if (err?.response?.status === 404) {
        setError(
          backendMessage ||
            "Password reset service was not found."
        );
      } else if (err?.response?.status >= 500) {
        setError(
          backendMessage ||
            "Server error. Please try again later."
        );
      } else {
        setError(
          backendMessage ||
            "Unable to reset password. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020617] px-6 py-12">

      {/* ==========================================
          AMBIENT BACKGROUND
      ========================================== */}

      <div className="pointer-events-none absolute -left-40 top-20 h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[140px]" />

      <div className="pointer-events-none absolute -right-40 bottom-10 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[140px]" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.03] blur-[120px]" />

      {/* ==========================================
          RESET PASSWORD CARD
      ========================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
          scale: 0.97,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
        className="relative z-10 w-full max-w-md overflow-hidden rounded-[30px] border border-white/[0.10] bg-white/[0.045] p-8 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-9"
      >

        {/* TOP GRADIENT */}

        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-500" />

        {/* DECORATIVE GLOW */}

        <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative">

          {/* ==========================================
              HEADER
          ========================================== */}

          <div className="text-center">

            <motion.div
              initial={{
                scale: 0.8,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              transition={{
                delay: 0.15,
                duration: 0.4,
              }}
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 text-white shadow-xl shadow-blue-500/20"
            >
              <ShieldCheck
                size={30}
                strokeWidth={1.8}
              />
            </motion.div>

            <h1 className="mt-5 text-3xl font-bold tracking-tight text-white">
              Reset Password
            </h1>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-400">
              Create a strong new password for your
              SmartBank AI account.
            </p>

          </div>

          {/* ==========================================
              ERROR
          ========================================== */}

          {error && (
            <motion.div
              initial={{
                opacity: 0,
                y: -8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="mt-6 flex items-start gap-3 rounded-2xl border border-red-400/15 bg-red-500/[0.08] p-4"
            >

              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                <AlertCircle size={17} />
              </div>

              <div>
                <p className="text-xs font-semibold text-red-300">
                  Reset failed
                </p>

                <p className="mt-1 text-xs leading-5 text-red-300/70">
                  {error}
                </p>
              </div>

            </motion.div>
          )}

          {/* ==========================================
              SUCCESS
          ========================================== */}

          {success && (
            <motion.div
              initial={{
                opacity: 0,
                y: -8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="mt-6 flex items-start gap-3 rounded-2xl border border-emerald-400/15 bg-emerald-500/[0.08] p-4"
            >

              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <CheckCircle2 size={17} />
              </div>

              <div>
                <p className="text-xs font-semibold text-emerald-300">
                  Password Updated
                </p>

                <p className="mt-1 text-xs leading-5 text-emerald-300/70">
                  {success}
                </p>
              </div>

            </motion.div>
          )}

          {/* ==========================================
              FORM
          ========================================== */}

          <form
            onSubmit={handleSubmit}
            className="mt-7 space-y-5"
          >

            {/* NEW PASSWORD */}

            <div className="group relative">

              <div className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-500 transition-colors duration-200 group-focus-within:text-cyan-400">
                <Lock size={19} />
              </div>

              <input
                required
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="New Password"
                disabled={
                  loading || Boolean(success)
                }
                autoComplete="new-password"
                className="w-full rounded-2xl border border-white/[0.09] bg-slate-900/70 py-4 pl-12 pr-12 text-sm text-white outline-none transition-all duration-200 placeholder:text-slate-600 hover:border-white/[0.14] focus:border-cyan-400/40 focus:bg-slate-900 focus:ring-4 focus:ring-cyan-400/[0.06] disabled:cursor-not-allowed disabled:opacity-50"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    (value) => !value
                  )
                }
                disabled={
                  loading || Boolean(success)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>

            {/* CONFIRM PASSWORD */}

            <div className="group relative">

              <div className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-500 transition-colors duration-200 group-focus-within:text-cyan-400">
                <Lock size={19} />
              </div>

              <input
                required
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm New Password"
                disabled={
                  loading || Boolean(success)
                }
                autoComplete="new-password"
                className="w-full rounded-2xl border border-white/[0.09] bg-slate-900/70 py-4 pl-12 pr-12 text-sm text-white outline-none transition-all duration-200 placeholder:text-slate-600 hover:border-white/[0.14] focus:border-cyan-400/40 focus:bg-slate-900 focus:ring-4 focus:ring-cyan-400/[0.06] disabled:cursor-not-allowed disabled:opacity-50"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    (value) => !value
                  )
                }
                disabled={
                  loading || Boolean(success)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>

            {/* PASSWORD REQUIREMENTS */}

            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4">

              <p className="text-xs font-semibold text-slate-300">
                Password requirements
              </p>

              <div className="mt-3 grid grid-cols-2 gap-2">

                <Requirement
                  valid={
                    formData.password.length >= 8
                  }
                  text="8+ characters"
                />

                <Requirement
                  valid={
                    /[A-Z]/.test(
                      formData.password
                    )
                  }
                  text="Uppercase letter"
                />

                <Requirement
                  valid={
                    /[a-z]/.test(
                      formData.password
                    )
                  }
                  text="Lowercase letter"
                />

                <Requirement
                  valid={
                    /[0-9]/.test(
                      formData.password
                    )
                  }
                  text="Number"
                />

              </div>

            </div>

            {/* RESET BUTTON */}

            <motion.button
              type="submit"
              disabled={
                loading || Boolean(success)
              }
              whileHover={{
                y:
                  loading || success
                    ? 0
                    : -2,
              }}
              whileTap={{
                scale:
                  loading || success
                    ? 1
                    : 0.98,
              }}
              className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-400 py-4 font-semibold text-white shadow-xl shadow-blue-500/10 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 disabled:cursor-not-allowed disabled:opacity-60"
            >

              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

              {loading ? (
                <>
                  <Loader2
                    size={19}
                    className="animate-spin"
                  />

                  <span>
                    Updating Password...
                  </span>
                </>
              ) : (
                <>
                  <span>
                    Update Password
                  </span>

                  <ArrowRight
                    size={19}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </>
              )}

            </motion.button>

          </form>

          {/* ==========================================
              SECURITY
          ========================================== */}

          <div className="mt-6 flex items-center justify-center gap-2">

            <ShieldCheck
              size={13}
              className="text-emerald-400"
            />

            <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-slate-600">
              Secure password recovery
            </span>

            <span className="h-1 w-1 rounded-full bg-slate-700" />

            <span className="text-[10px] text-slate-600">
              SmartBank AI
            </span>

          </div>

          {/* ==========================================
              BACK TO LOGIN
          ========================================== */}

          <div className="mt-7 text-center">

            <Link
              to="/login"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 transition-colors hover:text-cyan-300"
            >
              <ArrowLeft
                size={16}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />

              Back to Login
            </Link>

          </div>

        </div>
      </motion.div>
    </div>
  );
};

// ==========================================
// PASSWORD REQUIREMENT COMPONENT
// ==========================================

const Requirement = ({ valid, text }) => {
  return (
    <div
      className={`flex items-center gap-2 text-[11px] transition-colors ${
        valid
          ? "text-emerald-400"
          : "text-slate-600"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          valid
            ? "bg-emerald-400"
            : "bg-slate-700"
        }`}
      />

      {text}
    </div>
  );
};

export default ResetPassword;