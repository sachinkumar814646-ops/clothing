"use client";

import { createContext, useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
} from "services/api/cart";

const Ctx = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState({});
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // ✅ FETCH CART
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await getCart();

      const cartData =
        Array.isArray(res) && res.length > 0 ? res[0] : {};

      setCart(cartData || {});
      setItems(cartData?.items || []);
    } catch (error) {
      console.error("Cart Error:", error);
      setCart({});
      setItems([]);
    }
  };

  // ✅ ADD ITEM
  const addItem = async (newItem) => {

    try {
      const payload = {
        product_id: newItem.product.id,
        color_id: newItem.selectedColor,
        size_id: newItem.selectedSize,
        quantity: newItem.quantity,
      };

      const res = await addToCart(payload);

      if (!res || !(res.status || res.success)) {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: res?.message || "Unable to add item",
        });
        return;
      }

      // ✅ Always sync with backend (BEST PRACTICE)
      await fetchCart();

      setIsOpen(true);

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Added to Cart 🛒",
        showConfirmButton: false,
        timer: 1200,
      });
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ REMOVE ITEM
  const removeItem = async (item) => {
    try {
      await removeCartItem(item.id);

      setItems((prev) => prev.filter((i) => i.id !== item.id));

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Item removed ❌",
        showConfirmButton: false,
        timer: 1200,
      });
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ UPDATE QUANTITY (API + LOCAL)
  const updateQuantity = async (itemId, quantity) => {
    try {
      if (quantity <= 0) {
        const item = items.find((i) => i.id === itemId);
        if (item) await removeItem(item);
        return;
      }

      await updateCartItem(itemId, { quantity });

      setItems((prev) =>
        prev.map((i) =>
          i.id === itemId ? { ...i, quantity } : i
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ CLEAR CART
  const clearCart = () => setItems([]);

  const toggleCart = () => setIsOpen((v) => !v);

  // ✅ TOTALS
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cart?.final_total || 0;

  return (
    <Ctx.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isOpen,
        toggleCart,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  return useContext(Ctx);
}