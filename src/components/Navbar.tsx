"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getFormattedBengaliDate } from "@/lib/utils";
import { Category } from "@/types";
import {
  Menu,
  X,
  User as UserIcon,
  LogOut,
  LogIn,
  UserPlus,
  Sparkles
} from "lucide-react";

interface NavbarProps {
  categories?: Category[];
}

const DEFAULT_CATEGORIES: Category[] = [
  { id: "chal", slug: "chal", nameBn: "চাল", icon: "🍚" },
  { id: "dal", slug: "dal", nameBn: "ডাল", icon: "🥣" },
  { id: "tel", slug: "tel", nameBn: "তেল", icon: "🫙" },
  { id: "sobji", slug: "sobji", nameBn: "সবজি", icon: "🥔" },
  { id: "mach", slug: "mach", nameBn: "মাছ", icon: "🐟" },
  { id: "mangsho", slug: "mangsho", nameBn: "মাংস", icon: "🍗" },
  { id: "dim-dui", slug: "dim-dui", nameBn: "ডিম-দুধ", icon: "🥚" },
  { id: "mosla", slug: "mosla", nameBn: "মসলা", icon: "🧄" }
];

export default function Navbar({ categories = DEFAULT_CATEGORIES }: NavbarProps) {
  const pathname = usePathname();
  const { user, logout, loginDemoUser, isLoading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const bengaliDate = getFormattedBengaliDate();

  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      {/* Top Navbar Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Bangla Date */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform overflow-hidden relative">
              <Image
                src="/logo-icon.png"
                alt="বাজার দর"
                width={36}
                height={36}
                className="object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <span className="text-2xl absolute">🛒</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors flex items-center gap-1">
                বাজার দর
                <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                  লাইভ
                </span>
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {bengaliDate}
              </span>
            </div>
          </Link>

          {/* Desktop Auth Controls */}
          <div className="hidden md:flex items-center gap-3">
            {isLoading ? (
              <div className="w-24 h-9 bg-slate-100 animate-pulse rounded-xl" />
            ) : user ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/profile"
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all text-slate-800 text-sm font-medium"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold overflow-hidden">
                    {user.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <UserIcon size={16} />
                    )}
                  </div>
                  <span className="max-w-[120px] truncate">{user.name}</span>
                </Link>

                <button
                  onClick={() => logout()}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                  title="সাইন আউট"
                >
                  <LogOut size={16} />
                  <span>সাইন আউট</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={loginDemoUser}
                  className="hidden lg:flex items-center gap-1 text-xs px-2.5 py-1.5 text-amber-700 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors font-medium"
                  title="পরীক্ষকের সুবিধার জন্য এক ক্লিকে ডেমো লগইন"
                >
                  <Sparkles size={13} className="text-amber-500" />
                  ডেমো লগইন
                </button>

                <Link
                  href="/signin"
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-700 hover:text-emerald-700 hover:bg-slate-50 rounded-xl transition-colors"
                >
                  <LogIn size={16} />
                  <span>সাইন ইন</span>
                </Link>

                <Link
                  href="/signup"
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm shadow-emerald-600/20 rounded-xl transition-all hover:scale-[1.02]"
                >
                  <UserPlus size={16} />
                  <span>সাইন আপ</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Second Row: Category Links (Desktop) */}
      <nav className="border-t border-slate-100 bg-slate-50/80 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center justify-start gap-1 overflow-x-auto py-2 scrollbar-none">
            <li>
              <Link
                href="/"
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  pathname === "/"
                    ? "bg-emerald-600 text-white shadow-xs font-semibold"
                    : "text-slate-600 hover:text-emerald-700 hover:bg-slate-200/60"
                }`}
              >
                <span>🏠</span>
                <span>হোম</span>
              </Link>
            </li>

            {categories.map((cat) => {
              const isActive = pathname === `/category/${cat.slug}`;
              return (
                <li key={cat.id || cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                      isActive
                        ? "bg-emerald-600 text-white shadow-xs font-semibold"
                        : "text-slate-600 hover:text-emerald-700 hover:bg-slate-200/60"
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.nameBn}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in fade-in slide-in-from-top-2">
          {/* Auth in Mobile */}
          <div className="pb-4 mb-3 border-b border-slate-100">
            {user ? (
              <div className="flex items-center justify-between">
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 text-slate-800 font-medium"
                >
                  <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                    {user.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={user.image} alt={user.name} className="w-full h-full object-cover rounded-full" />
                    ) : (
                      <UserIcon size={16} />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{user.name}</p>
                    <p className="text-xs text-slate-500">{user.email}</p>
                  </div>
                </Link>

                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg text-sm"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/signin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 text-sm font-medium text-slate-700 border border-slate-200 rounded-xl"
                  >
                    <LogIn size={15} />
                    <span>সাইন ইন</span>
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 text-sm font-semibold text-white bg-emerald-600 rounded-xl"
                  >
                    <UserPlus size={15} />
                    <span>সাইন আপ</span>
                  </Link>
                </div>
                <button
                  onClick={() => {
                    loginDemoUser();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 text-xs font-medium text-amber-800 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-center gap-1.5"
                >
                  <Sparkles size={14} className="text-amber-600" />
                  এক ক্লিকে ডেমো লগইন
                </button>
              </div>
            )}
          </div>

          {/* Categories in Mobile */}
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            পণ্যের ক্যাটাগরি
          </p>
          <div className="grid grid-cols-2 gap-1.5">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
                pathname === "/" ? "bg-emerald-600 text-white" : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <span>🏠</span>
              <span>হোম পেজ</span>
            </Link>

            {categories.map((cat) => (
              <Link
                key={cat.id || cat.slug}
                href={`/category/${cat.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
                  pathname === `/category/${cat.slug}`
                    ? "bg-emerald-600 text-white font-semibold"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.nameBn}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
