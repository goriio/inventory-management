import { Plus, Search } from "lucide-react";
import { AppHeader } from "~/components/app-header";
import { Button } from "~/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "~/components/ui/input-group";

import { ProductTable } from "./components/product-table";
import { PaginationBar } from "./components/pagination-bar";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const page = Number((await searchParams).page) || 1;

  return (
    <>
      <AppHeader title="Inventory" />
      <div className="max-w-7xl w-full mx-auto p-4 md:px-8">
        <div className="bg-card rounded-lg overflow-hidden border border-border">
          <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 px-8 py-6">
            <InputGroup className="max-w-md">
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
              <InputGroupInput
                className="max-w-md"
                placeholder="Search for products..."
              />
            </InputGroup>
            <Button className="w-full sm:w-auto">
              <Plus /> Add Product
            </Button>
          </div>
          <ProductTable page={page} />
          <PaginationBar page={page} />
        </div>
      </div>
    </>
  );
}
