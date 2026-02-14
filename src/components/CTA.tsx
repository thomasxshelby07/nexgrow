"use client";

import { ArrowRight } from "lucide-react";

export default function CTA() {
    return (
        <section className="bg-white text-black py-32 border-t border-black/5 relative overflow-hidden">

            <div className="container mx-auto px-4 text-center relative z-10">
                <h2 className="text-4xl md:text-6xl font-bold mb-8">
                    Ready to Scale?
                </h2>
                <p className="text-gray-400 text-xl mb-10 max-w-2xl mx-auto">
                    Let's build the future of your business together.
                </p>
                <button className="group relative px-10 py-5 bg-[#ff4a01] text-white font-bold tracking-wider uppercase overflow-hidden hover:bg-[#d43d00] transition-all rounded-sm inline-flex items-center gap-2">
                    Book a Call
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </section>
    );
}
