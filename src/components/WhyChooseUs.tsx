"use client";

import { useRef } from "react";
import { Check, X, ArrowRight, Zap, TrendingUp, Layers, BrainCircuit, MousePointer2, Minus } from "lucide-react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";
import { cn } from "@/lib/utils";

export default function WhyChooseUs() {
    return (
        <section className="relative w-full py-24 lg:py-40 bg-[#050505] text-white overflow-hidden">

            {/* Grid Background - Clean & Technical */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

            <div className="container mx-auto px-4 lg:px-6 relative z-10">

                {/* 1. HEADER: Editorial Style */}
                <div className="mb-24 lg:mb-32 text-center max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center gap-2 mb-6"
                    >
                        <span className="h-px w-8 bg-[#ff4a01]"></span>
                        <span className="text-[#ff4a01] font-mono text-xs uppercase tracking-[0.3em]">The NexGrow Difference</span>
                        <span className="h-px w-8 bg-[#ff4a01]"></span>
                    </motion.div>

                    <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-8">
                        <span className="block text-gray-500 line-through decoration-gray-600 decoration-1 opacity-50 mb-2 text-3xl md:text-5xl font-serif italic">
                            We don’t just offer Services.
                        </span>
                        <span className="block text-white">
                            We Engineer Your <span className="text-[#ff4a01]">Growth System.</span>
                        </span>
                    </h2>
                </div>


                {/* 2. THE COMPARISON: Clean Split Layout */}
                <div className="relative mb-32">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-white/10 rounded-3xl overflow-hidden bg-[#0a0a0a] relative">

                        {/* Center Axis Line (Desktop) */}
                        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 z-10"></div>

                        {/* VS Badge - Mechanical & Clean */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                            <div className="w-12 h-12 bg-[#050505] border border-white/10 rotate-45 flex items-center justify-center ring-4 ring-[#050505]">
                                <span className="-rotate-45 text-[#ff4a01] text-xs font-black font-mono">VS</span>
                            </div>
                        </div>

                        {/* LEFT: OLD WAY (Desaturated, Muted) */}
                        <div className="p-8 md:p-16 border-b md:border-b-0 border-white/10 bg-[#0a0a0a]/50 relative group/old">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-800 to-transparent opacity-0 group-hover/old:opacity-100 transition-opacity"></div>

                            <div className="flex items-center gap-3 mb-10 opacity-50">
                                <X className="w-5 h-5" />
                                <h3 className="font-mono text-sm uppercase tracking-widest">The Old Way</h3>
                            </div>

                            <div className="space-y-8">
                                {[
                                    { title: "Chaos & Fragmentation", desc: "Managing 5 different freelancers." },
                                    { title: "Vanity Metrics", desc: "Likes that don't pay the bills." },
                                    { title: "Guesswork", desc: "Strategies based on 'feelings'." },
                                ].map((item, i) => (
                                    <div key={i} className="pl-6 border-l border-white/5 text-gray-500">
                                        <h4 className="text-lg font-bold mb-1">{item.title}</h4>
                                        <p className="text-sm">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT: NEXGROW WAY (High Contrast, Active) */}
                        <div className="p-8 md:p-16 bg-gradient-to-br from-[#0f0f0f] to-[#050505] relative group/new overflow-hidden">
                            {/* Accent Line */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ff4a01] to-transparent"></div>

                            <div className="flex items-center gap-3 mb-10">
                                <div className="w-5 h-5 rounded-full bg-[#ff4a01] flex items-center justify-center">
                                    <Check className="w-3 h-3 text-white" />
                                </div>
                                <h3 className="font-mono text-sm uppercase tracking-widest text-[#ff4a01]">The NexGrow Way</h3>
                            </div>

                            <div className="space-y-8 relative z-10">
                                {[
                                    { title: "Unified Growth Engine", desc: "All disciplines working as one system.", icon: Layers },
                                    { title: "Revenue Focused", desc: "Content & Ads engineered for ROI.", icon: TrendingUp },
                                    { title: "Data Precision", desc: "Decisions backed by live analytics.", icon: BrainCircuit },
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ x: 20, opacity: 0 }}
                                        whileInView={{ x: 0, opacity: 1 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex gap-4 items-start"
                                    >
                                        <div className="mt-1 w-8 h-8 rounded bg-[#ff4a01]/10 flex items-center justify-center flex-shrink-0 text-[#ff4a01]">
                                            <item.icon className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-white mb-1">{item.title}</h4>
                                            <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>


                {/* 3. THE INFRASTRUCTURE: Circuit Design */}
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h3 className="text-2xl font-bold mb-2">Integrated Infrastructure</h3>
                        <p className="text-gray-500 text-sm">Every component connects to drive growth.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden">
                        {[
                            { label: "Strategy", icon: BrainCircuit },
                            { label: "Creative", icon: Zap },
                            { label: "Distribution", icon: MousePointer2 },
                            { label: "Conversion", icon: TrendingUp },
                            { label: "Analytics", icon: Layers },
                            { label: "Scale", icon: ArrowRight },
                        ].map((item, i) => (
                            <div key={i} className="bg-[#080808] p-8 flex flex-col items-center justify-center gap-4 group hover:bg-[#0a0a0a] transition-colors relative">
                                {/* Hover Accent */}
                                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-[#ff4a01] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>

                                <item.icon className="w-8 h-8 text-gray-600 group-hover:text-[#ff4a01] transition-colors" />
                                <span className="font-bold text-gray-300 group-hover:text-white transition-colors">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
