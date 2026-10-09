"use client";
import { motion } from "framer-motion";
import Link from "lib/Link";
import Image from "lib/NextImage";
const BANNERS = [
    {
        id: "summer", tag: "SS25 COLLECTION", title: "SUMMER DROP", sub: "Fresh Fits Await",
        desc: "Light fabrics, bold colours and easy silhouettes — the summer drop is here.",
        cta: "SHOP SUMMER", href: "/men",
        image: "https://static.vecteezy.com/system/resources/previews/032/455/875/large_2x/a-man-in-a-blue-polo-shirt-standing-on-a-pier-ai-generated-free-photo.jpg",
        textSide: "left",
    },
    {
        id: "denim", tag: "DENIM EDIT", title: "DENIM", sub: "COLLECTION",
        desc: "From slim to wide leg — the ultimate denim edit for every wardrobe.",
        cta: "SHOP DENIM", href: "/men",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=1200&q=85",
        textSide: "right",
    },
];
export default function MenEditorialBanners() {
    return (<section className="py-10 sm:py-14 bg-[#f8f8f8]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="mb-8">
          <p className="font-body text-[10px] tracking-[0.3em] text-stone mb-1">EDITORIAL</p>
          <h2 className="font-display text-3xl sm:text-4xl font-light">The Edit</h2>
        </div>
        <div className="space-y-3">
          {BANNERS.map((banner, i) => (<motion.div key={banner.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}>
              <Link href={banner.href} className="group relative flex overflow-hidden bg-bone h-[280px] sm:h-[360px] lg:h-[440px] block w-full">
                <Image src={banner.image} alt={banner.title} fill sizes="100vw" className="object-cover object-center transition-transform duration-[1100ms] group-hover:scale-[1.04]"/>
                <div className={`absolute inset-0 ${banner.textSide === "left" ? "bg-gradient-to-r from-black/70 via-black/30 to-transparent" : "bg-gradient-to-l from-black/70 via-black/30 to-transparent"} group-hover:from-black/75 transition-colors duration-500`}/>
                <div className={`absolute inset-0 flex flex-col justify-center px-8 sm:px-12 lg:px-16 text-white ${banner.textSide === "right" ? "items-end text-right" : "items-start"}`}>
                  <div className="max-w-md">
                    <span className="font-body text-[10px] tracking-[0.35em] text-white/60 mb-3 block">{banner.tag}</span>
                    <h3 className="font-display font-light leading-none mb-1" style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}>{banner.title}</h3>
                    <p className="font-body tracking-[0.22em] text-white/70 text-sm mb-3">{banner.sub}</p>
                    <p className="font-body text-sm text-white/50 mb-6 hidden sm:block">{banner.desc}</p>
                    <span className="font-body text-[11px] tracking-[0.22em] bg-white text-charcoal px-8 py-3 hover:bg-bone transition-colors font-semibold inline-block">
                      {banner.cta}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>))}
        </div>
      </div>
    </section>);
}
