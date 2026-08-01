
import { motion } from "framer-motion";

import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Activity
} from "lucide-react";


const AnalyticsCard = () => {


  const analytics = [

    {
      title: "Income",
      value: "$8,500",
      change: "+8.4%",
      positive: true,
      icon: TrendingUp,
      description: "vs last month"
    },

    {
      title: "Expenses",
      value: "$2,300",
      change: "-4.1%",
      positive: true,
      icon: TrendingDown,
      description: "vs last month"
    },

    {
      title: "Savings",
      value: "$6,200",
      change: "+12.8%",
      positive: true,
      icon: Activity,
      description: "this month"
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

      transition={{
        duration: 0.5
      }}

      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-white/10
        p-6
        text-white
        backdrop-blur-xl
      "
    >


      {/* Background Glow */}

      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-48
          w-48
          rounded-full
          bg-cyan-500/10
          blur-3xl
        "
      />


      <div
        className="
          pointer-events-none
          absolute
          -bottom-20
          -left-20
          h-48
          w-48
          rounded-full
          bg-blue-600/10
          blur-3xl
        "
      />



      <div className="relative z-10">


        {/* Header */}

        <div className="
          flex
          items-center
          justify-between
        ">


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
              rounded-2xl
              bg-cyan-400/10
              text-cyan-400
            ">

              <BarChart3 size={24} />

            </div>


            <div>

              <h2 className="
                text-xl
                font-bold
              ">

                Financial Analytics

              </h2>


              <p className="
                mt-1
                text-sm
                text-slate-400
              ">

                Monthly financial performance

              </p>

            </div>


          </div>



          <div className="
            rounded-full
            border
            border-cyan-400/20
            bg-cyan-400/10
            px-3
            py-1.5
            text-xs
            font-semibold
            text-cyan-400
          ">

            This Month

          </div>


        </div>



        {/* Main Analytics */}

        <div className="
          mt-7
          grid
          gap-4
          md:grid-cols-3
        ">


          {analytics.map((item, index) => {

            const Icon = item.icon;


            return (

              <motion.div

                key={index}

                whileHover={{
                  y: -4
                }}

                transition={{
                  duration: 0.2
                }}

                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  p-4
                "
              >


                <div className="
                  flex
                  items-center
                  justify-between
                ">


                  <div className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    bg-white/10
                    text-cyan-400
                  ">

                    <Icon size={18} />

                  </div>


                  <span className="
                    rounded-full
                    bg-green-500/10
                    px-2
                    py-1
                    text-xs
                    font-semibold
                    text-green-400
                  ">

                    {item.change}

                  </span>


                </div>



                <p className="
                  mt-4
                  text-sm
                  text-slate-400
                ">

                  {item.title}

                </p>


                <h3 className="
                  mt-1
                  text-2xl
                  font-bold
                ">

                  {item.value}

                </h3>


                <p className="
                  mt-1
                  text-xs
                  text-slate-500
                ">

                  {item.description}

                </p>


              </motion.div>

            );

          })}


        </div>



        {/* Spending Overview */}

        <div className="
          mt-6
          rounded-2xl
          border
          border-white/10
          bg-slate-950/30
          p-5
        ">


          <div className="
            flex
            items-center
            justify-between
            mb-4
          ">


            <div>

              <p className="
                text-sm
                text-slate-400
              ">

                Savings Rate

              </p>


              <h3 className="
                mt-1
                text-2xl
                font-bold
              ">

                72.9%

              </h3>

            </div>


            <div className="
              text-right
            ">

              <p className="
                text-xs
                text-slate-500
              ">

                Target

              </p>


              <p className="
                text-sm
                font-semibold
                text-cyan-400
              ">

                70%

              </p>

            </div>


          </div>



          {/* Progress */}

          <div className="
            h-3
            overflow-hidden
            rounded-full
            bg-white/10
          ">


            <motion.div

              initial={{
                width: 0
              }}

              animate={{
                width: "72.9%"
              }}

              transition={{
                duration: 1,
                delay: 0.3
              }}

              className="
                h-full
                rounded-full
                bg-gradient-to-r
                from-blue-600
                to-cyan-400
              "
            />


          </div>



          <div className="
            mt-3
            flex
            items-center
            justify-between
            text-xs
          ">


            <span className="
              text-slate-500
            ">

              Current savings performance

            </span>


            <span className="
              font-semibold
              text-green-400
            ">

              Above target

            </span>


          </div>


        </div>



      </div>


    </motion.div>

  );

};


export default AnalyticsCard;

