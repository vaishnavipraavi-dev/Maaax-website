import { useState } from "react";
import { MapPin, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useShop } from "@/context/shop-context";
import { branches } from "@/data/catalog";

export function BranchList({ onSelect }: { onSelect?: (name: string) => void }) {
  const [q, setQ] = useState("");
  const { setSelectedBranch } = useShop();
  const list = branches.filter((b) => b.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div>
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          aria-label="Enter your Taluka or location"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Enter your Taluka or location"
          className="h-10 pl-10"
        />
      </div>
      <div className="my-4 flex flex-wrap gap-2">
        {branches.slice(0, 6).map((b) => (
          <button
            key={b.id}
            onClick={() => setQ(b.name.replace(" Branch", ""))}
            className="border px-3 py-1.5 text-xs"
          >
            {b.name.replace(" Branch", "")}
          </button>
        ))}
      </div>
      <div className="max-h-[420px] divide-y overflow-y-auto">
        {list.map((b) => (
          <article
            key={b.id}
            className="grid gap-3 py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"
          >
            <div className="min-w-0">
              <h3 className="font-semibold">
                {b.name}{" "}
                <span
                  className={`ml-1 text-xs ${b.status === "available" ? "text-success" : b.status === "limited" ? "text-warning" : "text-muted-foreground"}`}
                >
                  •{" "}
                  {b.status === "limited"
                    ? "Limited Stock"
                    : b.status[0].toUpperCase() + b.status.slice(1)}
                </span>
              </h3>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                {b.area} · {b.distance}
              </p>
            </div>
            <Button
              variant="gold"
              size="sm"
              className="w-full sm:w-auto"
              disabled={b.status === "unavailable"}
              onClick={() => {
                setSelectedBranch(b.name);
                onSelect?.(b.name);
              }}
            >
              Select
            </Button>
          </article>
        ))}
      </div>
    </div>
  );
}

export function BranchSelector({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Check Availability</DialogTitle>
          <DialogDescription>Select the most convenient MAAAX branch for pickup.</DialogDescription>
        </DialogHeader>
        <BranchList />
      </DialogContent>
    </Dialog>
  );
}

export function BranchFinder() {
  return (
    <section className="bg-foreground py-12 text-background sm:py-16">
      <div className="mx-auto grid max-w-[1480px] items-center gap-8 px-4 sm:px-5 md:grid-cols-[1fr_1.2fr] lg:gap-10 lg:px-8">
        <div>
          <span className="eyebrow text-gold">OUR STORES</span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Find MAAAX Near You</h2>
          <p className="mt-4 max-w-md text-sm leading-6 text-background/70">
            Check product availability at your nearest MAAAX branch before placing your order.
          </p>
        </div>
        <div className="bg-background p-4 text-foreground sm:p-5">
          <BranchSelector>
            <Button
              variant="outline"
              className="h-auto min-h-14 w-full justify-between gap-3 px-4 py-3 text-left sm:px-5"
            >
              <span className="flex min-w-0 items-center gap-3">
                <MapPin className="shrink-0" />
                <span className="truncate">Enter your city, area or location</span>
              </span>
              <span className="shrink-0">Search</span>
            </Button>
          </BranchSelector>
          <div className="mt-4 flex flex-wrap gap-2">
            {branches.map((b) => (
              <span key={b.id} className="border px-3 py-1.5 text-xs">
                {b.name.replace(" Branch", "")}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
