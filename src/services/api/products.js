import API from "./api";

// Fetch a single product by slug
export const getCategoryBySlug = async (slug) => {
  try {
    const res = await API.get(`/category/${slug}/products`);
    // Axios response data is in res.data
    // Assuming your API returns { status: true, data: { ... } }
    return res.data?.data || null;
  } catch (err) {
    console.error("Error fetching category:", err);
    return null;
  }
};
// Fetch a single product by slug
export const getSpecificProductsBySlug = async (slug) => {
  try {
    const res = await API.get(`/product-by-type/${slug}`);
    // Axios response data is in res.data
    // Assuming your API returns { status: true, data: { ... } }
    return res.data?.data || null;
  } catch (err) {
    console.error("Error fetching category:", err);
    return null;
  }
};
export const getSubCategoryBySlug = async (slug) => {
  try {
    const res = await API.get(`/subcategory/${slug}/products`);
    // Axios response data is in res.data
    // Assuming your API returns { status: true, data: { ... } }
    return res.data?.data || null;
  } catch (err) {
    console.error("Error fetching category:", err);
    return null;
  }
};
export const getChildCategoryBySlug = async (slug) => {
  try {
    const res = await API.get(`/child-category/${slug}/products`);
    // Axios response data is in res.data
    // Assuming your API returns { status: true, data: { ... } }
    return res.data?.data || null;
  } catch (err) {
    console.error("Error fetching category:", err);
    return null;
  }
};

// Fetch a single product by slug
export const getProductBySlug = async (slug) => {
  try {
    const res = await API.get(`/site-products/${slug}`);
    // Axios response data is in res.data
    // Assuming your API returns { status: true, data: { ... } }
    return res.data?.data || null;
  } catch (err) {
    console.error("Error fetching product:", err);
    return null;
  }
};

// Fetch a list of products
export const getProducts = async (params = {}) => {
  try {
    const query = new URLSearchParams(params).toString();
    const res = await API.get(`/site-products${query ? `?${query}` : ""}`);
    // Axios response data is in res.data
    return res.data?.data || []; // return empty array if no products
  } catch (err) {
    console.error("Error fetching products list:", err);
    return [];
  }
};
