import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://your-domain.com'),
  title: {
    default: 'Portfolio Blog',
    template: '%s | Portfolio Blog',
  },
  description: 'A modern portfolio blog with MDX and KaTeX math support',
  keywords: ['blog', 'portfolio', 'MDX', 'KaTeX', 'mathematics', 'Next.js'],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.com',
    title: 'Portfolio Blog',
    description: 'A modern portfolio blog with MDX and KaTeX math support',
    siteName: 'Portfolio Blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio Blog',
    description: 'A modern portfolio blog with MDX and KaTeX math support',
    creator: '@yourhandle',
  },
  robots: {
    index: true,
    follow: true,
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
