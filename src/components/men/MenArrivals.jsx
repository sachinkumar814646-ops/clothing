"use client";
import { motion } from "framer-motion";
import Link from "lib/Link";
import { MEN_NEW_PRODUCTS, MenProductCard } from "./MenProducts";
export default function MenArrivals() {
    return (<section className="py-10 sm:py-14 bg-white">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-end justify-between mb-7 sm:mb-9">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <p className="font-body text-[10px] tracking-[0.3em] text-stone mb-1">JUST DROPPED</p>
            <h2 className="font-display text-3xl sm:text-4xl font-light">New Arrivals</h2>
          </motion.div>
          <Link href="/men" className="hidden sm:block font-body text-xs tracking-[0.2em] text-stone hover:text-charcoal transition-colors border-b border-stone/40 pb-0.5">
            VIEW ALL →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-3 sm:gap-x-4 gap-y-6 sm:gap-y-8">
          {MEN_NEW_PRODUCTS.map((product, i) => (<motion.div key={product.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: Math.min(i * 0.06, 0.3) }}>
              <MenProductCard product={product} priority={i < 4}/>
            </motion.div>))}
        </div>
        <div className="mt-8 sm:hidden">
          <Link href="/men" className="block w-full text-center font-body text-xs tracking-[0.2em] py-3.5 border border-charcoal hover:bg-pinked hover:text-white transition-colors">
            VIEW ALL NEW ARRIVALS
          </Link>
        </div>
      </div>
    </section>);
}
