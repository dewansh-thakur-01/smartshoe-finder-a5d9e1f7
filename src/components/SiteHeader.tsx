import { Link } from "@tanstack/react-router";
import { ShoppingBag, Search, Menu, User } from "lucide-react";
import { useCart } from "@/lib/cart-store";

export function SiteHeader() {
  const cart = useCart();
  const count = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <>
      <div className="bg-foreground text-background text-xs overflow-hidden">
        <div className="marquee whitespace-nowrap py-2">
          {Array.from({ length: 2 }).map((_, j) => (
            <div key={j} className="flex shrink-0 gap-12 px-6">
              {["FREE SHIPPING OVER ₹2999", "AI-POWERED SHOE FINDER", "30-DAY RETURNS", "537 MEMBER DROPS WEEKLY"].map((t, i) => (
                <span key={i} className="font-semibold tracking-widest">★ {t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 lg:px-8 h-16 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 font-display text-2xl tracking-tight">
            <span className="bg-foreground text-background px-2 py-0.5">537</span>
            <span className="hidden sm:inline">SHOE</span>
          </Link>
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold uppercase tracking-wide">
            <Link to="/shop" search={{ category: "men" }} className="hover:text-brand">Men</Link>
            <Link to="/shop" search={{ category: "women" }} className="hover:text-brand">Women</Link>
            <Link to="/shop" search={{ category: "sports" }} className="hover:text-brand">Sports</Link>
            <Link to="/shop" search={{ category: "casual" }} className="hover:text-brand">Casual</Link>
            <Link to="/shop" className="hover:text-brand">All</Link>
          </nav>
          <div className="flex items-center gap-1">
            <button aria-label="Search" className="p-2 hover:bg-secondary rounded-full">
              <Search className="h-5 w-5" />
            </button>
            <button aria-label="Account" className="p-2 hover:bg-secondary rounded-full hidden sm:inline-flex">
              <User className="h-5 w-5" />
            </button>
            <Link to="/cart" aria-label="Cart" className="p-2 hover:bg-secondary rounded-full relative">
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-brand text-brand-foreground text-[10px] font-bold rounded-full h-4 min-w-4 px-1 flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>
            <button aria-label="Menu" className="p-2 hover:bg-secondary rounded-full lg:hidden">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
