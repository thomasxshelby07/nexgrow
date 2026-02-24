"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence, useAnimationFrame } from "framer-motion";
import { Building2, ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface IndustryItem {
    title: string;
    image?: string;
    link?: string;
}

const DEFAULT_INDUSTRIES: IndustryItem[] = [
    { title: "Real Estate", link: "/services/real-estate" },
    { title: "E-Commerce", link: "/services/e-commerce" },
    { title: "Healthcare", link: "/services/healthcare" },
    { title: "Education", link: "/services/education" },
    { title: "Finance", link: "/services/finance" },
    { title: "SaaS", link: "/services/saas" },
    { title: "Tourism", link: "/services/tourism" },
    { title: "Logistics", link: "/services/logistics" },
    { title: "Fitness", link: "/services/fitness" },
    { title: "Legal", link: "/services/legal" },
];

interface IndustriesProps {
    data?: IndustryItem[];
    title?: string;
    subtitle?: string;
    btnText?: string;
}

export default function Industries({
    data,
    title = "We Know *Your* Business.",
    subtitle = "EVERY INDUSTRY IS DIFFERENT. WE ADAPT OUR STRATEGY TO HOW YOUR CUSTOMERS ACTUALLY BUY.",
    btnText = "START YOUR PROJECT"
}: IndustriesProps) {
    const industries = data && data.length > 0 ? data : DEFAULT_INDUSTRIES;
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [progress, setProgress] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    const progressRef = useRef(0);

    // Responsive Check
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Stable Infinite Linear Loop Logic
    // ONLY scrolls if items are 8 or more
    useAnimationFrame((time, delta) => {
        if (hoveredIndex === null && industries.length > 0) {
            const speed = 0.000035; // Slightly faster for visual impact
            progressRef.current = (progressRef.current + delta * speed) % 1;
            setProgress(progressRef.current);
        }
    });

    // Dynamic Geometry based on items and theme
    const geo = useMemo(() => {
        // Dynamic Spread: If few items, cluster them (35 deg per item for better gap, max 180)
        const baseSpread = Math.min(industries.length * 35, 180);

        if (isMobile) {
            return {
                radius: 360, // Slightly larger radius to spread images more
                arcSpread: Math.min(industries.length * 45, 200), // More spread for better gaps
                yOffset: 120, // Lower value lifts arc UP relative to content
                cardSize: 80,
                cardRadius: 18,
                imageRadius: 15,
                headerSize: "text-4xl",
                subSize: "text-[10px]",
                btnHeight: "h-[50px]",
                btnPadding: "px-8",
                btnText: "text-[10px]"
            };
        }
        return {
            radius: 660,
            arcSpread: baseSpread,
            yOffset: 410,
            cardSize: 130,
            cardRadius: 30,
            imageRadius: 26,
            headerSize: "text-4xl md:text-5xl lg:text-7xl",
            subSize: "text-xs md:text-sm",
            btnHeight: "h-[54px]",
            btnPadding: "px-10",
            btnText: "text-xs"
        };
    }, [isMobile, industries.length]);

    // Helper to render text with *Italic*
    const renderTitle = (text: string) => {
        const parts = text.split(/(\*.*?\*)/g);
        return parts.map((part, i) => {
            if (part.startsWith('*') && part.endsWith('*')) {
                return <span key={i} className="text-[#FF6A00] font-playfair italic font-bold">{part.slice(1, -1)}</span>;
            }
            return <span key={i} className="text-[#1A1A1A]">{part}</span>;
        });
    };

    return (
        <section className="relative w-full h-[90vh] md:h-[105vh] min-h-[600px] md:min-h-[850px] bg-[#FFFFFF] overflow-hidden flex flex-col items-center justify-center">
            {/* 1. Light Theme Layers */}
            {/* Very Subtle Grid Texture */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000004_1px,transparent_1px),linear-gradient(to_bottom,#00000004_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-10" />

            {/* Ambient Orange Glow (Moved lower to keep top white) */}
            <div className="absolute left-1/2 top-[65%] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
                <div className="w-[800px] md:w-[1200px] h-[800px] md:h-[1200px] bg-[#FF6A00] opacity-[0.07] rounded-full blur-[160px] md:blur-[240px]" />
            </div>

            {/* 2. Unified Responsive Arc System (Forward Layer) */}
            <div className="absolute inset-0 z-30 overflow-hidden pointer-events-none">
                {/* Clean Top White Transition */}
                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white to-transparent z-40" />

                {/* Side Fades */}
                <div className="absolute inset-y-0 left-0 w-[15%] md:w-[25%] bg-gradient-to-r from-white via-white/50 to-transparent z-50" />
                <div className="absolute inset-y-0 right-0 w-[15%] md:w-[25%] bg-gradient-to-l from-white via-white/50 to-transparent z-50" />

                {/* Optional: Subtle Dark Arc Path Stroke */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03]">
                    <div
                        className="border-[2px] border-black rounded-full"
                        style={{
                            width: geo.radius * 2,
                            height: geo.radius * 2,
                            transform: `translateY(${geo.yOffset}px)`
                        }}
                    />
                </div>

                <div className="relative w-full h-full">
                    {industries.map((item, index) => {
                        const totalItems = industries.length;
                        const itemSpacing = 1 / totalItems;

                        // If < 8 items, fixed position centrally
                        const currentProgress = industries.length >= 8 ? progress : 0;
                        const itemProgress = (currentProgress + (index * itemSpacing)) % 1;

                        const angle = (itemProgress * geo.arcSpread) - (geo.arcSpread / 2);
                        const rad = (angle - 90) * (Math.PI / 180);

                        const x = Math.cos(rad) * geo.radius;
                        const y = Math.sin(rad) * geo.radius + geo.yOffset;

                        return (
                            <motion.div
                                key={index}
                                className="absolute left-1/2 top-1/2 pointer-events-auto"
                                style={{
                                    x: x - (geo.cardSize / 2),
                                    y: y - (geo.cardSize / 2),
                                    rotate: angle,
                                    zIndex: hoveredIndex === index ? 50 : 35
                                }}
                                animate={{
                                    scale: hoveredIndex === index ? 1.1 : 1,
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            >
                                <IndustryCard
                                    item={item}
                                    size={geo.cardSize}
                                    cardRadius={geo.cardRadius}
                                    imageRadius={geo.imageRadius}
                                    isHovered={hoveredIndex === index}
                                    isMobile={isMobile}
                                    onHover={() => setHoveredIndex(index)}
                                    onLeave={() => setHoveredIndex(null)}
                                />
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* 3. Balanced Content Hub (Positioned under the arc) */}
            <div className="relative z-50 flex flex-col items-center text-center px-6 pointer-events-none pt-24 md:pt-64">
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center pointer-events-auto"
                >
                    <h2 className={`${geo.headerSize} font-black tracking-tighter leading-[0.95] mb-8 max-w-[320px] md:max-w-[700px]`}>
                        {renderTitle(title)}
                    </h2>

                    <p className={`max-w-[280px] md:max-w-[500px] text-[#555555] ${geo.subSize} font-bold leading-relaxed mb-10 md:mb-14 uppercase tracking-[0.25em]`}>
                        {subtitle}
                    </p>

                    <Link href="#contact" className={`group relative ${geo.btnHeight} ${geo.btnPadding} rounded-2xl overflow-hidden flex items-center bg-black transition-all hover:scale-105 active:scale-95 shadow-2xl`}>
                        {/* Premium Motion Border */}
                        <motion.div
                            className="absolute -inset-[3px] opacity-70 group-hover:opacity-100 transition-opacity"
                            style={{
                                background: "conic-gradient(from 0deg, #FF6A00, transparent 30%, #FF6A00, transparent 70%, #FF6A00)",
                            }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Inner Black Background */}
                        <div className="absolute inset-[1.5px] bg-black rounded-[14px]" />

                        <span className={`relative z-10 text-white font-black ${geo.btnText} uppercase tracking-[0.2em] flex items-center gap-2`}>
                            {btnText}
                            <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={3} />
                        </span>
                    </Link>
                </motion.div>
            </div>

            {/* Visual Clean Divider Line */}
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-black/5 to-transparent z-10" />
        </section>
    );
}

function IndustryCard({ item, size, cardRadius, imageRadius, isHovered, isMobile, onHover, onLeave }: {
    item: IndustryItem,
    size: number,
    cardRadius: number,
    imageRadius: number,
    isHovered: boolean,
    isMobile: boolean,
    onHover: () => void,
    onLeave: () => void
}) {
    return (
        <div
            className="relative pointer-events-auto"
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
        >
            <Link href={item.link || "#"} className="relative block group">
                <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className={`
                        relative overflow-hidden transition-all duration-700
                        bg-white border border-[#00000008]
                        flex items-center justify-center p-1.5
                        ${isHovered ? 'shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-[#FF6A00]/40' : 'shadow-lg'}
                    `}
                    style={{
                        width: size,
                        height: size,
                        borderRadius: cardRadius
                    }}
                >
                    {/* Image / Content with soft background */}
                    <div
                        className="relative z-10 w-full h-full overflow-hidden bg-[#F8F8F8] flex items-center justify-center border border-[#00000003]"
                        style={{ borderRadius: imageRadius }}
                    >
                        {item.image ? (
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" />
                        ) : (
                            <div className="flex flex-col items-center gap-1.5 opacity-40">
                                <Building2 size={size * 0.22} className={`${isHovered ? 'text-[#FF6A00]' : 'text-[#333]'}`} />
                                <span className="text-[6px] font-black tracking-widest text-[#999] uppercase">Sector</span>
                            </div>
                        )}
                    </div>

                    {/* Subtle Internal Highlight */}
                    <div className="absolute inset-x-0 top-0 h-px bg-white/40" />
                </motion.div>

                {/* Floating Title (Always visible for Arc feel) */}
                <div
                    className="absolute left-1/2 -translate-x-1/2 text-center w-[160px] mt-4"
                >
                    <span className={`text-[6px] md:text-[8px] font-black uppercase tracking-[0.25em] text-[#000000] drop-shadow-sm leading-tight block whitespace-pre-line`}>
                        {isMobile && item.title.includes(' ') && item.title.split(' ').length === 2
                            ? item.title.replace(' ', '\n')
                            : item.title
                        }
                    </span>
                    <div className="w-6 h-[1.5px] bg-[#FF6A00] mx-auto mt-1 rounded-full opacity-60" />
                </div>
            </Link>
        </div>
    );
}
