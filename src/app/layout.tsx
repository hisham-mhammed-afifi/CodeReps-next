import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://code-reps-next.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "CodeReps - Think it. Break it. Code it.",
    template: "%s | CodeReps",
  },
  description:
    "Build real problem-solving skills through guided JavaScript challenges. Learn to think like a developer, not just code like one.",
  keywords: [
    "JavaScript",
    "coding challenges",
    "learn to code",
    "DOM manipulation",
    "problem solving",
    "guided practice",
    "web development",
    "frontend",
  ],
  authors: [{ name: "CodeReps" }],
  creator: "CodeReps",
  openGraph: {
    title: "CodeReps - Think it. Break it. Code it.",
    description:
      "Build real problem-solving skills through guided JavaScript challenges. Learn to think like a developer, not just code like one.",
    url: SITE_URL,
    siteName: "CodeReps",
    images: [{ url: "/screenshot.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeReps - Think it. Break it. Code it.",
    description:
      "Build real problem-solving skills through guided JavaScript challenges.",
    images: ["/screenshot.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      >
        <body className="h-full flex flex-col font-sans">{children}</body>
      </html>
    </ClerkProvider>
  );
}
