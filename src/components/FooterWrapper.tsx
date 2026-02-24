"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function FooterWrapper() {
    const pathname = usePathname();
    const isHidden = pathname?.startsWith("/admin") || pathname === "/adminlogin";

    if (isHidden) return null;

    return <Footer />;
}
