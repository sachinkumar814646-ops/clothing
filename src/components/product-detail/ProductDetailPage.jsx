"use client";
import { useState } from "react";
import Link from "lib/Link";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import ProductRelated from "./ProductRelated";

export default function ProductDetailPage({ product, related }) {
  console.log("ProductDetailPage render", product.category[0]?.name);

  // ✅ MOVE STATE HERE
  const [selectedColor, setSelectedColor] = useState(
    product?.variants?.[0]?.color_name || null
  );

  return (
    <div className="bg-white min-h-screen">

      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-2">
        <nav className="flex items-center gap-1.5 text-[11px] text-gray-400">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href={`/${product.category[0]?.name}`} className="capitalize">
            {product.category[0]?.name || " "}
          </Link>
          <span>/</span>
          <span className="text-black line-clamp-1">
            {product.name}
          </span>
        </nav>
      </div>

      {/* MAIN */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 xl:gap-14">

          {/* ✅ PASS COLOR */}
          <ProductGallery 
            product={product}
            selectedColor={selectedColor}
          />

          {/* ✅ PASS BOTH */}
          <ProductInfo 
            product={product}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />

        </div>
      </div>

      {related.length > 0 && (
        <ProductRelated products={related}/>
      )}
    </div>
  );
}

