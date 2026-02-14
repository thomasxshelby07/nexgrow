"use client";

import { useRef, useEffect, useState, useLayoutEffect } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

// Register ScrollTrigger
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Process() {
    const componentRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const firstCircleRef = useRef<HTMLDivElement>(null);
    const lastCircleRef = useRef<HTMLDivElement>(null);
    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        {
            number: "01",
            title: "Discovery & Audit",
            description: "Deep dive into your business model. We identify exactly where revenue is leaking."
        },
        {
            number: "02",
            title: "Strategy Blueprint",
            description: "Messaging angles and funnel structure are mapped clearly — ensuring marketing is guided."
        },
        {
            number: "03",
            title: "Creation & Setup",
            description: "High-quality creatives, landing pages, and tracking built as one connected system."
        },
        {
            number: "04",
            title: "Launch & Optimization",
            description: "Real user behavior guides improvements. We measure and refine continuously."
        },
        {
            number: "05",
            title: "Scale & Automate",
            description: "Once winning patterns are found, we scale. Automation ensures growth continues."
        },
        {
            number: "06",
            title: "Clear Results",
            description: "Clear steps. Clear communication. Clear ROI. That’s how scaling should feel."
        }
    ];

    const updateLine = () => {
        if (lineRef.current && firstCircleRef.current && lastCircleRef.current) {
            const firstRect = firstCircleRef.current.getBoundingClientRect();
            const lastRect = lastCircleRef.current.getBoundingClientRect();
            const containerRect = lineRef.current.parentElement?.getBoundingClientRect();

            if (containerRect) {
                const firstCenter = firstRect.top + firstRect.height / 2;
                const lastCenter = lastRect.top + lastRect.height / 2;
                const topOffset = firstCenter - containerRect.top;
                const height = lastCenter - firstCenter;

                gsap.set(lineRef.current, {
                    top: topOffset,
                    height: height,
                    display: "block"
                });
            }
        }
    };

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            updateLine();
            ScrollTrigger.addEventListener("refresh", updateLine);

            const stepElements = document.querySelectorAll(".process-step");
            stepElements.forEach((step, index) => {
                ScrollTrigger.create({
                    trigger: step,
                    start: "top center+=20%",
                    end: "bottom center+=20%",
                    onToggle: (self) => {
                        if (self.isActive) {
                            setActiveStep(index);
                        }
                    }
                });
            });
        }, componentRef);

        const resizeObserver = new ResizeObserver(() => {
            updateLine();
            ScrollTrigger.refresh();
        });

        if (componentRef.current) {
            resizeObserver.observe(componentRef.current);
        }

        return () => {
            ctx.revert();
            ScrollTrigger.removeEventListener("refresh", updateLine);
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <section ref={componentRef} className="bg-white text-black relative py-20 lg:py-0 border-t border-gray-100">

            <div className="container mx-auto px-4 lg:px-6 relative z-10">
                <div className="flex flex-col lg:flex-row">

                    {/* LEFT PANEL - FIXED STORYTELLING */}
                    <div className="lg:w-1/2 lg:h-screen lg:sticky lg:top-0 flex flex-col justify-center mb-16 lg:mb-0">
                        <div className="max-w-lg lg:max-w-xl">
                            <span className="text-gray-400 font-mono text-[10px] tracking-[0.2em] uppercase mb-8 block pl-1">
                                The Blueprint
                            </span>
                            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-[1.1] tracking-tight text-gray-900">
                                From Chaos To <br />
                                <span className="font-playfair italic text-[#ff4a01]">Predictable Revenue.</span>
                            </h2>
                            <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-md border-l-2 border-[#ff4a01] pl-6">
                                We don't just "do marketing" — we build systems that scale. Every choice is intentional.
                            </p>

                            <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#ff4a01] text-white font-bold tracking-wider uppercase rounded-full overflow-hidden transition-all hover:bg-[#e04101]">
                                <span className="relative z-10">Start The Journey</span>
                                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>

                    {/* RIGHT PANEL - SCROLLING TIMELINE */}
                    <div className="lg:w-1/2 relative lg:pl-16">
                        {/* Connecting Line */}
                        <div
                            ref={lineRef}
                            className="absolute left-[27px] lg:left-[89px] w-[2px] bg-gray-100 hidden lg:block z-0 origin-top"
                        />

                        <div className="flex flex-col gap-0">
                            {steps.map((step, index) => (
                                <div
                                    key={index}
                                    className={cn(
                                        "process-step min-h-[30vh] flex items-center py-8 lg:py-16 transition-all duration-500 ease-out group relative z-10",
                                        index === activeStep ? 'opacity-100' : 'opacity-40 grayscale'
                                    )}
                                >
                                    <div className="flex gap-6 lg:gap-12 relative w-full items-start">
                                        {/* Number Circle */}
                                        <div
                                            ref={index === 0 ? firstCircleRef : index === steps.length - 1 ? lastCircleRef : null}
                                            className="relative flex-none z-10 pt-1"
                                        >
                                            <div className={cn(
                                                "w-14 h-14 rounded-full flex items-center justify-center bg-white transition-all duration-300 border-2",
                                                index === activeStep
                                                    ? 'border-[#ff4a01] text-[#ff4a01] scale-110'
                                                    : 'border-gray-100 text-gray-300'
                                            )}>
                                                <span className="text-lg font-bold font-mono">{step.number}</span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="pt-2 max-w-md">
                                            <h3 className={cn(
                                                "text-2xl font-bold mb-3 tracking-tight transition-colors duration-300",
                                                index === activeStep ? 'text-black' : 'text-gray-400'
                                            )}>
                                                {step.title}
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed text-base lg:text-lg">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
