
import Hero from "../components/hero/Hero";
import TrustedCompanies from "../components/hero/TrustedCompanies";

import Features from "../components/features/Features";
import Security from "../components/security/Security";
import AISection from "../components/ai/AISection";
import Analytics from "../components/analytics/Analytics";
import Pricing from "../components/pricing/Pricing";


const Home = () => {

  return (

    <div
      className="
        min-h-screen
        overflow-hidden
        bg-[#020617]
        text-white
      "
    >

      <main>

        {/* ========================================= */}
        {/* HERO SECTION                              */}
        {/* Hero.jsx contains floating dashboard      */}
        {/* ========================================= */}

        <Hero />


        {/* ========================================= */}
        {/* TRUSTED COMPANIES                         */}
        {/* ========================================= */}

        <TrustedCompanies />


        {/* ========================================= */}
        {/* FEATURES                                  */}
        {/* ========================================= */}

        <section id="features">

          <Features />

        </section>


        {/* ========================================= */}
        {/* SECURITY                                  */}
        {/* ========================================= */}

        <section id="security">

          <Security />

        </section>


        {/* ========================================= */}
        {/* AI FINANCIAL INTELLIGENCE                */}
        {/* ========================================= */}

        <section id="ai">

          <AISection />

        </section>


        {/* ========================================= */}
        {/* ANALYTICS                                 */}
        {/* ========================================= */}

        <section id="analytics">

          <Analytics />

        </section>


        {/* ========================================= */}
        {/* PRICING                                   */}
        {/* ========================================= */}

        <section id="pricing">

          <Pricing />

        </section>


      </main>

    </div>

  );

};


export default Home;

