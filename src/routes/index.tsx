import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Search } from "lucide-react";
import heroShoe from "@/assets/hero-shoe.jpg";
import catMen from "@/assets/cat-men.jpg";
import catWomen from "@/assets/cat-women.jpg";
import catSports from "@/assets/cat-sports.jpg";
import catCasual from "@/assets/cat-casual.jpg";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "537 Shoe Shopping — AI-Powered Sneaker Store" },
      { name: "description", content: "Bold sneakers, smart shopping. Find your perfect pair with 537's AI-powered shoe finder." },
    ],
  }),
  component: Home,
});

const categories = [
  { name: "Men", img: catMen, slug: "men" as const },
  { name: "Women", img: catWomen, slug: "women" as const },
  { name: "Sports", img: catSports, slug: "sports" as const },
  { name: "Casual", img: catCasual, slug: "casual" as const },
];

function Home() {
  const featured = products.slice(0, 4);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-surface">
        <div className="container mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-8 items-center min-h-[80vh] py-12">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-foreground text-background text-xs uppercase tracking-widest font-bold px-3 py-1.5 mb-6">
              <Sparkles className="h-3 w-3 text-brand" /> AI Shoe Finder · Live
            </div>
            <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl xl:text-9xl leading-[0.85]">
              Just<br />Find<br /><span className="text-brand">It.</span>
            </h1>
            <p className="mt-6 max-w-md text-base text-muted-foreground">
              From the track to the street. 537 uses AI to match you with shoes built for the way you move.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/shop" className="inline-flex items-center gap-2 bg-foreground text-background font-semibold px-6 py-3.5 rounded-full hover:bg-brand transition-colors">
                Shop the drop <ArrowRight className="h-4 w-4" />
              </Link>
              <button className="inline-flex items-center gap-2 border border-foreground font-semibold px-6 py-3.5 rounded-full hover:bg-foreground hover:text-background transition-colors">
                <Search className="h-4 w-4" /> Try AI search
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-10 -right-10 font-display text-[12rem] lg:text-[18rem] text-foreground/5 leading-none select-none pointer-events-none">
              537
            </div>
            <img
              src={heroShoe}
              alt="Air Runner 537 hero sneaker"
              width={1536}
              height={1536}
              className="relative z-10 w-full h-auto drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* AI SEARCH BAR */}
      <section className="border-y border-border bg-foreground text-background">
        <div className="container mx-auto px-4 lg:px-8 py-6 flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <Sparkles className="h-5 w-5 text-brand" />
            <span className="font-display tracking-widest">ASK 537 AI</span>
          </div>
          <div className="flex-1 w-full flex items-center gap-2 bg-background/10 rounded-full px-5 py-3">
            <Search className="h-4 w-4 opacity-70" />
            <input
              placeholder="Try: running shoes under 5000…"
              className="bg-transparent outline-none flex-1 text-sm placeholder:text-background/60"
            />
            <button className="bg-brand text-brand-foreground text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">Find</button>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container mx-auto px-4 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-display text-4xl sm:text-5xl">Shop by sport</h2>
          <Link to="/shop" className="text-sm font-semibold underline underline-offset-4">View all</Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/shop"
              search={{ category: c.slug }}
              className="group relative aspect-[3/4] overflow-hidden rounded-md bg-surface"
            >
              <img
                src={c.img}
                alt={`${c.name} shoes category`}
                loading="lazy"
                width={1024}
                height={1280}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <h3 className="font-display text-3xl">{c.name}</h3>
                <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest mt-1 opacity-90">
                  Shop now <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="container mx-auto px-4 lg:px-8 pb-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs uppercase tracking-widest text-brand font-bold mb-2">Featured Drop</p>
            <h2 className="font-display text-4xl sm:text-5xl">This week's heat</h2>
          </div>
          <Link to="/shop" className="text-sm font-semibold underline underline-offset-4">All shoes</Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="container mx-auto px-4 lg:px-8 pb-20">
        <div className="bg-foreground text-background rounded-md p-10 lg:p-16 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-xs uppercase tracking-widest text-brand font-bold mb-3">Member Exclusive</p>
            <h2 className="font-display text-4xl lg:text-6xl">Become a 537 Member.</h2>
            <p className="mt-4 text-background/70 max-w-md">Free shipping, early drops, AI-personalised picks based on your style.</p>
            <button className="mt-6 bg-brand text-brand-foreground font-semibold px-6 py-3 rounded-full">Join Free</button>
          </div>
          <div className="font-display text-[8rem] lg:text-[14rem] leading-none text-right opacity-20 select-none">537</div>
        </div>
      </section>
    </div>
  );
}
