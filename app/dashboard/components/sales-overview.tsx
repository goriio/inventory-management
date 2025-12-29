import { BadgeDollarSign, Boxes, CirclePercent, Handbag } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { getSalesOverview } from "~/data/dashboard";
import { TrendIndicator } from "./trend-indicator";
import { formatPrice } from "~/lib/format";

export async function SalesOverview() {
  const { totalSales, revenue, unitsSold } = await getSalesOverview();

  const averageOrderValueCurrent =
    Number(revenue.current) / Number(totalSales.current) || 0;
  const averageOrderValuePrevious =
    Number(revenue.previous) / Number(totalSales.previous) || 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Overview</CardTitle>
        <CardDescription>
          Shows the past 7 days&apos; value with trend indicator compared to the
          previous week.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-500/10 rounded-md">
            <Handbag className="text-purple-500" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-700">Total Sales</p>
            <div className="flex items-center gap-1">
              <p className="mt-auto text-lg font-bold text-gray-900">
                {Number(totalSales.current).toLocaleString()}
              </p>
              <TrendIndicator
                current={Number(totalSales.current)}
                previous={Number(totalSales.previous)}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-500/10 rounded-md">
            <BadgeDollarSign className="text-green-500" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-700">Revenue</p>
            <div className="flex items-center gap-1">
              <p className="mt-auto text-lg font-bold text-gray-900">
                PHP {formatPrice(Number(revenue.current))}
              </p>
              <TrendIndicator
                current={Number(revenue.current)}
                previous={Number(revenue.previous)}
                isPercentage
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-yellow-500/10 rounded-md">
            <Boxes className="text-yellow-500" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-700">Units Sold</p>
            <div className="flex items-center gap-1">
              <p className="mt-auto text-lg font-bold text-gray-900">
                {Number(unitsSold.current).toLocaleString()}
              </p>
              <TrendIndicator
                current={Number(unitsSold.current)}
                previous={Number(unitsSold.previous)}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-500/10 rounded-md">
            <CirclePercent className="text-orange-500" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-700">Average Order Value</p>
            <div className="flex items-center gap-1">
              <p className="mt-auto text-lg font-bold text-gray-900">
                PHP {formatPrice(averageOrderValueCurrent)}
              </p>
              <TrendIndicator
                current={Number(averageOrderValueCurrent)}
                previous={Number(averageOrderValuePrevious)}
                isPercentage
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
