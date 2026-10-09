"use client";
import { useState } from "react";
import Image from "lib/NextImage";
import { CATEGORY_CIRCLES } from "./NewInData";
export default function NewInCategoryRow({ onSelect, activeId }) {
    const [active, setActive] = useState(activeId ?? "all");
    const handleClick = (id) => {
        setActive(id);
        onSelect?.(id);
    };
    return (<div className="border-b border-gray-100 bg-white">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
        {/* Scrollable on mobile, centred on desktop */}
        <div className="flex gap-5 sm:gap-8 overflow-x-auto scrollbar-hide justify-start lg:justify-center">
          {CATEGORY_CIRCLES.map((cat) => (<button key={cat.id} onClick={() => handleClick(cat.id)} className="flex flex-col items-center gap-2.5 flex-none group">
              {/* Circle */}
              <div className={`relative w-[68px] h-[68px] sm:w-[80px] sm:h-[80px] rounded-full overflow-hidden transition-all duration-200 ${active === cat.id
                ? "ring-2 ring-offset-2 ring-charcoal"
                : "ring-1 ring-gray-200 group-hover:ring-gray-400"}`}>
                <Image src={cat.image} alt={cat.label} fill sizes="80px" className="object-cover object-top transition-transform duration-300 group-hover:scale-110"/>
              </div>

              {/* Label */}
              <span className={`font-body text-[10px] sm:text-[11px] text-center leading-tight w-[76px] sm:w-[88px] transition-colors ${active === cat.id
                ? "text-charcoal font-bold"
                : "text-gray-500 group-hover:text-charcoal"}`}>
                {cat.label}
              </span>
            </button>))}
        </div>
      </div>
    </div>);
}
