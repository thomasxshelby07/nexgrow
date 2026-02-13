"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useSpring, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRight, Linkedin, Instagram, Facebook } from "lucide-react";

// --- Components ---

const FlipLink = ({ children, href, isActive }: { children: string; href: string, isActive: boolean }) => {
    return (
        <Link
            href={href}
            className={cn(
                "relative block overflow-hidden whitespace-nowrap text-sm font-bold uppercase tracking-wider transition-colors",
                isActive ? "text-[#ff4a01]" : "text-white/90 hover:text-white"
            )}
            style={{ lineHeight: 1.2 }}
        >
            <motion.div
                initial="initial"
                whileHover="hovered"
                className="relative block"
            >
                <motion.span
                    variants={{
                        initial: { y: 0 },
                        hovered: { y: "-100%" },
                    }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="block"
                >
                    {children}
                </motion.span>
                <motion.span
                    variants={{
                        initial: { y: "100%" },
                        hovered: { y: 0 },
                    }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="absolute inset-0 block text-[#ff4a01]"
                >
                    {children}
                </motion.span>
            </motion.div>
            {isActive && (
                <motion.div
                    layoutId="active-nav-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff4a01]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                />
            )}
        </Link>
    );
};

const MagneticButton = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x, { mass: 0.1, stiffness: 150, damping: 12 });
    const ySpring = useSpring(y, { mass: 0.1, stiffness: 150, damping: 12 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current!.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        x.set(middleX * 0.15); // Factor controls strength
        y.set(middleY * 0.15);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: xSpring, y: ySpring }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

const MenuToggle = ({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) => (
    <button onClick={toggle} className="relative z-50 p-2 focus:outline-none">
        <svg width="28" height="28" viewBox="0 0 23 23">
            <motion.path
                strokeWidth="3"
                stroke="white"
                strokeLinecap="round"
                variants={{
                    closed: { d: "M 2 2.5 L 20 2.5" },
                    open: { d: "M 3 16.5 L 17 2.5" },
                }}
                initial="closed"
                animate={isOpen ? "open" : "closed"}
            />
            <motion.path
                strokeWidth="3"
                stroke="white"
                strokeLinecap="round"
                d="M 2 9.423 L 20 9.423"
                variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 },
                }}
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                transition={{ duration: 0.1 }}
            />
            <motion.path
                strokeWidth="3"
                stroke="white"
                strokeLinecap="round"
                variants={{
                    closed: { d: "M 2 16.346 L 20 16.346" },
                    open: { d: "M 3 2.5 L 17 16.346" },
                }}
                initial="closed"
                animate={isOpen ? "open" : "closed"}
            />
        </svg>
    </button>
);

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [activeSection, setActiveSection] = useState("Home");
    const { scrollY } = useScroll();
    const lastScrollY = useRef(0);

    // Smart Scroll Logic
    useMotionValueEvent(scrollY, "change", (latest) => {
        const diff = latest - lastScrollY.current;
        if (latest > 100 && diff > 0) {
            setIsHidden(true);
        } else if (diff < 0) {
            setIsHidden(false);
        }
        lastScrollY.current = latest;
        setIsScrolled(latest > 50);
    });

    // Active Section Logic (Intersection Observer)
    useEffect(() => {
        const sections = document.querySelectorAll("section[id]");
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute("id");
                    if (id) {
                        // Capitalize first letter for display matching
                        const name = id.charAt(0).toUpperCase() + id.slice(1);
                        setActiveSection(name === "Hero" ? "Home" : name);
                    }
                }
            });
        }, { threshold: 0.5 }); // Trigger when 50% visible

        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    // Lock body scroll
    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    }, [isMobileMenuOpen]);

    const navLinks = [
        { name: "Home", href: "#hero" },
        { name: "Services", href: "#whatwedo" },
        { name: "Why Us", href: "#whychooseus" },
        { name: "Process", href: "#process" },
        { name: "Comparison", href: "#comparison" },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{
                    y: isHidden ? -100 : 0,
                    opacity: 1
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={cn(
                    "fixed z-50 transition-all duration-500 ease-in-out flex items-center justify-between px-6",
                    isScrolled
                        ? "top-4 left-1/2 -translate-x-1/2 w-[98%] max-w-7xl rounded-2xl bg-black/70 backdrop-blur-xl backdrop-saturate-150 border border-white/10 shadow-[0_0_30px_rgba(255,74,1,0.15)] py-2" // Reduced height (py-2), Increased width (max-w-7xl, w-98%)
                        : "top-0 left-0 right-0 w-full bg-transparent border-transparent py-4"
                )}
            >
                {/* Noise Texture Overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-[1]"
                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}
                />

                {/* Border Shine for Scrolled State */}
                {isScrolled && (
                    <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none -z-10">
                        <div className="absolute inset-0 rounded-2xl border border-white/10" />
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-[50%] h-full -skew-x-12"
                            animate={{ x: ["-100%", "200%"] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                        />
                    </div>
                )}

                {/* Logo Section */}
                <Link href="/" className="relative z-50 flex items-center gap-2 group">
                    <div className="text-2xl font-bold tracking-tighter text-white">
                        NEX
                        <span className="text-[#ff4a01] inline-block transition-transform duration-500 group-hover:rotate-[360deg] group-hover:scale-110">
                            GROW
                        </span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8 relative z-50">
                    {navLinks.map((link) => (
                        <FlipLink
                            key={link.name}
                            href={link.href}
                            isActive={activeSection === link.name}
                        >
                            {link.name}
                        </FlipLink>
                    ))}
                </div>

                {/* Desktop CTA */}
                <div className="hidden md:flex items-center gap-4 relative z-50">
                    <MagneticButton>
                        <Link
                            href="/contact"
                            className="group relative px-6 py-2.5 rounded-full bg-white text-black font-semibold text-sm overflow-hidden hover:bg-[#ff4a01] hover:text-white transition-colors duration-300 flex items-center gap-2"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Lets Talk
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </span>
                        </Link>
                    </MagneticButton>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden flex items-center z-50 relative">
                    <MenuToggle isOpen={isMobileMenuOpen} toggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl flex flex-col justify-center items-center"
                    >
                        {/* Noise Texture Overlay for Mobile Menu */}
                        <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-[1]"
                            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}
                        />

                        {/* Background Decoration */}
                        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                            <div className="absolute -top-[20%] -right-[20%] w-[600px] h-[600px] bg-[#ff4a01]/20 rounded-full blur-[100px]" />
                            <div className="absolute -bottom-[20%] -left-[20%] w-[600px] h-[600px] bg-[#ff4a01]/10 rounded-full blur-[100px]" />
                        </div>

                        <div className="flex flex-col h-full justify-between py-24 px-6 w-full max-w-md mx-auto relative z-20">
                            <motion.div
                                initial="initial"
                                animate="open"
                                exit="initial"
                                variants={{
                                    initial: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
                                    open: { transition: { delayChildren: 0.2, staggerChildren: 0.07, staggerDirection: 1 } },
                                }}
                                className="flex flex-col gap-6 items-center justify-center flex-1"
                            >
                                {navLinks.map((link) => (
                                    <div key={link.name} className="overflow-hidden">
                                        <motion.div
                                            variants={{
                                                initial: { y: "100%" },
                                                open: { y: 0, transition: { duration: 0.5, ease: [0.37, 0, 0.63, 1] } },
                                            }}
                                        >
                                            <Link
                                                href={link.href}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 hover:to-[#ff4a01] transition-all tracking-tight"
                                            >
                                                {link.name}
                                            </Link>
                                        </motion.div>
                                    </div>
                                ))}
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="flex justify-center gap-8 mt-auto"
                            >
                                <a href="#" className="p-3 rounded-full bg-white/5 hover:bg-[#ff4a01] transition-all text-white">
                                    <Linkedin size={24} />
                                </a>
                                <a href="#" className="p-3 rounded-full bg-white/5 hover:bg-[#ff4a01] transition-all text-white">
                                    <Instagram size={24} />
                                </a>
                                <a href="#" className="p-3 rounded-full bg-white/5 hover:bg-[#ff4a01] transition-all text-white">
                                    <Facebook size={24} />
                                </a>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
