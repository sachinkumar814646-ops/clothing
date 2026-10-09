"use client";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import ProductCard from "./ProductCard";
import ProductFilters, { FilterState } from "./ProductFilters";
export default function ProductGrid({ products, title }) {
  const [filters, setFilters] = useState({
    sizes: [],
    colors: [],
    minPrice: 0,
    maxPrice: 1000,
  });
  const [sort, setSort] = useState("newest");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const filtered = useMemo(() => {
    let list = [...products];

    // SIZE
    if (filters.sizes.length > 0) {
      list = list.filter((p) =>
        p.variants.some((v) => filters.sizes.includes(v.size.name)),
      );
    }

    // COLOR
    if (filters.colors.length > 0) {
      list = list.filter((p) =>
        p.variants.some((v) => filters.colors.includes(v.color.name)),
      );
    }

    // PRICE FILTER
    list = list.filter((p) => {
      const price = Number(p.selling_price || p.cost_price);
      return price >= filters.minPrice && price <= filters.maxPrice;
    });

    // SORT
    if (sort === "newest") {
      list.sort((a, b) => b.id - a.id);
    }

    if (sort === "price-asc") {
      list.sort(
        (a, b) =>
          Number(a.selling_price || a.cost_price) -
          Number(b.selling_price || b.cost_price),
      );
    }

    if (sort === "price-desc") {
      list.sort(
        (a, b) =>
          Number(b.selling_price || b.cost_price) -
          Number(a.selling_price || a.cost_price),
      );
    }

    return list;
  }, [products, filters, sort]);
  const sortLabels = {
    newest: "NEWEST",
    "price-asc": "PRICE: LOW — HIGH",
    "price-desc": "PRICE: HIGH — LOW",
  };
  const getCategoryTitle = (title = "") => {
    const titleMap = {
      sale: "Sale Products",
      new: "New Arrival",
      featured: "Trending Now",
      top_selling: "Sales",
    };

    if (titleMap[title]) {
      return titleMap[title];
    }

    return title.replace(/-\d+$/, "").replace(/[_-]/g, " ");
  };
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-10">
      {/* Header */}
      <div className="mb-6 sm:mb-8 flex flex-col xs:flex-row xs:items-end xs:justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl capitalize font-light text-charcoal">
            {getCategoryTitle(title)}
          </h1>
          <p className="font-body text-xs text-stone mt-1.5">
            {filtered.length} ITEMS
          </p>
        </div>
        <div className="flex items-center gap-3 flex-none">
          <button
            onClick={() => setFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2 font-body text-xs tracking-editorial border border-charcoal/30 px-4 py-2 hover:border-charcoal transition-colors"
          >
            <SlidersHorizontal size={13} /> FILTER
          </button>

          {/* Custom sort dropdown */}
          <div className="relative">
            <button
              onClick={() => setSortOpen((v) => !v)}
              className="flex items-center gap-2 font-body text-xs tracking-editorial border border-charcoal/30 px-4 py-2 hover:border-charcoal transition-colors bg-white min-w-[160px] justify-between"
            >
              {sortLabels[sort]}
              <ChevronDown
                size={12}
                className={`transition-transform flex-none ${sortOpen ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {sortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-1 bg-white border border-bone shadow-lg z-20 w-full min-w-[200px]"
                >
                  {Object.keys(sortLabels).map((key) => (
                    <button
                      key={key}
                      onClick={() => {
                        setSort(key);
                        setSortOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-3 font-body text-xs tracking-editorial hover:bg-cream transition-colors ${sort === key ? "text-charcoal" : "text-stone"}`}
                    >
                      {sortLabels[key]}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="flex gap-8 lg:gap-10 items-start">
        {/* Mobile filter drawer */}
        <AnimatePresence>
          {filtersOpen && (
            <React.Fragment>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                onClick={() => setFiltersOpen(false)}
              />
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="fixed left-0 top-0 bottom-0 z-50 w-80 bg-white overflow-y-auto p-6 lg:hidden shadow-xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-body text-xs tracking-editorial">
                    FILTER
                  </h2>
                  <button
                    onClick={() => setFiltersOpen(false)}
                    className="p-1 text-stone hover:text-charcoal transition-colors"
                  >
                    <X size={20} strokeWidth={1.5} />
                  </button>
                </div>
                <ProductFilters filters={filters} onChange={setFilters} />
                <button
                  onClick={() => setFiltersOpen(false)}
                  className="mt-6 w-full font-body text-xs tracking-editorial py-3 bg-pinked text-white hover:bg-pinked/80 transition-colors"
                >
                  APPLY FILTERS
                </button>
              </motion.aside>
            </React.Fragment>
          )}
        </AnimatePresence>

        {/* Product grid */}
        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-display text-3xl font-light italic text-stone mb-3">
                No items found
              </p>
              <p className="font-body text-xs text-stone mb-6">
                Try adjusting your filters
              </p>
              <button
                onClick={() =>
                  setFilters({
                    sizes: [],
                    colors: [],
                    minPrice: 0,
                    maxPrice: 1000,
                  })
                }
                className="font-body text-xs tracking-editorial px-6 py-3 border border-charcoal hover:bg-pinked hover:text-white transition-colors"
              >
                CLEAR FILTERS
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 sm:gap-x-4 gap-y-8 sm:gap-y-10">
              {filtered.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.04, 0.32) }}
                >
                  <ProductCard product={product} priority={i < 4} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
