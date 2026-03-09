"use client";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem as Item,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

interface Props {
  breadcrumbs: BreadcrumbItem[];
}

export function Breadcrumbs({ breadcrumbs }: Props) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((b, i) => (
          <React.Fragment key={i}>
            <Item>
              {b.active ? (
                <BreadcrumbPage>{b.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={b.href!}>{b.label}</BreadcrumbLink>
              )}
            </Item>
            {i < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
