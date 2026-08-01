import { motion } from "framer-motion";
import {
  ShieldCheck,
  Sparkles,
  Activity,
  LockKeyhole,
  BrainCircuit,
  Zap,
} from "lucide-react";

const features = [
  {
    title: "AI Powered",
    description: "Smart financial insights",
    icon: BrainCircuit,
  },
  {
    title: "Bank Grade Security",
    description: "Advanced protection",
    icon: ShieldCheck,
  },
  {
    title: "Encrypted Data",
    description: "Secure transactions",
    icon: LockKeyhole,
  },
  {
    title: "Real Time Analytics",
    description: "Track finances instantly",
    icon: Activity,
  },
  {
    title: "Fraud Detection",
    description: "AI risk monitoring",
    icon: Sparkles,
  },
  {
    title: "24/7 Support",
    description: "Always available",
    icon: Zap,
  },
];

const TrustedCompanies = () => {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
          className="text-center"
        >
          <p
            className="
              text-sm
              uppercase
              tracking-[0.3em]
              text-slate-400
            "
          >
            Smart Banking Infrastructure
          </p>

          <h2
            className="
              mt-4
              text-3xl
              font-bold
              text-white
              md:text-4xl
            "
          >
            Built For{" "}
            <span
              className="
                bg-gradient-to-r
                from-blue-500
                to-cyan-400
                bg-clip-text
                text-transparent
              "
            >
              Modern Digital Banking
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-4
              max-w-2xl
              text-slate-400
            "
          >
            Experience secure transactions, AI-driven insights,
            and intelligent financial management in one platform.
          </p>
        </motion.div>


        <motion.div
          initial={{
            opacity: 0,
            y: 35,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
          }}
          className="
            mt-12
            grid
            grid-cols-2
            gap-5
            md:grid-cols-3
            lg:grid-cols-6
          "
        >

          {features.map((item) => {

            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                whileHover={{
                  y: -8,
                }}
                className="
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/[0.04]
                  p-5
                  text-center
                  backdrop-blur-xl
                  transition
                  hover:bg-white/[0.08]
                "
              >

                <div
                  className="
                    mx-auto
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    bg-blue-500/10
                  "
                >
                  <Icon
                    size={22}
                    className="text-cyan-400"
                  />
                </div>

                <h3
                  className="
                    mt-4
                    text-sm
                    font-semibold
                    text-white
                  "
                >
                  {item.title}
                </h3>

                <p
                  className="
                    mt-2
                    text-xs
                    text-slate-500
                  "
                >
                  {item.description}
                </p>

              </motion.div>
            );
          })}

        </motion.div>

      </div>
    </section>
  );
};

export default TrustedCompanies;