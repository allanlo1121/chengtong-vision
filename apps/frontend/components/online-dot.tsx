import { Tooltip, TooltipContent, TooltipTrigger } from "@frontend/components/ui/tooltip";

type OnlineStatus = boolean | null;

const config: Record<string, { color: string; label: string }> = {
  true: { color: "bg-green-500", label: "在线" },
  false: { color: "bg-red-500", label: "掉线" },
  null: { color: "bg-gray-400", label: "未监测" },
};

function OnlineDot({ value }: { value: OnlineStatus }) {
  const current = config[String(value)];

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className={`inline-block h-2.5 w-2.5 rounded-full ${current.color}`} />
      </TooltipTrigger>
      <TooltipContent>{current.label}</TooltipContent>
    </Tooltip>
  );
}

export default OnlineDot;
