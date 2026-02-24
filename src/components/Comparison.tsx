"use client";

import { Check, X, ShieldCheck, Zap, Rocket, Coins, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function Comparison() {
    const features = [
        { name: "Strategy", icon: ShieldCheck, detail: "Data-driven roadmaps" },
        { name: "Speed", icon: Zap, detail: "Fastest turnaround" },
        { name: "Scale", icon: Rocket, detail: "Unlimited growth" },
        { name: "Cost", icon: Coins, detail: "Zero hidden fees" },
        { name: "Reliability", icon: Users, detail: "24/7 dedicated support" },
    ];

    return (
        <section className="relative w-full py-20 lg:py-32 bg-white text-[#1A1A1A] overflow-hidden">
            <div className="container relative z-10 mx-auto px-4 lg:px-6">

                {/* Headline - Split into 2 lines as requested */}
                <div className="text-center mb-16 lg:mb-24 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tighter leading-[1] uppercase font-outfit">
                            <span className="font-playfair italic font-black block lowercase">Why Choose</span>
                            <span className="text-[#FF6A00] block mt-2">NexGrow?</span>
                        </h2>
                        <p className="text-[#555] text-sm md:text-lg font-medium font-playfair italic max-w-xl mx-auto opacity-70">
                            Stop compromising. Start dominating with the agency built for winners.
                        </p>
                    </motion.div>
                </div>

                {/* Locked Grid Table Container */}
                <div className="w-full max-w-[900px] mx-auto relative px-1">

                    {/* Synchronized Header Row */}
                    <div className="grid grid-cols-4 w-full px-2 md:px-10 mb-6 items-end relative z-20">
                        <div className="col-span-2 text-left pl-2 md:pl-4">
                            <span className="font-black text-[#1A1A1A]/30 text-[8px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.25em] font-outfit">Metric</span>
                        </div>
                        <div className="col-span-1 text-center">
                            <span className="font-black text-[#1A1A1A]/30 text-[8px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.25em] font-outfit">Others</span>
                        </div>
                        <div className="col-span-1 flex justify-end md:justify-center">
                            <span className="text-[#FF6A00] font-black text-[8px] md:text-[12px] uppercase tracking-[0.15em] md:tracking-[0.2em] px-2 py-1 md:px-6 md:py-2 bg-orange-50 rounded-full border border-orange-100 shadow-sm whitespace-nowrap">
                                NEXGROW
                            </span>
                        </div>
                    </div>

                    {/* Synchronized Rows */}
                    <div className="space-y-3 relative">
                        {features.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.05 }}
                                className="grid grid-cols-4 w-full items-center bg-[#FAFAFA] rounded-2xl md:rounded-[32px] border border-gray-100 p-3 md:p-6 hover:border-[#FF6A00]/20 hover:bg-white hover:shadow-[0_10px_30px_rgba(0,0,0,0.03)] transition-all duration-300 group"
                            >
                                {/* Left side: Metric (2 columns) */}
                                <div className="col-span-2 flex items-center gap-3 md:gap-6 pl-1 md:pl-4">
                                    <div className="w-8 h-8 md:w-11 md:h-11 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-[#1A1A1A] group-hover:text-[#FF6A00] transition-colors shadow-sm shrink-0">
                                        <item.icon className="w-4 h-4 md:w-5 md:h-5 stroke-[1.5]" />
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <h3 className="text-[11px] md:text-[18px] font-black text-[#1A1A1A] leading-tight font-outfit uppercase tracking-wider">
                                            {item.name}
                                        </h3>
                                        <p className="text-[9px] md:text-sm text-[#888] font-medium hidden md:block mt-0.5 font-playfair italic">
                                            {item.detail}
                                        </p>
                                    </div>
                                </div>

                                {/* Middle: Others (1 column) */}
                                <div className="col-span-1 flex flex-col items-center justify-center opacity-40">
                                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                                        <X className="w-3 h-3 md:w-4 md:h-4 text-gray-400" strokeWidth={3} />
                                    </div>
                                    <span className="text-[7.5px] md:text-[10px] font-black text-gray-400 text-center uppercase tracking-widest px-1">
                                        {i === 0 ? "No Vision" : i === 1 ? "Slow" : i === 2 ? "Limited" : i === 3 ? "Hidden Fees" : "Uncertain"}
                                    </span>
                                </div>

                                {/* Right side: NexGrow (1 column) */}
                                <div className="col-span-1 flex flex-col items-center justify-center">
                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#FF6A00] flex items-center justify-center text-white shadow-[0_4px_12px_rgba(255,106,0,0.25)] mb-1 md:mb-1.5 group-hover:scale-110 transition-transform">
                                        <Check className="w-4 h-4 md:w-5 md:h-5" strokeWidth={4} />
                                    </div>
                                    <span className="text-[8.5px] md:text-[12px] font-black text-[#FF6A00] text-center leading-tight font-outfit uppercase tracking-wide">
                                        {i === 0 ? "Strategic Era" : i === 1 ? "Instant" : i === 2 ? "Infinity" : i === 3 ? "Direct" : "Elite Team"}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Minimalist Bottom Guarantee */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="mt-12 md:mt-20 flex justify-center"
                    >
                        <div className="flex items-center gap-2 md:gap-3 px-6 py-3 md:px-10 md:py-4 bg-white border border-gray-100 rounded-full shadow-sm">
                            <ShieldCheck className="w-4 h-4 md:w-6 md:h-6 text-[#FF6A00]" strokeWidth={2} />
                            <p className="text-[9px] md:text-sm font-black text-[#1A1A1A] uppercase tracking-[0.15em] font-outfit">
                                Satisfaction Guarantee <span className="text-[#FF6A00] ml-1">&bull; Or it's free</span>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
