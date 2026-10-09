"use client";
import { useState } from "react";
import Image from "lib/NextImage";
import Link from "lib/Link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
export default function NewInProductCard({ product, priority }) {
    const [hovered, setHovered] = useState(false);
    const [wishlisted, setWishlisted] = useState(false);
    const discount = product.originalPrice
        ? Math.round((1 - product.price / product.originalPrice) * 100)
        : 0;
    return (<div className="group relative flex flex-col" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {/* Image container */}
      <Link href={`/product/${product.id}`} className="block relative overflow-hidden bg-[#f5f5f5]" style={{ aspectRatio: "3/4" }}>
        {/* Primary image */}
        <Image src={product.images[0]} alt={product.name} fill priority={priority} sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" className={`object-cover object-top transition-opacity duration-500 ${hovered ? "opacity-0" : "opacity-100"}`}/>
        {/* Hover image */}
        <Image src={product.images[1]} alt={`${product.name} — view 2`} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" className={`object-cover object-top transition-opacity duration-500 ${hovered ? "opacity-100" : "opacity-0"}`}/>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {product.badge === "NEW" && (<span className="font-body text-[9px] tracking-[0.12em] bg-pinked text-white px-2 py-0.5 font-medium">
              NEW
            </span>)}
          {product.badge === "SALE" && (<span className="font-body text-[9px] tracking-[0.12em] bg-red-600 text-white px-2 py-0.5 font-medium">
              SALE
            </span>)}
          {discount > 0 && (<span className="font-body text-[9px] bg-red-600 text-white px-2 py-0.5 font-medium">
              -{discount}%
            </span>)}
        </div>

        {/* Next Day badge */}
        {product.nextDay && (<div className="absolute bottom-10 left-0 right-0 flex justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className="font-body text-[9px] tracking-[0.1em] bg-white/95 text-charcoal px-2 py-0.5 font-medium shadow-sm">
              ⚡ NEXT DAY DELIVERY
            </span>
          </div>)}

        {/* Wishlist button */}
        <button onClick={(e) => { e.preventDefault(); setWishlisted((v) => !v); }} className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white z-10 shadow-sm" aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}>
          <Heart size={15} strokeWidth={1.5} className={wishlisted ? "fill-red-500 text-red-500" : "text-charcoal"}/>
        </button>

        {/* Quick view */}
        <AnimatePresence>
          {hovered && (<motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.18 }} className="absolute bottom-0 left-0 right-0 bg-pinked/90 py-2.5 text-center z-10">
              <span className="font-body text-[10px] tracking-[0.18em] text-white font-medium">
                QUICK VIEW
              </span>
            </motion.div>)}
        </AnimatePresence>
      </Link>

      {/* Product info */}
      <div className="mt-2.5">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-body text-[12px] sm:text-[13px] text-charcoal hover:underline underline-offset-2 line-clamp-2 leading-snug">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mt-1">
          <span className={`font-body text-sm font-bold ${product.isSale ? "text-red-600" : "text-charcoal"}`}>
            £{product.price.toFixed(2)}
          </span>
          {product.originalPrice && (<span className="font-body text-sm text-gray-400 line-through">
              £{product.originalPrice.toFixed(2)}
            </span>)}
        </div>
      </div>
    </div>);
}
