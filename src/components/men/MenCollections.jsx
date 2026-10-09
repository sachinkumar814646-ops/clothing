"use client";
import { motion } from "framer-motion";
import Link from "lib/Link";
import Image from "lib/NextImage";
const COLLECTIONS = [
    {
        id: "streetwear", tag: "THE EDIT", title: "STREETWEAR",
        desc: "Bold graphics, relaxed fits and statement pieces for the streets.",
        cta: "SHOP STREETWEAR", href: "/men",
        image: "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=900&q=85",
        position: "object-top",
    },
    {
        id: "smart", tag: "ELEVATED STYLE", title: "SMART CASUAL",
        desc: "Sharp tailoring meets relaxed confidence — perfect for any occasion.",
        cta: "SHOP SMART CASUAL", href: "/men",
        image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=900&q=85",
        position: "object-center",
    },
    {
        id: "gym", tag: "PERFORMANCE", title: "GYM ESSENTIALS",
        desc: "Train harder, look better. High-performance activewear for serious athletes.",
        cta: "SHOP ACTIVEWEAR", href: "/men",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900&q=85",
        position: "object-center",
    },
];
export default function MenCollections() {
    return (<section className="py-10 sm:py-14 bg-white">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="mb-8">
          <p className="font-body text-[10px] tracking-[0.3em] text-stone mb-1">CURATED FOR YOU</p>
          <h2 className="font-display text-3xl sm:text-4xl font-light">Trending Collections</h2>
        </div>
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {COLLECTIONS.slice(0, 2).map((col, i) => (<motion.div key={col.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.1 }}>
                <CollectionCard col={col} height="h-[320px] sm:h-[440px] lg:h-[520px]"/>
              </motion.div>))}
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <CollectionCard col={COLLECTIONS[2]} height="h-[260px] sm:h-[340px] lg:h-[400px]" wide/>
          </motion.div>
        </div>
      </div>
    </section>);
}
function CollectionCard({ col, height, wide }) {
    return (<Link href={col.href} className={`group relative flex overflow-hidden bg-bone block w-full ${height}`}>
      <Image src={col.image} alt={col.title} fill sizes={wide ? "100vw" : "(max-width: 640px) 100vw, 50vw"} className={`object-cover ${col.position} transition-transform duration-[1100ms] group-hover:scale-[1.04]`}/>
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent group-hover:from-black/80 transition-colors duration-500"/>
      <div className={`absolute inset-0 flex flex-col justify-end p-6 sm:p-8 lg:p-10 text-white ${wide ? "lg:flex-row lg:items-end lg:justify-between" : ""}`}>
        <div>
          <span className="font-body text-[10px] tracking-[0.35em] text-white/60 mb-2 block">{col.tag}</span>
          <h3 className="font-display font-light leading-none mb-2" style={{ fontSize: wide ? "clamp(2rem, 5vw, 4.5rem)" : "clamp(1.8rem, 4vw, 3.5rem)" }}>
            {col.title}
          </h3>
          <p className="font-body text-sm text-white/55 mb-5 max-w-xs hidden sm:block">{col.desc}</p>
        </div>
        <span className="font-body text-[11px] tracking-[0.22em] bg-white text-charcoal px-7 py-3 w-fit hover:bg-bone transition-colors font-semibold flex-none">
          {col.cta}
        </span>
      </div>
    </Link>);
}
