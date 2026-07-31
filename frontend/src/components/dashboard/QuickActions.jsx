import { motion } from "framer-motion";

import {
  Send,
  PlusCircle,
  Receipt,
  CreditCard,
  ArrowUpRight
} from "lucide-react";



const QuickActions = ({ openModal }) => {

  const actions = [

    {
      title: "Transfer Money",
      icon: Send,
      description: "Send money securely"
    },

    {
      title: "Deposit Money",
      icon: PlusCircle,
      description: "Add money to account"
    },

    {
      title: "Pay Bills",
      icon: Receipt,
      description: "Manage your payments"
    },

    {
      title: "Manage Cards",
      icon: CreditCard,
      description: "Control your cards"
    }

  ];



  return (

    <div className="mt-10">

      {/* Section Header */}

      <div
        className="
          flex
          items-end
          justify-between
          gap-4
        "
      >

        <div>

          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.2em]
              text-cyan-400
            "
          >
            Banking Tools
          </p>

          <h2
            className="
              mt-1
              text-2xl
              font-bold
              tracking-tight
              text-white
            "
          >
            Quick Actions
            <span className="ml-2">⚡</span>
          </h2>

        </div>

      </div>



      {/* Actions */}

      <div
        className="
          mt-5
          grid
          gap-5
          sm:grid-cols-2
          lg:grid-cols-4
        "
      >

        {actions.map((item, index) => {

          const Icon = item.icon;

          return (

            <motion.button

              key={index}

              type="button"

              initial={{
                opacity: 0,
                y: 15
              }}

              animate={{
                opacity: 1,
                y: 0
              }}

              transition={{
                duration: 0.4,
                delay: index * 0.08
              }}

              whileHover={{
                y: -5
              }}

              whileTap={{
                scale: 0.98
              }}

              onClick={() => openModal(item.title)}

              className="
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-white/[0.05]
                p-5
                text-left
                shadow-xl
                shadow-black/10
                backdrop-blur-xl
                transition-all
                duration-300
                hover:border-blue-500/30
                hover:bg-white/[0.08]
                hover:shadow-blue-500/10
              "
            >

              {/* Hover Glow */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-12
                  -top-12
                  h-28
                  w-28
                  rounded-full
                  bg-blue-500/10
                  blur-2xl
                  transition
                  duration-500
                  group-hover:scale-150
                "
              />


              <div
                className="
                  relative
                  flex
                  items-start
                  justify-between
                "
              >

                {/* Icon */}

                <div
                  className="
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


                {/* Arrow */}

                <div
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/10
                    bg-white/5
                    text-slate-500
                    transition
                    duration-300
                    group-hover:border-cyan-400/20
                    group-hover:bg-cyan-400/10
                    group-hover:text-cyan-400
                  "
                >

                  <ArrowUpRight
                    size={16}
                    className="
                      transition
                      duration-300
                      group-hover:translate-x-0.5
                      group-hover:-translate-y-0.5
                    "
                  />

                </div>

              </div>



              {/* Content */}

              <div className="relative mt-5">

                <h3
                  className="
                    font-semibold
                    text-white
                  "
                >
                  {item.title}
                </h3>


                <p
                  className="
                    mt-1.5
                    text-xs
                    leading-5
                    text-slate-400
                  "
                >
                  {item.description}
                </p>

              </div>

            </motion.button>

          );

        })}

      </div>

    </div>

  );

};


export default QuickActions;