import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { Tooltip, TooltipContent } from "~/components/ui/tooltip";
import { Suspense } from "react";
import { SalesTableBodySkeleton } from "./sales-table-body-skeleton";
// import { EditsaleForm } from "./edit-sale-form";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "~/components/ui/empty";
import { Users, UserX } from "lucide-react";
import { getSales } from "~/data/sales";
import { AddSale } from "./add-sale";
import { getAllCustomers } from "~/data/customers";
import { getAllProducts } from "~/data/products";
// import { getsales } from "~/data/sales";
// import { Addsale } from "./add-sale";
// import { Deletesale } from "./delete-sale";
// import { Editsale } from "./edit-sale";

export function SalesTable({ page, query }: { page: number; query: string }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left border-b border-background">
            <th className="px-8 py-4 text-xs uppercase text-gray-600">
              Sale Id
            </th>
            <th className="px-8 py-4 text-xs uppercase text-gray-600">
              Product Name
            </th>
            <th className="px-8 py-4 text-xs uppercase text-gray-600">
              Customer Name
            </th>
            <th className="px-8 py-4 text-xs uppercase text-gray-600">
              Quantity
            </th>
            <th className="px-8 py-4 text-xs uppercase text-gray-600">
              Total Price
            </th>
            <th className="px-8 py-4 text-xs uppercase text-gray-600">Date</th>
          </tr>
        </thead>
        <Suspense
          key={`${page}-${query}`}
          fallback={<SalesTableBodySkeleton />}
        >
          <SalesTableBody page={page} query={query} />
        </Suspense>
      </table>
    </div>
  );
}

async function SalesTableBody({
  page,
  query,
}: {
  page: number;
  query: string;
}) {
  const sales = await getSales({ page, query });
  const customers = await getAllCustomers();
  const products = await getAllProducts();

  if (query && sales.length === 0)
    return (
      <tbody>
        <tr>
          <td className="max-w-lg h-96 mx-auto text-center" colSpan={7}>
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <UserX />
                </EmptyMedia>
                <EmptyTitle>No results for: {query}</EmptyTitle>
                <EmptyDescription>
                  We couldn&apos;t find anything that matches your search.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </td>
        </tr>
      </tbody>
    );

  if (!query && sales.length === 0) {
    return (
      <tbody>
        <td className="max-w-lg h-96 mx-auto text-center" colSpan={7}>
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Users />
              </EmptyMedia>
              <EmptyTitle>No sales Yet</EmptyTitle>
              <EmptyDescription>
                You haven&apos;t created a sale yet. Get started by creating a
                new sale.
              </EmptyDescription>
              <EmptyContent>
                <AddSale products={products} customers={customers} />
              </EmptyContent>
            </EmptyHeader>
          </Empty>
        </td>
      </tbody>
    );
  }

  return (
    <tbody>
      {sales.map((sale) => {
        return (
          <tr
            key={sale.sales.id}
            className="border-b border-background text-sm"
          >
            <td className="px-8 py-4">{sale.sales.id}</td>
            <td className="px-8 py-4">{sale.products.name}</td>
            <td className="px-8 py-4">{sale.customers.name}</td>
            <td className="px-8 py-4 text-center">{sale.sales.quantity}</td>
            <td className="px-8 py-4 text-right">
              PHP {sale.sales.totalPrice.toFixed(2)}
            </td>
            <td className="px-8 py-4 text-right">
              {new Date(sale.sales.createdAt).toDateString()}
            </td>
            <td className="px-8 py-4">
              <div className="flex items-center gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    {/* <Editsale sale={sale} /> */}
                  </TooltipTrigger>
                  <TooltipContent>Edit</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    {/* <Deletesale id={sale.id} /> */}
                  </TooltipTrigger>
                  <TooltipContent>Delete</TooltipContent>
                </Tooltip>
              </div>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}
