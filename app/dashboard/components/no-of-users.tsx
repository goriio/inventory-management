import { UserPlus, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { getNoOfUsers } from "~/data/dashboard";

export async function NoOfUsers() {
  const { totalCustomers } = await getNoOfUsers();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Number Of Users</CardTitle>
        <CardDescription>
          Shows total customers and the count of new customers added in the past
          7 days.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2 p-4 bg-gray-50 rounded-lg">
          <UserPlus className="text-blue-500" size={36} />
          <p className="text-sm text-gray-700">New Customers</p>
          <p className="mt-auto text-xl font-bold text-gray-900">
            {Number(totalCustomers).toLocaleString()}
          </p>
        </div>
        <div className="flex flex-col gap-2 p-4 bg-gray-50 rounded-lg">
          <Users className="text-blue-500" size={36} />
          <p className="text-sm text-gray-700">Total Customers</p>
          <p className="mt-auto text-xl font-bold text-gray-900">
            {Number(totalCustomers).toLocaleString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
