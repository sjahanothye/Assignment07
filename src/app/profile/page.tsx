"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { User, Mail, Calendar, ShieldCheck, Edit3, LogOut, Lock, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      toast.error("প্রোফাইল দেখতে অনুগ্রহ করে প্রথমে সাইন ইন করুন।");
      router.push("/signin?callbackUrl=/profile");
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 animate-pulse space-y-6">
        <div className="h-44 bg-slate-200 rounded-3xl"></div>
        <div className="h-64 bg-white rounded-3xl border border-slate-200"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-3xl mx-auto">
          <Lock size={28} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">লগইন প্রয়োজন</h2>
        <p className="text-sm text-slate-500">আপনার প্রোফাইল দেখতে সাইন ইন করুন।</p>
        <Link
          href="/signin?callbackUrl=/profile"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-sm"
        >
          লগইন করুন
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
        <Link href="/" className="hover:text-emerald-700 transition-colors">হোম</Link>
        <span>/</span>
        <span className="text-slate-800 font-semibold">আমার প্রোফাইল</span>
      </div>

      {/* Profile Header Card */}
      <div className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 rounded-3xl p-6 sm:p-10 text-white shadow-xl shadow-emerald-700/15 relative overflow-hidden flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
        
        {/* User Avatar */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white/20 p-1 border-2 border-white/40 shadow-xl overflow-hidden shrink-0 flex items-center justify-center">
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.image} alt={user.name} className="w-full h-full object-cover rounded-full" />
          ) : (
            <User size={48} className="text-white" />
          )}
        </div>

        {/* User Info */}
        <div className="space-y-2 flex-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-semibold">
            <ShieldCheck size={14} />
            <span>সক্রিয় সদস্য</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {user.name}
          </h1>

          <p className="text-emerald-100 text-sm sm:text-base flex items-center justify-center sm:justify-start gap-2">
            <Mail size={16} />
            <span>{user.email}</span>
          </p>

          <p className="text-emerald-200/80 text-xs flex items-center justify-center sm:justify-start gap-1.5 pt-1">
            <Calendar size={14} />
            <span>নিবন্ধন তারিখ: {new Date(user.createdAt || Date.now()).toLocaleDateString("bn-BD")}</span>
          </p>
        </div>

        {/* Challenge C3: Update Information Button */}
        <div className="flex flex-col sm:flex-row gap-3 self-center sm:self-start">
          <Link
            href="/profile/update"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 font-bold text-sm shadow-md transition-all hover:scale-105"
          >
            <Edit3 size={16} />
            <span>তথ্য আপডেট করুন</span>
          </Link>
        </div>

      </div>

      {/* Account Details & Management Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
          একাউন্ট সম্পর্কিত বিবরণ
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
            <span className="text-xs text-slate-500 font-semibold block">ব্যবহারকারীর নাম</span>
            <p className="text-base font-bold text-slate-900 mt-1">{user.name}</p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
            <span className="text-xs text-slate-500 font-semibold block">নিবন্ধিত ইমেইল</span>
            <p className="text-base font-bold text-slate-900 mt-1">{user.email}</p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
            <span className="text-xs text-slate-500 font-semibold block">ইউজার আইডি</span>
            <p className="text-xs font-mono text-slate-600 mt-1 truncate">{user.id}</p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
            <span className="text-xs text-slate-500 font-semibold block">নিরাপত্তা স্ট্যাটাস</span>
            <p className="text-xs font-bold text-emerald-700 mt-1 flex items-center gap-1">
              <ShieldCheck size={14} />
              <span>BetterAuth সুরক্ষিত একাউন্ট</span>
            </p>
          </div>
        </div>

        {/* Actions Row */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/profile/update"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm transition-colors"
          >
            <Edit3 size={16} />
            <span>প্রোফাইল পরিবর্তন করুন</span>
          </Link>

          <button
            onClick={() => {
              logout();
              router.push("/");
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-sm transition-colors"
          >
            <LogOut size={16} />
            <span>সাইন আউট করুন</span>
          </button>
        </div>
      </div>

    </div>
  );
}
