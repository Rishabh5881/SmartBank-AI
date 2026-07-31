import { useState } from "react";

import { motion } from "framer-motion";

import {
  Calculator,
  Sparkles,
  DollarSign,
  Percent,
  CalendarDays
} from "lucide-react";



const LoanCalculator = () => {

  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(5);



  const monthlyRate = rate / 12 / 100;
  const months = years * 12;



  const emi =
    monthlyRate > 0
      ? amount *
        monthlyRate *
        Math.pow(1 + monthlyRate, months) /
        (
          Math.pow(1 + monthlyRate, months) - 1
        )
      : amount / months;



  const totalPayment = emi * months;
  const interest = totalPayment - amount;



  const formatMoney = (value) => {

    return new Intl.NumberFormat(
      "en-US",
      {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
      }
    ).format(value);

  };



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
          h-48
          w-48
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

          <Calculator
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
            Smart Finance Tool
          </p>

          <h2
            className="
              mt-1
              text-2xl
              font-bold
              tracking-tight
            "
          >
            Loan Calculator
          </h2>

        </div>

      </div>



      {/* Inputs */}

      <div className="relative mt-7 space-y-5">

        {/* Loan Amount */}

        <div>

          <label
            className="
              flex
              items-center
              gap-2
              text-sm
              font-medium
              text-slate-400
            "
          >

            <DollarSign
              size={15}
              className="text-cyan-400"
            />

            Loan Amount

          </label>


          <input

            type="number"

            value={amount}

            onChange={(e) =>
              setAmount(Number(e.target.value))
            }

            className="
              mt-2
              w-full
              rounded-xl
              border
              border-white/10
              bg-slate-900/60
              px-4
              py-3
              text-white
              outline-none
              transition
              focus:border-cyan-400/50
              focus:bg-slate-900/80
              focus:ring-2
              focus:ring-cyan-400/10
            "

          />

        </div>



        {/* Interest Rate */}

        <div>

          <label
            className="
              flex
              items-center
              gap-2
              text-sm
              font-medium
              text-slate-400
            "
          >

            <Percent
              size={15}
              className="text-cyan-400"
            />

            Interest Rate

          </label>


          <div className="relative">

            <input

              type="number"

              value={rate}

              onChange={(e) =>
                setRate(Number(e.target.value))
              }

              className="
                mt-2
                w-full
                rounded-xl
                border
                border-white/10
                bg-slate-900/60
                px-4
                py-3
                pr-12
                text-white
                outline-none
                transition
                focus:border-cyan-400/50
                focus:bg-slate-900/80
                focus:ring-2
                focus:ring-cyan-400/10
              "

            />

            <span
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-sm
                text-slate-500
              "
            >
              %
            </span>

          </div>

        </div>



        {/* Tenure */}

        <div>

          <label
            className="
              flex
              items-center
              gap-2
              text-sm
              font-medium
              text-slate-400
            "
          >

            <CalendarDays
              size={15}
              className="text-cyan-400"
            />

            Loan Tenure

          </label>


          <div className="relative">

            <input

              type="number"

              value={years}

              onChange={(e) =>
                setYears(Number(e.target.value))
              }

              className="
                mt-2
                w-full
                rounded-xl
                border
                border-white/10
                bg-slate-900/60
                px-4
                py-3
                pr-16
                text-white
                outline-none
                transition
                focus:border-cyan-400/50
                focus:bg-slate-900/80
                focus:ring-2
                focus:ring-cyan-400/10
              "

            />

            <span
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-sm
                text-slate-500
              "
            >
              Years
            </span>

          </div>

        </div>

      </div>



      {/* Results */}

      <div
        className="
          relative
          mt-8
          grid
          gap-4
          md:grid-cols-3
        "
      >

        {/* EMI */}

        <div
          className="
            rounded-2xl
            border
            border-blue-400/10
            bg-gradient-to-br
            from-blue-600/20
            to-blue-400/5
            p-4
          "
        >

          <p
            className="
              text-xs
              font-medium
              text-slate-400
            "
          >
            Monthly EMI
          </p>


          <h2
            className="
              mt-2
              text-xl
              font-bold
              text-white
              sm:text-2xl
            "
          >
            {formatMoney(emi)}
          </h2>

        </div>



        {/* Total */}

        <div
          className="
            rounded-2xl
            border
            border-green-400/10
            bg-gradient-to-br
            from-green-600/20
            to-green-400/5
            p-4
          "
        >

          <p
            className="
              text-xs
              font-medium
              text-slate-400
            "
          >
            Total Payment
          </p>


          <h2
            className="
              mt-2
              text-xl
              font-bold
              text-white
              sm:text-2xl
            "
          >
            {formatMoney(totalPayment)}
          </h2>

        </div>



        {/* Interest */}

        <div
          className="
            rounded-2xl
            border
            border-purple-400/10
            bg-gradient-to-br
            from-purple-600/20
            to-purple-400/5
            p-4
          "
        >

          <p
            className="
              text-xs
              font-medium
              text-slate-400
            "
          >
            Total Interest
          </p>


          <h2
            className="
              mt-2
              text-xl
              font-bold
              text-white
              sm:text-2xl
            "
          >
            {formatMoney(interest)}
          </h2>

        </div>

      </div>



      {/* AI Suggestion */}

      <div
        className="
          relative
          mt-6
          flex
          items-start
          gap-3
          rounded-2xl
          border
          border-cyan-400/15
          bg-gradient-to-r
          from-cyan-500/10
          to-blue-500/10
          p-4
        "
      >

        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-cyan-400/10
          "
        >

          <Sparkles
            size={18}
            className="text-yellow-400"
          />

        </div>


        <div>

          <p
            className="
              text-xs
              font-semibold
              text-cyan-400
            "
          >
            SmartBank AI Suggestion
          </p>


          <p
            className="
              mt-1
              text-sm
              leading-6
              text-slate-400
            "
          >
            SmartBank AI suggests this EMI is manageable
            based on your current financial health and
            spending pattern.
          </p>

        </div>

      </div>

    </motion.div>

  );

};


export default LoanCalculator;