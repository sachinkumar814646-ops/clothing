"use client";

import React from "react";
import Image from "lib/NextImage";
import Link from "lib/Link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "lib/cart-context";

export default function CartDrawer() {
  const {
    isOpen,
    toggleCart,
    items = [],
    removeItem,
    updateQuantity,
    totalItems = 0,
    totalPrice = 0,
  } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={toggleCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-[420px] bg-white flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 h-16 border-b border-gray-100 flex-none">
              <div className="flex items-center gap-2.5">
                <ShoppingBag size={18} strokeWidth={1.5} className="text-charcoal" />
                <span className="font-body text-sm font-bold tracking-[0.12em] uppercase text-charcoal">
                  My Bag
                </span>

                {totalItems > 0 && (
                  <span className="bg-pinked text-white font-body text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>

              <button
                onClick={toggleCart}
                className="p-2 hover:bg-gray-50 rounded-full transition-colors"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full px-6 text-center gap-4">
                  <ShoppingBag size={48} strokeWidth={1} className="text-gray-200" />

                  <div>
                    <p className="font-body text-base font-semibold text-charcoal mb-1">
                      Your bag is empty
                    </p>
                    <p className="font-body text-sm text-gray-400">
                      Add some items to get started
                    </p>
                  </div>

                  <button
                    onClick={toggleCart}
                    className="font-body text-xs tracking-[0.18em] px-8 py-3 bg-pinked text-white hover:bg-pinked/85 transition-colors"
                  >
                    CONTINUE SHOPPING
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 40 }}
                      className="flex gap-4 px-6 py-4"
                    >
                      {/* Image */}
                      <Link
                        href={`/product/${item.product?.id}`}
                        onClick={toggleCart}
                        className="relative w-20 h-28 bg-bone flex-none overflow-hidden"
                      >
                        <Image
                          src={item.product?.default_image || "/placeholder.png"}
                          alt={item.product?.name || "Product"}
                          fill
                          sizes="80px"
                          className="object-cover object-top"
                        />
                      </Link>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/product/${item.product?.id}`}
                          onClick={toggleCart}
                          className="font-body text-[12px] font-medium text-charcoal hover:underline line-clamp-2 mb-1"
                        >
                          {item.product?.name || "Product"}
                        </Link>

                        <div className="flex gap-2 mb-2">
                          {item.color?.name && (
                            <span className="text-[11px] text-gray-400">
                              {item.color.name}
                            </span>
                          )}
                          {item.size?.name && (
                            <span className="text-[11px] text-gray-400">
                              Size: {item.size.name}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          {/* Quantity */}
                          <div className="flex items-center border">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="w-7 h-7 flex items-center justify-center hover:bg-gray-50"
                            >
                              <Minus size={11} />
                            </button>

                            <span className="w-7 text-center text-xs">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="w-7 h-7 flex items-center justify-center hover:bg-gray-50"
                            >
                              <Plus size={11} />
                            </button>
                          </div>

                          {/* Price + Remove */}
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-sm">
                              £{Number(item.total || 0).toFixed(2)}
                            </span>

                            <button
                              onClick={() => removeItem(item)}
                              className="text-gray-300 hover:text-red-500"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t px-6 py-5 space-y-3">
                {totalPrice < 30 && (
                  <div className="bg-gray-50 px-4 py-2 text-center">
                    <p className="text-[11px] text-gray-500">
                      Spend{" "}
                      <span className="font-semibold">
                        £{(30 - totalPrice).toFixed(2)}
                      </span>{" "}
                      more for free delivery
                    </p>

                    <div className="mt-1 h-1 bg-gray-200 rounded">
                      <div
                        className="h-full bg-black"
                        style={{
                          width: `${Math.min(
                            (totalPrice / 30) * 100,
                            100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">
                    Subtotal ({totalItems} items)
                  </span>

                  <span className="text-lg font-bold">
                    £{Number(totalPrice).toFixed(2)}
                  </span>
                </div>

                <Link
                  href="/checkout"
                  onClick={toggleCart}
                  className="block w-full bg-pinked text-white text-center py-4"
                >
                  CHECKOUT — £{Number(totalPrice).toFixed(2)}
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}