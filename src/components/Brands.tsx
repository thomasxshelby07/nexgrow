"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Brand {
    name: string;
    logo: string;
}

export default function Brands({ data }: { data?: Brand[] }) {
    const defaultBrands = [
        { name: "Acme Corp", logo: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=200&h=80" },
        { name: "Global Tech", logo: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=200&h=80" },
        { name: "Nexus", logo: "https://images.unsplash.com/photo-1614850523598-811484ff2745?auto=format&fit=crop&q=80&w=200&h=80" },
        { name: "Apex", logo: "https://images.unsplash.com/photo-1614850523023-5e8a755b721e?auto=format&fit=crop&q=80&w=200&h=80" },
    ];

    const brands = data && data.length > 0 ? data : defaultBrands;

    return (
        <section className="w-full bg-white py-12 border-y border-gray-100 overflow-hidden">
            <div className="container mx-auto px-4 mb-4 text-center">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 opacity-60">Trusted By Global Brands</span>
            </div>

            <div className="flex select-none w-full">
                <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: "-50%" }}
                    transition={{
                        duration: 30,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                    className="flex flex-shrink-0 gap-16 md:gap-32 pr-16 md:pr-32 items-center"
                >
                    {[...brands, ...brands, ...brands].map((brand, index) => (
                        <div key={index} className="relative w-24 h-10 md:w-32 md:h-12 flex-shrink-0 grayscale hover:grayscale-0 transition-all opacity-40 hover:opacity-100">
                            <Image
                                src={brand.logo}
                                alt={brand.name}
                                fill
                                className="object-contain"
                            />
                        </div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: "-50%" }}
                    transition={{
                        duration: 30,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                    className="flex flex-shrink-0 gap-16 md:gap-32 pr-16 md:pr-32 items-center"
                    aria-hidden="true"
                >
                    {[...brands, ...brands, ...brands].map((brand, index) => (
                        <div key={index} className="relative w-24 h-10 md:w-32 md:h-12 flex-shrink-0 grayscale hover:grayscale-0 transition-all opacity-40 hover:opacity-100">
                            <Image
                                src={brand.logo}
                                alt={brand.name}
                                fill
                                className="object-contain"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
