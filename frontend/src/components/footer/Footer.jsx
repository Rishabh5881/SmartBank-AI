import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  BrainCircuit,
  ArrowUpRight,
  ExternalLink,
  Sparkles,
  LockKeyhole,
} from "lucide-react";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = useCallback(
    (id) => {
      if (location.pathname !== "/") {
        navigate("/");

        setTimeout(() => {
          const section = document.getElementById(id);

          if (section) {
            section.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }, 300);

        return;
      }

      const section = document.getElementById(id);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    },
    [location.pathname, navigate]
  );

  const platformLinks = [
    ["Home", "home"],
    ["Features", "features"],
    ["Security", "security"],
    ["AI Intelligence", "ai"],
    ["Analytics", "analytics"],
    ["Pricing", "pricing"],
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.08] bg-[#020617] text-white">
      {/* =========================================================
          BACKGROUND
      ========================================================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -bottom-48 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-blue-600/[0.08] blur-[150px]" />

        <div className="absolute left-[-180px] top-[-180px] h-[360px] w-[360px] rounded-full bg-cyan-500/[0.035] blur-[130px]" />

        <div className="absolute right-[-180px] bottom-[-120px] h-[340px] w-[340px] rounded-full bg-purple-600/[0.035] blur-[130px]" />
      </div>

      {/* =========================================================
          TOP LINE
      ========================================================= */}

      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-72 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

      {/* =========================================================
          MAIN CONTAINER
      ========================================================= */}

      <div className="relative mx-auto max-w-[1500px] px-5 py-16 sm:px-8 lg:px-10 lg:py-20 xl:px-12">
        {/* =======================================================
            BRAND / PLATFORM / CONNECT
        ======================================================= */}

        <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-[1.5fr_0.8fr_1fr]">
          {/* =====================================================
              BRAND
          ===================================================== */}

          <div>
            <button
              type="button"
              onClick={() => scrollToSection("home")}
              className="group flex items-center gap-3 text-left"
            >
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/15 bg-gradient-to-br from-blue-600/20 to-cyan-400/10 shadow-lg shadow-cyan-500/[0.08] transition duration-300 group-hover:border-cyan-400/30 group-hover:shadow-cyan-400/15">
                <BrainCircuit
                  size={25}
                  strokeWidth={1.8}
                  className="text-cyan-400 transition duration-300 group-hover:scale-110"
                />

                <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-[#020617] bg-emerald-400 shadow-lg shadow-emerald-400/40" />
              </div>

              <div>
                <h2 className="text-xl font-bold tracking-tight text-white">
                  SmartBank
                  <span className="text-cyan-400">AI</span>
                </h2>

                <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.2em] text-slate-600">
                  Intelligent Banking
                </p>
              </div>
            </button>

            <p className="mt-6 max-w-lg text-sm leading-7 text-slate-400">
              AI-powered digital banking platform designed to help you
              understand your money, manage your finances, and make smarter
              financial decisions.
            </p>

            {/* SECURITY CARD */}

            <div className="mt-7 inline-flex max-w-full items-center gap-3 rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.035] px-4 py-3.5 backdrop-blur-xl">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10">
                <ShieldCheck
                  size={18}
                  className="text-emerald-400"
                />
              </div>

              <div>
                <p className="text-xs font-semibold text-white">
                  Bank-Grade Security
                </p>

                <p className="mt-0.5 text-[10px] text-slate-600">
                  Your financial data stays protected
                </p>
              </div>
            </div>
          </div>

          {/* =====================================================
              PLATFORM
          ===================================================== */}

          <div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />

              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">
                Platform
              </h3>
            </div>

            <div className="mt-6 space-y-3">
              {platformLinks.map(([name, id]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => scrollToSection(id)}
                  className="group flex items-center gap-2.5 text-sm text-slate-500 transition duration-200 hover:translate-x-1 hover:text-cyan-400"
                >
                  <span className="h-1 w-1 rounded-full bg-slate-700 transition group-hover:bg-cyan-400" />

                  {name}
                </button>
              ))}
            </div>
          </div>

          {/* =====================================================
              CONNECT
          ===================================================== */}

          <div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />

              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">
                Connect
              </h3>
            </div>

            <p className="mt-6 max-w-sm text-sm leading-6 text-slate-500">
              Explore SmartBank AI and follow the project for future updates,
              development progress, and product improvements.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-3 text-sm font-medium text-slate-300 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-400/20 hover:bg-cyan-400/[0.04] hover:text-cyan-400"
              >
                GitHub

                <ExternalLink
                  size={13}
                  className="transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>

              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-3 text-sm font-medium text-slate-300 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-400/20 hover:bg-cyan-400/[0.04] hover:text-cyan-400"
              >
                LinkedIn

                <ExternalLink
                  size={13}
                  className="transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </div>

            <button
              type="button"
              onClick={() => scrollToSection("pricing")}
              className="group mt-6 inline-flex items-center gap-2 rounded-xl border border-cyan-400/15 bg-cyan-400/[0.045] px-4 py-3 text-sm font-semibold text-cyan-400 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-400/30 hover:bg-cyan-400/[0.08]"
            >
              Explore Plans

              <ArrowUpRight
                size={15}
                className="transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </button>
          </div>
        </div>

        {/* =======================================================
            FEATURE STRIP
        ======================================================= */}

        <div className="mt-14 grid gap-3 border-y border-white/[0.05] py-5 sm:grid-cols-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400/[0.06]">
              <BrainCircuit
                size={16}
                className="text-cyan-400"
              />
            </div>

            <div>
              <p className="text-xs font-semibold text-white">
                AI Intelligence
              </p>

              <p className="mt-0.5 text-[10px] text-slate-600">
                Smarter financial insights
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/[0.06]">
              <LockKeyhole
                size={16}
                className="text-emerald-400"
              />
            </div>

            <div>
              <p className="text-xs font-semibold text-white">
                Secure Banking
              </p>

              <p className="mt-0.5 text-[10px] text-slate-600">
                Protected financial platform
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-400/[0.06]">
              <Sparkles
                size={16}
                className="text-purple-400"
              />
            </div>

            <div>
              <p className="text-xs font-semibold text-white">
                Modern Experience
              </p>

              <p className="mt-0.5 text-[10px] text-slate-600">
                Built for the next generation
              </p>
            </div>
          </div>
        </div>

        {/* =======================================================
            BOTTOM BAR
        ======================================================= */}

        <div className="flex flex-col gap-5 pt-7 text-xs sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-slate-600">
              © 2026 SmartBank AI. All rights reserved.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <button
              type="button"
              className="text-slate-600 transition hover:text-cyan-400"
            >
              Privacy
            </button>

            <button
              type="button"
              className="text-slate-600 transition hover:text-cyan-400"
            >
              Terms
            </button>

            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />

                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>

              <span className="text-[10px] text-slate-600">
                All systems operational
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;