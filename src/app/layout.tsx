import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"], // Comprehensive weights for design freedom
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  style: ["normal", "italic"],
});

import FooterWrapper from "@/components/FooterWrapper";

export const metadata: Metadata = {
  title: "NEXGROW | Premium Agency",
  description: "Elevate your business with NEXGROW - The premium agency solution.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${playfair.variable} antialiased bg-white text-black`}>
        {children}
        <FooterWrapper />
      </body>
    </html>
  );
}
