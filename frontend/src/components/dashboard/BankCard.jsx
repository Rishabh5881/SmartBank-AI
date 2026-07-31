import { motion } from "framer-motion";

import {
Wifi,
CreditCard,
ShieldCheck
} from "lucide-react";

import { useEffect, useState } from "react";

import axios from "axios";

const BankCard = () => {

const [user, setUser] = useState(null);

const [account, setAccount] = useState(null);

const [loading, setLoading] = useState(true);

// =========================
// LOAD LOGGED IN USER
// =========================

useEffect(() => {


const loadUser = () => {

  const storedUser =
    localStorage.getItem("user");

  if (storedUser) {

    try {

      setUser(JSON.parse(storedUser));

    } catch (error) {

      console.log(
        "BANK CARD USER ERROR:",
        error
      );

    }

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
// FETCH ACCOUNT
// =========================

useEffect(() => {


const fetchAccount = async () => {

  try {

    const token =
      localStorage.getItem("token");


    if (!token) {

      console.log(
        "BANK CARD: TOKEN NOT FOUND"
      );

      setLoading(false);

      return;

    }


    const response = await axios.get(
      "http://localhost:5000/api/v1/accounts",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );


    console.log(
      "BANK CARD ACCOUNT DATA:",
      response.data
    );


    if (
      response.data?.success &&
      response.data?.data?.length > 0
    ) {

      // Primary / first account

      setAccount(
        response.data.data[0]
      );

    }

  } catch (error) {

    console.error(
      "BANK CARD ACCOUNT ERROR:",
      error
    );

  } finally {

    setLoading(false);

  }

};


fetchAccount();

}, []);

// =========================
// USER NAME
// =========================

const userName =
user?.fullName ||
user?.name ||
"SMARTBANK USER";

// =========================
// ACCOUNT DATA
// =========================

const accountNumber =
account?.accountNumber ||
"•••• •••• ••••";

const accountType =
account?.accountType ||
"SAVINGS";

const currency =
account?.currency ||
"INR";

const balance =
account?.balance != null
? Number(account.balance)
: 0;

// =========================
// FORMAT ACCOUNT NUMBER
// =========================

const formattedAccountNumber =
accountNumber.length >= 4
? `•••• •••• ${accountNumber.slice(-4)}`
: accountNumber;

// =========================
// FORMAT BALANCE
// =========================

const formattedBalance =
balance.toLocaleString(
"en-IN"
);

return (


<motion.div

  initial={{
    opacity: 0,
    y: 20
  }}

  animate={{
    opacity: 1,
    y: 0
  }}

  whileHover={{
    scale: 1.02,
    y: -4
  }}

  transition={{
    duration: 0.4,
    ease: "easeOut"
  }}

  className="
    group
    relative
    h-72
    w-full
    overflow-hidden
    rounded-[28px]
    border
    border-white/20
    bg-gradient-to-br
    from-blue-700
    via-cyan-500
    to-indigo-700
    p-6
    text-white
    shadow-2xl
    shadow-blue-500/25
    transition-shadow
    duration-500
    hover:shadow-cyan-500/30
    sm:p-7
  "
>

  {/* =========================
      BACKGROUND GLOW
  ========================= */}

  <div
    className="
      pointer-events-none
      absolute
      -right-24
      -top-24
      h-64
      w-64
      rounded-full
      bg-white/20
      blur-3xl
      transition
      duration-500
      group-hover:scale-125
    "
  />

  <div
    className="
      pointer-events-none
      absolute
      -bottom-28
      -left-20
      h-56
      w-56
      rounded-full
      bg-blue-400/20
      blur-3xl
    "
  />


  {/* =========================
      SHINE
  ========================= */}

  <div
    className="
      pointer-events-none
      absolute
      inset-0
      bg-gradient-to-br
      from-white/10
      via-transparent
      to-transparent
    "
  />


  <div
    className="
      relative
      z-10
      flex
      h-full
      flex-col
      justify-between
    "
  >


    {/* =========================
        TOP SECTION
    ========================= */}

    <div>

      <div
        className="
          flex
          items-center
          justify-between
        "
      >

        <div className="flex items-center gap-3">

          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-white/20
              bg-white/10
              backdrop-blur-md
            "
          >

            <CreditCard
              size={20}
            />

          </div>


          <div>

            <p
              className="
                text-[10px]
                font-medium
                uppercase
                tracking-[0.2em]
                text-white/60
              "
            >
              Digital Banking
            </p>

            <h2
              className="
                text-xl
                font-bold
                tracking-wide
                sm:text-2xl
              "
            >
              SmartBank AI
            </h2>

          </div>

        </div>


        <div
          className="
            text-xl
            font-black
            italic
            tracking-wider
          "
        >
          VISA
        </div>

      </div>


      {/* =========================
          CHIP
      ========================= */}

      <div
        className="
          mt-7
          flex
          items-center
          gap-4
        "
      >

        <div
          className="
            relative
            flex
            h-11
            w-14
            items-center
            justify-center
            overflow-hidden
            rounded-xl
            border
            border-yellow-200/40
            bg-gradient-to-br
            from-yellow-200
            to-yellow-500
            shadow-lg
          "
        >

          <div
            className="
              absolute
              inset-1
              rounded-lg
              border
              border-yellow-700/30
            "
          />

          <div
            className="
              absolute
              h-px
              w-full
              bg-yellow-700/30
            "
          />

          <div
            className="
              absolute
              h-full
              w-px
              bg-yellow-700/30
            "
          />

          <span
            className="
              relative
              text-sm
              text-yellow-800
            "
          >
            ▦
          </span>

        </div>


        <Wifi
          size={27}
          className="
            rotate-90
            text-white/90
          "
        />

      </div>


      {/* =========================
          ACCOUNT NUMBER
      ========================= */}

      <div className="mt-5">

        <div
          className="
            flex
            items-center
            justify-between
            gap-3
          "
        >

          <p
            className="
              text-[10px]
              uppercase
              tracking-[0.25em]
              text-white/50
            "
          >
            Account Number
          </p>

          <span
            className="
              rounded-full
              border
              border-white/15
              bg-white/10
              px-2.5
              py-1
              text-[9px]
              font-semibold
              uppercase
              tracking-wider
              text-white/80
            "
          >
            {accountType}
          </span>

        </div>


        <h1
          className="
            mt-1
            whitespace-nowrap
            text-xl
            font-semibold
            tracking-[0.22em]
            sm:text-2xl
            sm:tracking-[0.25em]
          "
        >
          {loading
            ? "•••• •••• ••••"
            : formattedAccountNumber}
        </h1>


        <p
          className="
            mt-1
            text-[10px]
            font-medium
            text-white/60
          "
        >
          {currency} • Available Balance ₹
          {loading
            ? "..."
            : formattedBalance}
        </p>

      </div>

    </div>


    {/* =========================
        BOTTOM DETAILS
    ========================= */}

    <div
      className="
        flex
        items-end
        justify-between
      "
    >

      {/* CARD HOLDER */}

      <div>

        <p
          className="
            text-[9px]
            uppercase
            tracking-[0.2em]
            text-white/60
          "
        >
          Account Holder
        </p>

        <h3
          className="
            mt-1
            max-w-[180px]
            truncate
            text-sm
            font-bold
            uppercase
            tracking-wider
            sm:text-base
          "
        >
          {userName}
        </h3>

      </div>


      {/* ACCOUNT STATUS */}

      <div>

        <p
          className="
            text-[9px]
            uppercase
            tracking-[0.2em]
            text-white/60
          "
        >
          Status
        </p>

        <h3
          className="
            mt-1
            text-sm
            font-bold
            tracking-wider
            text-green-300
            sm:text-base
          "
        >
          {account?.status || "ACTIVE"}
        </h3>

      </div>


      {/* SECURITY */}

      <div
        className="
          hidden
          items-center
          gap-1.5
          rounded-full
          border
          border-white/15
          bg-white/10
          px-3
          py-1.5
          backdrop-blur-md
          sm:flex
        "
      >

        <ShieldCheck
          size={13}
          className="text-green-300"
        />

        <span
          className="
            text-[9px]
            font-medium
            uppercase
            tracking-wider
            text-white/80
          "
        >
          Secured
        </span>

      </div>

    </div>

  </div>

</motion.div>


);

};

export default BankCard;
