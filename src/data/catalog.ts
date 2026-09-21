import heroFashion from "@/assets/hero-fashion.jpg";
import heroMen from "@/assets/hero-men.jpg";
import heroSeason from "@/assets/hero-season.jpg";
import tshirts from "@/assets/cat-tshirts.jpg";
import shirts from "@/assets/cat-shirts.jpg";
import jeans from "@/assets/cat-jeans.jpg";
import cargo from "@/assets/cat-cargo.jpg";
import track from "@/assets/cat-track.jpg";
import hoodies from "@/assets/cat-hoodies.jpg";
import coords from "@/assets/cat-coords.jpg";
import women from "@/assets/cat-women.jpg";
import kids from "@/assets/cat-kids.jpg";
import accessories from "@/assets/cat-accessories.jpg";
import men1 from "@/assets/products/men-1.jpg";
import men2 from "@/assets/products/men-2.jpg";
import men3 from "@/assets/products/men-3.jpg";
import men4 from "@/assets/products/men-4.jpg";
import men5 from "@/assets/products/men-5.jpg";
import men6 from "@/assets/products/men-6.jpg";
import women1 from "@/assets/products/women-1.jpg";
import women2 from "@/assets/products/women-2.jpg";
import women3 from "@/assets/products/women-3.jpg";
import women4 from "@/assets/products/women-4.jpg";
import women5 from "@/assets/products/women-5.jpg";
import women6 from "@/assets/products/women-6.jpg";
import kids1 from "@/assets/products/kids-1.jpg";
import kids2 from "@/assets/products/kids-2.jpg";
import kids3 from "@/assets/products/kids-3.jpg";
import kids4 from "@/assets/products/kids-4.jpg";

export type StockState = "available" | "limited" | "unavailable";
export type Product = { id:string; slug:string; name:string; category:string; gender:"men"|"women"|"kids"|"unisex"; price:number; originalPrice?:number; description:string; images:string[]; colors:string[]; sizes:string[]; featured:boolean; newArrival:boolean; stock:StockState; image:string };
export type Branch = { id:string; name:string; area:string; distance:string; phone:string; hours:string; status:StockState };

export const heroSlides = [
  { image:heroFashion, eyebrow:"TRENDY OUTFITS, STRONGER TOGETHER.", title:"FASHION FOR EVERYONE.", copy:"Premium Quality · Best Rates · Multiple Branches" },
  { image:heroMen, eyebrow:"THE EVERYDAY EDIT", title:"FRESH FITS. BETTER PRICES.", copy:"Contemporary essentials at honest wholesale value" },
  { image:heroSeason, eyebrow:"THE NEW COLLECTION", title:"NEW SEASON. NEW STYLE.", copy:"Fresh silhouettes, considered for every wardrobe" },
];

export const categories = [
  {slug:"t-shirts", name:"T-Shirts", image:tshirts}, {slug:"shirts", name:"Shirts", image:shirts},
  {slug:"jeans", name:"Jeans", image:jeans}, {slug:"cargo-pants", name:"Cargo Pants", image:cargo},
  {slug:"track-pants", name:"Track Pants", image:track}, {slug:"hoodies", name:"Hoodies & Sweatshirts", image:hoodies},
  {slug:"co-ord-sets", name:"Co-Ord Sets", image:coords}, {slug:"womens-wear", name:"Women’s Wear", image:women},
  {slug:"kids-wear", name:"Kids Wear", image:kids}, {slug:"accessories", name:"Accessories", image:accessories},
];

const defs: Array<[string,string,string,Product["gender"],number,number|undefined,string[],string[],string,boolean]> = [
["oversized-black-tee","MAAAX Oversized T-Shirt","t-shirts","men",499,699,["Black","Olive","Cream"],["S","M","L","XL","XXL"],tshirts,true],
["rust-polo","Rust Cotton Polo","t-shirts","men",549,749,["Rust","Black"],["M","L","XL"],men1,true],
["ivory-sweatshirt","Ivory Everyday Sweatshirt","hoodies","unisex",799,999,["Ivory","Charcoal"],["S","M","L","XL"],men2,true],
["indigo-denim-jacket","Indigo Denim Jacket","shirts","men",1199,1499,["Indigo"],["M","L","XL"],men3,true],
["utility-joggers","Utility Cargo Joggers","cargo-pants","unisex",749,999,["Black","Olive"],["S","M","L","XL"],men4,false],
["sand-overshirt","Sand Utility Overshirt","shirts","men",899,1199,["Sand","Black"],["M","L","XL"],men5,true],
["meadow-midi","Meadow Print Midi Dress","womens-wear","women",1099,1399,["Ivory Print"],["S","M","L","XL"],men6,true],
["olive-coord","Olive Relaxed Co-Ord Set","co-ord-sets","women",1299,1699,["Olive","Stone"],["S","M","L","XL"],women1,true],
["black-relaxed-shirt","Black Relaxed Shirt","shirts","women",649,899,["Black","Cream"],["S","M","L","XL"],women2,false],
["cream-wide-jeans","Cream Wide-Leg Jeans","jeans","women",899,1199,["Cream","Blue"],["26","28","30","32","34"],women3,true],
["charcoal-hoodie","Charcoal Essential Hoodie","hoodies","women",899,1199,["Charcoal","Black"],["S","M","L","XL"],women4,true],
["scarlet-day-dress","Scarlet Day Dress","womens-wear","women",999,1299,["Scarlet","Black"],["S","M","L","XL"],women5,false],
["sand-cargo","Sand Wide Cargo Pants","cargo-pants","women",799,999,["Sand","Olive"],["26","28","30","32"],women6,true],
["blue-kids-set","Blue Summer Kids Set","kids-wear","kids",599,799,["Blue"],["4Y","6Y","8Y","10Y"],kids1,true],
["olive-kids-set","Olive Play Set","kids-wear","kids",699,899,["Olive"],["4Y","6Y","8Y","10Y"],kids2,true],
["cream-kids-sweatshirt","Cream Kids Sweatshirt","kids-wear","kids",499,649,["Cream"],["4Y","6Y","8Y","10Y"],kids3,false],
["black-kids-coord","Black Kids Co-Ord","kids-wear","kids",649,849,["Black"],["4Y","6Y","8Y","10Y"],kids4,true],
["relaxed-blue-denim","Relaxed Blue Denim","jeans","women",899,1199,["Mid Blue","Dark Blue"],["26","28","30","32","34"],jeans,true],
["striped-cotton-shirt","Striped Cotton Shirt","shirts","men",699,899,["Blue Stripe","Sand Stripe"],["M","L","XL","XXL"],shirts,false],
["olive-cargo-pants","Olive Utility Cargo Pants","cargo-pants","men",799,1099,["Olive","Black"],["M","L","XL"],cargo,true],
["classic-track-pants","Classic Track Pants","track-pants","men",599,799,["Black","Navy"],["S","M","L","XL"],track,false],
["oversized-hoodie","Oversized Charcoal Hoodie","hoodies","men",899,1199,["Charcoal","Stone"],["S","M","L","XL"],hoodies,true],
["linen-coord","Natural Linen Co-Ord","co-ord-sets","women",1299,1599,["Natural","Olive"],["S","M","L","XL"],coords,true],
["streetwear-cap","Classic Streetwear Cap","accessories","unisex",349,499,["Black","Stone"],["One Size"],accessories,true],
];
export const products: Product[] = defs.map((d,i)=>({id:String(i+1),slug:d[0],name:d[1],category:d[2],gender:d[3],price:d[4],originalPrice:d[5],colors:d[6],sizes:d[7],image:d[8],featured:d[9],newArrival:i%3!==1,stock:i%7===0?"limited":"available",description:"A refined everyday essential made with comfortable, durable fabric and a contemporary relaxed fit.",images:[d[8], d[8], d[8], d[8]]}));

export const branches: Branch[] = ["Panvel","Khalapur","Karjat","Pen","Alibag","Roha","Mangaon","Tala","Murud"].map((name,i)=>({id:name.toLowerCase(),name:`${name} Branch`,area:`Editable address placeholder, ${name}, Maharashtra`,distance:i===0?"2.4 km":`${8+i*4} km`,phone:"Contact number pending",hours:"Business hours pending",status:i===2||i===6?"limited":i===8?"unavailable":"available"}));
export const getProduct=(slug:string)=>products.find(p=>p.slug===slug) ?? products[0];
export const categoryName=(slug:string)=>categories.find(c=>c.slug===slug)?.name ?? "All Products";
export const whatsappNumber="918767980311";
