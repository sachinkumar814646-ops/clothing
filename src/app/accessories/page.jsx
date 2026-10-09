import { getProductsByCategory } from "lib/data";
import ProductGrid from "components/product/ProductGrid";
export const metadata = { title: "Accessories — COOMBB" };
export default function AccessoriesPage() {
    return (<><ProductGrid products={getProductsByCategory("accessories")} title="Accessories"/></>);
}
