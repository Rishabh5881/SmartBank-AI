import {
  Check,
  Sparkles,
  ShieldCheck,
  Zap,
  Crown
} from "lucide-react";

import Reveal from "../common/Reveal";


const plans = [

  {
    name: "Starter",
    price: "$0",
    period: "/month",
    description:
      "Essential smart banking tools for everyday financial management.",

    icon: ShieldCheck,

    features: [
      "Basic Expense Tracking",
      "Transaction History",
      "Security Monitoring",
      "Basic Financial Insights",
      "Secure Account Access"
    ],

    button: "Get Started"
  },


  {
    name: "Smart Pro",
    price: "$19",
    period: "/month",
    description:
      "Powerful AI-driven tools for smarter financial decisions.",

    icon: Sparkles,

    popular: true,

    features: [
      "AI Financial Assistant",
      "Smart Spending Predictions",
      "Advanced Analytics",
      "Fraud Detection",
      "Personalized AI Insights",
      "Priority Support"
    ],

    button: "Start Pro"
  },


  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description:
      "Advanced banking intelligence and security for organizations.",

    icon: Crown,

    features: [
      "Enterprise Security",
      "Custom AI Models",
      "Advanced Financial Reports",
      "Dedicated Support",
      "Role-Based Access",
      "Custom Banking Solutions"
    ],

    button: "Contact Us"
  }

];


const Pricing = () => {

  return (

    <Reveal>

      <section
        id="pricing"
        className="
          relative
          overflow-hidden
          bg-slate-950
          py-28
        "
      >

        {/* ========================= */}
        {/* BACKGROUND GLOW */}
        {/* ========================= */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-20
            h-[500px]
            w-[500px]
            -translate-x-1/2
            rounded-full
            bg-blue-600/10
            blur-[150px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            right-0
            bottom-0
            h-[400px]
            w-[400px]
            rounded-full
            bg-cyan-500/10
            blur-[140px]
          "
        />


        {/* ========================= */}
        {/* CONTAINER */}
        {/* ========================= */}

        <div
          className="
            relative
            z-10
            mx-auto
            max-w-[1440px]
            px-6
            sm:px-8
            lg:px-12
          "
        >


          {/* ========================= */}
          {/* HEADING */}
          {/* ========================= */}

          <div
            className="
              mx-auto
              max-w-3xl
              text-center
            "
          >

            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-cyan-400/20
                bg-cyan-400/10
                px-5
                py-2
                text-sm
                font-medium
                text-cyan-400
              "
            >

              <Sparkles size={17} />

              Smart Banking Plans

            </div>


            <h2
              className="
                mt-7
                text-4xl
                font-extrabold
                tracking-tight
                text-white
                sm:text-5xl
                lg:text-6xl
              "
            >

              Choose the right plan

              <br />

              <span
                className="
                  bg-gradient-to-r
                  from-blue-500
                  to-cyan-400
                  bg-clip-text
                  text-transparent
                "
              >
                for your financial journey.
              </span>

            </h2>


            <p
              className="
                mx-auto
                mt-6
                max-w-2xl
                text-lg
                leading-8
                text-slate-400
              "
            >

              Start with powerful banking essentials and upgrade
              whenever you need more AI-powered financial intelligence.

            </p>

          </div>



          {/* ========================= */}
          {/* PRICING CARDS */}
          {/* ========================= */}

          <div
            className="
              mt-16
              grid
              gap-7
              lg:grid-cols-3
              lg:items-stretch
            "
          >

            {plans.map((plan, index) => {

              const Icon = plan.icon;

              return (

                <div
                  key={index}
                  className={`
                    group
                    relative
                    flex
                    flex-col
                    overflow-hidden
                    rounded-[32px]
                    border
                    p-8
                    backdrop-blur-xl
                    transition-all
                    duration-300
                    hover:-translate-y-2

                    ${
                      plan.popular
                        ?
                        "border-blue-500/50 bg-gradient-to-b from-blue-500/10 to-cyan-500/5 shadow-2xl shadow-blue-500/20"
                        :
                        "border-white/10 bg-white/[0.04] hover:border-cyan-400/20 hover:bg-white/[0.06]"
                    }
                  `}
                >

                  {/* Popular Glow */}

                  {plan.popular && (

                    <div
                      className="
                        pointer-events-none
                        absolute
                        -right-24
                        -top-24
                        h-48
                        w-48
                        rounded-full
                        bg-blue-500/20
                        blur-3xl
                      "
                    />

                  )}


                  {/* Popular Badge */}

                  {plan.popular && (

                    <div
                      className="
                        absolute
                        right-6
                        top-6
                        flex
                        items-center
                        gap-1.5
                        rounded-full
                        bg-gradient-to-r
                        from-blue-600
                        to-cyan-400
                        px-4
                        py-1.5
                        text-xs
                        font-bold
                        text-white
                        shadow-lg
                        shadow-blue-500/20
                      "
                    >

                      <Sparkles size={13} />

                      Most Popular

                    </div>

                  )}



                  {/* ICON */}

                  <div
                    className={`
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-2xl

                      ${
                        plan.popular
                          ?
                          "bg-gradient-to-br from-blue-600 to-cyan-400 shadow-lg shadow-blue-500/20"
                          :
                          "bg-blue-500/10"
                      }
                    `}
                  >

                    <Icon
                      size={25}
                      className={
                        plan.popular
                          ? "text-white"
                          : "text-blue-400"
                      }
                    />

                  </div>



                  {/* PLAN NAME */}

                  <h3
                    className="
                      mt-7
                      text-2xl
                      font-bold
                      text-white
                    "
                  >

                    {plan.name}

                  </h3>


                  <p
                    className="
                      mt-3
                      min-h-[48px]
                      text-sm
                      leading-6
                      text-slate-400
                    "
                  >

                    {plan.description}

                  </p>



                  {/* PRICE */}

                  <div
                    className="
                      mt-8
                      flex
                      items-end
                      gap-1
                    "
                  >

                    <span
                      className="
                        text-5xl
                        font-extrabold
                        tracking-tight
                        text-white
                      "
                    >

                      {plan.price}

                    </span>


                    {plan.period && (

                      <span
                        className="
                          mb-1
                          text-sm
                          text-slate-500
                        "
                      >

                        {plan.period}

                      </span>

                    )}

                  </div>



                  {/* DIVIDER */}

                  <div
                    className="
                      my-8
                      h-px
                      bg-white/10
                    "
                  />



                  {/* FEATURES */}

                  <ul
                    className="
                      flex-1
                      space-y-4
                    "
                  >

                    {plan.features.map((feature, featureIndex) => (

                      <li
                        key={featureIndex}
                        className="
                          flex
                          items-center
                          gap-3
                          text-sm
                          text-slate-300
                        "
                      >

                        <span
                          className="
                            flex
                            h-6
                            w-6
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-cyan-400/10
                          "
                        >

                          <Check
                            size={14}
                            className="text-cyan-400"
                          />

                        </span>

                        {feature}

                      </li>

                    ))}

                  </ul>



                  {/* BUTTON */}

                  <button
                    className={`
                      mt-10
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-2xl
                      py-3.5
                      text-sm
                      font-semibold
                      transition-all
                      duration-300

                      ${
                        plan.popular
                          ?
                          "bg-gradient-to-r from-blue-600 to-cyan-400 text-white shadow-lg shadow-blue-500/20 hover:scale-[1.02] hover:shadow-blue-500/30"
                          :
                          "border border-white/10 bg-white/5 text-white hover:border-cyan-400/30 hover:bg-white/10"
                      }
                    `}
                  >

                    {plan.button}

                    <Zap size={16} />

                  </button>

                </div>

              );

            })}

          </div>



          {/* ========================= */}
          {/* BOTTOM TRUST */}
          {/* ========================= */}

          <div
            className="
              mx-auto
              mt-14
              flex
              max-w-3xl
              flex-wrap
              items-center
              justify-center
              gap-x-8
              gap-y-4
              text-sm
              text-slate-500
            "
          >

            <div className="flex items-center gap-2">

              <Check
                size={16}
                className="text-green-400"
              />

              No hidden fees

            </div>


            <div className="flex items-center gap-2">

              <Check
                size={16}
                className="text-green-400"
              />

              Secure payments

            </div>


            <div className="flex items-center gap-2">

              <Check
                size={16}
                className="text-green-400"
              />

              Cancel anytime

            </div>

          </div>


        </div>

      </section>

    </Reveal>

  );

};


export default Pricing;