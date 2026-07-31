import { motion } from "framer-motion";
import { Check } from "lucide-react";


const PricingCard = ({
  title,
  price,
  description,
  features,
  popular
}) => {


  return (

    <motion.div

      whileHover={{
        y:-8
      }}

      transition={{
        duration:0.3
      }}


      className={`
      relative
      flex
      min-h-[520px]
      flex-col
      rounded-3xl
      border
      p-8
      backdrop-blur-xl
      transition-all


      ${
        popular

        ?

        `
        border-blue-400/50
        bg-gradient-to-b
        from-blue-500/20
        to-cyan-500/10
        shadow-xl
        shadow-blue-500/20
        `

        :

        `
        border-white/10
        bg-white/[0.05]
        `
      }

      `}

    >





      {/* Popular Badge */}

      {
        popular && (

          <div
            className="
            absolute
            -top-4
            left-1/2
            -translate-x-1/2
            rounded-full
            bg-gradient-to-r
            from-blue-600
            to-cyan-400
            px-5
            py-2
            text-sm
            font-semibold
            text-white
            shadow-lg
            "
          >

            Most Popular

          </div>

        )
      }








      <h3
        className="
        text-2xl
        font-bold
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








      <div
        className="
        mt-8
        flex
        items-end
        gap-2
        "
      >

        <h2
          className="
          text-5xl
          font-extrabold
          text-white
          "
        >

          {price}

        </h2>


        {
          price !== "Free" && (

            <span
              className="
              mb-2
              text-slate-400
              "
            >

              /month

            </span>

          )
        }


      </div>








      <ul
        className="
        mt-8
        flex-1
        space-y-4
        "
      >

        {
          features.map((feature,index)=>(

            <li

              key={index}

              className="
              flex
              items-center
              gap-3
              text-slate-300
              "

            >

              <Check
                size={18}
                className="
                text-cyan-400
                "
              />

              {feature}


            </li>

          ))
        }


      </ul>








      <button

        className={`
        mt-8
        w-full
        rounded-full
        py-3
        font-semibold
        transition


        ${
          popular

          ?

          `
          bg-gradient-to-r
          from-blue-600
          to-cyan-400
          text-white
          shadow-lg
          shadow-blue-500/30
          hover:scale-105
          `

          :

          `
          border
          border-white/10
          text-white
          hover:bg-white/10
          `
        }

        `}

      >

        Get Started

      </button>





    </motion.div>

  );

};


export default PricingCard;