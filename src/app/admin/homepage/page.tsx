"use client";

import { useState, useEffect } from "react";
import { Loader2, Save, Eye, EyeOff, Trash, ArrowLeft, Search, ChevronDown, PhoneCall, Layout, Sparkles, Image as ImageIcon, Plus, Building2 } from "lucide-react";
import Link from "next/link";

const AVAILABLE_ROUTES = [
    { label: "Home Page", value: "/" },
    { label: "Blog Page", value: "/blog" },
    { label: "Projects Page", value: "/portfolio" },
    { label: "Services Page", value: "/services" },
    { label: "Contact Page", value: "/contact" },
    { label: "Video Editing Service", value: "/services/video-editing" },
    { label: "Logo Design Service", value: "/services/logo-design" },
    { label: "Web Development Service", value: "/services/web-development" },
    { label: "Expertise Section", value: "#expertise" },
    { label: "Services Section", value: "#services" },
    { label: "Portfolio Section", value: "#portfolio" },
    { label: "Pricing Section", value: "#pricing" },
    { label: "Contact Section", value: "#contact" },
];

function LinkSelector({ value, onChange }: { value: string, onChange: (val: string) => void }) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    const filtered = AVAILABLE_ROUTES.filter(r =>
        r.label.toLowerCase().includes(search.toLowerCase()) ||
        r.value.toLowerCase().includes(search.toLowerCase())
    );

    // Close on click outside (simplified for now)
    return (
        <div className="relative w-full">
            <div className="group relative flex items-center">
                <input
                    value={value || ""}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full p-4 pr-12 border-0 bg-white rounded-2xl font-bold transition-all outline-none focus:ring-4 ring-[#ff4a01]/10 shadow-sm"
                    placeholder="Enter link or select..."
                />
                <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className="absolute right-3 p-2 text-gray-400 hover:text-black hover:bg-gray-50 rounded-xl transition-all"
                >
                    <ChevronDown size={20} className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
                </button>
            </div>

            {open && (
                <>
                    <div className="fixed inset-0 z-[90]" onClick={() => setOpen(false)} />
                    <div className="absolute z-[100] top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-3xl shadow-2xl overflow-hidden max-h-72 flex flex-col animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-3 border-b border-gray-50 bg-gray-50/50">
                            <div className="flex items-center gap-3 bg-white p-3 rounded-2xl shadow-sm">
                                <Search size={16} className="text-[#ff4a01]" />
                                <input
                                    value={search}
                                    autoFocus
                                    onChange={e => setSearch(e.target.value)}
                                    className="bg-transparent text-sm font-bold outline-none w-full"
                                    placeholder="Search pages..."
                                />
                            </div>
                        </div>
                        <div className="overflow-y-auto thin-scrollbar p-2 space-y-1">
                            {filtered.length > 0 ? filtered.map((route) => (
                                <button
                                    key={route.value}
                                    type="button"
                                    onClick={() => {
                                        onChange(route.value);
                                        setOpen(false);
                                        setSearch("");
                                    }}
                                    className="w-full text-left px-4 py-3 rounded-xl transition-all hover:bg-gray-50 flex items-center justify-between group"
                                >
                                    <div className="flex flex-col">
                                        <span className="font-black text-xs uppercase tracking-wider text-gray-700 group-hover:text-black">{route.label}</span>
                                        <span className="text-[10px] font-mono text-gray-400">{route.value}</span>
                                    </div>
                                    {value === route.value && <div className="w-1.5 h-1.5 rounded-full bg-[#ff4a01]" />}
                                </button>
                            )) : (
                                <div className="p-8 text-center text-gray-400 text-xs font-bold uppercase tracking-widest">No routes found</div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

function deepClone(obj: any) {
    return JSON.parse(JSON.stringify(obj));
}

export default function AdminHomePageEditor() {
    const DEFAULT_CONFIG = {
        hero: {
            badge: "Top Rated Agency",
            title: "A *Complete* Team Behind Your **Brand**",
            subtitle: "Social media, performance marketing, websites and custom software under one roof.",
            ctaPrimary: { text: "Book a Call", link: "#contact" },
            ctaSecondary: { text: "", link: "" },
            brands: [],
            avatars: [],
            heroImage: ""
        },
        ctaGlobal: { text: "Book a Call", link: "#contact" },
        services: [],
        servicesTitle: "Our *Services*",
        servicesSubtitle: "Proprietary Core Infrastructure.",
        expertise: [],
        expertiseTitle: "*Expertise* Matrix",
        expertiseSubtitle: "Proprietary frameworks for scale.",
        portfolio: [],
        pricing: [],
        brands: [], // Separate brands list
        industries: [], // Added industries
        industriesTitle: "We Know *Your* Business.",
        industriesSubtitle: "EVERY INDUSTRY IS DIFFERENT. WE ADAPT OUR STRATEGY TO HOW YOUR CUSTOMERS ACTUALLY BUY.",
        industriesBtnText: "START YOUR PROJECT",
        visibility: { hero: true, services: true, expertise: true, portfolio: true, pricing: true, cta: true, industries: true }
    };

    const [config, setConfig] = useState<any>(DEFAULT_CONFIG);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        fetch("/api/admin/homepage")
            .then(res => res.json())
            .then(data => {
                // Consolidation and normalization
                const finalData = {
                    ...DEFAULT_CONFIG,
                    ...data,
                    hero: { ...DEFAULT_CONFIG.hero, ...(data?.hero || {}) },
                    services: (data?.services || []).map((s: any) => ({
                        title: s.title || "",
                        link: s.link || "",
                        images: Array.isArray(s.images) ? s.images : [],
                        features: Array.isArray(s.features) ? s.features : [],
                    })),
                    servicesTitle: data?.servicesTitle || DEFAULT_CONFIG.servicesTitle,
                    servicesSubtitle: data?.servicesSubtitle || DEFAULT_CONFIG.servicesSubtitle,
                    expertise: data?.expertise || [],
                    expertiseTitle: data?.expertiseTitle || DEFAULT_CONFIG.expertiseTitle,
                    expertiseSubtitle: data?.expertiseSubtitle || DEFAULT_CONFIG.expertiseSubtitle,
                    // Support both legacy hero.brands and new top-level brands
                    brands: data?.brands || data?.hero?.brands || [],
                    industries: (data?.industries || []).map((i: any) => ({
                        title: i.title || "",
                        image: i.image || "",
                        link: i.link || "",
                    })),
                    portfolio: data?.portfolio || [],
                    ctaGlobal: { ...DEFAULT_CONFIG.ctaGlobal, ...(data?.ctaGlobal || {}) },
                    visibility: { ...DEFAULT_CONFIG.visibility, ...(data?.visibility || {}) }
                };
                setConfig(finalData);
                setDataLoaded(true);
            })
            .catch(err => console.error("Error loading config:", err))
            .finally(() => setLoading(false));
    }, []);

    const handleSave = async () => {
        if (!dataLoaded) return alert("Please wait for data to load before saving.");

        setSaving(true);
        try {
            // Ensure we send exactly what the schema expects
            const dataToSave = deepClone(config);

            const res = await fetch("/api/admin/homepage", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataToSave)
            });

            if (res.ok) {
                // Re-fetch to confirm paths are exact as stored
                const response = await fetch("/api/admin/homepage");
                const fresh = await response.json();

                // Merge fresh data into state to ensure UI reflects DB state
                setConfig((prev: any) => ({
                    ...prev,
                    ...fresh,
                    // Keep specific UI states if needed, but ensure arrays are correct
                    services: (fresh?.services || []).map((s: any) => ({
                        title: s.title || "",
                        link: s.link || "",
                        images: Array.isArray(s.images) ? s.images : [],
                        features: Array.isArray(s.features) ? s.features : [],
                    }))
                }));
                alert("✨ SITE UPDATED SUCCESSFULLY!");
            } else {
                alert("❌ Save failed. Check server logs.");
            }
        } catch (e) {
            alert("❌ Network error while saving.");
        }
        setSaving(false);
    };

    const [activeSection, setActiveSection] = useState("hero");
    const [uploading, setUploading] = useState(false);
    const [servicesSearch, setServicesSearch] = useState("");
    const [expertiseSearch, setExpertiseSearch] = useState("");
    const [currentServiceIdx, setCurrentServiceIdx] = useState(0);
    const [currentExpertiseIdx, setCurrentExpertiseIdx] = useState(0);

    const handleBulkImageUpload = async (files: FileList, path: string) => {
        setUploading(true);
        const uploadedUrls: string[] = [];
        for (let i = 0; i < files.length; i++) {
            const formData = new FormData();
            formData.append("file", files[i]);
            try {
                const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
                const data = await res.json();
                if (data.url) uploadedUrls.push(data.url);
            } catch (e) { }
        }

        if (uploadedUrls.length > 0) {
            const newConfig = deepClone(config);
            const parts = path.split(".");
            let current = newConfig;
            for (let i = 0; i < parts.length - 1; i++) {
                if (parts[i].includes("[")) {
                    // Logic for array access if needed, but here parts are split by dot
                    // e.g. "services.0.images"
                }
                current = current[parts[i]];
            }
            const lastPart = parts[parts.length - 1];
            current[lastPart] = [...(current[lastPart] || []), ...uploadedUrls].slice(0, 16);
            setConfig(newConfig);
        }
        setUploading(false);
    };

    const handleImageUpload = async (file: File, path: string) => {
        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);
        try {
            const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
            const data = await res.json();
            if (data.url) {
                const newConfig = deepClone(config);
                const parts = path.split(".");
                let current = newConfig;
                for (let i = 0; i < parts.length - 1; i++) current = current[parts[i]];
                current[parts[parts.length - 1]] = data.url;
                setConfig(newConfig);
            }
        } catch (e) { }
        setUploading(false);
    };

    if (loading) return <div className="p-10 flex flex-col items-center gap-4"><Loader2 className="animate-spin text-[#ff4a01]" size={40} /><p className="text-gray-400 animate-pulse">Loading NexGrow Core...</p></div>;

    const navItems = [
        { id: "hero", label: "Hero", icon: Layout },
        { id: "brands", label: "Brands", icon: Sparkles },
        { id: "services", label: "Services", icon: ImageIcon },
        { id: "expertise", label: "Expertise", icon: PhoneCall },
        { id: "portfolio", label: "Portfolio", icon: Sparkles },
        { id: "industries", label: "Industries", icon: Building2 },
        { id: "cta", label: "CTA Button", icon: PhoneCall },
        { id: "visibility", label: "Visibility", icon: Eye }
    ];

    return (
        <div className="min-h-screen bg-white p-4 md:p-8 pb-32 selection:bg-[#ff4a01] selection:text-white">
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/dashboard" className="p-2 hover:bg-gray-100 rounded-xl transition-colors"><ArrowLeft size={24} /></Link>
                        <h1 className="text-4xl font-black tracking-tighter">Edit Site Configuration</h1>
                    </div>
                    <button onClick={handleSave} disabled={saving || uploading}
                        className="px-8 py-3 bg-black text-white rounded-2xl flex items-center justify-center gap-3 hover:bg-[#ff4a01] transition-all transform active:scale-95 disabled:opacity-50 shadow-xl shadow-black/10">
                        {saving ? <Loader2 className="animate-spin w-5 h-5" /> : <Save size={20} />}
                        <span className="font-black uppercase tracking-widest text-sm">Save Everything</span>
                    </button>
                </div>

                <div className="flex gap-2 mb-12 overflow-x-auto pb-4 no-scrollbar border-b border-gray-100">
                    {navItems.map(item => {
                        const Icon = item.icon;
                        return (
                            <button key={item.id} onClick={() => setActiveSection(item.id)}
                                className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center gap-2 whitespace-nowrap
                                    ${activeSection === item.id ? "bg-black text-white shadow-2xl scale-105" : "text-gray-400 hover:text-black hover:bg-gray-50"}`}>
                                <Icon size={16} />
                                {item.label}
                            </button>
                        );
                    })}
                </div>

                {activeSection === "hero" && (
                    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="bg-gray-50 p-8 rounded-[32px] border border-gray-100">
                            <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
                                <div className="w-10 h-10 bg-[#ff4a01] text-white rounded-xl flex items-center justify-center"><Layout size={20} /></div>
                                Hero Content
                            </h2>
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Badge Text</label>
                                        <input value={config.hero.badge} onChange={e => setConfig({ ...config, hero: { ...config.hero, badge: e.target.value } })}
                                            className="w-full p-4 border-0 bg-white rounded-2xl font-bold focus:ring-4 ring-[#ff4a01]/10 transition-all outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Headline (use **Box** and *Italic*)</label>
                                        <input value={config.hero.title} onChange={e => setConfig({ ...config, hero: { ...config.hero, title: e.target.value } })}
                                            className="w-full p-4 border-0 bg-white rounded-2xl font-bold focus:ring-4 ring-[#ff4a01]/10 transition-all outline-none" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Subtitle</label>
                                    <textarea value={config.hero.subtitle} onChange={e => setConfig({ ...config, hero: { ...config.hero, subtitle: e.target.value } })}
                                        className="w-full p-4 border-0 bg-white rounded-2xl font-bold focus:ring-4 ring-[#ff4a01]/10 transition-all outline-none min-h-[100px]" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Hero Image / Banner</label>
                                    <div className="flex gap-3">
                                        <input value={config.hero.heroImage || ""} onChange={e => setConfig({ ...config, hero: { ...config.hero, heroImage: e.target.value } })}
                                            className="flex-1 p-4 border-0 bg-white rounded-2xl font-mono text-[10px] focus:ring-4 ring-[#ff4a01]/10 transition-all outline-none truncate" />
                                        <input type="file" id="hero-img" className="hidden" onChange={e => e.target.files && handleImageUpload(e.target.files[0], "hero.heroImage")} />
                                        <label htmlFor="hero-img" className="p-4 bg-black text-white rounded-2xl cursor-pointer hover:bg-[#ff4a01] transition-colors"><ImageIcon size={20} /></label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeSection === "brands" && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="bg-gray-50 p-8 rounded-[32px] border border-gray-100">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-black flex items-center gap-3">
                                    <div className="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center"><Sparkles size={20} /></div>
                                    Trusted Brands
                                </h2>
                                <button onClick={() => {
                                    const newConfig = deepClone(config);
                                    newConfig.brands.push({ name: "New Brand", logo: "" });
                                    setConfig(newConfig);
                                }} className="bg-black text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#ff4a01] transition-all">+ ADD BRAND</button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {config.brands.map((brand: any, idx: number) => (
                                    <div key={idx} className="bg-white p-4 rounded-3xl border border-gray-100 flex items-center gap-4 group">
                                        <div className="relative w-20 h-12 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border border-dashed border-gray-200">
                                            {brand.logo ? <img src={brand.logo} className="w-full h-full object-contain" /> : <div className="w-full h-full flex items-center justify-center text-gray-300"><ImageIcon size={20} /></div>}
                                            <input type="file" id={`brand-${idx}`} className="hidden" onChange={e => e.target.files && handleImageUpload(e.target.files[0], `brands.${idx}.logo`)} />
                                            <label htmlFor={`brand-${idx}`} className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white cursor-pointer transition-opacity"><Plus size={16} /></label>
                                        </div>
                                        <div className="flex-1">
                                            <input value={brand.name} onChange={e => {
                                                const newConfig = deepClone(config);
                                                newConfig.brands[idx].name = e.target.value;
                                                setConfig(newConfig);
                                            }} className="w-full font-bold text-sm bg-transparent outline-none focus:text-[#ff4a01]" placeholder="Brand Name..." />
                                        </div>
                                        <button onClick={() => {
                                            const newConfig = deepClone(config);
                                            newConfig.brands.splice(idx, 1);
                                            setConfig(newConfig);
                                        }} className="p-2 text-gray-200 hover:text-red-500 transition-colors"><Trash size={16} /></button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeSection === "services" && (
                    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Section Header Controls */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-8 rounded-[32px] border border-gray-100 shadow-sm mb-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Section Headline (use *Italic*)</label>
                                <input value={config.servicesTitle || ""} onChange={e => setConfig({ ...config, servicesTitle: e.target.value })}
                                    className="w-full p-4 border-0 bg-white rounded-2xl font-bold focus:ring-4 ring-[#ff4a01]/10 transition-all outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Subtitle / Tagline</label>
                                <input value={config.servicesSubtitle || ""} onChange={e => setConfig({ ...config, servicesSubtitle: e.target.value })}
                                    className="w-full p-4 border-0 bg-white rounded-2xl font-bold focus:ring-4 ring-[#ff4a01]/10 transition-all outline-none" />
                            </div>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-8 min-h-[700px]">
                            <div className="w-full lg:w-80 bg-gray-50 rounded-[32px] border border-gray-100 flex flex-col overflow-hidden">
                                <div className="p-6 border-b border-gray-200/50 space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-black text-[10px] uppercase tracking-widest text-gray-400">Services Index</h3>
                                        <button onClick={() => {
                                            const newConfig = deepClone(config);
                                            newConfig.services.push({ title: "New Service", link: "", images: [], features: [] });
                                            setConfig(newConfig);
                                            setCurrentServiceIdx(newConfig.services.length - 1);
                                        }} className="text-[10px] bg-black text-white px-3 py-1.5 rounded-xl uppercase font-black hover:bg-[#ff4a01] transition-all">+ NEW</button>
                                    </div>
                                    <div className="flex items-center gap-2 bg-white rounded-2xl px-4 py-2 ring-1 ring-black/5 focus-within:ring-[#ff4a01]/20 transition-all">
                                        <Search size={16} className="text-gray-300" />
                                        <input value={servicesSearch} onChange={e => setServicesSearch(e.target.value)} placeholder="Search..." className="w-full outline-none text-sm font-bold bg-transparent" />
                                    </div>
                                </div>
                                <div className="flex-1 overflow-y-auto thin-scrollbar px-3 py-4 space-y-2">
                                    {config.services.filter((s: any) => s.title.toLowerCase().includes(servicesSearch.toLowerCase())).map((service: any, i: number) => {
                                        const actualIdx = config.services.indexOf(service);
                                        const isSelected = currentServiceIdx === actualIdx;
                                        return (
                                            <button key={actualIdx} onClick={() => setCurrentServiceIdx(actualIdx)}
                                                className={`w-full text-left p-4 rounded-2xl transition-all flex items-center justify-between group
                                                ${isSelected ? "bg-black text-white shadow-xl scale-[1.02]" : "hover:bg-white text-gray-500 hover:text-black"}`}>
                                                <span className="truncate font-black text-xs uppercase tracking-wider">{service.title || "Untitled"}</span>
                                                {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-[#ff4a01] shadow-[0_0_10px_#ff4a01]" />}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="flex-1 bg-gray-50 rounded-[32px] border border-gray-100 overflow-y-auto p-8 thin-scrollbar shadow-sm">
                                {config.services[currentServiceIdx] ? (
                                    <div className="space-y-8">
                                        <div className="flex justify-between items-center border-b border-gray-200 pb-6">
                                            <h2 className="text-3xl font-black tracking-tight">Service Details</h2>
                                            <button onClick={() => {
                                                if (confirm("Delete this service?")) {
                                                    const newConfig = deepClone(config);
                                                    newConfig.services.splice(currentServiceIdx, 1);
                                                    setConfig(newConfig);
                                                    setCurrentServiceIdx(0);
                                                }
                                            }} className="p-3 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-2xl transition-all"><Trash size={20} /></button>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Service Name</label>
                                                <input value={config.services[currentServiceIdx].title} onChange={e => {
                                                    const newConfig = deepClone(config);
                                                    newConfig.services[currentServiceIdx].title = e.target.value;
                                                    setConfig(newConfig);
                                                }} className="w-full p-4 bg-white rounded-2xl font-bold transition-all outline-none focus:ring-4 ring-[#ff4a01]/10" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Destination URL</label>
                                                <LinkSelector value={config.services[currentServiceIdx].link} onChange={val => {
                                                    const newConfig = deepClone(config);
                                                    newConfig.services[currentServiceIdx].link = val;
                                                    setConfig(newConfig);
                                                }} />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Service Features (Comma Separated)</label>
                                            <textarea value={config.services[currentServiceIdx].features?.join(", ") || ""}
                                                onChange={e => {
                                                    const newConfig = deepClone(config);
                                                    newConfig.services[currentServiceIdx].features = e.target.value.split(",").map(f => f.trim()).filter(f => f !== "");
                                                    setConfig(newConfig);
                                                }} placeholder="4K Quality, Fast Delivery..."
                                                className="w-full p-4 bg-white rounded-2xl font-bold transition-all outline-none focus:ring-4 ring-[#ff4a01]/10 min-h-[100px]" />
                                        </div>

                                        <div className="space-y-6">
                                            <div className="flex justify-between items-end">
                                                <div className="space-y-1">
                                                    <h3 className="text-lg font-black tracking-tight">Service Gallery</h3>
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Uploaded: {config.services[currentServiceIdx].images?.length || 0} / 16</p>
                                                </div>
                                                <div className="relative">
                                                    <input type="file" multiple id="bulk-upload" onChange={e => e.target.files && handleBulkImageUpload(e.target.files, `services.${currentServiceIdx}.images`)} className="hidden" />
                                                    <label htmlFor="bulk-upload" className="px-6 py-3 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-[#ff4a01] cursor-pointer transition-all flex items-center gap-2 shadow-lg">
                                                        {uploading ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />} Bulk Upload
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                {config.services[currentServiceIdx].images?.map((img: string, idx: number) => (
                                                    <div key={idx} className="group relative aspect-square rounded-[32px] overflow-hidden bg-white border border-gray-100 shadow-sm transition-all hover:scale-[1.02]">
                                                        <img src={img} className="w-full h-full object-cover" />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                            <button onClick={() => {
                                                                const newConfig = deepClone(config);
                                                                newConfig.services[currentServiceIdx].images.splice(idx, 1);
                                                                setConfig(newConfig);
                                                            }} className="p-3 bg-white/20 backdrop-blur-md text-white rounded-2xl hover:bg-red-500 transition-colors"><Trash size={18} /></button>
                                                        </div>
                                                    </div>
                                                ))}
                                                {uploading && <div className="aspect-square rounded-[32px] bg-gray-100 flex items-center justify-center animate-pulse"><Loader2 size={24} className="animate-spin text-gray-300" /></div>}
                                            </div>
                                        </div>
                                    </div>
                                ) : <div className="h-full flex flex-col items-center justify-center text-gray-300 gap-4"><ImageIcon size={48} /><p className="font-bold text-sm uppercase tracking-widest">Select a service to edit gallery</p></div>}
                            </div>
                        </div>
                    </div>
                )}

                {activeSection === "expertise" && (
                    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Section Header Controls */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-8 rounded-[32px] border border-gray-100 shadow-sm mb-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Section Headline (use *Italic*)</label>
                                <input value={config.expertiseTitle || ""} onChange={e => setConfig({ ...config, expertiseTitle: e.target.value })}
                                    className="w-full p-4 border-0 bg-white rounded-2xl font-bold focus:ring-4 ring-[#ff4a01]/10 transition-all outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Subtitle / Tagline</label>
                                <input value={config.expertiseSubtitle || ""} onChange={e => setConfig({ ...config, expertiseSubtitle: e.target.value })}
                                    className="w-full p-4 border-0 bg-white rounded-2xl font-bold focus:ring-4 ring-[#ff4a01]/10 transition-all outline-none" />
                            </div>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-8 min-h-[700px]">
                            <div className="w-full lg:w-80 bg-gray-50 rounded-[32px] border border-gray-100 flex flex-col overflow-hidden">
                                <div className="p-6 border-b border-gray-200/50 space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-black text-[10px] uppercase tracking-widest text-gray-400">Expertise Index</h3>
                                        <button onClick={() => {
                                            const newConfig = deepClone(config);
                                            newConfig.expertise.push({ title: "New Expertise", desc: "", features: [] });
                                            setConfig(newConfig);
                                            setCurrentExpertiseIdx(newConfig.expertise.length - 1);
                                        }} className="text-[10px] bg-black text-white px-3 py-1.5 rounded-xl uppercase font-black hover:bg-[#ff4a01] transition-all">+ NEW</button>
                                    </div>
                                    <div className="flex items-center gap-2 bg-white rounded-2xl px-4 py-2 ring-1 ring-black/5 focus-within:ring-[#ff4a01]/20 transition-all">
                                        <Search size={16} className="text-gray-300" />
                                        <input value={expertiseSearch} onChange={e => setExpertiseSearch(e.target.value)} placeholder="Search Expertise..." className="w-full outline-none text-sm font-bold bg-transparent" />
                                    </div>
                                </div>
                                <div className="flex-1 overflow-y-auto thin-scrollbar px-3 py-4 space-y-2">
                                    {config.expertise.filter((s: any) => (s.title || "").toLowerCase().includes(expertiseSearch.toLowerCase())).map((item: any, i: number) => {
                                        const actualIdx = config.expertise.indexOf(item);
                                        const isSelected = currentExpertiseIdx === actualIdx;
                                        return (
                                            <button key={actualIdx} onClick={() => setCurrentExpertiseIdx(actualIdx)}
                                                className={`w-full text-left p-4 rounded-2xl transition-all flex items-center justify-between group
                                                ${isSelected ? "bg-black text-white shadow-xl scale-[1.02]" : "hover:bg-white text-gray-500 hover:text-black"}`}>
                                                <span className="truncate font-black text-xs uppercase tracking-wider">{item.title || "Untitled"}</span>
                                                {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-[#ff4a01] shadow-[0_0_10px_#ff4a01]" />}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="flex-1 bg-gray-50 rounded-[32px] border border-gray-100 overflow-y-auto p-8 thin-scrollbar shadow-sm">
                                {config.expertise[currentExpertiseIdx] ? (
                                    <div className="space-y-8">
                                        <div className="flex justify-between items-center border-b border-gray-200 pb-6">
                                            <h2 className="text-3xl font-black tracking-tight">Expertise Details</h2>
                                            <button onClick={() => {
                                                if (confirm("Delete this expertise item?")) {
                                                    const newConfig = deepClone(config);
                                                    newConfig.expertise.splice(currentExpertiseIdx, 1);
                                                    setConfig(newConfig);
                                                    setCurrentExpertiseIdx(0);
                                                }
                                            }} className="p-3 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-2xl transition-all"><Trash size={20} /></button>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Expertise Title</label>
                                                <input value={config.expertise[currentExpertiseIdx].title} onChange={e => {
                                                    const newConfig = deepClone(config);
                                                    newConfig.expertise[currentExpertiseIdx].title = e.target.value;
                                                    setConfig(newConfig);
                                                }} className="w-full p-4 bg-white rounded-2xl font-bold transition-all outline-none focus:ring-4 ring-[#ff4a01]/10" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Description</label>
                                                <input value={config.expertise[currentExpertiseIdx].desc} onChange={e => {
                                                    const newConfig = deepClone(config);
                                                    newConfig.expertise[currentExpertiseIdx].desc = e.target.value;
                                                    setConfig(newConfig);
                                                }} className="w-full p-4 bg-white rounded-2xl font-bold transition-all outline-none focus:ring-4 ring-[#ff4a01]/10" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Model Image</label>
                                                <div className="flex gap-3">
                                                    <input value={config.expertise[currentExpertiseIdx].image || ""} onChange={e => {
                                                        const newConfig = deepClone(config);
                                                        newConfig.expertise[currentExpertiseIdx].image = e.target.value;
                                                        setConfig(newConfig);
                                                    }} className="flex-1 p-4 border-0 bg-white rounded-2xl font-mono text-[10px] focus:ring-4 ring-[#ff4a01]/10 transition-all outline-none truncate" />
                                                    <input type="file" id={`expertise-img-${currentExpertiseIdx}`} className="hidden" onChange={e => e.target.files && handleImageUpload(e.target.files[0], `expertise.${currentExpertiseIdx}.image`)} />
                                                    <label htmlFor={`expertise-img-${currentExpertiseIdx}`} className="p-4 bg-black text-white rounded-2xl cursor-pointer hover:bg-[#ff4a01] transition-colors"><ImageIcon size={20} /></label>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Background Image</label>
                                                <div className="flex gap-3">
                                                    <input value={config.expertise[currentExpertiseIdx].bgImage || ""} onChange={e => {
                                                        const newConfig = deepClone(config);
                                                        newConfig.expertise[currentExpertiseIdx].bgImage = e.target.value;
                                                        setConfig(newConfig);
                                                    }} className="flex-1 p-4 border-0 bg-white rounded-2xl font-mono text-[10px] focus:ring-4 ring-[#ff4a01]/10 transition-all outline-none truncate" />
                                                    <input type="file" id={`expertise-bg-${currentExpertiseIdx}`} className="hidden" onChange={e => e.target.files && handleImageUpload(e.target.files[0], `expertise.${currentExpertiseIdx}.bgImage`)} />
                                                    <label htmlFor={`expertise-bg-${currentExpertiseIdx}`} className="p-4 bg-black text-white rounded-2xl cursor-pointer hover:bg-[#ff4a01] transition-colors"><ImageIcon size={20} /></label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Expertise Features (Comma Separated)</label>
                                            <textarea value={config.expertise[currentExpertiseIdx].features?.join(", ") || ""}
                                                onChange={e => {
                                                    const newConfig = deepClone(config);
                                                    newConfig.expertise[currentExpertiseIdx].features = e.target.value.split(",").map(f => f.trim()).filter(f => f !== "");
                                                    setConfig(newConfig);
                                                }} placeholder="Feature 1, Feature 2..."
                                                className="w-full p-4 bg-white rounded-2xl font-bold transition-all outline-none focus:ring-4 ring-[#ff4a01]/10 min-h-[100px]" />
                                        </div>
                                    </div>
                                ) : <div className="h-full flex flex-col items-center justify-center text-gray-300 gap-4"><ImageIcon size={48} /><p className="font-bold text-sm uppercase tracking-widest">Select an item to edit</p></div>}
                            </div>
                        </div>
                    </div>
                )}

                {activeSection === "portfolio" && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="bg-gray-50 p-8 rounded-[32px] border border-gray-100 shadow-sm">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-black flex items-center gap-3">
                                    <div className="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center"><Sparkles size={20} /></div>
                                    Case Studies / Portfolio
                                </h2>
                                <button onClick={() => {
                                    const newConfig = deepClone(config);
                                    newConfig.portfolio = Array.isArray(newConfig.portfolio) ? newConfig.portfolio : [];
                                    newConfig.portfolio.push({ title: "New Project", category: "Category", description: "", image: "", result: "" });
                                    setConfig(newConfig);
                                }} className="bg-black text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#ff4a01] transition-all">+ ADD PROJECT</button>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                {(config.portfolio || []).map((project: any, idx: number) => (
                                    <div key={idx} className="bg-white p-6 rounded-[32px] border border-gray-100 group relative shadow-sm hover:shadow-md transition-all">
                                        <button onClick={() => {
                                            const newConfig = deepClone(config);
                                            newConfig.portfolio.splice(idx, 1);
                                            setConfig(newConfig);
                                        }} className="absolute top-6 right-6 p-2 text-gray-200 hover:text-red-500 transition-colors z-10"><Trash size={20} /></button>

                                        <div className="flex flex-col md:flex-row gap-8">
                                            {/* Image Upload */}
                                            <div className="w-full md:w-64">
                                                <div className="relative aspect-[4/3] bg-gray-50 rounded-2xl overflow-hidden border border-dashed border-gray-200 group/img">
                                                    {project.image ? <img src={project.image} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-300"><ImageIcon size={32} /></div>}
                                                    <input type="file" id={`portfolio-img-${idx}`} className="hidden" onChange={e => {
                                                        if (e.target.files) handleImageUpload(e.target.files[0], `portfolio.${idx}.image`);
                                                    }} />
                                                    <label htmlFor={`portfolio-img-${idx}`} className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center text-white cursor-pointer transition-opacity">
                                                        <Plus size={24} />
                                                    </label>
                                                </div>
                                                <p className="text-[10px] font-black text-center text-gray-400 mt-2 uppercase tracking-widest">Recommended: 1200x800</p>
                                            </div>

                                            {/* Fields */}
                                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Project Title</label>
                                                    <input value={project.title || ""} onChange={e => {
                                                        const newConfig = deepClone(config);
                                                        newConfig.portfolio[idx].title = e.target.value;
                                                        setConfig(newConfig);
                                                    }} className="w-full p-4 bg-gray-50 border-0 rounded-2xl font-bold outline-none focus:ring-4 ring-[#ff4a01]/5" placeholder="Project Name" />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</label>
                                                    <input value={project.category || ""} onChange={e => {
                                                        const newConfig = deepClone(config);
                                                        newConfig.portfolio[idx].category = e.target.value;
                                                        setConfig(newConfig);
                                                    }} className="w-full p-4 bg-gray-50 border-0 rounded-2xl font-bold outline-none focus:ring-4 ring-[#ff4a01]/5" placeholder="e.g. E-Commerce" />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Result Highlight</label>
                                                    <input value={project.result || ""} onChange={e => {
                                                        const newConfig = deepClone(config);
                                                        newConfig.portfolio[idx].result = e.target.value;
                                                        setConfig(newConfig);
                                                    }} className="w-full p-4 bg-gray-50 border-0 rounded-2xl font-bold outline-none focus:ring-4 ring-[#ff4a01]/5" placeholder="e.g. 8.5x ROAS" />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Video URL (Optional)</label>
                                                    <input value={project.videoUrl || ""} onChange={e => {
                                                        const newConfig = deepClone(config);
                                                        newConfig.portfolio[idx].videoUrl = e.target.value;
                                                        setConfig(newConfig);
                                                    }} className="w-full p-4 bg-gray-50 border-0 rounded-2xl font-bold outline-none focus:ring-4 ring-[#ff4a01]/5" placeholder="https://youtube.com/..." />
                                                </div>
                                                <div className="col-span-1 md:col-span-2 space-y-1">
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Short Description</label>
                                                    <textarea value={project.description || ""} onChange={e => {
                                                        const newConfig = deepClone(config);
                                                        newConfig.portfolio[idx].description = e.target.value;
                                                        setConfig(newConfig);
                                                    }} className="w-full p-4 bg-gray-50 border-0 rounded-2xl font-bold outline-none focus:ring-4 ring-[#ff4a01]/5 min-h-[80px]" placeholder="Explain the impact..." />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {(config.portfolio || []).length === 0 && (
                                <div className="p-20 text-center bg-white border border-dashed border-gray-200 rounded-[32px]">
                                    <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No Projects Added Yet</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeSection === "visibility" && (
                    <div className="bg-gray-50 p-8 rounded-[32px] border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-2xl font-black mb-6">Global Section Visibility</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {Object.keys(config.visibility || {}).map(section => {
                                const active = config.visibility[section];
                                return (
                                    <button key={section} onClick={() => {
                                        const newCfg = deepClone(config);
                                        newCfg.visibility[section] = !active;
                                        setConfig(newCfg);
                                    }} className={`p-6 rounded-3xl border transition-all text-left flex flex-col justify-between h-32 ${active ? "bg-white border-[#ff4a01] shadow-xl ring-1 ring-[#ff4a01]" : "bg-white/50 border-gray-200 grayscale opacity-60"}`}>
                                        <div className="flex justify-between items-start">
                                            <div className={`p-2 rounded-xl ${active ? "bg-[#ff4a01] text-white" : "bg-gray-200 text-gray-400"}`}>{active ? <Eye size={18} /> : <EyeOff size={18} />}</div>
                                            <div className={`w-10 h-6 rounded-full relative transition-colors ${active ? "bg-[#ff4a01]" : "bg-gray-200"}`}>
                                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${active ? "left-5" : "left-1"}`} />
                                            </div>
                                        </div>
                                        <span className={`font-black text-xs uppercase tracking-widest ${active ? "text-black" : "text-gray-400"}`}>{section}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {activeSection === "cta" && (
                    <div className="bg-gray-50 p-8 rounded-[32px] border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#ff4a01] text-white rounded-xl flex items-center justify-center"><PhoneCall size={20} /></div>
                            Book Call Button
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Button Text</label>
                                <input value={config.ctaGlobal?.text || ""} onChange={e => setConfig({ ...config, ctaGlobal: { ...config.ctaGlobal, text: e.target.value } })}
                                    className="w-full p-4 bg-white rounded-2xl font-bold outline-none focus:ring-4 ring-[#ff4a01]/10 transition-all shadow-sm" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Button Link</label>
                                <LinkSelector value={config.ctaGlobal?.link || ""} onChange={val => setConfig({ ...config, ctaGlobal: { ...config.ctaGlobal, link: val } })} />
                            </div>
                        </div>
                    </div>
                )}

                {activeSection === "industries" && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="bg-gray-50 p-8 rounded-[32px] border border-gray-100">
                            <div className="space-y-6 mb-12 border-b border-gray-100 pb-12">
                                <h3 className="text-lg font-black uppercase tracking-widest text-[#ff4a01]">Main Content</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Headline (use *Italic*)</label>
                                        <input value={config.industriesTitle || ""} onChange={e => setConfig({ ...config, industriesTitle: e.target.value })}
                                            className="w-full p-4 border-0 bg-white rounded-2xl font-bold focus:ring-4 ring-[#ff4a01]/10 transition-all outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Button Text</label>
                                        <input value={config.industriesBtnText || ""} onChange={e => setConfig({ ...config, industriesBtnText: e.target.value })}
                                            className="w-full p-4 border-0 bg-white rounded-2xl font-bold focus:ring-4 ring-[#ff4a01]/10 transition-all outline-none" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Subtitle / Tagline</label>
                                    <textarea value={config.industriesSubtitle || ""} onChange={e => setConfig({ ...config, industriesSubtitle: e.target.value })}
                                        className="w-full p-4 border-0 bg-white rounded-2xl font-bold focus:ring-4 ring-[#ff4a01]/10 transition-all outline-none min-h-[80px]" />
                                </div>
                            </div>

                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-black flex items-center gap-3">
                                    <div className="w-10 h-10 bg-[#ff4a01] text-white rounded-xl flex items-center justify-center"><Building2 size={20} /></div>
                                    Industry Cards
                                </h2>
                                <button onClick={() => {
                                    const newConfig = deepClone(config);
                                    newConfig.industries.push({ title: "New Industry", image: "", link: "" });
                                    setConfig(newConfig);
                                }} className="bg-black text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#ff4a01] transition-all">+ ADD INDUSTRY</button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {config.industries.map((industry: any, idx: number) => (
                                    <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-100 space-y-4 group relative shadow-sm">
                                        <button onClick={() => {
                                            const newConfig = deepClone(config);
                                            newConfig.industries.splice(idx, 1);
                                            setConfig(newConfig);
                                        }} className="absolute top-4 right-4 p-2 text-gray-200 hover:text-red-500 transition-colors"><Trash size={16} /></button>

                                        <div className="flex items-center gap-6">
                                            <div className="relative w-20 h-20 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0 border border-dashed border-gray-200 group-hover:border-[#ff4a01]/30 transition-colors">
                                                {industry.image ? <img src={industry.image} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-300"><ImageIcon size={24} /></div>}
                                                <input type="file" id={`industry-${idx}`} className="hidden" onChange={e => e.target.files && handleImageUpload(e.target.files[0], `industries.${idx}.image`)} />
                                                <label htmlFor={`industry-${idx}`} className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white cursor-pointer transition-opacity"><Plus size={20} /></label>
                                            </div>
                                            <div className="flex-1 space-y-4">
                                                <div className="space-y-1">
                                                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Industry Title</label>
                                                    <input value={industry.title} onChange={e => {
                                                        const newConfig = deepClone(config);
                                                        newConfig.industries[idx].title = e.target.value;
                                                        setConfig(newConfig);
                                                    }} className="w-full font-bold text-sm bg-transparent border-b border-gray-100 focus:border-[#ff4a01] outline-none py-1 transition-colors" placeholder="Industry Name..." />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Link (Optional)</label>
                                                    <LinkSelector value={industry.link} onChange={val => {
                                                        const newConfig = deepClone(config);
                                                        newConfig.industries[idx].link = val;
                                                        setConfig(newConfig);
                                                    }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
