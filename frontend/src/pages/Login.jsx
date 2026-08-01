import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  ArrowRight,
  Loader2,
  ShieldCheck,
  AlertCircle,
  Globe2,
} from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";

import api from "../services/api";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: location.state?.email || "",
    password: "",
  });

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
  };

  // ==========================================
  // SAVE LOGIN SESSION
  // ==========================================

  const saveLoginSession = (token, user) => {
    if (!token) {
      throw new Error(
        "Authentication token was not received."
      );
    }

    if (!user || typeof user !== "object") {
      throw new Error(
        "User information was not received."
      );
    }

    localStorage.setItem("token", token);

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    console.log(
      "TOKEN SAVED:",
      Boolean(localStorage.getItem("token"))
    );

    console.log(
      "USER SAVED:",
      Boolean(localStorage.getItem("user"))
    );

    console.log(
      "LOGGED IN USER:",
      user
    );

    window.dispatchEvent(
      new Event("userUpdated")
    );
  };

  // ==========================================
  // NORMAL LOGIN
  // ==========================================

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    const email =
      formData.email.trim().toLowerCase();

    const password =
      formData.password;

    if (!email || !password) {
      setError(
        "Email and password are required."
      );

      return;
    }

    try {
      setLoading(true);

      const response = await api.post(
        "/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      console.log(
        "LOGIN RESPONSE:",
        response.data
      );

      const responseData =
        response?.data || {};

      const token =
        responseData?.accessToken;

      const loggedInUser =
        responseData?.data;

      if (!token) {
        console.error(
          "LOGIN TOKEN NOT FOUND:",
          responseData
        );

        setError(
          "Login successful, but authentication token was not received."
        );

        return;
      }

      if (
        !loggedInUser ||
        typeof loggedInUser !== "object"
      ) {
        console.error(
          "LOGIN USER DATA NOT FOUND:",
          responseData
        );

        setError(
          "Login successful, but user information was not received."
        );

        return;
      }

      saveLoginSession(
        token,
        loggedInUser
      );

      navigate("/dashboard", {
        replace: true,
      });
    } catch (err) {
      console.error(
        "LOGIN ERROR:",
        err
      );

      console.error(
        "LOGIN ERROR RESPONSE:",
        err?.response?.data
      );

      const backendMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.response?.data?.data?.message ||
        "";

      if (err?.response?.status === 401) {
        setError(
          backendMessage ||
            "Invalid email or password."
        );
      } else if (err?.response?.status === 404) {
        setError(
          "Login service was not found. Please check the backend API."
        );
      } else if (err?.response?.status >= 500) {
        setError(
          backendMessage ||
            "Server error. Please try again."
        );
      } else {
        setError(
          backendMessage ||
            err?.message ||
            "Login failed. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // GOOGLE LOGIN SUCCESS
  // ==========================================

  const handleGoogleSuccess = async (
    credentialResponse
  ) => {
    setError("");

    const credential =
      credentialResponse?.credential;

    if (!credential) {
      setGoogleLoading(false);

      setError(
        "Google authentication credential was not received."
      );

      return;
    }

    try {
      setGoogleLoading(true);

      console.log(
        "GOOGLE CREDENTIAL RECEIVED"
      );

      const response = await api.post(
        "/auth/google",
        {
          credential,
        },
        {
          withCredentials: true,
        }
      );

      console.log(
        "GOOGLE LOGIN RESPONSE:",
        response.data
      );

      const responseData =
        response?.data || {};

      const token =
        responseData?.accessToken;

      const loggedInUser =
        responseData?.data;

      if (!token) {
        console.error(
          "GOOGLE TOKEN NOT FOUND:",
          responseData
        );

        setError(
          "Google login succeeded, but authentication token was not received."
        );

        return;
      }

      if (
        !loggedInUser ||
        typeof loggedInUser !== "object"
      ) {
        console.error(
          "GOOGLE USER DATA NOT FOUND:",
          responseData
        );

        setError(
          "Google login succeeded, but user information was not received."
        );

        return;
      }

      saveLoginSession(
        token,
        loggedInUser
      );

      navigate("/dashboard", {
        replace: true,
      });
    } catch (err) {
      console.error(
        "GOOGLE LOGIN ERROR:",
        err
      );

      console.error(
        "GOOGLE LOGIN RESPONSE:",
        err?.response?.data
      );

      const backendMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.response?.data?.data?.message ||
        "";

      if (err?.response?.status === 401) {
        setError(
          backendMessage ||
            "Google authentication failed. Please try again."
        );
      } else if (err?.response?.status === 404) {
        setError(
          "Google login API was not found. Please check the backend route."
        );
      } else if (err?.response?.status >= 500) {
        setError(
          backendMessage ||
            "Server error during Google login. Please try again."
        );
      } else {
        setError(
          backendMessage ||
            "Unable to login with Google. Please try again."
        );
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  // ==========================================
  // GOOGLE LOGIN ERROR
  // ==========================================

  const handleGoogleError = () => {
    console.error(
      "GOOGLE LOGIN FAILED"
    );

    setGoogleLoading(false);

    setError(
      "Google login was cancelled or could not be completed."
    );
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020617] px-6 py-12">

      {/* ==========================================
          AMBIENT BACKGROUND
      ========================================== */}

      <div className="pointer-events-none absolute -left-40 top-20 h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[140px]" />

      <div className="pointer-events-none absolute -right-40 bottom-10 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[140px]" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.03] blur-[120px]" />

      {/* ==========================================
          LOGIN CARD
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

        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-500" />

        <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative">

          {/* HEADER */}

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
              Welcome Back
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Login to your SmartBank AI account
            </p>

          </div>

          {/* ERROR */}

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
                  Login failed
                </p>

                <p className="mt-1 text-xs leading-5 text-red-300/70">
                  {error}
                </p>
              </div>

            </motion.div>
          )}

          {/* LOGIN FORM */}

          <form
            onSubmit={handleLogin}
            className="mt-7 space-y-5"
          >

            <Input
              icon={<Mail size={19} />}
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              disabled={
                loading ||
                googleLoading
              }
            />

            <div>

              <Input
                icon={<Lock size={19} />}
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                disabled={
                  loading ||
                  googleLoading
                }
              />

              <div className="mt-2 flex justify-end">

                <Link
                  to="/forgot-password"
                  className="text-xs font-semibold text-cyan-400 transition-colors duration-200 hover:text-cyan-300"
                >
                  Forgot Password?
                </Link>

              </div>

            </div>

            <motion.button
              type="submit"
              disabled={
                loading ||
                googleLoading
              }
              whileHover={{
                y:
                  loading ||
                  googleLoading
                    ? 0
                    : -2,
              }}
              whileTap={{
                scale:
                  loading ||
                  googleLoading
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
                    Authenticating...
                  </span>
                </>
              ) : (
                <>
                  <span>
                    Login to SmartBank
                  </span>

                  <ArrowRight
                    size={19}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </>
              )}

            </motion.button>

          </form>

          {/* DIVIDER */}

          <div className="my-6 flex items-center gap-4">

            <div className="h-px flex-1 bg-white/[0.08]" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-600">
              Or continue with
            </span>

            <div className="h-px flex-1 bg-white/[0.08]" />

          </div>

          {/* GOOGLE LOGIN */}

          <div className="relative">

            {googleLoading && (
              <div className="absolute inset-0 z-20 flex items-center justify-center rounded-2xl bg-[#020617]/80 backdrop-blur-sm">

                <div className="flex items-center gap-3 text-sm font-semibold text-white">

                  <Loader2
                    size={18}
                    className="animate-spin"
                  />

                  <span>
                    Connecting to Google...
                  </span>

                </div>

              </div>
            )}

            <div className="flex min-h-[50px] w-full items-center justify-center overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.04] transition-all duration-300 hover:border-white/[0.16] hover:bg-white/[0.07]">

              <GoogleLogin
                onSuccess={
                  handleGoogleSuccess
                }
                onError={
                  handleGoogleError
                }
                useOneTap={false}
                theme="filled_black"
                size="large"
                text="continue_with"
                shape="rectangular"
                width="350"
              />

            </div>

            <div className="pointer-events-none absolute inset-0 flex items-center justify-center gap-3 text-sm font-semibold text-slate-200 opacity-0">

              <Globe2 size={19} />

              <span>
                Continue with Google
              </span>

            </div>

          </div>

          {/* SECURITY */}

          <div className="mt-6 flex items-center justify-center gap-2">

            <ShieldCheck
              size={13}
              className="text-emerald-400"
            />

            <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-slate-600">
              Secure authentication
            </span>

            <span className="h-1 w-1 rounded-full bg-slate-700" />

            <span className="text-[10px] text-slate-600">
              SmartBank AI
            </span>

          </div>

          {/* SIGNUP */}

          <p className="mt-7 text-center text-sm text-slate-400">

            Don't have an account?

            <Link
              to="/signup"
              className="ml-2 font-semibold text-cyan-400 transition-colors hover:text-cyan-300"
            >
              Create Account
            </Link>

          </p>

        </div>

      </motion.div>

    </div>
  );
};

// ==========================================
// INPUT COMPONENT
// ==========================================

const Input = ({
  icon,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  disabled = false,
}) => {
  return (
    <div className="group relative">

      <div className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-500 transition-colors duration-200 group-focus-within:text-cyan-400">
        {icon}
      </div>

      <input
        required
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete={
          type === "password"
            ? "current-password"
            : "email"
        }
        className="w-full rounded-2xl border border-white/[0.09] bg-slate-900/70 py-4 pl-12 pr-4 text-sm text-white outline-none transition-all duration-200 placeholder:text-slate-600 hover:border-white/[0.14] focus:border-cyan-400/40 focus:bg-slate-900 focus:ring-4 focus:ring-cyan-400/[0.06] disabled:cursor-not-allowed disabled:opacity-50"
      />

    </div>
  );
};

export default Login;