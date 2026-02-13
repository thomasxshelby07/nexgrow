"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

// Services Data
const services = [
    {
        id: "brand",
        title: "Brand Identity Design",
        images: [
            "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=600&h=400", // 3:2 (Thumbnail/Landscape)
            "https://images.unsplash.com/photo-1626785774573-4b7993143a4d?auto=format&fit=crop&q=80&w=600&h=600", // 1:1 (Square)
            "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=600&h=750", // 4:5 (Insta Portrait)
            "https://images.unsplash.com/photo-1558655146-d09347e0b7a8?auto=format&fit=crop&q=80&w=600&h=400", // Landscape
            "https://images.unsplash.com/photo-1586717791821-3f44a5638d0f?auto=format&fit=crop&q=80&w=600&h=600", // Square
            "https://images.unsplash.com/photo-1634942537034-2531766767d1?auto=format&fit=crop&q=80&w=600&h=750"  // Portrait
        ]
    },
    {
        id: "social",
        title: "Social Media Marketing",
        images: [
            "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=600&h=750",
            "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&q=80&w=600&h=600",
            "https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&q=80&w=600&h=400",
            "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?auto=format&fit=crop&q=80&w=600&h=750",
            "https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&q=80&w=600&h=600",
            "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=600&h=400"
        ]
    },
    {
        id: "ads",
        title: "Performance Ads (Meta & Google)",
        images: [
            "https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&q=80&w=600&h=400",
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600&h=600",
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600&h=750",
            "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&q=80&w=600&h=600",
            "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=600&h=400",
            "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?auto=format&fit=crop&q=80&w=600&h=750"
        ]
    },
    {
        id: "web",
        title: "Website & Landing Page Development",
        images: [
            "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=600&h=750",
            "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600&h=600",
            "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&q=80&w=600&h=400",
            "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&q=80&w=600&h=750",
            "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=600&h=600",
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600&h=400"
        ]
    },
    {
        id: "video",
        title: "Video Editing & Reels Production",
        images: [
            "https://images.unsplash.com/photo-1526370163353-84725355157b?auto=format&fit=crop&q=80&w=600&h=750",
            "https://images.unsplash.com/photo-1574717024231-15b5e7dc0870?auto=format&fit=crop&q=80&w=600&h=400",
            "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=600&h=600",
            "https://images.unsplash.com/photo-1535016120720-40c6874c3b1c?auto=format&fit=crop&q=80&w=600&h=750",
            "https://images.unsplash.com/photo-1574717172404-58548c7731a5?auto=format&fit=crop&q=80&w=600&h=400",
            "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=600&h=600"
        ]
    },
    {
        id: "seo",
        title: "SEO & Growth Optimization",
        images: [
            "https://images.unsplash.com/photo-1571786256017-aee7a0c009b6?auto=format&fit=crop&q=80&w=600&h=400",
            "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?auto=format&fit=crop&q=80&w=600&h=600",
            "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80&w=600&h=750",
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600&h=400",
            "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600&h=600",
            "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=600&h=750"
        ]
    },
    {
        id: "content",
        title: "Content Strategy & Copywriting",
        images: [
            "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=600&h=400",
            "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?auto=format&fit=crop&q=80&w=600&h=600",
            "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=600&h=750",
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600&h=400",
            "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?auto=format&fit=crop&q=80&w=600&h=600",
            "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=600&h=750"
        ]
    },
    {
        id: "ai",
        title: "AI Automation & Chatbots",
        images: [
            "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600&h=400",
            "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=600&h=600",
            "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=600&h=750",
            "https://images.unsplash.com/photo-1485827404703-89f5513fa011?auto=format&fit=crop&q=80&w=600&h=400",
            "https://images.unsplash.com/photo-1527474305487-b87b222841cc?auto=format&fit=crop&q=80&w=600&h=600",
            "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600&h=750"
        ]
    }
];

export default function WhatWeDo() {
    const [selectedService, setSelectedService] = useState(services[0]);

    return (
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black py-20 lg:py-24">

            {/* Background - Smooth Premium Flow */}
            <div className="absolute inset-0 z-0 bg-black">
                {/* Main Gradient Flow: Pitch Black -> Rich Dark Orange */}
                <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-[#ff4a01]/5"></div>

                {/* Ambient Glows - Softer and Deeper */}
                <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#ff4a01]/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '6s' }}></div>
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-orange-900/10 rounded-full blur-[120px] mix-blend-screen" ></div>
            </div>

            <div className="container relative z-10 mx-auto px-4 lg:px-6 h-full flex flex-col justify-center">

                {/* Section Header - Centered & Spaced */}
                <div className="w-full max-w-7xl mx-auto mb-12 flex flex-col items-center justify-center text-center gap-4 px-2">
                    <div className="max-w-3xl">
                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
                            What We <span className="font-playfair italic text-[#ff4a01]">Do Best</span>
                        </h2>
                        <p className="text-base md:text-lg text-gray-400 max-w-xl mx-auto">
                            Integrated digital systems that scale your brand.
                        </p>
                    </div>
                </div>

                {/* Main Content Glass Container - Increased Mobile Height */}
                <div className="relative w-full max-w-7xl mx-auto h-[850px] lg:h-[650px] flex flex-col-reverse lg:flex-row 
                    backdrop-blur-3xl bg-white/[0.01] 
                    border border-white/10 shadow-[0_0_80px_-20px_rgba(255,74,1,0.15)]
                    group/container box-border rounded-xl overflow-hidden">

                    {/* LEFT: Services List (35%) */}
                    {/* LEFT: Services List (55% on mobile, 40% on desktop) */}
                    <div className="w-full lg:w-[40%] h-[55%] lg:h-full flex flex-col border-t lg:border-t-0 lg:border-r border-white/10 relative bg-black/40 lg:bg-black/20">
                        {/* Scrollable List Container */}
                        <div className="flex-1 flex flex-col p-4 lg:p-8 space-y-1 overflow-y-auto thin-scrollbar">
                            {services.map((service) => (
                                <div
                                    key={service.id}
                                    onMouseEnter={() => setSelectedService(service)}
                                    onClick={() => setSelectedService(service)} // For mobile tap
                                    className={`group/item relative w-full text-left py-4 px-6 transition-all duration-300 cursor-pointer border-b border-white/5 last:border-0 rounded-lg
                                        ${selectedService.id === service.id
                                            ? "bg-white/[0.08]"
                                            : "hover:bg-white/[0.04]"
                                        }`}
                                >
                                    <div className="flex items-center justify-between relative z-10 gap-3">
                                        <span className={`text-base lg:text-xl font-medium transition-colors duration-300 
                                            ${selectedService.id === service.id
                                                ? "text-white font-playfair italic tracking-wide"
                                                : "text-gray-400 group-hover/item:text-gray-200"}`}>
                                            {service.title}
                                        </span>

                                        <ArrowUpRight className={`w-5 h-5 transition-all duration-300 
                                            ${selectedService.id === service.id
                                                ? "text-[#ff4a01] opacity-100 translate-x-0 translate-y-0"
                                                : "text-gray-500 opacity-0 -translate-x-2 translate-y-2 group-hover/item:opacity-50"
                                            }`}
                                        />
                                    </div>

                                    {/* Active Glow Indicator */}
                                    {selectedService.id === service.id && (
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#ff4a01] shadow-[0_0_15px_#ff4a01] animate-in fade-in duration-300 rounded-l-lg"></div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* View All Button Area - Visible on Mobile & Premium Redesign (Centered, No Glow, Fill Anim) */}
                        <div className="p-4 lg:p-6 border-t border-white/10 bg-black/40 backdrop-blur-md relative z-20 flex justify-center">
                            <button className="relative overflow-hidden group rounded-full border border-white/20 hover:border-[#ff4a01] transition-colors duration-300 px-10 py-3 uppercase tracking-wider font-bold text-sm">
                                {/* Fill Background */}
                                <div className="absolute inset-0 bg-[#ff4a01] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"></div>

                                {/* Content */}
                                <span className="relative z-10 flex items-center gap-2 text-white transition-colors duration-300">
                                    View All Services
                                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* RIGHT: Auto Image Scroller (65%) */}
                    {/* RIGHT: Auto Image Scroller (45% on mobile, 60% on desktop) */}
                    <div className="w-full lg:w-[60%] h-[45%] lg:h-full relative overflow-hidden bg-black/40">

                        {/* Inner Vignette / Mask */}
                        <div className="absolute inset-0 z-20 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]"></div>
                        <div className="absolute inset-x-0 top-0 h-24 lg:h-32 bg-gradient-to-b from-black/80 to-transparent z-20 pointer-events-none"></div>
                        <div className="absolute inset-x-0 bottom-0 h-24 lg:h-32 bg-gradient-to-t from-black/80 to-transparent z-20 pointer-events-none"></div>

                        <div className="grid grid-cols-2 gap-4 lg:gap-6 h-[120%] -mt-[10%] p-6 lg:p-12 rotate-[-2deg] scale-105 opacity-80 mix-blend-screen transition-opacity duration-700">

                            {/* Column 1 - Scrolls UP */}
                            <div className="relative h-full overflow-hidden">
                                <div className="animate-scroll-vertical-up flex flex-col gap-4 lg:gap-6">
                                    {[...selectedService.images, ...selectedService.images, ...selectedService.images].map((img, i) => (
                                        <ImageCard key={`up-${i}`} src={img} alt="Service showcase" delay={i * 0.1} />
                                    ))}
                                </div>
                            </div>

                            {/* Column 2 - Scrolls DOWN */}
                            <div className="relative h-full overflow-hidden pt-10 lg:pt-20">
                                <div className="animate-scroll-vertical-down flex flex-col gap-4 lg:gap-6">
                                    {[...selectedService.images].reverse().concat([...selectedService.images].reverse()).concat([...selectedService.images].reverse()).map((img, i) => (
                                        <ImageCard key={`down-${i}`} src={img} alt="Service showcase" delay={i * 0.1} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Interactive Overlay Content on Right Side */}
                        <div className="absolute bottom-6 right-6 lg:bottom-10 lg:right-10 z-30 max-w-sm text-right pointer-events-none">
                            <h3 className="text-2xl lg:text-4xl font-bold text-white mb-2 drop-shadow-xl">{selectedService.title}</h3>
                            <p className="text-gray-300 text-sm lg:text-base font-medium drop-shadow-md bg-black/50 backdrop-blur-md p-3 lg:p-4 border border-white/10 inline-block rounded-lg">
                                Premium execution for scalable growth.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

const ImageCard = ({ src, alt, delay }: { src: string; alt: string; delay: number }) => {
    return (
        <div
            className="relative w-full overflow-hidden shadow-2xl transition-transform duration-700 ease-out hover:scale-105"
            style={{ animationDelay: `${delay}s` }}
        >
            <Image
                src={src}
                alt={alt}
                width={600}
                height={800}
                className="w-full h-auto object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700 hover:scale-110"
                sizes="(max-width: 768px) 50vw, 33vw"
            />
            {/* Orange Overlay Tint */}
            <div className="absolute inset-0 bg-[#ff4a01]/10 mix-blend-overlay opacity-50"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
        </div>
    );
};

