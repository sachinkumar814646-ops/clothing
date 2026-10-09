"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import Link from "lib/Link";
import Image from "lib/NextImage";
import { products } from "lib/data";
export default function SearchModal({ isOpen, onClose }) {
    const [query, setQuery] = useState("");
    const inputRef = useRef(null);
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
        else {
            setQuery("");
        }
    }, [isOpen]);
    useEffect(() => {
        const onKey = (e) => { if (e.key === "Escape")
            onClose(); };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);
    const results = query.length > 1
        ? products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.category.toLowerCase().includes(query.toLowerCase()) ||
            p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))).slice(0, 6)
        : [];
    const suggestions = ["blazer", "silk dress", "cashmere", "leather bag", "accessories"];
    return (<AnimatePresence>
      {isOpen && (<>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={onClose}/>
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className="fixed top-0 left-0 right-0 z-50 bg-white shadow-xl">
            <div className="max-w-3xl mx-auto px-6 py-6">
              <div className="flex items-center gap-4 border-b border-bone pb-4">
                <Search size={18} strokeWidth={1.5} className="text-stone flex-none"/>
                <input ref={inputRef} type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for products..." className="flex-1 font-body text-lg focus:outline-none placeholder:text-stone/50"/>
                <button onClick={onClose} className="p-1 text-stone hover:text-charcoal">
                  <X size={18} strokeWidth={1.5}/>
                </button>
              </div>

              {/* Suggestions */}
              {query.length === 0 && (<div className="py-6">
                  <p className="font-body text-xs tracking-editorial text-stone mb-4">POPULAR SEARCHES</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((s) => (<button key={s} onClick={() => setQuery(s)} className="font-body text-xs px-4 py-2 border border-bone hover:border-charcoal transition-colors">
                        {s}
                      </button>))}
                  </div>
                </div>)}

              {/* Results */}
              {results.length > 0 && (<div className="py-4">
                  <p className="font-body text-xs tracking-editorial text-stone mb-4">
                    {results.length} RESULTS FOR "{query.toUpperCase()}"
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {results.map((product) => (<Link key={product.id} href={`/product/${product.id}`} onClick={onClose} className="flex items-center gap-3 p-2 hover:bg-cream transition-colors group">
                        <div className="relative w-12 h-16 bg-bone flex-none overflow-hidden">
                          <Image src={product.images[0]} alt={product.name} fill className="object-cover"/>
                        </div>
                        <div>
                          <p className="font-body text-xs tracking-editorial leading-tight group-hover:underline">
                            {product.name}
                          </p>
                          <p className="font-body text-sm mt-1">£{product.price}</p>
                        </div>
                      </Link>))}
                  </div>
                </div>)}

              {query.length > 1 && results.length === 0 && (<div className="py-8 text-center">
                  <p className="font-display text-2xl font-light italic text-stone mb-2">No results found</p>
                  <p className="font-body text-xs text-stone">Try a different search term</p>
                </div>)}
            </div>
          </motion.div>
        </>)}
    </AnimatePresence>);
}
