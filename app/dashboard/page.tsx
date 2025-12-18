import { AppHeader } from "~/components/app-header";
import { ProductsChartContainer } from "./components/products-chart-container";
import { Suspense } from "react";
import { Skeleton } from "~/components/ui/skeleton";

export default function Page() {
  return (
    <>
      <AppHeader title="Dashboard" />
      <div className="max-w-7xl w-full mx-auto p-4 md:px-8">
        <Suspense
          fallback={<Skeleton className="w-full h-96 bg-card shadow" />}
        >
          <ProductsChartContainer />
        </Suspense>
      </div>
    </>
  );
}
