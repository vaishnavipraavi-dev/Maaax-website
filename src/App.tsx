import { RouterProvider, usePathname } from "@/lib/router";
import { AdminPanel } from "@/components/admin/AdminPanel";
import { SiteShell } from "@/components/storefront/SiteShell";
import {
  AboutPage,
  AvailabilityPage,
  BranchesPage,
  CartPage,
  CategoryPage,
  CollectionPage,
  ContactPage,
  HomePage,
  OrderSuccessPage,
  ProductPage,
} from "@/components/storefront/StorePages";
import { products } from "@/data/catalog";

function NotFoundPage() {
  return (
    <section className="mx-auto grid min-h-[55vh] max-w-xl place-items-center px-4 py-16 text-center">
      <div>
        <h1 className="text-6xl font-black">404</h1>
        <p className="mt-3 text-muted-foreground">Page not found.</p>
      </div>
    </section>
  );
}

function CurrentPage() {
  const path = usePathname();
  const search = new URLSearchParams(window.location.search);

  if (path === "/") return <HomePage />;
  if (path === "/men") {
    return (
      <CollectionPage
        title="Men's Collection"
        subtitle="Relaxed shirts, cargos, hoodies and denim built for daily movement."
        filter={(product) => product.gender === "men"}
      />
    );
  }
  if (path === "/women") {
    return (
      <CollectionPage
        title="Women's Collection"
        subtitle="Dresses, co-ords, jeans and easy layers with contemporary fits."
        filter={(product) => product.gender === "women"}
      />
    );
  }
  if (path === "/kids") {
    return (
      <CollectionPage
        title="Kids Collection"
        subtitle="Play-ready sets and soft essentials for younger wardrobes."
        filter={(product) => product.gender === "kids"}
      />
    );
  }
  if (path === "/new-arrivals") {
    return (
      <CollectionPage
        title="New Arrivals"
        subtitle="Fresh additions selected for fast discovery and branch pickup."
        filter={(product) => product.newArrival}
      />
    );
  }
  if (path === "/categories") return <CategoryPage />;
  if (path.startsWith("/category/")) return <CategoryPage category={decodeURIComponent(path.split("/")[2] || "")} />;
  if (path.startsWith("/product/")) return <ProductPage slug={decodeURIComponent(path.split("/")[2] || products[0].slug)} />;
  if (path === "/availability") return <AvailabilityPage productSlug={search.get("product") ?? undefined} />;
  if (path === "/cart") return <CartPage />;
  if (path === "/branches") return <BranchesPage />;
  if (path === "/about") return <AboutPage />;
  if (path === "/contact") return <ContactPage />;
  if (path === "/order-success") return <OrderSuccessPage />;
  if (path === "/admin") return <AdminPanel />;
  return <NotFoundPage />;
}

export function App() {
  return (
    <RouterProvider>
      <SiteShell>
        <CurrentPage />
      </SiteShell>
    </RouterProvider>
  );
}
