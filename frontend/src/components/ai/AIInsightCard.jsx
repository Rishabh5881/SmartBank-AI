import { motion } from "framer-motion";


const AIInsightCard = ({
  icon: Icon,
  title,
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
        h-14
        w-14
        items-center
        justify-center
        rounded-2xl
        bg-blue-500/10
        text-blue-400
        "
      >

        <Icon size={28}/>

      </div>



      <h3
        className="
        mt-6
        text-xl
        font-semibold
        text-white
        "
      >
        {title}
      </h3>



      <p
        className="
        mt-3
        leading-7
        text-slate-400
        "
      >
        {description}
      </p>


    </motion.div>

  );

};


export default AIInsightCard;