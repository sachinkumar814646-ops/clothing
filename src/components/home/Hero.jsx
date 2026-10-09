"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "lib/Link";
import Image from "lib/NextImageCategory";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HomeHero({ topSlider = [] }) {
  // ✅ Memoized slides mapping
  const slides = useMemo(() => {
    if (!topSlider?.length) return [];

    return topSlider
      .filter((item) => item.is_active)
      .map((item) => ({
        id: item.id,
        image: item.background_image_url,
        tag: "NEW",
        headline: item.button_name || "COLLECTION",
        sub: "LATEST ARRIVAL",
        desc: "",
        cta: item.button_name || "SHOP NOW",
        href: item.target_url || "#",
        ctaSecondary: "VIEW",
        hrefSecondary: item.target_url || "#",
        align: "center",
      }));
  }, [topSlider]);

  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // ✅ Auto slide
  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 5500);
    return () => clearInterval(t);
  }, [paused, next]);

  // ✅ Reset index if slides change
  useEffect(() => {
    setCurrent(0);
  }, [slides.length]);

  const slide = slides[current];

  if (!slide) return null;

  const contentAlign =
    slide.align === "left"
      ? "items-start text-left"
      : slide.align === "right"
        ? "items-end text-right"
        : "items-center text-center";

  const btnAlign =
    slide.align === "center"
      ? "justify-center"
      : slide.align === "right"
        ? "justify-end"
        : "";

  return (
    <section
      className="relative z-0 isolate w-full overflow-hidden bg-pinked 
             h-[190px] sm:h-[420px] md:h-[calc(100vh-120px)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9 }}
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt={slide.headline}
            className="w-full h-full object-contain object-center"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/75" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div
        className={`relative z-10 flex flex-col justify-end h-full 
    px-4 sm:px-8 md:px-12 lg:px-20 
    pb-8 sm:pb-14 md:pb-20 ${contentAlign}`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`c-${slide.id}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="max-w-full sm:max-w-xl md:max-w-2xl"
          >
            {/* Buttons */}
            {/* <div
          className={`flex flex-row flex-wrap gap-2 sm:gap-3 mt-5 sm:mt-8 ${btnAlign}`}
        >
          <Link
            href={slide.href}
            className="font-body text-[10px] sm:text-[11px]
            tracking-[0.18em] sm:tracking-[0.22em]
            px-5 sm:px-8 py-2.5 sm:py-3.5
            bg-white text-charcoal hover:bg-bone
            transition-colors text-center font-semibold"
          >
            {slide.cta}
          </Link>

          <Link
            href={slide.hrefSecondary}
            className="font-body text-[10px] sm:text-[11px]
            tracking-[0.18em] sm:tracking-[0.22em]
            px-5 sm:px-8 py-2.5 sm:py-3.5
            border border-white/60 text-white
            hover:bg-white/10 transition-colors text-center"
          >
            {slide.ctaSecondary}
          </Link>
        </div> */}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-2 sm:left-4 md:left-6
    top-1/2 -translate-y-1/2 z-20
    w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12
    bg-white/10 border border-white/20
    flex items-center justify-center
    text-white hover:bg-white/25"
      >
        <ChevronLeft size={18} strokeWidth={1.5} />
      </button>

      <button
        onClick={next}
        className="absolute right-2 sm:right-4 md:right-6
    top-1/2 -translate-y-1/2 z-20
    w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12
    bg-white/10 border border-white/20
    flex items-center justify-center
    text-white hover:bg-white/25"
      >
        <ChevronRight size={18} strokeWidth={1.5} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? "w-5 sm:w-6 h-1.5 bg-white"
                : "w-1.5 h-1.5 bg-white/35 hover:bg-white/65"
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      {!paused && (
        <div className="absolute bottom-0 left-0 right-0 z-20 h-0.5 bg-white/10">
          <motion.div
            key={`p-${current}`}
            className="h-full bg-white/50"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 5.5, ease: "linear" }}
          />
        </div>
      )}
    </section>
  );
}
