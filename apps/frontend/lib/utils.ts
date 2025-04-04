import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generatePagination = (
  currentPage: number,
  totalPages: number
): (number | string)[] => {
  // Case 1: Total pages is 7 or less -> Show all pages
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | string)[] = [];

  // Case 2: Current page is in the first 4 pages
  if (currentPage <= 4) {
    pages.push(...[1, 2, 3, 4, 5, "...", totalPages]);
  }
  // Case 3: Current page is in the last 4 pages
  else if (currentPage >= totalPages - 3) {
    pages.push(...[1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]);
  }
  // Case 4: Current page is in the middle
  else {
    pages.push(
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages
    );
  }

  return pages;
};


export function cleanNullValues<T>(data: T): T {
  return JSON.parse(
    JSON.stringify(data, (_, value) => (value === null ? "" : value))
  );
}