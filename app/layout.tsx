import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SiteShell from "@/components/layout/SiteShell";
import { LanguageProvider } from "@/components/providers/LanguageProvider";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "T2M Media & Solutions | Digital Marketing Agency",
  description:
    "T2M hỗ trợ doanh nghiệp và agency triển khai Performance Marketing, Media Planning, Social Media, Seeding, Tracking & Automation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${inter.className} bg-white text-slate-950 antialiased`}>
        <LanguageProvider>
          <SiteShell>{children}</SiteShell>
        </LanguageProvider>
      </body>
    </html>
  );
}