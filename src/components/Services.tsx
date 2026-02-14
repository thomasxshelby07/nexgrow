"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const services = [
    {
        id: "01",
        title: "STRATEGY",
        features: ["Stakeholder Alignment", "User Research", "Product Strategy"],
        desc: "Align growth to goals.",
    },
    {
        id: "02",
        title: "UI/UX",
        features: ["Visual Definition", "UX/UI Design", "Usability Testing"],
        desc: "Design to map value.",
    },
    {
        id: "03",
        title: "WEBSITE",
        features: ["HTML/CSS", "Next.js & React", "SEO Optimization"],
        desc: "Adapt apps for speed.",
    },
    {
        id: "04",
        title: "APP",
        features: ["iOS Development", "Android Native", "Flutter"],
        desc: "Build high-fidelity apps.",
    },
    {
        id: "05",
        title: "SYSTEM",
        features: ["HA Architecture", "Payment System", "AI Integration"],
        desc: "Secure cloud systems.",
    }
];

export default function Services() {
    return (
        <>
            <DesktopServices />
            <MobileServices />
        </>
    );
}

function DesktopServices() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    return (
        <section ref={targetRef} className="relative h-[400vh] bg-[#ff4a01] hidden lg:block" id="expertise">
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden perspective-1000">

                {/* Background Text - Subtle Watermark */}
                <h2 className="absolute top-10 left-0 w-full text-center text-[25vw] font-bold text-white/10 select-none z-0 leading-none tracking-tighter">
                    EXPERTISE
                </h2>

                {/* Cards Container */}
                <div className="relative z-10 w-full flex justify-center items-center h-[550px]">
                    {services.map((service, index) => {
                        // Calculate final X position relative to center
                        // Spread them out nicely: card width 260px + gap
                        const centerIndex = (services.length - 1) / 2;
                        const offset = index - centerIndex;
                        // Gap: 270 offset - 260 width = 10px gap
                        const xFinal = offset * 270;

                        return (
                            <FlippingCard
                                key={service.id}
                                service={service}
                                index={index}
                                scrollYProgress={scrollYProgress}
                                xFinal={xFinal}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

const FlippingCard = ({ service, index, scrollYProgress, xFinal }: {
    service: typeof services[0],
    index: number,
    scrollYProgress: MotionValue<number>,
    xFinal: number
}) => {

    // Smooth Animation Ranges

    // 1. Spreading Phase (0 -> 0.15)
    // Faster spread, then LOCKS.
    const x = useTransform(scrollYProgress, [0, 0.15], [0, xFinal], { clamp: true });

    // 2. Stack Rotation Cleanup (0 -> 0.15)
    // Straightens quickly
    const randomRotate = (index % 2 === 0 ? 3 : -3) * (index + 0.5);
    const rotateZ = useTransform(scrollYProgress, [0, 0.15], [randomRotate, 0], { clamp: true });

    // 3. Vertical Scroll Lift (0 -> 0.3)
    // Initial lift on spread
    const yScroll = useTransform(scrollYProgress, [0, 0.15, 0.3], [0, -30, 0]);

    // 4. Scale Effect (0.1 -> 0.4)
    const scale = useTransform(scrollYProgress, [0.1, 0.4], [0.95, 1.05]);

    // 5. Flip Logic (0.25 -> 0.85)
    // "Sirf Flip Ho"
    const rotateY = useTransform(scrollYProgress, [0.25, 0.85], [0, 180]);

    return (
        <motion.div
            style={{
                x,
                y: yScroll,
                scale,
                rotateZ,
                position: 'absolute',
                transformStyle: "preserve-3d"
            }}
            className="w-[260px] h-[380px] cursor-pointer perspective-1000"
        >
            {/* FLOAT ANIMATION WRAPPER */}
            {/* This handles the "halke halke float" continuous bobbing */}
            <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.2 // Stagger the float
                }}
                style={{
                    rotateY,
                    transformStyle: "preserve-3d",
                    width: '100%',
                    height: '100%'
                }}
            >
                {/* FRONT FACE (Logo ONLY) */}
                <div
                    className="absolute inset-0 bg-white rounded-[1.5rem] shadow-2xl flex items-center justify-center backface-hidden"
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    <div className="relative w-48 h-48 opacity-90 transition-opacity duration-300">
                        {/* Larger Logo */}
                        <Image
                            src="/logo.png"
                            alt="NexGrow Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>

                {/* BACK FACE (Details) */}
                <div
                    className="absolute inset-0 bg-white rounded-[1.5rem] shadow-2xl flex flex-col justify-between p-6"
                    style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                    }}
                >
                    <div className="flex justify-between items-start border-b border-gray-100 pb-4">
                        <h3 className="text-2xl font-bold text-black uppercase tracking-tight">
                            {service.title}
                        </h3>
                    </div>

                    <ul className="space-y-3 my-4 flex-1">
                        {service.features.map((feature, i) => (
                            <li key={i} className="text-sm font-medium text-gray-600 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-[#ff4a01] rounded-full"></span>
                                {feature}
                            </li>
                        ))}
                    </ul>

                    <div className="border-t border-gray-100 pt-4">
                        <p className="text-xs text-gray-500 leading-relaxed mb-2">
                            {service.desc}
                        </p>
                        <div className="text-4xl font-bold text-gray-200 text-right">
                            {service.id}
                        </div>
                    </div>
                </div>

            </motion.div>
        </motion.div>
    );
};

function MobileServices() {
    return (
        <div className="lg:hidden flex flex-col gap-4 py-20 px-4 bg-[#ff4a01]" id="expertise-mobile">
            <div className="mb-12 text-center text-white">
                <h2 className="text-4xl font-bold mb-2 tracking-tight">Our Expertise</h2>
                <p className="opacity-90">Swipe to explore</p>
            </div>
            {services.map((service, index) => (
                <div
                    key={index}
                    className="sticky top-24 bg-white rounded-2xl shadow-xl p-6 h-[280px] flex flex-col justify-between mb-4"
                    style={{ zIndex: index + 10 }}
                >
                    <div className="flex justify-between items-start">
                        <h3 className="text-2xl font-bold text-black">{service.title}</h3>
                        <span className="text-4xl font-bold text-gray-200">{service.id}</span>
                    </div>
                    <ul className="space-y-2">
                        {service.features.map((f, i) => (
                            <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-[#ff4a01] rounded-full"></span>
                                {f}
                            </li>
                        ))}
                    </ul>
                    <div className="border-t border-gray-100 pt-4">
                        <p className="text-xs text-gray-400">{service.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}
