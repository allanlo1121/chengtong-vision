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

import { BreadcrumbItem } from "@/lib/domain/system/breadcrumb/types";

interface Props {
  breadcrumbs: BreadcrumbItem[];
}

export function Breadcrumbs({ breadcrumbs }: Props) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((b, i) => {
          const isLast = i === breadcrumbs.length - 1;
          return (
            <React.Fragment key={i}>
              <Item>
                {b.active || isLast || !b.href ? (
                  <BreadcrumbPage>{b.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={b.href}>{b.label}</BreadcrumbLink>
                )}
              </Item>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}{" "}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
