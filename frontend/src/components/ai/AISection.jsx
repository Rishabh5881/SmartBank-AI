
import { motion } from "framer-motion";

import {
  BrainCircuit,
  TrendingUp,
  Sparkles,
  Wallet,
  ArrowUpRight,
  ShieldCheck,
  Zap
} from "lucide-react";

import Reveal from "../common/Reveal";


const insights = [

  {
    icon: TrendingUp,
    title: "Spending Prediction",
    text:
      "AI analyzes your spending patterns and predicts upcoming monthly expenses."
  },

  {
    icon: Wallet,
    title: "Smart Saving",
    text:
      "Get personalized saving suggestions based on your income and financial behavior."
  },

  {
    icon: Sparkles,
    title: "AI Recommendations",
    text:
      "Receive intelligent recommendations that help you make better financial decisions."
  }

];


const AISection = () => {

  return (

    <Reveal>

      <section
        id="ai"
        className="
          relative
          scroll-mt-24
          overflow-hidden
          bg-slate-950
          py-28
        "
      >

        {/* BACKGROUND GLOW */}

        <div
          className="
            pointer-events-none
            absolute
            left-0
            top-20
            h-[500px]
            w-[500px]
            rounded-full
            bg-blue-600/10
            blur-[150px]
          "
        />


        <div
          className="
            pointer-events-none
            absolute
            bottom-0
            right-0
            h-[450px]
            w-[450px]
            rounded-full
            bg-cyan-500/10
            blur-[150px]
          "
        />


        {/* CONTAINER */}

        <div
          className="
            relative
            mx-auto
            max-w-[1440px]
            px-6
            sm:px-8
            lg:px-12
          "
        >


          {/* HEADING */}

          <div
            className="
              mx-auto
              max-w-3xl
              text-center
            "
          >

            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-cyan-400/20
                bg-cyan-400/10
                px-5
                py-2
                text-sm
                font-medium
                text-cyan-400
              "
            >

              <BrainCircuit size={18} />

              AI Financial Intelligence

            </div>


            <h2
              className="
                mt-7
                text-4xl
                font-extrabold
                tracking-tight
                text-white
                sm:text-5xl
                lg:text-6xl
              "
            >

              Your money.

              <br />

              <span
                className="
                  bg-gradient-to-r
                  from-blue-500
                  to-cyan-400
                  bg-clip-text
                  text-transparent
                "
              >
                Understands you.
              </span>

            </h2>


            <p
              className="
                mx-auto
                mt-6
                max-w-2xl
                text-lg
                leading-8
                text-slate-400
              "
            >

              SmartBank AI transforms your financial data into
              meaningful insights, predictions and personalized
              recommendations.

            </p>

          </div>



          {/* MAIN AI AREA */}

          <div
            className="
              mt-16
              grid
              items-center
              gap-10
              lg:grid-cols-2
            "
          >


            {/* LEFT FEATURES */}

            <div className="space-y-5">

              {insights.map((item, index) => {

                const Icon = item.icon;

                return (

                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      x: -20
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0
                    }}
                    viewport={{
                      once: true,
                      amount: 0.2
                    }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1
                    }}
                    className="
                      group
                      flex
                      gap-5
                      rounded-3xl
                      border
                      border-white/10
                      bg-white/5
                      p-6
                      backdrop-blur-xl
                      transition
                      duration-300
                      hover:-translate-y-1
                      hover:border-blue-500/30
                      hover:bg-white/[0.07]
                    "
                  >

                    <div
                      className="
                        flex
                        h-14
                        w-14
                        shrink-0
                        items-center
                        justify-center
                        rounded-2xl
                        bg-gradient-to-br
                        from-blue-600/20
                        to-cyan-400/10
                        text-blue-400
                        transition
                        group-hover:scale-110
                      "
                    >

                      <Icon size={25} />

                    </div>


                    <div>

                      <h3
                        className="
                          text-lg
                          font-semibold
                          text-white
                        "
                      >
                        {item.title}
                      </h3>


                      <p
                        className="
                          mt-2
                          max-w-lg
                          text-sm
                          leading-6
                          text-slate-400
                        "
                      >
                        {item.text}
                      </p>

                    </div>

                  </motion.div>

                );

              })}

            </div>



            {/* RIGHT AI DASHBOARD */}

            <div className="relative">

              {/* GLOW */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-10
                  rounded-full
                  bg-blue-500/20
                  blur-[100px]
                "
              />


              <motion.div
                initial={{
                  opacity: 0,
                  y: 30
                }}
                whileInView={{
                  opacity: 1,
                  y: 0
                }}
                viewport={{
                  once: true,
                  amount: 0.2
                }}
                transition={{
                  duration: 0.7
                }}
                className="
                  relative
                  overflow-hidden
                  rounded-[32px]
                  border
                  border-white/10
                  bg-slate-900/90
                  p-6
                  shadow-2xl
                  backdrop-blur-2xl
                  sm:p-8
                "
              >


                {/* AI HEADER */}

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
                      gap-4
                    "
                  >

                    <div
                      className="
                        flex
                        h-14
                        w-14
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
                        size={27}
                        className="text-white"
                      />

                    </div>


                    <div>

                      <p
                        className="
                          text-lg
                          font-semibold
                          text-white
                        "
                      >
                        AI Assistant
                      </p>


                      <div
                        className="
                          mt-1
                          flex
                          items-center
                          gap-2
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

                        <span
                          className="
                            text-xs
                            text-green-400
                          "
                        >
                          AI Monitoring Active
                        </span>

                      </div>

                    </div>

                  </div>


                  <Sparkles
                    size={22}
                    className="text-cyan-400"
                  />

                </div>



                {/* PREDICTION */}

                <div
                  className="
                    mt-8
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/5
                    p-6
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                    "
                  >

                    <div>

                      <p
                        className="
                          text-sm
                          text-slate-400
                        "
                      >
                        Next Month Prediction
                      </p>


                      <h3
                        className="
                          mt-3
                          text-4xl
                          font-bold
                          text-white
                        "
                      >
                        $4,850
                      </h3>

                    </div>


                    <div
                      className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-2xl
                        bg-green-500/10
                      "
                    >

                      <TrendingUp
                        className="text-green-400"
                      />

                    </div>

                  </div>


                  <div
                    className="
                      mt-5
                      flex
                      items-center
                      gap-2
                      text-sm
                      font-medium
                      text-green-400
                    "
                  >

                    <ArrowUpRight size={17} />

                    Saving opportunity +18%

                  </div>

                </div>



                {/* AI RECOMMENDATION */}

                <div
                  className="
                    mt-5
                    rounded-3xl
                    border
                    border-blue-500/20
                    bg-gradient-to-br
                    from-blue-500/10
                    to-cyan-500/5
                    p-6
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
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        bg-blue-500/10
                      "
                    >

                      <Sparkles
                        size={19}
                        className="text-blue-400"
                      />

                    </div>


                    <div>

                      <p
                        className="
                          text-sm
                          font-semibold
                          text-blue-400
                        "
                      >
                        Smart Recommendation
                      </p>


                      <p
                        className="
                          mt-1
                          text-xs
                          text-slate-500
                        "
                      >
                        Based on your recent activity
                      </p>

                    </div>

                  </div>


                  <p
                    className="
                      mt-4
                      text-sm
                      leading-6
                      text-slate-300
                    "
                  >

                    Your food expenses increased this month.
                    AI recommends reducing dining expenses by
                    approximately 10%.

                  </p>

                </div>



                {/* STATUS */}

                <div
                  className="
                    mt-5
                    grid
                    grid-cols-2
                    gap-4
                  "
                >

                  <div
                    className="
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/5
                      p-4
                    "
                  >

                    <ShieldCheck
                      size={20}
                      className="text-cyan-400"
                    />


                    <p
                      className="
                        mt-3
                        text-xs
                        text-slate-500
                      "
                    >
                      Financial Security
                    </p>


                    <p
                      className="
                        mt-1
                        font-semibold
                        text-white
                      "
                    >
                      Protected
                    </p>

                  </div>


                  <div
                    className="
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/5
                      p-4
                    "
                  >

                    <Zap
                      size={20}
                      className="text-yellow-400"
                    />


                    <p
                      className="
                        mt-3
                        text-xs
                        text-slate-500
                      "
                    >
                      AI Accuracy
                    </p>


                    <p
                      className="
                        mt-1
                        font-semibold
                        text-white
                      "
                    >
                      94.8%
                    </p>

                  </div>

                </div>

              </motion.div>

            </div>

          </div>

        </div>

      </section>

    </Reveal>

  );

};


export default AISection;

