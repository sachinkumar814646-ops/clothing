"use client";
import { motion } from "framer-motion";
import Link from "lib/Link";
import Image from "lib/NextImage";
export default function MenPromoBanner() {
    return (<section className="relative z-0 isolate w-full overflow-hidden bg-pinked">
      <div className="relative h-[280px] sm:h-[340px] lg:h-[400px]">
        <Image src="https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=1800&q=85" alt="Menswear Sale" fill sizes="100vw" className="object-cover object-center opacity-40"/>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-4">
            <p className="font-body text-[11px] tracking-[0.4em] text-white/60 uppercase">Limited Time Only</p>
            <h2 className="font-display font-light text-white leading-none" style={{ fontSize: "clamp(2.8rem, 8vw, 6.5rem)" }}>
              UP TO 60% OFF
            </h2>
            <p className="font-body text-lg sm:text-2xl tracking-[0.25em] text-white/80 uppercase">Menswear</p>
            <div className="flex items-center justify-center gap-4 pt-2">
              <Link href="/men" className="font-body text-[11px] tracking-[0.22em] px-8 py-3.5 bg-white text-charcoal hover:bg-bone transition-colors font-semibold">
                SHOP THE SALE
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>);
}
