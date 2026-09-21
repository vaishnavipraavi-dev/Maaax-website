import { createFileRoute } from "@tanstack/react-router";

import { AboutPage } from "@/components/storefront/StorePages";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});
