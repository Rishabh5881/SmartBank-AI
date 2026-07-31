import { motion } from "framer-motion";

import {
  Wallet,
  CreditCard,
  Landmark,
  Star
} from "lucide-react";



const AccountStats = () => {

  const stats = [

    {
      title: "Total Accounts",
      value: "02",
      icon: Wallet,
      desc: "Active accounts"
    },

    {
      title: "Credit Score",
      value: "780",
      icon: CreditCard,
      desc: "Excellent"
    },

    {
      title: "Active Loans",
      value: "01",
      icon: Landmark,
      desc: "Running"
    },

    {
      title: "Reward Points",
      value: "12,450",
      icon: Star,
      desc: "Available"
    }

  ];



  return (

    <div
      className="
        grid
        gap-5
        sm:grid-cols-2
        xl:grid-cols-4
      "
    >

      {stats.map((item, index) => {

        const Icon = item.icon;

        return (

          <motion.div

            key={index}

            initial={{
              opacity: 0,
              y: 20
            }}

            animate={{
              opacity: 1,
              y: 0
            }}

            transition={{
              duration: 0.45,
              delay: index * 0.08,
              ease: "easeOut"
            }}

            whileHover={{
              y: -5
            }}

            className="
              group
              relative
              overflow-hidden
              rounded-3xl
              border
              border-white/10
              bg-white/[0.05]
              p-5
              text-white
              shadow-xl
              shadow-black/10
              backdrop-blur-xl
              transition-all
              duration-300
              hover:border-cyan-400/20
              hover:bg-white/[0.07]
              hover:shadow-cyan-500/10
            "
          >

            {/* Card Glow */}

            <div
              className="
                pointer-events-none
                absolute
                -right-10
                -top-10
                h-24
                w-24
                rounded-full
                bg-blue-500/10
                blur-2xl
                transition
                duration-500
                group-hover:scale-150
              "
            />


            {/* Icon */}

            <div
              className="
                relative
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                border
                border-blue-400/10
                bg-gradient-to-br
                from-blue-500/20
                to-cyan-400/10
                text-cyan-400
                transition
                duration-300
                group-hover:scale-110
                group-hover:from-blue-500/30
                group-hover:to-cyan-400/20
              "
            >

              <Icon size={22} />

            </div>



            {/* Value */}

            <div className="relative mt-6">

              <h3
                className="
                  text-3xl
                  font-bold
                  tracking-tight
                  text-white
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
                  mt-2
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
                    bg-green-400
                    shadow-sm
                    shadow-green-400/50
                  "
                />

                <p
                  className="
                    text-xs
                    text-slate-400
                  "
                >
                  {item.desc}
                </p>

              </div>

            </div>

          </motion.div>

        );

      })}

    </div>

  );

};


export default AccountStats;