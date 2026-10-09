"use client";
import { useState, useEffect } from "react";
import Link from "lib/Link";
const MESSAGES = [
    { text: "🏠 UP TO 60% OFF HOME DECOR — LIMITED TIME", href: "/home-decor" },
    { text: "FREE DELIVERY ON ORDERS OVER £75 — Shop Now", href: "/home-decor" },
    { text: "✨ NEW HOME ARRIVALS EVERY WEEK", href: "/home-decor" },
    { text: "NEXT DAY DELIVERY AVAILABLE — ORDER BEFORE 8PM", href: "/home-decor" },
];
export default function HomePromoStrip() {
    const [idx, setIdx] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setIdx((i) => (i + 1) % MESSAGES.length), 3500);
        return () => clearInterval(t);
    }, []);
    return (<div className="w-full bg-[#2a2a2a] text-white overflow-hidden">
      <div className="relative h-9 flex items-center justify-center px-4">
        {MESSAGES.map((msg, i) => (<Link key={i} href={msg.href} className={`absolute inset-0 flex items-center justify-center font-body text-[11px] sm:text-xs tracking-[0.22em] font-medium transition-all duration-500 hover:text-bone ${i === idx ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"}`}>
            {msg.text}
          </Link>))}
      </div>
    </div>);
}
