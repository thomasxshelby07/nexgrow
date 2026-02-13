import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative flex flex-col items-center justify-start min-h-screen pt-36 pb-12 md:pt-40 md:pb-20 overflow-hidden bg-black selection:bg-[#ff4a01] selection:text-white">

            {/* Background Image Container */}
            <div className="absolute inset-0 w-full h-full z-0">
                <Image
                    src="/herobanner.png"
                    alt="Hero Background"
                    fill
                    className="object-cover opacity-100" // Fully visible
                    priority
                />
                {/* Lighter overlays so the image is clearly visible */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/90"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center w-full max-w-7xl px-4 mx-auto text-center space-y-6 md:space-y-8">

                {/* Main Headline */}
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-tight md:leading-[1.1] max-w-4xl md:max-w-5xl">
                    We Build Brands <br className="block" />
                    That <span className="font-playfair italic text-transparent bg-clip-text bg-gradient-to-r from-[#ff4a01] via-[#ff6a00] to-[#ff8040] animate-gradient pr-4">Lead</span>
                </h1>

                {/* Subtext */}
                <div className="relative px-5 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl mx-auto w-fit max-w-full">
                    <p className="text-xs md:text-lg text-white font-light tracking-wide whitespace-nowrap">
                        More than marketing. We build growth systems.
                    </p>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-10 md:pt-6 px-4 sm:px-0">
                    {/* Primary Button with Liquid Shine Effect - Sharp Corners */}
                    <button className="group relative w-full sm:w-auto px-8 py-4 text-white bg-[#ff4a01] text-base sm:text-lg font-bold overflow-hidden shadow-[0_0_20px_rgba(255,74,1,0.4)] transition-all transform hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(255,74,1,0.6)]">
                        <span className="relative z-10">Start Your Project</span>
                        {/* Liquid Shine Overlay */}
                        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"></div>
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>

                    {/* Secondary Button with Glass Glow - Sharp Corners */}
                    <button className="w-full sm:w-auto group flex items-center justify-center gap-3 px-8 py-4 text-white bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#ff4a01]/50 transition-all duration-300 text-base sm:text-lg font-medium hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 group-hover:text-[#ff4a01] transition-colors duration-300 group-hover:scale-110"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                        <span className="group-hover:text-white transition-colors">Book a Strategy Call</span>
                    </button>
                </div>

                {/* Social Proof Strip - Compact & Animated */}
                <div className="w-full max-w-6xl mt-16 md:mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 overflow-hidden">

                    {/* Happy Clients - Left Side (Static on Desktop, Top on Mobile) */}
                    <div className="flex items-center gap-4 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/5">
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-gray-800 flex items-center justify-center overflow-hidden relative">
                                    {/* Placeholder avatars based on index to give variety */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900"></div>
                                    <span className="text-[10px] md:text-xs text-white/40 relative z-10">{i}</span>
                                </div>
                            ))}
                        </div>
                        <div className="text-left flex flex-col">
                            <div className="flex text-[#ff4a01] gap-0.5 text-xs">
                                {'★★★★★'}
                            </div>
                            <p className="text-xs text-gray-300 font-medium whitespace-nowrap">100+ Happy Clients</p>
                        </div>
                    </div>

                    {/* Logos Marquee - Right Side (Animated) */}
                    <div className="relative w-full overflow-hidden mask-linear-fade">
                        <div className="flex animate-scroll hover:pause-on-hover gap-8 items-center min-w-max py-2">
                            {/* Duplicate logos 3 times for smooth infinite scroll */}
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="flex gap-8 md:gap-12 items-center flex-shrink-0">
                                    {['Bobcat', 'DOOSAN', 'ezc', 'Fivestar', 'Fusion', 'RNS'].map((logo, idx) => (
                                        <span key={`${i}-${idx}`} className="text-base md:text-xl font-bold text-white/30 hover:text-white transition-colors cursor-default whitespace-nowrap">{logo}</span>
                                    ))}
                                </div>
                            ))}
                        </div>
                        {/* Gradient Masks for Fade visual */}
                        <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
                        <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
                    </div>
                </div>

            </div>
        </section >
    );
}

