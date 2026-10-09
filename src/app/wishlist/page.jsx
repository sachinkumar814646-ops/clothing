"use client";

import Link from "lib/Link";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useWishlist } from "lib/wishlist-context";
import ProductWishlistCard from "components/product/ProductWishlistCard";

export default function WishlistPage() {
    const { wishlist } = useWishlist();

    // ✅ Transform API wishlist data
    const wishlistProducts = wishlist
        ?.map((item) => {
            const product = item.products?.data?.[0];

            if (!product) return null;

            return {
                ...product,
                size: item.size?.data?.[0] || null,
                color: item.colors?.data?.[0] || null,
            };
        })
        .filter(Boolean);

    return (
        <>
            <div className="max-w-[1600px] mx-auto px-6 lg:px-12 pt-8 pb-16 min-h-screen">
                <h1 className="font-display text-4xl lg:text-5xl font-light mb-2">
                    Wishlist
                </h1>

                <p className="font-body text-xs text-stone mb-10">
                    {wishlistProducts.length} ITEMS
                </p>

                {wishlistProducts.length === 0 ? (
                    <div className="text-center py-24">
                        <Heart
                            size={48}
                            strokeWidth={1}
                            className="text-bone mx-auto mb-6"
                        />

                        <h2 className="font-display text-3xl font-light italic text-stone mb-3">
                            Your wishlist is empty
                        </h2>

                        <p className="font-body text-xs text-stone mb-8">
                            Save your favourite pieces
                        </p>

                        <Link
                            href="/"
                            className="font-body text-xs tracking-editorial px-10 py-4 bg-pinked text-white hover:bg-pinked/80 transition-colors"
                        >
                            DISCOVER COLLECTIONS
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 gap-y-10">
                        {wishlistProducts.map((product, i) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.06 }}
                            >
                                <ProductWishlistCard product={product} />
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}