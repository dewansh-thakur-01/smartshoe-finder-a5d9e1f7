import { Outlet, createRootRoute, HeadContent, Scripts, Link } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AiChat } from "@/components/AiChat";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl">404</h1>
        <p className="mt-4 text-muted-foreground">This page took a wrong turn off the track.</p>
        <Link to="/" className="mt-6 inline-block bg-foreground text-background font-semibold px-6 py-3 rounded-full">
          Back home
        </Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "537 Shoe Shopping — AI-Powered Sneaker Store" },
      { name: "description", content: "Discover the perfect pair with 537. AI-powered shoe shopping for runners, athletes and street style." },
      { property: "og:title", content: "537 Shoe Shopping — AI-Powered Sneaker Store" },
      { property: "og:description", content: "Discover the perfect pair with 537. AI-powered shoe shopping for runners, athletes and street style." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "537 Shoe Shopping — AI-Powered Sneaker Store" },
      { name: "twitter:description", content: "Discover the perfect pair with 537. AI-powered shoe shopping for runners, athletes and street style." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/468c9897-0c18-46ab-a1cf-be9f3112c912/id-preview-e91fe4ed--5ff25752-400e-4839-aca7-6d99302bb8c7.lovable.app-1777392134240.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/468c9897-0c18-46ab-a1cf-be9f3112c912/id-preview-e91fe4ed--5ff25752-400e-4839-aca7-6d99302bb8c7.lovable.app-1777392134240.png" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1"><Outlet /></main>
      <SiteFooter />
      <AiChat />
    </div>
  );
}
