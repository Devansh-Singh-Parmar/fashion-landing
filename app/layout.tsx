import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Hanken_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Zineps",
  description: "Multi-carrier shipping and rate management for e-commerce.",
};

export const viewport: Viewport = {
  themeColor: "#70CAB9",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${hankenGrotesk.variable} ${bodoniModa.variable} ${spaceMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
