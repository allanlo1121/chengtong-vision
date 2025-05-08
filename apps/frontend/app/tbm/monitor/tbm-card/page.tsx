import React from "react";
//import { ITbmMainInfo } from "@/lib/tbm/tbmDataTypes";
//import { TbmCard } from "@/components/tbm/dashboard/TbmOverviewCard";
import { fetchActivatedTbms } from "@/lib/tbm_del/data";
// import {
//   //fetchProjectByProjectId,
//   fetchSubProjectByTbmcode,
// } from "@/lib/project/project-data";

export default async function Page() {
  const activatedTbms = await fetchActivatedTbms();
//  const subProjects = [];
 // const projects = [];
  // for (let i = 0; i < activatedTbms.length; i++) {
  //   const subProject = await fetchSubProjectByTbmcode(activatedTbms[i].code);
  //   subProjects.push(subProject);
  // }

  // for (let i = 0; i < subProjects.length; i++) {
  //   const project = await fetchProjectByProjectId(subProjects[i].projectId);
  //   projects.push(project);
  // }

  //console.log("projects", projects);
 // console.log("subProjects", subProjects);
  console.log("tbmInfos", activatedTbms);

  console.log("tbmcodes", activatedTbms);

  return (
    <div>
       tbm-card
    </div>
  );
}
