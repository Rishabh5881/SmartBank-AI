import { motion } from "framer-motion";
import {
  BrainCircuit,
  TrendingUp,
  ShieldCheck,
  PiggyBank
} from "lucide-react";



const AIHealthScore = () => {

  const score = 87;

  const factors = [
    {
      title: "Saving",
      value: "92%",
      icon: <PiggyBank size={18} />,
      color: "text-green-400"
    },
    {
      title: "Spending",
      value: "85%",
      icon: <TrendingUp size={18} />,
      color: "text-cyan-400"
    },
    {
      title: "Security",
      value: "95%",
      icon: <ShieldCheck size={18} />,
      color: "text-blue-400"
    }
  ];



  return (
    <motion.div

      initial={{
        opacity: 0,
        y: 25
      }}

      animate={{
        opacity: 1,
        y: 0
      }}

      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-gradient-to-br
        from-purple-600/20
        via-blue-600/10
        to-cyan-500/10
        p-6
        text-white
        backdrop-blur-xl
      "
    >

      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-48
          w-48
          rounded-full
          bg-purple-500/10
          blur-3xl
        "
      />



      <div className="relative">

        {/* Header */}

        <div className="
          flex
          items-center
          gap-3
        ">

          <div className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-2xl
            bg-purple-500/20
          ">

            <BrainCircuit
              className="text-purple-400"
              size={23}
            />

          </div>

          <div>

            <h2 className="
              text-xl
              font-bold
            ">
              AI Health Score
            </h2>

            <p className="
              text-sm
              text-slate-400
            ">
              Smart financial analysis
            </p>

          </div>

        </div>



        {/* Score */}

        <div className="
          mt-7
          flex
          items-center
          gap-6
        ">

          <div className="
            relative
            flex
            h-32
            w-32
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-gradient-to-br
            from-purple-500
            via-blue-500
            to-cyan-400
            p-1
          ">

            <div className="
              flex
              h-full
              w-full
              flex-col
              items-center
              justify-center
              rounded-full
              bg-slate-950
            ">

              <span className="
                text-4xl
                font-bold
              ">
                {score}
              </span>

              <span className="
                text-xs
                text-slate-500
              ">
                / 100
              </span>

            </div>

          </div>



          <div>

            <p className="
              text-lg
              font-semibold
              text-green-400
            ">
              Excellent
            </p>

            <p className="
              mt-2
              text-sm
              leading-6
              text-slate-400
            ">
              Your financial habits are performing
              better than average.
            </p>

          </div>

        </div>



        {/* Factors */}

        <div className="
          mt-7
          grid
          grid-cols-3
          gap-3
        ">

          {factors.map((item, index) => (

            <motion.div
              key={index}
              whileHover={{
                y: -4
              }}
              className="
                rounded-2xl
                border
                border-white/10
                bg-white/[0.04]
                p-3
              "
            >

              <div className={item.color}>
                {item.icon}
              </div>

              <p className="
                mt-3
                text-xs
                text-slate-500
              ">
                {item.title}
              </p>

              <p className="
                mt-1
                font-bold
              ">
                {item.value}
              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </motion.div>
  );
};



export default AIHealthScore;