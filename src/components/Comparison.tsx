"use client";

import { Check, X, ShieldCheck, Zap, Rocket, Coins, Users, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Comparison() {
    const features = [
        { name: "Strategy", icon: ShieldCheck },
        { name: "Speed", icon: Zap },
        { name: "Scale", icon: Rocket },
        { name: "Cost", icon: Coins },
        { name: "Reliability", icon: Users },
    ];

    return (
        <section className="relative w-full py-16 lg:py-24 bg-white text-black overflow-hidden mb-20">
            <div className="container relative z-10 mx-auto px-4 lg:px-6">

                <div className="text-center mb-10 lg:mb-16 max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight leading-tight">
                        <span className="font-playfair italic text-black font-black">Why Choose</span> <br className="md:hidden" />
                        <span className="text-[#ff4a01] ml-2 font-sans font-extrabold">NexGrow?</span>
                    </h2>
                    <p className="text-gray-600 text-lg font-medium">
                        Stop compromising. Start dominating.
                    </p>
                </div>

                {/* 2. UNIFIED TABLE (Mobile & Desktop) - Wider & Premium */}
                <div className="w-full max-w-6xl mx-auto bg-gray-50/50 rounded-[2.5rem] border border-gray-100 p-2 md:p-4">

                    {/* Table Header */}
                    <div className="grid grid-cols-3 p-4 mb-2">
                        <div className="col-span-1 text-left font-bold text-gray-400 text-xs uppercase tracking-widest pl-4 self-end">Feature</div>
                        <div className="col-span-1 text-center font-bold text-gray-400 text-xs uppercase tracking-widest self-end pb-1">Others</div>
                        {/* NexGrow Column Header - Popped */}
                        <div className="col-span-1 relative">
                            <div className="absolute inset-x-0 -top-4 -bottom-2 bg-white rounded-t-2xl shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.05)] border-t border-x border-gray-100"></div>
                            <div className="relative z-10 text-center font-black text-[#ff4a01] text-lg md:text-xl uppercase tracking-widest flex items-center justify-center gap-2">
                                <span>NexGrow</span>
                            </div>
                        </div>
                    </div>

                    {/* Table Body */}
                    <div className="space-y-2">
                        {features.map((item, i) => (
                            <div key={i} className="grid grid-cols-3 relative group">
                                {/* NexGrow Column Background (Absolute) - Creates the vertical white stripe effect */}
                                <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white border-x border-gray-100 shadow-sm z-0 first:rounded-t-none last:rounded-b-2xl"></div>

                                {/* Feature Name */}
                                <div className="col-span-1 flex items-center gap-3 p-4 pl-6 relative z-10">
                                    <div className="w-10 h-10 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-500 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                        <item.icon size={18} strokeWidth={1.5} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm md:text-base font-bold text-gray-800 leading-tight">{item.name}</span>
                                        <span className="text-[10px] text-gray-400 font-medium hidden md:block">Essential for growth</span>
                                    </div>
                                </div>

                                {/* Others (X) */}
                                <div className="col-span-1 flex flex-col items-center justify-center p-4 relative z-10 grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
                                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mb-1">
                                        <X className="w-4 h-4 text-gray-500" strokeWidth={3} />
                                    </div>
                                    <span className="text-[10px] md:text-xs font-semibold text-gray-400 text-center">
                                        {i === 0 ? "No Direction" : i === 1 ? "Slow Pace" : i === 2 ? "Bottlenecks" : i === 3 ? "Hidden Costs" : "Unreliable"}
                                    </span>
                                </div>

                                {/* NexGrow (Check) */}
                                <div className="col-span-1 flex flex-col items-center justify-center p-4 relative z-10">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff4a01] to-[#ff7e3c] flex items-center justify-center text-white shadow-lg shadow-orange-200 mb-1 group-hover:scale-110 transition-transform duration-300">
                                        <Check size={20} strokeWidth={3} />
                                    </div>
                                    <span className="text-xs md:text-sm font-bold text-[#ff4a01] text-center">
                                        {i === 0 ? "Strategic Roadmap" : i === 1 ? "Rapid Execution" : i === 2 ? "Unlimited Scale" : i === 3 ? "Transparent Pricing" : "Dedicated Team"}
                                    </span>
                                </div>

                            </div>
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <div className="mt-2 p-6 text-center relative z-10">
                        <div className="inline-block bg-[#ff4a01]/5 rounded-full px-6 py-2 border border-[#ff4a01]/10">
                            <p className="text-xs md:text-sm font-bold text-[#ff4a01] flex items-center gap-2">
                                <ShieldCheck size={16} />
                                100% Satisfaction Guarantee. Or we work for free.
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}
