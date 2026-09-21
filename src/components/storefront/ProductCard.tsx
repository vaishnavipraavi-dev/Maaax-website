import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Product } from "@/data/catalog";

export function ProductCard({ product }: { product: Product }) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <article className="group min-w-0">
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="block overflow-hidden bg-surface-soft"
      >
        <div className="aspect-[4/5] overflow-hidden">
          <img
            src={product.image}
            alt={`${product.name} product view`}
            loading="lazy"
            width={602}
            height={704}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]"
          />
        </div>
      </Link>
      <div className="pt-3">
        <div className="flex min-w-0 items-start justify-between gap-2">
          <Link
            to="/product/$slug"
            params={{ slug: product.slug }}
            className="line-clamp-2 min-h-10 text-sm font-semibold leading-5"
          >
            {product.name}
          </Link>
          {discount > 0 && (
            <span className="shrink-0 bg-discount px-1.5 py-1 text-[10px] font-bold text-discount-foreground">
              {discount}% OFF
            </span>
          )}
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <span className="font-bold">Rs. {product.price}</span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              Rs. {product.originalPrice}
            </span>
          )}
        </div>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-1" aria-label={`Colors: ${product.colors.join(", ")}`}>
            {product.colors.slice(0, 3).map((c, i) => (
              <span
                key={c}
                className={`h-3 w-3 rounded-full border ${["bg-swatch-black", "bg-swatch-olive", "bg-swatch-cream"][i % 3]}`}
              />
            ))}
          </div>
          <Button asChild variant="ghost" size="sm" className="h-8 justify-start px-0 text-xs sm:px-2">
            <Link to="/availability" search={{ product: product.slug }}>
              <MapPin />
              Availability
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
