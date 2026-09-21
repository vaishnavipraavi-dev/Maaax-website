import { createFileRoute } from "@tanstack/react-router";

import { CategoryPage } from "@/components/storefront/StorePages";

export const Route = createFileRoute("/category/$category")({
  component: CategoryRoute,
});

function CategoryRoute() {
  const { category } = Route.useParams();

  return <CategoryPage category={category} />;
}
