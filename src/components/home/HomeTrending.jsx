"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "lib/Link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HOME_PRODUCTS, HomeProductCard } from "../home-decor/HomeProducts";
export default function HomeTrending() {
    const scrollRef = useRef(null);
    const scroll = (dir) => {
        if (!scrollRef.current)
            return;
        scrollRef.current.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
    };
    const trending = HOME_PRODUCTS.slice(8, 18);
    return (<section className="py-10 sm:py-14 lg:py-16 bg-[#f7f7f5]">
      <div className="max-w-[1600px] mx-auto">
        <div className="px-4 sm:px-6 lg:px-10 mb-7 sm:mb-9 flex items-end justify-between">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <p className="font-body text-[10px] tracking-[0.3em] text-stone mb-1">EVERYONE&apos;S LOVING</p>
            <h2 className="font-display text-3xl sm:text-4xl font-light">Trending Now</h2>
          </motion.div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button onClick={() => scroll("left")} aria-label="Scroll left" className="w-9 h-9 sm:w-10 sm:h-10 border border-charcoal/25 flex items-center justify-center hover:bg-pinked hover:text-white transition-colors">
              <ChevronLeft size={16} strokeWidth={1.5}/>
            </button>
            <button onClick={() => scroll("right")} aria-label="Scroll right" className="w-9 h-9 sm:w-10 sm:h-10 border border-charcoal/25 flex items-center justify-center hover:bg-pinked hover:text-white transition-colors">
              <ChevronRight size={16} strokeWidth={1.5}/>
            </button>
            <Link href="/home-decor" className="hidden sm:block font-body text-xs tracking-[0.2em] text-stone hover:text-charcoal transition-colors border-b border-stone/40 hover:border-charcoal pb-0.5 ml-2">
              VIEW ALL →
            </Link>
          </div>
        </div>

        <div ref={scrollRef} className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-10 pb-2">
          {trending.map((product, i) => (<motion.div key={product.id} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: Math.min(i * 0.05, 0.25) }} className="flex-none w-[185px] xs:w-[210px] sm:w-[240px] lg:w-[260px]">
              <HomeProductCard product={product}/>
            </motion.div>))}
        </div>
      </div>
    </section>);
}
