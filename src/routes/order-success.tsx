import { createFileRoute } from "@tanstack/react-router";

import { OrderSuccessPage } from "@/components/storefront/StorePages";

export const Route = createFileRoute("/order-success")({
  component: OrderSuccessPage,
});
