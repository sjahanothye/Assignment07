import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import ToastProvider from "@/components/ToastProvider";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";
import { getCategories, getProducts } from "@/lib/api";

export const metadata: Metadata = {
  title: "বাজার দর (Bazar Dor) — নিত্যপ্রয়োজনীয় পণ্যের নির্ভরযোগ্য বাজারদর",
  description: "প্রতিদিনের চাল, ডাল, তেল, শাকসবজি, মাছ ও মাংসসহ নিত্যপণ্যের সঠিক ও নির্ভরযোগ্য পাইকারি এবং খুচরা বাজারদর এক নজরে যাচাই করুন।",
  keywords: ["বাজার দর", "Bazar Dor", "নিত্যপণ্য", "কাঁচাবাজার", "চাল", "ডাল", "মাছ", "বাজার মূল্য"],
  icons: {
    icon: "/logo-icon.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  return (
    <html lang="bn" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-emerald-500 selection:text-white">
        <AuthProvider>
          <ToastProvider />
          <Navbar categories={categories} />
          <PriceTicker products={products} />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
