"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="relative bg-[#050505] text-white pt-20 pb-4 overflow-hidden min-h-[60vh] flex flex-col justify-between">

            {/* 1. Top Bar: Legal & Copyright (Clean Layout) */}
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-medium uppercase tracking-widest z-50 relative gap-4">
                <div className="flex gap-6">
                    <Link href="#" className="hover:text-white transition-colors">Terms & Conditions</Link>
                    <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                </div>
                <div className="text-center md:text-right">© {new Date().getFullYear()} NexGrow Inc.</div>
            </div>

            {/* 2. Main Center Content (Spacer) */}
            <div className="flex-grow"></div>

            {/* 3. Massive Brand Text with Motion Blur Effect */}
            <div className="w-full relative flex items-end justify-center mt-10 md:mt-0 z-0">

                {/* The Text - High Contrast & Visible */}
                <h1 className="text-[18vw] md:text-[22vw] font-black text-center leading-[0.8] tracking-tighter text-[#222] select-none pointer-events-none blur-[2px] opacity-100 mix-blend-normal">
                    NEXGROW.
                </h1>

                {/* Motion Blur / Scanline Overlay */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#050505] via-transparent to-transparent h-full w-full pointer-events-none"></div>

                {/* Horizontal Motion Lines (The "Speed" Effect) */}
                <div className="absolute inset-0 z-10 opacity-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#ff4a01]/10 to-transparent blur-[120px] pointer-events-none z-10"></div>

                {/* Scanlines */}
                <div className="absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(to_bottom,transparent_4px,#000_5px)] bg-[size:100%_6px] opacity-20"></div>

            </div>

            {/* 4. Bottom Right: Back to Top Only (No Dock) */}
            <div className="absolute bottom-8 right-6 z-50">
                <button
                    onClick={scrollToTop}
                    className="bg-white/10 hover:bg-[#ff4a01] hover:text-white text-gray-400 p-3 rounded-full transition-all duration-300 backdrop-blur-md border border-white/5 shadow-2xl"
                    aria-label="Back to Top"
                >
                    <ArrowUp size={20} />
                </button>
            </div>

        </footer>
    );
}
