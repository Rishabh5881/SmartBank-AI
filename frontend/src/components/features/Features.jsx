import {
  ShieldCheck,
  BrainCircuit,
  BarChart3,
  CreditCard,
  Zap,
  LockKeyhole
} from "lucide-react";



const features = [

  {
    icon: BrainCircuit,
    title: "AI Financial Assistant",
    description:
      "Get intelligent recommendations, spending insights and personalized financial guidance using AI."
  },


  {
    icon: ShieldCheck,
    title: "Advanced Security",
    description:
      "Secure every transaction with smart fraud detection and modern banking protection."
  },


  {
    icon: BarChart3,
    title: "Smart Analytics",
    description:
      "Track expenses, analyze spending habits and understand your financial growth."
  },


  {
    icon: CreditCard,
    title: "Digital Banking",
    description:
      "Manage cards, payments and transactions from one powerful banking dashboard."
  },


  {
    icon: Zap,
    title: "Instant Transactions",
    description:
      "Experience fast and reliable payments with real-time transaction processing."
  },


  {
    icon: LockKeyhole,
    title: "Privacy First",
    description:
      "Your financial data stays protected with secure encryption technology."
  }

];






const Features = () => {


  return (

    <section

      id="features"

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
        left-1/2
        top-0
        h-[450px]
        w-[450px]
        -translate-x-1/2
        rounded-full
        bg-blue-600/20
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





        {/* Heading */}


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
            rounded-full
            border
            border-blue-500/20
            bg-blue-500/10
            px-5
            py-2
            text-sm
            font-medium
            text-blue-400
            "

          >

            ✨ Powerful Features

          </div>






          <h2

            className="
            mt-6
            text-4xl
            font-extrabold
            text-white
            sm:text-5xl
            "

          >

            Everything you need for


            <span

              className="
              block
              bg-gradient-to-r
              from-blue-500
              to-cyan-400
              bg-clip-text
              text-transparent
              "

            >

              smarter banking

            </span>


          </h2>







          <p

            className="
            mt-5
            text-lg
            leading-8
            text-slate-400
            "

          >

            SmartBank AI combines intelligent automation,
            security and analytics to deliver next generation
            banking experience.

          </p>



        </div>









        {/* Feature Cards */}



        <div

          className="
          mt-16
          grid
          gap-6
          sm:grid-cols-2
          lg:grid-cols-3
          "

        >



          {
            features.map((feature,index)=>{


              const Icon = feature.icon;



              return (


                <div

                  key={index}

                  className="
                  group
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/[0.05]
                  p-8
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:border-cyan-400/40
                  "

                >






                  {/* Icon */}


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
                    shadow-blue-500/30
                    "

                  >


                    <Icon

                      size={28}

                      className="
                      text-white
                      "

                    />


                  </div>








                  <h3

                    className="
                    mt-7
                    text-xl
                    font-bold
                    text-white
                    "

                  >

                    {feature.title}


                  </h3>








                  <p

                    className="
                    mt-4
                    leading-7
                    text-slate-400
                    "

                  >

                    {feature.description}


                  </p>







                  <div

                    className="
                    mt-6
                    text-sm
                    font-medium
                    text-cyan-400
                    opacity-0
                    transition
                    group-hover:opacity-100
                    "

                  >

                    Explore Feature →

                  </div>





                </div>


              );


            })

          }



        </div>





      </div>





    </section>


  );

};



export default Features;