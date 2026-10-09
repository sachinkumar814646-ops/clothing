"use client";
import { useState } from "react";
import Image from "lib/NextImage";
import Link from "lib/Link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
export const HOME_PRODUCTS = [
    // New In
    { id: "h001", name: "LINEN SOFA — NATURAL", price: 899, category: "furniture", isNew: true,
        images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80", "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80"] },
    { id: "h002", name: "ARCH FLOOR LAMP", price: 145, category: "lighting", isNew: true,
        images: ["https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80", "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&q=80"] },
    { id: "h003", name: "ABSTRACT CANVAS PRINT", price: 79, category: "wall", isNew: true,
        images: ["https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80", "https://images.unsplash.com/photo-1582738411706-bbb4e7a61c2d?w=600&q=80"] },
    { id: "h004", name: "WAFFLE KNIT THROW", price: 55, category: "bedding", isNew: true,
        images: ["https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80", "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80"] },
    { id: "h005", name: "BOUCLÉ ARMCHAIR — CREAM", price: 499, category: "furniture", isNew: true,
        images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80", "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80"] },
    { id: "h006", name: "RATTAN PENDANT LIGHT", price: 89, category: "lighting", isNew: true,
        images: ["https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&q=80", "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80"] },
    { id: "h007", name: "SCANDI WOOL RUG 160×230", price: 229, category: "rugs", isNew: true,
        images: ["https://images.unsplash.com/photo-1600166898405-da9535204843?w=600&q=80", "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80"] },
    { id: "h008", name: "CERAMIC VASE SET — 3PC", price: 65, category: "accessories", isNew: true,
        images: ["https://images.unsplash.com/photo-1567016432779-094069958ea5?w=600&q=80", "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80"] },
    // Trending
    { id: "h009", name: "OAK COFFEE TABLE", price: 349, category: "furniture",
        images: ["https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=600&q=80", "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80"] },
    { id: "h010", name: "SATIN DUVET SET — IVORY", price: 119, category: "bedding",
        images: ["https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80", "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80"] },
    { id: "h011", name: "WALL MIRROR — OVAL", price: 155, category: "wall",
        images: ["https://images.unsplash.com/photo-1582738411706-bbb4e7a61c2d?w=600&q=80", "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80"] },
    { id: "h012", name: "MARBLE CANDLE HOLDERS", price: 38, category: "accessories",
        images: ["https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80", "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=600&q=80"] },
    { id: "h013", name: "KITCHEN HERB PLANTER SET", price: 45, category: "kitchen",
        images: ["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80", "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80"] },
    { id: "h014", name: "WOVEN STORAGE BASKET", price: 35, category: "storage",
        images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", "https://images.unsplash.com/photo-1600166898405-da9535204843?w=600&q=80"] },
    { id: "h015", name: "TERRAZZO SIDE TABLE", price: 189, category: "furniture",
        images: ["https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80", "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=600&q=80"] },
    { id: "h016", name: "LINEN CUSHION — SAGE", price: 28, category: "bedding",
        images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80", "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80"] },
    { id: "h017", name: "TERRAZZO PLANTER", price: 42, category: "accessories",
        images: ["https://images.unsplash.com/photo-1567016432779-094069958ea5?w=600&q=80", "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80"] },
    // Sale
    { id: "h018", name: "VELVET ACCENT CHAIR — TEAL", price: 249, originalPrice: 399, category: "furniture", isSale: true,
        images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80", "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80"] },
    { id: "h019", name: "BAMBOO FLOOR LAMP", price: 69, originalPrice: 119, category: "lighting", isSale: true,
        images: ["https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&q=80", "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80"] },
    { id: "h020", name: "GEOMETRIC PRINT RUG 120×180", price: 89, originalPrice: 165, category: "rugs", isSale: true,
        images: ["https://images.unsplash.com/photo-1600166898405-da9535204843?w=600&q=80", "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80"] },
    { id: "h021", name: "MACRAMÉ WALL HANGING", price: 42, originalPrice: 75, category: "wall", isSale: true,
        images: ["https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80", "https://images.unsplash.com/photo-1582738411706-bbb4e7a61c2d?w=600&q=80"] },
];
export function HomeProductCard({ product }) {
    const [hovered, setHovered] = useState(false);
    const [wishlisted, setWishlisted] = useState(false);
    const discount = product.originalPrice
        ? Math.round((1 - product.price / product.originalPrice) * 100)
        : 0;
    return (<div className="group relative flex flex-col" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <Link href="/home-decor" className="block relative overflow-hidden bg-[#f7f7f5] w-full" style={{ aspectRatio: "1/1" }}>
        <Image src={product.images[0]} alt={product.name} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" className={`object-cover object-center transition-opacity duration-500 ${hovered ? "opacity-0" : "opacity-100"}`}/>
        <Image src={product.images[1]} alt={`${product.name} — view 2`} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" className={`object-cover object-center transition-opacity duration-500 ${hovered ? "opacity-100" : "opacity-0"}`}/>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {product.isNew && (<span className="font-body text-[9px] tracking-[0.15em] bg-pinked text-white px-2 py-0.5">NEW</span>)}
          {product.isSale && (<span className="font-body text-[9px] tracking-[0.15em] bg-red-600 text-white px-2 py-0.5">SALE</span>)}
          {discount > 0 && (<span className="font-body text-[9px] bg-white text-charcoal px-2 py-0.5 font-semibold">-{discount}%</span>)}
        </div>

        {/* Wishlist */}
        <button onClick={(e) => { e.preventDefault(); setWishlisted((v) => !v); }} className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white z-10 shadow-sm" aria-label="Wishlist">
          <Heart size={14} strokeWidth={1.5} className={wishlisted ? "fill-red-500 text-red-500" : "text-charcoal"}/>
        </button>

        {/* Quick view */}
        <AnimatePresence>
          {hovered && (<motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.2 }} className="absolute bottom-0 left-0 right-0 bg-pinked/90 py-2.5 text-center z-10">
              <span className="font-body text-[10px] tracking-[0.2em] text-white">QUICK VIEW</span>
            </motion.div>)}
        </AnimatePresence>
      </Link>

      <div className="mt-3">
        <Link href="/home-decor">
          <h3 className="font-body text-[11px] sm:text-xs tracking-[0.12em] text-charcoal hover:underline underline-offset-2 line-clamp-2 leading-snug">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="font-body text-sm font-semibold text-charcoal">£{product.price}</span>
          {product.originalPrice && (<span className="font-body text-sm text-stone line-through">£{product.originalPrice}</span>)}
        </div>
      </div>
    </div>);
}
