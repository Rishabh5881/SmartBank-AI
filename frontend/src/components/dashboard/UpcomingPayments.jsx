import { motion } from "framer-motion";

import {
  Home,
  CreditCard,
  Zap,
  CalendarClock,
  ArrowRight
} from "lucide-react";



const UpcomingPayments = () => {

  const payments = [

    {
      title: "Home Loan EMI",
      amount: "$850",
      date: "28 July",
      status: "Due Soon",
      icon: <Home size={21} />,
      color: "text-blue-400",
      statusColor: "text-yellow-400 bg-yellow-500/10 border-yellow-400/10"
    },

    {
      title: "Credit Card Bill",
      amount: "$320",
      date: "30 July",
      status: "Upcoming",
      icon: <CreditCard size={21} />,
      color: "text-purple-400",
      statusColor: "text-cyan-400 bg-cyan-500/10 border-cyan-400/10"
    },

    {
      title: "Electricity Bill",
      amount: "$80",
      date: "2 August",
      status: "Scheduled",
      icon: <Zap size={21} />,
      color: "text-yellow-400",
      statusColor: "text-green-400 bg-green-500/10 border-green-400/10"
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
        duration: 0.5
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
        hover:border-cyan-400/20
      "

    >

      {/* Background Glow */}

      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-44
          w-44
          rounded-full
          bg-cyan-500/10
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
            border-cyan-400/10
            bg-cyan-400/10
          "
        >

          <CalendarClock
            size={22}
            className="text-cyan-400"
          />

        </div>


        <div>

          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.18em]
              text-cyan-400
            "
          >
            Payment Schedule
          </p>

          <h2
            className="
              mt-1
              text-2xl
              font-bold
              tracking-tight
            "
          >
            Upcoming Payments
          </h2>

        </div>

      </div>



      {/* Payments */}

      <div className="relative mt-6 space-y-3">

        {payments.map((payment, index) => (

          <motion.div

            key={index}

            whileHover={{
              y: -3
            }}

            transition={{
              duration: 0.25
            }}

            className="
              flex
              items-center
              justify-between
              gap-4
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

            {/* Left */}

            <div
              className="
                flex
                min-w-0
                items-center
                gap-4
              "
            >

              <div
                className={`
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-white/[0.06]
                  ${payment.color}
                `}
              >
                {payment.icon}
              </div>


              <div className="min-w-0">

                <h3
                  className="
                    truncate
                    text-sm
                    font-semibold
                    text-white
                  "
                >
                  {payment.title}
                </h3>


                <p
                  className="
                    mt-1
                    text-xs
                    text-slate-500
                  "
                >
                  Due {payment.date}
                </p>

              </div>

            </div>



            {/* Right */}

            <div className="shrink-0 text-right">

              <h3
                className="
                  text-lg
                  font-bold
                  text-white
                "
              >
                {payment.amount}
              </h3>


              <span
                className={`
                  mt-1
                  inline-flex
                  items-center
                  rounded-full
                  border
                  px-2.5
                  py-1
                  text-[10px]
                  font-semibold
                  ${payment.statusColor}
                `}
              >
                {payment.status}
              </span>

            </div>

          </motion.div>

        ))}

      </div>



      {/* View All */}

      <button
        type="button"
        className="
          group/button
          relative
          mt-6
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-xl
          border
          border-blue-500/20
          bg-gradient-to-r
          from-blue-600
          to-cyan-400
          py-3
          text-sm
          font-semibold
          text-white
          shadow-lg
          shadow-blue-500/10
          transition-all
          duration-300
          hover:-translate-y-0.5
          hover:shadow-blue-500/25
        "
      >

        View All Payments

        <ArrowRight
          size={17}
          className="
            transition
            duration-300
            group-hover/button:translate-x-1
          "
        />

      </button>

    </motion.div>

  );

};


export default UpcomingPayments;