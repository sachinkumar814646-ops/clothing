"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "lib/Link";
import Image from "lib/NextImage";
import { ChevronLeft, ChevronRight } from "lucide-react";
const SLIDES = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1800&q=90",
        tag: "NEW COLLECTION",
        headline: "HOME",
        sub: "COLLECTION 2025",
        desc: "Elevate every room with pieces that speak your language.",
        cta: "SHOP HOME",
        href: "/home-decor",
        ctaSecondary: "VIEW LOOKBOOK",
        hrefSecondary: "/home-decor",
        align: "left",
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1800&q=90",
        tag: "TRENDING NOW",
        headline: "MINIMAL",
        sub: "LIVING",
        desc: "Clean lines. Calm spaces. Timeless design.",
        cta: "SHOP FURNITURE",
        href: "/home-decor",
        ctaSecondary: "NEW ARRIVALS",
        hrefSecondary: "/home-decor",
        align: "center",
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1800&q=90",
        tag: "BEDROOM EDIT",
        headline: "COZY",
        sub: "BEDROOM",
        desc: "Transform your bedroom into a sanctuary.",
        cta: "SHOP BEDDING",
        href: "/home-decor",
        ctaSecondary: "EXPLORE MORE",
        hrefSecondary: "/home-decor",
        align: "right",
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1800&q=90",
        tag: "UP TO 60% OFF",
        headline: "SALE",
        sub: "ENDS SOON",
        desc: "Big savings on furniture, lighting & more.",
        cta: "SHOP SALE",
        href: "/home-decor",
        ctaSecondary: "ALL DECOR",
        hrefSecondary: "/home-decor",
        align: "center",
    },
];
export default function HomeHero() {
    const [current, setCurrent] = useState(0);
    const [paused, setPaused] = useState(false);
    const next = useCallback(() => setCurrent((c) => (c + 1) % SLIDES.length), []);
    const prev = useCallback(() => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length), []);
    useEffect(() => {
        if (paused)
            return;
        const t = setInterval(next, 5500);
        return () => clearInterval(t);
    }, [paused, next]);
    const slide = SLIDES[current];
    const contentAlign = slide.align === "left"
        ? "items-start text-left"
        : slide.align === "right"
            ? "items-end text-right"
            : "items-center text-center";
    const btnAlign = slide.align === "left"
        ? ""
        : slide.align === "right"
            ? "justify-end"
            : "justify-center";
    return (<section className="relative w-full overflow-hidden bg-pinked" style={{ height: "calc(100vh - 120px)", minHeight: 520 }} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <AnimatePresence mode="wait">
        <motion.div key={slide.id} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }} className="absolute inset-0">
          <Image src={slide.image} alt={slide.headline} fill priority sizes="100vw" className="object-cover object-center"/>
          <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/25 to-black/70"/>
        </motion.div>
      </AnimatePresence>

      <div className={`relative z-10 flex flex-col justify-end h-full px-6 sm:px-12 lg:px-20 pb-14 sm:pb-20 ${contentAlign}`}>
        <AnimatePresence mode="wait">
          <motion.div key={`c-${slide.id}`} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }} className="max-w-2xl">
            <span className="inline-block font-body text-[10px] tracking-[0.35em] text-white/75 bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1.5 mb-5">
              {slide.tag}
            </span>
            <h1 className="font-display font-light text-white leading-none mb-2" style={{ fontSize: "clamp(3.5rem, 9vw, 7.5rem)" }}>
              {slide.headline}
            </h1>
            <p className="font-body text-white/75 tracking-[0.22em] text-sm sm:text-base mb-3">
              {slide.sub}
            </p>
            <p className="font-body text-white/55 text-sm mb-7 hidden sm:block max-w-sm">
              {slide.desc}
            </p>
            <div className={`flex flex-col xs:flex-row gap-3 ${btnAlign}`}>
              <Link href={slide.href} className="font-body text-[11px] tracking-[0.22em] px-8 py-3.5 bg-white text-charcoal hover:bg-bone transition-colors duration-300 text-center">
                {slide.cta}
              </Link>
              <Link href={slide.hrefSecondary} className="font-body text-[11px] tracking-[0.22em] px-8 py-3.5 border border-white/65 text-white hover:bg-white/10 transition-colors duration-300 text-center">
                {slide.ctaSecondary}
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <button onClick={prev} aria-label="Previous" className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-colors">
        <ChevronLeft size={20} strokeWidth={1.5}/>
      </button>
      <button onClick={next} aria-label="Next" className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-colors">
        <ChevronRight size={20} strokeWidth={1.5}/>
      </button>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {SLIDES.map((_, i) => (<button key={i} onClick={() => setCurrent(i)} aria-label={`Slide ${i + 1}`} className={`transition-all duration-300 rounded-full ${i === current ? "w-6 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/35 hover:bg-white/65"}`}/>))}
      </div>

      {!paused && (<div className="absolute bottom-0 left-0 right-0 z-20 h-0.5 bg-white/10">
          <motion.div key={`p-${current}`} className="h-full bg-white/55" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 5.5, ease: "linear" }}/>
        </div>)}
    </section>);
}
