import { useState } from "react";
import {
Check,
Sparkles,
ShieldCheck,
Zap,
Crown,
ArrowRight,
BadgeCheck
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
badge: "Free Forever",
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
"Powerful AI-driven tools designed for smarter financial decisions.",
icon: Sparkles,
badge: "Most Popular",
popular: true,
features: [
"AI Financial Assistant",
"Smart Spending Predictions",
"Advanced Financial Analytics",
"AI Fraud Detection",
"Personalized Financial Insights",
"Priority Support"
],
button: "Start Pro"
},
{
name: "Enterprise",
price: "Custom",
period: "",
description:
"Advanced banking intelligence, security and control for organizations.",
icon: Crown,
badge: "For Teams",
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
const [selectedPlan, setSelectedPlan] = useState(null);

const handlePlanClick = (plan) => {
setSelectedPlan(plan.name);

setTimeout(() => {
  setSelectedPlan(null);
}, 1800);

};

return (
<Reveal>
<section id="pricing" className=" relative scroll-mt-24 overflow-hidden bg-slate-950 py-28 " >
{/* BACKGROUND EFFECTS */}

    <div
      className="
        pointer-events-none
        absolute
        left-1/2
        top-0
        h-[550px]
        w-[550px]
        -translate-x-1/2
        rounded-full
        bg-blue-600/10
        blur-[160px]
      "
    />

    <div
      className="
        pointer-events-none
        absolute
        bottom-0
        right-0
        h-[450px]
        w-[450px]
        rounded-full
        bg-cyan-500/10
        blur-[150px]
      "
    />

    <div
      className="
        pointer-events-none
        absolute
        left-0
        top-1/2
        h-[300px]
        w-[300px]
        -translate-y-1/2
        rounded-full
        bg-blue-500/5
        blur-[120px]
      "
    />

    {/* CONTAINER */}

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
      {/* HEADER */}

      <div className="mx-auto max-w-3xl text-center">
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
            shadow-lg
            shadow-cyan-500/5
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
          Simple pricing.

          <br />

          <span
            className="
              bg-gradient-to-r
              from-blue-500
              via-cyan-400
              to-cyan-300
              bg-clip-text
              text-transparent
            "
          >
            Powerful banking.
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
          Start with essential banking tools and unlock advanced
          AI-powered financial intelligence when you need it.
        </p>
      </div>

      {/* PRICING GRID */}

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

          const isSelected = selectedPlan === plan.name;

          return (
            <div
              key={plan.name}
              className={`
                group
                relative
                flex
                flex-col
                overflow-hidden
                rounded-[32px]
                border
                p-7
                backdrop-blur-2xl
                transition-all
                duration-500
                hover:-translate-y-2
                sm:p-8

                ${
                  plan.popular
                    ? "border-blue-500/50 bg-gradient-to-b from-blue-500/[0.13] via-slate-900/80 to-cyan-500/[0.04] shadow-2xl shadow-blue-500/10"
                    : "border-white/10 bg-white/[0.035] hover:border-cyan-400/25 hover:bg-white/[0.055]"
                }

                ${
                  isSelected
                    ? "ring-2 ring-cyan-400/40"
                    : ""
                }
              `}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* CARD GLOW */}

              <div
                className={`
                  pointer-events-none
                  absolute
                  -right-24
                  -top-24
                  h-48
                  w-48
                  rounded-full
                  blur-3xl
                  transition-opacity
                  duration-500
                  group-hover:opacity-100

                  ${
                    plan.popular
                      ? "bg-blue-500/20 opacity-80"
                      : "bg-cyan-400/10 opacity-0"
                  }
                `}
              />

              {/* TOP BADGE */}

              <div className="relative flex min-h-[28px] items-center justify-between">
                <div
                  className={`
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-full
                    px-3
                    py-1
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-wider

                    ${
                      plan.popular
                        ? "bg-blue-500/15 text-blue-300"
                        : "bg-white/5 text-slate-500"
                    }
                  `}
                >
                  {plan.popular ? (
                    <Sparkles size={12} />
                  ) : (
                    <BadgeCheck size={12} />
                  )}

                  {plan.badge}
                </div>

                {plan.popular && (
                  <div
                    className="
                      absolute
                      -right-1
                      -top-1
                      hidden
                      rounded-full
                      bg-gradient-to-r
                      from-blue-600
                      to-cyan-400
                      px-3
                      py-1
                      text-[10px]
                      font-bold
                      text-white
                      shadow-lg
                      shadow-blue-500/20
                      sm:block
                    "
                  >
                    RECOMMENDED
                  </div>
                )}
              </div>

              {/* ICON */}

              <div
                className={`
                  relative
                  mt-7
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  transition-all
                  duration-500
                  group-hover:scale-105
                  group-hover:rotate-2

                  ${
                    plan.popular
                      ? "bg-gradient-to-br from-blue-600 to-cyan-400 shadow-xl shadow-blue-500/25"
                      : "border border-white/10 bg-white/5"
                  }
                `}
              >
                <Icon
                  size={25}
                  className={
                    plan.popular
                      ? "text-white"
                      : "text-cyan-400"
                  }
                />
              </div>

              {/* PLAN NAME */}

              <h3
                className="
                  mt-7
                  text-2xl
                  font-bold
                  tracking-tight
                  text-white
                "
              >
                {plan.name}
              </h3>

              <p
                className="
                  mt-3
                  min-h-[52px]
                  text-sm
                  leading-6
                  text-slate-400
                "
              >
                {plan.description}
              </p>

              {/* PRICE */}

              <div className="mt-8 flex min-h-[60px] items-end gap-1">
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
                      mb-2
                      text-sm
                      font-medium
                      text-slate-500
                    "
                  >
                    {plan.period}
                  </span>
                )}
              </div>

              {/* DIVIDER */}

              <div className="my-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              {/* FEATURES */}

              <ul className="flex-1 space-y-4">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="
                      flex
                      items-center
                      gap-3
                      text-sm
                      text-slate-300
                      transition-colors
                      duration-300
                      group-hover:text-slate-200
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
                        border
                        border-cyan-400/10
                        bg-cyan-400/10
                      "
                    >
                      <Check
                        size={13}
                        strokeWidth={2.5}
                        className="text-cyan-400"
                      />
                    </span>

                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}

              <button
                type="button"
                onClick={() => handlePlanClick(plan)}
                className={`
                  relative
                  mt-10
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  overflow-hidden
                  rounded-2xl
                  px-5
                  py-3.5
                  text-sm
                  font-semibold
                  transition-all
                  duration-300
                  active:scale-[0.98]

                  ${
                    plan.popular
                      ? "bg-gradient-to-r from-blue-600 to-cyan-400 text-white shadow-xl shadow-blue-500/20 hover:shadow-cyan-400/20"
                      : "border border-white/10 bg-white/5 text-white hover:border-cyan-400/30 hover:bg-white/10"
                  }
                `}
              >
                <span
                  className="
                    absolute
                    inset-0
                    -translate-x-full
                    bg-white/10
                    transition-transform
                    duration-500
                    group-hover:translate-x-full
                  "
                />

                <span className="relative">
                  {isSelected ? "Processing..." : plan.button}
                </span>

                <ArrowRight
                  size={16}
                  className="relative transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>
          );
        })}
      </div>

      {/* TRUST STRIP */}

      <div
        className="
          mx-auto
          mt-14
          max-w-4xl
          rounded-3xl
          border
          border-white/10
          bg-white/[0.025]
          px-6
          py-5
          backdrop-blur-xl
        "
      >
        <div
          className="
            flex
            flex-wrap
            items-center
            justify-center
            gap-x-8
            gap-y-4
            text-sm
            text-slate-400
          "
        >
          <div className="flex items-center gap-2">
            <Check size={16} className="text-green-400" />
            No hidden fees
          </div>

          <div className="h-4 w-px bg-white/10" />

          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-cyan-400" />
            Bank-grade security
          </div>

          <div className="h-4 w-px bg-white/10" />

          <div className="flex items-center gap-2">
            <Check size={16} className="text-green-400" />
            Cancel anytime
          </div>

          <div className="h-4 w-px bg-white/10" />

          <div className="flex items-center gap-2">
            <Zap size={16} className="text-yellow-400" />
            Instant access
          </div>
        </div>
      </div>
    </div>
  </section>
</Reveal>

);
};

export default Pricing;