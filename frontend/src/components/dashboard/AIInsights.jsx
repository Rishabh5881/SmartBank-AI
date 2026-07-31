import { motion } from "framer-motion";

import {
  Sparkles,
  PiggyBank,
  TrendingUp,
  ShieldCheck,
  Lightbulb
} from "lucide-react";



const AllInsights = () => {

  const insights = [

    {
      title: "Smart Saving Opportunity",
      text: "Reducing unnecessary subscriptions could help you save around $120 this month.",
      icon: <PiggyBank size={20} />,
      color: "text-green-400",
      bg: "bg-green-500/10"
    },

    {
      title: "Income Growth",
      text: "Your monthly income is trending upward compared with previous months.",
      icon: <TrendingUp size={20} />,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10"
    },

    {
      title: "Security Status",
      text: "Your account security is currently strong. No unusual activity detected.",
      icon: <ShieldCheck size={20} />,
      color: "text-blue-400",
      bg: "bg-blue-500/10"
    },

    {
      title: "AI Recommendation",
      text: "Maintaining your current savings strategy can improve your financial score.",
      icon: <Lightbulb size={20} />,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10"
    }

  ];



  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 25
      }}

      animate={{
        opacity: 1,
        y: 0
      }}

      className="
        rounded-3xl
        border
        border-white/10
        bg-white/[0.05]
        p-6
        text-white
        backdrop-blur-xl
      "
    >

      {/* Header */}

      <div className="
        flex
        items-center
        justify-between
      ">

        <div className="
          flex
          items-center
          gap-3
        ">

          <div className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-2xl
            bg-purple-500/20
          ">

            <Sparkles
              className="text-purple-400"
              size={22}
            />

          </div>

          <div>

            <h2 className="
              text-xl
              font-bold
            ">
              AI Insights
            </h2>

            <p className="
              text-sm
              text-slate-400
            ">
              Personalized financial intelligence
            </p>

          </div>

        </div>

        <span className="
          rounded-full
          bg-purple-500/10
          px-3
          py-1
          text-xs
          font-medium
          text-purple-400
        ">
          AI Powered
        </span>

      </div>



      {/* Insights */}

      <div className="
        mt-6
        grid
        gap-4
        md:grid-cols-2
      ">

        {insights.map((item, index) => (

          <motion.div

            key={index}

            whileHover={{
              y: -4
            }}

            className="
              rounded-2xl
              border
              border-white/10
              bg-white/[0.03]
              p-4
              transition
              hover:bg-white/[0.06]
            "
          >

            <div className="
              flex
              items-start
              gap-3
            ">

              <div className={`
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                ${item.bg}
                ${item.color}
              `}>

                {item.icon}

              </div>

              <div>

                <h3 className="
                  font-semibold
                  text-white
                ">
                  {item.title}
                </h3>

                <p className="
                  mt-1.5
                  text-sm
                  leading-6
                  text-slate-400
                ">
                  {item.text}
                </p>

              </div>

            </div>

          </motion.div>

        ))}

      </div>

    </motion.div>

  );
};



export default AllInsights;