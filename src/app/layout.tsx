import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/navbar";
import { ThemeProvider } from "@/context/theme-context";

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
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <div className="min-h-screen text-neo-black dark:text-neo-cream selection:bg-neo-pink selection:text-white font-sans transition-colors duration-300">
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
