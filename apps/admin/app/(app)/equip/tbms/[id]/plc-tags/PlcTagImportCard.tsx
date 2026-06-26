"use client";

import { useRef } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { parseImportFile } from "./parsers/parseImportFile";
import { importTbmPlcTagsAction } from "@/lib/domain/tbm-runtime/actions/";

export function PlcTagImportCard({ tbmId }: { tbmId: string }) {
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const result = await parseImportFile(file);

    console.log("ImportTbmPlcTagInput", result);

    await importTbmPlcTagsAction(tbmId, result);
  }

  return (
    <HoverCard openDelay={100} closeDelay={100}>
      <HoverCardTrigger>
        <Button onClick={() => inputRef.current?.click()}>选择导入文件</Button>

        <Input
          ref={inputRef}
          type="file"
          accept=".xlsx,.xls,.csv,.xml"
          className="hidden"
          onChange={handleFileChange}
        />
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex flex-col gap-1">
          <h4 className="font-medium">导入盾构机PLC地址文件</h4>
          <p>支持 .xlsx, .xls, .csv, .xml 文件格式</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
