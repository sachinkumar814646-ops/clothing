"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const COLORS = [
    { name: "Black", hex: "#1A1A1A" },
    { name: "White", hex: "#FFFFFF" },
    { name: "Cream", hex: "#F5F0E8" },
    { name: "Camel", hex: "#C19A6B" },
    { name: "Navy", hex: "#1B2A4A" },
    { name: "Charcoal", hex: "#2D2D2D" },
];
function Section({ title, children }) {
    const [open, setOpen] = useState(true);
    return (<div className="border-b border-bone pb-5 mb-5 last:border-0 last:mb-0">
      <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full group">
        <span className="font-body text-xs tracking-editorial text-charcoal group-hover:text-stone transition-colors">
          {title}
        </span>
        <ChevronDown size={13} strokeWidth={1.5} className={`text-stone transition-transform duration-200 ${open ? "rotate-180" : ""}`}/>
      </button>
      <AnimatePresence initial={false}>
        {open && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <div className="pt-4">{children}</div>
          </motion.div>)}
      </AnimatePresence>
    </div>);
}
export default function ProductFilters({ filters, onChange }) {
    const toggleSize = (size) => {
        const sizes = filters.sizes.includes(size)
            ? filters.sizes.filter((s) => s !== size)
            : [...filters.sizes, size];
        onChange({ ...filters, sizes });
    };
    const toggleColor = (color) => {
        const colors = filters.colors.includes(color)
            ? filters.colors.filter((c) => c !== color)
            : [...filters.colors, color];
        onChange({ ...filters, colors });
    };
    const hasActive = filters.sizes.length > 0 || filters.colors.length > 0 || filters.maxPrice < 1000;
    return (<div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-body text-xs tracking-editorial text-charcoal">FILTER</h2>
        {hasActive && (<button onClick={() => onChange({ sizes: [], colors: [], minPrice: 0, maxPrice: 1000 })} className="font-body text-[10px] text-stone hover:text-charcoal transition-colors underline">
            CLEAR ALL
          </button>)}
      </div>

      <Section title="SIZE">
        <div className="grid grid-cols-3 gap-1.5">
          {SIZES.map((size) => (<button key={size} onClick={() => toggleSize(size)} className={`py-2 font-body text-xs tracking-editorial border transition-all duration-150 ${filters.sizes.includes(size)
                ? "border-charcoal bg-pinked text-white"
                : "border-bone text-charcoal hover:border-charcoal"}`}>
              {size}
            </button>))}
        </div>
      </Section>

      <Section title="COLOUR">
        <div className="flex flex-wrap gap-2">
          {COLORS.map((color) => (<button key={color.name} onClick={() => toggleColor(color.name)} title={color.name} className={`w-7 h-7 rounded-full transition-all duration-150 ${filters.colors.includes(color.name)
                ? "ring-2 ring-charcoal ring-offset-2 scale-110"
                : "ring-1 ring-charcoal/20 hover:ring-charcoal/50"}`} style={{ backgroundColor: color.hex }}/>))}
        </div>
      </Section>

      <Section title="PRICE">
        <div className="space-y-3">
          <div className="flex items-center justify-between font-body text-xs text-stone">
            <span>£0</span>
            <span className="text-charcoal font-medium">up to £{filters.maxPrice >= 500 ? "500+" : filters.maxPrice}</span>
          </div>
          <input type="range" min={0} max={500} step={10} value={Math.min(filters.maxPrice, 500)} onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })} className="w-full h-0.5 accent-charcoal cursor-pointer"/>
          <div className="flex justify-between font-body text-[10px] text-stone/60">
            <span>£0</span><span>£300+</span>
          </div>
        </div>
      </Section>
    </div>);
}
