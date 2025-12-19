"use client";

import { usePathname, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import { getPaginationArray } from "~/lib/utils";

export function PaginationBar({ totalPages }: { totalPages: number }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const page = Number(searchParams.get("page")) || 1;

  function createPageUrl(page: number) {
    const params = new URLSearchParams(searchParams);

    params.set("page", String(page));

    return `${pathname}?${params.toString()}`;
  }

  const paginationArray = getPaginationArray(page, totalPages);

  return (
    <div className="flex flex-col gap-6 sm:flex-row items-center justify-between px-8 py-6">
      {totalPages > 0 && (
        <p className="text-xs text-gray-600">
          Currently on {page} of {totalPages} pages
        </p>
      )}
      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          {page > 1 && (
            <PaginationItem>
              <PaginationPrevious href={createPageUrl(page - 1)} />
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
                    href={createPageUrl(pagination)}
                  >
                    {pagination}
                  </PaginationLink>
                )}
              </PaginationItem>
            );
          })}

          {page < totalPages && (
            <PaginationItem>
              <PaginationNext href={createPageUrl(page + 1)} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
