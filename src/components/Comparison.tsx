"use client";

import { Check, X, ShieldCheck, Zap, Rocket, Coins, Users, Minus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Comparison() {
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);

    const criteria = [
        { name: "Strategy", icon: ShieldCheck },
        { name: "Speed", icon: Zap },
        { name: "Scale", icon: Rocket },
        { name: "Cost", icon: Coins },
        { name: "Reliable", icon: Users },
    ];

    const competitors = [
        {
            name: "nexgrow",
            description: "Full-stack growth.",
            isHero: true,
            values: [true, true, true, true, true],
        },
        {
            name: "In-House",
            description: "High fixed cost.",
            isHero: false,
            values: [true, false, false, false, true],
        },
        {
            name: "Agencies",
            description: "Slow & expensive.",
            isHero: false,
            values: [true, false, true, false, true],
        },
        {
            name: "Freelancers",
            description: "Unreliable.",
            isHero: false,
            values: [false, true, false, true, false],
        },
        {
            name: "DIY",
            description: "No strategy.",
            isHero: false,
            values: [false, false, false, true, false],
        },
    ];

    return (
        <section className="relative w-full py-16 lg:py-32 bg-white text-black overflow-hidden border-t border-gray-100">

            {/* Subtle Gradient Background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-50 via-white to-white opacity-60"></div>

            <div className="container relative z-10 mx-auto px-4 lg:px-6">

                {/* Header - Mixed Fonts & Better Visibility */}
                <div className="text-center mb-12 lg:mb-20 max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight leading-[1.1]">
                        <span className="font-playfair italic font-medium text-gray-800 block md:inline mr-3 decoration-gray-400 decoration-1 line-through opacity-80">
                            The Old Way?
                        </span>
                        <span className="text-black font-sans">
                            The <span className="text-[#ff4a01]">NexGrow Way.</span>
                        </span>
                    </h2>
                    <p className="text-gray-700 text-base md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                        Stop overpaying for mediocrity. Start scaling with precision.
                    </p>
                </div>

                {/* Scrollable Table Container */}
                <div className="w-full overflow-x-auto pb-6 scrollbar-hide cursor-grab active:cursor-grabbing">
                    <div className="min-w-[700px] lg:min-w-0 px-2 lg:px-4">

                        {/* Table Header */}
                        <div className="grid grid-cols-6 gap-2 lg:gap-4 mb-3 px-4 text-center border-b border-gray-300 pb-4">
                            <div className="col-span-1 text-left text-gray-900 font-bold text-[10px] uppercase tracking-[0.15em] pl-2 self-end">Model</div>
                            {criteria.map((c, i) => (
                                <div key={i} className="col-span-1 flex flex-col items-center gap-2 group">
                                    <div className="p-1.5 lg:p-2 rounded bg-gray-200 border border-gray-300 group-hover:border-[#ff4a01]/50 transition-colors">
                                        <c.icon className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-gray-700 group-hover:text-[#ff4a01] transition-colors" />
                                    </div>
                                    <span className="hidden lg:block text-[10px] font-bold uppercase tracking-widest text-gray-700 group-hover:text-black transition-colors">{c.name}</span>
                                </div>
                            ))}
                        </div>

                        {/* Rows */}
                        <div className="space-y-3">
                            {competitors.map((competitor, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    viewport={{ once: true }}
                                    onMouseEnter={() => setHoveredRow(idx)}
                                    onMouseLeave={() => setHoveredRow(null)}
                                    className={cn(
                                        "relative grid grid-cols-6 gap-2 lg:gap-4 p-4 lg:p-6 rounded-xl items-center transition-all duration-300 border shadow-sm",
                                        competitor.isHero
                                            ? "bg-white border-[#ff4a01] shadow-[0_10px_40px_-10px_rgba(255,74,1,0.2)] z-10 scale-[1.02]"
                                            : "bg-gray-100 border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:shadow-md",
                                        hoveredRow !== null && hoveredRow !== idx && !competitor.isHero ? "opacity-60 blur-[0.5px]" : "opacity-100"
                                    )}
                                >
                                    {/* Hero Indicator Line */}
                                    {competitor.isHero && (
                                        <div className="absolute left-0 top-3 bottom-3 w-[4px] bg-[#ff4a01] rounded-r-full"></div>
                                    )}

                                    <div className="col-span-1 flex flex-col justify-center pl-3 lg:pl-5">
                                        <h3 className={cn("text-sm lg:text-lg font-bold truncate", competitor.isHero ? 'text-black' : 'text-gray-900')}>
                                            {competitor.name === "nexgrow" ? (
                                                <span className="flex items-center gap-1 text-[#ff4a01]">
                                                    NEXGROW
                                                </span>
                                            ) : competitor.name}
                                        </h3>
                                        <p className="text-[10px] lg:text-xs text-gray-600 mt-0.5 font-bold hidden lg:block">
                                            {competitor.description}
                                        </p>
                                    </div>

                                    {/* Criteria Columns */}
                                    {competitor.values.map((isValid, i) => (
                                        <div key={i} className="col-span-1 flex items-center justify-center">
                                            {isValid ? (
                                                <div className={cn(
                                                    "w-6 h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center transition-all duration-300",
                                                    competitor.isHero
                                                        ? 'bg-[#ff4a01] text-white shadow-[0_2px_8px_rgba(255,74,1,0.3)]'
                                                        : 'bg-gray-300 text-gray-700' // Darker, clear background
                                                )}>
                                                    <Check className="w-3.5 h-3.5 lg:w-4 lg:h-4" strokeWidth={3} />
                                                </div>
                                            ) : (
                                                <div className="w-6 h-6 lg:w-8 lg:h-8 flex items-center justify-center text-gray-400">
                                                    <Minus className="w-3 h-3 lg:w-4 lg:h-4" />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
