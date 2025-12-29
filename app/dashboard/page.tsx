import { AppHeader } from "~/components/app-header";
import { ProductsChartContainer } from "./components/products-chart-container";
import { Suspense } from "react";
import { Skeleton } from "~/components/ui/skeleton";
import { InventorySummary } from "./components/inventory-summary";
import { ProductDetails } from "./components/product-details";
import { NoOfUsers } from "./components/no-of-users";
import { SalesOverview } from "./components/sales-overview";
import { SalesChartContainer } from "./components/sales-chart-container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function Page() {
  return (
    <>
      <AppHeader title="Dashboard" />
      <div className="max-w-7xl w-full mx-auto space-y-6 p-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Suspense
            fallback={<Skeleton className="w-full h-64 bg-card shadow" />}
          >
            <SalesOverview />
          </Suspense>
          <Suspense
            fallback={<Skeleton className="w-full h-64 bg-card shadow" />}
          >
            <InventorySummary />
          </Suspense>
        </div>
        <Suspense
          fallback={<Skeleton className="w-full h-100 bg-card shadow" />}
        >
          <SalesChartContainer />
        </Suspense>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Suspense
            fallback={<Skeleton className="w-full h-64 bg-card shadow" />}
          >
            <NoOfUsers />
          </Suspense>
          <Suspense
            fallback={<Skeleton className="w-full h-64 bg-card shadow" />}
          >
            <ProductDetails />
          </Suspense>
        </div>
        <Suspense
          fallback={<Skeleton className="w-full h-100 bg-card shadow" />}
        >
          <ProductsChartContainer />
        </Suspense>
      </div>
    </>
  );
}
