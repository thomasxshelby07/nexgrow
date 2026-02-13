"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const services = [
    {
        title: "Growth Marketing",
        description: "Performance-driven marketing—from awareness to acquisition—designed to drive real business outcomes.",
        features: [
            "SEO & Organic Growth",
            "Social Media Management",
            "Paid Ads | PPC",
            "Affiliate & Influencer Marketing",
            "Email & WhatsApp Marketing"
        ],
        images: [
            "/herobanner.png",
            "/herobanner.png",
            "/herobanner.png",
            "/herobanner.png",
        ]
    },
    {
        title: "Website Development",
        description: "Stunning, high-performance websites that convert visitors into customers with seamless user experiences.",
        features: [
            "Responsive Web Design",
            "E-commerce Solutions",
            "SEO Optimization",
            "Performance & Speed",
            "Custom CMS Integration"
        ],
        images: [
            "/herobanner.png",
            "/herobanner.png",
            "/herobanner.png",
            "/herobanner.png",
        ]
    },
    {
        title: "Web & App Development",
        description: "Robust and scalable applications tailored to your business needs, from concept to deployment.",
        features: [
            "Cross-Platform Apps",
            "Progressive Web Apps",
            "Backend Architecture",
            "API Integration",
            "Cloud Deployment"
        ],
        images: [
            "/herobanner.png",
            "/herobanner.png",
            "/herobanner.png",
            "/herobanner.png",
        ]
    },
    {
        title: "Automation & AI Solutions",
        description: "Streamline operations and enhance decision-making with cutting-edge AI and automation tools.",
        features: [
            "Workflow Automation",
            "AI Chatbots & Assistants",
            "Predictive Analytics",
            "Data Processing",
            "Smart Integrations"
        ],
        images: [
            "/herobanner.png",
            "/herobanner.png",
            "/herobanner.png",
            "/herobanner.png",
        ]
    },
];

const ServiceCard = ({ service, index }: { service: typeof services[0], index: number }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.15 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, []);

    const isEven = index % 2 === 0;

    return (
        <div
            ref={cardRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`group relative flex flex-col lg:flex-row items-stretch gap-6 md:gap-8 lg:gap-10 p-6 md:p-8 lg:p-12 rounded-2xl md:rounded-3xl transition-all duration-1000 transform ${isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
                }
                /* Premium Glass Effect - Enhanced */
                bg-gradient-to-br from-white/[0.12] via-white/[0.06] to-white/[0.02]
                backdrop-blur-2xl
                border border-white/20
                shadow-[0_8px_32px_0_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.1)_inset]
                hover:shadow-[0_20px_60px_0_rgba(255,74,1,0.25),0_0_0_1px_rgba(255,255,255,0.2)_inset]
                hover:border-[#ff4a01]/30
                hover:bg-gradient-to-br hover:from-white/[0.15] hover:via-white/[0.08] hover:to-white/[0.03]
                overflow-hidden
            `}
        >
            {/* Animated Gradient Border Effect */}
            <div className="absolute inset-0 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-r from-[#ff4a01]/30 via-orange-500/20 to-[#ff4a01]/30 animate-gradient-xy blur-xl"></div>
            </div>

            {/* Subtle Inner Glow */}
            <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-br from-white/[0.05] via-transparent to-transparent pointer-events-none"></div>

            {/* Content Section */}
            <div className={`flex-1 flex flex-col justify-center space-y-4 md:space-y-5 lg:space-y-6 z-10 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight drop-shadow-lg">
                    {service.title}
                </h3>
                <p className="text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed">
                    {service.description}
                </p>
                <ul className="space-y-2 md:space-y-2.5 lg:space-y-3">
                    {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-xs md:text-sm lg:text-base font-medium text-white/90 group/item">
                            <span className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-[#ff4a01] mr-2.5 md:mr-3 group-hover/item:scale-125 group-hover/item:shadow-[0_0_8px_rgba(255,74,1,0.8)] transition-all"></span>
                            <span className="group-hover/item:text-white group-hover/item:translate-x-0.5 transition-all">{feature}</span>
                        </li>
                    ))}
                </ul>
                <button className="w-fit px-5 md:px-6 py-2.5 md:py-3 mt-2 lg:mt-4 text-xs md:text-sm font-bold text-white bg-white/10 border border-white/30 rounded-full hover:bg-[#ff4a01] hover:border-[#ff4a01] hover:shadow-[0_0_20px_rgba(255,74,1,0.5)] transition-all duration-300 group/btn backdrop-blur-sm">
                    Learn More
                    <span className="inline-block ml-2 group-hover/btn:translate-x-1 transition-transform">→</span>
                </button>
            </div>

            {/* Visual Section - Hidden on Mobile, Visible on Desktop */}
            <div className={`hidden lg:flex flex-1 relative lg:min-h-[400px] z-10 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                <div className="absolute inset-0 flex gap-2 lg:gap-3 p-2 lg:p-3 perspective-1000">
                    {/* Column 1 - Scrolls UP - All Cards Same Angle */}
                    <div className="flex-1 relative overflow-hidden rounded-2xl">
                        <div className={`absolute inset-0 flex flex-col flex-nowrap gap-2 lg:gap-3 ${isHovered ? 'animate-scroll-slow' : 'animate-scroll'}`}>
                            {/* Repeat images 3 times for seamless infinite loop */}
                            {[...service.images, ...service.images, ...service.images].map((img, i) => (
                                <div
                                    key={i}
                                    className="relative w-full h-[180px] md:h-[220px] lg:h-[260px] rounded-xl overflow-hidden flex-shrink-0 transform rotate-3 group/card"
                                >
                                    <Image
                                        src={img}
                                        alt={`${service.title} showcase ${i + 1}`}
                                        fill
                                        className="object-cover opacity-80 group-hover/card:opacity-100 group-hover/card:scale-105 transition-all duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-transparent opacity-70 group-hover/card:opacity-50 transition-opacity duration-300"></div>
                                    <div className="absolute inset-0 border border-white/10 rounded-xl"></div>
                                </div>
                            ))}
                        </div>
                        {/* Gradient fade edges */}
                        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black via-black/70 to-transparent z-10 pointer-events-none"></div>
                        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black via-black/70 to-transparent z-10 pointer-events-none"></div>
                    </div>

                    {/* Column 2 - Scrolls DOWN (Opposite Direction) - All Cards Same Angle */}
                    <div className="flex-1 relative overflow-hidden rounded-2xl">
                        <div className={`absolute inset-0 flex flex-col flex-nowrap gap-2 lg:gap-3 ${isHovered ? 'animate-scroll-reverse-slow' : 'animate-scroll-reverse'}`}>
                            {/* Repeat images 3 times for seamless infinite loop */}
                            {[...service.images, ...service.images, ...service.images].map((img, i) => (
                                <div
                                    key={i}
                                    className="relative w-full h-[180px] md:h-[220px] lg:h-[260px] rounded-xl overflow-hidden flex-shrink-0 transform rotate-3 group/card"
                                >
                                    <Image
                                        src={img}
                                        alt={`${service.title} showcase ${i + 1}`}
                                        fill
                                        className="object-cover opacity-80 group-hover/card:opacity-100 group-hover/card:scale-105 transition-all duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-transparent opacity-70 group-hover/card:opacity-50 transition-opacity duration-300"></div>
                                    <div className="absolute inset-0 border border-white/10 rounded-xl"></div>
                                </div>
                            ))}
                        </div>
                        {/* Gradient fade edges */}
                        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black via-black/70 to-transparent z-10 pointer-events-none"></div>
                        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black via-black/70 to-transparent z-10 pointer-events-none"></div>
                    </div>
                </div>

                {/* Overall Gradient Overlay for Depth */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10 pointer-events-none rounded-2xl"></div>
            </div>
        </div>
    );
};

export default function Services() {
    return (
        <section className="relative py-16 md:py-20 lg:py-24 px-4 overflow-hidden bg-black">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900/50 via-black to-black pointer-events-none" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto space-y-12 md:space-y-16 lg:space-y-20 relative z-10">
                {/* Section Header */}
                <div className="text-center space-y-3 md:space-y-4 mb-12 md:mb-16 lg:mb-20">
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tighter">
                        What We <span className="font-playfair italic text-[#ff4a01]">Do</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg px-4">
                        Comprehensive digital solutions tailored to scale your business.
                    </p>
                </div>

                {/* Services List */}
                <div className="flex flex-col gap-12 md:gap-16 lg:gap-24">
                    {services.map((service, index) => (
                        <ServiceCard key={index} service={service} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
