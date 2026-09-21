import { Link, usePathname } from "@/lib/router";
import { Facebook, Instagram, Menu, MessageCircle, Search, ShoppingBag } from "lucide-react";
import { useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Toaster } from "@/components/ui/sonner";
import { ShopProvider, useShop } from "@/context/shop-context";
import { categories, products } from "@/data/catalog";
import { InstallAppBanner } from "@/components/pwa/InstallAppBanner";
import { InstallAppButton } from "@/components/pwa/InstallAppButton";
import { OfflineIndicator } from "@/components/pwa/OfflineIndicator";
import { UpdateAvailableToast } from "@/components/pwa/UpdateAvailableToast";
import { PWAProvider } from "@/hooks/usePWAInstall";
import { Brand } from "./Brand";

const nav = [
  ["/", "Home"],
  ["/men", "Men"],
  ["/women", "Women"],
  ["/kids", "Kids"],
  ["/new-arrivals", "New Arrivals"],
  ["/branches", "Branches"],
  ["/about", "About"],
] as const;

function SearchOverlay() {
  const [q, setQ] = useState("");
  const results = q
    ? products.filter((p) => p.name.toLowerCase().includes(q.toLowerCase())).slice(0, 5)
    : [];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-header-foreground hover:bg-header-muted"
          aria-label="Search"
        >
          <Search />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Search MAAAX</DialogTitle>
        </DialogHeader>
        <Input
          autoFocus
          aria-label="Search products"
          placeholder="Search T-shirts, jeans, hoodies..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="h-12"
        />
        <div className="min-h-48">
          <p className="mb-3 text-xs font-bold uppercase text-muted-foreground">
            {q ? "Suggested products" : "Popular categories"}
          </p>
          {q ? (
            results.map((p) => (
              <Link
                key={p.id}
                to="/product/$slug"
                params={{ slug: p.slug }}
                className="grid grid-cols-[48px_minmax(0,1fr)_auto] items-center gap-3 border-t py-3"
              >
                <img src={p.image} alt="" className="h-12 w-12 object-cover" />
                <span className="truncate font-medium">{p.name}</span>
                <span className="text-sm">Rs. {p.price}</span>
              </Link>
            ))
          ) : (
            <div className="flex flex-wrap gap-2">
              {categories.slice(0, 6).map((c) => (
                <Link
                  key={c.slug}
                  to="/category/$category"
                  params={{ category: c.slug }}
                  className="border px-3 py-2 text-sm"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Header() {
  const path = usePathname();
  const { cartCount } = useShop();

  return (
    <header className="sticky top-0 z-40 bg-header text-header-foreground shadow-header">
      <div className="mx-auto grid h-16 max-w-[1480px] grid-cols-[auto_1fr_auto] items-center gap-3 px-3 sm:gap-5 sm:px-4 lg:px-8">
        <Brand compact />
        <nav className="hidden items-center justify-center gap-7 lg:flex" aria-label="Main navigation">
          {nav.map(([to, label]) => (
            <Link key={to} to={to} className={`nav-link text-xs ${path === to ? "is-active" : ""}`}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center justify-end gap-1">
          <SearchOverlay />
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="relative text-header-foreground hover:bg-header-muted"
          >
            <Link to="/cart" aria-label={`Shopping cart with ${cartCount} items`}>
              <ShoppingBag />
              {cartCount > 0 && (
                <span className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[9px] font-bold text-gold-foreground">
                  {cartCount}
                </span>
              )}
            </Link>
          </Button>
          <InstallAppButton className="hidden lg:inline-flex" />
          <Button asChild variant="gold" size="sm" className="hidden md:inline-flex">
            <Link to="/branches">Find Nearest Branch</Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-header-foreground hover:bg-header-muted lg:hidden"
                aria-label="Open menu"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[86vw] bg-header text-header-foreground sm:max-w-sm">
              <SheetHeader>
                <SheetTitle>
                  <Brand />
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-10 flex flex-col" aria-label="Mobile navigation">
                {[...nav.slice(1), ["/categories", "Categories"], ["/contact", "Contact"]].map(
                  ([to, label]) => (
                    <SheetClose asChild key={to}>
                      <Link to={to} className="border-b border-header-border py-4 text-lg">
                        {label}
                      </Link>
                    </SheetClose>
                  ),
                )}
                <SheetClose asChild>
                  <Button asChild variant="gold" size="lg" className="mt-6">
                    <Link to="/branches">Find Nearest Branch</Link>
                  </Button>
                </SheetClose>
                <InstallAppButton size="lg" className="mt-3 w-full" />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  const groups = [
    ["Shop", [["Men", "/men"], ["Women", "/women"], ["Kids", "/kids"], ["New Arrivals", "/new-arrivals"]]],
    ["Company", [["About", "/about"], ["Branches", "/branches"], ["Contact", "/contact"]]],
    ["Help", [["Size Guide", "/contact"], ["Returns", "/contact"], ["Track Order", "/order-success"], ["Admin", "/admin"]]],
  ] as const;

  return (
    <footer className="bg-header py-14 text-header-foreground">
      <div className="mx-auto grid max-w-[1480px] grid-cols-2 gap-x-6 gap-y-8 px-4 sm:px-5 md:grid-cols-4 lg:grid-cols-5 lg:gap-10 lg:px-8">
        <div className="col-span-2 lg:col-span-2">
          <Brand />
          <p className="mt-5 max-w-sm text-sm leading-6 text-header-subtle">
            Contemporary fashion, fair wholesale value and a growing branch network across Maharashtra.
          </p>
        </div>
        {groups.map(([title, links], index) => (
          <div key={title} className={index === 2 ? "col-span-2 sm:col-span-1" : ""}>
            <h2 className="mb-4 text-sm font-bold uppercase">{title}</h2>
            <ul className="space-y-3 text-sm text-header-subtle">
              {links.map(([label, to]) => (
                <li key={label}>
                  <Link to={to} className="hover:text-header-foreground">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-10 flex max-w-[1480px] flex-col items-start justify-between gap-5 border-t border-header-border px-4 pt-7 text-xs text-header-subtle sm:flex-row sm:items-center sm:px-5 lg:mt-12 lg:px-8">
        <span>© MAAAX WHOLESALER. All Rights Reserved.</span>
        <div className="flex gap-4" aria-label="Social channels">
          <Instagram />
          <Facebook />
          <MessageCircle />
        </div>
      </div>
    </footer>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <ShopProvider>
      <PWAProvider>
        <Header />
        <InstallAppBanner />
        <main>{children}</main>
        <Footer />
        <OfflineIndicator />
        <UpdateAvailableToast />
        <Toaster position="top-center" />
      </PWAProvider>
    </ShopProvider>
  );
}

