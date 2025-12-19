import { Skeleton } from "~/components/ui/skeleton";

export function CustomerTableBodySkeleton() {
  return (
    <tbody>
      {Array.from({ length: 8 }).map((_, index) => {
        return (
          <tr key={index} className="border-b border-background text-sm">
            <td className="px-8 py-4" colSpan={7}>
              <Skeleton className="w-full h-10" />
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}
