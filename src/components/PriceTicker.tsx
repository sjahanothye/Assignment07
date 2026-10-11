"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/types";
import { toBengaliDigits, formatUnit } from "@/lib/utils";

interface PriceTickerProps {
  products: Product[];
}

export default function PriceTicker({ products }: PriceTickerProps) {
  if (!products || products.length === 0) return null;

  // Duplicate items for seamless continuous looping marquee
  const tickerItems = [...products, ...products];

  return (
    <div className="w-full bg-slate-900 border-y border-slate-800 text-white overflow-hidden py-2.5 text-xs select-none">
      <div className="flex items-center">
        {/* Live Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 text-emerald-400 border-r border-slate-800 font-semibold shrink-0 z-10 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>লাইভ দর</span>
        </div>

        {/* Scrolling Strip */}
        <div className="overflow-hidden flex-1 relative">
          <div className="animate-marquee flex items-center gap-6 whitespace-nowrap">
            {tickerItems.map((p, idx) => {
              const isUp = p.change.dir === "up";
              const isDown = p.change.dir === "down";
              const pctVal = Math.abs(p.change.pct).toFixed(1);
              const pctBn = toBengaliDigits(pctVal);
              const priceBn = toBengaliDigits(p.today);
              const unitBn = formatUnit(p.unit).replace("প্রতি ", "");

              return (
                <Link
                  key={`${p.id}-${idx}`}
                  href={`/product/${p.slug || p.id}`}
                  className="inline-flex items-center gap-2 hover:text-emerald-400 transition-colors group px-2 py-0.5 rounded"
                >
                  <span className="text-sm">{p.image || p.categoryIcon || "🛒"}</span>
                  <span className="font-medium text-slate-200 group-hover:text-white">
                    {p.nameBn}
                  </span>
                  <span className="text-slate-400 font-medium">
                    {priceBn} ৳/{unitBn}
                  </span>
                  <span
                    className={`inline-flex items-center text-[11px] font-bold px-1.5 py-0.5 rounded ${
                      isUp
                        ? "bg-emerald-500/15 text-emerald-400"
                        : isDown
                        ? "bg-rose-500/15 text-rose-400"
                        : "bg-slate-700 text-slate-300"
                    }`}
                  >
                    {isUp ? "▲" : isDown ? "▼" : "—"} {pctBn}%
                  </span>
                  <span className="text-slate-700 select-none">•</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
