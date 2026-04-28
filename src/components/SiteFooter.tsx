import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="bg-foreground text-background mt-24">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="font-display text-lg mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/shop" search={{ category: "men" }}>Men</Link></li>
              <li><Link to="/shop" search={{ category: "women" }}>Women</Link></li>
              <li><Link to="/shop" search={{ category: "sports" }}>Sports</Link></li>
              <li><Link to="/shop" search={{ category: "casual" }}>Casual</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-lg mb-4">Help</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>Order Status</li><li>Shipping</li><li>Returns</li><li>Contact</li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-lg mb-4">About</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>Our Story</li><li>Careers</li><li>Sustainability</li><li>Press</li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-lg mb-4">Find us on</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><a href="#" className="hover:text-brand">Flipkart</a></li>
              <li><a href="#" className="hover:text-brand">Amazon</a></li>
              <li><a href="#" className="hover:text-brand">Meesho</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row justify-between gap-4 text-xs text-background/50">
          <div className="flex items-center gap-2">
            <span className="bg-background text-foreground px-2 py-0.5 font-display text-base">537</span>
            <span>© {new Date().getFullYear()} 537 Shoe Shopping. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <a href="#">Privacy</a><a href="#">Terms</a><a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
