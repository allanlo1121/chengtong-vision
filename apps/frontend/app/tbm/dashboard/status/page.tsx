
import { fetchActivatedTbms, fetchTbmInfoByTbmId} from "@/lib/tbm_del/data";  // 假设这些API函数已经实现
import {  fetchSubProjectById, fetchProjectByProjectId } from "@/lib/project/data"; 


export default async  function Page() {
 
    
      const activatedTbms = await fetchActivatedTbms();  // 获取 TBM 和子项目信息
      const details = [];

      for (const item of activatedTbms) {
        // 获取每个 TBM 的详细信息
        const tbmInfo = await fetchTbmInfoByTbmId(item.tbm_id);  // 根据 tbmId 获取 TBM 信息
        const subProjectInfo = await fetchSubProjectById(item.sub_project_id);  // 根据 subProjectId 获取子项目信息

        let projectInfo = null;
        if (subProjectInfo && subProjectInfo.projectId) {
          projectInfo = await fetchProjectByProjectId(subProjectInfo.projectId);  // 根据 projectId 获取项目信息
        }

        // 收集详细信息
        details.push({
          tbmName:tbmInfo.name,
          subProjectName: subProjectInfo?.shortName,
          projectName:projectInfo?.shortName,
        });
      }

    

 

  if (!details) {
    return <div>Loading...</div>;
  }

  console.log(details);
  

  return (
    <div>
          status page
    </div>
  );
}
