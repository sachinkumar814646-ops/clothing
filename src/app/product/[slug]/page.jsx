import { useEffect, useState } from "react";
import ProductDetailPage from "components/product-detail/ProductDetailPage";
import { getProductBySlug } from "services/api/products";

export default function ProductPage({ params }) {
  const slug = params?.slug;

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);

        const p = await getProductBySlug(slug);
        if (!p) {
          setProduct(null);
          return;
        }

        const transformed = {
          id: p.id,
          name: p.name,
          price: Number(p.selling_price || p.cost_price),
          originalPrice: Number(p.cost_price),
          short_description: p.short_description,
          description: p.description,
          image: p.default_image,
          images: p.variants
            ?.map((v) => v.variant_default_image)
            .filter(Boolean) || [p.default_image],
          variants: p.variants || [],
          category: p.head_categories || p.category || "uncategorized",
          head_categories: p.head_categories || "uncategorized",
          parent_categories: p.parent_categories || null,
          child_categories: p.child_categories || null,
        };

        setProduct(transformed);
        setRelated(p.related_products);
      } catch (err) {
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  // ✅ Loading UI
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm">Loading...</p>
      </div>
    );
  }

  // ✅ 404 UI
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-8">
        <div className="text-center">
          <p className="font-body text-xs tracking-widest-2 text-stone mb-4">
            404
          </p>
          <h1 className="font-display text-5xl font-light italic mb-4">
            Product Not Found
          </h1>
        </div>
      </div>
    );
  }

  return (
    <>
      <ProductDetailPage product={product} related={related} />
    </>
  );
}
