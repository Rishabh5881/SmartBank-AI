import {
  ShieldCheck,
  BrainCircuit,
  ArrowUpRight,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";


const Footer = () => {


  const scrollToSection = (id) => {

    const section = document.getElementById(id);

    if(section){

      section.scrollIntoView({
        behavior:"smooth"
      });

    }

  };


  return (

    <footer className="
      relative
      overflow-hidden
      border-t
      border-white/10
      bg-slate-950
      text-white
    ">


      <div className="
        mx-auto
        max-w-7xl
        px-6
        py-16
      ">


        <div className="
          grid
          gap-10
          md:grid-cols-3
        ">


          {/* BRAND */}

          <div>


            <div className="
              flex
              items-center
              gap-3
            ">


              <div className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                bg-gradient-to-r
                from-blue-600
                to-cyan-400
              ">

                <BrainCircuit size={25}/>

              </div>


              <h2 className="
                text-xl
                font-bold
              ">

                SmartBank
                <span className="text-cyan-400">
                  AI
                </span>

              </h2>


            </div>



            <p className="
              mt-5
              text-sm
              leading-6
              text-slate-400
            ">

              AI powered digital banking platform
              built for smarter financial decisions.

            </p>



            <div className="
              mt-5
              flex
              items-center
              gap-3
              rounded-xl
              border
              border-white/10
              bg-white/5
              p-3
            ">


              <ShieldCheck
                size={20}
                className="text-cyan-400"
              />


              <span className="text-xs text-slate-400">

                Bank Grade Security

              </span>


            </div>


          </div>





          {/* LINKS */}

          <div>


            <h3 className="
              font-semibold
            ">

              Platform

            </h3>



            <div className="
              mt-5
              space-y-3
            ">


              {
                [
                  ["Home","home"],
                  ["Features","features"],
                  ["AI","ai"],
                  ["Security","security"],
                  ["Pricing","pricing"]
                ]
                .map(([name,id])=>(


                  <button
                    key={id}
                    onClick={()=>scrollToSection(id)}
                    className="
                      block
                      text-sm
                      text-slate-400
                      hover:text-cyan-400
                    "
                  >

                    {name}

                  </button>


                ))
              }


            </div>


          </div>





          {/* SOCIAL */}

          <div>


            <h3 className="
              font-semibold
            ">

              Connect

            </h3>



            <p className="
              mt-5
              text-sm
              text-slate-400
            ">

              Follow SmartBank AI

            </p>



            <div className="
              mt-5
              flex
              gap-4
            ">


              <a
                href="#"
                className="
                  rounded-lg
                  border
                  border-white/10
                  p-3
                  hover:bg-white/10
                "
              >

                <Github size={18}/>

              </a>



              <a
                href="#"
                className="
                  rounded-lg
                  border
                  border-white/10
                  p-3
                  hover:bg-white/10
                "
              >

                <Linkedin size={18}/>

              </a>



              <a
                href="#"
                className="
                  rounded-lg
                  border
                  border-white/10
                  p-3
                  hover:bg-white/10
                "
              >

                <Twitter size={18}/>

              </a>


            </div>



            <button
              onClick={()=>scrollToSection("pricing")}
              className="
                mt-6
                flex
                items-center
                gap-2
                text-sm
                text-cyan-400
              "
            >

              View Pricing

              <ArrowUpRight size={15}/>


            </button>


          </div>



        </div>





        <div className="
          mt-12
          border-t
          border-white/10
          pt-6
          text-center
          text-sm
          text-slate-500
        ">

          © 2026 SmartBank AI. All rights reserved.

        </div>



      </div>


    </footer>

  );

};


export default Footer;