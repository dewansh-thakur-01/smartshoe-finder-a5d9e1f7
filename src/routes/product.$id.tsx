import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Star, Truck, RotateCcw, Shield } from "lucide-react";
import { getProduct, products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Marketplaces } from "@/components/Marketplaces";
import { cartStore } from "@/lib/cart-store";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.product.name} — 537 Shoe Shopping` },
      { name: "description", content: `${loaderData?.product.name} · ${loaderData?.product.subtitle}. Available now at 537.` },
      { property: "og:title", content: `${loaderData?.product.name} — 537` },
      { property: "og:image", content: loaderData?.product.image },
    ],
  }),
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <div className="container mx-auto py-20 text-center">
        <p className="text-destructive">{error.message}</p>
        <button onClick={() => { router.invalidate(); reset(); }} className="mt-4 underline">Retry</button>
      </div>
    );
  },
  notFoundComponent: () => (
    <div className="container mx-auto py-20 text-center">
      <h1 className="font-display text-5xl">Shoe not found</h1>
      <Link to="/shop" className="mt-4 inline-block underline">Back to shop</Link>
    </div>
  ),
  component: ProductPage,
});

const sizes = [6, 7, 8, 9, 10, 11, 12];

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [size, setSize] = useState<number | null>(null);
  const [added, setAdded] = useState(false);
  const related = products.filter((p) => p.id !== product.id).slice(0, 4);

  const add = () => {
    if (!size) return;
    cartStore.add({ id: product.id, size, qty: 1 });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8">
      <nav className="text-xs text-muted-foreground mb-6">
        <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* IMAGES */}
        <div className="space-y-3">
          <div className="aspect-square bg-surface rounded-md overflow-hidden">
            <img src={product.image} alt={product.name} width={1024} height={1024} className="h-full w-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[product.image, product.image, product.image, product.image].map((src, i) => (
              <div key={i} className="aspect-square bg-surface rounded overflow-hidden border border-border">
                <img src={src} alt="" loading="lazy" width={256} height={256} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* INFO */}
        <div>
          <p className="text-xs uppercase tracking-widest text-brand font-bold">{product.subtitle}</p>
          <h1 className="font-display text-4xl lg:text-5xl mt-2">{product.name}</h1>
          <div className="flex items-center gap-2 mt-3">
            {[1,2,3,4,5].map((i) => <Star key={i} className="h-4 w-4 fill-foreground text-foreground" />)}
            <span className="text-sm text-muted-foreground">4.8 · 124 reviews</span>
          </div>
          <p className="font-bold text-2xl mt-4">₹ {product.price.toLocaleString("en-IN")}</p>

          <div className="mt-8">
            <div className="flex justify-between mb-3">
              <h3 className="font-semibold">Select size (UK)</h3>
              <button className="text-sm underline">Size guide</button>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`h-12 border rounded font-semibold ${size === s ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"}`}
                >{s}</button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={add}
              disabled={!size}
              className="flex-1 bg-foreground text-background font-semibold py-4 rounded-full hover:bg-brand disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {added ? "Added ✓" : size ? "Add to bag" : "Select a size"}
            </button>
            <button aria-label="Favorite" className="h-14 w-14 border border-border rounded-full flex items-center justify-center hover:border-foreground">
              <Heart className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-8 space-y-3 text-sm">
            <p className="text-muted-foreground">
              The {product.name} brings energy to every step. Engineered with responsive cushioning and a breathable upper for all-day comfort. Built by 537, for the streets you run.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3 text-xs">
            {[{i: Truck, t: "Free shipping"}, {i: RotateCcw, t: "30-day returns"}, {i: Shield, t: "2-yr warranty"}].map(({i: Icon, t}) => (
              <div key={t} className="flex flex-col items-center text-center gap-1 p-3 border border-border rounded">
                <Icon className="h-5 w-5" /><span>{t}</span>
              </div>
            ))}
          </div>

          <Marketplaces className="mt-10 pt-8 border-t border-border" productName={product.name} />
        </div>
      </div>

      {/* RELATED */}
      <section className="mt-24">
        <h2 className="font-display text-3xl mb-6">You may also like</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {related.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>
    </div>
  );
}
