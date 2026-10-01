import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Archana Devi M — Crafting Intelligent Experiences",
  description:
    "Pre-final-year CSE (AI & ML) student at KIT, AI/ML + Full-Stack engineer, and competitive programmer (1,561+ problems, 425 active days). Editorial showcase with tactile dry-brush cursor reveal.",
  keywords: [
    "Archana Devi M",
    "AI/ML Engineer",
    "Full-Stack Developer",
    "Competitive Programmer",
    "KIT Coimbatore",
    "Abservetech",
  ],
  authors: [{ name: "Archana Devi M" }],
  openGraph: {
    title: "Archana Devi M — Crafting Intelligent Experiences",
    description: "Two Worlds, One Cursor: A light editorial cover wiped away to reveal the engineer underneath.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F5F1EA] text-[#1A1815] font-editorial-sans antialiased overflow-x-hidden selection:bg-[#FF5C38]/20 selection:text-[#FF5C38]">
        {children}
      </body>
    </html>
  );
}
