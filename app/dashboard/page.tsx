import { AppHeader } from "~/components/app-header";
import { ProductsChartContainer } from "./components/products-chart-container";
import { Suspense } from "react";
import { Skeleton } from "~/components/ui/skeleton";
import { InventorySummary } from "./components/inventory-summary";

export default function Page() {
  return (
    <>
      <AppHeader title="Dashboard" />
      <div className="max-w-7xl w-full mx-auto space-y-6 p-4 md:px-8">
        <Suspense
          fallback={<Skeleton className="w-full h-100 bg-card shadow" />}
        >
          <ProductsChartContainer />
        </Suspense>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Suspense
            fallback={<Skeleton className="w-full h-64 bg-card shadow" />}
          >
            <InventorySummary />
          </Suspense>
        </div>
      </div>
    </>
  );
}
