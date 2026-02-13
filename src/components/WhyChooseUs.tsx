"use client";

import { BrainCircuit, TrendingUp, Zap, Layers, BarChart3, Bot, ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function WhyChooseUs() {
    return (
        <section className="relative w-full py-16 lg:py-24 bg-black overflow-hidden">

            {/* Background Texture - Premium "Next Level" Gradient */}
            <div className="absolute inset-0 bg-black">
                {/* Strong Top-Left Glow */}
                <div className="absolute -top-[20%] -left-[10%] w-[700px] h-[700px] bg-[#ff4a01]/30 rounded-full blur-[120px] mix-blend-screen opacity-60 animate-pulse"></div>

                {/* Deep Radial Center */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#2a0e05] via-black to-black opacity-90"></div>

                {/* Bottom-Right Secondary Glow */}
                <div className="absolute -bottom-[20%] -right-[10%] w-[600px] h-[600px] bg-[#ff4a01]/10 rounded-full blur-[100px] mix-blend-screen opacity-50"></div>

                {/* Subtle Moving Light Cone */}
                <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg_at_50%_50%,_transparent_0deg,_#ff4a0110_120deg,_transparent_360deg)] animate-[spin_30s_linear_infinite] opacity-40"></div>
            </div>

            <div className="container relative z-10 mx-auto px-4 lg:px-6">

                {/* Section Header - Centered & Compact on Mobile */}
                <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-10 gap-6 text-center md:text-left">
                    <div className="max-w-3xl mx-auto md:mx-0">
                        <h2 className="text-3xl md:text-5xl lg:text-5xl font-bold text-white tracking-tighter leading-[0.9] mb-4">
                            Why Brands Grow <br />
                            Faster With <span className="font-playfair italic text-[#ff4a01]">nexgrow</span>
                        </h2>
                        <p className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto md:mx-0">
                            We don’t post content. We build brands people remember — and systems that make them buy.
                        </p>
                    </div>
                    <div className="hidden md:block max-w-sm text-right border-l border-[#ff4a01] pl-4 opacity-80">
                        <p className="text-xs text-[#ff4a01] uppercase tracking-widest font-bold mb-1">Our Philosophy</p>
                        <p className="text-sm text-gray-400">Most agencies chase trends. <br /> We study behavior.</p>
                    </div>
                </div>

                {/* Main Bento Grid - refined for premium feel */}
                <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 lg:gap-6 h-auto lg:h-[600px]">

                    {/* 1. Large Feature Card (Left - Spans 2 Rows) */}
                    <div className="md:row-span-2 group relative p-8 lg:p-10 bg-white/[0.03] border border-white/5 hover:border-[#ff4a01]/30 transition-all duration-500 rounded-3xl overflow-hidden flex flex-col justify-between h-[500px] lg:h-auto">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-0"></div>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,74,1,0.15),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                        <div className="relative z-10">
                            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] text-[#ff4a01] uppercase border border-[#ff4a01]/20 bg-[#ff4a01]/5 rounded-full backdrop-blur-md">
                                The Core Difference
                            </span>
                            <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[0.95] tracking-tighter">
                                Unlock The <br /> Future Of <br /> <span className="font-playfair italic text-[#ff4a01]">Growth</span>
                            </h3>
                            <p className="text-gray-400 text-lg leading-relaxed max-w-sm">
                                Most agencies jump to creatives. We start with psychology, funnel architecture & audience intent to build a predictable revenue engine.
                            </p>
                        </div>

                        {/* Interactive Visual */}
                        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-gradient-to-br from-[#ff4a01]/10 to-transparent rounded-full blur-[100px] group-hover:blur-[80px] transition-all duration-700 mix-blend-screen pointer-events-none"></div>

                        {/* CTA as a sleek link */}
                        <div className="relative z-10 mt-8">
                            <button className="group/btn flex items-center gap-4 text-white font-medium hover:text-[#ff4a01] transition-colors">
                                <span className="uppercase tracking-widest text-sm border-b border-transparent group-hover/btn:border-[#ff4a01] transition-all pb-1">Start The Journey</span>
                                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:border-[#ff4a01] group-hover/btn:bg-[#ff4a01] transition-all">
                                    <ArrowUpRight className="w-5 h-5 group-hover/btn:text-white transition-colors" />
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* 2. Top Right - Full Funnel (Wide) */}
                    <div className="md:col-span-2 group relative p-8 bg-white/[0.03] border border-white/5 hover:border-[#ff4a01]/30 transition-all duration-500 rounded-3xl overflow-hidden flex flex-col justify-center min-h-[250px]">
                        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-[#ff4a01]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                            <div className="max-w-md space-y-4">
                                <div className="p-3 w-fit bg-[#ff4a01]/10 rounded-xl">
                                    <Layers className="w-6 h-6 text-[#ff4a01]" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Full Funnel Execution</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        From awareness → nurture → conversion → retention. We don't just run ads; we engineer the entire customer journey for maximum LTV.
                                    </p>
                                </div>
                            </div>

                            {/* Abstract UI Representation */}
                            <div className="hidden md:flex flex-col gap-2 opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                                <div className="w-48 h-3 bg-white/10 rounded-full overflow-hidden">
                                    <div className="w-1/3 h-full bg-[#ff4a01]/50"></div>
                                </div>
                                <div className="w-48 h-3 bg-white/10 rounded-full overflow-hidden">
                                    <div className="w-2/3 h-full bg-[#ff4a01]/70"></div>
                                </div>
                                <div className="w-48 h-3 bg-white/10 rounded-full overflow-hidden">
                                    <div className="w-full h-full bg-[#ff4a01]"></div>
                                </div>
                                <span className="text-right text-[10px] text-[#ff4a01] font-mono mt-1">+142% Conversion Rate</span>
                            </div>
                        </div>
                    </div>

                    {/* 3. Bottom Center - ROI Focus */}
                    <div className="group relative p-8 bg-white/[0.03] border border-white/5 hover:border-[#ff4a01]/30 transition-all duration-500 rounded-3xl overflow-hidden flex flex-col justify-between min-h-[250px]">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#ff4a01]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <div className="relative z-10">
                            <BarChart3 className="w-8 h-8 text-white/20 mb-6 group-hover:text-[#ff4a01] transition-colors" />
                            <div className="flex items-baseline gap-2">
                                <h4 className="text-6xl font-bold text-white tracking-tighter group-hover:text-[#ff4a01] transition-colors duration-300">5x</h4>
                                <span className="text-lg font-medium text-gray-500">ROI</span>
                            </div>
                        </div>
                        <div className="relative z-10">
                            <p className="text-gray-400 text-sm mt-4">
                                Every dollar spent is tracked. We focus on profitable scaling, not vanity metrics.
                            </p>
                        </div>
                    </div>

                    {/* 4. Bottom Right - AI Powered (Dark Premium Version) */}
                    <div className="group relative p-8 bg-gradient-to-br from-[#1a0a05] to-black border border-[#ff4a01]/20 hover:border-[#ff4a01]/60 transition-all duration-500 rounded-3xl overflow-hidden flex flex-col justify-between min-h-[250px]">
                        {/* Glowing Orb */}
                        <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-[#ff4a01] rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <Bot className="w-8 h-8 text-[#ff4a01]" />
                                <span className="text-xs font-bold text-[#ff4a01] uppercase tracking-wider border border-[#ff4a01]/30 px-2 py-0.5 rounded-full">New Tech</span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">AI Powered</h3>
                            <p className="text-gray-400 text-sm">
                                Automation & AI agents that reduce CPA and scale operations without adding headcount.
                            </p>
                        </div>

                        <div className="relative z-10 mt-4 flex items-center gap-2 group/link cursor-pointer">
                            <span className="text-sm font-bold text-white group-hover/link:text-[#ff4a01] transition-colors">Explore AI</span>
                            <ArrowUpRight className="w-4 h-4 text-white group-hover/link:text-[#ff4a01] group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-all" />
                        </div>
                    </div>

                </div>

                {/* Footer Micro Text */}
                <div className="mt-12 flex justify-between items-center opacity-40 mix-blend-plus-lighter border-t border-white/10 pt-6">
                    <p className="hidden md:block text-xs text-gray-500 font-mono tracking-widest uppercase">
                        // NEXGROW SYSTEM V2.0
                    </p>
                    <p className="text-xs text-gray-500 font-mono tracking-widest uppercase ml-auto">
                        // TRUSTED BY BRANDS THAT SCALE
                    </p>
                </div>
            </div>
        </section>
    );
}
