"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const caseStudies = [
    {
        id: 1,
        titleFirst: "LUXE",
        titleSecond: "APPAREL",
        category: "E-Commerce Scale Up",
        description: "Transformed a boutique into a global brand. 8.5x ROAS.",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1600&h=1200",
        color: "#ff8c00"
    },
    {
        id: 2,
        titleFirst: "TASK",
        titleSecond: "FLOW",
        category: "SaaS Growth Engine",
        description: "Automated acquisition. Reduced CAC by 40% in 90 days.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1600&h=1200",
        color: "#ff6b01"
    },
    {
        id: 3,
        titleFirst: "URBAN",
        titleSecond: "ESTATES",
        category: "Real Estate Lead Gen",
        description: "High-intent lead system. 450+ qualified leads/mo.",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1600&h=1200",
        color: "#ff4a01"
    },
    {
        id: 4,
        titleFirst: "VAULT",
        titleSecond: "APP",
        category: "FinTech Launch",
        description: "Viral pre-launch campaign. 50k waitlist signups.",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1600&h=1200",
        color: "#faad14"
    }
];

export default function CaseStudies() {
    return (
        <section className="bg-[#050505] relative z-10" id="case-studies">

            {/* Header */}
            <div className="py-24 md:py-32 flex items-center justify-center bg-[#050505] relative z-10">
                <div className="text-center px-4 relative">
                    <h2 className="text-white text-5xl md:text-7xl font-bold tracking-tighter mb-4">
                        PROVEN <span className="font-playfair italic text-[#ff4a01] px-2">RESULTS</span>
                    </h2>
                    <p className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto font-medium">
                        Real impact for ambitious brands.
                    </p>

                    {/* Background Grid for Header */}
                    <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 mask-image-gradient"></div>
                </div>
            </div>

            <div className="flex flex-col">
                {caseStudies.map((study, index) => {
                    return (
                        <Card
                            key={study.id}
                            study={study}
                            index={index}
                        />
                    );
                })}
            </div>

        </section>
    );
}

const Card = ({ study, index }: { study: any, index: number }) => {

    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start']
    })

    // SMOOTH SCROLL PHYSICS
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const yImage = useTransform(smoothProgress, [0, 1], ["-20%", "20%"]);
    const yText = useTransform(smoothProgress, [0, 1], ["5%", "-5%"]);

    return (
        <div ref={containerRef} className="h-[100vh] w-full relative flex flex-col justify-end border-t border-white/5 overflow-hidden group">

            {/* BACKGROUND LAYER - PARALLAX */}
            <div className="absolute inset-0 z-0 h-[120%] -top-[10%] w-full pointer-events-none">
                <motion.div style={{ y: yImage }} className="relative w-full h-full">
                    <Image
                        src={study.image}
                        alt={`${study.titleFirst} ${study.titleSecond}`}
                        fill
                        className="object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105"
                        priority={index < 2}
                    />
                    {/* Gradient Overlay for Text Visibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent"></div>
                </motion.div>
            </div>

            {/* CONTENT LAYER - BOTTOM ALIGNED */}
            <div className="relative z-10 w-full px-4 md:px-10 pb-12 md:pb-20 pointer-events-none">

                <motion.div
                    style={{ y: yText }}
                    className="max-w-[1400px] mx-auto w-full flex flex-col md:flex-row items-end justify-between gap-8 md:gap-12 pointer-events-auto"
                >

                    {/* LEFT: TITLE & DESC */}
                    <div className="flex-1">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="inline-block px-3 py-1 mb-4 border border-[#ff4a01]/30 bg-[#ff4a01]/10 backdrop-blur-md rounded-full text-[#ff4a01] font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase"
                        >
                            {study.category}
                        </motion.span>

                        <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-4 tracking-tighter leading-[0.8] mix-blend-overlay opacity-90">
                            <span className="block font-sans">{study.titleFirst}</span>
                            <span className="block font-playfair italic text-white/90">{study.titleSecond}</span>
                        </h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="text-gray-200 text-lg md:text-2xl max-w-2xl leading-relaxed font-medium drop-shadow-md"
                        >
                            {study.description}
                        </motion.p>
                    </div>

                    {/* RIGHT: ACTION BUTTON */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="flex-shrink-0"
                    >
                        <button
                            className="group flex items-center justify-center gap-3 w-16 h-16 md:w-24 md:h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-[#ff4a01] hover:border-[#ff4a01] hover:scale-110 transition-all duration-300"
                        >
                            <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                        <span className="block text-center text-white/50 text-[10px] uppercase tracking-widest mt-3 font-mono group-hover:text-[#ff4a01] transition-colors">
                            View Case
                        </span>
                    </motion.div>

                </motion.div>

            </div>

            {/* NUMBER INDICATOR - Absolute Top Right */}
            <div className="absolute top-10 right-4 md:right-10 z-20 mix-blend-overlay opacity-30 pointer-events-none">
                <span className="text-6xl md:text-8xl font-bold text-white font-mono leading-none tracking-tighter">0{index + 1}</span>
            </div>

        </div>
    )
}
