import { motion } from "framer-motion";

import {
  BrainCircuit,
  TrendingDown,
  Sparkles,
  ArrowUpRight
} from "lucide-react";


const AIWidget = () => {

  return (

    <motion.div

      initial={{
        opacity: 0,
        scale: 0.9,
        y: 10
      }}

      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -8, 0]
      }}

      transition={{
        opacity: {
          duration: 0.6
        },

        scale: {
          duration: 0.6
        },

        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}

      className="
        w-[290px]
        rounded-[28px]
        border
        border-cyan-400/20
        bg-slate-900/95
        p-5
        backdrop-blur-2xl
        shadow-2xl
        shadow-cyan-500/20
      "

    >


      {/* Header */}

      <div
        className="
          flex
          items-center
          justify-between
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
              bg-gradient-to-br
              from-blue-600
              to-cyan-400
              shadow-lg
              shadow-blue-500/20
            "
          >

            <BrainCircuit
              size={23}
              className="text-white"
            />

          </div>


          <div>

            <p
              className="
                text-sm
                font-semibold
                text-white
              "
            >
              AI Financial Insight
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
                  bg-green-400
                "
              />

              <p
                className="
                  text-xs
                  text-slate-400
                "
              >
                Smart Analysis
              </p>

            </div>

          </div>

        </div>


        <Sparkles
          size={18}
          className="text-cyan-400"
        />

      </div>



      {/* Insight Card */}

      <div
        className="
          mt-5
          rounded-2xl
          border
          border-white/10
          bg-white/5
          p-4
        "
      >

        <div
          className="
            flex
            items-center
            justify-between
          "
        >

          <div
            className="
              flex
              items-center
              gap-2
            "
          >

            <div
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-xl
                bg-green-500/10
              "
            >

              <TrendingDown
                size={16}
                className="text-green-400"
              />

            </div>


            <div>

              <p
                className="
                  text-xs
                  text-slate-400
                "
              >
                Spending
              </p>

              <p
                className="
                  text-sm
                  font-semibold
                  text-green-400
                "
              >
                12% Lower
              </p>

            </div>

          </div>


          <ArrowUpRight
            size={17}
            className="text-green-400"
          />

        </div>


        <p
          className="
            mt-4
            text-sm
            leading-6
            text-slate-300
          "
        >
          Your spending is 12% lower this month.
          Keep maintaining your smart saving habits.
        </p>

      </div>



      {/* AI Recommendation */}

      <div
        className="
          mt-4
          rounded-2xl
          border
          border-blue-500/20
          bg-gradient-to-br
          from-blue-500/10
          to-cyan-500/5
          p-4
        "
      >

        <div
          className="
            flex
            items-center
            gap-2
          "
        >

          <Sparkles
            size={16}
            className="text-blue-400"
          />

          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-wide
              text-blue-400
            "
          >
            Smart Recommendation
          </p>

        </div>


        <p
          className="
            mt-2
            text-sm
            leading-6
            text-slate-300
          "
        >
          AI suggests saving 15% more this month
          based on your spending behavior.
        </p>

      </div>



      {/* Bottom */}

      <div
        className="
          mt-4
          flex
          items-center
          justify-between
          text-xs
          text-slate-500
        "
      >

        <span>
          AI Monitoring Active
        </span>

        <span className="text-green-400">
          ● Online
        </span>

      </div>


    </motion.div>

  );

};


export default AIWidget;