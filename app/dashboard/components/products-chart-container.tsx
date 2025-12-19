import { getTotalProductsPerWeek } from "~/data/dashboard";
import { ProductsChart } from "./products-chart";

export async function ProductsChartContainer() {
  const totalProductsPerWeek = await getTotalProductsPerWeek();

  return <ProductsChart data={totalProductsPerWeek} />;
}
