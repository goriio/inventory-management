import { AppHeader } from "~/components/app-header";

import { Search } from "~/components/search";
import { PaginationBar } from "~/components/pagination-bar";
import { getAllCustomers, getCustomersPages } from "~/data/customers";
import { SalesTable } from "./components/sales-table";
import { AddSale } from "./components/add-sale";
import { getAllProducts } from "~/data/products";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sales",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page: string; query: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const query = params.query || "";

  const totalPages = await getCustomersPages(query);

  const customers = await getAllCustomers();
  const products = await getAllProducts();

  return (
    <>
      <AppHeader title="Sales" />
      <div className="max-w-7xl w-full mx-auto p-4 md:px-8">
        <div className="bg-card rounded-lg overflow-hidden border border-border">
          <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 px-8 py-6">
            <Search placeholder="Search for sales..." />
            <AddSale customers={customers} products={products} />
          </div>
          <SalesTable page={page} query={query} />
          <PaginationBar totalPages={totalPages} />
        </div>
      </div>
    </>
  );
}
