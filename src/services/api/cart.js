import API from "./api";

// ✅ Helper to get headers (Auth + Guest)
const getAuthHeader = () => {
  const token = localStorage.getItem("authToken");
  const guestToken = localStorage.getItem("guest_token");

  return {
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(guestToken && { "Guest-Token": guestToken }),
  };
};

// ✅ Save guest token globally
const handleGuestToken = (data) => {
  if (data?.guest_token) {
    localStorage.setItem("guest_token", data.guest_token);
  }
};

// ================= CART ================= //

// ✅ Get all cart items
export const getCart = async () => {
  try {
    console.log("Fetching cart with headers:", getAuthHeader());
    const res = await API.get("/cart", {
      headers: getAuthHeader(),
    });
    console.log("Cart Response:", res.data);
    debugger;

    handleGuestToken(res.data);

    return {
      success: true,
      data: res.data?.data || { items: [] },
    };
  } catch (err) {
    console.error("Error fetching cart:", err);

    return {
      success: false,
      data: { items: [] },
      message: err?.response?.data?.message || "Failed to fetch cart",
    };
  }
};

export const getShipmentCart = async () => {
  try {
    console.log("Fetching cart with headers:", getAuthHeader());
    const res = await API.get("/cart", {
      headers: getAuthHeader(),
    });
    console.log("Cart getShipmentCart Response:", res.data);
    debugger;

    handleGuestToken(res.data);

    return {
      success: true,
      data: res?.data || { items: [] },
    };
  } catch (err) {
    console.error("Error fetching cart:", err);

    return {
      success: false,
      data: { items: [] },
      message: err?.response?.data?.message || "Failed to fetch cart",
    };
  }
};

// ✅ Add item to cart
export const addToCart = async (payload) => {
  try {
    const res = await API.post("/cart", payload, {
      headers: getAuthHeader(),
    });

    handleGuestToken(res.data);

    return {
      success: true,
      data: res.data,
    };
  } catch (err) {
    console.error("Error adding to cart:", err);

    const errorData = err?.response?.data;

    return {
      success: false,
      message: errorData?.message || "Something went wrong",
      status: errorData?.status || 500,
    };
  }
};

// ✅ Update cart item quantity
export const updateCartItem = async (cartItemId, quantity) => {
  try {
    const res = await API.put(
      `/cart/${cartItemId}`,
      { quantity },
      { headers: getAuthHeader() },
    );

    handleGuestToken(res.data);

    return {
      success: true,
      data: res.data,
    };
  } catch (err) {
    console.error("Error updating cart item:", err);

    return {
      success: false,
      message: err?.response?.data?.message || "Update failed",
    };
  }
};

// ✅ Remove item from cart
export const removeCartItem = async (cartItemId) => {
  try {
    const res = await API.delete(`/cart/${cartItemId}`, {
      headers: getAuthHeader(),
    });

    handleGuestToken(res.data);

    return {
      success: true,
      data: res.data,
    };
  } catch (err) {
    console.error("Error removing cart item:", err);

    return {
      success: false,
      message: err?.response?.data?.message || "Delete failed",
    };
  }
};

// ================= WISHLIST ================= //

// Get wishlist items
export const getWishlist = async () => {
  try {
    const res = await API.get("/wishlists", {
      headers: getAuthHeader(),
    });

    return res.data?.data || [];
  } catch (err) {
    console.error("Error fetching wishlist:", err);
    return [];
  }
};

// Add/remove wishlist item
export const addWishlist = async (payload) => {
  try {
    const res = await API.post("/wishlists", payload, {
      headers: getAuthHeader(),
    });

    return res.data || null;
  } catch (err) {
    console.error("Error adding wishlist:", err);
    return null;
  }
};
// Remove wishlist item
export const removeWishlist = async (wishlistId) => {
  try {
    const res = await API.delete(`/wishlists/${wishlistId}`, {
      headers: getAuthHeader(),
    });

    return res.data || null;
  } catch (err) {
    console.error("Error removing wishlist:", err);
    return null;
  }
};
