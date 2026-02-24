"use client";

import { Check } from "lucide-react";
import Link from "next/link";

const defaultPricing = [
    {
        name: "STARTER",
        price: "499",
        features: ["Social Media Management", "Basic Video Editing", "Monthly Strategy Call"],
        popular: false
    },
    {
        name: "PRO",
        price: "999",
        features: ["Full Service Content", "Advanced Editing", "Ad Management", "Weekly Reports"],
        popular: true
    }
];

export default function Pricing({ data }: { data?: any[] }) {
    const plans = data && data.length > 0 ? data : defaultPricing;

    return (
        <section className="py-24 bg-gray-50/50" id="pricing">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter uppercase">Transparent Pricing</h2>
                    <p className="text-gray-500 font-bold">Solutions tailored for your growth stage.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan: any, i: number) => (
                        <div key={i} className={`relative p-8 rounded-[32px] bg-white border ${plan.popular ? "border-[#ff4a01] shadow-2xl scale-105 z-10" : "border-gray-100 shadow-xl"}`}>
                            {plan.popular && (
                                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#ff4a01] text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Most Popular</span>
                            )}
                            <h3 className="text-xl font-black mb-1 uppercase tracking-tighter">{plan.name}</h3>
                            <div className="flex items-baseline gap-1 mb-6">
                                <span className="text-3xl font-black">$</span>
                                <span className="text-5xl font-black tracking-tighter">{plan.price}</span>
                                <span className="text-gray-400 font-bold ml-1">/mo</span>
                            </div>
                            <ul className="space-y-4 mb-8">
                                {plan.features?.map((f: string, idx: number) => (
                                    <li key={idx} className="flex items-center gap-3 text-sm font-bold text-gray-600">
                                        <div className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Check size={12} strokeWidth={4} />
                                        </div>
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <Link href="#contact" className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center transition-all ${plan.popular ? "bg-[#ff4a01] text-white hover:bg-black" : "bg-black text-white hover:bg-[#ff4a01]"}`}>
                                Get Started
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
