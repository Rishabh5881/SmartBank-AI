
import { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  LogOut,
  BrainCircuit,
  Menu,
  X,
  ChevronDown,
  LayoutDashboard,
  WalletCards,
  ArrowLeftRight,
  CreditCard,
  HandCoins,
  Bell,
  ShieldCheck,
} from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // ==========================================
  // LOAD USER
  // ==========================================

  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        setUser(null);
        setUserLoaded(true);
        return;
      }

      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("NAVBAR USER DATA ERROR:", error);
        setUser(null);
      }

      setUserLoaded(true);
    };

    loadUser();

    window.addEventListener("userUpdated", loadUser);
    window.addEventListener("storage", loadUser);

    return () => {
      window.removeEventListener("userUpdated", loadUser);
      window.removeEventListener("storage", loadUser);
    };
  }, []);

  // ==========================================
  // SCROLL EFFECT
  // ==========================================

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ==========================================
  // CLOSE MENUS ON ROUTE CHANGE
  // ==========================================

  useEffect(() => {
    setOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setOpen(false);
    setMobileOpen(false);

    window.dispatchEvent(new Event("userUpdated"));

    navigate("/");
  };

  // ==========================================
  // AI NAVIGATION
  // ==========================================

  const handleAI = () => {
    setOpen(false);
    setMobileOpen(false);

    if (location.pathname === "/") {
      const aiSection = document.getElementById("ai");

      if (aiSection) {
        aiSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      return;
    }

    navigate("/");

    setTimeout(() => {
      const aiSection = document.getElementById("ai");

      if (aiSection) {
        aiSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 500);
  };

  // ==========================================
  // USER DATA
  // ==========================================

  const userName =
    user?.name ||
    user?.fullName ||
    "User";

  const firstName =
    userName.split(" ")[0] || "User";

  const avatar =
    firstName.charAt(0).toUpperCase() || "U";

  // ==========================================
  // ACTIVE ROUTE
  // ==========================================

  const isActive = (path) => {
    return location.pathname === path;
  };

  // ==========================================
  // PUBLIC NAVIGATION
  // ==========================================

  const publicLinks = [
    {
      label: "Home",
      href: "#home",
    },
    {
      label: "Features",
      href: "#features",
    },
    {
      label: "Security",
      href: "#security",
    },
    {
      label: "Analytics",
      href: "#analytics",
    },
    {
      label: "Pricing",
      href: "#pricing",
    },
  ];

  // ==========================================
  // DASHBOARD NAVIGATION
  // ==========================================

  const dashboardLinks = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Accounts",
      path: "/accounts",
      icon: WalletCards,
    },
    {
      label: "Transactions",
      path: "/transactions",
      icon: ArrowLeftRight,
    },
    {
      label: "Cards",
      path: "/cards",
      icon: CreditCard,
    },
    {
      label: "Loans",
      path: "/loans",
      icon: HandCoins,
    },
    {
      label: "Notifications",
      path: "/notifications",
      icon: Bell,
    },
  ];

  // ==========================================
  // NAVBAR
  // ==========================================

  return (
    <nav className="fixed left-0 right-0 top-0 z-[100]">
      {/* ========================================
          BACKDROP
      ======================================== */}

      <div
        className={`absolute inset-0 border-b transition-all duration-300 ${
          scrolled
            ? "border-white/10 bg-[#020617]/95 shadow-2xl shadow-black/30 backdrop-blur-2xl"
            : "border-white/[0.07] bg-[#020617]/90 backdrop-blur-xl"
        }`}
      />

      {/* ========================================
          TOP GLOW
      ======================================== */}

      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-56 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent" />

      {/* ========================================
          MAIN NAV CONTENT
      ======================================== */}

      <div className="relative mx-auto flex h-[76px] max-w-[1500px] items-center px-4 sm:px-6 lg:px-8">
        {/* ======================================
            LOGO
        ====================================== */}

        <Link
          to="/"
          className="group flex shrink-0 items-center"
        >
          <div className="flex items-center gap-2.5">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/15 bg-gradient-to-br from-blue-600/20 to-cyan-400/10 shadow-lg shadow-cyan-500/5 transition duration-300 group-hover:border-cyan-400/30 group-hover:shadow-cyan-400/10">
              <ShieldCheck
                size={20}
                strokeWidth={2}
                className="text-cyan-400 transition duration-300 group-hover:scale-110"
              />

              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#020617] bg-emerald-400 shadow-sm shadow-emerald-400/50" />
            </div>

            <div className="whitespace-nowrap text-xl font-bold tracking-tight">
              <span className="text-white">
                SmartBank
              </span>

              <span className="text-cyan-400">
                AI
              </span>
            </div>
          </div>
        </Link>

        {/* ======================================
            DESKTOP PUBLIC NAV
        ====================================== */}

        {userLoaded && !user && (
          <div className="hidden flex-1 items-center justify-center lg:flex">
            <div className="flex items-center gap-1 rounded-2xl border border-white/[0.05] bg-white/[0.015] p-1">
              {publicLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="relative rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-300 transition-all duration-200 hover:bg-white/[0.05] hover:text-white"
                >
                  {item.label}
                </a>
              ))}

              <button
                type="button"
                onClick={handleAI}
                className="group flex items-center gap-1.5 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-300 transition-all duration-200 hover:bg-cyan-400/[0.05] hover:text-cyan-400"
              >
                <BrainCircuit
                  size={16}
                  strokeWidth={1.8}
                  className="transition duration-200 group-hover:scale-110"
                />

                AI
              </button>
            </div>
          </div>
        )}

        {/* ======================================
            DESKTOP AUTH NAV
        ====================================== */}

        {userLoaded && user && (
          <div className="hidden min-w-0 flex-1 items-center justify-center px-4 lg:flex">
            <div className="flex max-w-full items-center gap-1 overflow-x-auto rounded-2xl border border-white/[0.05] bg-white/[0.015] p-1 scrollbar-none">
              {dashboardLinks.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);

                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    className={`relative flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                      active
                        ? "bg-cyan-400/[0.08] text-cyan-400"
                        : "text-slate-300 hover:bg-white/[0.05] hover:text-white"
                    }`}
                  >
                    <Icon
                      size={15}
                      strokeWidth={
                        active ? 2 : 1.8
                      }
                      className={
                        active
                          ? "text-cyan-400"
                          : "text-slate-500"
                      }
                    />

                    {item.label}

                    {active && (
                      <motion.span
                        layoutId="navbar-active"
                        className="absolute bottom-0 left-1/2 h-[2px] w-5 -translate-x-1/2 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/60"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* ======================================
            RIGHT SIDE
        ====================================== */}

        <div className="ml-auto flex shrink-0 items-center gap-2.5">
          {/* ====================================
              LOGGED OUT
          ==================================== */}

          {userLoaded && !user && (
            <>
              <Link
                to="/login"
                className="hidden rounded-xl px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/[0.04] hover:text-white sm:block"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="group relative hidden overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-cyan-400 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-blue-500/30 sm:block"
              >
                <span className="relative z-10">
                  Let's Start →
                </span>

                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition duration-700 group-hover:translate-x-full" />
              </Link>
            </>
          )}

          {/* ====================================
              LOGGED IN
          ==================================== */}

          {userLoaded && user && (
            <div className="relative hidden sm:block">
              <button
                type="button"
                onClick={() =>
                  setOpen((value) => !value)
                }
                className={`flex items-center gap-2 rounded-xl border p-1.5 pr-2 transition-all duration-200 ${
                  open
                    ? "border-cyan-400/20 bg-cyan-400/[0.06]"
                    : "border-white/[0.06] bg-white/[0.025] hover:border-white/[0.12] hover:bg-white/[0.05]"
                }`}
              >
                <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-400 text-sm font-bold text-white shadow-lg shadow-blue-500/20">
                  {avatar}

                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#020617] bg-emerald-400" />
                </div>

                <span className="hidden max-w-[100px] truncate text-sm font-medium text-white md:block">
                  {firstName}
                </span>

                <ChevronDown
                  size={14}
                  className={`hidden text-slate-500 transition duration-200 md:block ${
                    open
                      ? "rotate-180 text-cyan-400"
                      : ""
                  }`}
                />
              </button>

              {/* ==================================
                  DROPDOWN
              ================================== */}

              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -8,
                      scale: 0.97,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: -8,
                      scale: 0.97,
                    }}
                    transition={{
                      duration: 0.18,
                    }}
                    className="absolute right-0 top-[calc(100%+10px)] w-60 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/95 p-2 shadow-2xl shadow-black/40 backdrop-blur-2xl"
                  >
                    <div className="mb-1 rounded-xl bg-white/[0.035] p-3">
                      <div className="flex items-center gap-3">
                        <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 font-bold text-white">
                          {avatar}

                          <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-slate-900 bg-emerald-400" />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-white">
                            {userName}
                          </p>

                          <p className="mt-0.5 text-[10px] uppercase tracking-wider text-emerald-400">
                            Account Active
                          </p>
                        </div>
                      </div>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-300 transition hover:bg-white/[0.06] hover:text-white"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04]">
                        <User
                          size={16}
                          className="text-slate-400"
                        />
                      </div>

                      Profile
                    </Link>

                    <div className="flex items-center gap-3 rounded-xl px-3 py-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400/10">
                        <ShieldCheck
                          size={16}
                          className="text-emerald-400"
                        />
                      </div>

                      <div>
                        <p className="text-xs font-medium text-slate-300">
                          Secure Session
                        </p>

                        <p className="mt-0.5 text-[10px] text-slate-600">
                          Protected account
                        </p>
                      </div>
                    </div>

                    <div className="my-1 border-t border-white/[0.06]" />

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-red-400 transition hover:bg-red-500/10"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10">
                        <LogOut size={16} />
                      </div>

                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* ====================================
              MOBILE BUTTON
          ==================================== */}

          <button
            type="button"
            onClick={() =>
              setMobileOpen((value) => !value)
            }
            className={`flex h-10 w-10 items-center justify-center rounded-xl border transition lg:hidden ${
              mobileOpen
                ? "border-cyan-400/20 bg-cyan-400/10 text-cyan-400"
                : "border-white/[0.07] bg-white/[0.03] text-slate-300 hover:text-white"
            }`}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? (
              <X size={19} />
            ) : (
              <Menu size={19} />
            )}
          </button>
        </div>
      </div>

      {/* ==========================================
          MOBILE MENU
      ========================================== */}

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.2,
            }}
            className="overflow-hidden border-t border-white/[0.06] bg-[#020617]/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="mx-auto max-w-[1500px] px-4 pb-5 pt-3 sm:px-6">
              {/* ====================================
                  PUBLIC MOBILE
              ==================================== */}

              {userLoaded && !user && (
                <>
                  {publicLinks.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() =>
                        setMobileOpen(false)
                      }
                      className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/[0.05] hover:text-white"
                    >
                      {item.label}
                    </a>
                  ))}

                  <button
                    type="button"
                    onClick={handleAI}
                    className="flex w-full items-center gap-2 rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-300 transition hover:bg-cyan-400/[0.05] hover:text-cyan-400"
                  >
                    <BrainCircuit size={17} />
                    AI
                  </button>

                  <div className="my-3 border-t border-white/[0.06]" />

                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to="/login"
                      onClick={() =>
                        setMobileOpen(false)
                      }
                      className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-center text-sm font-semibold text-slate-300"
                    >
                      Login
                    </Link>

                    <Link
                      to="/signup"
                      onClick={() =>
                        setMobileOpen(false)
                      }
                      className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-400 px-4 py-3 text-center text-sm font-semibold text-white"
                    >
                      Let's Start
                    </Link>
                  </div>
                </>
              )}

              {/* ====================================
                  AUTH MOBILE
              ==================================== */}

              {userLoaded && user && (
                <>
                  <div className="mb-3 flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-3">
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 font-bold text-white">
                      {avatar}

                      <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#020617] bg-emerald-400" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-white">
                        {userName}
                      </p>

                      <p className="mt-0.5 text-[10px] uppercase tracking-wider text-emerald-400">
                        Active Account
                      </p>
                    </div>
                  </div>

                  {dashboardLinks.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);

                    return (
                      <Link
                        key={item.label}
                        to={item.path}
                        onClick={() =>
                          setMobileOpen(false)
                        }
                        className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                          active
                            ? "bg-cyan-400/[0.08] text-cyan-400"
                            : "text-slate-300 hover:bg-white/[0.05] hover:text-white"
                        }`}
                      >
                        <Icon
                          size={17}
                          className={
                            active
                              ? "text-cyan-400"
                              : "text-slate-500"
                          }
                        />

                        {item.label}
                      </Link>
                    );
                  })}

                  <div className="my-3 border-t border-white/[0.06]" />

                  <Link
                    to="/profile"
                    onClick={() =>
                      setMobileOpen(false)
                    }
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/[0.05] hover:text-white"
                  >
                    <User size={17} />
                    Profile
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-red-400 transition hover:bg-red-500/10"
                  >
                    <LogOut size={17} />
                    Logout
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

