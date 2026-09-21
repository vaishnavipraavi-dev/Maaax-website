import { createFileRoute } from "@tanstack/react-router";

import { CategoriesPage } from "@/components/storefront/StorePages";

export const Route = createFileRoute("/categories")({
  component: CategoriesPage,
});
