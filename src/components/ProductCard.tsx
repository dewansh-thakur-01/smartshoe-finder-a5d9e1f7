import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/products";

export function ProductCard({ p }: { p: Product }) {
  return (
    <Link
      to="/product/$id"
      params={{ id: p.id }}
      className="group block hover-lift"
    >
      <div className="relative aspect-square bg-surface overflow-hidden rounded-md">
        {p.badge && (
          <span className="absolute top-3 left-3 z-10 bg-brand text-brand-foreground text-[10px] font-bold uppercase tracking-widest px-2 py-1">
            {p.badge}
          </span>
        )}
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          width={1024}
          height={1024}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="pt-3">
        <p className="text-xs uppercase tracking-widest text-brand font-bold">{p.subtitle}</p>
        <h3 className="font-semibold mt-1 group-hover:underline">{p.name}</h3>
        <p className="text-sm text-muted-foreground capitalize">{p.color} · {p.category}</p>
        <p className="font-bold mt-1">₹ {p.price.toLocaleString("en-IN")}</p>
      </div>
    </Link>
  );
}
