import { motion } from "framer-motion";


const FeatureCard = ({
  icon,
  title,
  description
}) => {


  return (

    <motion.div

      whileHover={{
        y:-8
      }}

      className="
        group
        bg-white/5
        backdrop-blur-xl
        border
        border-white/10
        rounded-3xl
        p-7
        hover:border-blue-400/40
        transition
      "

    >


      <div className="
        w-14
        h-14
        rounded-2xl
        bg-blue-500/10
        text-blue-400
        flex
        items-center
        justify-center
        mb-6
        group-hover:scale-110
        transition
      ">

        {icon}

      </div>



      <h3 className="
        text-xl
        font-semibold
        mb-3
      ">

        {title}

      </h3>




      <p className="
        text-slate-400
        leading-relaxed
      ">

        {description}

      </p>



    </motion.div>

  );

};


export default FeatureCard;