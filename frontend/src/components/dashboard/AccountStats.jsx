import { motion } from "framer-motion";
import {
Wallet,
CreditCard,
Landmark,
Star,
ArrowUpRight,
} from "lucide-react";
import { useEffect, useState } from "react";

import api from "../../services/api";

const AccountStats = ({
accounts: accountsProp = 0,
creditScore = 0,
loans = 0,
rewards = 0,
}) => {
const [accounts, setAccounts] = useState(accountsProp);
const [loading, setLoading] = useState(true);

// ==========================================
// FETCH ACCOUNTS
// ==========================================

useEffect(() => {
let mounted = true;

const fetchAccounts = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      if (mounted) {
        setAccounts(0);
        setLoading(false);
      }

      return;
    }

    if (mounted) {
      setLoading(true);
    }

    const response = await api.get("/accounts");

    if (!mounted) {
      return;
    }

    const responseData = response?.data;

    if (!responseData?.success) {
      setAccounts(0);
      return;
    }

    const data = responseData?.data;

    if (Array.isArray(data)) {
      setAccounts(data.length);
      return;
    }

    if (data && typeof data === "object") {
      setAccounts(1);
      return;
    }

    setAccounts(0);
  } catch (error) {
    console.error(
      "ACCOUNT STATS ERROR:",
      error?.response?.data ||
        error?.message ||
        error
    );

    if (mounted) {
      setAccounts(0);
    }
  } finally {
    if (mounted) {
      setLoading(false);
    }
  }
};

fetchAccounts();

// ==========================================
// REFRESH AFTER DASHBOARD UPDATE
// ==========================================

const handleDashboardUpdate = () => {
  fetchAccounts();
};

window.addEventListener(
  "dashboardUpdated",
  handleDashboardUpdate
);

return () => {
  mounted = false;

  window.removeEventListener(
    "dashboardUpdated",
    handleDashboardUpdate
  );
};

}, []);

// ==========================================
// DISPLAY VALUES
// ==========================================

const accountCount = loading
? "--"
: String(accounts).padStart(2, "0");

const formattedCreditScore =
creditScore || "N/A";

const creditDescription =
creditScore >= 750
? "Excellent"
: creditScore > 0
? "Needs Improvement"
: "Not available";

const loanCount = Number(loans) || 0;

const formattedLoans =
String(loanCount).padStart(2, "0");

const rewardPoints = Number(rewards) || 0;

const stats = [
{
title: "Total Accounts",
value: accountCount,
icon: Wallet,
desc: "Active accounts",
accent: "from-blue-500/20 to-cyan-400/10",
iconColor: "text-cyan-300",
glow: "bg-cyan-400/10",
},
{
title: "Credit Score",
value: formattedCreditScore,
icon: CreditCard,
desc: creditDescription,
accent:
"from-violet-500/20 to-fuchsia-400/10",
iconColor: "text-violet-300",
glow: "bg-violet-400/10",
},
{
title: "Active Loans",
value: formattedLoans,
icon: Landmark,
desc:
loanCount > 0
? "Running"
: "No active loans",
accent:
"from-emerald-500/20 to-green-400/10",
iconColor: "text-emerald-300",
glow: "bg-emerald-400/10",
},
{
title: "Reward Points",
value: rewardPoints.toLocaleString("en-IN"),
icon: Star,
desc: "Available",
accent:
"from-amber-500/20 to-orange-400/10",
iconColor: "text-amber-300",
glow: "bg-amber-400/10",
},
];

return (
<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
{stats.map((item, index) => {
const Icon = item.icon;

    return (
      <motion.div
        key={item.title}
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.45,
          delay: index * 0.08,
        }}
        whileHover={{
          y: -5,
        }}
        className="
          group
          relative
          min-h-[175px]
          overflow-hidden
          rounded-[26px]
          border
          border-white/[0.08]
          bg-white/[0.035]
          p-5
          text-white
          shadow-xl
          shadow-black/10
          backdrop-blur-2xl
          transition-all
          duration-500
          hover:border-white/[0.15]
          hover:bg-white/[0.055]
        "
      >
        {/* Glow */}

        <div
          className={`
            pointer-events-none
            absolute
            -right-16
            -top-16
            h-36
            w-36
            rounded-full
            ${item.glow}
            blur-[50px]
            transition-all
            duration-700
            group-hover:scale-125
          `}
        />

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-br
            from-white/[0.04]
            via-transparent
            to-transparent
          "
        />

        {/* Header */}

        <div
          className="
            relative
            z-10
            flex
            items-start
            justify-between
          "
        >
          <div
            className={`
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-[17px]
              border
              border-white/10
              bg-gradient-to-br
              ${item.accent}
              ${item.iconColor}
            `}
          >
            <Icon
              size={21}
              strokeWidth={1.8}
            />
          </div>

          <div
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              border
              border-white/[0.07]
              bg-white/[0.025]
              text-slate-500
              transition
              group-hover:text-cyan-300
            "
          >
            <ArrowUpRight size={15} />
          </div>
        </div>

        {/* Content */}

        <div
          className="
            relative
            z-10
            mt-6
          "
        >
          <h3
            className="
              text-3xl
              font-extrabold
              tracking-tight
            "
          >
            {item.value}
          </h3>

          <p
            className="
              mt-1
              text-sm
              font-semibold
              text-slate-200
            "
          >
            {item.title}
          </p>

          <div
            className="
              mt-3
              flex
              items-center
              gap-2
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-emerald-400
              "
            />

            <span
              className="
                text-[10px]
                uppercase
                tracking-[0.12em]
                text-slate-500
              "
            >
              {item.desc}
            </span>
          </div>
        </div>

        {/* Bottom Glow */}

        <div
          className="
            absolute
            bottom-0
            left-1/2
            h-px
            w-0
            -translate-x-1/2
            bg-gradient-to-r
            from-transparent
            via-cyan-400/60
            to-transparent
            transition-all
            duration-700
            group-hover:w-[70%]
          "
        />
      </motion.div>
    );
  })}
</div>

);
};

export default AccountStats;