"use client";

import { ReactNode } from "react";
import { EmptyState } from "./empty-state";
import { ErrorBlock } from "./error-block";
import { TableSkeleton } from "./loading-skeleton";

type PageMode = "page" | "table";

interface PageStateProps<T> {
  loading?: boolean;
  error?: string | null;
  forbidden?: boolean;
  data?: T | null;
  isEmpty?: boolean;
  isFilteredEmpty?: boolean;

  emptyTitle?: string;
  emptyDescription?: string;

  noResultTitle?: string;
  noResultDescription?: string;

  mode?: PageMode;

  onRetry?: () => void;

  children: ReactNode;
}

export function PageState<T>({
  loading,
  error,
  forbidden,
  data,
  isEmpty,
  isFilteredEmpty,
  emptyTitle = "No data",
  emptyDescription = "There is no data available.",
  noResultTitle = "No results found",
  noResultDescription = "Try adjusting your filters.",
  mode = "page",
  onRetry,
  children,
}: PageStateProps<T>) {
  // 1️⃣ Loading
  if (loading) {
    return <TableSkeleton />;
  }

  // 2️⃣ 权限拦截
  if (forbidden) {
    return (
      <ErrorBlock title="Access denied" message="You do not have permission to view this page." />
    );
  }

  // 3️⃣ 错误
  if (error) {
    return <ErrorBlock message={error} retry={onRetry} />;
  }

  if (!data) return null;

  // 4️⃣ 无数据（初始化空）
  if (isEmpty) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  // 5️⃣ 有数据但筛选无结果
  if (isFilteredEmpty) {
    return <EmptyState title={noResultTitle} description={noResultDescription} />;
  }

  if (mode === "table") {
    return <>{children}</>;
  }

  // 6️⃣ 正常数据
  return <>{children}</>;
}
