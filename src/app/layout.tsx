import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import { PhoneAppShell } from "@/components/layout/PhoneAppShell";
import { BRAND } from "@/lib/carechain";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

export const metadata: Metadata = {
  title: `${BRAND.name} — Maternal Cardiovascular Continuity`,
  description: BRAND.tagline,
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${fraunces.variable} antialiased`}>
        <PhoneAppShell>{children}</PhoneAppShell>
      </body>
    </html>
  );
}
