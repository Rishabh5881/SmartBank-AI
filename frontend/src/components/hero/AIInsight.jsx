import {
  BrainCircuit,
  TrendingDown
} from "lucide-react";


const AIInsight = () => {


  return (

    <div

      className="
      w-[280px]
      rounded-3xl
      border
      border-cyan-400/20
      bg-slate-900/90
      p-5
      backdrop-blur-xl
      shadow-2xl
      shadow-cyan-500/20
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
          rounded-xl
          bg-gradient-to-br
          from-blue-600
          to-cyan-400
          "

        >

          <BrainCircuit
            className="text-white"
          />

        </div>





        <div>

          <p
            className="
            text-sm
            font-semibold
            text-white
            "
          >

            AI Financial Insight

          </p>


          <p
            className="
            text-xs
            text-slate-400
            "
          >

            Smart Analysis

          </p>


        </div>



      </div>







      <div

        className="
        mt-5
        flex
        items-center
        gap-2
        "

      >

        <TrendingDown

          size={18}

          className="
          text-green-400
          "

        />


        <p

          className="
          text-sm
          font-semibold
          text-green-400
          "

        >

          12% Lower Spending

        </p>


      </div>






      <p

        className="
        mt-3
        text-sm
        leading-6
        text-slate-400
        "

      >

        Your spending is 12% lower this month.
        Keep maintaining your smart saving habits.

      </p>



    </div>

  );


};


export default AIInsight;