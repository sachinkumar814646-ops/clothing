"use client";
import { useState, useRef, useMemo, useEffect } from "react";
import Image from "lib/NextImage";
import { ChevronLeft, ChevronRight, ZoomIn, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductGallery({ product, selectedColor }) {
  const [selected, setSelected] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [lightbox, setLightbox] = useState(false);
  const imgRef = useRef(null);

  const variants = product?.variants || [];

  /* ================= SELECT VARIANT ================= */
  const selectedVariant = useMemo(() => {
    return variants.find(v => v.color_name === selectedColor);
  }, [variants, selectedColor]);

  /* ================= IMAGES (MAIN FIX) ================= */
  const images = useMemo(() => {
    // ✅ 1. Variant images
    if (selectedVariant?.variant_images?.length > 0) {
      return selectedVariant.variant_images.map(img => img.path);
    }

    // ✅ 2. Variant fallback
    if (selectedVariant?.variant_default_image) {
      return [selectedVariant.variant_default_image];
    }

    // ✅ 3. Product fallback
    if (product?.images?.length > 0) {
      return product.images;
    }

    return [];
  }, [selectedVariant, product]);

  /* RESET IMAGE WHEN COLOR CHANGES */
  useEffect(() => {
    setSelected(0);
  }, [selectedColor]);

  const prev = () =>
    setSelected((s) => (s - 1 + images.length) % images.length);

  const next = () =>
    setSelected((s) => (s + 1) % images.length);

  const handleMouseMove = (e) => {
    if (!imgRef.current) return;

    const rect = imgRef.current.getBoundingClientRect();
    setZoomPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  if (images.length === 0) return null;

  return (
    <>
      <div className="flex flex-col-reverse sm:flex-row gap-3">

        {/* Thumbnails */}
        <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto scrollbar-hide sm:max-h-[700px] flex-none">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`relative flex-none w-14 h-20 sm:w-16 sm:h-[88px] overflow-hidden border-2 transition-all duration-150 ${
                selected === i
                  ? "border-charcoal"
                  : "border-transparent hover:border-gray-300"
              }`}
            >
              <Image
                src={img}
                alt={`${product.name} ${i + 1}`}
                fill
                sizes="64px"
                className="object-cover object-top"
              />
            </button>
          ))}
        </div>

        {/* Main image */}
        <div className="flex-1 relative">
          <div
            ref={imgRef}
            className="relative overflow-hidden bg-[#f5f5f5] cursor-zoom-in select-none"
            style={{ aspectRatio: "3/4" }}
            onMouseEnter={() => setZoomed(true)}
            onMouseLeave={() => setZoomed(false)}
            onMouseMove={handleMouseMove}
            onClick={() => setLightbox(true)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0"
              >
                <Image
                  src={images[selected]}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-top transition-transform duration-200"
                  style={
                    zoomed
                      ? {
                          transform: "scale(2)",
                          transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                        }
                      : {}
                  }
                />
              </motion.div>
            </AnimatePresence>

            {/* Zoom icon */}
            {!zoomed && (
              <div className="absolute bottom-3 right-3 z-10 bg-white/80 p-1.5 rounded-full">
                <ZoomIn size={16} />
              </div>
            )}

            {/* Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/80 flex items-center justify-center"
                >
                  <ChevronLeft size={16} />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/80 flex items-center justify-center"
                >
                  <ChevronRight size={16} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
            onClick={() => setLightbox(false)}
          >
            <button className="absolute top-4 right-4 text-white">
              <X size={28} />
            </button>

            <motion.div
              key={selected}
              className="relative w-full max-w-lg"
              style={{ aspectRatio: "3/4" }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[selected]}
                alt={product.name}
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}