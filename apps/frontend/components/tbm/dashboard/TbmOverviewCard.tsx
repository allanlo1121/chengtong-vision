import {
  fetchProjectByProjectId,
  fetchSubProjectById,
} from "@/lib/project/data";
import {
  ISubProject,
  IProject,
  ProjectStatus,
} from "@/lib/project/types";
import { fetchTbmInfoByTbmId } from "@/lib/tbm_del/data";
import { ITbmMainInfo } from "@/lib/tbm_del/types";
import { TbmStatusCard } from "./TbmStatusCard";
import React from "react";

export default async function TbmOverviewCard({
  tbmId,
  subProjectId,
}: {
  tbmId: number;
  subProjectId: number;
}) {
  const tbmInfo: ITbmMainInfo = await fetchTbmInfoByTbmId(tbmId);
  const subProjectInfo: ISubProject | undefined = await fetchSubProjectById(
    subProjectId
  );

  const projectInfo: IProject = {
    id: 0,
    projectName: "",
    projectLeader: "",
    shortName: "",
    startDate: null,
    endDate: null,
    projectStatus: ProjectStatus.在建,
    areaName: "",
  };

  if (subProjectInfo && subProjectInfo.projectId) {
    const data = await fetchProjectByProjectId(subProjectInfo.projectId);
    if (data) {
      projectInfo.id = data.id;
      projectInfo.projectName = data.projectName;
      projectInfo.shortName = data.shortName;
      projectInfo.areaName = data.areaName;
      projectInfo.startDate = data.startDate;
      projectInfo.endDate = data.endDate;
      projectInfo.projectStatus = data.projectStatus;
    }

    // 你可以在这里使用 projectInfo 做其他处理
  }

  console.log("tbmInfo", tbmInfo);
  console.log("subProjectInfo", subProjectInfo);
  console.log("projectInfo", projectInfo);

  if (!tbmInfo || !subProjectInfo || !projectInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-100 h-60 relative rounded-2xl shadow-lg  ">
      <main className="absolute top-0 left-0 w-full h-52  bg-blue-500/20 border-4 border-blue-500/60  flex flex-col items-center justify-center">
      <TbmStatusCard tbmId={tbmId} tbmName={tbmInfo.name} ringEnd={subProjectInfo.ringEnd} /></main>

      <footer className="absolute bottom-0 left-0 w-full h-8 bg-foreground  ">
        <div className="h-full flex  items-center  ">         
          <span className="text-gray-800 font-bold pl-4  ">
            {projectInfo.shortName}
            {subProjectInfo.shortName}
          </span>
          <span className="text-gray-600 pl-4">
            区间总长:
            {Math.abs(
              subProjectInfo.opNumStart - subProjectInfo.opNumEnd
            ).toFixed(2)}
            米
          </span>
        </div>
      </footer>
    </div>
  );
}
