import { motion } from "framer-motion";

import {
  Sparkles,
  PiggyBank,
  TrendingUp,
  ShieldCheck,
  ArrowUpRight
} from "lucide-react";



const AIRecommendation = () => {

  const recommendations = [

    {
      title: "Smart Saving",
      text: "You can save $500 this month by optimizing your unnecessary expenses.",
      icon: <PiggyBank size={22} />,
      color: "text-green-400",
      bg: "bg-green-400/10",
      border: "border-green-400/10"
    },


    {
      title: "Investment Growth",
      text: "Your financial health allows you to explore better investment opportunities.",
      icon: <TrendingUp size={22} />,
      color: "text-cyan-400",
      bg: "bg-cyan-400/10",
      border: "border-cyan-400/10"
    },


    {
      title: "Security Score",
      text: "Your account security status is excellent. Keep monitoring activity.",
      icon: <ShieldCheck size={22} />,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      border: "border-blue-400/10"
    }

  ];



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
        bg-gradient-to-br
        from-purple-600/15
        via-blue-600/10
        to-cyan-500/10
        p-6
        text-white
        shadow-xl
        shadow-black/10
        backdrop-blur-xl
        transition-all
        duration-300
        hover:border-purple-400/20
      "

    >

      {/* Background Glow */}

      <div
        className="
          pointer-events-none
          absolute
          -right-24
          -top-24
          h-56
          w-56
          rounded-full
          bg-purple-500/15
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
          gap-4
        "
      >

        <div
          className="
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-2xl
            border
            border-purple-400/15
            bg-purple-500/10
          "
        >

          <Sparkles
            size={23}
            className="text-yellow-400"
          />

        </div>


        <div>

          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.18em]
              text-purple-300
            "
          >
            AI Intelligence
          </p>

          <h2
            className="
              mt-1
              text-xl
              font-bold
              tracking-tight
              sm:text-2xl
            "
          >
            SmartBank AI Recommendations
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-slate-400
            "
          >
            AI-powered financial guidance based on your spending behaviour.
          </p>

        </div>

      </div>



      {/* Recommendations */}

      <div
        className="
          relative
          mt-8
          grid
          gap-4
          md:grid-cols-3
        "
      >

        {recommendations.map((item, index) => (

          <motion.div

            key={index}

            initial={{
              opacity: 0,
              y: 15
            }}

            animate={{
              opacity: 1,
              y: 0
            }}

            transition={{
              delay: index * 0.1,
              duration: 0.4
            }}

            whileHover={{
              y: -5
            }}

            className={`
              group/card
              rounded-2xl
              border
              ${item.border}
              bg-white/[0.04]
              p-5
              transition-all
              duration-300
              hover:bg-white/[0.07]
            `}

          >

            {/* Icon */}

            <div
              className={`
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                ${item.bg}
                ${item.color}
              `}
            >

              {item.icon}

            </div>



            {/* Title */}

            <div
              className="
                mt-4
                flex
                items-center
                justify-between
                gap-2
              "
            >

              <h3
                className="
                  text-lg
                  font-bold
                  text-white
                "
              >
                {item.title}
              </h3>

              <ArrowUpRight
                size={17}
                className="
                  text-slate-600
                  transition
                  duration-300
                  group-hover/card:-translate-y-0.5
                  group-hover/card:translate-x-0.5
                  group-hover/card:text-slate-300
                "
              />

            </div>



            {/* Description */}

            <p
              className="
                mt-2
                text-sm
                leading-6
                text-slate-400
              "
            >
              {item.text}
            </p>

          </motion.div>

        ))}

      </div>



      {/* Financial Score */}

      <div
        className="
          relative
          mt-6
          flex
          flex-col
          gap-4
          rounded-2xl
          border
          border-white/10
          bg-white/[0.05]
          p-5
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >

        <div>

          <div
            className="
              flex
              items-center
              gap-2
            "
          >

            <Sparkles
              size={16}
              className="text-cyan-400"
            />

            <p
              className="
                text-sm
                font-medium
                text-slate-400
              "
            >
              AI Financial Score
            </p>

          </div>


          <div
            className="
              mt-1
              flex
              items-end
              gap-2
            "
          >

            <h2
              className="
                text-3xl
                font-extrabold
                tracking-tight
                text-white
              "
            >
              92
            </h2>

            <span
              className="
                mb-1
                text-sm
                text-slate-500
              "
            >
              /100
            </span>

          </div>

        </div>



        {/* Score Status */}

        <div
          className="
            inline-flex
            w-fit
            items-center
            gap-2
            rounded-full
            border
            border-green-400/15
            bg-green-500/10
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

          Excellent

        </div>

      </div>

    </motion.div>

  );

};


export default AIRecommendation;