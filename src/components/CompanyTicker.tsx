"use client";

import { motion } from "framer-motion";
import {
    Layers,
    Command,
    Cpu,
    Globe,
    Zap,
    Hexagon,
    Triangle,
    Activity
} from "lucide-react";

export default function CompanyTicker({ brands }: { brands?: { name: string; logo: string }[] }) {
    const defaultCompanies = [
        { name: "Acme Corp", icon: Layers },
        { name: "Quantum", icon: Command },
        { name: "Echo Valley", icon: Activity },
        { name: "NextGen", icon: Zap },
        { name: "Pinnacle", icon: Triangle },
        { name: "Global Tech", icon: Globe },
        { name: "Spherule", icon: Hexagon },
        { name: "Logic Gate", icon: Cpu },
    ];

    const hasDynamicBrands = brands && brands.length > 0;
    const items = hasDynamicBrands ? brands : defaultCompanies;

    const renderItem = (item: any, index: number) => {
        if (hasDynamicBrands) {
            return (
                <div key={index} className="flex items-center gap-2 group cursor-default grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
                    <div className="relative w-24 h-8 md:w-32 md:h-10">
                        <img
                            src={item.logo}
                            alt={item.name}
                            className="object-contain w-full h-full"
                        />
                    </div>
                </div>
            );
        }

        // Default Icon Render
        const Icon = item.icon;
        return (
            <div key={index} className="flex items-center gap-2 group cursor-default">
                <Icon className="w-6 h-6 text-gray-400 group-hover:text-[#ff4a01] transition-colors" />
                <span className="text-sm font-bold text-gray-500 uppercase tracking-widest group-hover:text-black transition-colors">
                    {item.name}
                </span>
            </div>
        );
    };

    return (
        <div className="w-full overflow-hidden flex items-center py-4 bg-white/30 backdrop-blur-sm border-y border-gray-200/50">
            <div className="flex select-none w-full">
                <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: "-50%" }}
                    transition={{
                        duration: 20,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                    className="flex flex-shrink-0 gap-12 sm:gap-24 pr-12 sm:pr-24 items-center"
                >
                    {[...items, ...items, ...items].map((item, index) => renderItem(item, index))}
                </motion.div>
                <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: "-50%" }}
                    transition={{
                        duration: 20,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                    className="flex flex-shrink-0 gap-12 sm:gap-24 pr-12 sm:pr-24 items-center"
                    aria-hidden="true"
                >
                    {[...items, ...items, ...items].map((item, index) => renderItem(item, index))}
                </motion.div>
            </div>
        </div>
    );
}
