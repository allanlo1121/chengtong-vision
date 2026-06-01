import { breadcrumbMap } from "./breadcrumbs";

export type BreadcrumbItem = {
  label: string;
  href?: string;
  active?: boolean;
};

const ignoredSegments = ["(app)", "(operations)"];

export function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname
    .split("/")
    .filter(Boolean)
    .filter((segment) => !ignoredSegments.includes(segment));

  return segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");

    const label = breadcrumbMap[segment] ?? decodeURIComponent(segment);

    return {
      label,
      href,
      active: index === segments.length - 1,
    };
  });
}
