"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowRight, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
    {
        question: "What services does NexGrow offer?",
        answer: "We are a full-stack growth partner. We handle everything from high-performance Website Development and Custom Software to Paid Media (Ads) and Strategic Branding. Basically, if it helps you scale, we build it."
    },
    {
        question: "How is NexGrow different from a typical agency?",
        answer: "Most agencies give you 'inputs' (posts, hours, meetings). We sell 'outcomes' (revenue, leads, efficiency). We operate as your dedicated growth infrastructure, not just a service provider."
    },
    {
        question: "What is your typical turnaround time?",
        answer: "We move fast. A standard website takes 2-4 weeks. A custom app MVP takes 4-8 weeks. Marketing campaigns can launch in as little as 5 days after strategy approval."
    },
    {
        question: "Do you work with startups?",
        answer: "Exclusively? No. Passionately? Yes. We love high-growth startups that are ready to disrupt. If you have product-market fit and funding (or revenue), we are the fuel you need."
    },
    {
        question: "What is your pricing model?",
        answer: "We offer both project-based (perfect for builds) and retainer-based (perfect for growth) models. We believe in transparent sizing—no hidden fees, just clear deliverables."
    },
    {
        question: "Do I own the code and assets?",
        answer: "100%. Once the project is paid for, everything we build belongs to you. We don't hold your IP hostage."
    },
    {
        question: "How do we communicate during the project?",
        answer: "Direct Slack access to your project lead. Weekly sprint updates. No distinct 'account managers' playing telephone—you talk to the people doing the work."
    },
    {
        question: "What if I'm not satisfied with the results?",
        answer: "We work until it's right. Our contracts include satisfaction guarantees on creative deliverables. We are in this for the long game, not a quick buck."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="relative w-full py-24 lg:py-32 bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#050505] text-white overflow-hidden">

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>

            {/* 1. Motion Gradient Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-0 left-[-10%] w-[800px] h-[800px] bg-[#ff4a01]/10 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-0 right-[-10%] w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px]"
                />
                {/* Moving 'Orb' */}
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[40%] left-[30%] w-[300px] h-[300px] bg-blue-900/10 rounded-full blur-[100px]"
                />
            </div>

            <div className="container relative z-10 mx-auto px-4 lg:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

                    {/* LEFT COLUMN: Sticky Title & Contact */}
                    <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
                        <div className="mb-8">
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                                Frequently Asked <br className="hidden lg:block" />
                                <span className="text-[#ff4a01] font-playfair italic">Questions</span>
                            </h2>
                            <p className="text-gray-400 text-lg">
                                Everything you need to know about working with NexGrow.
                            </p>
                        </div>

                        {/* Glass Contact Card */}
                        <div className="hidden lg:block p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden group hover:border-white/20 transition-colors duration-500 shadow-2xl shadow-black/50">
                            {/* Inner Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                            <h3 className="text-xl font-bold mb-2 relative z-10">Still have questions?</h3>
                            <p className="text-gray-400 text-sm mb-6 relative z-10">
                                Can't find the answer you're looking for? Chat with our team directly.
                            </p>

                            <button className="w-full py-3 rounded-xl bg-white text-black font-bold flex items-center justify-center gap-2 hover:bg-[#ff4a01] hover:text-white transition-all duration-300 relative z-10 group/btn shadow-lg">
                                <Mail size={18} />
                                <span>Get in Touch</span>
                                <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Accordion */}
                    <div className="lg:col-span-8 space-y-4">
                        {faqs.map((faq, i) => (
                            <FAQItem
                                key={i}
                                question={faq.question}
                                answer={faq.answer}
                                isOpen={openIndex === i}
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            />
                        ))}

                        {/* Mobile Only Contact Card */}
                        <div className="lg:hidden mt-12 pt-12 border-t border-white/10">
                            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center backdrop-blur-md">
                                <h3 className="text-lg font-bold mb-2">Still have questions?</h3>
                                <button className="mt-4 px-6 py-2 rounded-full bg-[#ff4a01] text-white font-bold text-sm shadow-lg shadow-orange-900/20">
                                    Contact Support
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

function FAQItem({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void }) {
    return (
        <motion.div
            initial={false}
            className={cn(
                "rounded-2xl border transition-all duration-500 overflow-hidden cursor-pointer relative group",
                isOpen
                    ? "bg-white/10 border-[#ff4a01]/40 shadow-[0_0_40px_-10px_rgba(255,74,1,0.2)] backdrop-blur-xl"
                    : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10 backdrop-blur-md"
            )}
            onClick={onClick}
        >
            {/* Selection Indicator Line */}
            {isOpen && <motion.div layoutId="faq-active" className="absolute left-0 top-0 bottom-0 w-1 bg-[#ff4a01]" />}

            <div className="px-6 py-5 flex items-center justify-between gap-4">
                <h3 className={cn("text-lg font-medium transition-colors duration-300", isOpen ? "text-white" : "text-gray-300 group-hover:text-white")}>
                    {question}
                </h3>
                <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 border",
                    isOpen ? "bg-[#ff4a01] border-[#ff4a01] text-white rotate-180" : "bg-transparent border-white/20 text-gray-400 group-hover:border-white/50 group-hover:text-white"
                )}>
                    {isOpen ? <Minus size={16} strokeWidth={3} /> : <Plus size={16} strokeWidth={2} />}
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }} // Spring-like feel
                    >
                        <div className="px-6 pb-6 pt-0 text-gray-400 text-base leading-relaxed border-t border-white/5 mt-2 pt-4">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
