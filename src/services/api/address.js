import API from "./api";

// helper to get headers
const getAuthHeader = () => {
  const token = localStorage.getItem("authToken");
  return token
    ? { Authorization: `Bearer ${token}` }
    : {};
};

//
// 🔹 Get all addresses
//
export const getAddresses = async () => {
  try {
    const res = await API.get("/user-addresses", {
      headers: getAuthHeader(),
    });

    console.log("Address response:", res);
    return res.data?.data || [];
  } catch (err) {
    console.error("Error fetching addresses:", err);
    return [];
  }
};

//
// 🔹 Add new address
//
export const addAddress = async (data) => {
  try {
    const res = await API.post("/user-addresses", data, {
      headers: getAuthHeader(),
    });

    return res.data;
  } catch (err) {
    console.error("Error adding address:", err);
    throw err;
  }
};

//
// 🔹 Update address
//
export const updateAddress = async (id, data) => {
  try {
    const res = await API.put(`/user-addresses/${id}`, data, {
      headers: getAuthHeader(),
    });

    return res.data;
  } catch (err) {
    console.error("Error updating address:", err);
    throw err;
  }
};

//
// 🔹 Delete address
//
export const deleteAddress = async (id) => {
  try {
    const res = await API.delete(`/user-addresses/${id}`, {
      headers: getAuthHeader(),
    });

    return res.data;
  } catch (err) {
    console.error("Error deleting address:", err);
    throw err;
  }
};