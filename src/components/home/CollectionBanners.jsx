"use client";
import { motion } from "framer-motion";
import Link from "lib/Link";
import Image from "lib/NextImage";
const BANNERS = [
    {
        id: "summer",
        tag: "SS 2025",
        title: "SUMMER",
        sub: "COLLECTION",
        desc: "Light fabrics, bold silhouettes, effortless days.",
        cta: "SHOP WOMEN",
        href: "/women",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=80",
    },
    {
        id: "streetwear",
        tag: "FRESH DROP",
        title: "STREETWEAR",
        sub: "EDIT",
        desc: "Bold cuts, relaxed fits, zero compromise.",
        cta: "SHOP MEN",
        href: "/men",
        image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=1200&q=80",
    },
];
export default function CollectionBanners() {
    return (<section className="relative z-0 isolate py-10 sm:py-14 lg:py-16 bg-white">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
          {BANNERS.map((banner, i) => (<motion.div key={banner.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.12 }}>
              <Link href={banner.href} className="group relative flex overflow-hidden bg-bone h-[340px] sm:h-[420px] lg:h-[500px] block">
                <Image src={banner.image} alt={banner.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-center transition-transform duration-[1200ms] group-hover:scale-[1.05]"/>
                <div className="absolute inset-0 bg-black/35 group-hover:bg-black/45 transition-colors duration-500"/>

                <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 lg:p-10 text-white">
                  <span className="font-body text-[10px] tracking-[0.35em] text-white/70 mb-3">
                    {banner.tag}
                  </span>
                  <h3 className="font-display font-light leading-none mb-1" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
                    {banner.title}
                  </h3>
                  <p className="font-body tracking-[0.25em] text-white/80 text-sm mb-3">
                    {banner.sub}
                  </p>
                  <p className="font-body text-sm text-white/60 mb-6 max-w-xs hidden sm:block">
                    {banner.desc}
                  </p>
                  <span className="font-body text-[11px] tracking-[0.25em] bg-white text-charcoal px-7 py-3 w-fit hover:bg-bone transition-colors">
                    {banner.cta}
                  </span>
                </div>
              </Link>
            </motion.div>))}
        </div>
      </div>
    </section>);
}
