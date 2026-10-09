"use client";
import { motion } from "framer-motion";
import Link from "lib/Link";
import Image from "lib/NextImage";
const CATS = [
    { id: "tshirts", label: "T-Shirts", href: "/men", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80" },
    { id: "shirts", label: "Shirts", href: "/men", image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&q=80" },
    { id: "hoodies", label: "Hoodies & Sweatshirts", href: "/men", image: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80" },
    { id: "jeans", label: "Jeans", href: "/men", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80" },
    { id: "trousers", label: "Trousers", href: "/men", image: "https://images.unsplash.com/photo-1594938298603-c8148c4b4e7b?w=600&q=80" },
    { id: "jackets", label: "Jackets & Coats", href: "/men", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80" },
    { id: "activewear", label: "Activewear", href: "/men", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80" },
    { id: "shoes", label: "Shoes", href: "/men", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80" },
    { id: "accessories", label: "Accessories", href: "/men", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80" },
];
export default function MenCategoryGrid() {
    return (<section className="py-10 sm:py-14 bg-white">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-end justify-between mb-7">
          <div>
            <p className="font-body text-[10px] tracking-[0.3em] text-stone mb-1">BROWSE</p>
            <h2 className="font-display text-3xl sm:text-4xl font-light">Shop by Category</h2>
          </div>
          <Link href="/men" className="hidden sm:block font-body text-xs tracking-[0.2em] text-stone hover:text-charcoal transition-colors border-b border-stone/40 pb-0.5">
            VIEW ALL →
          </Link>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-9 gap-2 sm:gap-3">
          {CATS.map((cat, i) => (<motion.div key={cat.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.05 }}>
              <Link href={cat.href} className="group flex flex-col items-center gap-2 block">
                <div className="relative w-full overflow-hidden bg-bone rounded-sm" style={{ aspectRatio: "3/4" }}>
                  <Image src={cat.image} alt={cat.label} fill sizes="(max-width: 640px) 33vw, 11vw" className="object-cover object-top transition-transform duration-700 group-hover:scale-110"/>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300"/>
                </div>
                <span className="font-body text-[11px] sm:text-xs tracking-[0.12em] text-charcoal text-center group-hover:underline underline-offset-2 leading-tight">
                  {cat.label}
                </span>
              </Link>
            </motion.div>))}
        </div>
      </div>
    </section>);
}
