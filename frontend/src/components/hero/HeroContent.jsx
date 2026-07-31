import { motion } from "framer-motion";

import {
  ArrowRight,
  Play,
  Sparkles,
  ShieldCheck
} from "lucide-react";


const stats = [
  {
    value: "10K+",
    label: "Active Users",
  },
  {
    value: "99.9%",
    label: "Security",
  },
  {
    value: "24/7",
    label: "AI Support",
  },
];


const HeroContent = () => {

  return (

    <motion.div

      initial={{
        opacity: 0,
        x: -40
      }}

      animate={{
        opacity: 1,
        x: 0
      }}

      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }}

      className="
        max-w-2xl
      "
    >

      {/* ================================= */}
      {/* PREMIUM BADGE */}
      {/* ================================= */}

      <motion.div

        initial={{
          opacity: 0,
          y: 10
        }}

        animate={{
          opacity: 1,
          y: 0
        }}

        transition={{
          duration: 0.6,
          delay: 0.15
        }}

        className="
          group
          inline-flex
          items-center
          gap-2.5
          rounded-full
          border
          border-blue-400/20
          bg-blue-500/10
          px-4
          py-2
          text-sm
          font-medium
          text-blue-300
          shadow-lg
          shadow-blue-500/5
          backdrop-blur-xl
          transition
          hover:border-cyan-400/30
          hover:bg-blue-500/15
        "
      >

        <span
          className="
            flex
            h-7
            w-7
            items-center
            justify-center
            rounded-full
            bg-blue-500/15
          "
        >

          <Sparkles
            size={15}
            className="
              text-cyan-400
              transition
              group-hover:rotate-12
            "
          />

        </span>


        AI Powered Banking


        <span
          className="
            h-1.5
            w-1.5
            rounded-full
            bg-cyan-400
            shadow-lg
            shadow-cyan-400/60
          "
        />

      </motion.div>


      {/* ================================= */}
      {/* MAIN HEADING */}
      {/* ================================= */}

      <h1
        className="
          mt-7
          text-[3.2rem]
          font-extrabold
          leading-[0.98]
          tracking-[-0.04em]
          text-white
          sm:text-6xl
          lg:text-[4.6rem]
          xl:text-[5rem]
        "
      >

        Banking that

        <br />

        thinks
        <span
          className="
            bg-gradient-to-r
            from-blue-500
            via-cyan-400
            to-cyan-300
            bg-clip-text
            text-transparent
          "
        >
          smarter.
        </span>

      </h1>


      {/* ================================= */}
      {/* SECONDARY HEADING */}
      {/* ================================= */}

      <div
        className="
          mt-5
          flex
          items-center
          gap-3
        "
      >

        <div
          className="
            h-px
            w-10
            bg-gradient-to-r
            from-blue-500
            to-cyan-400
          "
        />

        <p
          className="
            text-sm
            font-medium
            uppercase
            tracking-[0.18em]
            text-slate-500
          "
        >
          Powered by AI
        </p>

      </div>


      {/* ================================= */}
      {/* DESCRIPTION */}
      {/* ================================= */}

      <p
        className="
          mt-7
          max-w-xl
          text-base
          leading-7
          text-slate-400
          sm:text-lg
          sm:leading-8
        "
      >

        Manage your money smarter, secure every transaction,
        and receive intelligent financial insights with a
        next-generation banking experience built for you.

      </p>


      {/* ================================= */}
      {/* CTA BUTTONS */}
      {/* ================================= */}

      <div
        className="
          mt-9
          flex
          flex-col
          items-stretch
          gap-3
          sm:flex-row
          sm:items-center
        "
      >

        {/* Get Started */}

        <motion.button

          whileHover={{
            scale: 1.03
          }}

          whileTap={{
            scale: 0.98
          }}

          className="
            group
            inline-flex
            items-center
            justify-center
            gap-3
            rounded-2xl
            bg-gradient-to-r
            from-blue-600
            to-cyan-500
            px-7
            py-4
            font-semibold
            text-white
            shadow-xl
            shadow-blue-500/20
            transition
            hover:shadow-2xl
            hover:shadow-blue-500/30
          "
        >

          Get Started

          <span
            className="
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-full
              bg-white/15
            "
          >

            <ArrowRight
              size={16}
              className="
                transition
                group-hover:translate-x-0.5
              "
            />

          </span>

        </motion.button>


        {/* Live Demo */}

        <motion.button

          whileHover={{
            scale: 1.03
          }}

          whileTap={{
            scale: 0.98
          }}

          className="
            group
            inline-flex
            items-center
            justify-center
            gap-3
            rounded-2xl
            border
            border-white/10
            bg-white/[0.04]
            px-7
            py-4
            font-semibold
            text-slate-200
            backdrop-blur-xl
            transition
            hover:border-cyan-400/30
            hover:bg-white/[0.08]
            hover:text-white
          "
        >

          <span
            className="
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              bg-white/5
            "
          >

            <Play
              size={13}
              className="
                ml-0.5
                fill-current
                text-cyan-400
              "
            />

          </span>

          Explore Demo

        </motion.button>

      </div>


      {/* ================================= */}
      {/* SECURITY NOTE */}
      {/* ================================= */}

      <div
        className="
          mt-7
          flex
          items-center
          gap-2
          text-xs
          text-slate-500
        "
      >

        <ShieldCheck
          size={16}
          className="text-cyan-400"
        />

        Bank-grade security · AI-powered insights

      </div>


      {/* ================================= */}
      {/* STATS */}
      {/* ================================= */}

      <div
        className="
          mt-11
          grid
          grid-cols-3
          max-w-lg
          divide-x
          divide-white/10
          border-y
          border-white/10
          py-5
        "
      >

        {stats.map((item, index) => (

          <motion.div

            key={item.label}

            whileHover={{
              y: -2
            }}

            className="
              px-4
              first:pl-0
              last:pr-0
              transition
            "
          >

            <h3
              className="
                text-2xl
                font-bold
                tracking-tight
                text-white
                sm:text-3xl
              "
            >

              {item.value}

            </h3>


            <p
              className="
                mt-1.5
                text-[11px]
                font-medium
                uppercase
                tracking-wider
                text-slate-500
                sm:text-xs
              "
            >

              {item.label}

            </p>

          </motion.div>

        ))}

      </div>

    </motion.div>

  );

};


export default HeroContent;