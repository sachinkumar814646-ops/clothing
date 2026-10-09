"use client";
import { motion } from "framer-motion";
import Link from "lib/Link";
import Image from "lib/NextImage";
const CATS = [
    { id: "furniture", label: "Furniture", sub: "Sofas, Chairs & Tables", href: "/home-decor", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=700&q=80" },
    { id: "lighting", label: "Lighting", sub: "Lamps & Pendants", href: "/home-decor", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=700&q=80" },
    { id: "wall", label: "Wall Decor", sub: "Art & Mirrors", href: "/home-decor", image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=700&q=80" },
    { id: "bedding", label: "Bedding", sub: "Sheets & Pillows", href: "/home-decor", image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=700&q=80" },
    { id: "rugs", label: "Rugs", sub: "All Sizes & Styles", href: "/home-decor", image: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=700&q=80" },
    { id: "kitchen", label: "Kitchen & Dining", sub: "Cookware & Tableware", href: "/home-decor", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&q=80" },
    { id: "storage", label: "Storage", sub: "Baskets & Shelving", href: "/home-decor", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80" },
    { id: "accessories", label: "Accessories", sub: "Candles & Vases", href: "/home-decor", image: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=700&q=80" },
];
export default function HomeCategoryGrid() {
    return (<section className="py-10 sm:py-14 lg:py-16 bg-white">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-end justify-between mb-7 sm:mb-9">
          <div>
            <p className="font-body text-[10px] tracking-[0.3em] text-stone mb-1">BROWSE</p>
            <h2 className="font-display text-3xl sm:text-4xl font-light">Shop by Room</h2>
          </div>
          <Link href="/home-decor" className="hidden sm:block font-body text-xs tracking-[0.2em] text-stone hover:text-charcoal transition-colors border-b border-stone/40 hover:border-charcoal pb-0.5">
            VIEW ALL →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          {/* Furniture — wide card, 2 cols × 2 rows */}
          <motion.div className="col-span-2 sm:col-span-2 sm:row-span-2" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <CatCard item={CATS[0]} height="h-[220px] sm:h-[424px]"/>
          </motion.div>

          {CATS.slice(1, 3).map((cat, i) => (<motion.div key={cat.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: (i + 1) * 0.07 }}>
              <CatCard item={cat} height="h-[160px] sm:h-[204px]"/>
            </motion.div>))}

          {CATS.slice(3, 5).map((cat, i) => (<motion.div key={cat.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: (i + 3) * 0.07 }}>
              <CatCard item={cat} height="h-[160px] sm:h-[212px]"/>
            </motion.div>))}

          {CATS.slice(5).map((cat, i) => (<motion.div key={cat.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: (i + 5) * 0.07 }}>
              <CatCard item={cat} height="h-[150px] sm:h-[180px]"/>
            </motion.div>))}
        </div>
      </div>
    </section>);
}
function CatCard({ item, height }) {
    return (<Link href={item.href} className={`group relative flex overflow-hidden bg-bone w-full ${height} block`}>
      <Image src={item.image} alt={item.label} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.07]"/>
      <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/12 to-transparent"/>
      <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5">
        <p className="font-body text-[9px] sm:text-[10px] tracking-[0.28em] text-white/65 mb-1">{item.sub}</p>
        <h3 className="font-body text-sm sm:text-base tracking-[0.15em] text-white font-semibold mb-2">{item.label}</h3>
        <span className="font-body text-[10px] tracking-[0.2em] text-white/80 border border-white/45 px-3 py-1.5 w-fit opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          SHOP NOW
        </span>
      </div>
    </Link>);
}
