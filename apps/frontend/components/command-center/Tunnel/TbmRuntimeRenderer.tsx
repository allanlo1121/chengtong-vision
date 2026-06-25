import { TbmPhaseType } from "@/lib/domain/command-center/types";
import ThrustMode from "./ThrustMode";
import SegmentBuildMode from "./SegmentBuildMode";
import StopMode from "./StopMode";
import OfflineMode from "./OfflineMode";

interface Props {
  status: TbmPhaseType;
}

export default function TbmRuntimeRenderer({ status }: Props) {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[160px]">
      {renderMode(status)}
    </div>
  );
}

function renderMode(status: TbmPhaseType) {
  switch (status) {
    case "offline":
      return <OfflineMode />;
    case "stop":
      return <StopMode />;
    case "advance":
      return <ThrustMode />;
    case "assembly":
      return <SegmentBuildMode />;
    default:
      return <div className="w-20 h-20 bg-gray-200 rounded-full" />;
  }
}
