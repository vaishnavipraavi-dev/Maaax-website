import { forwardRef, createContext, useContext, useEffect, useMemo, useState, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from "react";

type SearchValue = string | number | boolean | null | undefined;
type NavigateOptions = { to: string; search?: Record<string, SearchValue> };
type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  to: string;
  params?: Record<string, string>;
  search?: Record<string, SearchValue>;
};

const RouterContext = createContext({
  path: "/",
  navigate: (_to: string) => {},
});

function buildHref(to: string, params?: Record<string, string>, search?: Record<string, SearchValue>) {
  let href = to;
  Object.entries(params ?? {}).forEach(([key, value]) => {
    href = href.replace(`$${key}`, encodeURIComponent(value));
  });
  const query = new URLSearchParams();
  Object.entries(search ?? {}).forEach(([key, value]) => {
    if (value !== null && value !== undefined) query.set(key, String(value));
  });
  const queryString = query.toString();
  return queryString ? `${href}?${queryString}` : href;
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [locationKey, setLocationKey] = useState(() => `${window.location.pathname}${window.location.search}`);

  useEffect(() => {
    const update = () => setLocationKey(`${window.location.pathname}${window.location.search}`);
    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, []);

  const value = useMemo(
    () => ({
      path: window.location.pathname,
      navigate: (to: string) => {
        window.history.pushState({}, "", to);
        setLocationKey(`${window.location.pathname}${window.location.search}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
    }),
    [locationKey],
  );

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { to, params, search, onClick, target, ...props },
  ref,
) {
  const { navigate } = useContext(RouterContext);
  const href = buildHref(to, params, search);

  return (
    <a
      ref={ref}
      href={href}
      target={target}
      onClick={(event: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(event);
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.altKey ||
          event.ctrlKey ||
          event.shiftKey ||
          target
        ) {
          return;
        }
        event.preventDefault();
        navigate(href);
      }}
      {...props}
    />
  );
});

export function usePathname() {
  return useContext(RouterContext).path;
}

export function useNavigate() {
  const { navigate } = useContext(RouterContext);
  return (options: NavigateOptions) => navigate(buildHref(options.to, undefined, options.search));
}
