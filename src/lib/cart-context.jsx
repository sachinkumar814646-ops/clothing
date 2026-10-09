"use client";

import { createContext, useContext, useState } from "react";
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

  const fetchCart = async () => {
    try {
      const res = await getCart();

      if (!res.success) {
        setCart({});
        setItems([]);
        return;
      }

      const cartData = res.data || {};
      console.log("Fetched Cart:", cartData[0] || {});
      debugger;

      setCart(cartData[0] || {});
      setItems(cartData[0]?.items || []);
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

      // ❌ Handle error
      if (!res || !res.success) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: res?.message || "Unable to add item",
        });
        return;
      }

      // ✅ Sync cart
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

      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  // ✅ REMOVE ITEM
  const removeItem = async (item) => {
    try {
      const res = await removeCartItem(item.id);

      if (!res.success) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: res?.message || "Failed to remove item",
        });
        return;
      }

      // ✅ Sync instead of manual remove (best practice)
      await fetchCart();

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

  // ✅ UPDATE QUANTITY
  const updateQuantity = async (itemId, quantity) => {
    try {
      if (quantity <= 0) {
        const item = items.find((i) => i.id === itemId);
        if (item) await removeItem(item);
        return;
      }

      const res = await updateCartItem(itemId, quantity);

      if (!res.success) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: res?.message || "Failed to update quantity",
        });
        return;
      }

      // ✅ Sync with backend
      await fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ CLEAR CART
  const clearCart = () => {
    setCart({});
    setItems([]);
  };

  const toggleCart = async () => {
    if (!isOpen) {
      await fetchCart();
    }

    setIsOpen((v) => !v);
  };

  // ✅ TOTALS (FIXED)
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cart?.final_total || 0;

  return (
    <Ctx.Provider
      value={{
        items,
        cart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isOpen,
        toggleCart,
        fetchCart, // 🔥 useful globally
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  return useContext(Ctx);
}
