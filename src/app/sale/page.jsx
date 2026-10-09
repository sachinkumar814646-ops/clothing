import { getProductsByCategory } from "lib/data";
import ProductGrid from "components/product/ProductGrid";
export const metadata = { title: "Sale — COOMBB" };
export default function SalePage() {
    return (<><ProductGrid products={getProductsByCategory("sale")} title="Sale"/></>);
}
