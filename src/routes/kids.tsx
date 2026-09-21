import { createFileRoute } from "@tanstack/react-router";

import { CollectionPage } from "@/components/storefront/StorePages";

export const Route = createFileRoute("/kids")({
  component: () => (
    <CollectionPage
      title="Kids Collection"
      subtitle="Play-ready sets and soft essentials for younger wardrobes."
      filter={(product) => product.gender === "kids"}
    />
  ),
});
