import { createFileRoute } from "@tanstack/react-router";

import { CollectionPage } from "@/components/storefront/StorePages";

export const Route = createFileRoute("/women")({
  component: () => (
    <CollectionPage
      title="Women's Collection"
      subtitle="Dresses, co-ords, jeans and easy layers with contemporary fits."
      filter={(product) => product.gender === "women"}
    />
  ),
});
