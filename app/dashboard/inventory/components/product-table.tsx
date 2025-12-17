import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { Edit } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Tooltip, TooltipContent } from "~/components/ui/tooltip";
import { DeleteProduct } from "./delete-product";
import { getProducts } from "~/data/products";
import { Suspense } from "react";
import { ProductTableBodySkeleton } from "./product-table-body-skeleton";

export function ProductTable({ page }: { page: number }) {
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
        <Suspense key={page} fallback={<ProductTableBodySkeleton />}>
          <ProductTableBody page={page} />
        </Suspense>
      </table>
    </div>
  );
}

async function ProductTableBody({ page }: { page: number }) {
  const products = await getProducts({ page });

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
            <td className="px-8 py-4 text-right">{product.quantity}</td>
            <td className="px-8 py-4 text-right">
              PHP {product.price.toFixed(2)}
            </td>
            <td className="px-8 py-4 text-right">
              {product.lowStockThreshold}
            </td>
            <td className="px-8 py-4">
              {new Date(product.createdAt).toDateString()}
            </td>
            <td className="px-8 py-4">
              <div className="flex items-center gap-1">
                <Tooltip>
                  <TooltipTrigger>
                    <Button variant="ghost">
                      <Edit />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Edit</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger>
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
