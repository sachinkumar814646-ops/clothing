"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "lib/Link";
import Image from "lib/NextImageCategory";

const APP_URL = "https://coombb.com/backend";

export default function CategoryGrid({ topCategory = [] }) {
  // ✅ API categories convert
  const categories = topCategory.map((item) => ({
    id: item.id,
    label: item.title || "CATEGORY",
    sub: "Explore",
    href: item.target_url || "#",
    image: item.banner_image ? `${APP_URL}/storage/${item.banner_image}` : "",
  }));

  return (
    <section className="py-10 sm:py-14 lg:py-16 bg-white">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Heading */}
        <div className="flex items-center justify-between mb-7 sm:mb-9">
          <div>
            <p className="font-body text-[10px] tracking-[0.3em] text-stone-500 mb-1">
              BROWSE
            </p>

            <h2 className="font-display text-3xl sm:text-4xl font-light text-black">
              Shop by Category
            </h2>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          {/* First Big Card */}
          {categories[0] && (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="col-span-2 lg:col-span-2 row-span-1 lg:row-span-2"
            >
              <CategoryCard
                item={categories[0]}
                height="h-[240px] sm:h-[320px] lg:h-full lg:min-h-[560px]"
              />
            </motion.div>
          )}

          {/* Remaining Cards */}
          {categories.slice(1).map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: (i + 1) * 0.08,
              }}
            >
              <CategoryCard
                item={cat}
                height="h-[160px] sm:h-[220px] lg:h-[272px]"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========================================================= */

function CategoryCard({ item, height }) {
  return (
    <Link
      href={item.href}
      className={`group relative overflow-hidden bg-[#f7f7f7] w-full block ${height}`}
    >
      {/* Image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={item.image}
          alt={item.label}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.06]"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent z-10" />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-4 sm:p-5 lg:p-6">
        <p className="font-body text-[10px] tracking-[0.3em] text-white/70 mb-1">
          {item.sub}
        </p>

        <h3 className="font-body text-base sm:text-lg lg:text-xl tracking-[0.15em] text-white font-medium mb-2.5">
          {item.label}
        </h3>

        <span className="font-body text-[10px] tracking-[0.2em] text-white/80 border border-white/50 px-3 py-1.5 w-fit opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          SHOP NOW
        </span>
      </div>
    </Link>
  );
}
