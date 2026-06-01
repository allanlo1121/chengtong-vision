// app/api/organizations/tree/rout.ts

import { NextRequest } from "next/server";
import { getTreeNodes } from "@/lib/domain/organization/tree";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  console.log(
    "Received request for organization tree with params:",
    Object.fromEntries(searchParams.entries())
  ); // ⭐

  const source = searchParams.get("source");
  const parentId = searchParams.get("parentId");

  console.log("source:", source, "parentId:", parentId); // ⭐

  // 👉 可以扩展多树
  if (source === "organization") {
    const res = await getTreeNodes(parentId || null);
    return Response.json(res);
  }

  return Response.json({
    success: false,
    message: "unknown source",
  });
}
