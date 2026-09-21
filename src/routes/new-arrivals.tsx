import { createFileRoute } from "@tanstack/react-router";

import { CollectionPage } from "@/components/storefront/StorePages";

export const Route = createFileRoute("/new-arrivals")({
  component: () => (
    <CollectionPage
      title="New Arrivals"
      subtitle="Fresh additions selected for fast discovery and branch pickup."
      filter={(product) => product.newArrival}
    />
  ),
});
