import { createFileRoute } from "@tanstack/react-router";

import { CartPage } from "@/components/storefront/StorePages";

export const Route = createFileRoute("/cart")({
  component: CartPage,
});
