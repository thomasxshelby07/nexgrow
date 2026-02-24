"use client";

import Navbar from "@/components/Navbar";
import CTA from "@/components/CTA";
import { motion } from "framer-motion";
import { ArrowRight, Check, Play, Zap, TrendingUp, Layers, Scissors, Film, MonitorPlay } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function VideoEditingPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* HERO SECTION */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
                <div className="container mx-auto px-4 lg:px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff4a01]/10 text-[#ff4a01] text-xs font-bold uppercase tracking-wider mb-6"
                        >
                            <span className="w-2 h-2 rounded-full bg-[#ff4a01]"></span>
                            Premium Video Editing
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-5xl md:text-7xl font-bold text-black tracking-tight leading-[1.1] mb-6"
                        >
                            Turn Raw Footage Into <br />
                            <span className="font-playfair italic text-[#ff4a01]">Viral Assets.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed"
                        >
                            We craft high-retention edits for Reels, YouTube, and Ads that stop the scroll and drive action.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        >
                            <Link href="#pricing" className="px-8 py-4 bg-black text-white rounded-full font-bold flex items-center gap-2 hover:bg-[#ff4a01] transition-colors duration-300">
                                View Pricing <ArrowRight size={18} />
                            </Link>
                            <Link href="#portfolio" className="px-8 py-4 bg-gray-100 text-black rounded-full font-bold flex items-center gap-2 hover:bg-gray-200 transition-colors duration-300">
                                See Portfolio
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* Abstract Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                    <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#ff4a01]/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-gray-100 rounded-full blur-3xl"></div>
                </div>
            </section>

            {/* SERVICES GRID */}
            <section className="py-20 bg-gray-50" id="services">
                <div className="container mx-auto px-4 lg:px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">What We Edit</h2>
                        <p className="text-gray-600">Specialized editing for every platform and format.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Short Form Content",
                                icon: Zap,
                                desc: "Reels, TikToks, and Shorts designed for maximum retention and algorithmic reach.",
                                features: [" fast-paced cuts", "motion graphics", "captions & emojis"]
                            },
                            {
                                title: "YouTube Long Form",
                                icon: MonitorPlay,
                                desc: "Documentaries, Vlogs, and Educational content that keeps viewers watching till the end.",
                                features: ["storytelling flow", "sound design", "color grading"]
                            },
                            {
                                title: "Performance Ads",
                                icon: TrendingUp,
                                desc: "High-converting video ads for Meta, YouTube, and TikTok that drive sales.",
                                features: ["hook variations", "direct response", "brand alignment"]
                            }
                        ].map((service, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-[#ff4a01]/30 hover:shadow-xl transition-all duration-300 group">
                                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#ff4a01] transition-colors duration-300">
                                    <service.icon className="w-6 h-6 text-gray-900 group-hover:text-white transition-colors duration-300" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                                <p className="text-gray-600 mb-6 text-sm leading-relaxed">{service.desc}</p>
                                <ul className="space-y-2">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#ff4a01]"></div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PORTFOLIO SECTION */}
            <section className="py-20 md:py-32" id="portfolio">
                <div className="container mx-auto px-4 lg:px-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                        <div>
                            <span className="text-[#ff4a01] font-bold tracking-wider uppercase text-sm mb-2 block">Our Work</span>
                            <h2 className="text-3xl md:text-5xl font-bold text-black">Featured Edits</h2>
                        </div>
                        <Link href="#contact" className="group flex items-center gap-2 text-black font-semibold border-b border-black pb-0.5 hover:text-[#ff4a01] hover:border-[#ff4a01] transition-all">
                            View All Projects <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div key={item} className="group relative aspect-[9/16] md:aspect-video rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
                                {/* Placeholder for Video/Image */}
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 group-hover:bg-gray-300 transition-colors">
                                    <Play className="w-12 h-12 text-gray-400 group-hover:text-black transition-colors fill-current" />
                                </div>
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                    <div className="bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg">
                                        <h4 className="font-bold text-black">Project Name {item}</h4>
                                        <p className="text-xs text-gray-500">Short Form Content</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PRICING SECTION */}
            <section className="py-20 md:py-32 bg-black text-white" id="pricing">
                <div className="container mx-auto px-4 lg:px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Simple Pricing</h2>
                        <p className="text-gray-400">Choose a package that fits your content needs.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* STARTER */}
                        <div className="p-8 rounded-3xl border border-white/10 bg-[#0a0a0a] hover:bg-[#111] transition-colors flex flex-col">
                            <h3 className="text-xl font-bold text-gray-300 mb-2">Starter</h3>
                            <div className="text-4xl font-bold mb-6">$999<span className="text-sm font-normal text-gray-500">/mo</span></div>
                            <p className="text-gray-400 text-sm mb-8">Perfect for personal brands starting out.</p>

                            <ul className="space-y-4 mb-8 flex-1">
                                {["4 Reels / Month", "Basic Captions", "Color Correction", "1 Revision Round"].map((feat, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                                        <Check className="w-4 h-4 text-[#ff4a01]" />
                                        {feat}
                                    </li>
                                ))}
                            </ul>

                            <button className="w-full py-4 rounded-xl border border-white/20 hover:bg-white hover:text-black transition-all font-bold">
                                Get Started
                            </button>
                        </div>

                        {/* GROWTH (Highlighted) */}
                        <div className="p-8 rounded-3xl border border-[#ff4a01] bg-[#0a0a0a] relative flex flex-col transform md:-translate-y-4">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#ff4a01] text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                                Most Popular
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Growth</h3>
                            <div className="text-4xl font-bold mb-6 text-[#ff4a01]">$2,499<span className="text-sm font-normal text-gray-300 text-white">/mo</span></div>
                            <p className="text-gray-300 text-sm mb-8">For creators scaling their audience.</p>

                            <ul className="space-y-4 mb-8 flex-1">
                                {["12 Reels / Month", "Advanced Motion Graphics", "Sound Design & Mixing", "2 Revision Rounds", "Thumbnail Design"].map((feat, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-white">
                                        <Check className="w-4 h-4 text-[#ff4a01]" />
                                        {feat}
                                    </li>
                                ))}
                            </ul>

                            <button className="w-full py-4 rounded-xl bg-[#ff4a01] text-white hover:bg-[#ff4a01]/90 transition-all font-bold shadow-lg shadow-[#ff4a01]/25">
                                Get Started
                            </button>
                        </div>

                        {/* DOMINATION */}
                        <div className="p-8 rounded-3xl border border-white/10 bg-[#0a0a0a] hover:bg-[#111] transition-colors flex flex-col">
                            <h3 className="text-xl font-bold text-gray-300 mb-2">Domination</h3>
                            <div className="text-4xl font-bold mb-6">$4,999<span className="text-sm font-normal text-gray-500">/mo</span></div>
                            <p className="text-gray-400 text-sm mb-8">Full-stack content team replacement.</p>

                            <ul className="space-y-4 mb-8 flex-1">
                                {["30 Reels / Month", "4 Long-form Videos", "Dedicated Editor", "Unlimited Revisions", "Strategy Calls"].map((feat, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                                        <Check className="w-4 h-4 text-[#ff4a01]" />
                                        {feat}
                                    </li>
                                ))}
                            </ul>

                            <button className="w-full py-4 rounded-xl border border-white/20 hover:bg-white hover:text-black transition-all font-bold">
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <CTA />
        </main>
    );
}
