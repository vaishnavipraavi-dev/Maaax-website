import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import type { Product } from "@/data/catalog";
export type CartItem={product:Product;color:string;size:string;quantity:number;branch?:string};
type ShopContextValue={cart:CartItem[];cartCount:number;addToCart:(item:CartItem)=>void;updateQty:(slug:string,n:number)=>void;removeItem:(slug:string)=>void;clearCart:()=>void;selectedBranch:string;setSelectedBranch:(v:string)=>void};
const ShopContext=createContext<ShopContextValue|undefined>(undefined);
export function ShopProvider({children}:{children:ReactNode}){
 const [cart,setCart]=useState<CartItem[]>([]); const [selectedBranch,setSelectedBranch]=useState(""); const [ready,setReady]=useState(false);
 useEffect(()=>{try{const c=localStorage.getItem("maaax_cart_v1");const b=localStorage.getItem("maaax_branch_v1");if(c)setCart(JSON.parse(c));if(b)setSelectedBranch(b)}catch{}setReady(true)},[]);
 useEffect(()=>{if(ready)localStorage.setItem("maaax_cart_v1",JSON.stringify(cart))},[cart,ready]);
 useEffect(()=>{if(ready)localStorage.setItem("maaax_branch_v1",selectedBranch)},[selectedBranch,ready]);
 const value=useMemo(()=>({cart,cartCount:cart.reduce((s,i)=>s+i.quantity,0),addToCart:(item:CartItem)=>{setCart(p=>{const found=p.find(x=>x.product.slug===item.product.slug&&x.color===item.color&&x.size===item.size);return found?p.map(x=>x===found?{...x,quantity:x.quantity+item.quantity}:x):[...p,item]});toast.success("Added to your cart")},updateQty:(slug:string,n:number)=>setCart(p=>p.map(i=>i.product.slug===slug?{...i,quantity:Math.max(1,n)}:i)),removeItem:(slug:string)=>setCart(p=>p.filter(i=>i.product.slug!==slug)),clearCart:()=>setCart([]),selectedBranch,setSelectedBranch}),[cart,selectedBranch]);
 return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}
export function useShop(){const c=useContext(ShopContext);if(!c)throw new Error("useShop requires ShopProvider");return c}
