
import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  useState,
  useEffect
} from "react";

import {
  User,
  LogOut,
  BrainCircuit
} from "lucide-react";


const Navbar = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);


  // =========================
  // LOAD USER
  // =========================

  useEffect(() => {

    const loadUser = () => {

      const storedUser =
        localStorage.getItem("user");

      if (storedUser) {

        try {

          setUser(
            JSON.parse(storedUser)
          );

        } catch (error) {

          setUser(null);

        }

      } else {

        setUser(null);

      }

    };


    loadUser();


    window.addEventListener(
      "userUpdated",
      loadUser
    );


    return () => {

      window.removeEventListener(
        "userUpdated",
        loadUser
      );

    };

  }, []);


  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setOpen(false);

    window.dispatchEvent(
      new Event("userUpdated")
    );

    navigate("/");

  };


  // =========================
// AI NAVIGATION
// =========================

const handleAI = () => {

  setOpen(false);


  // Current page Home hai

  if (window.location.pathname === "/") {


    const aiSection =
      document.getElementById("ai");


    if (aiSection) {

      aiSection.scrollIntoView({

        behavior: "smooth",

        block: "start"

      });

    }


    return;

  }



  // Dashboard ya kisi aur page se

  navigate("/");


  setTimeout(() => {


    const aiSection =
      document.getElementById("ai");



    if (aiSection) {


      aiSection.scrollIntoView({

        behavior: "smooth",

        block: "start"

      });


    }


  }, 800);



};

  // =========================
  // USER DATA
  // =========================

  const userName =
    user?.name ||
    user?.fullName ||
    "User";


  const avatar =
    userName
      .charAt(0)
      .toUpperCase();


  return (

    <nav
      className="
        fixed
        left-0
        right-0
        top-0
        z-50
        w-full
        border-b
        border-white/10
        bg-[#020617]/90
        backdrop-blur-xl
      "
    >

      <div
        className="
          mx-auto
          flex
          h-[76px]
          max-w-[1400px]
          items-center
          px-6
          sm:px-8
        "
      >

        {/* LOGO */}

        <Link
          to="/"
          className="
            whitespace-nowrap
            text-2xl
            font-bold
            tracking-tight
          "
        >

          <span className="text-white">
            🛡 SmartBank
          </span>

          <span className="text-cyan-400">
            AI
          </span>

        </Link>


        {/* PUBLIC NAVIGATION */}

        {!user && (

          <div
            className="
              hidden
              flex-1
              items-center
              justify-center
              gap-8
              lg:flex
            "
          >

            <a
              href="#home"
              className="
                text-sm
                font-medium
                text-slate-300
                transition
                hover:text-white
              "
            >
              Home
            </a>


            <a
              href="#features"
              className="
                text-sm
                font-medium
                text-slate-300
                transition
                hover:text-cyan-400
              "
            >
              Features
            </a>


            <a
              href="#security"
              className="
                text-sm
                font-medium
                text-slate-300
                transition
                hover:text-cyan-400
              "
            >
              Security
            </a>


            {/* AI */}

            <button
              type="button"
              onClick={handleAI}
              className="
                group
                flex
                cursor-pointer
                items-center
                gap-1.5
                text-sm
                font-medium
                text-slate-300
                transition
                hover:text-cyan-400
              "
            >

              <BrainCircuit
                size={17}
                className="
                  transition
                  group-hover:scale-110
                "
              />

              AI

            </button>


            <a
              href="#analytics"
              className="
                text-sm
                font-medium
                text-slate-300
                transition
                hover:text-cyan-400
              "
            >
              Analytics
            </a>


            <a
              href="#pricing"
              className="
                text-sm
                font-medium
                text-slate-300
                transition
                hover:text-cyan-400
              "
            >
              Pricing
            </a>

          </div>

        )}


        {/* LOGGED IN NAVIGATION */}

        {user && (

          <div
            className="
              hidden
              flex-1
              items-center
              justify-center
              gap-7
              lg:flex
            "
          >

            <Link
              to="/dashboard"
              className="
                text-sm
                text-slate-300
                transition
                hover:text-cyan-400
              "
            >
              Dashboard
            </Link>


            <Link
              to="/accounts"
              className="
                text-sm
                text-slate-300
                transition
                hover:text-cyan-400
              "
            >
              Accounts
            </Link>


            <Link
              to="/transactions"
              className="
                text-sm
                text-slate-300
                transition
                hover:text-cyan-400
              "
            >
              Transactions
            </Link>


            <Link
              to="/cards"
              className="
                text-sm
                text-slate-300
                transition
                hover:text-cyan-400
              "
            >
              Cards
            </Link>


            <Link
              to="/loans"
              className="
                text-sm
                text-slate-300
                transition
                hover:text-cyan-400
              "
            >
              Loans
            </Link>


            <Link
              to="/notifications"
              className="
                text-sm
                text-slate-300
                transition
                hover:text-cyan-400
              "
            >
              Notifications
            </Link>

          </div>

        )}


        {/* RIGHT SIDE */}

        <div
          className="
            ml-auto
            flex
            items-center
            gap-5
          "
        >

          {/* LOGGED OUT */}

          {!user && (

            <>

              <Link
                to="/login"
                className="
                  hidden
                  text-sm
                  font-medium
                  text-slate-300
                  transition
                  hover:text-white
                  sm:block
                "
              >
                Login
              </Link>


              <Link
                to="/signup"
                className="
                  rounded-xl
                  bg-gradient-to-r
                  from-blue-600
                  to-cyan-400
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-blue-500/20
                  transition
                  hover:scale-105
                "
              >
                Let's Start →
              </Link>

            </>

          )}


          {/* LOGGED IN */}

          {user && (

            <div className="relative">

              <button
                type="button"
                onClick={() =>
                  setOpen(!open)
                }
                className="
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  px-2
                  py-1
                  transition
                  hover:bg-white/5
                "
              >

                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-gradient-to-br
                    from-blue-600
                    to-cyan-400
                    font-bold
                    text-white
                  "
                >
                  {avatar}
                </div>


                <span
                  className="
                    hidden
                    font-medium
                    text-white
                    md:block
                  "
                >
                  {userName}
                </span>

              </button>


              {/* DROPDOWN */}

              {open && (

                <div
                  className="
                    absolute
                    right-0
                    top-14
                    w-48
                    rounded-xl
                    border
                    border-white/10
                    bg-slate-900
                    p-2
                    shadow-2xl
                  "
                >

                  <Link
                    to="/profile"
                    onClick={() =>
                      setOpen(false)
                    }
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-lg
                      px-4
                      py-3
                      text-white
                      transition
                      hover:bg-white/10
                    "
                  >

                    <User size={17} />

                    Profile

                  </Link>


                  <button
                    type="button"
                    onClick={handleLogout}
                    className="
                      flex
                      w-full
                      items-center
                      gap-2
                      rounded-lg
                      px-4
                      py-3
                      text-red-400
                      transition
                      hover:bg-red-500/10
                    "
                  >

                    <LogOut size={17} />

                    Logout

                  </button>

                </div>

              )}

            </div>

          )}

        </div>

      </div>

    </nav>

  );

};


export default Navbar;

