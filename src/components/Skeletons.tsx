import React from "react";

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 animate-pulse flex flex-col justify-between">
      <div className="flex justify-between items-center mb-3">
        <div className="w-16 h-5 bg-slate-200 rounded-lg"></div>
        <div className="w-14 h-5 bg-slate-200 rounded-full"></div>
      </div>
      <div className="flex items-center gap-4 my-2">
        <div className="w-16 h-16 rounded-2xl bg-slate-200"></div>
        <div className="flex-1 space-y-2">
          <div className="w-3/4 h-5 bg-slate-200 rounded"></div>
          <div className="w-1/2 h-3.5 bg-slate-200 rounded"></div>
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center">
        <div className="space-y-1.5">
          <div className="w-16 h-3 bg-slate-200 rounded"></div>
          <div className="w-20 h-6 bg-slate-200 rounded"></div>
        </div>
        <div className="w-9 h-9 rounded-xl bg-slate-200"></div>
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function DetailsSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-pulse space-y-8">
      {/* Top Banner Skeleton */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-4">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 bg-slate-200 rounded-3xl"></div>
          <div className="space-y-2.5 flex-1">
            <div className="w-48 h-7 bg-slate-200 rounded-lg"></div>
            <div className="w-72 h-4 bg-slate-200 rounded"></div>
            <div className="flex gap-2">
              <div className="w-16 h-5 bg-slate-200 rounded-full"></div>
              <div className="w-20 h-5 bg-slate-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Price Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="h-28 bg-white rounded-2xl border border-slate-200 p-5"></div>
        <div className="h-28 bg-white rounded-2xl border border-slate-200 p-5"></div>
        <div className="h-28 bg-white rounded-2xl border border-slate-200 p-5"></div>
      </div>

      {/* Table Skeleton */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-3">
        <div className="w-40 h-6 bg-slate-200 rounded mb-4"></div>
        <div className="h-10 bg-slate-100 rounded-lg"></div>
        <div className="h-10 bg-slate-100 rounded-lg"></div>
        <div className="h-10 bg-slate-100 rounded-lg"></div>
      </div>
    </div>
  );
}
