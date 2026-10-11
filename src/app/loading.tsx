import React from "react";

export default function GlobalLoading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
      <div className="w-16 h-16 rounded-3xl bg-emerald-600 text-white flex items-center justify-center text-3xl shadow-xl shadow-emerald-600/20 animate-spin">
        🛒
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-bold text-slate-800">বাজার দর লোড হচ্ছে...</h3>
        <p className="text-xs text-slate-400">সর্বশেষ নির্ভরযোগ্য তথ্য আনা হচ্ছে</p>
      </div>
    </div>
  );
}
