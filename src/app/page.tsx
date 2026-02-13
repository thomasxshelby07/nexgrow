import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import GradientSection from "@/components/GradientSection";
import WhatWeDo from "@/components/WhatWeDo";
import WhyChooseUs from "@/components/WhyChooseUs";
import Comparison from "@/components/Comparison";
import Process from "@/components/Process";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <section id="hero"><Hero /></section>
      <section id="whatwedo"><WhatWeDo /></section>
      <section id="whychooseus"><WhyChooseUs /></section>
      <section id="comparison"><Comparison /></section>
      <section id="process"><Process /></section>
      <CTA />
    </main>
  );
}
