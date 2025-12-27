import { MoveDown, MoveUp } from "lucide-react";
import { cn } from "~/lib/utils";

export function TrendIndicator({
  current,
  previous,
  isPercentage,
}: {
  current: number;
  previous: number;
  isPercentage?: boolean;
}) {
  const difference = current - previous;
  const percentage = (difference / previous) * 100;

  if (difference === 0) return null;

  return (
    <span
      className={cn(
        "flex items-center gap-0 text-xs",
        difference > 0 ? "text-green-500" : "text-red-500"
      )}
    >
      {difference > 0 ? <MoveUp size={10} /> : <MoveDown size={10} />}
      {isPercentage ? `${percentage.toFixed(2)}%` : difference}
    </span>
  );
}
