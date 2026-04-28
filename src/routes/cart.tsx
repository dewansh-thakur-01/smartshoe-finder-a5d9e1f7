import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2, Minus, Plus } from "lucide-react";
import { useCart, cartStore } from "@/lib/cart-store";
import { getProduct } from "@/lib/products";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Bag — 537" }] }),
  component: CartPage,
});

function CartPage() {
  const items = useCart();
  const lines = items.map((i) => ({ ...i, product: getProduct(i.id)! })).filter((l) => l.product);
  const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
  const shipping = subtotal > 2999 || subtotal === 0 ? 0 : 199;
  const total = subtotal + shipping;

  if (lines.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="font-display text-5xl">Your bag is empty</h1>
        <p className="text-muted-foreground mt-3">Time to find your next pair.</p>
        <Link to="/shop" className="mt-6 inline-block bg-foreground text-background font-semibold px-6 py-3 rounded-full">Shop now</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 lg:px-8 py-10">
      <h1 className="font-display text-5xl mb-10">Your Bag</h1>
      <div className="grid lg:grid-cols-[1fr_400px] gap-10">
        <div className="space-y-6">
          {lines.map((l) => (
            <div key={`${l.id}-${l.size}`} className="flex gap-4 pb-6 border-b border-border">
              <div className="w-28 h-28 sm:w-36 sm:h-36 bg-surface rounded shrink-0">
                <img src={l.product.image} alt={l.product.name} width={256} height={256} className="h-full w-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold">{l.product.name}</h3>
                    <p className="text-sm text-muted-foreground">{l.product.subtitle}</p>
                    <p className="text-sm text-muted-foreground">Size {l.size}</p>
                  </div>
                  <p className="font-bold">₹ {(l.product.price * l.qty).toLocaleString("en-IN")}</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="inline-flex items-center border border-border rounded-full">
                    <button onClick={() => cartStore.setQty(l.id, l.size, Math.max(1, l.qty - 1))} className="h-9 w-9 flex items-center justify-center" aria-label="Decrease"><Minus className="h-3 w-3" /></button>
                    <span className="w-8 text-center text-sm font-semibold">{l.qty}</span>
                    <button onClick={() => cartStore.setQty(l.id, l.size, l.qty + 1)} className="h-9 w-9 flex items-center justify-center" aria-label="Increase"><Plus className="h-3 w-3" /></button>
                  </div>
                  <button onClick={() => cartStore.remove(l.id, l.size)} aria-label="Remove" className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <aside className="bg-surface rounded-md p-6 h-fit lg:sticky lg:top-24">
          <h2 className="font-display text-2xl mb-4">Summary</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between"><dt>Subtotal</dt><dd>₹ {subtotal.toLocaleString("en-IN")}</dd></div>
            <div className="flex justify-between"><dt>Shipping</dt><dd>{shipping === 0 ? "Free" : `₹ ${shipping}`}</dd></div>
            <div className="flex justify-between font-bold text-base pt-3 border-t border-border mt-3">
              <dt>Total</dt><dd>₹ {total.toLocaleString("en-IN")}</dd>
            </div>
          </dl>
          <Link to="/checkout" className="mt-6 block text-center bg-foreground text-background font-semibold py-4 rounded-full hover:bg-brand transition-colors">
            Checkout
          </Link>
        </aside>
      </div>
    </div>
  );
}
