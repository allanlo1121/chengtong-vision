import { Tbm } from "@/lib/domain/tbm/types";

import { TbmAssignmentCard } from "../cards/TbmAssignmentCard";

export default async function TbmAssignmentTab({ tbm }: { tbm: Tbm }) {
  return (
    <div>
      <TbmAssignmentCard tbm={tbm} />
    </div>
  );
}
