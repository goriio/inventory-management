import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPaginationArray(
  page: number,
  totalPages: number
): (number | "...")[] {
  const paginations: (number | "...")[] = [];

  if (totalPages <= 7) {
    for (let p = 1; p <= totalPages; p++) {
      paginations.push(p);
    }
  } else {
    if (page < 3) {
      paginations.push(1, 2, 3, "...", totalPages);
    } else if (page > totalPages - 2) {
      paginations.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
    } else {
      paginations.push(1, "...", page - 1, page, page + 1, "...", totalPages);
    }
  }

  return paginations;
}
