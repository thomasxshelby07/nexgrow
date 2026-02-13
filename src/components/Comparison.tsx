"use client";

import { Check, X, ShieldCheck, Zap, Rocket, Coins, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Comparison() {
    const sectionRef = useRef(null);
    const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            rowsRef.current.forEach((row, index) => {
                if (row) {
                    gsap.fromTo(row,
                        { opacity: 0, y: 30, scale: 0.98 },
                        {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            duration: 0.6,
                            delay: index * 0.1,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: row,
                                start: "top bottom-=50",
                                toggleActions: "play none none reverse"
                            }
                        }
                    );
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const criteria = [
        { name: "Strategic Depth", icon: ShieldCheck },
        { name: "Execution Speed", icon: Zap },
        { name: "Scalability", icon: Rocket },
        { name: "Cost Efficiency", icon: Coins },
        { name: "Reliability", icon: Users },
    ];

    const competitors = [
        {
            name: "nexgrow",
            description: "Full-stack growth team.",
            isHero: true,
            values: [true, true, true, true, true],
        },
        {
            name: "In-House Team",
            description: "High cost, burnout risk.",
            isHero: false,
            values: [true, false, false, false, true],
        },
        {
            name: "Traditional Agency",
            description: "Slow & expensive.",
            isHero: false,
            values: [true, false, true, false, true],
        },
        {
            name: "Freelancers",
            description: "Unreliable scaling.",
            isHero: false,
            values: [false, true, false, true, false],
        },
        {
            name: "DIY / Tools",
            description: "No strategy, just tools.",
            isHero: false,
            values: [false, false, false, true, false],
        },
    ];

    return (
        <section ref={sectionRef} className="relative w-full py-24 lg:py-32 bg-black overflow-hidden text-white">

            {/* Background Ambience - Premium Glows */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[#ff4a01]/5 blur-[150px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }}></div>
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-900/10 blur-[120px] rounded-full"></div>
            </div>

            <div className="container relative z-10 mx-auto px-4 lg:px-6">

                {/* Header */}
                <div className="text-center mb-16 max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight relative inline-block">
                        The Old Way? <span className="font-playfair italic text-gray-500 line-through decoration-[#ff4a01]/50 decoration-4 opacity-70">Expensive.</span> <br />
                        <span className="text-white relative z-10">The <span className="text-[#ff4a01] relative inline-block">
                            NexGrow
                            <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#ff4a01] opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                            </svg>
                        </span> Way?</span>
                    </h2>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Stop juggling freelancers or overpaying bloated agencies. We combine the best of both worlds.
                    </p>
                </div>

                {/* Scrollable Table Container - HIDDEN SCROLLBAR */}
                <div className="w-full overflow-x-auto pb-8 scrollbar-hide cursor-grab active:cursor-grabbing">
                    <div className="min-w-[900px] lg:min-w-0 px-4">

                        {/* Table Header */}
                        <div className="grid grid-cols-6 gap-4 mb-6 px-6 text-center border-b border-white/5 pb-6 lg:border-none lg:pb-0">
                            <div className="col-span-1 text-left text-gray-500 font-mono text-xs uppercase tracking-widest pl-4 self-end">Platform</div>
                            {criteria.map((c, i) => (
                                <div key={i} className="col-span-1 flex flex-col items-center gap-3 text-gray-400 group">
                                    <div className="p-3 rounded-full bg-white/5 border border-white/5 group-hover:bg-[#ff4a01]/10 group-hover:border-[#ff4a01]/30 transition-all duration-300">
                                        <c.icon className="w-5 h-5 group-hover:text-[#ff4a01] transition-colors" />
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-wider group-hover:text-white transition-colors">{c.name}</span>
                                </div>
                            ))}
                        </div>

                        {/* Rows */}
                        <div className="space-y-4">
                            {competitors.map((competitor, idx) => (
                                <div
                                    key={idx}
                                    ref={(el) => { if (el) rowsRef.current[idx] = el }}
                                    onMouseEnter={() => setHoveredRow(idx)}
                                    onMouseLeave={() => setHoveredRow(null)}
                                    className={cn(
                                        "relative grid grid-cols-6 gap-4 p-6 rounded-2xl items-center transition-all duration-500 border",
                                        competitor.isHero
                                            ? "bg-[#ff4a01]/10 border-[#ff4a01]/50 shadow-[0_0_50px_rgba(255,74,1,0.15)] z-10 scale-[1.02]"
                                            : "bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/10",
                                        hoveredRow !== null && hoveredRow !== idx && !competitor.isHero ? "opacity-50 scale-[0.98] blur-[1px]" : "opacity-100"
                                    )}
                                >
                                    {/* Name & Desc Column */}
                                    <div className="col-span-1 flex flex-col justify-center pl-2">
                                        <h3 className={cn("text-lg font-bold", competitor.isHero ? 'text-white' : 'text-gray-300')}>
                                            {competitor.name === "nexgrow" ? (
                                                <span className="flex items-center gap-2">
                                                    NEX
                                                    <span className="text-[#ff4a01]">GROW</span>
                                                </span>
                                            ) : competitor.name}
                                        </h3>
                                        <p className="text-xs text-gray-500 leading-tight pr-2 mt-1">
                                            {competitor.description}
                                        </p>
                                    </div>

                                    {/* Criteria Columns */}
                                    {competitor.values.map((isValid, i) => (
                                        <div key={i} className="col-span-1 flex items-center justify-center">
                                            {isValid ? (
                                                <div className={cn(
                                                    "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500",
                                                    competitor.isHero
                                                        ? 'bg-[#ff4a01] text-white shadow-[0_0_15px_#ff4a01] scale-110'
                                                        : 'bg-transparent text-gray-400 border border-white/20 group-hover:border-white/40'
                                                )}>
                                                    <Check className="w-5 h-5" strokeWidth={3} />
                                                </div>
                                            ) : (
                                                <div className="w-8 h-8 flex items-center justify-center text-gray-800 opacity-30">
                                                    <X className="w-5 h-5" />
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                    {/* Interactive Glow for Hero Row */}
                                    {competitor.isHero && (
                                        <div className="absolute inset-0 rounded-2xl border border-[#ff4a01]/30 animate-pulse pointer-events-none"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
