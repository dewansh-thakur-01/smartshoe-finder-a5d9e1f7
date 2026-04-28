import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { useCart, cartStore } from "@/lib/cart-store";
import { getProduct } from "@/lib/products";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — 537" }] }),
  component: Checkout,
});

function Checkout() {
  const items = useCart();
  const lines = items.map((i) => ({ ...i, product: getProduct(i.id)! })).filter((l) => l.product);
  const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
  const total = subtotal + (subtotal > 2999 ? 0 : 199);
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="container mx-auto px-4 py-24 text-center max-w-lg">
        <CheckCircle2 className="h-16 w-16 text-brand mx-auto" />
        <h1 className="font-display text-5xl mt-4">Order Placed</h1>
        <p className="text-muted-foreground mt-3">Thanks for shopping with 537. A confirmation will arrive shortly.</p>
        <Link to="/" className="mt-6 inline-block bg-foreground text-background font-semibold px-6 py-3 rounded-full">Back home</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 lg:px-8 py-10">
      <h1 className="font-display text-5xl mb-10">Checkout</h1>
      <form
        onSubmit={(e) => { e.preventDefault(); cartStore.clear(); setDone(true); }}
        className="grid lg:grid-cols-[1fr_400px] gap-10"
      >
        <div className="space-y-8">
          <Section title="Contact">
            <Input label="Email" type="email" required />
            <Input label="Phone" type="tel" required />
          </Section>
          <Section title="Shipping address">
            <div className="grid grid-cols-2 gap-3">
              <Input label="First name" required />
              <Input label="Last name" required />
            </div>
            <Input label="Address" required />
            <div className="grid grid-cols-2 gap-3">
              <Input label="City" required />
              <Input label="PIN code" required />
            </div>
          </Section>
          <Section title="Payment">
            <div className="grid grid-cols-3 gap-2 mb-4">
              {["Card", "UPI", "COD"].map((m, i) => (
                <label key={m} className="border border-border rounded p-3 text-sm font-semibold text-center cursor-pointer has-[:checked]:border-foreground has-[:checked]:bg-foreground has-[:checked]:text-background">
                  <input type="radio" name="pay" defaultChecked={i === 0} className="sr-only" />{m}
                </label>
              ))}
            </div>
            <Input label="Card number" placeholder="1234 5678 9012 3456" />
            <div className="grid grid-cols-2 gap-3">
              <Input label="Expiry" placeholder="MM/YY" />
              <Input label="CVV" placeholder="123" />
            </div>
          </Section>
        </div>
        <aside className="bg-surface rounded-md p-6 h-fit lg:sticky lg:top-24 space-y-4">
          <h2 className="font-display text-2xl">Order</h2>
          <div className="space-y-3">
            {lines.map((l) => (
              <div key={`${l.id}-${l.size}`} className="flex gap-3 text-sm">
                <div className="w-14 h-14 bg-background rounded shrink-0">
                  <img src={l.product.image} alt="" width={56} height={56} className="h-full w-full object-cover rounded" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{l.product.name}</p>
                  <p className="text-muted-foreground text-xs">Size {l.size} · Qty {l.qty}</p>
                </div>
                <p className="font-semibold">₹ {(l.product.price * l.qty).toLocaleString("en-IN")}</p>
              </div>
            ))}
            {lines.length === 0 && <p className="text-sm text-muted-foreground">Your bag is empty.</p>}
          </div>
          <div className="border-t border-border pt-4 flex justify-between font-bold">
            <span>Total</span><span>₹ {total.toLocaleString("en-IN")}</span>
          </div>
          <button type="submit" disabled={lines.length === 0} className="w-full bg-foreground text-background font-semibold py-4 rounded-full hover:bg-brand disabled:opacity-50 transition-colors">
            Place order
          </button>
        </aside>
      </form>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-2xl mb-4">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Input({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
      <input {...rest} className="mt-1 w-full px-4 py-3 border border-border rounded bg-background outline-none focus:border-foreground" />
    </label>
  );
}
