import { motion } from "framer-motion";


const Loader = () => {

  return (

    <div
      className="
      fixed
      inset-0
      z-[999]
      flex
      items-center
      justify-center
      bg-slate-950
      "
    >


      <motion.div

        animate={{
          scale:[1,1.2,1],
          rotate:[0,180,360]
        }}

        transition={{
          duration:1.5,
          repeat:Infinity
        }}

        className="
        flex
        h-20
        w-20
        items-center
        justify-center
        rounded-3xl
        bg-gradient-to-br
        from-blue-600
        to-cyan-400
        text-3xl
        "
      >

        🛡

      </motion.div>



    </div>

  );

};


export default Loader;