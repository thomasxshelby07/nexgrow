"use client";

import { Star, MessageCircle } from "lucide-react";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const reviews = [
    {
        name: "Sarah Thompson",
        role: "StyleHive",
        text: "NexGrow didn't just build a website; they built a sales engine.",
        stars: 5,
        initial: "S"
    },
    {
        name: "James Wilson",
        role: "TechFlow",
        text: "The execution speed was insane. Full rebrand in 2 weeks.",
        stars: 5,
        initial: "J"
    },
    {
        name: "Elena Rodriguez",
        role: "UrbanSpaces",
        text: "Finally, an agency that understands ROI. 3x returns.",
        stars: 5,
        initial: "E"
    },
    {
        name: "Michael Chang",
        role: "DataPulse",
        text: "Strategic input worth more than the dev cost. True partners.",
        stars: 5,
        initial: "M"
    },
    {
        name: "Jessica Lee",
        role: "Aura",
        text: "Visuals so clean my competitors are asking who we hired.",
        stars: 5,
        initial: "J"
    },
    {
        name: "David Miller",
        role: "Swift",
        text: "Top-tier code quality. The platform scales perfectly.",
        stars: 5,
        initial: "D"
    }
];

export default function Reviews() {
    return (
        <section className="relative w-full py-16 lg:py-24 bg-gray-50 overflow-hidden">

            {/* Vibrant Ambient Background for Glass Effect */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-[#ff4a01]/10 rounded-full blur-[100px] mix-blend-multiply animate-pulse"></div>
                <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] mix-blend-multiply animate-pulse delay-1000"></div>
            </div>

            <div className="container relative z-10 mx-auto px-4 mb-10 text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
                    Real Results. <span className="font-playfair italic text-[#ff4a01]">Real Trust.</span>
                </h2>
                <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto">
                    Join the fast-growing brands scaling with NexGrow.
                </p>
            </div>

            {/* Marquee Container - Compact */}
            <div className="relative w-full flex flex-col gap-4">

                {/* Row 1 */}
                <InfiniteMarquee direction="left" speed={40}>
                    {reviews.map((review, i) => (
                        <ReviewCard key={i} review={review} />
                    ))}
                </InfiniteMarquee>

                {/* Row 2 */}
                <InfiniteMarquee direction="right" speed={50}>
                    {reviews.map((review, i) => (
                        <ReviewCard key={i + 'r2'} review={review} />
                    ))}
                </InfiniteMarquee>

            </div>

            {/* Side Fade Masks */}
            <div className="absolute top-0 left-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-20 pointer-events-none"></div>
            <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent z-20 pointer-events-none"></div>

        </section>
    );
}

const InfiniteMarquee = ({ children, direction = "left", speed = 30 }: { children: React.ReactNode, direction?: "left" | "right", speed?: number }) => {
    return (
        <div className="flex w-full overflow-hidden py-2" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
            <motion.div
                className="flex gap-4 shrink-0"
                initial={{ x: direction === "left" ? 0 : "-50%" }}
                animate={{ x: direction === "left" ? "-50%" : 0 }}
                transition={{
                    duration: speed,
                    ease: "linear",
                    repeat: Infinity
                }}
            >
                {/* Quadruple content */}
                {children}
                {children}
                {children}
                {children}
            </motion.div>
        </div>
    )
}

const ReviewCard = ({ review }: { review: typeof reviews[0] }) => {
    return (
        <div className="
            w-[260px] md:w-[320px] 
            p-4 rounded-2xl 
            bg-white/60 backdrop-blur-md saturate-150
            border border-white/60 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)]
            flex flex-col gap-3 shrink-0 
            hover:bg-white/80 transition-colors duration-300
        ">

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff4a01] to-[#ff7e3c] flex items-center justify-center text-white text-xs font-bold shadow-sm">
                        {review.initial}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-900 leading-none">{review.name}</span>
                        <span className="text-[10px] text-gray-500 font-medium">{review.role}</span>
                    </div>
                </div>
                <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={10} fill="#ffb703" className="text-[#ffb703]" strokeWidth={0} />
                    ))}
                </div>
            </div>

            <p className="text-gray-700 text-xs md:text-sm font-medium leading-relaxed">
                "{review.text}"
            </p>

        </div>
    )
}
