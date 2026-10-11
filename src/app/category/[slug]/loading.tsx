import React from "react";
import { GridSkeleton } from "@/components/Skeletons";

export default function CategoryLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-pulse">
      {/* Breadcrumb Skeleton */}
      <div className="w-32 h-4 bg-slate-200 rounded"></div>

      {/* Header Skeleton */}
      <div className="h-44 bg-slate-200 rounded-3xl"></div>

      {/* Controls Skeleton */}
      <div className="h-16 bg-white rounded-2xl border border-slate-200 p-4"></div>

      {/* Cards Grid Skeleton */}
      <GridSkeleton count={8} />
    </div>
  );
}
