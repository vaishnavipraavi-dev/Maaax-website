import { createFileRoute } from "@tanstack/react-router";

import { HomePage } from "@/components/storefront/StorePages";

export const Route = createFileRoute("/")({
  component: HomePage,
});
