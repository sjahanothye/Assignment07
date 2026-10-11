import React from "react";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/api";
import { TrendingUp, TrendingDown, LayoutGrid } from "lucide-react";
import HomeProductGrid from "@/components/HomeProductGrid";

export default async function HomePage() {
  const products = await getProducts();

  // Section A: Top 6 Risers ("আজ দাম বেড়েছে ▲")
  const risers = products
    .filter((p) => p.change && (p.change.dir === "up" || p.change.pct > 0))
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  // Section B: Top 6 Fallers ("আজ দাম কমেছে ▼")
  const fallers = products
    .filter((p) => p.change && (p.change.dir === "down" || p.change.pct < 0))
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero / Banner Component */}
      <Hero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* ========================================================
            SECTION A: আজ দাম বেড়েছে ▲ (Top 6 Risers)
           ======================================================== */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-emerald-100">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg shadow-xs">
                <TrendingUp size={22} className="text-emerald-700" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                  <span>আজ দাম বেড়েছে</span>
                  <span className="text-emerald-600">▲</span>
                </h2>
                <p className="text-sm text-slate-500 font-medium">
                  গতকালের তুলনায় আজ বাজারে যেসকল পণ্যের দাম বৃদ্ধি পেয়েছে
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-full border border-emerald-200/80">
              <span>শীর্ষ ৬টি পণ্য</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
            {risers.map((product) => (
              <ProductCard key={`riser-${product.id}`} product={product} />
            ))}
          </div>
        </section>


        {/* ========================================================
            SECTION B: আজ দাম কমেছে ▼ (Top 6 Fallers)
           ======================================================== */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-rose-100">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-lg shadow-xs">
                <TrendingDown size={22} className="text-rose-700" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                  <span>আজ দাম কমেছে</span>
                  <span className="text-rose-600">▼</span>
                </h2>
                <p className="text-sm text-slate-500 font-medium">
                  গতকালের তুলনায় আজ বাজারে যেসকল পণ্যের দাম হ্রাস পেয়েছে
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 text-rose-800 text-xs font-bold rounded-full border border-rose-200/80">
              <span>শীর্ষ ৬টি পণ্য</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
            {fallers.map((product) => (
              <ProductCard key={`faller-${product.id}`} product={product} />
            ))}
          </div>
        </section>


        {/* ========================================================
            SECTION C: সব পণ্য (All Products with Grid & Search)
           ======================================================== */}
        <section id="সব-পণ্য" className="space-y-6 pt-4 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold text-lg shadow-xs">
                <LayoutGrid size={22} className="text-slate-800" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  সব পণ্য
                </h2>
                <p className="text-sm text-slate-500 font-medium">
                  সকল নিত্যপ্রয়োজনীয় পণ্যের তালিকা ও বিস্তারিত বাজার তথ্য
                </p>
              </div>
            </div>
          </div>

          {/* Interactive client filter and grid */}
          <HomeProductGrid products={products} />
        </section>

      </div>
    </div>
  );
}
