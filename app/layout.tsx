import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mahdymahareb.de'),
  title: {
    default: 'Mahdy Mahareb',
    template: '%s | Mahdy Mahareb',
  },
  description: 'Mahdy Mahareb (Mohammadmahdi Maharebi) - M.Sc. Electrical Communication Engineering student at University of Kassel. Seeking funded master\'s thesis opportunities in communication systems and RF engineering.',
  keywords: ['RF Engineering', 'Communication Systems', 'Electromagnetics', '5G', 'Antenna Design', 'Signal Processing', 'MATLAB', 'Python', 'HFSS', 'Microwave Circuits'],
  authors: [{ name: 'Mahdy Mahareb' }],
  creator: 'Mahdy Mahareb',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mahdymahareb.de',
    title: 'Mahdy Mahareb - Communication & RF Engineering',
    description: 'M.Sc. student in Electrical Communication Engineering. Specialized in communication systems, applied electromagnetics, and computational modeling.',
    siteName: 'Mahdy Mahareb Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mahdy Mahareb',
    description: 'Communication & RF Engineering Researcher',
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
        <ScrollToTop />
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
