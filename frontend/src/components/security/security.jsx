import {
  ShieldCheck,
  Fingerprint,
  Lock,
  Eye,
  Activity
} from "lucide-react";



const securityFeatures = [

  {
    icon: ShieldCheck,
    title: "AI Fraud Detection",
    text:
      "Smart algorithms analyze transactions instantly and detect suspicious activities."
  },


  {
    icon: Fingerprint,
    title: "Biometric Protection",
    text:
      "Advanced identity verification keeps your account protected."
  },


  {
    icon: Lock,
    title: "Data Encryption",
    text:
      "Your financial information is protected with secure encryption technology."
  }

];





const Security = () => {


  return (


    <section

      id="security"

      className="
      relative
      overflow-hidden
      bg-[#020617]
      py-24
      "

    >





      {/* Background Glow */}


      <div

        className="
        absolute
        right-0
        top-20
        h-[450px]
        w-[450px]
        rounded-full
        bg-cyan-500/10
        blur-[140px]
        "

      />







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





        <div

          className="
          grid
          items-center
          gap-16
          lg:grid-cols-2
          "

        >






          {/* LEFT CONTENT */}


          <div>



            <div

              className="
              inline-flex
              rounded-full
              border
              border-green-500/20
              bg-green-500/10
              px-5
              py-2
              text-sm
              text-green-400
              "

            >

              🛡 Bank Grade Security

            </div>






            <h2

              className="
              mt-6
              text-4xl
              font-bold
              text-white
              sm:text-5xl
              "

            >

              Your money is protected
              by intelligent security


            </h2>







            <p

              className="
              mt-6
              text-lg
              leading-8
              text-slate-400
              "

            >

              SmartBank AI continuously monitors
              transactions, detects threats and keeps
              your financial data secure 24/7.

            </p>









            <div

              className="
              mt-10
              space-y-5
              "

            >


              {

                securityFeatures.map((item,index)=>{


                  const Icon = item.icon;



                  return (


                    <div

                      key={index}

                      className="
                      group
                      flex
                      gap-5
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/[0.05]
                      p-5
                      backdrop-blur-xl
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-cyan-400/40
                      "

                    >




                      <div

                        className="
                        flex
                        h-12
                        w-12
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-gradient-to-br
                        from-blue-600/20
                        to-cyan-400/20
                        "

                      >

                        <Icon

                          className="text-cyan-400"

                        />


                      </div>







                      <div>


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
                          mt-2
                          text-sm
                          text-slate-400
                          "

                        >

                          {item.text}

                        </p>



                      </div>





                    </div>


                  );


                })

              }



            </div>



          </div>









          {/* RIGHT SECURITY CARD */}




          <div

            className="
            rounded-3xl
            border
            border-white/10
            bg-white/[0.06]
            p-8
            backdrop-blur-xl
            shadow-2xl
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


                <p className="text-sm text-slate-400">

                  Security Score

                </p>




                <h3

                  className="
                  mt-2
                  text-5xl
                  font-bold
                  text-white
                  "

                >

                  99.9%

                </h3>



              </div>








              <div

                className="
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                border
                border-green-400/30
                bg-green-400/10
                "

              >


                <ShieldCheck

                  size={40}

                  className="text-green-400"

                />


              </div>





            </div>









            <div

              className="
              mt-10
              rounded-2xl
              border
              border-white/10
              bg-slate-900/70
              p-5
              "

            >




              <div

                className="
                flex
                items-center
                gap-3
                "

              >


                <Activity

                  className="text-cyan-400"

                />



                <p

                  className="
                  font-medium
                  text-white
                  "

                >

                  AI Monitoring Active

                </p>



              </div>








              <div

                className="
                mt-5
                flex
                justify-between
                text-sm
                "

              >


                <span className="text-slate-400">

                  Threat Detection

                </span>




                <span className="text-green-400">

                  Active

                </span>



              </div>








              <div

                className="
                mt-4
                h-2
                overflow-hidden
                rounded-full
                bg-white/10
                "

              >


                <div

                  className="
                  h-full
                  w-[95%]
                  rounded-full
                  bg-gradient-to-r
                  from-blue-600
                  to-cyan-400
                  "

                />


              </div>



            </div>









            <div

              className="
              mt-6
              flex
              items-center
              gap-4
              rounded-2xl
              border
              border-white/10
              bg-white/5
              p-4
              "

            >


              <Eye className="text-cyan-400"/>



              <div>


                <p className="text-sm text-white">

                  Real-time monitoring

                </p>



                <p className="text-xs text-slate-400">

                  All systems secured

                </p>



              </div>


            </div>






          </div>





        </div>




      </div>




    </section>


  );

};



export default Security;