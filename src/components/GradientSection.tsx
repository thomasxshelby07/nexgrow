export default function GradientSection() {
    return (
        <section className="relative min-h-screen w-full overflow-hidden">
            {/* Clean Black-Orange Theme Gradient */}
            <div className="absolute inset-0">
                {/* Base Black Background */}
                <div className="absolute inset-0 bg-black"></div>

                {/* Simple Orange to Black Gradient - Top */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#ff4a01]/30 via-[#ff4a01]/15 via-black/50 to-black"></div>

                {/* Simple Orange to Black Gradient - Bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#ff4a01]/25 via-black/50 to-transparent"></div>

                {/* Left to Right Orange Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#ff4a01]/20 via-transparent to-transparent"></div>

                {/* Right to Left Orange Gradient */}
                <div className="absolute inset-0 bg-gradient-to-l from-orange-600/20 via-transparent to-transparent"></div>

                {/* Center Radial Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] bg-gradient-radial from-[#ff4a01]/40 via-[#ff4a01]/20 to-transparent blur-[100px]"></div>

                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-[#ff4a01]/35 via-transparent to-transparent blur-[80px]"></div>
                <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-gradient-radial from-orange-600/30 via-transparent to-transparent blur-[90px]"></div>

                {/* Subtle Vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_black_100%)] opacity-40"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 container mx-auto px-4 py-20 lg:py-32">
                {/* Your content will go here */}
            </div>
        </section>
    );
}
