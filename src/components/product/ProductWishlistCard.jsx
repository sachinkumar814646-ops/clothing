"use client";

import { useState } from "react";
import Image from "lib/NextImage";
import Link from "lib/Link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { useWishlist } from "lib/wishlist-context";
import { useCart } from "lib/cart-context"; // ✅ ADD THIS
import Swal from "sweetalert2";

export default function ProductWishlistCard({ product, priority }) {
  const [hovered, setHovered] = useState(false);

  const {
    toggleWishlist,
    isWishlisted,
    removeWishlistItem,
    wishlist,
  } = useWishlist();

  const { addItem } = useCart(); // ✅ USE CONTEXT

  const wishlisted = isWishlisted(product?.id);
  const firstImage = product?.image || "/placeholder.png";

  const wishlistItem = wishlist.find(
    (i) => i.product_id === product?.id
  );

  // ✅ FIXED ADD TO BAG
  const handleAddToBag = async () => {
    if (!product?.size?.id || !product?.color?.id) {
      Swal.fire({
        icon: "warning",
        title: "Missing Data",
        text: "Size or Color missing",
      });
      return;
    }

    await addItem({
      product,
      selectedColor: product.color.id,
      selectedSize: product.size.id,
      quantity: 1,
    });
  };

  return (
    <div
      className="group relative flex flex-col cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link
        href={`/product/${product?.slug}`}
        className="block relative overflow-hidden bg-bone w-full"
        style={{ aspectRatio: "3/4" }}
      >
        <Image
          src={firstImage}
          alt={product?.title}
          fill
          priority={priority}
          className="object-cover"
        />

        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className="absolute top-2 right-2 w-8 h-8 bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
        >
          <Heart
            size={14}
            className={`${
              wishlisted ? "fill-charcoal text-charcoal" : "text-charcoal"
            }`}
          />
        </button>

        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="absolute bottom-0 left-0 right-0 bg-white/95 py-2 text-center"
            >
              <span className="text-[10px]">QUICK VIEW</span>
            </motion.div>
          )}
        </AnimatePresence>
      </Link>

      <div className="mt-3 flex flex-col">
        <h3 className="text-xs">{product?.title}</h3>

        <span>£{product?.selling_price}</span>

        {/* ✅ ADD TO BAG (FIXED) */}
        <button
          onClick={handleAddToBag}
          className="mt-3 w-full bg-pinked text-white text-xs py-2"
        >
          ADD TO BAG
        </button>

        {/* REMOVE */}
        {wishlistItem && (
          <button
            onClick={() => removeWishlistItem(wishlistItem.id)}
            className="mt-2 w-full bg-red-500 text-white text-xs py-2"
          >
            Remove from Wishlist
          </button>
        )}
      </div>
    </div>
  );
}