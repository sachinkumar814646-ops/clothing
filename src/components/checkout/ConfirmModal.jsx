"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function ConfirmModal({
  show,
  setShow,
  selectedAddress,
  selectedShippingMethod,
  items = [],
  onConfirm,
}) {
  // ==============================
  // CALCULATE SUBTOTAL
  // ==============================
  const totalPrice = items.reduce((sum, item) => {
    const itemTotal =
      parseFloat(item?.total) ||
      parseFloat(item?.price || 0) * parseFloat(item?.quantity || 0);

    return sum + itemTotal;
  }, 0);

  // ==============================
  // FREE SHIPPING RULE
  // ABOVE £30 = FREE SHIPPING
  // ==============================
  const isFreeShipping = totalPrice > 30;

  // ==============================
  // CALCULATE SHIPPING
  // ==============================
  let shipping = 0;

  if (isFreeShipping) {
    // Above £30 = always FREE
    shipping = 0;
  } else if (selectedShippingMethod) {
    // £30 or below = selected shipping method price
    shipping = parseFloat(selectedShippingMethod?.price) || 0;
  }

  // ==============================
  // FINAL TOTAL
  // ==============================
  const total = totalPrice + shipping;

  // ==============================
  // ORDER CAN BE CONFIRMED IF:
  // 1. Free shipping (> £30)
  // OR
  // 2. Shipping method selected (<= £30)
  // ==============================
  const canConfirm = isFreeShipping || !!selectedShippingMethod;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white w-full max-w-lg p-6 relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            {/* CLOSE */}
            <button
              onClick={() => setShow(false)}
              className="absolute top-3 right-3 text-sm"
            >
              ✕
            </button>

            <h2 className="text-sm mb-4 font-medium">CONFIRM YOUR ORDER</h2>

            {/* ==============================
                ADDRESS
            ============================== */}
            <div className="mb-4">
              <h3 className="text-xs text-gray-500 mb-1">DELIVERY ADDRESS</h3>

              {selectedAddress ? (
                <>
                  <p className="text-sm">
                    {selectedAddress.name || selectedAddress.guest_name}
                  </p>

                  <p className="text-xs">
                    {selectedAddress.email || selectedAddress.guest_email},{" "}
                    {selectedAddress.phone_number ||
                      selectedAddress.guest_phone_number}
                  </p>

                  <p className="text-xs">
                    {selectedAddress.apartment_suite ||
                      selectedAddress.guest_apartment_suite}
                    , {selectedAddress.street || selectedAddress.guest_street}
                  </p>

                  <p className="text-xs">
                    {selectedAddress.zipcode || selectedAddress.guest_zipcode}
                  </p>

                  <p className="text-xs">
                    {selectedAddress.state?.name ||
                      selectedAddress.state ||
                      selectedAddress.guest_state_name}
                    ,{" "}
                    {selectedAddress.city?.name ||
                      selectedAddress.city ||
                      selectedAddress.guest_city_name}
                    ,{" "}
                    {selectedAddress.country?.name ||
                      selectedAddress.country ||
                      selectedAddress.guest_country_name}
                  </p>
                </>
              ) : (
                <p className="text-xs text-gray-500">No address selected</p>
              )}
            </div>

            {/* ==============================
                SHIPPING METHOD
            ============================== */}
            <div className="mb-4">
              <h3 className="text-xs text-gray-500 mb-1">SHIPPING METHOD</h3>

              {isFreeShipping ? (
                <>
                  <p className="text-sm font-medium">Free Shipping</p>

                  <p className="text-xs text-gray-500">
                    Free shipping on orders above £30
                  </p>
                </>
              ) : selectedShippingMethod ? (
                <>
                  <p className="text-sm font-medium">
                    {selectedShippingMethod.name}
                  </p>

                  <p className="text-xs text-gray-500">
                    {selectedShippingMethod.delivery_time}
                  </p>
                </>
              ) : (
                <p className="text-xs text-gray-500">
                  No shipping method selected
                </p>
              )}
            </div>

            {/* ==============================
                PRODUCTS
            ============================== */}
            <div className="mb-4">
              <h3 className="text-xs text-gray-500 mb-2">PRODUCTS</h3>

              <div className="space-y-3 max-h-40 overflow-auto">
                {items.length > 0 ? (
                  items.map((item, index) => (
                    <div
                      key={item?.id || index}
                      className="flex justify-between text-sm"
                    >
                      <span>
                        {item?.product?.name || "Product"} ×{" "}
                        {item?.quantity || 0}
                        <br />
                        <span className="text-xs text-gray-500">
                          {item?.color?.name || "-"} | {item?.size?.name || "-"}
                        </span>
                      </span>

                      <span>
                        £
                        {(
                          parseFloat(item?.total) ||
                          parseFloat(item?.price || 0) *
                            parseFloat(item?.quantity || 0)
                        ).toFixed(2)}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-500">No items</p>
                )}
              </div>
            </div>

            {/* ==============================
                TOTALS
            ============================== */}
            <div className="border-t pt-3 text-sm space-y-2">
              {/* SUBTOTAL */}
              <div className="flex justify-between">
                <span>Subtotal</span>

                <span>£{totalPrice.toFixed(2)}</span>
              </div>

              {/* SHIPPING */}
              <div className="flex justify-between">
                <span>Shipping</span>

                <span>
                  {isFreeShipping
                    ? "FREE"
                    : shipping === 0
                      ? "FREE"
                      : `£${shipping.toFixed(2)}`}
                </span>
              </div>

              {/* TOTAL */}
              <div className="flex justify-between font-medium text-base">
                <span>Total</span>

                <span>£{total.toFixed(2)}</span>
              </div>
            </div>

            {/* ==============================
                ACTIONS
            ============================== */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShow(false)}
                className="flex-1 border py-3 text-xs"
              >
                CANCEL
              </button>

              <button
                onClick={onConfirm}
                disabled={!canConfirm}
                className="flex-1 bg-black text-white py-3 text-xs disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                CONFIRM ORDER
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
