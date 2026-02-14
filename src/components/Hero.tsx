"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import CompanyTicker from "./CompanyTicker";

export default function Hero() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

    return (
        <section ref={containerRef} className="relative flex flex-col items-center justify-start min-h-screen overflow-hidden bg-white selection:bg-[#ff4a01] selection:text-white pt-20 pb-0 md:pt-12">

            {/* Background Image - Increased Opacity */}
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                <Image
                    src="/herbanner.png"
                    alt="Hero Background"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-white via-white/60 to-transparent"></div>
            </div>

            {/* Desktop: Company Ticker at Top - FULL WIDTH */}
            <div className="hidden md:block w-full z-20 mb-4 border-y border-gray-100/50 bg-white/50 backdrop-blur-sm">
                <CompanyTicker />
            </div>

            {/* Main Content Container */}
            <motion.div
                style={{ y, opacity }}
                className="relative z-10 flex flex-col items-center w-full max-w-[1200px] mx-auto text-center px-4 md:px-6 pb-[100px] md:pb-0"
            >
                {/* 1. Top Logo - Image Replaces Text */}
                <div className="mb-4 md:mb-5">
                    <div className="relative w-[180px] h-[50px] md:w-[220px] md:h-[60px]">
                        <Image
                            src="/logo.png"
                            alt="NEXGROW Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>

                {/* Reviews Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="mb-5 md:mb-5 flex justify-center"
                >
                    <div className="group flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-gray-200/60 transition-all cursor-default shadow-sm">
                        <div className="flex -space-x-2">
                            {[
                                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&q=80&fit=crop",
                                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&q=80&fit=crop",
                                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&q=80&fit=crop"
                            ].map((src, i) => (
                                <div key={i} className="relative w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-100">
                                    <Image
                                        src={src}
                                        alt={`User ${i + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                        <span className="h-4 w-[1px] bg-gray-300 mx-1"></span>
                        <div className="flex items-center gap-1.5 overflow-hidden">
                            <span className="flex text-[#ff4a01] text-xs">★★★★★</span>
                            <span className="text-[10px] sm:text-xs font-bold text-gray-800 whitespace-nowrap">4.8+ Rating & 50+ Projects Done</span>
                        </div>
                    </div>
                </motion.div>

                {/* Main Headline - Massive Size */}
                <motion.h1
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                    className="text-[48px] sm:text-[64px] md:text-[80px] lg:text-[90px] font-semibold tracking-tight text-black leading-[1.05] mb-5 md:mb-4"
                >
                    A <span className="font-playfair italic text-[#ff4a01] font-black">Complete</span> Team <br className="hidden md:block" />
                    Behind Your <span className="inline-block px-3 py-0 bg-black text-white rounded-lg -rotate-2 transform mx-1 font-bold">
                        Brand
                    </span>
                </motion.h1>

                {/* Subtext - Reduced Size */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-base md:text-lg text-gray-700 font-medium max-w-[500px] md:max-w-[550px] mx-auto leading-relaxed mb-6 md:mb-5"
                >
                    Social media, performance marketing, websites and custom software under one roof.
                </motion.p>

                {/* 2. Single Animated CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="mb-8 md:mb-8"
                >
                    <Link href="#contact" className="relative inline-flex group">

                        <div className="relative inline-flex items-center justify-center p-[2px] overflow-hidden rounded-2xl">
                            <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0000_0%,#ff4a01_50%,#0000_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <span className="absolute inset-[-1000%] bg-gray-300 group-hover:opacity-0 transition-opacity duration-300" />

                            <span className="relative inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold text-white transition-all bg-black rounded-2xl group-hover:bg-gray-900">
                                Book a Call
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </div>
                    </Link>
                </motion.div>

                {/* Mobile: Company Ticker Below CTA - Full Width Hack */}
                <div className="md:hidden w-[100vw] -ml-4 mt-8 mb-4">
                    <div className="text-center mb-4">
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Trusted By Industry Leaders</p>
                    </div>
                    <CompanyTicker />
                </div>

                {/* Removed Social Proof Section Code */}

            </motion.div>
        </section>
    );
}
