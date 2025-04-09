import React from "react";
import { TbmCard } from "@/components/tbm/tbmCard";
import { fetchActivatedTbms } from "@/lib/tbm/tbm-data";

export default async function Page() {
  const tbmcodes = await fetchActivatedTbms();
  console.log("tbmcodes", tbmcodes);
  
  return (
    <div>
      <TbmCard tbmcodes={tbmcodes} />
    </div>
  );
}
