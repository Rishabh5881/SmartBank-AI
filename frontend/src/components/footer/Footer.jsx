
import {
  ShieldCheck,
  BrainCircuit,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";


const Footer = () => {


  const scrollToSection = (id) => {

    const section =
      document.getElementById(id);


    if (section) {

      section.scrollIntoView({

        behavior: "smooth",

        block: "start",

      });

    }

  };



  return (

    <footer
      className="
        relative
        overflow-hidden
        border-t
        border-white/10
        bg-slate-950
        text-white
      "
    >


      {/* =========================================
          BACKGROUND GLOW
      ========================================= */}

      <div
        className="
          pointer-events-none
          absolute
          -bottom-40
          left-1/2
          h-[400px]
          w-[600px]
          -translate-x-1/2
          rounded-full
          bg-blue-600/10
          blur-[150px]
        "
      />



      <div
        className="
          relative
          mx-auto
          max-w-[1440px]
          px-6
          py-16
          sm:px-8
          lg:px-12
        "
      >


        {/* =========================================
            MAIN FOOTER GRID
        ========================================= */}

        <div
          className="
            grid
            gap-12
            md:grid-cols-3
          "
        >


          {/* =========================================
              BRAND
          ========================================= */}

          <div>


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
                  h-12
                  w-12
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
                  size={25}
                  className="text-white"
                />

              </div>


              <h2
                className="
                  text-xl
                  font-bold
                  tracking-tight
                "
              >

                SmartBank

                <span className="text-cyan-400">
                  AI
                </span>

              </h2>

            </div>



            <p
              className="
                mt-5
                max-w-sm
                text-sm
                leading-7
                text-slate-400
              "
            >

              AI-powered digital banking platform built
              to help you understand your money, manage
              your finances and make smarter financial
              decisions.

            </p>



            {/* SECURITY */}

            <div
              className="
                mt-6
                inline-flex
                items-center
                gap-3
                rounded-2xl
                border
                border-white/10
                bg-white/[0.04]
                px-4
                py-3
                backdrop-blur-xl
              "
            >

              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  bg-cyan-400/10
                "
              >

                <ShieldCheck
                  size={19}
                  className="text-cyan-400"
                />

              </div>


              <div>

                <p
                  className="
                    text-xs
                    font-semibold
                    text-white
                  "
                >
                  Bank Grade Security
                </p>


                <p
                  className="
                    mt-0.5
                    text-[11px]
                    text-slate-500
                  "
                >
                  Your financial data stays protected
                </p>

              </div>

            </div>

          </div>



          {/* =========================================
              PLATFORM
          ========================================= */}

          <div>

            <h3
              className="
                text-sm
                font-semibold
                uppercase
                tracking-wider
                text-white
              "
            >
              Platform
            </h3>


            <div
              className="
                mt-6
                space-y-3
              "
            >

              {[
                ["Home", "home"],
                ["Features", "features"],
                ["Security", "security"],
                ["AI Intelligence", "ai"],
                ["Analytics", "analytics"],
                ["Pricing", "pricing"],
              ].map(([name, id]) => (

                <button
                  key={id}
                  type="button"
                  onClick={() =>
                    scrollToSection(id)
                  }
                  className="
                    group
                    flex
                    items-center
                    gap-2
                    text-sm
                    text-slate-400
                    transition
                    duration-200
                    hover:text-cyan-400
                  "
                >

                  <span
                    className="
                      h-1
                      w-1
                      rounded-full
                      bg-slate-600
                      transition
                      group-hover:bg-cyan-400
                    "
                  />

                  {name}

                </button>

              ))}

            </div>

          </div>



          {/* =========================================
              CONNECT
          ========================================= */}

          <div>

            <h3
              className="
                text-sm
                font-semibold
                uppercase
                tracking-wider
                text-white
              "
            >
              Connect
            </h3>


            <p
              className="
                mt-6
                max-w-xs
                text-sm
                leading-6
                text-slate-400
              "
            >

              Explore SmartBank AI and follow the project
              for future updates.

            </p>



            <div
              className="
                mt-6
                flex
                flex-wrap
                gap-3
              "
            >

              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.04]
                  px-4
                  py-3
                  text-sm
                  text-slate-300
                  transition
                  duration-300
                  hover:-translate-y-1
                  hover:border-cyan-400/30
                  hover:bg-white/[0.08]
                  hover:text-cyan-400
                "
              >

                GitHub

                <ExternalLink
                  size={14}
                  className="
                    transition
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                  "
                />

              </a>



              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.04]
                  px-4
                  py-3
                  text-sm
                  text-slate-300
                  transition
                  duration-300
                  hover:-translate-y-1
                  hover:border-cyan-400/30
                  hover:bg-white/[0.08]
                  hover:text-cyan-400
                "
              >

                LinkedIn

                <ExternalLink
                  size={14}
                  className="
                    transition
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                  "
                />

              </a>

            </div>



            {/* PRICING */}

            <button
              type="button"
              onClick={() =>
                scrollToSection("pricing")
              }
              className="
                mt-7
                inline-flex
                items-center
                gap-2
                rounded-xl
                border
                border-cyan-400/20
                bg-cyan-400/5
                px-4
                py-3
                text-sm
                font-medium
                text-cyan-400
                transition
                duration-300
                hover:border-cyan-400/40
                hover:bg-cyan-400/10
              "
            >

              View Pricing

              <ArrowUpRight size={16} />

            </button>

          </div>

        </div>



        {/* =========================================
            BOTTOM
        ========================================= */}

        <div
          className="
            mt-14
            flex
            flex-col
            gap-4
            border-t
            border-white/10
            pt-6
            text-sm
            text-slate-500
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >

          <p>
            © 2026 SmartBank AI. All rights reserved.
          </p>


          <div
            className="
              flex
              items-center
              gap-5
            "
          >

            <button
              type="button"
              className="
                transition
                hover:text-cyan-400
              "
            >
              Privacy
            </button>


            <button
              type="button"
              className="
                transition
                hover:text-cyan-400
              "
            >
              Terms
            </button>


            <div
              className="
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
                  text-slate-500
                "
              >
                All systems operational
              </span>

            </div>

          </div>

        </div>

      </div>

    </footer>

  );

};


export default Footer;

