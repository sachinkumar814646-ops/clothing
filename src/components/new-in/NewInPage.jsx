"use client";
import { useState, useMemo } from "react";
import Link from "lib/Link";
import NewInCategoryRow from "./NewInCategoryRow";
import NewInFilterBar from "./NewInFilterBar";
import NewInProductCard from "./NewInProductCard";
import { NEW_IN_PRODUCTS } from "./NewInData";
const DEFAULT_FILTERS = {
    category: "",
    style: "",
    size: "",
    colour: "",
    bodyFit: "",
    nextDay: false,
    sort: "relevance",
};
export default function NewInPage() {
    const [filters, setFilters] = useState(DEFAULT_FILTERS);
    const filtered = useMemo(() => {
        let list = [...NEW_IN_PRODUCTS];
        if (filters.category)
            list = list.filter((p) => p.category === filters.category);
        if (filters.size)
            list = list.filter((p) => p.sizes.includes(filters.size));
        if (filters.colour)
            list = list.filter((p) => p.colour === filters.colour);
        if (filters.nextDay)
            list = list.filter((p) => p.nextDay);
        if (filters.sort === "price-asc")
            list.sort((a, b) => a.price - b.price);
        if (filters.sort === "price-desc")
            list.sort((a, b) => b.price - a.price);
        if (filters.sort === "newest")
            list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        return list;
    }, [filters]);
    return (<div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <nav className="flex items-center gap-1.5 font-body text-[11px] text-gray-400">
          <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
          <span>/</span>
          <Link href="/new" className="hover:text-charcoal transition-colors">New In</Link>
          <span>/</span>
          <span className="text-charcoal">Womens New In</span>
        </nav>
      </div>

      {/* Title */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center">
        <h1 className="font-body text-2xl sm:text-3xl font-bold tracking-tight text-charcoal">
          Women&apos;s New In
        </h1>
        <p className="font-body text-sm text-gray-400 mt-1">{filtered.length} products</p>
      </div>

      {/* Category circles */}
      <NewInCategoryRow />

      {/* Filter bar */}
      <NewInFilterBar filters={filters} onChange={setFilters} total={filtered.length}/>

      {/* Product grid */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {filtered.length === 0 ? (<div className="text-center py-24">
            <p className="font-body text-xl text-gray-400 mb-4">No products found</p>
            <button onClick={() => setFilters(DEFAULT_FILTERS)} className="font-body text-xs tracking-[0.15em] px-6 py-3 bg-pinked text-white hover:bg-pinked/80 transition-colors">
              CLEAR FILTERS
            </button>
          </div>) : (<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-3 sm:gap-x-4 gap-y-6 sm:gap-y-8">
            {filtered.map((product, i) => (<NewInProductCard key={product.id} product={product} priority={i < 8}/>))}
          </div>)}
      </div>
    </div>);
}
