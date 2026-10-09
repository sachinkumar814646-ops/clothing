"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
const FILTER_OPTIONS = {
    category: ["dresses", "tops", "jackets", "trousers", "skirts", "co-ords"],
    style: ["casual", "formal", "evening", "sporty", "boho"],
    size: ["XS", "S", "M", "L", "XL", "XXL"],
    colour: ["black", "white", "cream", "camel", "blush", "red", "sage", "denim", "grey"],
    bodyFit: ["slim", "regular", "oversized", "relaxed", "fitted"],
};
const SORT_OPTIONS = [
    { value: "relevance", label: "Relevance" },
    { value: "newest", label: "Newest First" },
    { value: "price-asc", label: "Price: Low → High" },
    { value: "price-desc", label: "Price: High → Low" },
];
export default function NewInFilterBar({ filters, onChange, total }) {
    const [openDropdown, setOpenDropdown] = useState(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target))
                setOpenDropdown(null);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);
    const setFilter = (key, value) => {
        onChange({ ...filters, [key]: filters[key] === value ? "" : value });
        setOpenDropdown(null);
    };
    const activeCount = [
        filters.category, filters.style,
        filters.size, filters.colour, filters.bodyFit,
    ].filter(Boolean).length + (filters.nextDay ? 1 : 0);
    const clearAll = () => onChange({
        category: "", style: "", size: "",
        colour: "", bodyFit: "", nextDay: false, sort: filters.sort,
    });
    return (<>
      {/* ── DESKTOP ── */}
      <div ref={ref} className="hidden md:block sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-11">

            {/* Next Day toggle */}
            <button onClick={() => onChange({ ...filters, nextDay: !filters.nextDay })} className={`flex items-center gap-2 pr-4 h-full font-body text-[12px] font-medium border-r border-gray-200 flex-none transition-colors ${filters.nextDay ? "text-charcoal" : "text-gray-500 hover:text-charcoal"}`}>
              <span className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-none transition-colors ${filters.nextDay ? "bg-pinked border-charcoal" : "border-gray-300"}`}>
                {filters.nextDay && (<svg width="8" height="7" viewBox="0 0 8 7" fill="none">
                    <path d="M1 3.5l2 2L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>)}
              </span>
              Next Day Delivery
            </button>

            <span className="font-body text-[11px] text-gray-400 px-3 border-r border-gray-200 h-full flex items-center flex-none">
              Filter:
            </span>

            {/* Filter dropdowns */}
            {["category", "style", "size", "colour", "bodyFit"].map((key) => (<div key={key} className="relative h-full flex items-center">
                <button onClick={() => setOpenDropdown(openDropdown === key ? null : key)} className={`flex items-center gap-1 px-3 h-full font-body text-[12px] font-medium capitalize transition-colors hover:text-charcoal ${filters[key] ? "text-charcoal" : "text-gray-500"}`}>
                  {key === "bodyFit" ? "Body Fit" : key[0].toUpperCase() + key.slice(1)}
                  {filters[key] && (<span className="bg-pinked text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                      1
                    </span>)}
                  <ChevronDown size={12} strokeWidth={2.5} className={`transition-transform duration-200 ${openDropdown === key ? "rotate-180" : ""}`}/>
                </button>

                {openDropdown === key && (<div className="absolute top-full left-0 mt-0 w-48 bg-white border border-gray-200 shadow-2xl z-50 py-1">
                    {FILTER_OPTIONS[key].map((opt) => (<button key={opt} onClick={() => setFilter(key, opt)} className={`flex items-center gap-2.5 w-full px-4 py-2 font-body text-[12px] text-left hover:bg-gray-50 capitalize transition-colors ${filters[key] === opt ? "text-charcoal font-semibold" : "text-gray-600"}`}>
                        <span className={`w-3.5 h-3.5 rounded-sm border-2 flex-none flex items-center justify-center ${filters[key] === opt ? "bg-pinked border-charcoal" : "border-gray-300"}`}>
                          {filters[key] === opt && (<svg width="8" height="7" viewBox="0 0 8 7" fill="none">
                              <path d="M1 3.5l2 2L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>)}
                        </span>
                        {opt}
                      </button>))}
                  </div>)}
              </div>))}

            {activeCount > 0 && (<button onClick={clearAll} className="flex items-center gap-1 px-2 h-full font-body text-[11px] text-gray-400 hover:text-charcoal transition-colors">
                <X size={11} strokeWidth={2}/> Clear ({activeCount})
              </button>)}

            <div className="flex-1"/>

            <button className="hidden xl:flex items-center gap-1.5 px-4 h-full font-body text-[12px] text-gray-500 hover:text-charcoal transition-colors border-l border-gray-200 flex-none">
              <SlidersHorizontal size={13} strokeWidth={1.5}/>
              Show more filters
            </button>

            {/* Sort dropdown */}
            <div className="relative border-l border-gray-200 h-full flex items-center flex-none">
              <button onClick={() => setOpenDropdown(openDropdown === "sort" ? null : "sort")} className="flex items-center gap-1.5 px-4 h-full font-body text-[12px] text-gray-600 hover:text-charcoal transition-colors">
                Sort:{" "}
                <span className="font-semibold">
                  {SORT_OPTIONS.find((s) => s.value === filters.sort)?.label}
                </span>
                <ChevronDown size={12} strokeWidth={2.5} className={`transition-transform duration-200 ${openDropdown === "sort" ? "rotate-180" : ""}`}/>
              </button>
              {openDropdown === "sort" && (<div className="absolute top-full right-0 mt-0 w-52 bg-white border border-gray-200 shadow-2xl z-50 py-1">
                  {SORT_OPTIONS.map((opt) => (<button key={opt.value} onClick={() => { onChange({ ...filters, sort: opt.value }); setOpenDropdown(null); }} className={`block w-full px-4 py-2.5 font-body text-[12px] text-left hover:bg-gray-50 transition-colors ${filters.sort === opt.value ? "text-charcoal font-semibold" : "text-gray-600"}`}>
                      {opt.label}
                    </button>))}
                </div>)}
            </div>

            <span className="font-body text-[11px] text-gray-400 px-4 border-l border-gray-200 flex-none h-full flex items-center">
              {total} items
            </span>
          </div>
        </div>
      </div>

      {/* ── MOBILE ── */}
      <div className="md:hidden sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center h-11 px-4 gap-3">
          <button onClick={() => setMobileOpen(true)} className="flex items-center gap-2 flex-1 font-body text-xs font-medium text-charcoal">
            <SlidersHorizontal size={14} strokeWidth={1.5}/>
            Filter &amp; Sort
            {activeCount > 0 && (<span className="bg-pinked text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                {activeCount}
              </span>)}
          </button>
          <span className="font-body text-[11px] text-gray-400">{total} items</span>
          <div className="relative">
            <button onClick={() => setOpenDropdown(openDropdown === "msort" ? null : "msort")} className="flex items-center gap-1 font-body text-xs text-gray-600 font-medium">
              Sort <ChevronDown size={12} strokeWidth={2}/>
            </button>
            {openDropdown === "msort" && (<div className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-200 shadow-2xl z-50 py-1">
                {SORT_OPTIONS.map((opt) => (<button key={opt.value} onClick={() => { onChange({ ...filters, sort: opt.value }); setOpenDropdown(null); }} className={`block w-full px-4 py-2.5 font-body text-[12px] text-left hover:bg-gray-50 ${filters.sort === opt.value ? "text-charcoal font-semibold" : "text-gray-600"}`}>
                    {opt.label}
                  </button>))}
              </div>)}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {mobileOpen && (<div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)}/>
          <div className="absolute right-0 top-0 bottom-0 w-[85vw] max-w-sm bg-white flex flex-col">
            <div className="flex items-center justify-between px-5 h-14 border-b border-gray-100 flex-none">
              <span className="font-body text-sm font-bold">Filter</span>
              <button onClick={() => setMobileOpen(false)} aria-label="Close">
                <X size={20} strokeWidth={1.5}/>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-7">
              <button onClick={() => onChange({ ...filters, nextDay: !filters.nextDay })} className="flex items-center gap-3 w-full">
                <span className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-none ${filters.nextDay ? "bg-pinked border-charcoal" : "border-gray-300"}`}>
                  {filters.nextDay && (<svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4l2.5 2.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>)}
                </span>
                <span className="font-body text-sm font-medium">Next Day Delivery</span>
              </button>

              {["category", "style", "size", "colour", "bodyFit"].map((key) => (<div key={key}>
                  <h3 className="font-body text-[11px] font-bold tracking-[0.15em] uppercase mb-3 text-charcoal">
                    {key === "bodyFit" ? "Body Fit" : key[0].toUpperCase() + key.slice(1)}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {FILTER_OPTIONS[key].map((opt) => (<button key={opt} onClick={() => setFilter(key, opt)} className={`font-body text-[11px] px-3 py-1.5 border rounded-full capitalize transition-colors ${filters[key] === opt
                        ? "bg-pinked text-white border-charcoal"
                        : "border-gray-200 text-gray-600 hover:border-charcoal"}`}>
                        {opt}
                      </button>))}
                  </div>
                </div>))}
            </div>
            <div className="px-5 py-4 border-t border-gray-100 flex gap-3 flex-none">
              <button onClick={clearAll} className="flex-1 font-body text-[11px] tracking-[0.15em] py-3 border border-charcoal text-charcoal hover:bg-gray-50 transition-colors">
                CLEAR ALL
              </button>
              <button onClick={() => setMobileOpen(false)} className="flex-1 font-body text-[11px] tracking-[0.15em] py-3 bg-pinked text-white hover:bg-pinked/80 transition-colors">
                VIEW {total} ITEMS
              </button>
            </div>
          </div>
        </div>)}
    </>);
}
