import { createFileRoute } from "@tanstack/react-router";

import { AvailabilityPage } from "@/components/storefront/StorePages";

type AvailabilitySearch = {
  product?: string;
};

export const Route = createFileRoute("/availability")({
  validateSearch: (search: Record<string, unknown>): AvailabilitySearch => ({
    product: typeof search.product === "string" ? search.product : undefined,
  }),
  component: AvailabilityRoute,
});

function AvailabilityRoute() {
  const search = Route.useSearch();

  return <AvailabilityPage productSlug={search.product} />;
}
