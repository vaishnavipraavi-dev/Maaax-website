import { createFileRoute } from "@tanstack/react-router";

import { BranchesPage } from "@/components/storefront/StorePages";

export const Route = createFileRoute("/branches")({
  component: BranchesPage,
});
