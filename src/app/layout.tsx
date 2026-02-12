import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next Generation Learners",
  description: "Empowering the next wave of innovators, thinkers, and leaders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-800`}
      >
        <Navbar />
        {children}
        <footer className="bg-slate-50 py-8 px-4 text-center text-slate-600">
          <p>© 2026 Next Generation Learners. Founded at Babson College.</p>
        </footer>
      </body>
    </html>
  );
}
