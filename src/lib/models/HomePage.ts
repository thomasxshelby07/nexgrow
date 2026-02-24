
import mongoose, { Schema } from "mongoose";

const HomePageSchema = new Schema({
    hero: {
        badge: { type: String, default: "Premium Video Editing" },
        title: { type: String, default: "Turn Raw Footage Into Viral Assets." },
        subtitle: { type: String, default: "We craft high-retention edits for Reels, YouTube, and Ads that stop the scroll and drive action." },
        trustText: { type: String, default: "50+ Projects Done" },
        trustRating: { type: String, default: "4.8+" },
        avatars: { type: [String], default: [] },
        heroImage: { type: String, default: "/herbanner.png" },
        ctaPrimary: {
            text: { type: String, default: "View Pricing" },
            link: { type: String, default: "#pricing" }
        },
        ctaSecondary: {
            text: { type: String, default: "See Portfolio" },
            link: { type: String, default: "#portfolio" }
        }
    },
    // Top-level Brands Ticker
    brands: [{
        name: String,
        logo: String,
    }],
    // Global CTA for "Book Call"
    ctaGlobal: {
        text: { type: String, default: "Book a Call" },
        link: { type: String, default: "#contact" }
    },
    // Scroller section
    services: [{
        title: String,
        link: String,
        images: [String],
        features: [String]
    }],
    servicesTitle: { type: String, default: "Our *Services*" },
    servicesSubtitle: { type: String, default: "Proprietary Core Infrastructure." },
    // Cards section
    expertise: [{
        title: String,
        icon: String,
        desc: String,
        features: [String]
    }],
    portfolio: [{
        title: String,
        category: String,
        image: String,
        videoUrl: String
    }],
    pricing: [{
        name: String,
        price: String,
        period: { type: String, default: "/mo" },
        desc: String,
        features: [String],
        isPopular: { type: Boolean, default: false },
        buttonText: { type: String, default: "Get Started" },
        buttonLink: { type: String, default: "#contact" }
    }],
    industries: [{
        title: String,
        image: String,
        link: String
    }],
    industriesTitle: { type: String, default: "We Know *Your* Business." },
    industriesSubtitle: { type: String, default: "EVERY INDUSTRY IS DIFFERENT. WE ADAPT OUR STRATEGY TO HOW YOUR CUSTOMERS ACTUALLY BUY." },
    industriesBtnText: { type: String, default: "START YOUR PROJECT" },
    visibility: {
        hero: { type: Boolean, default: true },
        services: { type: Boolean, default: true },
        expertise: { type: Boolean, default: true },
        portfolio: { type: Boolean, default: true },
        pricing: { type: Boolean, default: true },
        cta: { type: Boolean, default: true },
        industries: { type: Boolean, default: true }
    }
}, { timestamps: true, strict: false });

const HomePage = mongoose.models.HomePage || mongoose.model("HomePage", HomePageSchema);

export default HomePage;
