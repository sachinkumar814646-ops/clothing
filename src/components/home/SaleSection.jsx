"use client";
import { motion } from "framer-motion";
import Link from "lib/Link";
import Image from "lib/NextImage";
import { products } from "lib/data";
import ProductCard from "../product/ProductCard";

export default function SaleSection({ topProducts }) {
  // fallback to sale products if topProducts is not provided
  const saleProducts = topProducts?.length
    ? topProducts
    : products.filter((p) => p.isSale).slice(0, 4);

  return (
    <section className="py-10 sm:py-14 lg:py-16 bg-black text-white overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold">
              Sale
            </h2>
          </motion.div>
          <Link
            href="/products/sale"
            className="font-body text-xs tracking-[0.2em] text-white/60 hover:text-white transition-colors border-b border-white/20 hover:border-white pb-0.5 flex-none self-start sm:self-auto"
          >
            SHOP ALL SALE →
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {saleProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="group"
            >
              <ProductCard product={product} priority={i < 4} />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 py-8"
        >
          <p className="font-display text-2xl sm:text-3xl font-light italic text-white/80 text-center">
            Don&apos;t miss out — sale ends soon
          </p>
          <Link
            href="/products/sale"
            className="font-body text-[11px] tracking-[0.2em] px-8 py-3.5 bg-white text-charcoal hover:bg-bone transition-colors flex-none"
          >
            SHOP SALE NOW
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
