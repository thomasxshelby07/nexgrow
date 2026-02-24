
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { getHomepageData } from "@/lib/api";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Brands from "@/components/Brands";
import Expertise from "@/components/Expertise";
import Services from "@/components/Services";
import Comparison from "@/components/Comparison";

import CaseStudies from "@/components/CaseStudies";
import Reviews from "@/components/Reviews";
import WhyChooseUs from "@/components/WhyChooseUs";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import CompanyTicker from "@/components/CompanyTicker";
import Industries from "@/components/Industries";
import Process from "@/components/Process";

export default async function Home() {
  const data = await getHomepageData();

  if (!data) return null;

  const isVisible = (section: string) => data.visibility?.[section] !== false;

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      {isVisible("hero") && (
        <section id="hero">
          <Hero data={{ ...data.hero, brands: data.brands }} />
        </section>
      )}

      {/* SERVICES SECTION (The Dynamic Scroller) */}
      {isVisible("services") && (
        <section id="services">
          <Services
            data={data.services}
            title={data.servicesTitle}
            subtitle={data.servicesSubtitle}
          />
        </section>
      )}

      {/* INDUSTRIES SECTION */}
      {isVisible("industries") && (
        <section id="industries">
          <Industries
            data={data.industries}
            title={data.industriesTitle}
            subtitle={data.industriesSubtitle}
            btnText={data.industriesBtnText}
          />
        </section>
      )}

      {/* EXPERTISE SECTION (The Grid/Cards) */}
      {isVisible("expertise") && (
        <section id="expertise">
          <Expertise
            data={data.expertise}
            title={data.expertiseTitle}
            subtitle={data.expertiseSubtitle}
          />
        </section>
      )}

      {/* COMPARISON SECTION */}
      {isVisible("comparison") && <Comparison />}


      {/* WHY CHOOSE US */}
      {isVisible("why") && <WhyChooseUs />}

      {/* CASE STUDIES */}
      {isVisible("portfolio") && (
        <section id="portfolio">
          <CaseStudies data={data.portfolio} />
        </section>
      )}

      {/* REVIEWS */}
      {isVisible("reviews") && <Reviews />}

      {/* PRICING SECTION */}
      {isVisible("pricing") && (
        <section id="pricing">
          <Pricing data={data.pricing} />
        </section>
      )}

      {/* FAQ SECTION */}
      {isVisible("faq") && <FAQ />}

      {/* CTA SECTION */}
      {isVisible("cta") && <CTA />}

      <Footer />
    </main>
  );
}
