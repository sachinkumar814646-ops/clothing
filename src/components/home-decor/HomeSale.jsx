"use client";
import { motion } from "framer-motion";
import Link from "lib/Link";
import Image from "lib/NextImage";
import { HOME_PRODUCTS } from "./HomeProducts";
export default function HomeSale() {
    const saleProducts = HOME_PRODUCTS.filter((p) => p.isSale);
    return (<section className="py-10 sm:py-14 lg:py-16 bg-pinked text-white overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-10">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="inline-block font-body text-[10px] tracking-[0.3em] text-red-400 bg-red-600/20 border border-red-500/30 px-3 py-1.5 mb-3">
              LIMITED TIME
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light">
              Home Sale — Up to 60% Off
            </h2>
          </motion.div>
          <Link href="/home-decor" className="font-body text-xs tracking-[0.2em] text-white/55 hover:text-white transition-colors border-b border-white/20 hover:border-white pb-0.5 flex-none self-start sm:self-auto">
            SHOP ALL SALE →
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {saleProducts.map((product, i) => {
            const discount = product.originalPrice
                ? Math.round((1 - product.price / product.originalPrice) * 100)
                : 0;
            return (<motion.div key={product.id} className="group" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.08 }}>
                <Link href="/home-decor" className="block relative overflow-hidden bg-white/5 border border-white/10" style={{ aspectRatio: "1/1" }}>
                  <Image src={product.images[0]} alt={product.name} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover object-center transition-all duration-500 group-hover:scale-105"/>
                  <Image src={product.images[1]} alt={`${product.name} alt`} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover object-center transition-opacity duration-500 opacity-0 group-hover:opacity-100"/>
                  <div className="absolute top-2 left-2 z-10">
                    <span className="font-body text-[9px] tracking-[0.15em] bg-red-600 text-white px-2 py-0.5">SALE</span>
                  </div>
                  {discount > 0 && (<div className="absolute top-2 right-2 z-10">
                      <span className="font-body text-[9px] bg-white text-charcoal px-2 py-0.5 font-semibold">-{discount}%</span>
                    </div>)}
                </Link>
                <div className="mt-3">
                  <Link href="/home-decor">
                    <p className="font-body text-[11px] tracking-[0.12em] text-white/80 hover:text-white transition-colors line-clamp-2 leading-snug">
                      {product.name}
                    </p>
                  </Link>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="font-body text-sm font-semibold text-white">£{product.price}</span>
                    {product.originalPrice && (<span className="font-body text-sm text-white/40 line-through">£{product.originalPrice}</span>)}
                  </div>
                </div>
              </motion.div>);
        })}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-5 py-8 border-t border-white/10">
          <p className="font-display text-2xl sm:text-3xl font-light italic text-white/75 text-center">
            Big savings on beautiful pieces
          </p>
          <Link href="/home-decor" className="font-body text-[11px] tracking-[0.2em] px-8 py-3.5 bg-white text-charcoal hover:bg-bone transition-colors flex-none">
            SHOP HOME SALE
          </Link>
        </motion.div>
      </div>
    </section>);
}
