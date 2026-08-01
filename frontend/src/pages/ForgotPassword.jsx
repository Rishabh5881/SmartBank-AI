
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mail,
  ArrowRight,
  Loader2,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);

    if (error) {
      setError("");
    }

    if (success) {
      setSuccess("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setError("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        {
          email: normalizedEmail,
        },
        {
          withCredentials: true,
        }
      );

      console.log(
        "FORGOT PASSWORD RESPONSE:",
        response.data
      );

      setSuccess(
        response?.data?.message ||
          "If an account exists with this email, password reset instructions have been sent."
      );

      setEmail("");
    } catch (err) {
      console.error(
        "FORGOT PASSWORD ERROR:",
        err
      );

      console.error(
        "FORGOT PASSWORD RESPONSE:",
        err?.response?.data
      );

      const backendMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.response?.data?.data?.message ||
        "";

      if (err?.response?.status === 404) {
        setError(
          backendMessage ||
            "Password reset service was not found. Please check the backend API."
        );
      } else if (err?.response?.status >= 500) {
        setError(
          backendMessage ||
            "Server error. Please try again later."
        );
      } else {
        setError(
          backendMessage ||
            "Unable to process your request. Please try again."
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
          FORGOT PASSWORD CARD
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
        {/* Top Gradient */}

        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-500" />

        {/* Decorative Glow */}

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
              Forgot Password?
            </h1>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-400">
              Enter your registered email address and
              we'll help you securely reset your
              SmartBank AI password.
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
                  Request failed
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
                  Request submitted
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
            {/* EMAIL */}

            <div className="group relative">
              <div className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-500 transition-colors duration-200 group-focus-within:text-cyan-400">
                <Mail size={19} />
              </div>

              <input
                required
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Email Address"
                disabled={loading}
                autoComplete="email"
                className="w-full rounded-2xl border border-white/[0.09] bg-slate-900/70 py-4 pl-12 pr-4 text-sm text-white outline-none transition-all duration-200 placeholder:text-slate-600 hover:border-white/[0.14] focus:border-cyan-400/40 focus:bg-slate-900 focus:ring-4 focus:ring-cyan-400/[0.06] disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            {/* SUBMIT BUTTON */}

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{
                y: loading ? 0 : -2,
              }}
              whileTap={{
                scale: loading ? 1 : 0.98,
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
                    Sending Reset Request...
                  </span>
                </>
              ) : (
                <>
                  <span>
                    Send Reset Instructions
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

export default ForgotPassword;

