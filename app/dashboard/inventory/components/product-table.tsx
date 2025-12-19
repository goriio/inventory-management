import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { Tooltip, TooltipContent } from "~/components/ui/tooltip";
import { DeleteProduct } from "./delete-product";
import { getProducts } from "~/data/products";
import { Suspense } from "react";
import { ProductTableBodySkeleton } from "./product-table-body-skeleton";
import { EditProduct } from "./edit-product";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "~/components/ui/empty";
import { PackageSearch, ShoppingCart } from "lucide-react";
import { AddProduct } from "./add-product";

export function ProductTable({ page, query }: { page: number; query: string }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left border-b border-background">
            <th className="px-8 py-4 text-xs uppercase text-gray-600">Name</th>
            <th className="px-8 py-4 text-xs uppercase text-gray-600">
              Description
            </th>
            <th className="px-8 py-4 text-xs uppercase text-gray-600">
              Quantity
            </th>
            <th className="px-8 py-4 text-xs uppercase text-gray-600">Price</th>
            <th className="px-8 py-4 text-xs uppercase text-gray-600">
              Low Stock At
            </th>
            <th className="px-8 py-4 text-xs uppercase text-gray-600">
              Created At
            </th>
          </tr>
        </thead>
        <Suspense
          key={`${page}-${query}`}
          fallback={<ProductTableBodySkeleton />}
        >
          <ProductTableBody page={page} query={query} />
        </Suspense>
      </table>
    </div>
  );
}

async function ProductTableBody({
  page,
  query,
}: {
  page: number;
  query: string;
}) {
  const products = await getProducts({ page, query });

  if (query && products.length === 0)
    return (
      <tbody>
        <tr>
          <td className="max-w-lg h-96 mx-auto text-center" colSpan={7}>
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <PackageSearch />
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

  if (!query && products.length === 0) {
    return (
      <tbody>
        <td className="max-w-lg h-96 mx-auto text-center" colSpan={7}>
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <ShoppingCart />
              </EmptyMedia>
              <EmptyTitle>No Products Yet</EmptyTitle>
              <EmptyDescription>
                You haven&apos;t created a product yet. Get started by creating
                a new product.
              </EmptyDescription>
              <EmptyContent>
                <AddProduct />
              </EmptyContent>
            </EmptyHeader>
          </Empty>
        </td>
      </tbody>
    );
  }

  return (
    <tbody>
      {products.map((product) => {
        return (
          <tr key={product.id} className="border-b border-background text-sm">
            <td className="px-8 py-4">{product.name}</td>
            <td className="px-8 py-4">
              {product.description ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p className="max-w-48 w-full line-clamp-2">
                      {product.description}
                    </p>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-60">
                    {product.description}
                  </TooltipContent>
                </Tooltip>
              ) : (
                "-"
              )}
            </td>
            <td className="px-8 py-4 text-center">{product.quantity}</td>
            <td className="px-8 py-4 text-right">
              PHP {product.price.toFixed(2)}
            </td>
            <td className="px-8 py-4 text-center">
              {product.lowStockThreshold}
            </td>
            <td className="px-8 py-4">
              {new Date(product.createdAt).toDateString()}
            </td>
            <td className="px-8 py-4">
              <div className="flex items-center gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <EditProduct product={product} />
                  </TooltipTrigger>
                  <TooltipContent>Edit</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DeleteProduct id={product.id} />
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
