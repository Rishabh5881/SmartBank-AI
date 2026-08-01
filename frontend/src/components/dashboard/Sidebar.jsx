import {
  LayoutDashboard,
  CreditCard,
  Wallet,
  ArrowLeftRight,
  Bell,
  User,
  Settings,
  LogOut,
  Sparkles,
  ChevronRight,
  X,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";



const Sidebar = ({ mobileOpen = false, onClose }) => {

  const navigate = useNavigate();



  const menu = [

    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },

    {
      name: "Accounts",
      icon: Wallet,
      path: "/accounts",
    },

    {
      name: "Cards",
      icon: CreditCard,
      path: "/cards",
    },

    {
      name: "Transactions",
      icon: ArrowLeftRight,
      path: "/transactions",
    },

    {
      name: "Notifications",
      icon: Bell,
      path: "/notifications",
    },

  ];



  const secondaryMenu = [

    {
      name: "Profile",
      icon: User,
      path: "/profile",
    },

    {
      name: "Settings",
      icon: Settings,
      path: "/settings",
    },

  ];



  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.dispatchEvent(
      new Event("userUpdated")
    );

    navigate("/login");

  };



  const handleNavigation = () => {

    if (onClose) {
      onClose();
    }

  };



  return (

    <>

      {/* =========================
          MOBILE BACKDROP
      ========================= */}

      {mobileOpen && (

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="
            fixed
            inset-0
            z-40
            bg-black/60
            backdrop-blur-sm
            lg:hidden
          "
        />

      )}



      {/* =========================
          SIDEBAR
      ========================= */}

      <aside
        className={`
          fixed
          left-0
          top-0
          z-50
          flex
          h-screen
          w-[280px]
          flex-col
          overflow-hidden
          border-r
          border-white/[0.08]
          bg-[#020617]
          px-4
          py-5
          shadow-2xl
          shadow-black/20
          transition-transform
          duration-300
          lg:translate-x-0
          ${mobileOpen
            ? "translate-x-0"
            : "-translate-x-full"
          }
        `}
      >

        {/* =========================
            AMBIENT GLOW
        ========================= */}

        <div
          className="
            pointer-events-none
            absolute
            -left-20
            -top-20
            h-56
            w-56
            rounded-full
            bg-blue-600/10
            blur-3xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-24
            -right-24
            h-64
            w-64
            rounded-full
            bg-cyan-500/5
            blur-3xl
          "
        />



        {/* =========================
            LOGO
        ========================= */}

        <div
          className="
            relative
            flex
            items-center
            justify-between
            px-2
          "
        >

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-2xl
                border
                border-cyan-400/20
                bg-gradient-to-br
                from-blue-600
                to-cyan-400
                shadow-lg
                shadow-blue-500/20
              "
            >

              <Sparkles
                size={21}
                className="text-white"
              />

            </div>


            <div>

              <h1
                className="
                  text-lg
                  font-extrabold
                  tracking-tight
                  text-white
                "
              >

                SmartBank
                <span className="text-cyan-400">
                  AI
                </span>

              </h1>


              <p
                className="
                  mt-0.5
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.2em]
                  text-slate-500
                "
              >
                Digital Banking
              </p>

            </div>

          </div>



          {/* Mobile Close */}

          <button
            type="button"
            onClick={onClose}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              border
              border-white/10
              bg-white/[0.04]
              text-slate-400
              transition
              hover:bg-white/[0.08]
              hover:text-white
              lg:hidden
            "
          >

            <X size={18} />

          </button>

        </div>



        {/* =========================
            USER STATUS
        ========================= */}

        <div
          className="
            relative
            mt-7
            rounded-2xl
            border
            border-white/[0.08]
            bg-white/[0.035]
            p-3
          "
        >

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-gradient-to-br
                from-blue-500
                to-cyan-400
                text-sm
                font-bold
                text-white
                shadow-lg
                shadow-blue-500/10
              "
            >
              SB
            </div>


            <div className="min-w-0">

              <p
                className="
                  truncate
                  text-xs
                  font-semibold
                  text-white
                "
              >
                SmartBank User
              </p>

              <div
                className="
                  mt-1
                  flex
                  items-center
                  gap-1.5
                "
              >

                <span
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-emerald-400
                    shadow
                    shadow-emerald-400/70
                  "
                />

                <span
                  className="
                    text-[9px]
                    font-medium
                    uppercase
                    tracking-wider
                    text-slate-500
                  "
                >
                  Account Active
                </span>

              </div>

            </div>

          </div>

        </div>



        {/* =========================
            MAIN NAVIGATION
        ========================= */}

        <div className="relative mt-7">

          <p
            className="
              px-3
              text-[9px]
              font-bold
              uppercase
              tracking-[0.22em]
              text-slate-600
            "
          >
            Main Menu
          </p>


          <nav className="mt-3 space-y-1.5">

            {menu.map((item, index) => {

              const Icon = item.icon;


              return (

                <motion.div
                  key={item.name}
                  initial={{
                    opacity: 0,
                    x: -10,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    duration: 0.25,
                    delay: index * 0.04,
                  }}
                >

                  <NavLink
                    to={item.path}
                    onClick={handleNavigation}
                    className={({ isActive }) => `
                      group
                      relative
                      flex
                      items-center
                      gap-3
                      rounded-2xl
                      px-3
                      py-3
                      text-sm
                      font-medium
                      transition-all
                      duration-300

                      ${
                        isActive
                          ? `
                            border
                            border-blue-400/10
                            bg-gradient-to-r
                            from-blue-600/20
                            to-cyan-400/5
                            text-white
                            shadow-lg
                            shadow-blue-500/5
                          `
                          : `
                            border
                            border-transparent
                            text-slate-400
                            hover:border-white/[0.06]
                            hover:bg-white/[0.04]
                            hover:text-white
                          `
                      }
                    `}
                  >

                    {({ isActive }) => (

                      <>

                        {isActive && (

                          <motion.div
                            layoutId="sidebar-active"
                            className="
                              absolute
                              left-0
                              h-6
                              w-0.5
                              rounded-full
                              bg-gradient-to-b
                              from-blue-400
                              to-cyan-400
                            "
                          />

                        )}


                        <div
                          className={`
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            transition-all
                            duration-300

                            ${
                              isActive
                                ? `
                                  bg-gradient-to-br
                                  from-blue-500/20
                                  to-cyan-400/10
                                  text-cyan-400
                                `
                                : `
                                  bg-white/[0.025]
                                  text-slate-500
                                  group-hover:bg-white/[0.06]
                                  group-hover:text-cyan-400
                                `
                            }
                          `}
                        >

                          <Icon size={18} />

                        </div>


                        <span className="flex-1">
                          {item.name}
                        </span>


                        <ChevronRight
                          size={15}
                          className={`
                            transition-all
                            duration-300

                            ${
                              isActive
                                ? "translate-x-0 text-cyan-400 opacity-100"
                                : "-translate-x-1 text-slate-600 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                            }
                          `}
                        />

                      </>

                    )}

                  </NavLink>

                </motion.div>

              );

            })}

          </nav>

        </div>



        {/* =========================
            SECONDARY MENU
        ========================= */}

        <div className="relative mt-7">

          <p
            className="
              px-3
              text-[9px]
              font-bold
              uppercase
              tracking-[0.22em]
              text-slate-600
            "
          >
            Personal
          </p>


          <nav className="mt-3 space-y-1.5">

            {secondaryMenu.map((item) => {

              const Icon = item.icon;


              return (

                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={handleNavigation}
                  className={({ isActive }) => `
                    group
                    flex
                    items-center
                    gap-3
                    rounded-2xl
                    border
                    px-3
                    py-3
                    text-sm
                    font-medium
                    transition-all
                    duration-300

                    ${
                      isActive
                        ? `
                          border-white/[0.08]
                          bg-white/[0.06]
                          text-white
                        `
                        : `
                          border-transparent
                          text-slate-400
                          hover:border-white/[0.06]
                          hover:bg-white/[0.04]
                          hover:text-white
                        `
                    }
                  `}
                >

                  <div
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-xl
                      bg-white/[0.025]
                      text-slate-500
                      transition
                      group-hover:bg-white/[0.06]
                      group-hover:text-cyan-400
                    "
                  >

                    <Icon size={18} />

                  </div>


                  <span>
                    {item.name}
                  </span>

                </NavLink>

              );

            })}

          </nav>

        </div>



        {/* =========================
            AI CARD
        ========================= */}

        <div
          className="
            relative
            mt-auto
            overflow-hidden
            rounded-2xl
            border
            border-cyan-400/10
            bg-gradient-to-br
            from-blue-600/10
            via-cyan-400/5
            to-transparent
            p-4
          "
        >

          <div
            className="
              pointer-events-none
              absolute
              -right-8
              -top-8
              h-24
              w-24
              rounded-full
              bg-cyan-400/10
              blur-2xl
            "
          />


          <div
            className="
              relative
              flex
              items-center
              gap-2
            "
          >

            <Sparkles
              size={15}
              className="text-cyan-400"
            />

            <span
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.15em]
                text-cyan-400
              "
            >
              SmartBank AI
            </span>

          </div>


          <p
            className="
              relative
              mt-2
              text-[11px]
              leading-5
              text-slate-500
            "
          >
            Your intelligent financial assistant is ready.
          </p>

        </div>



        {/* =========================
            LOGOUT
        ========================= */}

        <button
          type="button"
          onClick={handleLogout}
          className="
            group
            relative
            mt-3
            flex
            w-full
            items-center
            gap-3
            rounded-2xl
            border
            border-transparent
            px-3
            py-3
            text-sm
            font-medium
            text-slate-500
            transition-all
            duration-300
            hover:border-red-400/10
            hover:bg-red-400/[0.05]
            hover:text-red-400
          "
        >

          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              bg-white/[0.025]
              transition
              group-hover:bg-red-400/10
            "
          >

            <LogOut size={18} />

          </div>


          <span>
            Logout
          </span>

        </button>


      </aside>

    </>

  );

};


export default Sidebar;