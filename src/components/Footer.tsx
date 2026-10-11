"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-900 border-t border-slate-800 text-slate-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
          
          {/* Left Side */}
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shrink-0 overflow-hidden relative shadow-sm">
              <Image
                src="/logo-icon.png"
                alt="বাজার দর"
                width={28}
                height={28}
                className="object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <span className="text-xl absolute">🛒</span>
            </div>
            <div>
              <div className="text-lg font-bold text-white flex items-center gap-2 justify-center md:justify-start">
                <span>বাজার দর</span>
              </div>
              <p className="text-sm text-slate-400">
                বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="text-center md:text-right max-w-md">
            <p className="text-sm text-slate-400 italic">
              “সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।”
            </p>
          </div>
        </div>

        {/* Bottom copyright and quick links */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© ২০২৬ বাজার দর (Bazar Dor)। সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-emerald-400 transition-colors">হোম পেজ</Link>
            <Link href="/signin" className="hover:text-emerald-400 transition-colors">সাইন ইন</Link>
            <Link href="/signup" className="hover:text-emerald-400 transition-colors">রেজিস্ট্রেশন</Link>
            <Link href="/#সব-পণ্য" className="hover:text-emerald-400 transition-colors">সকল পণ্য</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
