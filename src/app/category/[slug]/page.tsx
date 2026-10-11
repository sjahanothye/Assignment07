import React from "react";
import Link from "next/link";
import { getCategories, getProductsByCategory } from "@/lib/api";
import CategoryView from "./CategoryView";
import { Home } from "lucide-react";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug || c.id === slug);

  if (!category) {
    return {
      title: "ক্যাটাগরি পাওয়া যায়নি — বাজার দর",
    };
  }

  return {
    title: `${category.nameBn} বাজার দর — বাজার দর`,
    description: `${category.nameBn} পণ্যের আজকের পাইকারি ও খুচরা বাজারদর বিস্তারিত দেখুন।`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug || c.id === slug);

  // If category does not exist: Empty state / 404-style message + CTA "হোম পেজে ফিরে যান"
  if (!category) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-24 h-24 rounded-3xl bg-amber-50 text-amber-600 flex items-center justify-center text-5xl mx-auto shadow-inner border border-amber-200">
          ⚠️
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-slate-900">
            ক্যাটাগরি খুঁজে পাওয়া যায়নি
          </h1>
          <p className="text-slate-600">
            আপনার অনুরোধকৃত “{slug}” ক্যাটাগরিটি আমাদের তালিকায় নেই বা পরিবর্তন করা হয়েছে।
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 transition-all hover:scale-105"
        >
          <Home size={18} />
          <span>হোম পেজে ফিরে যান</span>
        </Link>
      </div>
    );
  }

  const products = await getProductsByCategory(slug);

  return <CategoryView category={category} initialProducts={products} />;
}
