"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, Mouse } from "lucide-react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import CompanyTicker from "./CompanyTicker";

// Helper to parse "Highlight **Text**" and "*Italic Text*"
const parseTitle = (text: string) => {
    if (!text) return null;
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);

    return parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
            const content = part.slice(2, -2);
            return (
                <span key={i} className="relative inline-block px-4 py-1 md:px-7 md:py-2 mx-1 transform -rotate-3 align-middle whitespace-nowrap">
                    <span className="absolute inset-0 bg-black rounded-2xl shadow-xl shadow-black/5" />
                    <span className="relative z-10 text-white font-black tracking-tighter">
                        {content}
                    </span>
                </span>
            );
        } else if (part.startsWith("*") && part.endsWith("*")) {
            const content = part.slice(1, -1);
            return (
                <span key={i} className="font-playfair italic text-[#ff4a01] font-black mx-1">
                    {content}
                </span>
            );
        }
        return <span key={i}>{part}</span>;
    });
};

export default function Hero({ data }: { data?: any }) {
    const containerRef = useRef(null);
    const buttonRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

    // Spring Settings for Magnetic Button
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springSettings = { damping: 30, stiffness: 300 };
    const springX = useSpring(mouseX, springSettings);
    const springY = useSpring(mouseY, springSettings);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        mouseX.set(x * 0.25);
        mouseY.set(y * 0.25);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    // Defaults if no data
    const title = data?.title || "A *Complete* Team Behind Your **Brand**";
    const subtitle = data?.subtitle || "Social media, performance marketing, websites and custom software under one roof.";
    const ctaText = data?.ctaPrimary?.text || "Book a Call";
    const ctaLink = data?.ctaPrimary?.link || "#contact";

    const ratingValue = "4.8";
    const projectCount = "50+ Projects Done";

    const avatars = data?.avatars && data.avatars.length > 0 ? data.avatars : [
        "https://randomuser.me/api/portraits/men/32.jpg",
        "https://randomuser.me/api/portraits/women/44.jpg",
        "https://randomuser.me/api/portraits/men/22.jpg"
    ];

    const background = data?.heroImage || "/hero-bg-default.jpg";

    return (
        <section ref={containerRef} className="relative flex flex-col min-h-[100vh] md:min-h-screen w-full overflow-hidden bg-white selection:bg-[#ff4a01] selection:text-white">

            {/* Cinematic Ambience (Floating Orbs) */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                        opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/4 -left-10 w-96 h-96 bg-[#ff4a01]/5 blur-[120px] rounded-full"
                />
                <motion.div
                    animate={{
                        x: [0, -80, 0],
                        y: [0, 100, 0],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-1/4 -right-10 w-[500px] h-[500px] bg-orange-200/5 blur-[150px] rounded-full"
                />
            </div>

            {/* Cinematic Background Image Overlay */}
            <motion.div style={{ scale, opacity }} className="absolute inset-0 z-0 opacity-40">
                {background && (
                    <Image
                        src={background}
                        alt="Background"
                        fill
                        className="object-cover pointer-events-none brightness-[1.05]"
                        priority
                        quality={100}
                    />
                )}
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-transparent to-white z-0" />

            {/* HIERARCHY START */}
            <div className="relative z-20 flex flex-col w-full h-full flex-1">

                {/* 1. TOP TICKER */}
                <div className="w-full pt-1 md:pt-4 pb-1 md:pb-2 opacity-50 md:opacity-60 scale-[0.88] md:scale-[0.95] origin-top">
                    <CompanyTicker brands={data?.brands} />
                </div>

                {/* MAIN BODY */}
                <div className="flex-1 flex flex-col items-center justify-start md:justify-center text-center px-4 md:px-6 pt-6 md:pt-4 pb-16 md:pb-24">

                    {/* 2. LOGO */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="mb-4 md:mb-8 animate-fade-in relative"
                    >
                        <Link href="/" className="relative w-[110px] h-[35px] md:w-[160px] md:h-[50px] block mx-auto transition-transform hover:scale-105 duration-500">
                            <Image src="/logo.png" alt="NEXGROW" fill className="object-contain" priority />
                        </Link>
                    </motion.div>

                    {/* 3. TRUST PILL */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mb-8 md:mb-10 inline-flex items-center gap-3 md:gap-4 px-4 py-1.5 md:px-5 md:py-2 rounded-full bg-white/40 backdrop-blur-3xl border border-white/80 shadow-[0_4px_30px_rgba(0,0,0,0.03)] ring-1 ring-black/5"
                    >
                        <div className="flex -space-x-2.5">
                            {avatars.slice(0, 3).map((src: string, i: number) => (
                                <div key={i} className="relative w-6 h-6 md:w-7 md:h-7 rounded-full border-2 border-white overflow-hidden shadow-sm">
                                    <Image src={src} alt={`Client ${i}`} fill className="object-cover" />
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center gap-2 md:gap-3">
                            <div className="flex items-center gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-2.5 h-2.5 md:w-3 md:h-3 fill-[#ff4a01] text-[#ff4a01]" />
                                ))}
                            </div>
                            <div className="flex items-center gap-1 border-l border-black/10 pl-2 md:pl-3">
                                <span className="text-[10px] md:text-[11px] font-black text-gray-900 leading-none">{ratingValue}</span>
                                <span className="hidden sm:inline text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-tighter leading-none">• {projectCount}</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* 4. HEADLINE */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-[46px] sm:text-[54px] md:text-[62px] lg:text-[76px] font-black tracking-tighter text-gray-950 leading-[0.98] md:leading-[1.05] mb-8 md:mb-8 text-balance max-w-[10ch] sm:max-w-[12ch] md:max-w-[15ch] lg:max-w-[14ch] mx-auto drop-shadow-sm"
                    >
                        {parseTitle(title)}
                    </motion.h1>

                    {/* 5. SUBTITLE */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="text-[13px] md:text-base text-gray-700/50 font-bold max-w-[35ch] md:max-w-[45ch] mx-auto leading-relaxed mb-10 md:mb-6 px-4"
                    >
                        {subtitle}
                    </motion.p>

                    {/* 6. CTA BUTTON (V16 - Even Smaller & Higher on Desktop) */}
                    <div className="relative group scale-[1.05] md:scale-[0.85] mt-2 md:mt-2 transition-all">
                        <motion.div
                            ref={buttonRef}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            style={{ x: springX, y: springY }}
                            className="relative p-[1.5px] overflow-hidden rounded-2xl group"
                        >
                            <motion.div
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 w-[400%] h-[400%] left-[-150%] top-[-150%] bg-[conic-gradient(from_0deg,#ff4a01,transparent_30%,#ff4a01,transparent_60%,#ff4a01)]"
                            />

                            <Link href={ctaLink} className="relative flex items-center gap-2.5 px-9 py-4 md:px-7 md:py-3 bg-black text-white rounded-[calc(1rem-1.5px)] font-black text-base md:text-lg overflow-hidden ring-1 ring-white/10 shadow-2xl">
                                <motion.div
                                    animate={{ x: ["-100%", "300%"] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-[#ff4a01] to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                                <span className="relative z-10">{ctaText}</span>
                                <ArrowRight className="relative z-10 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
                            </Link>
                        </motion.div>
                    </div>

                    {/* 7. SCROLL IDENTIFIER (V16 - Visible on All Devices) */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 1 }}
                        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                    >
                        <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 translate-y-2 opacity-50">Scroll</span>
                        <div className="w-[1.5px] h-10 md:h-12 bg-black/5 rounded-full overflow-hidden relative">
                            <motion.div
                                animate={{ y: ["-100%", "300%"] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-[#ff4a01] to-transparent"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Horizon Shadow */}
            <div className="absolute bottom-0 left-0 w-full h-16 md:h-24 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
        </section>
    );
}
