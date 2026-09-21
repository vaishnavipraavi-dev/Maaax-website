import { createFileRoute } from "@tanstack/react-router";

import { ContactPage } from "@/components/storefront/StorePages";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});
