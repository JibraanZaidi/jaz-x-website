import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import CursorGlow from "@/components/ui/CursorGlow";
import LoadingScreen from "@/components/ui/LoadingScreen";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "JAZ-X Innovation",
  description:
    "JAZ-X Innovation delivers cutting-edge digital solutions.",

  icons: {
    icon: "/favicon.ico",
  },

  openGraph: {
    title: "JAZ-X Innovation",
    description: "Innovating the Future",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-background text-white antialiased relative">
        <LoadingScreen />
        <SmoothScrollProvider>
          <CursorGlow />
          <Navbar />
          <main className="relative z-10">{children}</main>
          <Footer />
          <WhatsAppButton />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}