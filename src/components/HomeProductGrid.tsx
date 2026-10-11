"use client";

import React, { useState, useMemo } from "react";
import { Product, SortOption } from "@/types";
import ProductCard from "@/components/ProductCard";
import { toBengaliDigits } from "@/lib/utils";
import { Search, ArrowUpDown, ChevronDown, RefreshCw } from "lucide-react";

interface HomeProductGridProps {
  products: Product[];
}

const CATEGORY_TABS = [
  { id: "all", label: "সব পণ্য", icon: "✨" },
  { id: "chal", label: "চাল", icon: "🍚" },
  { id: "dal", label: "ডাল", icon: "🥣" },
  { id: "tel", label: "তেল", icon: "🫙" },
  { id: "sobji", label: "সবজি", icon: "🥔" },
  { id: "mach", label: "মাছ", icon: "🐟" },
  { id: "mangsho", label: "মাংস", icon: "🍗" },
  { id: "dim-dui", label: "ডিম-দুধ", icon: "🥚" },
  { id: "mosla", label: "মসলা", icon: "🧄" },
];

export default function HomeProductGrid({ products }: HomeProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortOption>("default");

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Filter by Category
    if (selectedCategory !== "all") {
      result = result.filter(
        (p) => p.category === selectedCategory || p.categoryNameBn === selectedCategory
      );
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.nameBn.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q) ||
          p.categoryNameBn?.toLowerCase().includes(q)
      );
    }

    // Numerical sorting (Challenge C1 logic)
    if (sortBy === "price-asc") {
      result.sort((a, b) => Number(a.today) - Number(b.today));
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => Number(b.today) - Number(a.today));
    }

    return result;
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="space-y-6">
      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORY_TABS.map((tab) => {
          const isActive = selectedCategory === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20 scale-[1.02]"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Controls Bar: Search & Sort Dropdown */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
        
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="পণ্যের নাম দিয়ে খুঁজুন (উদাঃ আলু, চাল)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/10 transition-all"
          />
        </div>

        {/* Challenge C1: Sort Dropdown */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="text-xs font-semibold text-slate-500">
            মোট <span className="text-emerald-700 font-bold">{toBengaliDigits(filteredAndSortedProducts.length)}</span> টি পণ্য
          </div>

          <div className="relative">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 hover:border-slate-300">
              <ArrowUpDown size={15} className="text-emerald-600" />
              <label htmlFor="sort-select" className="text-xs font-medium text-slate-500 hidden sm:inline">
                সাজান:
              </label>
              <select
                id="sort-select"
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
      </div>

      {/* Grid of Product Cards */}
      {filteredAndSortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs max-w-md mx-auto my-8 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-3xl mx-auto">
            🔍
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            কোন পণ্য পাওয়া যায়নি
          </h3>
          <p className="text-sm text-slate-500">
            আপনার অনুসন্ধান করা নামে কোনো পণ্য খুঁজে পাওয়া যায়নি। অনুগ্রহ করে অন্য নাম বা ক্যাটাগরি দিয়ে চেষ্টা করুন।
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
              setSortBy("default");
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors"
          >
            <RefreshCw size={15} />
            <span>ফিল্টার রিসেট করুন</span>
          </button>
        </div>
      )}
    </div>
  );
}
