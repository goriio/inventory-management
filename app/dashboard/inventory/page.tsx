import { AppHeader } from "~/components/app-header";

import { ProductTable } from "./components/product-table";
import { PaginationBar } from "./components/pagination-bar";
import { AddProduct } from "./components/add-product";
import { Search } from "~/components/search";
import { getProductsPages } from "~/data/products";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page: string; query: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const query = params.query || "";

  const totalPages = await getProductsPages(query);

  return (
    <>
      <AppHeader title="Inventory" />
      <div className="max-w-7xl w-full mx-auto p-4 md:px-8">
        <div className="bg-card rounded-lg overflow-hidden border border-border">
          <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 px-8 py-6">
            <Search placeholder="Search for products..." />
            <AddProduct />
          </div>
          <ProductTable page={page} query={query} />
          <PaginationBar totalPages={totalPages} />
        </div>
      </div>
    </>
  );
}
