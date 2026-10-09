import { useEffect, useState } from "react";
import ProductGrid from "components/product/ProductGrid";
import { getChildCategoryBySlug } from "services/api/products";

export default function CategoryPage({ slug }) {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");

  useEffect(() => {
    if (!slug) return;

    const fetchProducts = async () => {
      try {
        // Use the service function instead of fetch
        const categoryData = await getChildCategoryBySlug(slug);
        // Assuming getCategoryBySlug returns the full category object with a `products` array
        setProducts(categoryData?.products || []);
        setProductName(categoryData?.name || "");
      } catch (err) {
        console.error("Error fetching category products:", err);
      }
    };

    fetchProducts();
  }, [slug]);

  return (
    <>
      <ProductGrid products={products} title={productName} />
    </>
  );
}