"use client";

import { useState } from "react";
import Image from "lib/NextImage";
import Link from "lib/Link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import Swal from "sweetalert2";
import { useWishlist } from "lib/wishlist-context";

export default function ProductCard({ product, priority }) {
  const [hovered, setHovered] = useState(false);

  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product?.id);

  /* ================= SAFE IMAGE HANDLING ================= */
  const firstImage =
    product?.default_image || product?.images?.[0] || "/placeholder.png";

  const secondImage = product?.images?.[1] || null;

  /* ================= VARIANTS ================= */
  const defaultVariant = product?.variants?.[0] || null;

  /* ================= COLORS ================= */
  const colors = [
    ...new Map(
      (product?.variants || []).map((v) => [
        v?.color?.name,
        {
          name: v?.color?.name,
          hex: v?.color?.hexa_code,
        },
      ]),
    ).values(),
  ];

  /* ================= WISHLIST HANDLER ================= */
  const handleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!defaultVariant) {
      Swal.fire({
        icon: "error",
        title: "Variant Not Available",
        text: "This product is currently unavailable.",
      });
      return;
    }

    try {
      await toggleWishlist({
        id: product.id,
        selectedColor: defaultVariant.color_id,
        selectedSize: defaultVariant.size_id,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div
      className="group relative flex flex-col cursor-pointer rounded-md bg-white overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ================= IMAGE ================= */}
      <Link
        href={`/product/${product?.slug}`}
        className="block relative overflow-hidden w-full"
        style={{ aspectRatio: "3/4" }}
      >
        {/* Primary Image */}
        <Image
          src={firstImage}
          alt={product?.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={`object-contain object-center transition-opacity duration-500 ${
            hovered && secondImage ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Hover Image */}
        {secondImage && (
          <Image
            src={secondImage}
            alt={`${product?.name} — view 2`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-contain object-center transition-opacity duration-500 ${
              hovered ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {/* ================= BADGES ================= */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {product?.isNew && (
            <span className="text-[9px] bg-black text-white px-2 py-0.5">
              NEW
            </span>
          )}
          {product?.isSale && (
            <span className="text-[9px] bg-red-600 text-white px-2 py-0.5">
              SALE
            </span>
          )}
        </div>

        {/* ================= WISHLIST ================= */}
        <button
          onClick={handleWishlist}
          className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:bg-white z-10"
        >
          <Heart
            size={14}
            strokeWidth={2}
            className={`transition ${
              wishlisted ? "fill-black text-black" : "text-black"
            }`}
          />
        </button>

        {/* ================= QUICK VIEW ================= */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-0 left-0 right-0 bg-white/95 py-2 text-center"
            >
              <span className="text-[10px] text-black">QUICK VIEW</span>
            </motion.div>
          )}
        </AnimatePresence>
      </Link>

      {/* ================= PRODUCT INFO ================= */}
      <div className="flex-1 flex flex-col p-2 bg-white">
        <Link href={`/product/${product?.slug}`}>
          <h3 className="text-xs text-black line-clamp-2 capitalize min-h-[32px]">
            {product?.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm font-medium text-black">
            £{product?.selling_price}
          </span>

          {product?.cost_price && (
            <span className="text-sm line-through text-gray-400">
              £{product?.cost_price}
            </span>
          )}
        </div>

        {/* ================= COLORS ================= */}
        <div className="flex items-center gap-1.5 mt-2">
          {colors.slice(0, 4).map((color) => (
            <div
              key={color.name}
              className="w-3 h-3 rounded-full border"
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}

          {colors.length > 4 && (
            <span className="text-[10px] text-gray-400">
              +{colors.length - 4}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
