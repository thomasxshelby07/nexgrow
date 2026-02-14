"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
    TrendingUp,
    MessageSquare,
    Share2,
    Zap,
    Lock,
    BarChart3,
    Globe,
    Mail,
    Ticket,
    Bot
} from "lucide-react";

/**
 * Stage 1 Data: INFRASTRUCTURE (Stats/Graphs)
 */
const statsLeft = [
    { id: "conversion", title: "Conversion", icon: TrendingUp, desc: "Graph View" },
    { id: "brand", title: "Brand loyalty", icon: MessageSquare, desc: "4.8" },
];

const statsRight = [
    { id: "optimization", title: "Optimization", icon: Zap, desc: "75" },
    { id: "security", title: "Secure connection", icon: Lock, desc: "https" },
    { id: "mobile", title: "Mobile Friendly", icon: Globe, desc: "Phone Mockup" },
];

/**
 * Stage 2 Data: INTEGRATIONS (Tools)
 */
const integrationsLeft = [
    { id: "email", title: "Email distribution", icon: Mail },
    { id: "ads", title: "ADS", icon: Share2 },
    { id: "social", title: "Social media", icon: MessageSquare },
];

const integrationsRight = [
    { id: "crm", title: "CRM", icon: BarChart3 },
    { id: "chat", title: "ChatBot", icon: Bot },
    { id: "ticket", title: "Tickets operator", icon: Ticket },
];

export default function IntegratedInfrastructure() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, { mass: 0.1, stiffness: 100, damping: 20 });

    // --- ANIMATION SEQUENCE (FIXED & DRAMATIC) ---
    // 1. Center Hub Drop: Starts WAY up (-350px) and drops to center (0).
    // This ensures visible movement even if user scrolls quickly.
    const hubY = useTransform(smoothProgress, [0, 0.6], [-350, 0]);
    const hubScale = useTransform(smoothProgress, [0, 0.5, 1], [1.1, 0.9, 1]);

    // 2. Stats Fade Out: 
    // Uses Opacity + Pointer Events (No display: none)
    const statsY = useTransform(smoothProgress, [0, 0.45], [0, -150]); // Move up as they fade
    const statsOpacity = useTransform(smoothProgress, [0.3, 0.5], [1, 0]);
    const statsPointerEvents = useTransform(smoothProgress, (val) => (val > 0.5 ? "none" : "auto"));

    // 3. Integrations Fade In:
    // Starts appearing as Stats fade out (Overlap at 0.45-0.5)
    // Moves from below (150px) to center (0)
    const toolsOpacity = useTransform(smoothProgress, [0.45, 0.7], [0, 1]);
    const toolsY = useTransform(smoothProgress, [0.45, 0.8], [150, 0]);
    const toolsPointerEvents = useTransform(smoothProgress, (val) => (val < 0.45 ? "none" : "auto"));

    // Header Animation
    const headerOpacity = useTransform(smoothProgress, [0.5, 0.7], [0, 1]);
    const headerY = useTransform(smoothProgress, [0.5, 0.7], [30, 0]);

    // Line Drawing Progress
    const lineDrawProgress = useTransform(smoothProgress, [0.55, 0.9], [0, 1]);

    return (
        <section
            ref={containerRef}
            className="relative h-[250vh] bg-[#f8f9fa] text-gray-900 overflow-hidden"
            id="infrastructure"
        >
            <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center py-20 overflow-hidden">

                {/* Background Grid - Visible on both */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] [background-size:40px_40px] pointer-events-none" />


                {/* =========================================================
                    DESKTOP ONLY CONTENT
                    Wrapped in hidden lg:block to preventing mobile overlap
                   ========================================================= */}
                <div className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none">

                    {/* Header */}
                    <motion.div
                        style={{ opacity: headerOpacity, y: headerY }}
                        className="absolute top-16 text-center z-40 px-4 w-full pointer-events-auto"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-black uppercase font-sans">
                            Then Integrate The Site <br />
                            Into Your <span className="font-playfair italic text-[#ff4a01]">Sales System</span>
                        </h2>
                    </motion.div>

                    {/* Stage 1: Stats (Bento) */}
                    <motion.div
                        style={{
                            opacity: statsOpacity,
                            y: statsY,
                            pointerEvents: statsPointerEvents as any
                        }}
                        className="absolute inset-0 flex items-center justify-center z-20"
                    >
                        <div className="relative w-full max-w-7xl h-[600px] flex justify-between items-center px-8 pointer-events-auto">
                            {/* Left Stats */}
                            <div className="flex flex-col gap-8 w-[350px]">
                                <StatsCard_Conversion />
                                <StatsCard_Brand />
                                <StatsCard_Sales />
                            </div>
                            {/* Right Stats */}
                            <div className="flex flex-col gap-8 w-[350px] ml-auto">
                                <StatsCard_Optimization />
                                <StatsCard_Secure />
                                <StatsCard_Mobile />
                            </div>
                        </div>
                    </motion.div>

                    {/* Stage 2: Integrations (Circuit) */}
                    <motion.div
                        style={{
                            opacity: toolsOpacity,
                            y: toolsY,
                            pointerEvents: toolsPointerEvents as any
                        }}
                        className="absolute inset-0 flex items-center justify-center z-30"
                    >
                        <div className="relative w-full max-w-[1400px] items-center justify-center h-[600px] translate-y-24 flex pointer-events-auto">

                            {/* Circuit Lines */}
                            <PipelineLines progress={lineDrawProgress} />

                            {/* Left Integrations */}
                            <div className="flex flex-col gap-20 relative z-20 w-[300px]">
                                {integrationsLeft.map((node, i) => (
                                    <IntegrationCard key={node.id} node={node} index={i} side="left" />
                                ))}
                            </div>

                            {/* Spacer */}
                            <div className="w-[500px]" />

                            {/* Right Integrations */}
                            <div className="flex flex-col gap-20 relative z-20 w-[300px]">
                                {integrationsRight.map((node, i) => (
                                    <IntegrationCard key={node.id} node={node} index={i} side="right" />
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Center Hub - Shared Desktop Element */}
                    <motion.div
                        style={{ y: hubY, scale: hubScale }}
                        className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none"
                    >
                        <div className="pointer-events-auto">
                            <CenterHub />
                        </div>
                    </motion.div>

                </div>


                {/* =========================================================
                    MOBILE VIEW (Strictly Separated)
                   ========================================================= */}
                <div className="flex lg:hidden flex-col w-full min-h-[100dvh] py-12 px-4 relative z-50 overflow-y-auto">

                    {/* Background Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

                    {/* Mobile Header */}
                    <div className="text-center mb-8 relative z-10">
                        <h2 className="text-3xl font-bold text-black uppercase leading-tight font-sans">
                            Integrate Into Your <br /><span className="font-playfair italic text-[#ff4a01]">Sales System</span>
                        </h2>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-6 relative flex-grow">
                        {/* TOP ROW */}
                        <div className="grid grid-cols-3 gap-3 w-full max-w-sm relative z-20">
                            {integrationsLeft.map((node) => (
                                <MobileGridCard key={node.id} node={node} />
                            ))}
                        </div>

                        {/* CENTER HUB */}
                        <div className="relative z-20 my-4">
                            <CenterHub mobile />
                            {/* Mobile Connectors */}
                            <svg className="absolute top-0 left-0 w-full h-full -z-10 overflow-visible pointer-events-none">
                                <line x1="16%" y1="-40" x2="50%" y2="50%" className="stroke-[#ff4a01] stroke-[2] stroke-dasharray-4" />
                                <line x1="50%" y1="-40" x2="50%" y2="50%" className="stroke-[#ff4a01] stroke-[2] stroke-dasharray-4" />
                                <line x1="84%" y1="-40" x2="50%" y2="50%" className="stroke-[#ff4a01] stroke-[2] stroke-dasharray-4" />

                                <line x1="16%" y1="calc(100% + 40px)" x2="50%" y2="50%" className="stroke-[#ff4a01] stroke-[2] stroke-dasharray-4" />
                                <line x1="50%" y1="calc(100% + 40px)" x2="50%" y2="50%" className="stroke-[#ff4a01] stroke-[2] stroke-dasharray-4" />
                                <line x1="84%" y1="calc(100% + 40px)" x2="50%" y2="50%" className="stroke-[#ff4a01] stroke-[2] stroke-dasharray-4" />
                            </svg>
                        </div>

                        {/* BOTTOM ROW */}
                        <div className="grid grid-cols-3 gap-3 w-full max-w-sm relative z-20">
                            {integrationsRight.map((node) => (
                                <MobileGridCard key={node.id} node={node} />
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

// --- SUB COMPONENTS ---

function CenterHub({ mobile = false }: { mobile?: boolean }) {
    return (
        <div className={`
      relative rounded-[2.5rem] 
      ${mobile ? "bg-[#0c1015]" : "bg-[#0c1015]"} 
      text-white
      shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]
      flex flex-col items-center justify-center
      border border-gray-700
      ${mobile ? "w-40 h-40" : "w-80 h-80"}
      transition-all duration-500 hover:shadow-[0_0_50px_-10px_rgba(255,74,1,0.4)]
      z-50
    `}>
            {/* Solid background for visibility */}
            <div className="absolute inset-0 rounded-[2.5rem] bg-[#0c1015]" />
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />

            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="mb-4 lg:mb-6 text-[#ff4a01] relative z-10"
            >
                <Globe size={mobile ? 48 : 96} strokeWidth={1} />
            </motion.div>

            <h3 className={`${mobile ? "text-lg" : "text-3xl"} font-bold tracking-tight text-white relative z-10`}>event.com</h3>
            {!mobile && (
                <div className="mt-4 px-4 py-1 rounded-full bg-[#ff4a01]/10 border border-[#ff4a01]/30 text-[#ff4a01] text-xs font-bold tracking-widest uppercase relative z-10">
                    Core Engine
                </div>
            )}
        </div>
    );
}

function IntegrationCard({ node, index, side }: any) {
    return (
        <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
            className="w-72 h-32 bg-white/95 rounded-2xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center px-6 gap-5 hover:border-[#ff4a01]/50 hover:shadow-[0_10px_30px_-5px_rgba(255,74,1,0.15)] transition-all z-20 group relative"
        >
            <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center text-gray-500 group-hover:text-[#ff4a01] group-hover:bg-orange-50 transition-colors shadow-sm">
                <node.icon size={26} strokeWidth={1.5} />
            </div>
            <span className="font-bold text-lg leading-tight text-gray-800 group-hover:text-black transition-colors">{node.title}</span>

            {/* Connection Node Point - Bottom for "Down-Then-Connect" logic */}
            <div className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-[2px] border-[#ff4a01] rounded-full shadow-[0_0_8px_#ff4a01] z-30`} />
        </motion.div>
    )
}

function MobileGridCard({ node }: any) {
    return (
        <motion.div
            whileTap={{ scale: 0.95 }}
            className="bg-white rounded-2xl aspect-square shadow-sm border border-gray-200 flex flex-col items-center justify-center gap-3 p-3 text-center"
        >
            <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-[#ff4a01] shadow-sm">
                <node.icon size={22} strokeWidth={1.5} />
            </div>
            <span className="text-xs font-bold text-gray-800 leading-tight">{node.title}</span>
        </motion.div>
    )
}

function PipelineLines({ progress }: { progress: any }) {
    return (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-visible">
            <svg className="w-full h-full overflow-visible">
                {/* --- LEFT SIDE --- */}
                <CircuitPath
                    progress={progress}
                    overrideD="M 22% 21% V 35% H 40% L 50% 50%"
                />
                <CircuitPath
                    progress={progress}
                    overrideD="M 22% 53% V 60% H 30% L 50% 50%"
                />
                <CircuitPath
                    progress={progress}
                    overrideD="M 22% 85% V 90% H 35% L 50% 50%"
                />

                {/* --- RIGHT SIDE --- */}
                <CircuitPath
                    progress={progress}
                    overrideD="M 78% 21% V 35% H 60% L 50% 50%"
                />
                <CircuitPath
                    progress={progress}
                    overrideD="M 78% 53% V 60% H 70% L 50% 50%"
                />
                <CircuitPath
                    progress={progress}
                    overrideD="M 78% 85% V 90% H 65% L 50% 50%"
                />
            </svg>
        </div>
    )
}

function CircuitPath({ progress, overrideD }: any) {
    return (
        <motion.path
            d={overrideD}
            stroke="#ff4a01"
            strokeWidth="3"
            strokeDasharray="8 8" // Dotted/Dashed
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            style={{ pathLength: progress, opacity: progress }}
        />
    )
}

// Stats Cards (Unchanged export)
function StatsCard_Conversion() {
    return (
        <div className="h-48 bg-white/95 rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between relative overflow-hidden group hover:border-[#ff4a01]/30 transition-colors">
            <span className="font-bold text-gray-900 z-10">Conversion</span>
            <div className="absolute bottom-0 left-0 w-full h-24 opacity-10 group-hover:opacity-20 transition-opacity">
                <svg viewBox="0 0 100 40" className="w-full h-full" preserveAspectRatio="none">
                    <path d="M0 40 L 20 25 L 40 30 L 70 10 L 100 5 V 40 H 0 Z" fill="#ff4a01" />
                </svg>
            </div>
            <div className="self-end w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center text-[#ff4a01] z-10">
                <TrendingUp size={20} />
            </div>
        </div>
    )
}

function StatsCard_Brand() {
    return (
        <div className="h-40 bg-gray-50 rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between hover:bg-white transition-colors">
            <div className="flex justify-between items-center">
                <span className="font-bold text-gray-900">Brand loyalty</span>
                <div className="px-3 py-1 rounded-full bg-[#ff4a01] text-white font-bold text-sm">4.8</div>
            </div>
            <div className="bg-white p-3 rounded-xl border border-gray-100 flex gap-3 items-center">
                <div className="w-8 h-8 bg-gray-900 rounded-full flex-shrink-0 flex items-center justify-center">
                    <span className="text-white text-xs">JP</span>
                </div>
                <div className="h-2 w-24 bg-gray-100 rounded-full" />
            </div>
        </div>
    )
}

function StatsCard_Sales() {
    return (
        <div className="h-40 bg-black rounded-2xl p-6 shadow-lg flex flex-col justify-center gap-2 group relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#ff4a01]/20 blur-3xl rounded-full" />
            <span className="font-bold text-gray-400 relative z-10">Sales</span>
            <span className="text-4xl font-bold text-white relative z-10">+12.5K</span>
            <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 bg-[#ff4a01] rounded-full animate-pulse" />
                <span className="text-xs text-gray-500 font-medium">Live updates</span>
            </div>
        </div>
    )
}

function StatsCard_Optimization() {
    return (
        <div className="h-48 bg-gray-50 rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center relative">
            <div className="absolute top-4 left-4 font-bold text-gray-900">Optimization</div>
            <div className="w-24 h-24 rounded-full border-8 border-white border-t-[#ff4a01] flex items-center justify-center text-3xl font-bold text-gray-900 shadow-sm bg-white">
                75
            </div>
        </div>
    )
}

function StatsCard_Secure() {
    return (
        <div className="h-40 bg-white/95 rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center relative overflow-hidden text-center group">
            <div className="absolute top-4 left-4 font-bold text-gray-900 z-10">Secure</div>
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-[#ff4a01] mb-1 group-hover:scale-110 transition-transform">
                <Lock size={24} />
            </div>
            <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">Encrypted</span>
        </div>
    )
}

function StatsCard_Mobile() {
    return (
        <div className="h-48 bg-white/95 rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-end relative overflow-hidden">
            <div className="absolute top-4 left-4 font-bold text-gray-900">Mobile First</div>
            <div className="w-32 h-40 bg-gray-50 rounded-t-3xl border-4 border-gray-100 flex justify-center pt-8 shadow-inner">
                <div className="w-10 h-1 bg-gray-200 rounded-full" />
            </div>
        </div>
    )
}
