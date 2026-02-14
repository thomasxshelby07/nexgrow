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

const companies = [
    { name: "Acme Corp", icon: Layers },
    { name: "Quantum", icon: Command },
    { name: "Echo Valley", icon: Activity },
    { name: "NextGen", icon: Zap },
    { name: "Pinnacle", icon: Triangle },
    { name: "Global Tech", icon: Globe },
    { name: "Spherule", icon: Hexagon },
    { name: "Logic Gate", icon: Cpu },
];

export default function CompanyTicker() {
    return (
        <div className="w-full overflow-hidden flex items-center py-3 bg-white/30 backdrop-blur-sm border-y border-gray-200/50">
            <div className="flex select-none w-full">
                <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: "-50%" }}
                    transition={{
                        duration: 20,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                    className="flex flex-shrink-0 gap-12 sm:gap-24 pr-12 sm:pr-24"
                >
                    {[...companies, ...companies].map((company, index) => (
                        <div key={index} className="flex items-center gap-2 group cursor-default">
                            <company.icon className="w-6 h-6 text-gray-400 group-hover:text-[#ff4a01] transition-colors" />
                            <span className="text-sm font-bold text-gray-500 uppercase tracking-widest group-hover:text-black transition-colors">
                                {company.name}
                            </span>
                        </div>
                    ))}
                </motion.div>
                <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: "-50%" }}
                    transition={{
                        duration: 20,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                    className="flex flex-shrink-0 gap-12 sm:gap-24 pr-12 sm:pr-24"
                    aria-hidden="true"
                >
                    {[...companies, ...companies].map((company, index) => (
                        <div key={`dup-${index}`} className="flex items-center gap-2 group cursor-default">
                            <company.icon className="w-6 h-6 text-gray-400 group-hover:text-[#ff4a01] transition-colors" />
                            <span className="text-sm font-bold text-gray-500 uppercase tracking-widest group-hover:text-black transition-colors">
                                {company.name}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
