import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { getProductDetails } from "~/data/dashboard";

export async function ProductDetails() {
  const { lowStockItems, outOfStockItems, noOfItems } =
    await getProductDetails();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Details</CardTitle>
        <CardDescription>
          Track low stock, out-of-stock items, and total products.
        </CardDescription>
      </CardHeader>
      <CardContent className="h-full">
        <dl className="flex flex-col gap-2 justify-between h-full">
          <div className="flex items-center justify-between">
            <dt className="text-sm text-gray-700">Low Stock Items</dt>
            <dd className="text-lg font-bold text-gray-900">
              {lowStockItems.toLocaleString()}
            </dd>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <dt className="text-sm text-gray-700">Out Of Stock Items</dt>
            <dd className="text-lg font-bold text-gray-900">
              {outOfStockItems.toLocaleString()}
            </dd>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <dt className="text-sm text-gray-700">Number Of Items</dt>
            <dd className="text-lg font-bold text-gray-900">
              {noOfItems.toLocaleString()}
            </dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
