import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import { getProductsPages } from "~/data/products";
import { getPaginationArray } from "~/lib/utils";

export async function PaginationBar({ page }: { page: number }) {
  const totalPages = await getProductsPages();

  const paginationArray = getPaginationArray(page, totalPages);
  return (
    <div className="flex flex-col gap-6 sm:flex-row items-center justify-between px-8 py-6">
      <p className="text-xs text-gray-600">
        Currently on {page} of {totalPages} pages
      </p>
      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          {page > 1 && (
            <PaginationItem>
              <PaginationPrevious
                href={`/dashboard/inventory?page=${page - 1}`}
              />
            </PaginationItem>
          )}
          {paginationArray.map((pagination, index) => {
            return (
              <PaginationItem key={`${pagination}-${index}`}>
                {pagination === "..." ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    isActive={pagination === page}
                    href={`/dashboard/inventory?page=${pagination}`}
                  >
                    {pagination}
                  </PaginationLink>
                )}
              </PaginationItem>
            );
          })}

          {page < totalPages && (
            <PaginationItem>
              <PaginationNext href={`/dashboard/inventory?page=${page + 1}`} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
