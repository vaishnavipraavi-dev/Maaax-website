import { createFileRoute } from "@tanstack/react-router";

import { CollectionPage } from "@/components/storefront/StorePages";

export const Route = createFileRoute("/men")({
  component: () => (
    <CollectionPage
      title="Men's Collection"
      subtitle="Relaxed shirts, cargos, hoodies and denim built for daily movement."
      filter={(product) => product.gender === "men"}
    />
  ),
});
