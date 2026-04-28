import shoe1 from "@/assets/shoe-1.jpg";
import shoe2 from "@/assets/shoe-2.jpg";
import shoe3 from "@/assets/shoe-3.jpg";
import shoe4 from "@/assets/shoe-4.jpg";

export type Product = {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  category: "men" | "women" | "sports" | "casual";
  brand: string;
  color: string;
  image: string;
  badge?: string;
};

export const products: Product[] = [
  { id: "537-air-runner", name: "Air Runner 537", subtitle: "Men's Road Running", price: 4999, category: "men", brand: "537", color: "Black", image: shoe1, badge: "New" },
  { id: "537-court-hi", name: "Court Hi Blaze", subtitle: "Men's Basketball", price: 6499, category: "sports", brand: "537", color: "White/Orange", image: shoe2, badge: "Hot" },
  { id: "537-glide-w", name: "Glide Pro W", subtitle: "Women's Running", price: 5299, category: "women", brand: "537", color: "Pink", image: shoe3 },
  { id: "537-canvas-low", name: "Canvas Low 01", subtitle: "Casual Everyday", price: 2799, category: "casual", brand: "537", color: "Beige", image: shoe4 },
  { id: "537-air-runner-2", name: "Air Runner 537 v2", subtitle: "Men's Trail", price: 5499, category: "sports", brand: "537", color: "Black", image: shoe1 },
  { id: "537-court-low", name: "Court Low Street", subtitle: "Casual Sneaker", price: 3999, category: "casual", brand: "537", color: "White", image: shoe2 },
  { id: "537-glide-w2", name: "Glide Pro W v2", subtitle: "Women's Training", price: 5799, category: "women", brand: "537", color: "Pink", image: shoe3, badge: "New" },
  { id: "537-canvas-mid", name: "Canvas Mid 02", subtitle: "Lifestyle", price: 3299, category: "men", brand: "537", color: "Beige", image: shoe4 },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
