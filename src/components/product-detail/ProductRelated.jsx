"use client";
import { useRef } from "react";
import { useState } from "react";
import Image from "lib/NextImage";
import Link from "lib/Link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { useWishlist } from "lib/wishlist-context";
export default function ProductRelated({ products }) {
  const scrollRef = useRef(null);
  const scroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };
  return (
    <section className="bg-white border-t border-gray-100 py-10 sm:py-14">
      <div className="max-w-[1400px] mx-auto">
        <div className="px-4 sm:px-6 lg:px-8 mb-6 flex items-end justify-between">
          <div>
            <p className="font-body text-[10px] tracking-[0.3em] text-gray-400 mb-1">
              CUSTOMERS ALSO LOVED
            </p>
            <h2 className="font-body text-xl sm:text-2xl font-bold text-charcoal">
              You May Also Like
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="w-9 h-9 border border-gray-200 flex items-center justify-center hover:border-charcoal hover:bg-pinked hover:text-white transition-colors"
            >
              <ChevronLeft size={16} strokeWidth={1.5} />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="w-9 h-9 border border-gray-200 flex items-center justify-center hover:border-charcoal hover:bg-pinked hover:text-white transition-colors"
            >
              <ChevronRight size={16} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-8 pb-2"
        >
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(i * 0.05, 0.3) }}
              className="flex-none w-[170px] sm:w-[200px] lg:w-[220px]"
            >
              <RelatedCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
function RelatedCard({ product }) {
  const [hovered, setHovered] = useState(false);
  const { toggleWishlist, isWishlisted } = useWishlist();

  return (
    <div
      className="group flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link
        href={`/product/${product.slug}`}
        className="block relative overflow-hidden bg-[#f5f5f5]"
        style={{ aspectRatio: "3/4" }}
      >
        <Image
          src={product.default_image}
          alt={product.name}
          fill
          sizes="220px"
          className="object-cover object-top"
        />

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-2 right-2 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center"
        >
          <Heart
            size={13}
            strokeWidth={1.5}
            className={
              isWishlisted(product.id)
                ? "fill-red-500 text-red-500"
                : "text-charcoal"
            }
          />
        </button>
      </Link>

      <div className="mt-2.5">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-body text-[12px] text-charcoal hover:underline line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {product.price !== null && (
          <span className="font-body text-sm font-bold">
            £{Number(product.price).toFixed(2)}
          </span>
        )}
      </div>
    </div>
  );
}
