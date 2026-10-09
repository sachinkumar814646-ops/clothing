"use client";
import { useState } from "react";
import Image from "lib/NextImage";
import Link from "lib/Link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
export const MEN_NEW_PRODUCTS = [
    { id: "m001", name: "Essential Oversized Tee", price: 14, category: "tshirts", isNew: true, badge: "NEW",
        images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80", "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&q=80"] },
    { id: "m002", name: "Oxford Button-Down Shirt", price: 28, category: "shirts", isNew: true, badge: "NEW",
        images: ["https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&q=80", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"] },
    { id: "m003", name: "Relaxed Fit Hoodie", price: 32, category: "hoodies", isNew: true, badge: "NEW",
        images: ["https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80", "https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=600&q=80"] },
    { id: "m004", name: "Slim Fit Dark Wash Jeans", price: 42, category: "jeans", isNew: true, badge: "NEW",
        images: ["https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80", "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=600&q=80"] },
    { id: "m005", name: "Tailored Smart Trousers", price: 38, category: "trousers", isNew: true, badge: "NEW",
        images: ["https://images.unsplash.com/photo-1594938298603-c8148c4b4e7b?w=600&q=80", "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80"] },
    { id: "m006", name: "Technical Bomber Jacket", price: 65, category: "jackets", isNew: true, badge: "NEW",
        images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80", "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80"] },
    { id: "m007", name: "Performance Running Tee", price: 18, category: "activewear", isNew: true,
        images: ["https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80", "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80"] },
    { id: "m008", name: "Chunky Sole Trainers", price: 58, category: "shoes", isNew: true, badge: "NEW",
        images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80", "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80"] },
];
export const MEN_BESTSELLER_PRODUCTS = [
    { id: "m009", name: "Graphic Print Tee", price: 16, originalPrice: 22, category: "tshirts", isSale: true, badge: "SALE",
        images: ["https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&q=80", "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80"] },
    { id: "m010", name: "Linen Blend Shirt", price: 24, category: "shirts",
        images: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80", "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&q=80"] },
    { id: "m011", name: "Zip-Up Track Top", price: 35, originalPrice: 50, category: "hoodies", isSale: true, badge: "SALE",
        images: ["https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=600&q=80", "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80"] },
    { id: "m012", name: "Cargo Utility Trousers", price: 45, category: "trousers",
        images: ["https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80", "https://images.unsplash.com/photo-1594938298603-c8148c4b4e7b?w=600&q=80"] },
    { id: "m013", name: "Wool Blend Overcoat", price: 95, originalPrice: 140, category: "jackets", isSale: true, badge: "SALE",
        images: ["https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&q=80", "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80"] },
    { id: "m014", name: "Gym Shorts — 7 inch", price: 20, category: "activewear",
        images: ["https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80", "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80"] },
    { id: "m015", name: "Leather Chelsea Boots", price: 75, originalPrice: 99, category: "shoes", isSale: true, badge: "SALE",
        images: ["https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80"] },
    { id: "m016", name: "Minimalist Watch — Black", price: 55, category: "accessories",
        images: ["https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80", "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80"] },
];
export function MenProductCard({ product, priority }) {
    const [hovered, setHovered] = useState(false);
    const [wishlisted, setWishlisted] = useState(false);
    const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
    return (<div className="group flex flex-col" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <Link href={`/product/${product.id}`} className="block relative overflow-hidden bg-[#f5f5f5]" style={{ aspectRatio: "3/4" }}>
        <Image src={product.images[0]} alt={product.name} fill priority={priority} sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" className={`object-cover object-top transition-opacity duration-500 ${hovered ? "opacity-0" : "opacity-100"}`}/>
        <Image src={product.images[1]} alt={`${product.name} 2`} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" className={`object-cover object-top transition-opacity duration-500 ${hovered ? "opacity-100" : "opacity-0"}`}/>
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {product.badge === "NEW" && <span className="font-body text-[9px] bg-pinked text-white px-2 py-0.5 font-medium">NEW</span>}
          {product.badge === "SALE" && <span className="font-body text-[9px] bg-red-600 text-white px-2 py-0.5 font-medium">SALE</span>}
          {discount > 0 && <span className="font-body text-[9px] bg-red-600 text-white px-2 py-0.5 font-medium">-{discount}%</span>}
        </div>
        <button onClick={(e) => { e.preventDefault(); setWishlisted((v) => !v); }} className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-sm">
          <Heart size={14} strokeWidth={1.5} className={wishlisted ? "fill-red-500 text-red-500" : "text-charcoal"}/>
        </button>
        <AnimatePresence>
          {hovered && (<motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.18 }} className="absolute bottom-0 left-0 right-0 bg-pinked/90 py-2.5 text-center z-10">
              <span className="font-body text-[10px] tracking-[0.18em] text-white font-medium">QUICK VIEW</span>
            </motion.div>)}
        </AnimatePresence>
      </Link>
      <div className="mt-2.5">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-body text-[12px] sm:text-[13px] text-charcoal hover:underline underline-offset-2 line-clamp-2 leading-snug">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-2 mt-1">
          <span className={`font-body text-sm font-bold ${product.isSale ? "text-red-600" : "text-charcoal"}`}>£{product.price.toFixed(2)}</span>
          {product.originalPrice && <span className="font-body text-sm text-gray-400 line-through">£{product.originalPrice.toFixed(2)}</span>}
        </div>
      </div>
    </div>);
}
