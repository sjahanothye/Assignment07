import React from "react";
import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200/90 shadow-xl p-8 sm:p-12 space-y-6">
        
        {/* Visual 404 Badge */}
        <div className="w-24 h-24 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-5xl mx-auto shadow-inner border border-emerald-100 animate-bounce">
          🛒
        </div>

        <div className="space-y-2">
          <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight block">
            ৪০৪
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
            পেজটি খুঁজে পাওয়া যায়নি
          </h1>
          <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
            আপনি যে পেজ বা পণ্যের সন্ধান করছেন তা বিদ্যমান নেই অথবা লিংকটি পরিবর্তিত হয়েছে।
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all hover:scale-105"
          >
            <Home size={16} />
            <span>হোম পেজে ফিরে যান</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
