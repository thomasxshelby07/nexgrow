"use client";

import { useRef, useEffect, useState, useLayoutEffect } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
            description: "Deep dive into your business model, audience and bottlenecks. We identify exactly where revenue is leaking."
        },
        {
            number: "02",
            title: "Strategy Blueprint",
            description: "Messaging angles, funnel structure and conversion path are mapped clearly — ensuring marketing is guided."
        },
        {
            number: "03",
            title: "Creation & Setup",
            description: "Scripts, high-quality creatives, landing pages, tracking and campaigns are built together as one connected journey."
        },
        {
            number: "04",
            title: "Launch & Optimization",
            description: "We launch, measure and refine continuously. Real user behaviour guides improvements every week."
        },
        {
            number: "05",
            title: "Scale & Automate",
            description: "Once winning patterns are found, we scale. Automation and workflows are implemented so growth continues."
        },
        {
            number: "06",
            title: "Clear Results",
            description: "Clear steps. Clear communication. Clear results. That’s how scaling should feel."
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

                // Relative to the parent container
                const topOffset = firstCenter - containerRect.top;
                const height = lastCenter - firstCenter;

                // Simple inline style or gsap set
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
            // Initial calculation
            updateLine();

            // Recalculate on refresh
            ScrollTrigger.addEventListener("refresh", updateLine);

            const stepElements = document.querySelectorAll(".process-step");
            stepElements.forEach((step, index) => {
                ScrollTrigger.create({
                    trigger: step,
                    start: "top center+=15%",
                    end: "bottom center+=15%",
                    onToggle: (self) => {
                        if (self.isActive) {
                            setActiveStep(index);
                        }
                    }
                });
            });
        }, componentRef);

        // ResizeObserver to handle layout shifts robustly
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
        <section ref={componentRef} className="bg-black text-white relative">

            <div className="container mx-auto px-4 lg:px-6 relative z-10">
                <div className="flex flex-col lg:flex-row">

                    {/* LEFT PANEL - FIXED STORYTELLING */}
                    <div className="lg:w-1/2 lg:h-screen lg:sticky lg:top-0 flex flex-col justify-center py-20 lg:py-0">
                        <div className="max-w-lg lg:max-w-4xl">
                            <span className="text-[#ff4a01] font-mono text-xs tracking-[0.2em] uppercase mb-6 block">
                                The Blueprint <br /> For Scale
                            </span>
                            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-[1.1] tracking-tight">
                                From Chaos To <br />
                                <span className="font-playfair italic text-[#ff4a01]">Predictable Revenue.</span>
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-md border-l-2 border-[#ff4a01]/20 pl-6">
                                Every collaboration starts with genuine understanding and grows through choices that are intentional. We don't just "do marketing" — we build systems that scale.
                            </p>

                            <button className="group relative px-8 py-4 bg-transparent text-white font-bold tracking-wider uppercase overflow-hidden rounded-full border border-[#ff4a01]/30 hover:border-[#ff4a01] transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,74,1,0.4)]">
                                <div className="absolute inset-0 w-full h-full bg-[#ff4a01]/10 group-hover:bg-[#ff4a01] transition-all duration-500 ease-out transform translate-y-full group-hover:translate-y-0"></div>
                                <span className="relative z-10 flex items-center gap-3 group-hover:gap-4 transition-all duration-300">
                                    Start The Journey
                                    <ArrowRight className="w-5 h-5" />
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* RIGHT PANEL - SCROLLING TIMELINE */}
                    <div className="lg:w-1/2 relative lg:pl-12 py-20 lg:py-0">
                        {/* Connecting Line (Mobile: Centered on circles ~28px, Desktop: ~75px because of pl-12) */}
                        <div
                            ref={lineRef}
                            className="absolute left-[27px] lg:left-[75px] w-[2px] bg-gray-800 hidden lg:block block z-0 origin-top"
                        />

                        <div className="flex flex-col gap-8 lg:gap-0">
                            {steps.map((step, index) => (
                                <div
                                    key={index}
                                    className={`
                                        process-step min-h-[30vh] lg:min-h-[25vh] flex items-center lg:py-10
                                        transition-all duration-500 ease-out group relative z-10
                                        ${index === activeStep ? 'opacity-100' : 'opacity-30'}
                                    `}
                                >
                                    <div className="flex gap-8 relative w-full">
                                        {/* Number Circle */}
                                        <div
                                            ref={index === 0 ? firstCircleRef : index === steps.length - 1 ? lastCircleRef : null}
                                            className="relative flex-none z-10"
                                        >
                                            <div className={`
                                                w-14 h-14 rounded-full border-2 flex items-center justify-center bg-black transition-all duration-500
                                                ${index === activeStep
                                                    ? 'border-[#ff4a01] text-[#ff4a01] shadow-[0_0_30px_rgba(255,74,1,0.4)] scale-110'
                                                    : 'border-gray-800 text-gray-600'}
                                            `}>
                                                <span className="text-lg font-bold font-mono">{step.number}</span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="pt-2 max-w-md">
                                            <h3 className={`text-2xl font-bold mb-4 tracking-wide uppercase transition-colors duration-300 
                                                ${index === activeStep ? 'text-white' : 'text-gray-500'}
                                            `}>
                                                {step.title}
                                            </h3>
                                            <p className="text-gray-400 leading-relaxed text-lg">
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
