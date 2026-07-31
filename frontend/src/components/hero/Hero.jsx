import { motion } from "framer-motion";

import HeroContent from "./HeroContent";
import DashboardPreview from "./DashboardPreview";


const Hero = () => {

  return (

    <section
      id="home"
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-slate-950
        pt-32
        pb-20
        sm:pt-36
        lg:pt-40
      "
    >

      {/* ================================= */}
      {/* PREMIUM BACKGROUND */}
      {/* ================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.14),transparent_32%),radial-gradient(circle_at_85%_35%,rgba(6,182,212,0.10),transparent_30%)]
        "
      />


      {/* Main Blue Glow */}

      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.45, 0.6, 0.45]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="
          pointer-events-none
          absolute
          left-[8%]
          top-20
          h-[420px]
          w-[420px]
          rounded-full
          bg-blue-600/20
          blur-[150px]
        "
      />


      {/* Cyan Glow */}

      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="
          pointer-events-none
          absolute
          right-[-100px]
          top-[25%]
          h-[500px]
          w-[500px]
          rounded-full
          bg-cyan-500/10
          blur-[160px]
        "
      />


      {/* Bottom Glow */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-[-180px]
          left-1/2
          h-[400px]
          w-[700px]
          -translate-x-1/2
          rounded-full
          bg-blue-600/10
          blur-[140px]
        "
      />


      {/* ================================= */}
      {/* SUBTLE GRID */}
      {/* ================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.035]
          [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)]
          [background-size:70px_70px]
        "
      />


      {/* ================================= */}
      {/* MAIN CONTAINER */}
      {/* ================================= */}

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1500px]
          px-5
          sm:px-8
          lg:px-12
          xl:px-16
        "
      >

        <div
          className="
            grid
            items-center
            gap-14
            lg:grid-cols-[0.92fr_1.08fr]
            lg:gap-10
            xl:gap-16
          "
        >


          {/* ================================= */}
          {/* LEFT CONTENT */}
          {/* ================================= */}

          <motion.div

            initial={{
              opacity: 0,
              x: -50
            }}

            animate={{
              opacity: 1,
              x: 0
            }}

            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1]
            }}

            className="
              relative
              z-20
            "
          >

            <HeroContent />

          </motion.div>



          {/* ================================= */}
          {/* RIGHT DASHBOARD */}
          {/* ================================= */}

          <motion.div

            initial={{
              opacity: 0,
              x: 60,
              scale: 0.96
            }}

            animate={{
              opacity: 1,
              x: 0,
              scale: 1
            }}

            transition={{
              duration: 1,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1]
            }}

            className="
              relative
              flex
              items-center
              justify-center
              lg:justify-end
            "
          >


            {/* Dashboard Outer Glow */}

            <div
              className="
                pointer-events-none
                absolute
                -inset-8
                rounded-[50px]
                bg-blue-500/10
                blur-3xl
              "
            />


            {/* Floating Dashboard */}

            <motion.div

              animate={{
                y: [0, -8, 0]
              }}

              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}

              className="
                relative
                z-10
                w-full
                max-w-[600px]
              "
            >

              <DashboardPreview />

            </motion.div>


            {/* Decorative Glow Dot */}

            <motion.div

              animate={{
                y: [0, -12, 0],
                opacity: [0.4, 0.8, 0.4]
              }}

              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}

              className="
                pointer-events-none
                absolute
                -right-3
                top-16
                h-3
                w-3
                rounded-full
                bg-cyan-400
                shadow-lg
                shadow-cyan-400/60
              "
            />


            {/* Decorative Blue Dot */}

            <motion.div

              animate={{
                y: [0, 10, 0],
                opacity: [0.3, 0.7, 0.3]
              }}

              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}

              className="
                pointer-events-none
                absolute
                -left-4
                bottom-20
                h-2
                w-2
                rounded-full
                bg-blue-400
                shadow-lg
                shadow-blue-400/60
              "
            />

          </motion.div>

        </div>


        {/* ================================= */}
        {/* TRUST STRIP */}
        {/* ================================= */}

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
            duration: 0.8,
            delay: 0.7
          }}

          className="
            relative
            mt-16
            border-t
            border-white/5
            pt-8
            lg:mt-20
          "
        >

          <div
            className="
              flex
              flex-col
              items-center
              justify-center
              gap-4
              text-center
              sm:flex-row
              sm:gap-8
            "
          >

            <p
              className="
                text-xs
                font-medium
                uppercase
                tracking-[0.2em]
                text-slate-500
              "
            >
              Intelligent Banking
            </p>


            <div
              className="
                hidden
                h-1
                w-1
                rounded-full
                bg-slate-600
                sm:block
              "
            />


            <p
              className="
                text-xs
                font-medium
                uppercase
                tracking-[0.2em]
                text-slate-500
              "
            >
              AI Powered
            </p>


            <div
              className="
                hidden
                h-1
                w-1
                rounded-full
                bg-slate-600
                sm:block
              "
            />


            <p
              className="
                text-xs
                font-medium
                uppercase
                tracking-[0.2em]
                text-slate-500
              "
            >
              Secure by Design
            </p>

          </div>

        </motion.div>

      </div>


      {/* ================================= */}
      {/* BOTTOM FADE */}
      {/* ================================= */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          right-0
          h-32
          bg-gradient-to-t
          from-slate-950
          to-transparent
        "
      />

    </section>

  );

};


export default Hero;