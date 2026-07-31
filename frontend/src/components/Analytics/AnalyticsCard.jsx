import { motion } from "framer-motion";


const AnalyticsCard = ({
  icon: Icon,
  title,
  value,
  description
}) => {

  return (

    <motion.div

      whileHover={{
        y:-8
      }}

      transition={{
        duration:0.3
      }}

      className="
      rounded-3xl
      border
      border-white/10
      bg-slate-900/70
      p-6
      backdrop-blur-xl
      "

    >


      <div
        className="
        flex
        h-12
        w-12
        items-center
        justify-center
        rounded-2xl
        bg-blue-500/10
        text-blue-400
        "
      >

        <Icon size={24}/>

      </div>



      <p
        className="
        mt-5
        text-sm
        text-slate-400
        "
      >
        {title}
      </p>



      <h3
        className="
        mt-2
        text-3xl
        font-bold
        text-white
        "
      >
        {value}
      </h3>



      <p
        className="
        mt-3
        text-sm
        text-slate-400
        "
      >
        {description}
      </p>


    </motion.div>

  );

};


export default AnalyticsCard;