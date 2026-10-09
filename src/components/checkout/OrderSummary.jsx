"use client";

export default function OrderSummary({
  items,
  step,
  onContinue,
  onPlaceOrder,
  shippingMethods = [],
  shippingCharge,
  selectedShippingMethod,
  onShippingChange,
}) {
  // ==============================
  // ALWAYS SAFE ARRAY
  // ==============================
  const safeItems = Array.isArray(items) ? items : [];

  // ==============================
  // CALCULATE SUBTOTAL
  // ==============================
  const totalPrice = safeItems.reduce((sum, item) => {
    const itemTotal =
      parseFloat(item?.total) ||
      parseFloat(item?.price || 0) * parseFloat(item?.quantity || 0);

    return sum + (itemTotal || 0);
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
    // Above £30 = always free
    shipping = 0;
  } else if (selectedShippingMethod) {
    // £30 or below = selected method price
    shipping = parseFloat(shippingCharge + selectedShippingMethod?.price) || 0;
  } else {
    // Fallback
    shipping = parseFloat(shippingCharge) || 0;
  }

  // ==============================
  // FINAL TOTAL
  // ==============================
  const total = totalPrice + shipping;

  return (
    <div className="bg-gray-100 p-6 sticky top-6 rounded-xl shadow-sm">
      {/* ==============================
          TITLE
      ============================== */}
      <h2 className="mb-6 text-xs font-semibold tracking-wide">
        ORDER SUMMARY
      </h2>

      {/* ==============================
          ITEMS
      ============================== */}
      {safeItems.length > 0 ? (
        safeItems.map((item, index) => {
          const itemTotal =
            parseFloat(item?.total) ||
            parseFloat(item?.price || 0) * parseFloat(item?.quantity || 0);

          return (
            <div
              key={item?.id || index}
              className="flex justify-between text-sm mb-4"
            >
              <div>
                <span className="font-medium">
                  {item?.product?.name || "Product"} × {item?.quantity || 0}
                </span>

                <div className="text-xs text-gray-500 mt-1">
                  Color: {item?.color?.name || "-"} | Size:{" "}
                  {item?.size?.name || "-"}
                </div>
              </div>

              <span className="font-medium">£{itemTotal.toFixed(2)}</span>
            </div>
          );
        })
      ) : (
        <p className="text-sm text-gray-500">No items in cart</p>
      )}

      {/* ==============================
          TOTALS
      ============================== */}
      <div className="mt-6 border-t pt-4 space-y-3 text-sm">
        {/* SUBTOTAL */}
        <div className="flex justify-between">
          <span>Subtotal</span>

          <span>£{totalPrice.toFixed(2)}</span>
        </div>

        {/* ==============================
            SHIPPING METHODS
            ONLY SHOW WHEN <= £30
        ============================== */}
        {!isFreeShipping && shippingMethods.length > 0 && (
          <div className="mt-6 border-t pt-5">
            <h3 className="text-sm font-semibold mb-4">Shipping Method</h3>

            <div className="space-y-3">
              {shippingMethods
                .filter((method) => method.is_active)
                .map((method) => {
                  const methodPrice = parseFloat(method?.price) || 0;

                  const isSelected =
                    String(selectedShippingMethod?.id) === String(method?.id);

                  return (
                    <label
                      key={method.id}
                      className={`flex items-center justify-between gap-3 p-3 border rounded-lg cursor-pointer transition ${
                        isSelected
                          ? "border-black bg-white"
                          : "border-gray-300 bg-gray-50"
                      }`}
                    >
                      {/* LEFT */}
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping_method"
                          value={method.id}
                          checked={isSelected}
                          onChange={() => onShippingChange?.(method)}
                          className="h-4 w-4"
                        />

                        <div>
                          <p className="text-sm font-medium">{method.name}</p>

                          {method.delivery_time && (
                            <p className="text-xs text-gray-500">
                              {method.delivery_time}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* PRICE */}
                      <span className="text-sm font-medium">
                        £{methodPrice.toFixed(2)}
                      </span>
                    </label>
                  );
                })}
            </div>
          </div>
        )}
        {!isFreeShipping && (
          <div className="text-xs text-gray-600 rounded-lg px-3 py-2">
            Add{" "}
            <span className="font-semibold text-black">
              £{Math.max(30 - totalPrice, 0).toFixed(2)}
            </span>{" "}
            more to get FREE shipping
          </div>
        )}

        {/* ==============================
            SHIPPING
        ============================== */}
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

        {/* ==============================
            TOTAL
        ============================== */}
        <div className="flex justify-between font-semibold text-base">
          <span>Total</span>

          <span>£{total.toFixed(2)}</span>
        </div>
      </div>

      {/* ==============================
          CONTINUE TO PAYMENT
      ============================== */}
      {step === "shipping" && (
        <button
          onClick={onContinue}
          disabled={!isFreeShipping && !selectedShippingMethod}
          className="w-full mt-6 bg-black text-white py-3 text-xs rounded-lg hover:bg-gray-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          CONTINUE TO PAYMENT
        </button>
      )}

      {/* ==============================
          PLACE ORDER
      ============================== */}
      {step === "payment" && (
        <button
          onClick={onPlaceOrder}
          className="w-full mt-6 bg-black text-white py-3 text-xs rounded-lg hover:bg-gray-800 transition"
        >
          PLACE ORDER
        </button>
      )}
    </div>
  );
}
