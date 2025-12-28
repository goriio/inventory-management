import { getSalesStatistics } from "~/data/dashboard";
import { SalesChart } from "./sales-chart";

export async function SalesChartContainer() {
  const salesStatistics = await getSalesStatistics();

  return <SalesChart data={salesStatistics} />;
}
