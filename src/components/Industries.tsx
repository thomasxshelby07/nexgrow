"use client";

import { Building2, Stethoscope, GraduationCap, ShoppingBag, MapPin, Rocket, Utensils, Users } from "lucide-react";
import { useState } from "react";

export default function Industries() {
    const industries = [
        // Row 1 (3 items)
        {
            icon: <Building2 className="w-8 h-8" />,
            title: "Real Estate",
            description: "High-value lead gen systems."
        },
        {
            icon: <Stethoscope className="w-8 h-8" />,
            title: "Doctors & Clinics",
            description: "Trust-based patient funnels."
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Coaches",
            description: "Authority positioning & leads."
        },
        // Row 2 (2 items)
        {
            icon: <ShoppingBag className="w-8 h-8" />,
            title: "E-commerce",
            description: "Ads & retention strategies."
        },
        {
            icon: <MapPin className="w-8 h-8" />,
            title: "Local Biz",
            description: "Local SEO & consistent enquiries."
        },
        // Row 3 (3 items)
        {
            icon: <GraduationCap className="w-8 h-8" />,
            title: "Education",
            description: "Admissions-focused campaigns."
        },
        {
            icon: <Rocket className="w-8 h-8" />,
            title: "Startups",
            description: "Launch & traction strategy."
        },
        {
            icon: <Utensils className="w-8 h-8" />,
            title: "Restaurants",
            description: "Visuals & repeat customers."
        }
    ];

    // State to track hovered item
    const [activeindex, setActiveIndex] = useState<number | null>(null);

    return (
        <section className="relative w-full py-24 overflow-hidden bg-black">

            {/* Animated Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#050505] via-[#1a0500] to-[#050000] bg-[length:400%_400%] animate-gradient-xy opacity-80"></div>

            {/* Ambient Moving Glows */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#ff4a01]/20 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] mix-blend-screen animate-pulse delay-1000"></div>
            </div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] mask-gradient opacity-20"></div>

            <div className="container relative z-10 mx-auto px-4 lg:px-6">

                {/* Section Header */}
                <div className="mb-20 max-w-4xl mx-auto text-center">
                    <span className="text-[#ff4a01] font-mono text-xs tracking-[0.2em] uppercase mb-4 block animate-fade-in">
                        Industries We Work With
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
                        We Know <span className="font-playfair italic text-[#ff4a01]">Your Business.</span>
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
                        Every industry is different. We adapt our strategy to how your customers actually buy.
                    </p>
                </div>

                {/* Honeycomb Grid Layout */}
                <div className="flex flex-col items-center justify-center gap-4 md:gap-6 pb-12">
                    <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
                        {industries.map((item, index) => (
                            <div
                                key={index}
                                className="relative group w-[160px] h-[180px] md:w-[220px] md:h-[250px] flex items-center justify-center transition-all duration-500 ease-out hover:z-20 hover:scale-110 cursor-pointer"
                                style={{
                                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                                    marginTop: (index === 3 || index === 4) ? '0px' : '0px',
                                }}
                                onMouseEnter={() => setActiveIndex(index)}
                                onMouseLeave={() => setActiveIndex(null)}
                            >
                                {/* Glass Background & Border */}
                                <div className={`absolute inset-0 transition-all duration-500 backdrop-blur-md
                                    ${activeindex === index
                                        ? 'bg-[#ff4a01]/90'
                                        : 'bg-white/[0.02] hover:bg-white/[0.05] border border-white/10'}
                                `}></div>

                                {/* Inner Content Container */}
                                <div className="absolute inset-[1px] transition-all duration-500"
                                    style={{
                                        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                                        background: activeindex === index ? 'transparent' : 'rgba(0,0,0,0.4)', // Darken slightly for contrast
                                    }}
                                >
                                    {/* Inner Content */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">

                                        {/* Icon */}
                                        <div className={`transition-all duration-500 ${activeindex === index ? '-translate-y-4 text-white' : 'text-[#ff4a01]'}`}>
                                            {item.icon}
                                        </div>

                                        {/* Title */}
                                        <h3 className={`text-sm md:text-lg font-bold mt-4 transition-all duration-500 ${activeindex === index ? 'text-white translate-y-0 opacity-100' : 'text-white/80 opacity-90'}`}>
                                            {item.title}
                                        </h3>

                                        {/* Description */}
                                        <div className={`mt-2 text-xs md:text-sm text-white/90 leading-tight transition-all duration-500 overflow-hidden ${activeindex === index ? 'max-h-20 opacity-100 translate-y-0' : 'max-h-0 opacity-0 translate-y-4'}`}>
                                            {item.description}
                                        </div>

                                    </div>

                                    {/* Glass Shine */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none mix-blend-overlay"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Line */}
                <div className="text-center border-t border-white/5 pt-12">
                    <p className="text-[#ff4a01] text-lg font-medium">
                        One structured growth approach tailored to each.
                    </p>
                </div>

            </div>
        </section>
    );
}
