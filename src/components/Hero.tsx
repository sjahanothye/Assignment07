import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, TrendingUp, ShieldCheck, ShoppingBasket } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-white to-slate-50 border-b border-slate-200/80 py-12 md:py-20">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-teal-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs sm:text-sm font-semibold tracking-wide border border-emerald-200/80 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
              <span>দৈনিক নির্ভরযোগ্য বাজারদর মনিটরিং</span>
            </div>

            {/* Main Heading (Exact Figma) */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.2]">
              আজকের বাজারের দাম এক নজরে
            </h1>

            {/* Subtitle (Exact Figma) */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#সব-পণ্য"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] group"
              >
                <span>সব পণ্য দেখুন</span>
                <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
              </a>

              <Link
                href="/category/sobji"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 font-semibold text-base border border-slate-300 shadow-xs transition-all"
              >
                <ShoppingBasket size={18} className="text-emerald-600" />
                <span>সবজি বাজার</span>
              </Link>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-slate-200/80 w-full max-w-lg">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-emerald-100/70 text-emerald-700">
                  <TrendingUp size={16} />
                </div>
                <div>
                  <p className="text-xs text-slate-500">রিয়েল-টাইম</p>
                  <p className="text-sm font-bold text-slate-800">দর ওঠানামা</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-teal-100/70 text-teal-700">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <p className="text-xs text-slate-500">যাচাইকৃত</p>
                  <p className="text-sm font-bold text-slate-800">বাজার তথ্য</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-emerald-100/70 text-emerald-700">
                  <span className="text-base">🏬</span>
                </div>
                <div>
                  <p className="text-xs text-slate-500">১২+ প্রধান</p>
                  <p className="text-sm font-bold text-slate-800">পাইকারি বাজার</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Hero Image & Visual Cards */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            {/* Visual Frame */}
            <div className="relative w-full max-w-md aspect-4/3 sm:aspect-square flex items-center justify-center">
              
              {/* Soft decorative background rings */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-emerald-500/10 to-teal-400/20 border border-emerald-500/20 backdrop-blur-xs shadow-2xl"></div>
              
              {/* Image */}
              <div className="relative z-10 p-6 flex items-center justify-center w-full h-full">
                <Image
                  src="/bazar-hero.png"
                  alt="বাজার দর হিরো ব্যানার"
                  width={420}
                  height={420}
                  priority
                  className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Floating Stat Card 1 */}
              <div className="absolute -top-3 -left-3 sm:-left-6 z-20 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
                <span className="text-2xl">🍚</span>
                <div>
                  <p className="text-[11px] text-slate-500 font-medium">আজকের চাল বাজার</p>
                  <p className="text-sm font-bold text-slate-900">স্বর্ণমাছি ১৪৮ ৳/কেজি</p>
                </div>
              </div>

              {/* Floating Stat Card 2 */}
              <div className="absolute -bottom-3 -right-3 sm:-right-4 z-20 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-xs">
                  ▼
                </div>
                <div>
                  <p className="text-[11px] text-slate-500 font-medium">দাম কমেছে</p>
                  <p className="text-sm font-bold text-emerald-700">মিনিকেট চাল ২.৯%</p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
