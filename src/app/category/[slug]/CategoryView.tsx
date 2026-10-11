"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Product, Category, SortOption } from "@/types";
import ProductCard from "@/components/ProductCard";
import { toBengaliDigits } from "@/lib/utils";
import { ArrowUpDown, ChevronDown, ArrowLeft, Home } from "lucide-react";

interface CategoryViewProps {
  category: Category;
  initialProducts: Product[];
}

export default function CategoryView({ category, initialProducts }: CategoryViewProps) {
  const [sortBy, setSortBy] = useState<SortOption>("default");

  // Challenge C1: Sort numerically by today's price
  const sortedProducts = useMemo(() => {
    const list = [...initialProducts];
    if (sortBy === "price-asc") {
      return list.sort((a, b) => Number(a.today) - Number(b.today));
    }
    if (sortBy === "price-desc") {
      return list.sort((a, b) => Number(b.today) - Number(a.today));
    }
    return list;
  }, [initialProducts, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
        <Link href="/" className="hover:text-emerald-700 transition-colors flex items-center gap-1">
          <Home size={14} />
          <span>হোম</span>
        </Link>
        <span>/</span>
        <span className="text-slate-800 font-semibold">{category.nameBn}</span>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 rounded-3xl p-6 sm:p-10 text-white shadow-xl shadow-emerald-700/15 relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-5 relative z-10">
          <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-4xl sm:text-5xl shadow-inner border border-white/30">
            {category.icon}
          </div>
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-white/20 text-emerald-100 text-xs font-semibold mb-1 backdrop-blur-xs">
              পণ্যের ক্যাটাগরি
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {category.nameBn}
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 font-medium mt-1">
              মোট {toBengaliDigits(initialProducts.length)} টি পণ্যের বর্তমান বাজারদর
            </p>
          </div>
        </div>

        <Link
          href="/"
          className="relative z-10 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold border border-white/20 transition-all self-start sm:self-auto"
        >
          <ArrowLeft size={16} />
          <span>সকল ক্যাটাগরি</span>
        </Link>
      </div>

      {/* Control Bar: Challenge C1 Sort Dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <span>{category.icon}</span>
          <span>{category.nameBn} পণ্যসমূহ</span>
          <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
            {toBengaliDigits(sortedProducts.length)} টি
          </span>
        </div>

        {/* Challenge C1: Sort Dropdown */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 hover:border-slate-300">
            <ArrowUpDown size={15} className="text-emerald-600" />
            <label htmlFor="cat-sort" className="text-xs font-medium text-slate-500">
              সাজান:
            </label>
            <select
              id="cat-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              aria-label="সাজান"
              className="bg-transparent text-sm font-semibold text-slate-800 focus:outline-hidden cursor-pointer pr-4"
            >
              <option value="default">ডিফল্ট</option>
              <option value="price-asc">দাম: কম থেকে বেশি</option>
              <option value="price-desc">দাম: বেশি থেকে কম</option>
            </select>
            <ChevronDown size={14} className="text-slate-400 pointer-events-none -ml-3" />
          </div>
        </div>
      </div>

      {/* Product Cards Grid */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs max-w-lg mx-auto my-12 space-y-5">
          <div className="w-20 h-20 rounded-3xl bg-amber-50 text-amber-600 flex items-center justify-center text-4xl mx-auto shadow-inner">
            📭
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900">
              এই ক্যাটাগরিতে কোনো পণ্য নেই
            </h3>
            <p className="text-sm text-slate-500 mt-2">
              বর্তমানে এই ক্যাটাগরিতে কোনো পণ্য তালিকাভুক্ত করা হয়নি বা তথ্য হালনাগাদ করা হচ্ছে।
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all hover:scale-105"
          >
            <Home size={16} />
            <span>হোম পেজে ফিরে যান</span>
          </Link>
        </div>
      )}
    </div>
  );
}
