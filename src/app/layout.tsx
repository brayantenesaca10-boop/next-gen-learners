import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Next Generation Learners — AI Literacy for the Next Generation",
  description: "We build AI literacy programs for students and AI systems for education leaders. Programs in Danbury, Ridgefield, Easton, and Woodstock CT. Founded at Babson College.",
  openGraph: {
    title: "Next Generation Learners",
    description: "AI literacy programs for students. AI systems for education leaders.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakarta.variable} antialiased bg-[#FAFBFF] text-[#1E1B4B]`}
        style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
      >
        <Navbar />
        <div className="relative z-[1]">
          {children}
        </div>
        <footer className="relative z-[1] bg-gradient-to-br from-[#4F46E5] via-[#7C3AED] to-[#06B6D4] py-16 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-white text-sm font-bold uppercase tracking-[0.14em] mb-3">
              Next Generation Learners
            </p>
            <p className="text-white/60 text-sm">
              &copy; 2026 Next Generation Learners. Founded at Babson College.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
