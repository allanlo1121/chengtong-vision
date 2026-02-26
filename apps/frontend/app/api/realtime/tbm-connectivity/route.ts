// app/api/tbm-connectivity/route.ts
import { fetchTbmConnectivity } from "@/services/tbm-connectivity/queries";

export async function GET() {
  console.log("fetchTbmConnectivity---");

  const data = await fetchTbmConnectivity();
  console.log("tbmConnectivity", data);

  return Response.json(data);
}
