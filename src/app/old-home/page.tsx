"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
// import GradientSection from "@/components/GradientSection"; // Unused
// import WhatWeDo from "@/components/WhatWeDo";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import Comparison from "@/components/Comparison";
import Process from "@/components/Process";
import CaseStudies from "@/components/CaseStudies";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
// import IntegratedInfrastructure from "@/components/IntegratedInfrastructure"; // Removed
import CTA from "@/components/CTA";

export default function Home() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <section id="hero"><Hero /></section>
            {/* <section id="whatwedo"><WhatWeDo /></section> */}
            <section id="services"><Services /></section>
            <section id="whychooseus"><WhyChooseUs /></section>
            <section id="comparison"><Comparison /></section>
            <section id="process"><Process /></section>
            <section id="casestudies"><CaseStudies /></section>
            <section id="reviews"><Reviews /></section>
            <section id="faq"><FAQ /></section>
            <CTA />
        </main>
    );
}
