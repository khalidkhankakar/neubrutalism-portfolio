import type { Metadata } from "next";
import { Cormorant_Garamond, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/navbar";
import { ThemeProvider } from "@/context/theme-context";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Khalid Khan Kakar",
  description: "Building exceptional digital experiences. Full-stack expertise in modern web architecture, performance optimization, and team leadership. Explore my latest projects and technical insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body
          className={`${cormorant.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <div className="min-h-screen text-[var(--color-ink)] selection:bg-[var(--color-accent)] selection:text-[var(--color-accent-ink)] font-sans transition-colors duration-300">
            <Navbar />
            <main>
              {children}
            </main>
          </div>
        </body>
      </ThemeProvider>
    </html>
  );
}
