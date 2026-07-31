import { motion } from "framer-motion";

import {
  ShieldCheck,
  TrendingUp,
  Wallet,
  Lock
} from "lucide-react";



const FinancialScore = () => {

  const stats = [

    {
      title: "Saving Score",
      value: "92%",
      icon: <Wallet size={20} />,
      color: "text-green-400",
      bg: "bg-green-400/10"
    },

    {
      title: "Spending Control",
      value: "85%",
      icon: <TrendingUp size={20} />,
      color: "text-cyan-400",
      bg: "bg-cyan-400/10"
    },

    {
      title: "Security Score",
      value: "95%",
      icon: <Lock size={20} />,
      color: "text-blue-400",
      bg: "bg-blue-400/10"
    }

  ];



  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 30
      }}

      animate={{
        opacity: 1,
        y: 0
      }}

      transition={{
        duration: 0.6
      }}

      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-white/[0.05]
        p-6
        text-white
        shadow-xl
        shadow-black/10
        backdrop-blur-xl
        transition-all
        duration-300
        hover:border-green-400/20
      "

    >

      {/* Background Glow */}

      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-48
          w-48
          rounded-full
          bg-green-500/10
          blur-3xl
          transition
          duration-500
          group-hover:scale-125
        "
      />



      {/* Header */}

      <div
        className="
          relative
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
            border-green-400/10
            bg-green-400/10
          "
        >

          <ShieldCheck
            size={22}
            className="text-green-400"
          />

        </div>


        <div>

          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.18em]
              text-green-400
            "
          >
            AI Assessment
          </p>

          <h2
            className="
              mt-1
              text-2xl
              font-bold
              tracking-tight
            "
          >
            Financial Health
          </h2>

        </div>

      </div>



      {/* Score */}

      <div className="relative mt-8 flex justify-center">

        <div
          className="
            relative
            flex
            h-44
            w-44
            items-center
            justify-center
            rounded-full
            bg-gradient-to-r
            from-green-400
            via-cyan-400
            to-blue-500
            p-[5px]
            shadow-lg
            shadow-cyan-500/10
          "
        >

          <div
            className="
              flex
              h-full
              w-full
              flex-col
              items-center
              justify-center
              rounded-full
              bg-slate-950
            "
          >

            <motion.h1

              initial={{
                scale: 0
              }}

              animate={{
                scale: 1
              }}

              transition={{
                duration: 0.5
              }}

              className="
                text-5xl
                font-extrabold
                tracking-tight
              "
            >
              87
            </motion.h1>


            <p
              className="
                mt-1
                text-sm
                text-slate-500
              "
            >
              /100
            </p>

          </div>

        </div>

      </div>



      {/* Status */}

      <div className="mt-6 text-center">

        <div
          className="
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-green-400/10
            bg-green-400/10
            px-4
            py-2
            text-sm
            font-semibold
            text-green-400
          "
        >

          <span
            className="
              h-2
              w-2
              rounded-full
              bg-green-400
            "
          />

          Excellent Financial Health

        </div>

      </div>



      {/* Description */}

      <p
        className="
          relative
          mx-auto
          mt-4
          max-w-md
          text-center
          text-sm
          leading-6
          text-slate-400
        "
      >
        Your financial habits are improving. SmartBank AI
        recommends maintaining your current savings strategy.
      </p>



      {/* Breakdown */}

      <div
        className="
          relative
          mt-8
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-3
        "
      >

        {stats.map((item, index) => (

          <motion.div

            key={index}

            whileHover={{
              y: -5
            }}

            transition={{
              duration: 0.3
            }}

            className="
              rounded-2xl
              border
              border-white/10
              bg-white/[0.04]
              p-4
              transition
              duration-300
              hover:border-white/15
              hover:bg-white/[0.07]
            "
          >

            <div
              className={`
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                ${item.bg}
                ${item.color}
              `}
            >
              {item.icon}
            </div>


            <h3
              className="
                mt-4
                text-xs
                font-medium
                text-slate-400
              "
            >
              {item.title}
            </h3>


            <p
              className="
                mt-2
                text-2xl
                font-bold
                text-white
              "
            >
              {item.value}
            </p>

          </motion.div>

        ))}

      </div>

    </motion.div>

  );

};


export default FinancialScore;