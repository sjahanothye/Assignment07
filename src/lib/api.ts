import { Product, Category } from "@/types";

const API_BASES = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor"
];

async function fetchFromApi<T>(endpoint: string): Promise<T> {
  let lastError: unknown = null;

  for (const base of API_BASES) {
    try {
      const url = `${base}${endpoint}`;
      const res = await fetch(url, {
        next: { revalidate: 60 },
        headers: {
          "Accept": "application/json"
        }
      });

      if (!res.ok) {
        continue;
      }

      const data = await res.json();
      return data as T;
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError || new Error(`Failed to fetch from ${endpoint}`);
}

export async function getProducts(): Promise<Product[]> {
  try {
    const data = await fetchFromApi<Product[]>("/products");
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const data = await fetchFromApi<Category[]>("/categories");
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [
      { id: "chal", slug: "chal", nameBn: "চাল", icon: "🍚" },
      { id: "dal", slug: "dal", nameBn: "ডাল", icon: "🥣" },
      { id: "tel", slug: "tel", nameBn: "তেল", icon: "🫙" },
      { id: "sobji", slug: "sobji", nameBn: "সবজি", icon: "🥔" },
      { id: "mach", slug: "mach", nameBn: "মাছ", icon: "🐟" },
      { id: "mangsho", slug: "mangsho", nameBn: "মাংস", icon: "🍗" },
      { id: "dim-dui", slug: "dim-dui", nameBn: "ডিম-দুধ", icon: "🥚" },
      { id: "mosla", slug: "mosla", nameBn: "মসলা", icon: "🧄" }
    ];
  }
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  try {
    const data = await fetchFromApi<Product[]>(`/products?category=${encodeURIComponent(categorySlug)}`);
    if (Array.isArray(data) && data.length > 0) {
      return data;
    }
    // Fallback: fetch all and filter client/server side
    const all = await getProducts();
    return all.filter((p) => p.category === categorySlug || p.slug === categorySlug);
  } catch (error) {
    console.error(`Error fetching products for category ${categorySlug}:`, error);
    const all = await getProducts();
    return all.filter((p) => p.category === categorySlug);
  }
}

export async function getProductByIdOrSlug(idOrSlug: string | number): Promise<Product | null> {
  const isNumeric = !isNaN(Number(idOrSlug));
  
  if (isNumeric) {
    try {
      const data = await fetchFromApi<Product>(`/products/${idOrSlug}`);
      if (data && data.nameBn) {
        return data;
      }
    } catch {
      // fallback to list search
    }
  }

  // Search in all products by slug or id
  const all = await getProducts();
  const found = all.find(
    (p) => p.slug === idOrSlug || String(p.id) === String(idOrSlug)
  );
  return found || null;
}
