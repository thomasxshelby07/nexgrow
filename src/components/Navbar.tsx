"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Briefcase, Menu, LayoutGrid, MessageSquare, Home, Sparkles, ArrowRight, ChevronRight, User, Film } from "lucide-react";
import { AnimatePresence, motion, Variants } from "framer-motion";

// Service Data
const services = [
    { id: "01", title: "Strategy", icon: User, desc: "Align growth.", href: "#whatwedo" },
    { id: "02", title: "UI/UX", icon: LayoutGrid, desc: "Design value.", href: "#whatwedo" },
    { id: "03", title: "Website", icon: Home, desc: "Fast apps.", href: "#whatwedo" },
    { id: "04", title: "Mobile App", icon: Briefcase, desc: "iOS & Android.", href: "#whatwedo" },
    { id: "05", title: "Video Editing", icon: Film, desc: "Viral assets.", href: "/" },
];

// Animation Variants
const menuVariants: Variants = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: "easeOut" } },
    exit: { opacity: 0, y: 10, scale: 0.95, transition: { duration: 0.15 } }
};

export default function Navbar({ data }: { data?: any }) {
    const [activeSection, setActiveSection] = useState("Home");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isServicesHovered, setIsServicesHovered] = useState(false);

    const cta = data?.ctaGlobal || { text: "Start Project", link: "#contact" };

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

    const navItems = [
        { name: "Home", href: "/" },
        { name: "Blog", href: "#blog" },
        { name: "Projects", href: "#casestudies" },
    ];

    return (
        <>
            {/* FLOATING BOTTOM DOCK - REVERTED */}
            <div className="fixed z-50 bottom-0 left-0 w-full md:bottom-6 md:left-1/2 md:-translate-x-1/2 md:w-auto md:max-w-fit pointer-events-none">
                <div className="relative pointer-events-auto flex flex-col items-center">

                    {/* MEGA MENU POPOVER */}
                    <AnimatePresence>
                        {isServicesHovered && (
                            <motion.div
                                variants={menuVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                onMouseEnter={() => setIsServicesHovered(true)}
                                onMouseLeave={() => setIsServicesHovered(false)}
                                className="absolute bottom-full mb-4 w-[90vw] md:w-[500px] p-2"
                            >
                                <div className="bg-white/80 backdrop-blur-3xl rounded-[32px] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/50">
                                    <div className="grid grid-cols-2 gap-2">
                                        {services.map((s) => (
                                            <Link key={s.id} href={s.href} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/60 transition-all group">
                                                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-[#ff4a01]/10 transition-colors">
                                                    <s.icon size={18} className="text-gray-600 group-hover:text-[#ff4a01]" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-black text-gray-900">{s.title}</span>
                                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{s.desc}</span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                    <Link href="#whatwedo" className="mt-2 flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl hover:bg-[#ff4a01]/5 group transition-all">
                                        <span className="text-xs font-black text-gray-900 group-hover:text-[#ff4a01]">Explore All Core Capabilities</span>
                                        <ArrowRight size={16} className="text-gray-400 group-hover:text-[#ff4a01] group-hover:translate-x-1 transition-all" />
                                    </Link>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* BAR CONTAINER */}
                    <div className="hidden md:flex items-center justify-center gap-1 p-1.5 bg-white/80 backdrop-blur-3xl rounded-[24px] border border-white/40 shadow-[0_15px_35px_rgba(0,0,0,0.1)] ring-1 ring-black/5">
                        {navItems.map((item) => (
                            <Link key={item.name} href={item.href} className={cn(
                                "px-5 py-2.5 rounded-[18px] text-[11px] font-black uppercase tracking-widest transition-all duration-300",
                                activeSection === item.name ? "bg-black text-white shadow-lg" : "text-gray-500 hover:text-black hover:bg-white/50"
                            )}>
                                {item.name}
                            </Link>
                        ))}

                        {/* Services Trigger */}
                        <button
                            onMouseEnter={() => setIsServicesHovered(true)}
                            onMouseLeave={() => setIsServicesHovered(false)}
                            className={cn(
                                "px-5 py-2.5 rounded-[18px] text-[11px] font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-1.5",
                                isServicesHovered ? "bg-black text-white shadow-lg" : "text-gray-500 hover:text-black hover:bg-white/50"
                            )}
                        >
                            Services
                        </button>

                        <div className="w-px h-6 bg-gray-200 mx-2" />

                        <Link href={cta.link} className="group flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#ff4a01] to-[#ff7e3c] text-white rounded-[18px] text-[11px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-md active:scale-95">
                            {cta.text}
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* MOBILE NAVBAR - BOTTOM DOCK */}
            <div className="md:hidden fixed z-[999] bottom-0 left-0 w-full h-[80px] bg-white rounded-t-[28px] shadow-[0_-8px_32px_rgba(0,0,0,0.08)] border-t border-gray-50 flex items-center justify-around px-6 pb-2">
                <Link href="/" onClick={() => setActiveSection("Home")} className="p-3">
                    <Home size={24} className={activeSection === "Home" ? "text-black" : "text-gray-300"} />
                </Link>
                <Link href="#casestudies" onClick={() => setActiveSection("Projects")} className="p-3">
                    <LayoutGrid size={24} className={activeSection === "Projects" ? "text-black" : "text-gray-300"} />
                </Link>
                <div className="relative -top-6">
                    <Link href="#contact" className="w-16 h-16 bg-[#ff4a01] rounded-full flex items-center justify-center text-white shadow-xl shadow-orange-500/20 border-4 border-white">
                        <MessageSquare size={24} fill="white" />
                    </Link>
                </div>
                <Link href="#blog" onClick={() => setActiveSection("Blog")} className="p-3">
                    <Sparkles size={24} className={activeSection === "Blog" ? "text-black" : "text-gray-300"} />
                </Link>
                <button onClick={() => setIsMobileMenuOpen(true)} className="p-3 text-gray-300">
                    <Menu size={24} />
                </button>
            </div>

            {/* MOBILE MENU OVERLAY */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed inset-0 z-[1000] bg-white flex flex-col p-8"
                    >
                        <div className="flex items-center justify-between mb-12">
                            <img src="/logo.png" alt="Logo" className="w-[100px] object-contain" />
                            <button onClick={() => setIsMobileMenuOpen(false)} className="p-3 bg-gray-100 rounded-full">
                                <ChevronRight size={24} className="rotate-90 text-gray-900" />
                            </button>
                        </div>
                        <div className="flex flex-col gap-6">
                            {["HOME", "BLOG", "SERVICES", "PROJECTS"].map((item) => (
                                <Link
                                    key={item}
                                    href={item === "HOME" ? "/" : `#${item.toLowerCase()}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-5xl font-black tracking-tighter hover:text-[#ff4a01] transition-colors"
                                >
                                    {item}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
