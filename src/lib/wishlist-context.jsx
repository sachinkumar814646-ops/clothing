"use client";

import { createContext, useContext, useState } from "react";
import Swal from "sweetalert2";

import { getWishlist, addWishlist, removeWishlist } from "services/api/cart";

const Ctx = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = async () => {
    try {
      const res = await getWishlist();

      setWishlist(res || []);
    } catch (err) {
      console.error(err);
      setWishlist([]);
    }
  };

  const addWishlistItem = async (product) => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        Swal.fire({
          icon: "warning",
          title: "Login Required",
          text: "Please login to access this",
        });

        return;
      }

      const payload = {
        product_id: product.id,
        color_id: product.selectedColor,
        size_id: product.selectedSize,
      };

      const res = await addWishlist(payload);

      if (!res || !(res.status || res.success)) {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: res?.message || "Unable to add wishlist",
        });

        return;
      }

      await fetchWishlist();

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Added to Wishlist ❤️",
        showConfirmButton: false,
        timer: 1200,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const removeWishlistItem = async (itemId) => {
    try {
      await removeWishlist(itemId);

      setWishlist((prev) => prev.filter((i) => i.id !== itemId));

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Removed from Wishlist 💔",
        showConfirmButton: false,
        timer: 1200,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const toggleWishlist = async (product) => {
    const existing = wishlist.find((i) => i.product_id === product.id);

    if (existing) {
      await removeWishlistItem(existing.id);
    } else {
      await addWishlistItem(product);
    }
  };

  const isWishlisted = (productId) => {
    return wishlist.some((i) => i.product_id === productId);
  };

  return (
    <Ctx.Provider
      value={{
        wishlist,
        addWishlistItem,
        removeWishlistItem,
        toggleWishlist,
        isWishlisted,
        fetchWishlist, // ⭐ IMPORTANT
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useWishlist() {
  return useContext(Ctx);
}
