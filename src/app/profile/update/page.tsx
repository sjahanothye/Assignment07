"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { User, ArrowLeft, CheckCircle2, Lock } from "lucide-react";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { user, isLoading, updateName } = useAuth();
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        toast.error("তথ্য আপডেট করতে অনুগ্রহ করে প্রথমে সাইন ইন করুন।");
        router.push("/signin?callbackUrl=/profile/update");
      } else {
        setName(user.name || "");
      }
    }
  }, [isLoading, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim() || name.trim().length < 2) {
      const err = "নাম কমপক্ষে ২ অক্ষরের হতে হবে।";
      setErrorMessage(err);
      toast.error(err);
      return;
    }

    try {
      setSubmitting(true);
      const res = await updateName(name.trim());

      if (res.success) {
        toast.success("আপনার নাম সফলভাবে আপডেট করা হয়েছে!");
        router.push("/profile");
      } else {
        const err = res.error || "তথ্য আপডেট করা যায়নি। আবার চেষ্টা করুন।";
        setErrorMessage(err);
        toast.error(err);
      }
    } catch {
      const err = "তথ্য আপডেট করতে সমস্যা হয়েছে।";
      setErrorMessage(err);
      toast.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 animate-pulse space-y-4">
        <div className="h-10 bg-slate-200 rounded-xl"></div>
        <div className="h-40 bg-white rounded-2xl border border-slate-200"></div>
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
        <p className="text-sm text-slate-500">তথ্য আপডেট করতে সাইন ইন করুন।</p>
        <Link
          href="/signin?callbackUrl=/profile/update"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-sm"
        >
          লগইন করুন
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-6">
      
      {/* Back button */}
      <Link
        href="/profile"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-emerald-700 transition-colors"
      >
        <ArrowLeft size={14} />
        <span>প্রোফাইলে ফিরে যান</span>
      </Link>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 space-y-6">
        
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-slate-900">
            তথ্য আপডেট করুন
          </h1>
          <p className="text-xs text-slate-500">
            আপনার প্রোফাইলের নাম পরিবর্তন বা হালনাগাদ করুন
          </p>
        </div>

        {/* Inline Error */}
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
            {errorMessage}
          </div>
        )}

        {/* Update Form (Challenge C3) */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Input field: Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              পূর্ণ নাম (Name)
            </label>
            <div className="relative">
              <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="আপনার নাম"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/15"
              />
            </div>
            <p className="text-[11px] text-slate-400">
              BetterAuth ব্যবহারকারী রেকর্ডে এই নামটি সংরক্ষিত হবে।
            </p>
          </div>

          {/* Email (Read only for safety) */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              ইমেইল (Email)
            </label>
            <input
              type="email"
              disabled
              value={user.email}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-500 cursor-not-allowed"
            />
          </div>

          {/* Submit: Update Information button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-bold text-sm shadow-md shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {submitting ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <CheckCircle2 size={18} />
                <span>Update Information</span>
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
}
