import React from "react";
import Link from "next/link";
import { getProductByIdOrSlug, getProducts } from "@/lib/api";
import ProductDetailsClient from "./ProductDetailsClient";
import { Home } from "lucide-react";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const products = await getProducts();
  const params: { slug: string }[] = [];
  
  for (const p of products) {
    if (p.slug) {
      params.push({ slug: p.slug });
    }
    if (p.id) {
      params.push({ slug: String(p.id) });
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductByIdOrSlug(slug);

  if (!product) {
    return {
      title: "পণ্য পাওয়া যায়নি — বাজার দর",
    };
  }

  return {
    title: `${product.nameBn} আজকের দর — বাজার দর`,
    description: `${product.nameBn} আজকের পাইকারি ও খুচরা বাজারদর, সর্বোচ্চ ও সর্বনিম্ন মূল্য বিশ্লেষণ।`,
  };
}

export default async function ProductDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductByIdOrSlug(slug);

  // If product is not found: Show clean 404 message + return to home button
  if (!product) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-24 h-24 rounded-3xl bg-amber-50 text-amber-600 flex items-center justify-center text-5xl mx-auto shadow-inner border border-amber-200">
          🔍
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-slate-900">
            পণ্যটি খুঁজে পাওয়া যায়নি
          </h1>
          <p className="text-slate-600">
            আপনার অনুরোধকৃত পণ্যটির তথ্য পাওয়া যায়নি বা লিঙ্কটি মেয়াদোত্তীর্ণ হয়েছে।
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

  return <ProductDetailsClient product={product} slug={slug} />;
}
