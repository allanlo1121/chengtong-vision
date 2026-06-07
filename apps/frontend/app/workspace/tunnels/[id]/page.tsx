import { Metadata } from "next";

export const metadata: Metadata = {
  title: "隧道管理",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <div>Home</div>;
}
