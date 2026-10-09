"use client";
import { useState, useEffect } from "react";
import Link from "lib/Link";
const MESSAGES = [
    { text: "🔥 UP TO 70% OFF — LIMITED TIME ONLY", href: "/sale" },
    { text: "FREE DELIVERY ON ORDERS OVER £30", href: "/new" },
    { text: "✨ NEW IN EVERY DAY — BE THE FIRST TO SHOP", href: "/new" },
    { text: "NEXT DAY DELIVERY AVAILABLE — ORDER BEFORE 10PM", href: "/new" },
];
export default function PromoStrip() {
    const [idx, setIdx] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setIdx((i) => (i + 1) % MESSAGES.length), 3500);
        return () => clearInterval(t);
    }, []);
    return (<div className="bg-pinked text-white overflow-hidden">
      <div className="max-w-full mx-auto h-10 flex items-center justify-center relative">
        {MESSAGES.map((msg, i) => (<Link key={i} href={msg.href} className={`absolute inset-0 flex items-center justify-center font-body text-[10px] sm:text-xs tracking-[0.25em] font-medium transition-all duration-500 hover:text-bone ${i === idx
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4 pointer-events-none"}`}>
            {msg.text}
          </Link>))}
      </div>
    </div>);
}
