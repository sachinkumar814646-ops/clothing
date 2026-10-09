"use client";
import { useState } from "react";
import Image from "lib/NextImage";
import Link from "lib/Link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Plus, Minus, ChevronDown } from "lucide-react";
import { useCart } from "lib/cart-context";
import { useWishlist } from "lib/wishlist-context";
import ProductCard from "./ProductCard";
export default function ProductDetail({ product, related }) {
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedColor, setSelectedColor] = useState(product.colors[0].name);
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [sizeError, setSizeError] = useState(false);
    const [zoomed, setZoomed] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
    const { addItem } = useCart();
    const { toggleWishlist, isWishlisted } = useWishlist();
    const handleAddToCart = () => {
        if (!selectedSize) {
            setSizeError(true);
            setTimeout(() => setSizeError(false), 2500);
            return;
        }
        addItem({ product, quantity, selectedColor, selectedSize });
        setAdded(true);
        setTimeout(() => setAdded(false), 2500);
    };
    const handleMouseMove = (e) => {
        if (!zoomed)
            return;
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
        });
    };
    return (<div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 pt-6 pb-16">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 font-body text-[10px] text-stone flex-wrap">
        <Link href="/" className="hover:text-charcoal transition-colors">HOME</Link>
        <span>/</span>
        <Link href={`/${product.category}`} className="hover:text-charcoal transition-colors capitalize">
          {product.category.toUpperCase()}
        </Link>
        <span>/</span>
        <span className="text-charcoal truncate max-w-[200px]">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-12 gap-6 lg:gap-12">
        {/* Gallery */}
        <div className="lg:col-span-7 flex gap-3">
          {/* Thumbnails — desktop */}
          <div className="hidden sm:flex flex-col gap-2 w-14 flex-none">
            {product.images.map((img, i) => (<button key={i} onClick={() => setSelectedImage(i)} className={`relative overflow-hidden bg-bone flex-none transition-all ${selectedImage === i ? "ring-1 ring-charcoal" : "opacity-50 hover:opacity-80"}`} style={{ aspectRatio: "3/4" }}>
                <Image src={img} alt="" fill className="object-cover"/>
              </button>))}
          </div>

          {/* Main image */}
          <div className="flex-1 relative overflow-hidden bg-bone cursor-zoom-in" style={{ aspectRatio: "3/4" }} onMouseEnter={() => setZoomed(true)} onMouseLeave={() => setZoomed(false)} onMouseMove={handleMouseMove}>
            <Image src={product.images[selectedImage]} alt={product.name} fill priority sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover transition-transform duration-200" style={zoomed ? {
            transform: "scale(2)",
            transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
        } : {}}/>
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
              {product.isNew && <span className="font-body text-[9px] tracking-editorial bg-pinked text-white px-2 py-0.5">NEW</span>}
              {product.isSale && <span className="font-body text-[9px] tracking-editorial bg-red-600 text-white px-2 py-0.5">SALE</span>}
            </div>
            {/* Mobile thumbnail dots */}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 sm:hidden z-10">
              {product.images.map((_, i) => (<button key={i} onClick={() => setSelectedImage(i)} className={`w-1.5 h-1.5 rounded-full transition-all ${selectedImage === i ? "bg-pinked" : "bg-pinked/30"}`}/>))}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="lg:col-span-5">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="font-body text-sm tracking-editorial leading-relaxed mb-2">
              {product.name}
            </h1>
            <div className="flex items-baseline gap-3 mb-5">
              <span className="font-display text-3xl sm:text-4xl font-light">£{product.price}</span>
              {product.originalPrice && (<span className="font-display text-xl text-stone line-through">£{product.originalPrice}</span>)}
              {product.isSale && product.originalPrice && (<span className="font-body text-xs text-red-600">
                  -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                </span>)}
            </div>

            <p className="font-body text-sm text-stone leading-relaxed mb-7">
              {product.description}
            </p>

            {/* Colour */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-3">
                <span className="font-body text-xs tracking-editorial">COLOUR</span>
                <span className="font-body text-xs text-stone">{selectedColor}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (<button key={color.name} onClick={() => setSelectedColor(color.name)} title={color.name} className={`w-8 h-8 rounded-full transition-all duration-150 ${selectedColor === color.name
                ? "ring-2 ring-charcoal ring-offset-2"
                : "ring-1 ring-charcoal/20 hover:ring-charcoal/50"}`} style={{ backgroundColor: color.hex }}/>))}
              </div>
            </div>

            {/* Size */}
            <div className="mb-7">
              <div className="flex items-center justify-between mb-3">
                <span className={`font-body text-xs tracking-editorial transition-colors ${sizeError ? "text-red-600" : ""}`}>
                  {sizeError ? "PLEASE SELECT A SIZE" : "SIZE"}
                </span>
                <button className="font-body text-xs text-stone hover:text-charcoal transition-colors underline">
                  SIZE GUIDE
                </button>
              </div>
              <div className="grid grid-cols-5 sm:grid-cols-6 gap-1.5">
                {product.sizes.map((size) => (<button key={size} onClick={() => { setSelectedSize(size); setSizeError(false); }} className={`py-2.5 font-body text-xs tracking-editorial border transition-all duration-150 ${selectedSize === size
                ? "border-charcoal bg-pinked text-white"
                : `border-bone hover:border-charcoal ${sizeError ? "border-red-200 bg-red-50/50" : ""}`}`}>
                    {size}
                  </button>))}
              </div>
            </div>

            {/* Quantity + Add to bag */}
            <div className="flex gap-3 mb-4">
              <div className="flex items-center border border-bone">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-3 py-4 hover:bg-bone transition-colors" aria-label="Decrease">
                  <Minus size={12}/>
                </button>
                <span className="w-10 text-center font-body text-sm select-none">{quantity}</span>
                <button onClick={() => setQuantity((q) => Math.min(10, q + 1))} className="px-3 py-4 hover:bg-bone transition-colors" aria-label="Increase">
                  <Plus size={12}/>
                </button>
              </div>

              <button onClick={handleAddToCart} className="flex-1 font-body text-xs tracking-editorial py-4 bg-pinked text-white hover:bg-pinked/85 active:scale-[0.99] transition-all relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {added ? (<motion.span key="added" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="block">
                      ADDED TO BAG ✓
                    </motion.span>) : (<motion.span key="add" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="block">
                      ADD TO BAG
                    </motion.span>)}
                </AnimatePresence>
              </button>

              <button onClick={() => toggleWishlist(product.id)} className="w-14 border border-bone flex items-center justify-center hover:border-charcoal transition-colors" aria-label="Wishlist">
                <Heart size={16} strokeWidth={1.5} className={`transition-colors ${isWishlisted(product.id) ? "fill-charcoal text-charcoal" : "text-charcoal"}`}/>
              </button>
            </div>

            <p className="font-body text-xs text-stone text-center mb-6">
              Free shipping on orders over £150 · Free returns within 30 days
            </p>

            {/* Details accordion */}
            <div className="border-t border-bone">
              <button onClick={() => setDetailsOpen(!detailsOpen)} className="flex items-center justify-between w-full py-4">
                <span className="font-body text-xs tracking-editorial">PRODUCT DETAILS</span>
                <ChevronDown size={14} strokeWidth={1.5} className={`transition-transform duration-200 ${detailsOpen ? "rotate-180" : ""}`}/>
              </button>
              <AnimatePresence>
                {detailsOpen && (<motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden pb-4 space-y-2">
                    {product.details.map((d) => (<li key={d} className="flex items-start gap-3 font-body text-sm text-stone">
                        <span className="w-1 h-1 bg-stone rounded-full mt-2 flex-none"/>
                        {d}
                      </li>))}
                  </motion.ul>)}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (<section className="mt-16 sm:mt-24">
          <div className="mb-8 text-center">
            <p className="font-body text-xs tracking-widest-2 text-stone mb-2">YOU MAY ALSO LIKE</p>
            <h2 className="font-display text-3xl sm:text-4xl font-light">Related Items</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 gap-y-8 sm:gap-y-10">
            {related.map((p, i) => (<motion.div key={p.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <ProductCard product={p}/>
              </motion.div>))}
          </div>
        </section>)}
    </div>);
}
