"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

export default function CaseStudies({ data }: { data?: any[] }) {
    const defaultStudies = [
        {
            title: "Luxe Apparel",
            category: "E-Commerce Growth",
            description: "Scalability achieved through data-driven ad creative strategy. 8.5x ROAS sustained over 12 months.",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1600&h=1200",
            result: "8.5x ROAS"
        },
        {
            title: "TaskFlow Systems",
            category: "SaaS Acquisition",
            description: "Automated user acquisition funnel. Total reduction in customer acquisition cost (CAC) by 42%.",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1600&h=1200",
            result: "-42% CAC"
        },
        {
            title: "Urban Estates",
            category: "Real Estate Leads",
            description: "High-intent lead generation system. 450+ qualified prospects generated monthly with zero ad waste.",
            image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1600&h=1200",
            result: "450+ Leads"
        }
    ];

    const studies = data && data.length > 0 ? data : defaultStudies;

    return (
        <section className="bg-white relative z-10" id="portfolio">

            {/* Elegant, Restrained Header */}
            <div className="bg-white py-20 lg:py-28 border-b border-gray-50">
                <div className="container mx-auto px-6 lg:px-20 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="flex flex-col gap-4"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-px bg-[#FF6A00]/50" />
                            <span className="text-[10px] font-black tracking-[0.25em] text-[#FF6A00] uppercase font-outfit">Selected Work</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1A1A1A] tracking-tighter uppercase leading-[0.9] font-outfit max-w-2xl">
                            Defining <span className="font-playfair italic font-black text-gray-300 lowercase">Impact.</span>
                        </h2>
                    </motion.div>
                </div>
            </div>

            {/* Premium Editorial Style List */}
            <div className="flex flex-col">
                {studies.map((study, index) => (
                    <CaseStudySection
                        key={index}
                        study={study}
                        index={index}
                        total={studies.length}
                    />
                ))}
            </div>

            {/* Bottom Final Archive Link */}
            <div className="py-20 lg:py-24 bg-white flex flex-col items-center justify-center border-t border-gray-50">
                <p className="text-[10px] font-black text-[#1A1A1A]/30 uppercase tracking-[0.4em] mb-8 font-outfit">Want to see more?</p>
                <button className="group relative px-8 py-4 lg:px-10 lg:py-5 bg-black text-white rounded-full font-black text-[10px] lg:text-xs uppercase tracking-[0.2em] font-outfit transition-all duration-300 hover:bg-[#FF6A00] shadow-sm hover:shadow-xl hover:-translate-y-1">
                    <span className="relative flex items-center gap-3">
                        EXPLORE FULL ARCHIVE
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white text-white group-hover:text-[#FF6A00] transition-colors">
                            <ArrowUpRight className="w-3 h-3" />
                        </div>
                    </span>
                </button>
            </div>

        </section>
    );
}

const CaseStudySection = ({ study, index, total }: { study: any, index: number, total: number }) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start']
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const yContent = useTransform(smoothProgress, [0, 1], ["5%", "-5%"]);
    const isEven = index % 2 === 0;

    return (
        <div ref={containerRef} className="py-20 lg:py-0 lg:h-[85vh] w-full relative flex items-center bg-white border-b border-gray-50 overflow-hidden group">

            <div className="container mx-auto px-6 lg:px-20 h-full flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">

                {/* Image Section - Elegant Panel */}
                <div className={`w-full lg:w-[50%] h-[320px] md:h-[450px] lg:h-[70%] relative order-1 z-10 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="w-full h-full relative"
                    >
                        <div className="absolute inset-0 rounded-[24px] md:rounded-[40px] overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-gray-100 bg-gray-50">
                            <Image
                                src={study.image}
                                alt={study.title}
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            {/* Subtle Overlay to integrate smoothly */}
                            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500"></div>
                        </div>

                        {/* Refined Floating Badge - Smaller, more sophisticated */}
                        {study.result && (
                            <div className={`absolute -bottom-6 ${isEven ? 'left-6 md:-left-8' : 'right-6 md:-right-8'} z-20 bg-white/95 backdrop-blur-xl border border-white p-5 md:p-6 rounded-[24px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] flex flex-col transition-transform duration-500 group-hover:-translate-y-2`}>
                                <div className="flex items-center gap-1.5 mb-1.5">
                                    <Sparkles className="w-3 h-3 text-[#FF6A00]" />
                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Impact</span>
                                </div>
                                <span className="text-2xl md:text-3xl font-black font-outfit uppercase tracking-tighter text-[#1A1A1A] leading-none">{study.result}</span>
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* Text Content - Premium Editorial Approach */}
                <motion.div
                    style={{ y: yContent }}
                    className={`w-full lg:w-[40%] flex flex-col gap-6 order-2 z-20 pt-4 lg:pt-0 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
                >
                    <div className="flex flex-col gap-4">
                        <div className="inline-flex">
                            <span className="text-[10px] font-black text-[#FF6A00] uppercase tracking-[0.2em] font-outfit bg-orange-50 px-3 py-1.5 rounded-full border border-orange-100/50">
                                {study.category}
                            </span>
                        </div>

                        {/* Reduced heading sizes for an elegant, less intrusive feel */}
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#1A1A1A] uppercase tracking-tighter font-outfit leading-[1.05]">
                            {study.title}
                        </h3>
                    </div>

                    <p className="text-gray-500 text-base md:text-lg font-medium font-playfair italic leading-relaxed max-w-md">
                        {study.description || study.desc}
                    </p>

                    <div className="flex items-center justify-between pt-6 mt-2 border-t border-gray-100 w-full max-w-sm">
                        <button className="group/btn flex items-center gap-3 text-[#1A1A1A] hover:text-[#FF6A00] transition-colors">
                            <span className="font-black text-[10px] uppercase tracking-[0.15em]">Explore Case</span>
                            <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center group-hover/btn:border-[#FF6A00] group-hover/btn:bg-orange-50 transition-all">
                                <ArrowUpRight className="w-3 h-3" />
                            </div>
                        </button>

                        <div className="flex items-center gap-1.5 text-gray-300 select-none">
                            <span className="text-sm font-black text-[#1A1A1A] font-outfit">0{index + 1}</span>
                            <span className="text-xs">/</span>
                            <span className="text-[10px] font-black font-outfit">0{total}</span>
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
};
