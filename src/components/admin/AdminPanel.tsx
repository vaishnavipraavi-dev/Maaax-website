import {
  BarChart3,
  Boxes,
  CheckCircle2,
  ClipboardList,
  Edit3,
  ImagePlus,
  LogOut,
  MessageCircle,
  PackagePlus,
  Search,
  ShieldCheck,
  Store,
  Truck,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { branches, products, type StockState } from "@/data/catalog";

type AdminProduct = {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  qty: number;
  branches: string[];
  status: StockState;
  image: string;
  images: string[];
};

type AdminOrder = {
  id: string;
  customer: string;
  phone: string;
  product: string;
  total: number;
  branch: string;
  status: string;
  address: string;
  updatedAt: string;
};

const adminUser = "admin";
const adminPassword = "maaax123";
const orderStatuses = ["New enquiry", "Branch confirmation", "Ready for pickup", "Delivered successfully", "Cancelled"];

const initialProducts: AdminProduct[] = products.slice(0, 10).map((product, index) => ({
  id: product.id,
  name: product.name,
  sku: `MX-${String(index + 1).padStart(4, "0")}`,
  category: product.category,
  price: product.price,
  qty: index % 4 === 0 ? 6 : 18 + index * 3,
  branches: [branches[index % branches.length].name],
  status: product.stock,
  image: product.image,
  images: product.images?.length ? product.images : [product.image],
}));

const fallbackOrders: AdminOrder[] = [
  {
    id: "MX250680",
    customer: "Demo Customer",
    phone: "9999999999",
    product: "MAAAX Oversized T-Shirt",
    total: 499,
    branch: "Panvel Branch",
    status: "Branch confirmation",
    address: "Panvel, Maharashtra",
    updatedAt: "Today",
  },
  {
    id: "MX250681",
    customer: "Retail Buyer",
    phone: "8888888888",
    product: "Natural Linen Co-Ord",
    total: 1299,
    branch: "Karjat Branch",
    status: "Ready for pickup",
    address: "Karjat, Maharashtra",
    updatedAt: "Today",
  },
];

function loadJson<T>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function fieldClass() {
  return "border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring";
}

function branchSummary(selected: string[]) {
  return selected.includes("All") ? "All Branches" : selected.join(", ");
}

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function normalizeWhatsappNumber(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `91${digits}`;
  return digits;
}

function orderStatusMessage(order: AdminOrder) {
  if (order.status === "Delivered successfully") {
    return `Hi ${order.customer}, your MAAAX order ${order.id} has been delivered successfully. Thank you for shopping with MAAAX.`;
  }
  return `Hi ${order.customer}, your MAAAX order ${order.id} status is now: ${order.status}. Product: ${order.product}. Branch: ${order.branch}.`;
}

export function AdminPanel() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [login, setLogin] = useState({ username: "", password: "" });
  const [tab, setTab] = useState("dashboard");
  const [productsList, setProductsList] = useState<AdminProduct[]>([]);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [query, setQuery] = useState("");
  const [productForm, setProductForm] = useState({
    name: "",
    sku: "",
    category: "t-shirts",
    price: "",
    qty: "",
    branches: ["All"],
    status: "available" as StockState,
    imageUrls: "",
    images: [] as string[],
  });

  useEffect(() => {
    setLoggedIn(localStorage.getItem("maaax_admin_auth_v1") === "true");
    const savedProducts = loadJson("maaax_admin_products_v1", initialProducts);
    const lastOrder = loadJson<null | {
      id: string;
      name: string;
      phone: string;
      address: string;
      city: string;
      pincode: string;
      branch: string;
      total: number;
      items: Array<{ name: string }>;
    }>("maaax_last_order_v1", null);
    const savedOrders = loadJson("maaax_admin_orders_v1", fallbackOrders);
    const localOrder = lastOrder
      ? [
          {
            id: lastOrder.id,
            customer: lastOrder.name,
            phone: lastOrder.phone,
            product: lastOrder.items[0]?.name || "MAAAX order",
            total: lastOrder.total,
            branch: lastOrder.branch,
            status: "New enquiry",
            address: `${lastOrder.address}, ${lastOrder.city} - ${lastOrder.pincode}`,
            updatedAt: "Just now",
          },
        ]
      : [];
    setProductsList(
      savedProducts.map((product) => ({
        ...product,
        branches: product.branches?.length
          ? product.branches
          : [(product as AdminProduct & { branch?: string }).branch || "All"],
        images: product.images?.length ? product.images : [product.image],
      })),
    );
    setOrders(
      [...localOrder, ...savedOrders.filter((order) => order.id !== lastOrder?.id)].map((order) => ({
        ...order,
        status: order.status === "Completed" ? "Delivered successfully" : order.status,
      })),
    );
  }, []);

  useEffect(() => {
    if (productsList.length) localStorage.setItem("maaax_admin_products_v1", JSON.stringify(productsList));
  }, [productsList]);

  useEffect(() => {
    if (orders.length) localStorage.setItem("maaax_admin_orders_v1", JSON.stringify(orders));
  }, [orders]);

  const stats = useMemo(() => {
    const lowStock = productsList.filter((product) => product.qty <= 8).length;
    const activeOrders = orders.filter((order) => order.status !== "Delivered successfully" && order.status !== "Completed" && order.status !== "Cancelled").length;
    return [
      ["Products", productsList.length, Boxes],
      ["Active Orders", activeOrders, ClipboardList],
      ["Low Stock", lowStock, BarChart3],
      ["Branches", branches.length, Store],
    ];
  }, [orders, productsList]);

  const filteredProducts = productsList.filter((product) =>
    `${product.name} ${product.sku} ${product.category} ${branchSummary(product.branches)}`.toLowerCase().includes(query.toLowerCase()),
  );

  function submitLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (login.username === adminUser && login.password === adminPassword) {
      localStorage.setItem("maaax_admin_auth_v1", "true");
      setLoggedIn(true);
      toast.success("Admin login successful");
      return;
    }
    toast.error("Invalid username or password");
  }

  function addProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const urlImages = productForm.imageUrls
      .split("\n")
      .map((url) => url.trim())
      .filter(Boolean);
    const imageSet = [...productForm.images, ...urlImages].slice(0, 5);
    const next: AdminProduct = {
      id: crypto.randomUUID(),
      name: productForm.name,
      sku: productForm.sku || `MX-${Date.now().toString().slice(-5)}`,
      category: productForm.category,
      price: Number(productForm.price),
      qty: Number(productForm.qty),
      branches: productForm.branches,
      status: productForm.status,
      image: imageSet[0] || products[0].image,
      images: imageSet.length ? imageSet : [products[0].image],
    };
    setProductsList((current) => [next, ...current]);
    setProductForm({
      name: "",
      sku: "",
      category: "t-shirts",
      price: "",
      qty: "",
      branches: ["All"],
      status: "available",
      imageUrls: "",
      images: [],
    });
    toast.success("Product added to inventory");
  }

  async function handleProductImages(files: FileList | null) {
    if (!files?.length) return;
    const selectedFiles = Array.from(files).slice(0, 5);
    const dataUrls = await Promise.all(selectedFiles.map(fileToDataUrl));
    setProductForm((current) => ({ ...current, images: [...current.images, ...dataUrls].slice(0, 5) }));
    toast.success(`${dataUrls.length} product image${dataUrls.length === 1 ? "" : "s"} added`);
  }

  function toggleBranch(branchName: string) {
    setProductForm((current) => {
      if (branchName === "All") return { ...current, branches: ["All"] };
      const withoutAll = current.branches.filter((branch) => branch !== "All");
      const exists = withoutAll.includes(branchName);
      const next = exists ? withoutAll.filter((branch) => branch !== branchName) : [...withoutAll, branchName];
      return { ...current, branches: next.length ? next : ["All"] };
    });
  }

  function updateProduct(id: string, patch: Partial<AdminProduct>) {
    setProductsList((current) => current.map((product) => (product.id === id ? { ...product, ...patch } : product)));
  }

  function updateOrder(id: string, status: string) {
    const nextStatus = status === "Completed" ? "Delivered successfully" : status;
    const orderForMessage = orders.find((order) => order.id === id);
    setOrders((current) =>
      current.map((order) => (order.id === id ? { ...order, status: nextStatus, updatedAt: "Just now" } : order)),
    );
    toast.success("Order status updated");
    if (nextStatus === "Delivered successfully" && orderForMessage) {
      const updatedOrder = { ...orderForMessage, status: nextStatus };
      window.open(
        `https://wa.me/${normalizeWhatsappNumber(updatedOrder.phone)}?text=${encodeURIComponent(orderStatusMessage(updatedOrder))}`,
        "_blank",
        "noopener,noreferrer",
      );
    }
  }

  if (!loggedIn) {
    return (
      <section className="min-h-[75vh] bg-surface-soft px-4 py-12 sm:px-5">
        <div className="mx-auto grid max-w-5xl overflow-hidden border bg-background shadow-sm lg:grid-cols-[1.05fr_0.95fr]">
          <div className="bg-header p-8 text-header-foreground sm:p-10">
            <ShieldCheck className="h-12 w-12 text-gold" />
            <h1 className="mt-8 text-4xl font-black leading-tight sm:text-5xl">MAAAX Admin Panel</h1>
            <p className="mt-4 max-w-md text-sm leading-6 text-header-subtle">
              Manage WhatsApp orders, branch inventory, product uploads, and stock status from one focused dashboard.
            </p>
            <div className="mt-8 grid gap-3 text-sm text-header-subtle">
              <span>Demo username: <strong className="text-white">admin</strong></span>
              <span>Demo password: <strong className="text-white">maaax123</strong></span>
            </div>
          </div>
          <form onSubmit={submitLogin} className="grid content-center gap-4 p-6 sm:p-10">
            <div>
              <p className="eyebrow text-gold">Secure Access</p>
              <h2 className="mt-2 text-2xl font-black">Login to dashboard</h2>
            </div>
            <Input
              required
              value={login.username}
              onChange={(event) => setLogin((current) => ({ ...current, username: event.target.value }))}
              placeholder="Username"
            />
            <Input
              required
              type="password"
              value={login.password}
              onChange={(event) => setLogin((current) => ({ ...current, password: event.target.value }))}
              placeholder="Password"
            />
            <Button type="submit" variant="gold" size="lg">
              Login
            </Button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-surface-soft px-4 py-8 sm:px-5 lg:px-8">
      <div className="mx-auto max-w-[1480px]">
        <div className="flex flex-wrap items-center justify-between gap-4 bg-header p-5 text-header-foreground sm:p-6">
          <div>
            <p className="eyebrow text-gold">MAAAX Control Room</p>
            <h1 className="mt-2 text-3xl font-black sm:text-4xl">Admin Dashboard</h1>
          </div>
          <Button
            variant="outline"
            className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            onClick={() => {
              localStorage.removeItem("maaax_admin_auth_v1");
              setLoggedIn(false);
            }}
          >
            <LogOut /> Logout
          </Button>
        </div>

        <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
          {[
            ["dashboard", "Dashboard"],
            ["orders", "Orders"],
            ["inventory", "Inventory"],
            ["upload", "Upload Product"],
          ].map(([id, label]) => (
            <Button key={id} variant={tab === id ? "gold" : "outline"} onClick={() => setTab(id)}>
              {label}
            </Button>
          ))}
        </div>

        {tab === "dashboard" && (
          <div className="mt-6 grid gap-5">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map(([label, value, Icon]) => (
                <article key={String(label)} className="border bg-background p-5">
                  <Icon className="h-6 w-6 text-gold" />
                  <p className="mt-5 text-sm text-muted-foreground">{label as string}</p>
                  <strong className="mt-1 block text-3xl">{value as number}</strong>
                </article>
              ))}
            </div>
            <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="border bg-background p-5">
                <h2 className="text-xl font-black">Latest orders</h2>
                <div className="mt-4 space-y-3">
                  {orders.slice(0, 4).map((order) => (
                    <div key={order.id} className="flex flex-wrap items-center justify-between gap-3 border p-3">
                      <div>
                        <p className="font-bold">{order.product}</p>
                        <p className="text-xs text-muted-foreground">
                          {order.customer} · {order.branch}
                        </p>
                      </div>
                      <span className="bg-surface-soft px-3 py-1 text-xs font-bold">{order.status}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border bg-background p-5">
                <h2 className="text-xl font-black">Branch stock watch</h2>
                <div className="mt-4 space-y-3">
                  {productsList
                    .filter((product) => product.qty <= 12)
                    .slice(0, 5)
                    .map((product) => (
                      <div key={product.id} className="flex items-center justify-between gap-4">
                        <span className="text-sm">{product.name}</span>
                        <strong className="text-warning">{product.qty} left</strong>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "orders" && (
          <div className="mt-6 grid gap-4">
            {orders.map((order) => (
              <article key={order.id} className="grid gap-4 border bg-background p-5 lg:grid-cols-[1fr_220px]">
                <div>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="eyebrow text-gold">{order.id}</p>
                      <h2 className="mt-1 text-xl font-black">{order.product}</h2>
                    </div>
                    <strong>Rs. {order.total}</strong>
                  </div>
                  <div className="mt-4 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                    <span><Users className="mr-2 inline h-4 w-4" />{order.customer} · {order.phone}</span>
                    <span><Store className="mr-2 inline h-4 w-4" />{order.branch}</span>
                    <span className="sm:col-span-2"><Truck className="mr-2 inline h-4 w-4" />{order.address}</span>
                  </div>
                </div>
                <div className="grid content-start gap-3">
                  <select className={fieldClass()} value={order.status} onChange={(event) => updateOrder(order.id, event.target.value)}>
                    {orderStatuses.map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>
                  <p className="text-xs text-muted-foreground">Last update: {order.updatedAt}</p>
                  <Button asChild variant="gold" size="sm">
                    <a
                      href={`https://wa.me/${normalizeWhatsappNumber(order.phone)}?text=${encodeURIComponent(orderStatusMessage(order))}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <MessageCircle /> Send Update
                    </a>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        )}

        {tab === "inventory" && (
          <div className="mt-6 border bg-background p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-black">Inventory Management</h2>
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input className="pl-9" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search stock" />
              </div>
            </div>
            <div className="mt-5 grid gap-3">
              {filteredProducts.map((product) => (
                <article key={product.id} className="grid gap-4 border p-3 md:grid-cols-[72px_1fr_110px_110px_150px] md:items-center">
                  <img src={product.image} alt={product.name} className="aspect-square w-20 object-cover md:w-full" />
                  <div>
                    <p className="font-black">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.sku} · {product.category} · {branchSummary(product.branches)}</p>
                  </div>
                  <Input type="number" value={product.price} onChange={(event) => updateProduct(product.id, { price: Number(event.target.value) })} />
                  <Input type="number" value={product.qty} onChange={(event) => updateProduct(product.id, { qty: Number(event.target.value) })} />
                  <select className={fieldClass()} value={product.status} onChange={(event) => updateProduct(product.id, { status: event.target.value as StockState })}>
                    <option value="available">Available</option>
                    <option value="limited">Limited</option>
                    <option value="unavailable">Unavailable</option>
                  </select>
                </article>
              ))}
            </div>
          </div>
        )}

        {tab === "upload" && (
          <div className="mt-6 grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
            <form onSubmit={addProduct} className="grid gap-3 border bg-background p-5">
              <h2 className="text-xl font-black">Upload Product</h2>
              <Input required value={productForm.name} onChange={(event) => setProductForm((current) => ({ ...current, name: event.target.value }))} placeholder="Product name" />
              <Input value={productForm.sku} onChange={(event) => setProductForm((current) => ({ ...current, sku: event.target.value }))} placeholder="SKU code" />
              <div className="grid gap-3 sm:grid-cols-2">
                <Input required type="number" value={productForm.price} onChange={(event) => setProductForm((current) => ({ ...current, price: event.target.value }))} placeholder="Price" />
                <Input required type="number" value={productForm.qty} onChange={(event) => setProductForm((current) => ({ ...current, qty: event.target.value }))} placeholder="Quantity" />
              </div>
              <select className={fieldClass()} value={productForm.category} onChange={(event) => setProductForm((current) => ({ ...current, category: event.target.value }))}>
                <option value="t-shirts">T-Shirts</option>
                <option value="shirts">Shirts</option>
                <option value="jeans">Jeans</option>
                <option value="cargo-pants">Cargo Pants</option>
                <option value="womens-wear">Women's Wear</option>
                <option value="kids-wear">Kids Wear</option>
              </select>
              <div className="border bg-surface-soft p-4">
                <p className="text-sm font-black">Available branches</p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={productForm.branches.includes("All")}
                      onChange={() => toggleBranch("All")}
                    />
                    All Branches
                  </label>
                  {branches.map((branch) => (
                    <label key={branch.id} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={productForm.branches.includes(branch.name)}
                        onChange={() => toggleBranch(branch.name)}
                      />
                      {branch.name}
                    </label>
                  ))}
                </div>
              </div>
              <div className="border bg-surface-soft p-4">
                <div className="flex items-start gap-3">
                  <ImagePlus className="mt-1 h-5 w-5 text-gold" />
                  <div>
                    <p className="text-sm font-black">Product angle images</p>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      Upload front, back, side and detail photos. Maximum 5 images.
                    </p>
                  </div>
                </div>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  className="mt-3"
                  onChange={(event) => handleProductImages(event.target.files)}
                />
                <textarea
                  value={productForm.imageUrls}
                  onChange={(event) => setProductForm((current) => ({ ...current, imageUrls: event.target.value }))}
                  placeholder="Or paste image URLs, one per line"
                  className={`${fieldClass()} mt-3 min-h-24 w-full`}
                />
                {productForm.images.length > 0 && (
                  <div className="mt-3 grid grid-cols-5 gap-2">
                    {productForm.images.map((image, index) => (
                      <div key={`${image}-${index}`} className="relative">
                        <img src={image} alt={`Product angle ${index + 1}`} className="aspect-square w-full object-cover" />
                        <button
                          type="button"
                          onClick={() =>
                            setProductForm((current) => ({
                              ...current,
                              images: current.images.filter((_, imageIndex) => imageIndex !== index),
                            }))
                          }
                          className="absolute right-1 top-1 grid h-6 w-6 place-items-center bg-black text-xs text-white"
                        >
                          x
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <Button type="submit" variant="gold" size="lg">
                <PackagePlus /> Add Product
              </Button>
            </form>
            <div className="border bg-header p-5 text-header-foreground lg:self-start">
              <Edit3 className="h-7 w-7 text-gold" />
              <h2 className="mt-4 text-xl font-black">Admin tools</h2>
              <div className="mt-4 grid gap-2.5 text-sm text-header-subtle">
                {[
                  "Add new products for branch inventory demo.",
                  "Update stock quantity, price and availability status.",
                  "Track client WhatsApp orders and update fulfilment stage.",
                  "Review low stock and active branch workload.",
                ].map((item) => (
                  <span key={item} className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
