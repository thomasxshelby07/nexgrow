"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Services({
    data,
    title = "Our *Services*",
    subtitle = "Proprietary Core Infrastructure."
}: {
    data?: any[],
    title?: string,
    subtitle?: string
}) {
    const defaultServices = [
        {
            title: "Expert Video Editing",
            images: [
                "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=600&h=400"
            ],
            link: "#contact",
            features: ["4K Rendering", "Color Grading", "Motion Graphics"]
        }
    ];

    const services = Array.isArray(data) && data.length > 0 ? data : defaultServices;
    const [selectedService, setSelectedService] = useState(services[0]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (Array.isArray(data) && data.length > 0) {
            setSelectedService(data[0]);
        }
    }, [data]);

    // Close dropdown on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const fallbackImages = [
        "https://images.unsplash.com/photo-1626379616459-b2ce1d9decbb?auto=format&fit=crop&q=80&w=600&h=400",
        "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=600&h=400",
        "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=600&h=400"
    ];

    const allImages = Array.isArray(selectedService?.images) && selectedService.images.length > 0
        ? selectedService.images
        : fallbackImages;

    const leftImages = allImages.filter((_: any, i: number) => i % 2 === 0);
    const rightImages = allImages.filter((_: any, i: number) => i % 2 !== 0);

    const columnA = leftImages.length > 0 ? leftImages : allImages;
    const columnB = rightImages.length > 0 ? rightImages : allImages;

    // Helper to render text with *Italic*
    const renderTitle = (text: string) => {
        const parts = text.split(/(\*.*?\*)/g);
        return parts.map((part, i) => {
            if (part.startsWith('*') && part.endsWith('*')) {
                return <span key={i} className="font-playfair italic font-bold text-[#ff4a01] lowercase">{part.slice(1, -1)}</span>;
            }
            return <span key={i}>{part}</span>;
        });
    };

    return (
        <section className="relative w-full min-h-[85vh] flex items-center justify-center bg-[#FAFAFA] py-12 lg:py-20 overflow-hidden" id="services">
            {/* Premium Background Image Layer */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="wait">
                    {(selectedService?.bgImage || allImages[0]) && (
                        <motion.div
                            key={`bg-service-${selectedService?.title}`}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 0.15, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="absolute inset-0 select-none pointer-events-none"
                            style={{
                                backgroundImage: `url(${selectedService?.bgImage || allImages[0]})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                filter: 'grayscale(20%) contrast(105%) blur(4px)'
                            }}
                        />
                    )}
                </AnimatePresence>
                {/* Subtle Overlays */}
                <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"></div>
            </div>

            <div className="container relative z-10 mx-auto px-4 lg:px-6 flex flex-col items-center">
                {/* Minimal Header */}
                <div className="w-full max-w-7xl mx-auto mb-10 text-center space-y-4">
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-black tracking-tighter uppercase leading-none">
                        {renderTitle(title)}
                    </h2>
                    <p className="text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-[0.3em] opacity-60">
                        {subtitle}
                    </p>
                </div>

                {/* Mobile Dropdown Selector - Sharp */}
                <div className="lg:hidden w-full mb-6 relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full bg-white border border-gray-100 p-4 flex items-center justify-between text-[11px] font-black uppercase tracking-widest rounded-none shadow-sm"
                    >
                        <span>{selectedService?.title || "Select Service"}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute top-full left-0 right-0 z-50 bg-white border border-t-0 border-gray-100 shadow-2xl rounded-none py-2 animate-in fade-in slide-in-from-top-2">
                            {services.map((service, i) => (
                                <button
                                    key={i}
                                    onClick={() => {
                                        setSelectedService(service);
                                        setIsDropdownOpen(false);
                                    }}
                                    className={`w-full text-left px-5 py-3 text-[11px] font-black uppercase tracking-widest transition-colors
                                        ${selectedService?.title === service.title ? "text-[#ff4a01] bg-gray-50" : "text-gray-400 hover:bg-gray-50/50"}`}
                                >
                                    {service.title}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Main Card Container - Wide Desktop */}
                <div className="relative w-full max-w-7xl flex flex-col lg:flex-row bg-white border border-gray-100 rounded-none shadow-[0_30px_60px_-15px_rgba(0,0,0,0.03)] overflow-hidden h-auto lg:h-[650px]">

                    {/* Desktop Sidebar - Sharp */}
                    <div className="hidden lg:flex w-full lg:w-[28%] h-full flex-col bg-white border-r border-gray-50">
                        <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/10">
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Inventory</span>
                            <span className="text-[10px] font-mono text-gray-300">MOD_{services.length}</span>
                        </div>
                        <div className="flex-1 overflow-y-auto thin-scrollbar p-0">
                            {services.map((service, i) => {
                                const isSelected = selectedService?.title === service.title;
                                return (
                                    <div key={i}
                                        onClick={() => { setSelectedService(service); window.location.href = service.link || "#"; }}
                                        onMouseEnter={() => setSelectedService(service)}
                                        className={`group/item flex items-center justify-between px-8 py-4.5 cursor-pointer transition-all duration-200 border-b border-gray-50/50 last:border-0 rounded-none
                                            ${isSelected ? "bg-gray-50" : "hover:bg-gray-50/30"}`}>
                                        <span className={`text-[13px] font-black tracking-tight transition-colors duration-200
                                            ${isSelected ? "text-black" : "text-gray-300 group-hover/item:text-black"}`}>
                                            {service.title}
                                        </span>
                                        <ArrowUpRight className={`w-4 h-4 transition-all duration-200 
                                            ${isSelected ? "text-[#ff4a01] opacity-100" : "text-gray-200 opacity-0"}`} />
                                    </div>
                                );
                            })}
                        </div>
                        <div className="p-6 bg-white mt-auto border-t border-gray-50 flex items-center justify-center">
                            <Link href="/services" className="relative group w-full h-14 flex items-center justify-center gap-3 bg-black text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-none overflow-hidden shadow-xl">
                                {/* Slide-fill background */}
                                <div className="absolute inset-0 w-0 bg-[#ff4a01] transition-all duration-500 ease-out group-hover:w-full" />

                                <span className="relative z-10">VIEW ALL SERVICES</span>
                                <ArrowUpRight className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
                            </Link>
                        </div>
                    </div>

                    {/* Showcase - MINIMAL GAPS */}
                    <div className="w-full lg:w-[72%] h-[400px] lg:h-full relative overflow-hidden bg-white">
                        <div className="grid grid-cols-2 gap-2 lg:gap-3 h-[120%] -mt-[5%] -ml-[5%] w-[110%] rotate-[-3deg] scale-105 origin-center">
                            <div className="relative h-full overflow-hidden">
                                <div className="flex flex-col gap-2 lg:gap-3 animate-scroll-vertical-up">
                                    {(columnA.length > 0 ? columnA.concat(columnA).concat(columnA) : fallbackImages).map((img: string, i: number) => (
                                        <ImageCard key={`up-${i}`} src={img} alt="Showcase" features={selectedService?.features} link={selectedService?.link} />
                                    ))}
                                </div>
                            </div>
                            <div className="relative h-full overflow-hidden pt-32">
                                <div className="flex flex-col gap-2 lg:gap-3 animate-scroll-vertical-down">
                                    {(columnB.length > 0 ? columnB.concat(columnB).concat(columnB) : fallbackImages).map((img: string, i: number) => (
                                        <ImageCard key={`down-${i}`} src={img} alt="Showcase" features={selectedService?.features} link={selectedService?.link} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Mobile Action Button */}
                        <div className="lg:hidden absolute inset-x-0 bottom-6 flex justify-center z-10 px-8">
                            <button
                                onClick={() => window.location.href = selectedService?.link || "#"}
                                className="relative group w-full h-14 flex items-center justify-center gap-3 bg-black text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-none overflow-hidden shadow-2xl"
                            >
                                {/* Slide-fill background */}
                                <div className="absolute inset-0 w-0 bg-[#ff4a01] transition-all duration-500 ease-out group-hover:w-full" />

                                <span className="relative z-10 uppercase font-black tracking-[0.3em]">VIEW SERVICE</span>
                                <ArrowUpRight className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const ImageCard = ({ src, alt, features, link }: { src: string; alt: string; features?: string[]; link?: string }) => {
    // Only show features if they exist and are not empty
    const validFeatures = Array.isArray(features) ? features.filter(f => f.trim() !== "") : [];

    return (
        <div
            onClick={() => link && (window.location.href = link)}
            className="relative w-full h-[250px] md:h-[300px] lg:h-[350px] shrink-0 overflow-hidden bg-white border border-gray-100 rounded-none transition-all duration-700 hover:brightness-90 cursor-pointer shadow-sm group/card"
        >
            <Image
                src={src || "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=600&h=400"}
                alt={alt}
                fill
                className="object-cover transition-transform duration-1000 group-hover/card:scale-110 opacity-95 group-hover/card:opacity-100"
                sizes="(max-width: 768px) 50vw, 40vw"
                priority={false}
            />

            {/* Always visible gradient for text */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100"></div>

            <div className="absolute bottom-8 left-0 right-0 z-10 flex flex-col items-center justify-center text-center px-4">
                <div className="flex flex-wrap justify-center gap-x-3 gap-y-1">
                    {validFeatures.length > 0 ? (
                        validFeatures.map((f, idx) => (
                            <span key={idx} className="text-[11px] lg:text-[11px] font-black text-white uppercase tracking-tight opacity-95">
                                {f}{idx < validFeatures.length - 1 && <span className="mx-2 text-white/40 font-normal">/</span>}
                            </span>
                        ))
                    ) : null}
                </div>
            </div>

            {/* Float Arrow */}
            <div className="absolute top-6 right-6 opacity-40 group-hover/card:opacity-100 transition-opacity">
                <ArrowUpRight className="w-4 h-4 text-white" />
            </div>
        </div>
    );
};
