import API from "./api";

// helper to get headers
const getAuthHeader = () => {
  const token = localStorage.getItem("authToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

//
// 🔹 Create Order (IMPORTANT - your format)
//
export const createOrder = async (data) => {
  try {
    const res = await API.post("/orders", data, {
      headers: getAuthHeader(),
    });

    return res.data;
  } catch (err) {
    console.error("Create Order Error:", err);
    throw err;
  }
};

//
// 🔹 Get All Orders
//
export const getOrders = async () => {
  try {
    const res = await API.get("/orders", {
      headers: getAuthHeader(),
    });

    return res.data?.data || [];
  } catch (err) {
    console.error("Get Orders Error:", err);
    return [];
  }
};

//
// 🔹 Get Single Order
//
export const getOrderById = async (id) => {
  try {
    const res = await API.get(`/orders/${id}`, {
      headers: getAuthHeader(),
    });

    return res.data?.data || null;
  } catch (err) {
    console.error("Get Order Error:", err);
    return null;
  }
};

//
// 🔹 Cancel Order (if API supports)
//
export const cancelOrder = async (id) => {
  try {
    const res = await API.delete(`/orders/${id}`, {
      headers: getAuthHeader(),
    });

    return res.data;
  } catch (err) {
    console.error("Cancel Order Error:", err);
    throw err;
  }
};
