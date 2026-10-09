"use client";

import { useState, useMemo, useEffect } from "react";
import { Heart, Share2, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import ProductSizeSelector from "./ProductSizeSelector";
import ProductAccordion from "./ProductAccordion";
import { useWishlist } from "lib/wishlist-context"; // ✅ IMPORTANT
import { useCart } from "lib/cart-context"; // ✅ IMPORTANT
import Swal from "sweetalert2";

export default function ProductInfo({
  product,
  selectedColor,
  setSelectedColor,
}) {
  const { addItem } = useCart(); // ✅ USE CONTEXT
  const { toggleWishlist, isWishlisted } = useWishlist();

  const variants = product?.variants || [];

  const colors = useMemo(() => {
    return [
      ...new Map(
        variants.map((v) => [
          v.color_name,
          {
            name: v.color_name,
            hex: v.color_code,
            hex2: v.color_code_2,
          },
        ]),
      ).values(),
    ];
  }, [variants]);

  const sizes = useMemo(() => {
    const colorVariant = variants.find((v) => v.color_name === selectedColor);

    if (!colorVariant?.skus) return [];

    return colorVariant.skus.map((sku) => sku.size_name);
  }, [variants, selectedColor]);

  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!selectedColor && colors.length > 0) {
      setSelectedColor(colors[0].name);
    }
  }, [colors, selectedColor]);

  const selectedVariant = useMemo(() => {
    const colorVariant = variants.find((v) => v.color_name === selectedColor);

    if (!colorVariant || !selectedSize) {
      return null;
    }

    const skuData = colorVariant.skus?.find(
      (sku) => sku.size_name === selectedSize,
    );

    if (!skuData) {
      return null;
    }

    return {
      color_id: colorVariant.color_id,
      color_name: colorVariant.color_name,

      size_id: skuData.product_size_id,
      size_name: skuData.size_name,

      sku: skuData.sku,
      stock: skuData.stock,
    };
  }, [variants, selectedColor, selectedSize]);

  const price = Number(product?.price || 0);
  const originalPrice = Number(product?.originalPrice || 0);

  const discount = originalPrice
    ? Math.round((1 - price / originalPrice) * 100)
    : 0;

  /* ================= ADD TO CART (FIXED) ================= */
  const handleAddToBag = async () => {
    if (!selectedSize) {
      Swal.fire({
        icon: "warning",
        title: "Size Required",
        text: "Please select a size before adding to bag.",
      });

      setSizeError(true);
      setTimeout(() => setSizeError(false), 2500);
      return;
    }

    if (!selectedVariant) {
      Swal.fire({
        icon: "error",
        title: "Variant Not Available",
        text: "This variant is not available.",
      });
      return;
    }

    // ✅ USE CONTEXT INSTEAD OF DIRECT API
    await addItem({
      product,
      quantity,
      selectedColor: selectedVariant.color_id,
      selectedSize: selectedVariant.size_id,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  /* ================= WISHLIST ================= */
  const handleWishlist = async () => {
    if (!selectedSize) {
      Swal.fire({
        icon: "warning",
        title: "Size Required",
        text: "Please select a size before adding to wishlist.",
      });
      return;
    }

    if (!selectedVariant) {
      Swal.fire({
        icon: "error",
        title: "Variant Not Available",
        text: "This variant is not available.",
      });
      return;
    }

    await toggleWishlist({
      id: product.id, // ✅ important
      selectedColor: selectedVariant.color_id,
      selectedSize: selectedVariant.size_id,
    });
  };

  return (
    <div className="flex flex-col pt-0 lg:pt-2">
      <h1 className="font-body text-lg sm:text-xl font-semibold text-charcoal mb-3">
        {product?.name}
      </h1>

      <div className="flex items-baseline gap-3 mb-4">
        <span className="text-2xl sm:text-3xl font-bold">
          £{price.toFixed(2)}
        </span>

        {originalPrice > 0 && originalPrice > price && (
          <>
            <span className="text-lg text-gray-400 line-through">
              £{originalPrice.toFixed(2)}
            </span>

            {discount > 0 && (
              <span className="text-sm font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                {discount}% OFF
              </span>
            )}
          </>
        )}
      </div>

      <p
        className="text-lg text-gray-500 mb-5"
        dangerouslySetInnerHTML={{ __html: product?.short_description }}
      />

      <div className="border-t pt-5 space-y-5">
        {/* COLORS */}
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-xs font-semibold uppercase">Colour</span>
            <span className="text-xs text-gray-500">{selectedColor}</span>
          </div>

          <div className="flex gap-2">
            {colors.map((color) => (
              <button
                key={color.name}
                onClick={() => {
                  setSelectedColor(color.name);
                  setSelectedSize(null);
                }}
                className={`w-8 h-8 rounded-full border-2 ${
                  selectedColor === color.name
                    ? "border-black ring-2 ring-black ring-offset-2"
                    : "border-gray-200"
                }`}
                style={{
                  background: color.hex2
                    ? `linear-gradient(45deg, ${color.hex}, ${color.hex2})`
                    : color.hex,
                }}
              />
            ))}
          </div>
        </div>

        {/* SIZE */}
        <ProductSizeSelector
          sizes={sizes}
          selected={selectedSize}
          onSelect={(s) => setSelectedSize(s)}
        />

        {/* QTY */}
        <div className="flex items-center gap-3 bg-gray-100 rounded-full px-3 py-1 w-fit shadow-sm">
          <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
            -
          </button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity((q) => q + 1)}>+</button>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-2">
          <button
            onClick={handleAddToBag}
            className="flex-1 h-12 bg-black text-white"
          >
            {added ? "✓ ADDED" : "ADD TO BAG"}
          </button>

          <button
            onClick={handleWishlist}
            className="w-12 h-12 border flex items-center justify-center"
          >
            <Heart fill={isWishlisted(product.id) ? "black" : "none"} />
          </button>

          <button className="w-12 h-12 border flex items-center justify-center">
            <Share2 />
          </button>
        </div>
        <div className="flex flex-wrap gap-1 mb-2">
          {product?.head_categories?.map((cat) => (
            <span
              key={cat.id}
              className="bg-gray-100 text-xs px-2 py-1 rounded"
            >
              {cat.name}
            </span>
          ))}

          {product?.parent_categories?.map((cat) => (
            <span
              key={cat.id}
              className="bg-gray-200 text-xs px-2 py-1 rounded"
            >
              {cat.name}
            </span>
          ))}

          {product?.child_categories?.map((cat) => (
            <span
              key={cat.id}
              className="bg-black text-white text-xs px-2 py-1 rounded"
            >
              {cat.name}
            </span>
          ))}
        </div>

        {selectedVariant && (
          <div className="text-lg text-gray-500">
            SKU: {selectedVariant.sku}
          </div>
        )}

        {/* DELIVERY */}
        <div className="border p-3 space-y-2 text-sm">
          <div className="flex gap-2">
            <Truck size={15} /> Next Day Delivery
          </div>
          <div className="flex gap-2">
            <ShieldCheck size={15} /> Secure Payment
          </div>
        </div>

        <ProductAccordion product={product} />
      </div>
    </div>
  );
}
