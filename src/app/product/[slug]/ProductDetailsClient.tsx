"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { toBengaliDigits, formatUnit } from "@/lib/utils";
import { DetailsSkeleton } from "@/components/Skeletons";
import toast from "react-hot-toast";
import {
  Lock,
  LogIn,
  Sparkles,
  ArrowLeft,
  Store,
  MapPin,
  TrendingUp,
  TrendingDown,
  Calendar,
  Search,
  Filter
} from "lucide-react";

interface ProductDetailsClientProps {
  product: Product;
  slug: string;
}

export default function ProductDetailsClient({ product, slug }: ProductDetailsClientProps) {
  const router = useRouter();
  const { user, isLoading, loginDemoUser } = useAuth();
  const [selectedDivision, setSelectedDivision] = useState<string>("all");
  const [searchMarket, setSearchMarket] = useState<string>("");
  const [hasPromptedToast, setHasPromptedToast] = useState<boolean>(false);

  // If user is not logged in after auth check, prompt toast notification
  useEffect(() => {
    if (!isLoading && !user && !hasPromptedToast) {
      toast.error("পণ্যটির বিস্তারিত দেখতে অনুগ্রহ করে প্রথমে সাইন ইন করুন।", {
        id: "protected-route-toast"
      });
      setHasPromptedToast(true);
    }
  }, [isLoading, user, hasPromptedToast]);

  // Loading skeleton while checking authentication
  if (isLoading) {
    return <DetailsSkeleton />;
  }

  // Protected Route: User must be signed in to see details
  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-amber-100 text-amber-700 flex items-center justify-center text-4xl mx-auto shadow-inner border border-amber-300">
          <Lock size={36} className="text-amber-700" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            সংরক্ষিত তথ্য (Protected Route)
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            লগইন আবশ্যক
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto">
            “{product.nameBn}”-এর বাজারভিত্তিক বিস্তারিত দর ও বিশ্লেষণ দেখতে আপনার একাউন্টে সাইন ইন করুন।
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            href={`/signin?callbackUrl=/product/${slug}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 transition-all hover:scale-105"
          >
            <LogIn size={16} />
            <span>সাইন ইন করুন</span>
          </Link>

          <button
            onClick={async () => {
              await loginDemoUser();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-sm transition-all"
          >
            <Sparkles size={16} className="text-amber-600" />
            <span>এক ক্লিকে ডেমো লগইন</span>
          </button>
        </div>

        <div className="pt-4">
          <Link
            href="/"
            className="text-xs text-slate-500 hover:text-emerald-700 transition-colors inline-flex items-center gap-1"
          >
            <ArrowLeft size={13} />
            <span>হোম পেজে ফিরে যান</span>
          </Link>
        </div>
      </div>
    );
  }

  // Calculate price stats from markets
  const markets = product.markets || [];
  const minPrice = markets.length > 0
    ? Math.min(...markets.map((m) => m.min))
    : product.today;
  const maxPrice = markets.length > 0
    ? Math.max(...markets.map((m) => m.max))
    : product.today;
  const avgPrice = markets.length > 0
    ? Math.round(markets.reduce((acc, m) => acc + (m.min + m.max) / 2, 0) / markets.length)
    : product.today;

  // Extract distinct divisions for filter
  const divisions = Array.from(new Set(markets.map((m) => m.division)));

  // Filtered markets
  const filteredMarkets = markets.filter((m) => {
    const matchDiv = selectedDivision === "all" || m.division === selectedDivision;
    const matchSearch =
      !searchMarket.trim() ||
      m.market.toLowerCase().includes(searchMarket.toLowerCase().trim()) ||
      m.division.toLowerCase().includes(searchMarket.toLowerCase().trim());
    return matchDiv && matchSearch;
  });

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";
  const pctVal = Math.abs(product.change?.pct || 0).toFixed(1);
  const pctBn = toBengaliDigits(pctVal);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <Link href="/" className="hover:text-emerald-700 transition-colors">হোম</Link>
          <span>/</span>
          <Link href={`/category/${product.category}`} className="hover:text-emerald-700 transition-colors">
            {product.categoryNameBn || product.category}
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold">{product.nameBn}</span>
        </div>

        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft size={14} />
          <span>পূর্ববর্তী পেজ</span>
        </button>
      </div>


      {/* ========================================================
          TOP SUMMARY SECTION
         ======================================================== */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          <div className="flex items-center gap-5">
            {/* Emoji Visual */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-emerald-100 to-slate-100 border border-emerald-200/60 flex items-center justify-center text-4xl sm:text-5xl shadow-inner shrink-0">
              {product.image || product.categoryIcon || "🛒"}
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={`/category/${product.category}`}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 hover:bg-emerald-100 transition-colors"
                >
                  <span>{product.categoryIcon}</span>
                  <span>{product.categoryNameBn || product.category}</span>
                </Link>

                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                  {formatUnit(product.unit)}
                </span>

                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                    isUp
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                      : isDown
                      ? "bg-rose-100 text-rose-800 border border-rose-200"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  <span>{isUp ? "▲" : isDown ? "▼" : "—"}</span>
                  <span>{pctBn}%</span>
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {product.nameBn}
              </h1>

              {/* Market Summary Line */}
              <p className="text-sm sm:text-base text-slate-600 font-medium">
                আজকের গড় বাজারমূল্য {toBengaliDigits(product.today)} টাকা ({formatUnit(product.unit)})। বিভিন্ন পাইকারি ও খুচরা বাজারে দর যাচাই করুন।
              </p>
            </div>
          </div>

          {/* Today's Price Big Badge */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 text-right w-full md:w-auto shrink-0 flex md:flex-col justify-between items-center md:items-end">
            <span className="text-xs font-semibold text-slate-500">আজকের দর</span>
            <div className="text-3xl sm:text-4xl font-black text-slate-900 flex items-baseline gap-1">
              <span>{toBengaliDigits(product.today)}</span>
              <span className="text-sm font-semibold text-slate-500">টাকা</span>
            </div>
            <span className="text-xs text-slate-500">{formatUnit(product.unit)}</span>
          </div>

        </div>
      </div>


      {/* ========================================================
          PRICE SUMMARY CARDS
         ======================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        
        {/* Card 1: Minimum Price */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
            <TrendingDown size={28} />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 block">
              সর্বনিম্ন দাম
            </span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-700 flex items-baseline gap-1 mt-0.5">
              <span>{toBengaliDigits(minPrice)}</span>
              <span className="text-sm font-medium text-slate-500">টাকা</span>
            </div>
            <span className="text-[11px] text-slate-500">বাজারে সবচেয়ে কম দাম</span>
          </div>
        </div>

        {/* Card 2: Average Price */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 border border-teal-100">
            <Store size={28} />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 block">
              গড় দাম
            </span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 flex items-baseline gap-1 mt-0.5">
              <span>{toBengaliDigits(avgPrice)}</span>
              <span className="text-sm font-medium text-slate-500">টাকা</span>
            </div>
            <span className="text-[11px] text-slate-500">সকল বাজারের গড় দর</span>
          </div>
        </div>

        {/* Card 3: Maximum Price */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-100">
            <TrendingUp size={28} />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 block">
              সর্বোচ্চ দাম
            </span>
            <div className="text-2xl sm:text-3xl font-black text-rose-700 flex items-baseline gap-1 mt-0.5">
              <span>{toBengaliDigits(maxPrice)}</span>
              <span className="text-sm font-medium text-slate-500">টাকা</span>
            </div>
            <span className="text-[11px] text-slate-500">বাজারে সবচেয়ে বেশি দাম</span>
          </div>
        </div>

      </div>


      {/* ========================================================
          HISTORICAL COMPARISON STATS
         ======================================================== */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-4">
          <Calendar size={18} className="text-emerald-600" />
          <span>ঐতিহাসিক মূল্যের তুলনামূলক চিত্র</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <span className="text-xs text-slate-500 block">আজকের দর</span>
            <p className="text-xl font-bold text-slate-900 mt-1">
              {toBengaliDigits(product.today)} ৳
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <span className="text-xs text-slate-500 block">গতকালের দর</span>
            <p className="text-xl font-bold text-slate-700 mt-1">
              {toBengaliDigits(product.yesterday || product.today)} ৳
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <span className="text-xs text-slate-500 block">গত সপ্তাহের দর</span>
            <p className="text-xl font-bold text-slate-700 mt-1">
              {toBengaliDigits(product.lastWeek || product.today)} ৳
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <span className="text-xs text-slate-500 block">গত মাসের দর</span>
            <p className="text-xl font-bold text-slate-700 mt-1">
              {toBengaliDigits(product.lastMonth || product.today)} ৳
            </p>
          </div>
        </div>
      </div>


      {/* ========================================================
          BAZAR-WISE TODAY'S PRICE (বাজারভিত্তিক আজকের দাম)
         ======================================================== */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        
        {/* Section Header with Filters */}
        <div className="p-6 border-b border-slate-200 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                <Store size={22} className="text-emerald-600" />
                <span>বাজারভিত্তিক আজকের দাম</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                বিভিন্ন বিভাগ ও বাজারের সর্বনিম্ন ও সর্বোচ্চ মূল্য তালিকা
              </p>
            </div>

            {/* Division Filter Badges */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <button
                onClick={() => setSelectedDivision("all")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  selectedDivision === "all"
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                সকল বিভাগ
              </button>
              {divisions.map((div) => (
                <button
                  key={div}
                  onClick={() => setSelectedDivision(div)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                    selectedDivision === div
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {div}
                </button>
              ))}
            </div>
          </div>

          {/* Search bar inside market table */}
          <div className="relative max-w-sm">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchMarket}
              onChange={(e) => setSearchMarket(e.target.value)}
              placeholder="বাজারের নাম দিয়ে খুঁজুন (যেমন: কারওয়ান বাজার)..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-emerald-500 bg-slate-50/50"
            />
          </div>
        </div>

        {/* Markets Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 text-xs font-bold">
                <th className="py-3.5 px-6">বাজারের নাম</th>
                <th className="py-3.5 px-6">বিভাগ</th>
                <th className="py-3.5 px-6 text-right">সর্বনিম্ন দর</th>
                <th className="py-3.5 px-6 text-right">সর্বোচ্চ দর</th>
                <th className="py-3.5 px-6 text-center">পরিস্থিতি</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredMarkets.length > 0 ? (
                filteredMarkets.map((m, index) => {
                  const isLowest = m.min === minPrice;
                  const isHighest = m.max === maxPrice;

                  return (
                    <tr
                      key={`${m.market}-${index}`}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      {/* Market Name */}
                      <td className="py-4 px-6 font-bold text-slate-900 flex items-center gap-2">
                        <MapPin size={16} className="text-emerald-600 shrink-0" />
                        <span>{m.market}</span>
                      </td>

                      {/* Division */}
                      <td className="py-4 px-6 text-slate-600 font-medium">
                        <span className="px-2.5 py-1 rounded-md bg-slate-100 text-xs font-semibold text-slate-700">
                          {m.division}
                        </span>
                      </td>

                      {/* Min Price */}
                      <td className="py-4 px-6 text-right font-bold text-emerald-700">
                        {toBengaliDigits(m.min)} ৳
                      </td>

                      {/* Max Price */}
                      <td className="py-4 px-6 text-right font-bold text-slate-900">
                        {toBengaliDigits(m.max)} ৳
                      </td>

                      {/* Status badge */}
                      <td className="py-4 px-6 text-center">
                        {isLowest ? (
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            সবচেয়ে সাশ্রয়ী
                          </span>
                        ) : isHighest ? (
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200">
                            সর্বোচ্চ দর
                          </span>
                        ) : (
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
                            স্বাভাবিক
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500">
                    কোনো বাজার তথ্য খুঁজে পাওয়া যায়নি।
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
