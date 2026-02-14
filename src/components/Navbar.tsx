"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Briefcase, Menu, DollarSign, LayoutGrid, MessageSquare, Home, Sparkles, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
    const [activeSection, setActiveSection] = useState("Home");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        { name: "Services", icon: Briefcase, href: "#whatwedo" },
    ];

    const rightNavItems = [
        { name: "Projects", icon: LayoutGrid, href: "#casestudies" },
        { name: "Process", icon: Sparkles, href: "#process" },
    ];

    return (
        <>
            {/* FLOATING BOTTOM DOCK - Cleaner & Premium */}
            <div className="fixed z-50 bottom-0 left-0 w-full md:bottom-6 md:left-1/2 md:-translate-x-1/2 md:w-auto md:max-w-fit pointer-events-none">

                <div className="relative pointer-events-auto">
                    {/* Premium Glass Container - Refined Padding */}
                    <div className="
                        flex items-center justify-between md:justify-center gap-1 md:gap-2 p-1.5 md:p-1.5
                        bg-[#0a0a0a]/90 backdrop-blur-xl saturate-150
                        rounded-t-[16px] md:rounded-[20px] 
                        border-t md:border border-white/10 
                        shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.5)] md:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)]
                        ring-1 ring-white/5
                    ">

                        {/* Desktop: Centered Nav Items with CTA in Middle */}
                        <div className="hidden md:flex items-center gap-1">

                            {/* Left Group */}
                            {leftNavItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="relative flex items-center justify-center group"
                                >
                                    <div className={cn(
                                        "relative px-4 py-2 rounded-xl flex items-center justify-center gap-2 transition-all duration-300",
                                        activeSection === (item.name === "Home" ? "Home" : item.name)
                                            ? "bg-white/10 text-white shadow-inner shadow-white/5"
                                            : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                                    )}>
                                        <item.icon size={16} strokeWidth={2.5} />
                                        <span className="text-sm font-semibold tracking-wide">{item.name}</span>
                                    </div>
                                </Link>
                            ))}

                            {/* Center CTA Button - Start Project - Animated Border */}
                            <div className="px-1">
                                <Link href="#contact" className="relative inline-flex group">
                                    {/* Animated Border Container */}
                                    <div className="relative inline-flex items-center justify-center p-[2px] overflow-hidden rounded-xl">
                                        <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0000_0%,#ff4a01_50%,#0000_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <span className="absolute inset-[-1000%] bg-gray-700/50 group-hover:opacity-0 transition-opacity duration-300" />

                                        <span className="relative inline-flex items-center justify-center gap-2 px-6 py-2 text-sm font-bold text-white transition-all bg-[#ff4a01] rounded-xl group-hover:bg-[#ff5e1e]">
                                            Start Project
                                            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                                        </span>
                                    </div>
                                </Link>
                            </div>

                            {/* Right Group */}
                            {rightNavItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="relative flex items-center justify-center group"
                                >
                                    <div className={cn(
                                        "relative px-4 py-2 rounded-xl flex items-center justify-center gap-2 transition-all duration-300",
                                        activeSection === item.name
                                            ? "bg-white/10 text-white shadow-inner shadow-white/5"
                                            : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                                    )}>
                                        <item.icon size={16} strokeWidth={2.5} />
                                        <span className="text-sm font-semibold tracking-wide">{item.name}</span>
                                    </div>
                                </Link>
                            ))}

                        </div>

                        {/* Mobile: Premium Bottom Bar Layout - Sticked to bottom - Cleaner */}
                        <div className="flex md:hidden w-full items-center justify-between px-2 pt-1 pb-1">
                            <Link href="#casestudies" className={cn("flex flex-col items-center gap-1 p-2 rounded-xl transition-colors", activeSection === "CaseStudies" ? "bg-white/10 text-white" : "text-gray-500")}>
                                <LayoutGrid size={20} />
                            </Link>
                            <Link href="#whatwedo" className={cn("flex flex-col items-center gap-1 p-2 rounded-xl transition-colors", activeSection === "Services" ? "bg-white/10 text-white" : "text-gray-500")}>
                                <Briefcase size={20} />
                            </Link>

                            {/* Center Floating Action - Mobile - Premium */}
                            <div className="relative -top-6 p-1 rounded-2xl bg-[#0a0a0a] border border-white/10">
                                <Link href="#contact" className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#ff4a01] to-[#ff6b2b] rounded-xl shadow-[0_8px_20px_-6px_rgba(255,74,1,0.6)] text-white hover:scale-105 transition-transform">
                                    <MessageSquare size={20} fill="white" strokeWidth={0} />
                                </Link>
                            </div>

                            <Link href="#process" className={cn("flex flex-col items-center gap-1 p-2 rounded-xl transition-colors", activeSection === "Process" ? "bg-white/10 text-white" : "text-gray-500")}>
                                <DollarSign size={20} />
                            </Link>
                            <button onClick={() => setIsMobileMenuOpen(true)} className="flex flex-col items-center gap-1 p-2 rounded-xl text-gray-500 transition-colors hover:bg-white/5">
                                <Menu size={20} />
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-3xl flex flex-col justify-center items-center text-white"
                    >
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="absolute top-8 right-8 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 18 18" /></svg>
                        </button>

                        <nav className="flex flex-col gap-8 text-center">
                            <Link href="#hero" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-bold hover:text-[#ff4a01] transition-colors">Home</Link>
                            <Link href="#whatwedo" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-bold hover:text-[#ff4a01] transition-colors">Services</Link>
                            <Link href="#casestudies" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-bold hover:text-[#ff4a01] transition-colors">Projects</Link>
                            <Link href="#process" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-bold hover:text-[#ff4a01] transition-colors">Process</Link>

                            <Link href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-bold text-[#ff4a01]">Contact</Link>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
