import { useSyncExternalStore } from "react";

export type CartItem = { id: string; size: number; qty: number };

let cart: CartItem[] = [];
const listeners = new Set<() => void>();

const emit = () => listeners.forEach((l) => l());

export const cartStore = {
  add(item: CartItem) {
    const existing = cart.find((c) => c.id === item.id && c.size === item.size);
    if (existing) existing.qty += item.qty;
    else cart = [...cart, item];
    emit();
  },
  remove(id: string, size: number) {
    cart = cart.filter((c) => !(c.id === id && c.size === size));
    emit();
  },
  setQty(id: string, size: number, qty: number) {
    cart = cart.map((c) => (c.id === id && c.size === size ? { ...c, qty } : c));
    emit();
  },
  clear() { cart = []; emit(); },
  get() { return cart; },
  subscribe(l: () => void) { listeners.add(l); return () => listeners.delete(l); },
};

export const useCart = () =>
  useSyncExternalStore(cartStore.subscribe, cartStore.get, () => [] as CartItem[]);
