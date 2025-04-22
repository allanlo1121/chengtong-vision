import { fetchActivatedSubProjects } from "@/lib/project/project-data";
import React from "react";

export default async function Page() {
  const data =await fetchActivatedSubProjects();
  console.log("data", data); // 调试输出数据

  return <div>subProjects</div>;
}
