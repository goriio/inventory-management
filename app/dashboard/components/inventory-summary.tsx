import { HandCoins, Package } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { getInventorySummary } from "~/data/dashboard";

export async function InventorySummary() {
  const { quantityInHand, totalValue } = await getInventorySummary();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory Summary</CardTitle>
        <CardDescription>
          Overview of inventory, showing quantity on hand and the total value of
          all products.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2 p-4 bg-gray-50 rounded-lg">
          <Package className="text-yellow-500" size={36} />
          <p className="text-sm text-gray-700">Quantity in Hand</p>
          <p className="mt-auto text-xl font-bold text-gray-900">
            {Number(quantityInHand).toLocaleString()}
          </p>
        </div>
        <div className="flex flex-col gap-2 p-4 bg-gray-50 rounded-lg">
          <HandCoins className="text-green-500" size={36} />
          <p className="text-sm text-gray-700">Total Value</p>
          <p className="mt-auto text-xl font-bold text-gray-900">
            PHP {totalValue.toLocaleString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
