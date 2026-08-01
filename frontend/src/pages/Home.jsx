import Navbar from "../components/layout/Navbar";

import Hero from "../components/hero/Hero";
import TrustedCompanies from "../components/hero/TrustedCompanies";

import Features from "../components/features/Features";

import Security from "../components/security/Security";

import AISection from "../components/ai/AISection";

import Analytics from "../components/analytics/Analytics";

import Pricing from "../components/pricing/Pricing";

import Footer from "../components/footer/Footer";

const Home = () => {
  return (
    <div
      id="home"
      className="relative min-h-screen overflow-x-hidden bg-[#020617] text-white"
    >
      {/* =========================================
          NAVBAR
      ========================================= */}

      <Navbar />

      {/* =========================================
          GLOBAL BACKGROUND EFFECTS
      ========================================= */}

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[150px]" />

        <div className="absolute right-[-180px] top-[25%] h-[450px] w-[450px] rounded-full bg-cyan-500/10 blur-[150px]" />

        <div className="absolute bottom-[-180px] left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-[150px]" />
      </div>

      {/* =========================================
          MAIN CONTENT
      ========================================= */}

      <main className="relative z-10">
        {/* =========================================
            HERO
        ========================================= */}

        <section id="hero">
          <Hero />
        </section>

        {/* =========================================
            TRUSTED COMPANIES
        ========================================= */}

        <section id="trusted">
          <TrustedCompanies />
        </section>

        {/* =========================================
            FEATURES
        ========================================= */}

        <section id="features">
          <Features />
        </section>

        {/* =========================================
            SECURITY
        ========================================= */}

        <section id="security">
          <Security />
        </section>

        {/* =========================================
            AI
        ========================================= */}

        <section id="ai">
          <AISection />
        </section>

        {/* =========================================
            ANALYTICS
        ========================================= */}

        <section id="analytics">
          <Analytics />
        </section>

        {/* =========================================
            PRICING
        ========================================= */}

        <section id="pricing">
          <Pricing />
        </section>
      </main>

      {/* =========================================
          FOOTER
      ========================================= */}

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export default Home;