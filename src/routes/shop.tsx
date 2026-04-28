import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { SlidersHorizontal } from "lucide-react";

type Search = { category?: "men" | "women" | "sports" | "casual" };

export const Route = createFileRoute("/shop")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    category: (["men","women","sports","casual"].includes(s.category as string) ? s.category : undefined) as Search["category"],
  }),
  head: () => ({
    meta: [
      { title: "Shop All Shoes — 537" },
      { name: "description", content: "Browse all 537 shoes. Filter by size, brand, color and price." },
    ],
  }),
  component: Shop,
});

const sizes = [6, 7, 8, 9, 10, 11, 12];
const colors = ["Black", "White", "Pink", "Beige", "Orange"];

function Shop() {
  const { category } = Route.useSearch();
  const [size, setSize] = useState<number | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState(7000);

  const filtered = products.filter((p) => {
    if (category && p.category !== category) return false;
    if (color && !p.color.toLowerCase().includes(color.toLowerCase())) return false;
    if (p.price > maxPrice) return false;
    return true;
  });

  return (
    <div className="container mx-auto px-4 lg:px-8 py-10">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-xs uppercase tracking-widest text-brand font-bold mb-2">{category ?? "All"}</p>
          <h1 className="font-display text-5xl">{category ? `${category} Shoes` : "All Shoes"}</h1>
        </div>
        <p className="text-sm text-muted-foreground">{filtered.length} results</p>
      </div>

      <div className="grid lg:grid-cols-[260px_1fr] gap-10">
        {/* FILTERS */}
        <aside className="space-y-8">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </div>

          <div>
            <h3 className="font-semibold mb-3">Size</h3>
            <div className="grid grid-cols-4 gap-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(size === s ? null : s)}
                  className={`h-10 text-sm border rounded ${size === s ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"}`}
                >{s}</button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Color</h3>
            <div className="space-y-2">
              {colors.map((c) => (
                <label key={c} className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="radio" name="color" checked={color === c}
                    onChange={() => setColor(color === c ? null : c)}
                    className="accent-foreground"
                  />
                  {c}
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Max price: ₹{maxPrice.toLocaleString("en-IN")}</h3>
            <input
              type="range" min={2000} max={7000} step={500}
              value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)}
              className="w-full accent-brand"
            />
          </div>

          <div>
            <h3 className="font-semibold mb-3">Brand</h3>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" defaultChecked className="accent-foreground" /> 537
            </label>
          </div>
        </aside>

        {/* GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => <ProductCard key={p.id} p={p} />)}
          {filtered.length === 0 && (
            <p className="col-span-full text-center text-muted-foreground py-20">No matches. Try widening your filters.</p>
          )}
        </div>
      </div>
    </div>
  );
}
