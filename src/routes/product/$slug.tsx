import { createFileRoute } from "@tanstack/react-router";

import { ProductPage } from "@/components/storefront/StorePages";

export const Route = createFileRoute("/product/$slug")({
  component: ProductRoute,
});

function ProductRoute() {
  const { slug } = Route.useParams();

  return <ProductPage slug={slug} />;
}
