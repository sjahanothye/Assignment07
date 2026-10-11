import React from "react";
import Link from "next/link";
import { Product } from "@/types";
import { toBengaliDigits, formatUnit } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";
  const pctVal = Math.abs(product.change?.pct || 0).toFixed(1);
  const pctBn = toBengaliDigits(pctVal);
  const priceBn = toBengaliDigits(product.today);
  const unitBn = formatUnit(product.unit);

  const destinationSlug = product.slug || product.id;

  return (
    <Link
      href={`/product/${destinationSlug}`}
      className="group relative bg-white rounded-2xl p-5 border border-slate-200/90 hover:border-emerald-500/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1"
    >
      {/* Top row: Category tag & Change badge */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold group-hover:bg-emerald-50 group-hover:text-emerald-800 transition-colors">
          <span>{product.categoryIcon || "🏷️"}</span>
          <span>{product.categoryNameBn || product.category}</span>
        </span>

        {/* Change Badge */}
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold tracking-tight shadow-xs ${
            isUp
              ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
              : isDown
              ? "bg-rose-100 text-rose-800 border border-rose-200"
              : "bg-slate-100 text-slate-700 border border-slate-200"
          }`}
        >
          <span>{isUp ? "▲" : isDown ? "▼" : "—"}</span>
          <span>{pctBn}%</span>
        </span>
      </div>

      {/* Middle: Visual Emoji & Product Title */}
      <div className="flex items-center gap-4 my-2">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-50 to-slate-100 border border-slate-200/80 flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform duration-300">
          {product.image || product.categoryIcon || "🛒"}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors truncate">
            {product.nameBn}
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            {unitBn}
          </p>
        </div>
      </div>

      {/* Bottom: Price row & Action indicator */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span className="block text-[11px] font-medium text-slate-500">
            আজকের দাম
          </span>
          <span className="text-xl font-black text-slate-900 tracking-tight flex items-baseline gap-1">
            <span>{priceBn}</span>
            <span className="text-xs font-medium text-slate-600">টাকা</span>
          </span>
        </div>

        <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-xs">
          <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
