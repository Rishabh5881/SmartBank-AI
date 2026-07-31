import {
  ShieldCheck,
  BrainCircuit,
  Mail
} from "lucide-react";


const Footer = () => {

  return (

    <footer
      className="
      relative
      overflow-hidden
      bg-[#020617]
      border-t
      border-white/10
      py-16
      "
    >


      {/* Background Glow */}

      <div
        className="
        absolute
        right-0
        top-0
        h-[300px]
        w-[300px]
        rounded-full
        bg-cyan-500/10
        blur-[120px]
        "
      />




      <div
        className="
        relative
        mx-auto
        max-w-7xl
        px-6
        lg:px-12
        "
      >



        <div
          className="
          grid
          gap-10
          md:grid-cols-4
          "
        >



          {/* Brand */}


          <div>


            <div
              className="
              flex
              items-center
              gap-2
              text-2xl
              font-bold
              text-white
              "
            >

              <BrainCircuit
                className="text-cyan-400"
              />


              SmartBank AI


            </div>



            <p
              className="
              mt-5
              text-slate-400
              leading-7
              "
            >

              Next generation banking experience
              powered by artificial intelligence.

            </p>



            <div
              className="
              mt-5
              flex
              items-center
              gap-2
              text-green-400
              "
            >

              <ShieldCheck size={18}/>

              Bank Grade Security


            </div>


          </div>






          {/* Platform */}


          <div>


            <h3
              className="
              font-semibold
              text-white
              "
            >

              Platform

            </h3>



            <ul
              className="
              mt-5
              space-y-3
              text-slate-400
              "
            >

              <li>AI Assistant</li>

              <li>Analytics</li>

              <li>Security</li>

              <li>Dashboard</li>


            </ul>


          </div>







          {/* Company */}


          <div>


            <h3
              className="
              font-semibold
              text-white
              "
            >

              Company

            </h3>



            <ul
              className="
              mt-5
              space-y-3
              text-slate-400
              "
            >

              <li>About</li>

              <li>Careers</li>

              <li>Contact</li>

              <li>Blog</li>


            </ul>


          </div>








          {/* Newsletter */}


          <div>


            <h3
              className="
              font-semibold
              text-white
              "
            >

              Newsletter

            </h3>



            <p
              className="
              mt-5
              text-slate-400
              "
            >

              Get latest AI banking updates.

            </p>




            <div
              className="
              mt-5
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-white/10
              bg-white/5
              p-2
              "
            >


              <Mail
                size={18}
                className="text-cyan-400"
              />


              <input

                placeholder="Email"

                className="
                w-full
                bg-transparent
                text-white
                outline-none
                "

              />



              <button

                className="
                rounded-lg
                bg-gradient-to-r
                from-blue-600
                to-cyan-400
                px-4
                py-2
                text-white
                "

              >

                Join

              </button>


            </div>


          </div>



        </div>







        {/* Bottom */}


        <div

          className="
          mt-14
          border-t
          border-white/10
          pt-6
          text-center
          text-sm
          text-slate-500
          "

        >

          © 2026 SmartBank AI · Privacy · Terms · Security


        </div>



      </div>



    </footer>

  );

};



export default Footer;