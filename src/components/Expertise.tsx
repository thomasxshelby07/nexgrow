"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

interface ExpertiseItem {
    title: string;
    desc: string;
    features: string[];
    // Optional image prop for 3D models/images directly on white
    image?: string;
    // Optional background image for the active section
    bgImage?: string;
}

interface ExpertiseProps {
    data: ExpertiseItem[];
    title?: string;
    subtitle?: string;
}

const Expertise: React.FC<ExpertiseProps> = ({ data, title, subtitle }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeItem = data[activeIndex] || data[0];

    return (
        // The section is carefully sized so that no scrolling is needed
        <section className="relative h-auto lg:h-[100vh] min-h-[100dvh] lg:min-h-[850px] w-full bg-[#FAFAFA] overflow-hidden flex flex-col justify-center pt-20 lg:pt-32 pb-4 lg:pb-12 select-none z-0">

            {/* Premium Background Image Layer */}
            <AnimatePresence mode="wait">
                {activeItem.bgImage && (
                    <motion.div
                        key={`bg-${activeIndex}`}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 0.4, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="absolute inset-0 z-0 select-none pointer-events-none"
                        style={{
                            backgroundImage: `url(${activeItem.bgImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            filter: 'grayscale(20%) contrast(105%) blur(1px)'
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Smart Readability Mask - Only blurs the left side where headline is */}
            <div className="absolute inset-0 bg-white/30 backdrop-blur-[12px] z-10 pointer-events-none"
                style={{
                    WebkitMaskImage: 'linear-gradient(to right, black 40%, transparent 100%)',
                    maskImage: 'linear-gradient(to right, black 40%, transparent 100%)'
                }}
            />

            <div className="relative z-20 w-full max-w-[1700px] mx-auto px-6 md:px-12 lg:px-20 lg:pl-28 h-full flex flex-col justify-between">

                {/* Top Section - Split Content Layout */}
                <div className="flex flex-col lg:flex-row w-full flex-1 gap-6 lg:gap-12 items-center justify-between min-h-0 pt-4 lg:pt-0">

                    {/* Left Panel: Text & Features */}
                    <div className="w-full lg:w-[50%] flex flex-col justify-center lg:h-full max-w-[700px] relative z-10">

                        {/* Title & Description with Crossfade */}
                        <div className="flex flex-col justify-center">

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`text-${activeIndex}`}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ duration: 0.4 }}
                                    className="flex flex-col gap-4"
                                >
                                    {/* Hero Headline - Scaled down for boutique feel */}
                                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.8rem] font-black text-[#1A1A1A] tracking-tighter uppercase leading-[0.9] font-[family-name:var(--font-outfit)]">
                                        {activeItem.title}
                                    </h1>
                                    {/* Refined Tagline */}
                                    <p className="text-[#555] text-sm md:text-lg lg:text-xl font-medium max-w-[500px] font-[family-name:var(--font-playfair)] italic leading-relaxed opacity-80">
                                        {activeItem.desc}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Features Tags */}
                        <div className="flex flex-wrap items-center gap-1.5 mt-4">
                            {activeItem.features?.map((f, i) => (
                                <span key={i} className="px-3 py-1.5 rounded-full bg-white border border-gray-100 text-[#1A1A1A] text-[9px] md:text-[11px] font-bold tracking-tight shadow-sm flex items-center gap-1.5 transition-all duration-300 hover:border-[#FF6A00]/30 cursor-default">
                                    <Check className="w-2.5 h-2.5 text-[#FF6A00]" strokeWidth={3} />
                                    {f}
                                </span>
                            ))}
                        </div>

                        {/* Start Project CTA */}
                        <div className="mt-6 lg:mt-8">
                            <button className="group relative px-6 py-3 md:px-8 md:py-4 bg-[#1A1A1A] text-white hover:bg-[#FF6A00] rounded-full font-bold text-[10px] md:text-[12px] tracking-[0.15em] uppercase transition-all duration-300 shadow-lg hover:shadow-[0_10px_30px_rgba(255,106,0,0.2)] hover:-translate-y-1 flex items-center gap-3 overflow-hidden">
                                <span className="relative z-10 flex items-center gap-2.5">
                                    START PROJECT
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="transform group-hover:translate-x-1 transition-transform duration-300">
                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Right Panel: Pure 3D Image anchored to bottom seamlessly */}
                    <div className="w-full lg:w-[55%] h-[280px] sm:h-[350px] md:h-[450px] lg:h-full flex items-end justify-center relative pointer-events-none shrink-0 perspective-[1000px] z-0 pt-8 lg:pt-0">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`image-${activeIndex}`}
                                initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)', y: 20 }}
                                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: [0, -15, 0] }}
                                exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)', y: 20 }}
                                transition={{
                                    opacity: { duration: 0.5 },
                                    scale: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                                    filter: { duration: 0.4 },
                                    y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                                }}
                                className="relative w-full h-[100%] lg:h-[110%] flex items-end justify-center origin-bottom pb-4 lg:pb-0"
                            >
                                {activeItem.image && (
                                    <img
                                        src={activeItem.image}
                                        alt={activeItem.title}
                                        className="w-full h-full object-contain object-bottom drop-shadow-[0_20px_50px_rgba(255,106,0,0.4)]"
                                    />
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>

                {/* Selectors Container - Modern Wrapping cloud on Mobile, Vertical Right on Desktop */}
                <div className="w-full lg:w-auto mt-auto lg:mt-0 pt-2 lg:pt-0 relative z-30 pb-24 sm:pb-28 lg:pb-0 lg:absolute lg:right-6 xl:right-12 lg:top-1/2 lg:-translate-y-1/2 lg:flex lg:flex-col lg:items-end">
                    <h3 className="text-[9px] md:text-[10px] font-black text-[#1A1A1A] tracking-[0.2em] uppercase mb-3 px-5 lg:px-0 opacity-60 drop-shadow-sm lg:text-right">
                        AVAILABLE SERVICES
                    </h3>

                    {/* The Cards Track - Flex Wrap for Mobile, Column for Desktop */}
                    <div className="w-full lg:w-[260px] lg:max-h-[70vh] pb-4 lg:pb-0 px-5 lg:px-0 lg:pr-3">
                        <div className="flex flex-wrap lg:flex-nowrap lg:flex-col lg:items-end gap-2 lg:gap-3 w-full py-1">
                            {data.map((item, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => setActiveIndex(idx)}
                                    // Ultra Premium Pill style cards: Tiny tags on mobile, wide buttons on desktop
                                    className={`group relative h-auto w-auto lg:w-[210px] xl:w-[230px] px-3.5 py-1.5 md:px-4 md:py-2 lg:px-5 lg:py-3.5 flex items-center lg:justify-end gap-2 lg:gap-4 rounded-full cursor-pointer transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.04)] backdrop-blur-md ${idx === activeIndex
                                        ? 'bg-white/95 border border-[#FF6A00] lg:border-[1.5px] shadow-[0_8px_20px_rgba(255,106,0,0.15)] z-10 scale-[1.03] lg:scale-105 lg:-translate-x-1'
                                        : 'bg-white/40 border border-white/60 opacity-80 hover:opacity-100 hover:scale-100 hover:bg-white/60'
                                        }`}
                                >
                                    {/* Play Indicator - Tiny Dot on mobile, Play Icon on desktop */}
                                    <div className={`w-[5px] h-[5px] lg:w-4 lg:h-4 shrink-0 rounded-full flex items-center justify-center transition-all ${idx === activeIndex ? 'bg-[#FF6A00]' : 'bg-[#1A1A1A]/20'} lg:order-last order-first`}>
                                        <svg width="5" height="5" viewBox="0 0 24 24" fill="white" className="ml-[1px] lg:w-2 lg:h-2 hidden lg:block">
                                            <path d="M5 3L19 12L5 21V3Z" />
                                        </svg>
                                    </div>

                                    {/* Text Content */}
                                    <div className="relative z-20 flex flex-col pointer-events-none lg:text-right">
                                        <h4 className={`text-[9px] md:text-[10px] lg:text-[12px] font-black uppercase leading-tight font-[family-name:var(--font-outfit)] tracking-wider lg:tracking-[0.15em] whitespace-nowrap lg:whitespace-normal ${idx === activeIndex ? 'text-[#FF6A00]' : 'text-[#1A1A1A]'}`}>
                                            {item.title}
                                        </h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Expertise;
