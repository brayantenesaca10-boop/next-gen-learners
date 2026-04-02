import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Next Generation Learners — AI Literacy for the Next Generation",
  description: "We build AI literacy programs for students and AI systems for education leaders. Programs in Danbury, Ridgefield, Easton, and Woodstock. Founded at Babson College.",
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
        className={`${dmSans.variable} antialiased bg-[#060606] text-[#FAFAFA]`}
        style={{ fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
      >
        <Navbar />
        <div className="relative z-[1]">
          {children}
        </div>
        <footer className="relative z-[1] border-t border-white/[0.06] py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-[#D4A843] text-xs font-semibold uppercase tracking-[0.14em] mb-3">
              Next Generation Learners
            </p>
            <p className="text-white/35 text-sm">
              &copy; 2026 Next Generation Learners. Founded at Babson College.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
