import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { Tooltip, TooltipContent } from "~/components/ui/tooltip";
import { Suspense } from "react";
import { CustomerTableBodySkeleton } from "./customer-table-body-skeleton";
// import { EditcustomerForm } from "./edit-customer-form";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "~/components/ui/empty";
import { Users, UserX } from "lucide-react";
import { getCustomers } from "~/data/customers";
import { AddCustomer } from "./add-customer";
import { DeleteCustomer } from "./delete-customer";
import { EditCustomer } from "./edit-customer";

export function CustomerTable({
  page,
  query,
}: {
  page: number;
  query: string;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left border-b border-background">
            <th className="px-8 py-4 text-xs uppercase text-gray-600">Name</th>
            <th className="px-8 py-4 text-xs uppercase text-gray-600">Email</th>
            <th className="px-8 py-4 text-xs uppercase text-gray-600">
              Phone Number
            </th>
            <th></th>
          </tr>
        </thead>
        <Suspense
          key={`${page}-${query}`}
          fallback={<CustomerTableBodySkeleton />}
        >
          <CustomerTableBody page={page} query={query} />
        </Suspense>
      </table>
    </div>
  );
}

async function CustomerTableBody({
  page,
  query,
}: {
  page: number;
  query: string;
}) {
  const customers = await getCustomers({ page, query });

  if (query && customers.length === 0)
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

  if (!query && customers.length === 0) {
    return (
      <tbody>
        <td className="max-w-lg h-96 mx-auto text-center" colSpan={7}>
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Users />
              </EmptyMedia>
              <EmptyTitle>No Customers Yet</EmptyTitle>
              <EmptyDescription>
                You haven&apos;t created a customer yet. Get started by creating
                a new customer.
              </EmptyDescription>
              <EmptyContent>
                <AddCustomer />
              </EmptyContent>
            </EmptyHeader>
          </Empty>
        </td>
      </tbody>
    );
  }

  return (
    <tbody>
      {customers.map((customer) => {
        return (
          <tr key={customer.id} className="border-b border-background text-sm">
            <td className="px-8 py-4">{customer.name}</td>
            <td className="px-8 py-4">{customer.email}</td>
            <td className="px-8 py-4">{customer.phoneNumber || "-"}</td>
            <td className="px-8 py-4">
              <div className="flex items-center gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <EditCustomer customer={customer} />
                  </TooltipTrigger>
                  <TooltipContent>Edit</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DeleteCustomer id={customer.id} />
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
