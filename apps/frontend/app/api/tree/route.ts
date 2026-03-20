// app/api/organizations/tree/rout.ts

import { NextRequest } from "next/server";
import { getOrganizationTree } from "@/modules/organization/services";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  console.log(
    "Received request for organization tree with params:",
    Object.fromEntries(searchParams.entries())
  ); // ⭐

  const source = searchParams.get("source");
  const parentId = searchParams.get("parentId");

  // 👉 可以扩展多树
  if (source === "organization") {
    const res = await getOrganizationTree(parentId || null);
    return Response.json(res);
  }

  return Response.json({
    success: false,
    message: "unknown source",
  });
}
