
import { motion } from "framer-motion";

import {
  Wallet,
  TrendingUp,
  TrendingDown
} from "lucide-react";



const BalanceCards = () => {



  const cards = [

    {
      title: "Total Balance",
      amount: "$24,580",
      growth: "+12.5%",
      desc: "Compared to last month",
      icon: <Wallet />,
      color: "from-blue-600 to-cyan-400"
    },

    {
      title: "Monthly Income",
      amount: "$8,500",
      growth: "+8.4%",
      desc: "Compared to last month",
      icon: <TrendingUp />,
      color: "from-green-500 to-emerald-400"
    },

    {
      title: "Monthly Expense",
      amount: "$2,300",
      growth: "-4.1%",
      desc: "You saved more",
      icon: <TrendingDown />,
      color: "from-red-500 to-orange-400"
    }

  ];



  return (

    <div
      className="
        grid
        md:grid-cols-3
        gap-6
      "
    >


      {cards.map((card, index) => (


        <motion.div

          key={index}

          initial={{
            opacity: 0,
            y: 20
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

          transition={{
            delay: index * 0.1
          }}

          whileHover={{
            scale: 1.04
          }}

          className="
            relative
            overflow-hidden
            bg-white/10
            border
            border-white/10
            rounded-3xl
            p-6
            text-white
            backdrop-blur-xl
          "
        >



          {/* Glow */}

          <div
            className={`
              absolute
              top-0
              right-0
              w-32
              h-32
              bg-gradient-to-br
              ${card.color}
              opacity-20
              blur-3xl
            `}
          />



          <div className="
            relative
            z-10
          ">



            {/* Header */}

            <div className="
              flex
              justify-between
              items-center
            ">


              <div className="
                w-12
                h-12
                rounded-xl
                bg-white/10
                flex
                items-center
                justify-center
                text-cyan-400
              ">

                {card.icon}

              </div>



              <span
                className={`
                  text-sm
                  font-semibold
                  px-3
                  py-1
                  rounded-full

                  ${
                    card.growth.includes("+")
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }
                `}
              >

                {card.growth}

              </span>


            </div>



            {/* Title */}

            <h3 className="
              text-gray-400
              mt-6
            ">

              {card.title}

            </h3>



            {/* Amount */}

            <h2 className="
              text-4xl
              font-bold
              mt-2
            ">

              {card.amount}

            </h2>



            {/* Description */}

            <p className="
              text-sm
              text-gray-400
              mt-2
            ">

              {card.desc}

            </p>



            {/* Mini Analytics */}

            <div className="
              mt-6
              h-2
              bg-white/10
              rounded-full
              overflow-hidden
            ">


              <div
                className={`
                  h-full
                  rounded-full
                  bg-gradient-to-r
                  ${card.color}
                `}
                style={{
                  width:
                    index === 0
                      ? "75%"
                      : index === 1
                      ? "65%"
                      : "40%"
                }}
              />


            </div>


          </div>


        </motion.div>


      ))}


    </div>

  );

};



export default BalanceCards;

