import { Link } from "@tanstack/react-router";

import logo from "@/assets/logo.png";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" aria-label="MAAAX Wholesaler home" className="inline-flex items-center">
      <img
        src={logo}
        alt="MAAAX Wholesaler"
        className={compact ? "h-9 w-auto object-contain" : "h-12 w-auto object-contain"}
        width={226}
        height={64}
      />
    </Link>
  );
}
