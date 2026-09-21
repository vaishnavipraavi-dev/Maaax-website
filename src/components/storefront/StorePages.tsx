import { Link, useNavigate } from "@/lib/router";
import {
  ArrowRight,
  CheckCircle2,
  Heart,
  MapPin,
  Minus,
  Phone,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Store,
  Truck,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
} from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent } from "react";

import { BranchFinder, BranchList } from "@/components/storefront/BranchSelector";
import { ProductCard } from "@/components/storefront/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import shopImage from "@/assets/Shop.png";
import ownerImage from "@/assets/owner.png";
import {
  branches,
  categories,
  categoryName,
  getProduct,
  heroSlides,
  products,
  whatsappNumber,
  type Product,
} from "@/data/catalog";
import { useShop } from "@/context/shop-context";

function SectionTitle({
  eyebrow,
  title,
  copy,
}: {
  eyebrow?: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="mx-auto mb-8 max-w-[1480px] px-4 sm:px-5 lg:px-8">
      {eyebrow && <p className="eyebrow text-gold">{eyebrow}</p>}
      <div className="mt-2 max-w-6xl">
        <h2 className="text-3xl font-black leading-tight tracking-tight sm:text-4xl xl:text-5xl">
          {title}
        </h2>
        {copy && <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">{copy}</p>}
      </div>
    </div>
  );
}

function ProductGrid({ list }: { list: Product[] }) {
  return (
    <div className="mx-auto grid max-w-[1480px] grid-cols-2 gap-x-4 gap-y-8 px-4 sm:px-5 md:grid-cols-3 lg:px-8 xl:grid-cols-4">
      {list.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function Hero() {
  const slide = heroSlides[0];

  return (
    <section className="relative overflow-hidden bg-header text-header-foreground sm:min-h-[calc(100svh-4rem)]">
      <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-header-border sm:hidden">
        <img
          src={slide.image}
          alt="MAAAX seasonal fashion collection"
          className="h-full w-full object-cover object-[58%_top]"
        />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-header/70 to-transparent" />
      </div>
      <img
        src={slide.image}
        alt="MAAAX seasonal fashion collection"
        className="absolute inset-0 hidden h-full w-full object-cover object-[56%_top] sm:block lg:object-top"
      />
      <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(4,8,15,0.9)_0%,rgba(4,8,15,0.72)_42%,rgba(4,8,15,0.28)_72%,rgba(4,8,15,0.12)_100%)] sm:block" />
      <div className="absolute inset-x-0 bottom-0 hidden h-28 bg-gradient-to-t from-header/80 to-transparent sm:block" />
      <div className="relative z-10 -mt-16 mx-auto flex max-w-[1480px] flex-col justify-end px-5 pb-8 pt-20 sm:mt-0 sm:min-h-[calc(100svh-4rem)] sm:px-5 sm:pb-14 sm:pt-24 md:pt-28 lg:px-8">
        <div className="w-full max-w-[25rem] sm:max-w-4xl">
          <div className="mb-3 inline-flex w-fit items-center gap-2 border border-gold/50 bg-black/45 px-3 py-2 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-gold backdrop-blur sm:mb-4 sm:px-4 sm:text-xs">
            New Season Drop
          </div>
          <p className="eyebrow text-gold">{slide.eyebrow}</p>
          <h1 className="mt-3 max-w-3xl text-[2.65rem] font-black leading-[0.92] tracking-tight drop-shadow-lg sm:mt-4 sm:text-5xl md:text-6xl xl:text-7xl">
            {slide.title}
          </h1>
          <p className="mt-4 max-w-[19rem] text-[0.95rem] leading-6 text-white/90 drop-shadow sm:mt-5 sm:max-w-xl sm:text-lg sm:leading-7">
            Premium everyday fashion with quick branch availability, wholesale value and easy pickup
            across Maharashtra.
          </p>
          <div className="mt-6 grid w-full grid-cols-3 gap-3 text-[0.8rem] leading-tight text-white/90 sm:mt-6 sm:max-w-xl sm:gap-3 sm:text-sm">
            <div className="border-l-2 border-gold bg-black/18 py-1.5 pl-2.5 backdrop-blur-[2px] sm:bg-transparent sm:py-0 sm:pl-3">
              <strong className="block text-lg leading-none text-gold sm:text-2xl">9</strong>
              Branches
            </div>
            <div className="border-l-2 border-gold bg-black/18 py-1.5 pl-2.5 backdrop-blur-[2px] sm:bg-transparent sm:py-0 sm:pl-3">
              <strong className="block text-lg leading-none text-gold sm:text-2xl">24+</strong>
              Styles
            </div>
            <div className="border-l-2 border-gold bg-black/18 py-1.5 pl-2.5 backdrop-blur-[2px] sm:bg-transparent sm:py-0 sm:pl-3">
              <strong className="block text-lg leading-none text-gold sm:text-2xl">Fast</strong>
              Availability Check
            </div>
          </div>
          <div className="mt-7 grid w-full grid-cols-1 gap-3 sm:mt-8 sm:max-w-md sm:flex sm:flex-wrap sm:gap-3">
            <Button asChild variant="gold" size="lg" className="w-full shadow-lg shadow-black/20 sm:w-auto">
              <Link to="/new-arrivals">
                Shop New Arrivals <ArrowRight />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full border-white/80 bg-black/20 text-white backdrop-blur hover:bg-white hover:text-header sm:w-auto"
            >
              <Link to="/branches">Find a Branch</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExploreCategories() {
  const items = [
    categories.find((category) => category.slug === "shirts"),
    categories.find((category) => category.slug === "cargo-pants"),
    categories.find((category) => category.slug === "t-shirts"),
    categories.find((category) => category.slug === "jeans"),
    categories.find((category) => category.slug === "hoodies"),
  ].filter(Boolean);

  return (
    <section className="bg-background py-10 sm:py-12">
      <div className="mx-auto max-w-[1480px] px-4 text-center sm:px-5 lg:px-8">
        <p className="eyebrow text-muted-foreground">Shop By Category</p>
        <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Explore</h2>
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-6 lg:gap-x-5">
          {items.map((category) => (
            <Link
              key={category.slug}
              to="/category/$category"
              params={{ category: category.slug }}
              className="group flex flex-col items-center"
            >
              <div className="aspect-square w-full max-w-32 overflow-hidden rounded-full bg-surface-soft shadow-sm ring-1 ring-border transition duration-300 group-hover:-translate-y-1 group-hover:ring-gold sm:max-w-36 xl:max-w-40">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full scale-115 object-cover object-top transition duration-500 group-hover:scale-125"
                />
              </div>
              <span className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-foreground">
                {category.slug === "cargo-pants"
                  ? "Trousers"
                  : category.slug === "hoodies"
                    ? "Outerwear"
                    : category.name}
              </span>
            </Link>
          ))}
          <Link to="/new-arrivals" className="group flex flex-col items-center">
            <div className="grid aspect-square w-full max-w-32 place-items-center rounded-full bg-gold/35 text-lg font-black uppercase tracking-[0.08em] text-muted-foreground transition duration-300 group-hover:-translate-y-1 group-hover:bg-gold group-hover:text-gold-foreground sm:max-w-36 xl:max-w-40">
              New In
            </div>
            <span className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-foreground">
              New In
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <>
      <Hero />
      <ExploreCategories />
      <section className="py-12 sm:py-16">
        <SectionTitle
          eyebrow="Shop by Category"
          title="Wholesale-ready staples for every wardrobe"
          copy="Explore fast-moving essentials across tees, denim, co-ords, kidswear and accessories."
        />
        <div className="mx-auto grid max-w-[1480px] grid-cols-2 gap-4 px-4 sm:px-5 md:grid-cols-3 lg:px-8 xl:grid-cols-5">
          {categories.map((category) => (
            <Link
              key={category.slug}
              to="/category/$category"
              params={{ category: category.slug }}
              className="group overflow-hidden bg-surface-soft"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex items-center justify-between gap-2 p-3 text-sm font-bold sm:p-4">
                {category.name}
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="bg-surface-soft py-12 sm:py-16">
        <SectionTitle
          eyebrow="Featured"
          title="Best pieces to start with"
          copy="A practical edit of high-turnover products with clean fits and accessible pricing."
        />
        <ProductGrid list={products.filter((p) => p.featured).slice(0, 8)} />
      </section>
      <BranchFinder />
    </>
  );
}

export function CollectionPage({
  title,
  subtitle,
  filter,
}: {
  title: string;
  subtitle: string;
  filter: (product: Product) => boolean;
}) {
  const list = products.filter(filter);

  return (
    <section className="py-10 sm:py-12 md:py-16">
      <SectionTitle eyebrow="Collection" title={title} copy={subtitle} />
      <ProductGrid list={list} />
    </section>
  );
}

export function CategoriesPage() {
  return (
    <section className="py-10 sm:py-12 md:py-16">
      <SectionTitle
        eyebrow="All Categories"
        title="Browse the complete MAAAX range"
        copy="Move from essentials to seasonal drops with category pages built for quick product discovery."
      />
      <div className="mx-auto grid max-w-[1480px] gap-4 px-4 sm:grid-cols-2 sm:px-5 lg:grid-cols-3 lg:px-8">
        {categories.map((category) => (
          <Link
            key={category.slug}
            to="/category/$category"
            params={{ category: category.slug }}
            className="group grid grid-cols-[96px_1fr] overflow-hidden border bg-background sm:grid-cols-[120px_1fr]"
          >
            <img src={category.image} alt={category.name} className="h-full min-h-32 w-full object-cover" />
            <div className="flex flex-col justify-between p-5">
              <h2 className="text-lg font-black sm:text-xl">{category.name}</h2>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold">
                View products <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function CategoryPage({ category }: { category: string }) {
  const list = products.filter((product) => product.category === category);

  return (
    <section className="py-10 sm:py-12 md:py-16">
      <SectionTitle
        eyebrow="Category"
        title={categoryName(category)}
        copy={`${list.length} styles available for branch pickup and wholesale enquiries.`}
      />
      <ProductGrid list={list.length ? list : products} />
    </section>
  );
}

export function ProductPage({ slug }: { slug: string }) {
  const product = getProduct(slug);
  const { addToCart, selectedBranch } = useShop();
  const [color, setColor] = useState(product.colors[0] ?? "Default");
  const [size, setSize] = useState(product.sizes[0] ?? "One Size");
  const [activeImage, setActiveImage] = useState(0);
  const related = products
    .filter((item) => item.category === product.category && item.slug !== product.slug)
    .slice(0, 4);
  const imageCount = product.images.length;
  const showPreviousImage = () => setActiveImage((current) => (current - 1 + imageCount) % imageCount);
  const showNextImage = () => setActiveImage((current) => (current + 1) % imageCount);
  const whatsappText = encodeURIComponent(
    `Hi MAAAX, I want to enquire about ${product.name}.\nColor: ${color}\nSize: ${size}\nPrice: Rs. ${product.price}\nBranch: ${selectedBranch || "Please suggest nearest branch"}`,
  );
  const whatsappHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${whatsappText}`
    : `https://api.whatsapp.com/send?text=${whatsappText}`;

  return (
    <>
      <section className="mx-auto grid max-w-[1480px] gap-8 px-4 py-8 sm:px-5 sm:py-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 lg:px-8">
        <div>
          <div className="relative overflow-hidden bg-surface-soft">
            <img
              src={product.images[activeImage] ?? product.image}
              alt={`${product.name} selected product view`}
              className="aspect-[4/5] w-full object-cover"
            />
            {imageCount > 1 && (
              <>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="absolute left-3 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full border-white/70 bg-white/85 shadow-md hover:bg-white"
                  onClick={showPreviousImage}
                  aria-label="Show previous product image"
                >
                  <ChevronLeft />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="absolute right-3 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full border-white/70 bg-white/85 shadow-md hover:bg-white"
                  onClick={showNextImage}
                  aria-label="Show next product image"
                >
                  <ChevronRight />
                </Button>
              </>
            )}
          </div>
          <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
            {product.images.map((image, index) => (
              <button
                key={`${product.slug}-${index}`}
                type="button"
                onClick={() => setActiveImage(index)}
                className={`h-20 w-16 shrink-0 overflow-hidden border bg-surface-soft sm:h-24 sm:w-20 ${
                  activeImage === index ? "border-gold ring-2 ring-gold/40" : "border-border"
                }`}
                aria-label={`Show ${product.name} view ${index + 1}`}
              >
                <img
                  src={image}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="eyebrow text-gold">{categoryName(product.category)}</p>
          <h1 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-4xl">
            {product.name}
          </h1>
          <div className="mt-4 flex items-center gap-3">
            <span className="text-2xl font-black">Rs. {product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">Rs. {product.originalPrice}</span>
            )}
          </div>
          <p className="mt-5 leading-7 text-muted-foreground">{product.description}</p>

          <div className="mt-8 space-y-6">
            <div>
              <p className="mb-3 text-sm font-bold">Color</p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((item) => (
                  <button
                    key={item}
                    onClick={() => setColor(item)}
                    className={`border px-4 py-2 text-sm ${color === item ? "border-foreground bg-foreground text-background" : ""}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-3 text-sm font-bold">Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((item) => (
                  <button
                    key={item}
                    onClick={() => setSize(item)}
                    className={`min-w-12 border px-4 py-2 text-sm ${size === item ? "border-foreground bg-foreground text-background" : ""}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Button
              asChild
              size="lg"
              className="bg-[#111111] text-white shadow hover:bg-[#1f1f1f] sm:col-span-2"
            >
              <a href={whatsappHref} target="_blank" rel="noreferrer">
                <MessageCircle /> WhatsApp Enquiry
              </a>
            </Button>
            <Button
              variant="gold"
              size="lg"
              onClick={() => addToCart({ product, color, size, quantity: 1, branch: selectedBranch })}
            >
              <ShoppingBag /> Add to Cart
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/availability" search={{ product: product.slug }}>
                <MapPin /> Check Availability
              </Link>
            </Button>
          </div>
          <div className="mt-8 grid gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-success" /> Quality checked fabric and stitching
            </span>
            <span className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-success" /> Pickup from selected MAAAX branches
            </span>
            <span className="flex items-center gap-2">
              <RotateCcw className="h-4 w-4 text-success" /> Exchange support through store team
            </span>
          </div>
        </div>
      </section>
      <section className="bg-surface-soft py-12 sm:py-16">
        <SectionTitle eyebrow="You May Also Like" title="Similar styles" />
        <ProductGrid list={related.length ? related : products.slice(0, 4)} />
      </section>
    </>
  );
}

export function CartPage() {
  const { cart, updateQty, removeItem, clearCart, selectedBranch, setSelectedBranch } = useShop();
  const navigate = useNavigate();
  const [checkout, setCheckout] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    note: "",
  });
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const locationText = `${checkout.address} ${checkout.city} ${checkout.pincode}`.toLowerCase();
  const suggestedBranch =
    branches.find((branch) => locationText.includes(branch.id) || locationText.includes(branch.name.toLowerCase().replace(" branch", ""))) ??
    branches.find((branch) => branch.name === selectedBranch) ??
    branches[0];
  const orderBranch = suggestedBranch?.name ?? selectedBranch;

  function updateCheckout(field: keyof typeof checkout, value: string) {
    setCheckout((current) => ({ ...current, [field]: value }));
  }

  function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const orderId = `MX${Date.now().toString().slice(-6)}`;
    const itemLines = cart
      .map(
        (item) =>
          `- ${item.product.name} (${item.color}, ${item.size}) x ${item.quantity} = Rs. ${item.product.price * item.quantity}`,
      )
      .join("\n");
    const message = encodeURIComponent(
      `Hi MAAAX, I want to place a WhatsApp order request.\n\nOrder ID: ${orderId}\nName: ${checkout.name}\nWhatsApp/Mobile: ${checkout.phone}\nAddress: ${checkout.address}\nCity/Area: ${checkout.city}\nPincode: ${checkout.pincode}\nNearest branch: ${orderBranch}\n\nItems:\n${itemLines}\n\nSubtotal: Rs. ${total}\nNote: ${checkout.note || "No extra note"}\n\nPlease confirm availability and pickup/delivery details.`,
    );
    const href = whatsappNumber ? `https://wa.me/${whatsappNumber}?text=${message}` : `https://api.whatsapp.com/send?text=${message}`;

    const orderPayload = {
      id: orderId,
      name: checkout.name,
      phone: checkout.phone,
      address: checkout.address,
      city: checkout.city,
      pincode: checkout.pincode,
      note: checkout.note,
      branch: orderBranch,
      total,
      items: cart.map((item) => ({
        name: item.product.name,
        color: item.color,
        size: item.size,
        quantity: item.quantity,
        total: item.product.price * item.quantity,
      })),
    };
    localStorage.setItem("maaax_last_order_v1", JSON.stringify(orderPayload));
    try {
      const savedAdminOrders = JSON.parse(localStorage.getItem("maaax_admin_orders_v1") || "[]");
      const adminOrder = {
        id: orderId,
        customer: checkout.name,
        phone: checkout.phone,
        product: orderPayload.items[0]?.name || "MAAAX order",
        total,
        branch: orderBranch,
        status: "New enquiry",
        address: `${checkout.address}, ${checkout.city} - ${checkout.pincode}`,
        updatedAt: "Just now",
      };
      localStorage.setItem(
        "maaax_admin_orders_v1",
        JSON.stringify([adminOrder, ...savedAdminOrders.filter((order: { id: string }) => order.id !== orderId)]),
      );
    } catch {}
    setSelectedBranch(orderBranch);
    window.open(href, "_blank", "noopener,noreferrer");
    clearCart();
    navigate({ to: "/order-success" });
  }

  if (!cart.length) {
    return (
      <section className="mx-auto grid min-h-[55vh] max-w-2xl place-items-center px-4 py-14 text-center sm:px-5 sm:py-16">
        <div>
          <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
          <h1 className="mt-5 text-3xl font-black">Your cart is empty</h1>
          <p className="mt-3 text-muted-foreground">Add a few styles and choose a branch for pickup.</p>
          <Button asChild variant="gold" className="mt-6">
            <Link to="/new-arrivals">Shop New Arrivals</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto grid max-w-[1480px] gap-8 px-4 py-10 sm:px-5 sm:py-12 lg:grid-cols-[1fr_380px] lg:gap-10 lg:px-8">
      <div>
        <h1 className="text-3xl font-black sm:text-4xl">Shopping Cart</h1>
        <div className="mt-8 divide-y border-y">
          {cart.map((item) => (
            <article
              key={`${item.product.slug}-${item.color}-${item.size}`}
              className="grid grid-cols-[88px_1fr] gap-4 py-5 sm:grid-cols-[120px_1fr_auto]"
            >
              <img src={item.product.image} alt={item.product.name} className="aspect-[4/5] w-full object-cover" />
              <div>
                <h2 className="font-bold">{item.product.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.color} / {item.size}
                </p>
                <button onClick={() => removeItem(item.product.slug)} className="mt-4 text-sm font-bold underline">
                  Remove
                </button>
              </div>
              <div className="col-span-2 flex flex-wrap items-center gap-3 sm:col-span-1 sm:justify-self-end">
                <Button variant="outline" size="icon" onClick={() => updateQty(item.product.slug, item.quantity - 1)}>
                  <Minus />
                </Button>
                <span className="w-6 text-center font-bold">{item.quantity}</span>
                <Button variant="outline" size="icon" onClick={() => updateQty(item.product.slug, item.quantity + 1)}>
                  <Plus />
                </Button>
                <span className="ml-3 min-w-20 text-right font-black">Rs. {item.product.price * item.quantity}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
      <aside className="border bg-surface-soft p-5 sm:p-6 lg:self-start">
        <h2 className="text-xl font-black">Order Summary</h2>
        <div className="mt-5 space-y-3 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <strong>Rs. {total}</strong>
          </div>
          <div className="flex justify-between">
            <span>Nearest branch</span>
            <strong className="text-right">{orderBranch || "Auto suggested"}</strong>
          </div>
        </div>
        <form onSubmit={submitOrder} className="mt-6 grid gap-3">
          <Input
            required
            value={checkout.name}
            onChange={(event) => updateCheckout("name", event.target.value)}
            placeholder="Full name"
            aria-label="Full name"
          />
          <Input
            required
            type="tel"
            inputMode="numeric"
            pattern="[0-9]{10}"
            maxLength={10}
            title="Enter a valid 10 digit mobile number"
            value={checkout.phone}
            onChange={(event) => updateCheckout("phone", event.target.value.replace(/\D/g, "").slice(0, 10))}
            placeholder="WhatsApp / mobile number"
            aria-label="WhatsApp or mobile number"
          />
          <Input
            required
            value={checkout.address}
            onChange={(event) => updateCheckout("address", event.target.value)}
            placeholder="Full address"
            aria-label="Full address"
          />
          <div className="grid gap-3 sm:grid-cols-[1fr_120px]">
            <Input
              required
              value={checkout.city}
              onChange={(event) => updateCheckout("city", event.target.value)}
              placeholder="City / area"
              aria-label="City or area"
            />
            <Input
              required
              value={checkout.pincode}
              onChange={(event) => updateCheckout("pincode", event.target.value)}
              placeholder="Pincode"
              aria-label="Pincode"
            />
          </div>
          <textarea
            required
            value={checkout.note}
            onChange={(event) => updateCheckout("note", event.target.value)}
            placeholder="Order note / delivery instruction"
            aria-label="Extra note"
            className="min-h-24 border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
          <p className="text-xs leading-5 text-muted-foreground">
            Your location will be shared with {orderBranch}. The branch team will confirm stock and pickup/delivery on WhatsApp.
          </p>
          <Button type="submit" variant="gold" size="lg" className="w-full">
            <MessageCircle /> Send WhatsApp Order Request
          </Button>
        </form>
        <Button variant="ghost" className="mt-2 w-full" onClick={clearCart}>
          Clear Cart
        </Button>
      </aside>
    </section>
  );
}

export function BranchesPage() {
  return (
    <section className="py-10 sm:py-12 md:py-16">
      <SectionTitle
        eyebrow="Branches"
        title="Find your nearest MAAAX store"
        copy="Select a branch to remember it across product availability checks and cart requests."
      />
      <div className="mx-auto max-w-[1480px] px-4 sm:px-5 lg:px-8">
        <div className="flex flex-col gap-4 bg-header p-5 text-header-foreground sm:p-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <Store className="mt-1 h-8 w-8 shrink-0 text-gold" />
            <div>
              <h2 className="text-xl font-black sm:text-2xl">Nine branches across Maharashtra</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-header-subtle">
                Select your preferred branch for pickup, availability checks and order support.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center text-sm lg:min-w-80">
            <span className="border border-header-border px-3 py-2">
              <strong className="block text-lg text-gold">9</strong> Branches
            </span>
            <span className="border border-header-border px-3 py-2">
              <strong className="block text-lg text-gold">24+</strong> Styles
            </span>
            <span className="border border-header-border px-3 py-2">
              <strong className="block text-lg text-gold">WA</strong> Support
            </span>
          </div>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {branches.map((branch) => (
            <article key={branch.id} className="border bg-background p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-black">{branch.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{branch.area}</p>
                </div>
                <span
                  className={`shrink-0 px-2.5 py-1 text-xs font-bold ${
                    branch.status === "available"
                      ? "bg-success/10 text-success"
                      : branch.status === "limited"
                        ? "bg-warning/10 text-warning"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {branch.status === "limited" ? "Limited" : branch.status}
                </span>
              </div>
              <div className="mt-5 grid gap-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gold" /> {branch.distance}
                </span>
                <span className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gold" /> {branch.phone}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AvailabilityPage({ productSlug }: { productSlug?: string }) {
  const product = productSlug ? getProduct(productSlug) : products[0];

  return (
    <section className="py-10 sm:py-12 md:py-16">
      <SectionTitle
        eyebrow="Availability"
        title="Check branch stock"
        copy={`Looking for ${product.name}? Pick a branch and the team can confirm size and color availability.`}
      />
      <div className="mx-auto grid max-w-[1480px] gap-6 px-4 sm:px-5 lg:grid-cols-[360px_1fr] lg:gap-8 lg:px-8">
        <ProductCard product={product} />
        <div className="border p-4 sm:p-5">
          <BranchList />
        </div>
      </div>
    </section>
  );
}

export function AboutPage() {
  const values = [
    ["Wholesale value", "Clear prices across reliable everyday fashion."],
    ["Branch access", "A growing local network for pickup and support."],
    ["Trend-led basics", "Current silhouettes without making the range hard to shop."],
  ];

  return (
    <section className="py-10 sm:py-12 md:py-16">
      <SectionTitle
        eyebrow="About MAAAX"
        title="About Us"
      />
      <div className="mx-auto mb-8 grid max-w-[1480px] gap-6 px-4 sm:px-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-8 lg:px-8">
        <div className="overflow-hidden border bg-surface-soft">
          <img src={shopImage} alt="MAAAX store" className="aspect-[4/3] w-full object-cover" />
        </div>
        <div className="border bg-background p-5 sm:p-7 lg:p-8">
          <p className="eyebrow text-gold">Shop Information</p>
          <h2 className="mt-3 text-2xl font-black leading-tight sm:text-3xl">
            Fashion, wholesale value and branch support in one place
          </h2>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            MAAAX focuses on everyday fashion essentials with practical pricing, quick branch support and a simple WhatsApp-led order flow. Customers can discover styles online, check nearby branch support, and place enquiries without a complicated checkout.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              ["9", "Branches"],
              ["24+", "Styles"],
              ["WA", "Enquiry"],
            ].map(([value, label]) => (
              <div key={label} className="border bg-surface-soft px-4 py-3">
                <strong className="block text-xl text-gold">{value}</strong>
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto mb-8 grid max-w-[1480px] gap-6 px-4 sm:px-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-8 lg:px-8">
        <div className="border bg-header p-5 text-header-foreground sm:p-7 lg:p-8">
          <p className="eyebrow text-gold">Owner's Note</p>
          <h2 className="mt-3 text-2xl font-black leading-tight sm:text-3xl">
            Built with trust, service and everyday value
          </h2>
          <p className="mt-4 text-sm leading-6 text-header-subtle">
            MAAAX is shaped around a simple promise: offer practical fashion, honest pricing and friendly branch support for every customer. The focus is on making shopping easier through clear product information, quick WhatsApp assistance and dependable local service.
          </p>
          <div className="mt-6 grid gap-3 text-sm text-header-subtle">
            <span className="flex gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> Customer-first branch support
            </span>
            <span className="flex gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> Quality checked styles for daily wear
            </span>
            <span className="flex gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> Fair value for retail and wholesale buyers
            </span>
          </div>
        </div>
        <div className="overflow-hidden border bg-surface-soft">
          <img src={ownerImage} alt="MAAAX owner" className="aspect-[4/3] w-full object-cover object-top" />
        </div>
      </div>
      <div className="mx-auto grid max-w-[1480px] gap-4 px-4 sm:px-5 md:grid-cols-3 lg:gap-5 lg:px-8">
        {values.map(([title, copy]) => (
          <article key={title} className="border p-5 sm:p-6">
            <Heart className="h-6 w-6 text-gold" />
            <h2 className="mt-5 text-xl font-black">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ContactPage() {
  return (
    <section className="py-10 sm:py-12 md:py-16">
      <SectionTitle
        eyebrow="Contact"
        title="Talk to the MAAAX team"
        copy="Use this page for customer support, branch enquiries, bulk orders, returns and size guide questions."
      />
      <div className="mx-auto grid max-w-[1480px] gap-6 px-4 sm:px-5 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8 lg:px-8">
        <div className="space-y-4">
          <div className="border p-5 sm:p-6">
            <Phone className="h-6 w-6 text-gold" />
            <h2 className="mt-4 text-xl font-black">Customer Support</h2>
            <p className="mt-2 text-sm text-muted-foreground">Phone and WhatsApp details can be added in catalog data.</p>
          </div>
          <div className="border p-5 sm:p-6">
            <MapPin className="h-6 w-6 text-gold" />
            <h2 className="mt-4 text-xl font-black">Branch Help</h2>
            <p className="mt-2 text-sm text-muted-foreground">Choose a store from the branches page before pickup.</p>
          </div>
        </div>
        <form className="grid gap-4 border p-5 sm:p-6">
          <Input placeholder="Full name" aria-label="Full name" />
          <Input placeholder="Phone number" aria-label="Phone number" />
          <Input placeholder="Branch or city" aria-label="Branch or city" />
          <textarea
            placeholder="How can we help?"
            aria-label="Message"
            className="min-h-36 border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
          <Button type="button" variant="gold" size="lg">
            Send Enquiry
          </Button>
        </form>
      </div>
    </section>
  );
}

export function OrderSuccessPage() {
  const { clearCart } = useShop();
  const [showTracking, setShowTracking] = useState(false);
  const [adminOrderStatus, setAdminOrderStatus] = useState("New enquiry");
  const [order, setOrder] = useState<{
    id: string;
    name: string;
    phone: string;
    address: string;
    city: string;
    pincode: string;
    note: string;
    branch: string;
    total: number;
    items: Array<{ name: string; color: string; size: string; quantity: number; total: number }>;
  } | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("maaax_last_order_v1");
      if (saved) setOrder(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    if (!order?.id) return;
    const refreshStatus = () => {
      try {
        const adminOrders: Array<{ id: string; status: string }> = JSON.parse(
          localStorage.getItem("maaax_admin_orders_v1") || "[]",
        );
        const match = adminOrders.find((item) => item.id === order.id);
        if (match?.status) setAdminOrderStatus(match.status === "Completed" ? "Delivered successfully" : match.status);
      } catch {}
    };
    refreshStatus();
    if (!showTracking) return;
    const timer = window.setInterval(refreshStatus, 2500);
    return () => window.clearInterval(timer);
  }, [order?.id, showTracking]);

  const statusRank: Record<string, number> = {
    "New enquiry": 0,
    "Branch confirmation": 1,
    "Ready for pickup": 2,
    "Delivered successfully": 3,
    Completed: 3,
    Cancelled: -1,
  };
  const statusCopy: Record<string, { title: string; copy: string }> = {
    "New enquiry": {
      title: "Order request sent",
      copy: `${order?.branch || "Nearest branch"} team has received your WhatsApp enquiry.`,
    },
    "Branch confirmation": {
      title: "Branch confirmation in progress",
      copy: `${order?.branch || "Nearest branch"} team is checking stock and customer details.`,
    },
    "Ready for pickup": {
      title: "Ready for pickup",
      copy: `${order?.branch || "Nearest branch"} has confirmed your order. Please wait for final WhatsApp instructions.`,
    },
    "Delivered successfully": {
      title: "Delivered successfully",
      copy: "Your order has been delivered successfully. Thank you for choosing MAAAX.",
    },
    Completed: {
      title: "Delivered successfully",
      copy: "Your order has been delivered successfully. Thank you for choosing MAAAX.",
    },
    Cancelled: {
      title: "Order cancelled",
      copy: "This order was marked cancelled by the admin team.",
    },
  };
  const activeRank = statusRank[adminOrderStatus] ?? 0;
  const activeCopy = statusCopy[adminOrderStatus] ?? statusCopy["New enquiry"];
  const trackingMessage = encodeURIComponent(
    `Hi MAAAX, please share tracking update for my order ${order?.id || ""}.`,
  );
  const trackingHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${trackingMessage}`
    : `https://api.whatsapp.com/send?text=${trackingMessage}`;
  const trackingSteps: Array<[string, number]> = [
    ["Order request sent", 0],
    ["Branch confirmation", 1],
    ["Ready for pickup", 2],
    ["Delivered successfully", 3],
  ];

  return (
    <section className="mx-auto grid min-h-[65vh] max-w-xl place-items-center px-4 py-14 text-center sm:px-5 sm:py-16">
      <div className="w-full">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-success/10">
          <CheckCircle2 className="h-14 w-14 text-success" />
        </div>
        <h1 className="mt-5 text-2xl font-black sm:text-3xl">Order Placed Successfully!</h1>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
          Your order has been sent to {order?.branch || "your nearest MAAAX branch"}.
        </p>
        {order && (
          <div className="mt-6 border bg-background p-5 text-left shadow-sm sm:p-6">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Order ID</span>
                <strong>{order.id}</strong>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Product</span>
                <strong className="text-right">{order.items[0]?.name || "MAAAX order"}</strong>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Size</span>
                <strong>{order.items[0]?.size || "-"}</strong>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Total Amount</span>
                <strong>Rs. {order.total}</strong>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Sent To</span>
                <strong className="text-right">{order.branch}</strong>
              </div>
            </div>
            <p className="mt-5 rounded-sm bg-surface-soft px-4 py-3 text-center text-sm leading-6 text-muted-foreground">
              Our branch team will contact you shortly for confirmation.
            </p>
          </div>
        )}
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Button asChild className="bg-[#111111] text-white hover:bg-[#1f1f1f]" onClick={clearCart}>
            <Link to="/new-arrivals">Continue Shopping</Link>
          </Button>
          <Button type="button" variant="outline" onClick={() => setShowTracking((value) => !value)}>
            Track Order
          </Button>
        </div>
        {showTracking && (
          <div className="mt-5 border bg-surface-soft p-5 text-left shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">Current Status</p>
                <h2 className="mt-2 text-xl font-black">{activeCopy.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {activeCopy.copy}
                </p>
              </div>
              <Truck className="mt-1 h-7 w-7 shrink-0 text-gold" />
            </div>
            <div className="mt-5 space-y-3">
              {trackingSteps.map(([label, rank], index) => {
                const isDone = adminOrderStatus !== "Cancelled" && activeRank > rank;
                const isActive = adminOrderStatus !== "Cancelled" && activeRank === rank;
                const status =
                  adminOrderStatus === "Cancelled"
                    ? index === 0
                      ? "Cancelled"
                      : "Stopped"
                    : isDone
                      ? "Completed"
                      : isActive && rank === 3
                        ? "Delivered"
                        : isActive
                          ? "In progress"
                          : "Pending";
                return (
                <div key={label} className="flex items-center gap-3 text-sm">
                  <span
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border ${
                      isDone
                        ? "border-success bg-success text-white"
                        : isActive
                          ? "border-gold bg-gold text-gold-foreground"
                          : "border-border bg-background text-muted-foreground"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <span className="flex-1 font-bold">{label}</span>
                  <span className="text-xs text-muted-foreground">{status}</span>
                </div>
                );
              })}
            </div>
            <Button asChild variant="gold" className="mt-5 w-full">
              <a href={trackingHref} target="_blank" rel="noreferrer">
                <MessageCircle /> Ask on WhatsApp
              </a>
            </Button>
          </div>
        )}
        <p className="mt-5 text-xs leading-5 text-muted-foreground">
          Thank you for choosing MAAAX. Fashion, family and always with you.
        </p>
      </div>
    </section>
  );
}


