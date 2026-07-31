import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import {
  Sparkles,
  X,
  Bot,
  ArrowUpRight,
  ShieldCheck,
  TrendingUp
} from "lucide-react";



const AIAssistant = () => {

  const [open, setOpen] = useState(false);



  return (

    <>

      {/* =========================
          FLOATING AI BUTTON
      ========================= */}

      <motion.button

        whileHover={{
          scale: 1.08
        }}

        whileTap={{
          scale: 0.94
        }}

        onClick={() => setOpen(!open)}

        aria-label="Open SmartBank AI Assistant"

        className="
          fixed
          bottom-7
          right-7
          z-50
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-full
          border
          border-white/20
          bg-gradient-to-br
          from-blue-600
          via-blue-500
          to-cyan-400
          text-white
          shadow-2xl
          shadow-cyan-500/30
          transition-all
          duration-300
          hover:shadow-cyan-500/50
        "

      >

        {open ? (
          <X size={27} />
        ) : (
          <Sparkles size={27} />
        )}

      </motion.button>



      {/* =========================
          AI PANEL
      ========================= */}

      <AnimatePresence>

        {open && (

          <motion.div

            initial={{
              opacity: 0,
              y: 25,
              scale: 0.96
            }}

            animate={{
              opacity: 1,
              y: 0,
              scale: 1
            }}

            exit={{
              opacity: 0,
              y: 20,
              scale: 0.96
            }}

            transition={{
              duration: 0.25
            }}

            className="
              fixed
              bottom-28
              right-7
              z-50
              w-[calc(100vw-2rem)]
              max-w-[380px]
              overflow-hidden
              rounded-[28px]
              border
              border-white/10
              bg-slate-950/95
              text-white
              shadow-2xl
              shadow-black/40
              backdrop-blur-2xl
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
              "
            />



            <div className="relative p-5">

              {/* =========================
                  HEADER
              ========================= */}

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

                    <Bot size={22} />

                  </div>


                  <div>

                    <div
                      className="
                        flex
                        items-center
                        gap-2
                      "
                    >

                      <h3
                        className="
                          font-bold
                          text-white
                        "
                      >
                        SmartBank AI
                      </h3>

                      <span
                        className="
                          rounded-full
                          bg-green-400/10
                          px-2
                          py-0.5
                          text-[10px]
                          font-semibold
                          text-green-400
                        "
                      >
                        ONLINE
                      </span>

                    </div>

                    <p
                      className="
                        mt-0.5
                        text-xs
                        text-slate-500
                      "
                    >
                      Financial Assistant
                    </p>

                  </div>

                </div>

              </div>



              {/* =========================
                  AI MESSAGE
              ========================= */}

              <div
                className="
                  mt-5
                  rounded-2xl
                  border
                  border-cyan-400/10
                  bg-gradient-to-br
                  from-cyan-400/[0.08]
                  to-blue-500/[0.06]
                  p-4
                "
              >

                <div
                  className="
                    flex
                    items-start
                    gap-3
                  "
                >

                  <Sparkles
                    size={18}
                    className="
                      mt-0.5
                      shrink-0
                      text-cyan-400
                    "
                  />

                  <p
                    className="
                      text-sm
                      leading-6
                      text-slate-300
                    "
                  >
                    Your spending is healthy. You can potentially save an
                    extra <span className="font-semibold text-cyan-400">$120</span>
                    {" "}this month.
                  </p>

                </div>

              </div>



              {/* =========================
                  QUICK INSIGHTS
              ========================= */}

              <div
                className="
                  mt-4
                  grid
                  grid-cols-2
                  gap-3
                "
              >

                <div
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.04]
                    p-3
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      text-green-400
                    "
                  >

                    <TrendingUp size={16} />

                    <span
                      className="
                        text-xs
                        font-medium
                      "
                    >
                      Spending
                    </span>

                  </div>

                  <p
                    className="
                      mt-2
                      text-sm
                      font-semibold
                      text-white
                    "
                  >
                    Healthy
                  </p>

                </div>



                <div
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.04]
                    p-3
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      text-blue-400
                    "
                  >

                    <ShieldCheck size={16} />

                    <span
                      className="
                        text-xs
                        font-medium
                      "
                    >
                      Security
                    </span>

                  </div>

                  <p
                    className="
                      mt-2
                      text-sm
                      font-semibold
                      text-white
                    "
                  >
                    Excellent
                  </p>

                </div>

              </div>



              {/* =========================
                  ASK AI BUTTON
              ========================= */}

              <button
                className="
                  group
                  mt-5
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  bg-gradient-to-r
                  from-blue-600
                  to-cyan-400
                  py-3.5
                  text-sm
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-blue-500/20
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:shadow-blue-500/30
                "
              >

                Ask SmartBank AI

                <ArrowUpRight
                  size={17}
                  className="
                    transition
                    duration-300
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                  "
                />

              </button>



              <p
                className="
                  mt-3
                  text-center
                  text-[11px]
                  text-slate-600
                "
              >
                AI insights are based on your financial activity
              </p>

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </>

  );

};


export default AIAssistant;