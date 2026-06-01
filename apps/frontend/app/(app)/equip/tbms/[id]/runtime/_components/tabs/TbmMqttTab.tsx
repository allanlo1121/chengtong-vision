import React from "react";
import { getErrorMessage } from "@/lib/shared/contracts/error-codes";
import { Tbm } from "@/lib/domain/tbm/types";
import { getMqttUserByTbmId } from "@/lib/domain/tbm-runtime/services";
import { TbmMqttCard, TbmMqttErrorCard } from "../cards/TbmMqttCard";
import { TbmMqttEmptyCard } from "../cards/TbmMqttEmptyCard";

export default async function TbmMqttTab({ tbm }: { tbm: Tbm }) {
  try {
    const mqtt = await getMqttUserByTbmId(tbm.id);

    console.log("===mqtt user detail===", mqtt);

    if (!mqtt) {
      return <TbmMqttEmptyCard tbm={tbm} />;
    }

    return <TbmMqttCard tbm={tbm} mqtt={mqtt} />;
  } catch (error) {
    return <TbmMqttErrorCard error={getErrorMessage(error)} />;
  }
}
