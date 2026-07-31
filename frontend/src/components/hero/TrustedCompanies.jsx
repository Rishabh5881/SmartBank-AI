import { motion } from "framer-motion";

const companies = [
  "Stripe",
  "Revolut",
  "CRED",
  "Jupiter",
  "PayPal",
  "Visa",
];


const TrustedCompanies = () => {
  return (
    <section
      className="
      py-20
      relative
      "
    >

      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        lg:px-8
        "
      >


        <motion.div

          initial={{
            opacity:0,
            y:30
          }}

          whileInView={{
            opacity:1,
            y:0
          }}

          viewport={{
            once:true
          }}

          transition={{
            duration:0.6
          }}

          className="
          text-center
          "
        >

          <p
            className="
            text-sm
            uppercase
            tracking-[0.3em]
            text-slate-400
            "
          >
            Trusted By Modern Finance Users
          </p>


          <h2
            className="
            mt-4
            text-3xl
            md:text-4xl
            font-bold
            "
          >

            Built With
            <span
              className="
              ml-2
              bg-gradient-to-r
              from-blue-500
              to-cyan-400
              bg-clip-text
              text-transparent
              "
            >
              Enterprise
            </span>
            Grade Security

          </h2>


        </motion.div>





        <motion.div

          initial={{
            opacity:0,
            y:40
          }}

          whileInView={{
            opacity:1,
            y:0
          }}

          viewport={{
            once:true
          }}

          transition={{
            duration:0.7
          }}

          className="
          mt-12
          grid
          grid-cols-2
          md:grid-cols-3
          lg:grid-cols-6
          gap-5
          "
        >


          {companies.map((company,index)=>(

            <motion.div

              key={company}

              whileHover={{
                y:-8
              }}

              transition={{
                duration:0.2
              }}

              className="
              h-24
              rounded-3xl
              border
              border-white/10
              bg-white/5
              backdrop-blur-xl
              flex
              items-center
              justify-center
              text-lg
              font-semibold
              text-slate-300
              hover:text-white
              hover:bg-white/10
              transition
              "
            >

              {company}

            </motion.div>

          ))}


        </motion.div>


      </div>


    </section>
  );
};


export default TrustedCompanies;