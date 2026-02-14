"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Briefcase, Menu, DollarSign, LayoutGrid, MessageSquare, Home, Sparkles, ArrowRight, ChevronRight, User, FileText } from "lucide-react";
import { AnimatePresence, motion, Variants } from "framer-motion";

// Service Data
const services = [
    {
        id: "01",
        title: "Strategy",
        icon: User, // Using generic icons for now, can be specific
        desc: "Align growth.",
    },
    {
        id: "02",
        title: "UI/UX",
        icon: LayoutGrid,
        desc: "Design value.",
    },
    {
        id: "03",
        title: "Website",
        icon: Home,
        desc: "Fast apps.",
    },
    {
        id: "04",
        title: "Mobile App",
        icon: Briefcase,
        desc: "iOS & Android.",
    },
];

// Animation Variants
const menuVariants: Variants = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.2, ease: "easeOut" }
    },
    exit: {
        opacity: 0,
        y: 10,
        scale: 0.95,
        transition: { duration: 0.15 }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, x: -5 },
    visible: { opacity: 1, x: 0 }
};

export default function Navbar() {
    const [activeSection, setActiveSection] = useState("Home");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isServicesHovered, setIsServicesHovered] = useState(false);
    const [isMoreHovered, setIsMoreHovered] = useState(false);

    // Active Section Logic
    useEffect(() => {
        const sections = document.querySelectorAll("section[id]");
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute("id");
                    if (id) {
                        const name = id.charAt(0).toUpperCase() + id.slice(1);
                        setActiveSection(name === "Hero" ? "Home" : name);
                    }
                }
            });
        }, { threshold: 0.5 });

        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    const leftNavItems = [
        { name: "Home", icon: Home, href: "#hero" },
        // Services separate
        { name: "Blog", icon: MessageSquare, href: "#blog" },
    ];

    const rightNavItems = [
        { name: "Projects", icon: LayoutGrid, href: "#casestudies" },
        // More separate
    ];

    return (
        <>
            {/* FLOATING BOTTOM DOCK - COMPACT & PREMIUM */}
            <div className="fixed z-50 bottom-0 left-0 w-full md:bottom-6 md:left-1/2 md:-translate-x-1/2 md:w-auto md:max-w-fit pointer-events-none">

                <div className="relative pointer-events-auto flex flex-col items-center">

                    {/* MEGA MENU POPOVER - Compact */}
                    <AnimatePresence>
                        {isServicesHovered && (
                            <motion.div
                                variants={menuVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                onMouseEnter={() => setIsServicesHovered(true)}
                                onMouseLeave={() => setIsServicesHovered(false)}
                                className="absolute bottom-full mb-3 md:-translate-x-[20%] w-[90vw] md:w-[600px] p-2 z-40"
                            >
                                <div className="bg-white/70 backdrop-blur-[40px] saturate-150 border border-white/50 shadow-[0_20px_40px_-5px_rgba(0,0,0,0.1),0_0_0_1px_rgba(255,255,255,0.3)_inset] rounded-[24px] overflow-hidden p-4">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {services.map((service) => (
                                            <Link
                                                key={service.id}
                                                href="#whatwedo"
                                                onClick={() => setIsServicesHovered(false)}
                                                className="group flex flex-col items-start justify-between gap-1 p-4 h-full rounded-2xl hover:bg-white/60 transition-all duration-300 border border-transparent hover:border-white/50 relative overflow-hidden"
                                            >
                                                <div className="flex items-center justify-between w-full">
                                                    <span className="text-sm font-bold text-gray-800 group-hover:text-black transition-colors">{service.title}</span>
                                                    <ArrowRight size={16} className="text-gray-400 group-hover:text-[#ff4a01] -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
                                                </div>
                                                <p className="text-[10px] font-medium text-gray-400 group-hover:text-gray-500 transition-colors line-clamp-1">{service.desc}</p>
                                            </Link>
                                        ))}
                                        <Link href="#whatwedo" className="flex flex-col items-center justify-center gap-2 p-4 h-full rounded-2xl bg-[#ff4a01]/5 hover:bg-[#ff4a01]/10 border border-[#ff4a01]/10 group transition-all duration-300">
                                            <span className="text-xs font-bold text-[#ff4a01] flex items-center gap-1 group-hover:gap-2 transition-all">
                                                View All <ArrowRight size={14} strokeWidth={2.5} />
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* BAR CONTAINER */}
                    <div className="
                        hidden md:flex items-center justify-center gap-1 p-1.5
                        bg-white/75 backdrop-blur-3xl saturate-150
                        rounded-t-[20px] md:rounded-[20px]
                        border border-white/50 shadow-2xl shadow-black/5
                        ring-1 ring-black/5
                    ">

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-1">
                            {/* Home */}
                            <Link href="#hero" className={cn(
                                "px-4 py-2 rounded-xl flex items-center gap-2 transition-all duration-300",
                                activeSection === "Home" ? "bg-black text-white shadow-md" : "text-gray-500 hover:text-black hover:bg-white/40"
                            )}>
                                <Home size={16} strokeWidth={2.5} />
                                <span className="text-xs font-bold uppercase tracking-wide">Home</span>
                            </Link>

                            {/* Services (Hover Trigger) */}
                            <div
                                className="relative"
                                onMouseEnter={() => setIsServicesHovered(true)}
                                onMouseLeave={() => setIsServicesHovered(false)}
                            >
                                <Link href="#whatwedo" className={cn(
                                    "px-4 py-2 rounded-xl flex items-center gap-2 transition-all duration-300",
                                    activeSection === "Services" ? "bg-black text-white shadow-md" : "text-gray-500 hover:text-black hover:bg-white/40"
                                )}>
                                    <Briefcase size={16} strokeWidth={2.5} />
                                    <span className="text-xs font-bold uppercase tracking-wide">Services</span>
                                </Link>
                                {/* Hover Bridge */}
                                {isServicesHovered && <div className="absolute bottom-full left-0 w-full h-6 bg-transparent" />}
                            </div>

                            {/* Blog */}
                            <Link href="#blog" className={cn(
                                "px-4 py-2 rounded-xl flex items-center gap-2 transition-all duration-300",
                                activeSection === "Blog" ? "bg-black text-white shadow-md" : "text-gray-500 hover:text-black hover:bg-white/40"
                            )}>
                                <MessageSquare size={16} strokeWidth={2.5} />
                                <span className="text-xs font-bold uppercase tracking-wide">Blog</span>
                            </Link>

                            {/* Projects */}
                            <Link href="#casestudies" className={cn(
                                "px-4 py-2 rounded-xl flex items-center gap-2 transition-all duration-300",
                                activeSection === "Projects" ? "bg-black text-white shadow-md" : "text-gray-500 hover:text-black hover:bg-white/40"
                            )}>
                                <LayoutGrid size={16} strokeWidth={2.5} />
                                <span className="text-xs font-bold uppercase tracking-wide">Projects</span>
                            </Link>

                            {/* More (Click Trigger -> Full Page) */}
                            <button
                                onClick={() => setIsMobileMenuOpen(true)}
                                className={cn(
                                    "px-4 py-2 rounded-xl flex items-center gap-2 transition-all duration-300 cursor-pointer",
                                    isMobileMenuOpen ? "bg-black text-white shadow-md" : "text-gray-500 hover:text-black hover:bg-white/40"
                                )}
                            >
                                <Menu size={16} strokeWidth={2.5} />
                                <span className="text-xs font-bold uppercase tracking-wide">More</span>
                            </button>

                            {/* Spacer / Divider */}
                            <div className="w-px h-6 bg-gray-200 mx-1"></div>

                            {/* CTA Button (Right) */}
                            <div className="px-1">
                                <Link href="#contact" className="group relative inline-flex items-center justify-center gap-1.5 px-5 py-2.5 text-xs font-extrabold text-white uppercase tracking-wider
                                    bg-gradient-to-r from-[#ff4a01] to-[#ff7e3c] rounded-xl
                                    border border-white/20 shadow-sm
                                    hover:to-[#ff5e1e] hover:scale-105 transition-all
                                ">
                                    Start Project
                                    <ArrowRight size={12} strokeWidth={3} className="group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                            </div>
                        </div>


                    </div>
                </div>
            </div>

            {/* 
             * MOBILE NAVBAR - REWRITTEN & SEPARATED (ROOT LEVEL)
             * Style: Floating Dock (Style 2)
             * Features: Solid White, High Contrast, Dot Indicators, Centered
             */}
            <div className="md:hidden fixed z-[999] bottom-0 left-0 w-full h-[80px] bg-white rounded-t-[24px] shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.1)] border-t border-gray-100 flex items-center justify-between px-8 pointer-events-auto pb-2">

                {/* WORK - Standard Icon + Dot */}
                <Link href="#casestudies" onClick={() => setActiveSection("Projects")} className="relative flex flex-col items-center justify-center w-12 h-12">
                    <LayoutGrid
                        size={24}
                        className={cn("transition-colors duration-300", activeSection === "Projects" ? "text-black" : "text-gray-400")}
                        strokeWidth={activeSection === "Projects" ? 2.5 : 2}
                    />
                    {activeSection === "Projects" && (
                        <motion.div layoutId="mobile-nav-dot" className="absolute -bottom-1 w-1.5 h-1.5 bg-[#ff4a01] rounded-full" />
                    )}
                </Link>

                {/* SERVICES - Standard Icon + Dot */}
                <Link href="#whatwedo" onClick={() => setActiveSection("Services")} className="relative flex flex-col items-center justify-center w-12 h-12">
                    <Briefcase
                        size={24}
                        className={cn("transition-colors duration-300", activeSection === "Services" ? "text-black" : "text-gray-400")}
                        strokeWidth={activeSection === "Services" ? 2.5 : 2}
                    />
                    {activeSection === "Services" && (
                        <motion.div layoutId="mobile-nav-dot" className="absolute -bottom-1 w-1.5 h-1.5 bg-[#ff4a01] rounded-full" />
                    )}
                </Link>

                {/* CONTACT - Featured/Prominent Button */}
                <div className="relative -top-6">
                    <Link
                        href="#contact"
                        onClick={() => setActiveSection("Contact")}
                        className={cn(
                            "flex items-center justify-center w-16 h-16 rounded-full shadow-xl transition-transform duration-300",
                            "bg-gradient-to-tr from-[#ff4a01] to-[#ff7e3c] text-white border-4 border-white"
                        )}
                    >
                        <MessageSquare size={24} fill="white" strokeWidth={2.5} />
                    </Link>
                </div>

                {/* RESOURCES/BLOG - Standard Icon + Dot */}
                <Link href="#blog" onClick={() => setActiveSection("Blog")} className="relative flex flex-col items-center justify-center w-12 h-12">
                    <Sparkles
                        size={24}
                        className={cn("transition-colors duration-300", activeSection === "Blog" ? "text-black" : "text-gray-400")}
                        strokeWidth={activeSection === "Blog" ? 2.5 : 2}
                    />
                    {activeSection === "Blog" && (
                        <motion.div layoutId="mobile-nav-dot" className="absolute -bottom-1 w-1.5 h-1.5 bg-[#ff4a01] rounded-full" />
                    )}
                </Link>

                {/* MENU - Trigger */}
                <button onClick={() => setIsMobileMenuOpen(true)} className="relative flex flex-col items-center justify-center w-12 h-12 text-gray-400 active:scale-95 transition-transform">
                    <Menu size={24} strokeWidth={2} />
                </button>

            </div>

            {/* FULL SCREEN MOBILE MENU */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-white/95 backdrop-blur-3xl flex flex-col items-center justify-center"
                    >
                        <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full">
                            <ChevronRight size={24} className="rotate-90" />
                        </button>
                        <div className="flex flex-col gap-6 text-center">
                            <Link href="#hero" onClick={() => setIsMobileMenuOpen(false)} className="text-4xl font-black tracking-tighter hover:text-[#ff4a01]">HOME</Link>
                            <Link href="#whatwedo" onClick={() => setIsMobileMenuOpen(false)} className="text-4xl font-black tracking-tighter hover:text-[#ff4a01]">SERVICES</Link>
                            <Link href="#casestudies" onClick={() => setIsMobileMenuOpen(false)} className="text-4xl font-black tracking-tighter hover:text-[#ff4a01]">PROJECTS</Link>
                            <Link href="#blog" onClick={() => setIsMobileMenuOpen(false)} className="text-4xl font-black tracking-tighter hover:text-[#ff4a01]">BLOG</Link>
                            <Link href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-4xl font-black tracking-tighter text-[#ff4a01]">LET'S TALK</Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
