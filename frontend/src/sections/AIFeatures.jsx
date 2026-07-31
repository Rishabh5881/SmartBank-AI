import {
  BrainCircuit,
  Sparkles,
  TrendingUp,
  Bot
} from "lucide-react";



const aiFeatures = [

  {
    icon: BrainCircuit,
    title: "AI Financial Assistant",
    description:
      "Get personalized financial suggestions based on your spending behavior."
  },


  {
    icon: TrendingUp,
    title: "Smart Predictions",
    description:
      "AI analyzes your income and expenses to predict future financial trends."
  },


  {
    icon: Bot,
    title: "AI Money Coach",
    description:
      "Your personal AI assistant helps you save, invest and manage money better."
  }

];





const AIFeatures = () => {


  return (

    <section

      id="ai"

      className="
      relative
      overflow-hidden
      bg-[#020617]
      py-24
      "

    >




      <div

        className="
        absolute
        right-0
        top-20
        h-[400px]
        w-[400px]
        rounded-full
        bg-cyan-500/20
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
            text-cyan-400
            "

          >

            <Sparkles size={16}/>

            AI Powered Banking

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

            Intelligence that makes your


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

              money smarter

            </span>


          </h2>






          <p

            className="
            mt-5
            text-lg
            text-slate-400
            "

          >

            SmartBank AI uses artificial intelligence
            to understand your financial journey.

          </p>



        </div>









        <div

          className="
          mt-16
          grid
          gap-6
          md:grid-cols-3
          "

        >



          {
            aiFeatures.map((item,index)=>{


              const Icon=item.icon;


              return (


                <div

                  key={index}

                  className="
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/[0.05]
                  p-8
                  backdrop-blur-xl
                  transition
                  hover:-translate-y-2
                  hover:border-cyan-400/40
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
                    "

                  >

                    <Icon
                      className="text-white"
                      size={28}
                    />

                  </div>





                  <h3

                    className="
                    mt-6
                    text-xl
                    font-bold
                    text-white
                    "

                  >

                    {item.title}

                  </h3>





                  <p

                    className="
                    mt-3
                    leading-7
                    text-slate-400
                    "

                  >

                    {item.description}

                  </p>




                </div>


              );


            })

          }



        </div>






      </div>



    </section>


  );

};



export default AIFeatures;