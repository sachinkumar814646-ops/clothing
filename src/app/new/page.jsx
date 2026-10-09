import { useEffect, useState } from "react";
import ProductGrid from "components/product/ProductGrid";
import { getSpecificProductsBySlug } from "services/api/products";

export default function CategoryPage({ slug }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!slug) return;

    const fetchProducts = async () => {
      try {
        const categoryData = await getSpecificProductsBySlug(slug);

        const productKey = `${slug}_product`;

        setProducts(categoryData?.[productKey]?.data || []);
      } catch (err) {
        console.error("Error fetching category products:", err);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [slug]);

  return <ProductGrid products={products} title={slug} />;
}
