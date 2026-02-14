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
            "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=600&h=400",
            "https://images.unsplash.com/photo-1626785774573-4b7993143a4d?auto=format&fit=crop&q=80&w=600&h=600",
            "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=600&h=750",
            "https://images.unsplash.com/photo-1558655146-d09347e0b7a8?auto=format&fit=crop&q=80&w=600&h=400",
            "https://images.unsplash.com/photo-1586717791821-3f44a5638d0f?auto=format&fit=crop&q=80&w=600&h=600",
            "https://images.unsplash.com/photo-1634942537034-2531766767d1?auto=format&fit=crop&q=80&w=600&h=750"
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
        <section className="relative w-full min-h-screen flex items-center justify-center bg-white py-12 lg:py-16">

            {/* Clean Background - Removed all blurs/glows */}
            <div className="absolute inset-0 z-0 bg-white"></div>

            <div className="container relative z-10 mx-auto px-4 lg:px-6 h-full flex flex-col justify-center">

                {/* Section Header */}
                <div className="w-full max-w-7xl mx-auto mb-8 md:mb-12 flex flex-col items-center justify-center text-center gap-4 px-2">
                    <div className="max-w-3xl">
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-black mb-4 tracking-tight">
                            What We <span className="font-playfair italic text-[#ff4a01]">Do Best</span>
                        </h2>
                        <p className="text-sm md:text-base text-gray-600 max-w-xl mx-auto">
                            Integrated digital systems that scale your brand.
                        </p>
                    </div>
                </div>

                {/* Main Content Container - Compact & Inclined */}
                <div className="relative w-full max-w-7xl mx-auto flex flex-col-reverse lg:flex-row 
                    bg-white border border-gray-200
                    rounded-2xl overflow-hidden h-auto lg:h-[600px]">

                    {/* LEFT: Services List (40%) */}
                    <div className="w-full lg:w-[40%] h-[400px] lg:h-full flex flex-col border-t lg:border-t-0 lg:border-r border-gray-200 relative bg-white">
                        {/* Scrollable List Container */}
                        <div className="flex-1 flex flex-col overflow-y-auto thin-scrollbar p-0">
                            {services.map((service) => (
                                <div
                                    key={service.id}
                                    onMouseEnter={() => setSelectedService(service)}
                                    // Mobile: tapping sets active and scrolls to it slightly if needed
                                    onClick={() => setSelectedService(service)}
                                    className={`group/item relative w-full text-left py-4 px-6 transition-colors duration-200 cursor-pointer border-b border-gray-100 last:border-0
                                        ${selectedService.id === service.id
                                            ? "bg-gray-50"
                                            : "hover:bg-gray-50/50"
                                        }`}
                                >
                                    <div className="flex items-center justify-between relative z-10 gap-3">
                                        <span className={`text-base lg:text-lg font-medium transition-colors duration-200 
                                            ${selectedService.id === service.id
                                                ? "text-black font-semibold" // Clean bold
                                                : "text-gray-500 group-hover/item:text-black"}`}>
                                            {service.title}
                                        </span>

                                        <ArrowUpRight className={`w-4 h-4 transition-all duration-200 
                                            ${selectedService.id === service.id
                                                ? "text-[#ff4a01] opacity-100"
                                                : "text-gray-400 opacity-0 group-hover/item:opacity-50"
                                            }`}
                                        />
                                    </div>

                                    {/* Active Indicator - Clean Orange Bar Left */}
                                    {selectedService.id === service.id && (
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#ff4a01]"></div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* View All Button Area (Compact) */}
                        <div className="p-4 border-t border-gray-200 bg-white relative z-20 flex justify-center">
                            <button className="relative overflow-hidden group rounded-full border border-gray-300 hover:border-[#ff4a01] transition-colors duration-300 px-8 py-2.5 uppercase tracking-wider font-bold text-xs bg-white">
                                <div className="absolute inset-0 bg-[#ff4a01] translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                <span className="relative z-10 flex items-center gap-2 text-black group-hover:text-white transition-colors duration-300">
                                    View All Services
                                    <ArrowUpRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* RIGHT: Auto Image Scroller (60%) - Inclined */}
                    <div className="w-full lg:w-[60%] h-[400px] lg:h-full relative overflow-hidden bg-gray-50 p-0">

                        {/* Scroller Container with TILT/INCLINE */}
                        <div className="grid grid-cols-2 gap-4 lg:gap-6 h-[140%] -mt-[10%] -ml-[10%] w-[120%] 
                                rotate-[-6deg] scale-105 origin-center">

                            {/* Column 1 - Scrolls UP */}
                            <div className="relative h-full overflow-hidden">
                                <div className="flex flex-col gap-4 lg:gap-6 animate-scroll-vertical-up">
                                    {[...selectedService.images, ...selectedService.images, ...selectedService.images].map((img, i) => (
                                        <ImageCard key={`up-${i}`} src={img} alt="Service showcase" />
                                    ))}
                                </div>
                            </div>

                            {/* Column 2 - Scrolls DOWN */}
                            <div className="relative h-full overflow-hidden pt-20">
                                <div className="flex flex-col gap-4 lg:gap-6 animate-scroll-vertical-down">
                                    {[...selectedService.images, ...selectedService.images, ...selectedService.images].map((img, i) => (
                                        <ImageCard key={`down-${i}`} src={img} alt="Service showcase" />
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

const ImageCard = ({ src, alt }: { src: string; alt: string }) => {
    return (
        <div className="relative w-full h-[200px] md:h-[250px] lg:h-[300px] shrink-0 overflow-hidden rounded-lg bg-gray-200 transition-transform duration-500 hover:scale-[1.02] shadow-sm">
            <Image
                src={src}
                alt={alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
                loading="eager"
            />
        </div>
    );
};
