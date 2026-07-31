import { Users, ShieldCheck, Activity } from "lucide-react";
import { motion } from "framer-motion";


const stats = [

  {
    icon: Users,
    value:"10K+",
    title:"Active Users"
  },


  {
    icon: ShieldCheck,
    value:"99.9%",
    title:"Security Score"
  },


  {
    icon: Activity,
    value:"24/7",
    title:"AI Monitoring"
  }

];




const HeroStats = () => {


  return (

    <div

      className="
      mt-10
      grid
      grid-cols-3
      gap-4
      max-w-xl
      "

    >


      {
        stats.map((item,index)=>{


          const Icon = item.icon;


          return (

            <motion.div

              key={index}

              whileHover={{
                y:-6
              }}

              transition={{
                duration:0.3
              }}


              className="
              rounded-2xl
              border
              border-white/10
              bg-white/[0.05]
              p-4
              backdrop-blur-xl
              "

            >



              <div

                className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-blue-500/10
                "

              >

                <Icon

                  size={20}

                  className="
                  text-cyan-400
                  "

                />

              </div>







              <h3

                className="
                mt-4
                text-2xl
                font-bold
                text-white
                "

              >

                {item.value}

              </h3>






              <p

                className="
                mt-1
                text-xs
                text-slate-400
                "

              >

                {item.title}

              </p>





            </motion.div>

          );


        })
      }


    </div>


  );

};


export default HeroStats;