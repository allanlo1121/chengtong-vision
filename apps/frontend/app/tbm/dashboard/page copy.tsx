"use client";

import React, { useState } from "react";
import { ITBMStatus, ISubProject } from "@/lib/tbm_del/types";
import TbmStatusCard from "@/components/tbm/dashboard/TbmOverviewCard";
import { subProjects } from "@/lib/tbm_del/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Page() {
  const tbmData: ITBMStatus[] = [
    {
      tbmCode: "TBM-001",
      tbmLabel: "中铁装备988",
      tbmStatus: Math.floor(Math.random() * 4),
      tbmProgressToday: 4,
      tbmTPlanToday: 6,
      tbmProgressThisWeek: 24,
      tbmTPlanThisWeek: 30,
      tbmProgressThisMonth: 44,
      tbmTPlanThisMonth: 100,
      tbmProgressThisYear: 150,
      tbmTPlanThisYear: 600,
      tbmProgressTotal: 700,
      tbmTPlanTotal: 1000,
      tbmProjectName: "深大城际2-2标项目部",
      tbmSection: "五和站~五白1#工作井右线",
      tbmCurrentRing: 100,
      tbmAdvanceSpeed: 10,
      areaName: "华南地区",
    },
    {
      tbmCode: "TBM-002",
      tbmLabel: "中铁装备999",
      tbmStatus: Math.floor(Math.random() * 4),
      tbmProgressToday: 2,
      tbmTPlanToday: 5,
      tbmProgressThisWeek: 10,
      tbmTPlanThisWeek: 20,
      tbmProgressThisMonth: 30,
      tbmTPlanThisMonth: 50,
      tbmProgressThisYear: 100,
      tbmTPlanThisYear: 200,
      tbmProgressTotal: 300,
      tbmTPlanTotal: 500,
      tbmProjectName: "深大城际2-2标项目部",
      tbmSection: "五和站~五白1#工作井左线",
      tbmCurrentRing: 200,
      tbmAdvanceSpeed: 5,
      areaName: "华南地区",
    },
    {
      tbmCode: "TBM-003",
      tbmLabel: "中铁装备982",
      tbmStatus: Math.floor(Math.random() * 4),
      tbmProgressToday: 2,
      tbmTPlanToday: 5,
      tbmProgressThisWeek: 10,
      tbmTPlanThisWeek: 20,
      tbmProgressThisMonth: 30,
      tbmTPlanThisMonth: 50,
      tbmProgressThisYear: 100,
      tbmTPlanThisYear: 200,
      tbmProgressTotal: 300,
      tbmTPlanTotal: 500,
      tbmProjectName: "深大城际2-2标项目部",
      tbmSection: "五和站~五白1#工作井左线",
      tbmCurrentRing: 200,
      tbmAdvanceSpeed: 5,
      areaName: "华东地区",
    },
    {
      tbmCode: "TBM-003",
      tbmLabel: "中铁装备982",
      tbmStatus: Math.floor(Math.random() * 4),
      tbmProgressToday: 2,
      tbmTPlanToday: 5,
      tbmProgressThisWeek: 10,
      tbmTPlanThisWeek: 20,
      tbmProgressThisMonth: 30,
      tbmTPlanThisMonth: 50,
      tbmProgressThisYear: 100,
      tbmTPlanThisYear: 200,
      tbmProgressTotal: 300,
      tbmTPlanTotal: 500,
      tbmProjectName: "深大城际2-2标项目部",
      tbmSection: "五和站~五白1#工作井左线",
      tbmCurrentRing: 200,
      tbmAdvanceSpeed: 5,
      areaName: "华东地区",
    },
    {
      tbmCode: "TBM-001",
      tbmLabel: "中铁装备988",
      tbmStatus: Math.floor(Math.random() * 4),
      tbmProgressToday: 4,
      tbmTPlanToday: 6,
      tbmProgressThisWeek: 24,
      tbmTPlanThisWeek: 30,
      tbmProgressThisMonth: 44,
      tbmTPlanThisMonth: 100,
      tbmProgressThisYear: 150,
      tbmTPlanThisYear: 600,
      tbmProgressTotal: 700,
      tbmTPlanTotal: 1000,
      tbmProjectName: "深大城际2-2标项目部",
      tbmSection: "五和站~五白1#工作井右线",
      tbmCurrentRing: 100,
      tbmAdvanceSpeed: 10,
      areaName: "西南地区",
    },
    {
      tbmCode: "TBM-002",
      tbmLabel: "中铁装备999",
      tbmStatus: Math.floor(Math.random() * 4),
      tbmProgressToday: 2,
      tbmTPlanToday: 5,
      tbmProgressThisWeek: 10,
      tbmTPlanThisWeek: 20,
      tbmProgressThisMonth: 30,
      tbmTPlanThisMonth: 50,
      tbmProgressThisYear: 100,
      tbmTPlanThisYear: 200,
      tbmProgressTotal: 300,
      tbmTPlanTotal: 500,
      tbmProjectName: "深大城际2-2标项目部",
      tbmSection: "五和站~五白1#工作井左线",
      tbmCurrentRing: 200,
      tbmAdvanceSpeed: 5,
      areaName: "华中地区",
    },
    {
      tbmCode: "TBM-003",
      tbmLabel: "中铁装备982",
      tbmStatus: Math.floor(Math.random() * 4),
      tbmProgressToday: 2,
      tbmTPlanToday: 5,
      tbmProgressThisWeek: 10,
      tbmTPlanThisWeek: 20,
      tbmProgressThisMonth: 30,
      tbmTPlanThisMonth: 50,
      tbmProgressThisYear: 100,
      tbmTPlanThisYear: 200,
      tbmProgressTotal: 300,
      tbmTPlanTotal: 500,
      tbmProjectName: "深大城际2-2标项目部",
      tbmSection: "五和站~五白1#工作井左线",
      tbmCurrentRing: 200,
      tbmAdvanceSpeed: 5,
      areaName: "华中地区",
    },
    {
      tbmCode: "TBM-003",
      tbmLabel: "中铁装备982",
      tbmStatus: Math.floor(Math.random() * 4),
      tbmProgressToday: 2,
      tbmTPlanToday: 5,
      tbmProgressThisWeek: 10,
      tbmTPlanThisWeek: 20,
      tbmProgressThisMonth: 30,
      tbmTPlanThisMonth: 50,
      tbmProgressThisYear: 100,
      tbmTPlanThisYear: 200,
      tbmProgressTotal: 300,
      tbmTPlanTotal: 500,
      tbmProjectName: "深大城际2-2标项目部",
      tbmSection: "五和站~五白1#工作井左线",
      tbmCurrentRing: 200,
      tbmAdvanceSpeed: 5,
      areaName: "华东地区",
    },
    {
      tbmCode: "TBM-003",
      tbmLabel: "中铁装备982",
      tbmStatus: Math.floor(Math.random() * 4),
      tbmProgressToday: 2,
      tbmTPlanToday: 5,
      tbmProgressThisWeek: 10,
      tbmTPlanThisWeek: 20,
      tbmProgressThisMonth: 30,
      tbmTPlanThisMonth: 50,
      tbmProgressThisYear: 100,
      tbmTPlanThisYear: 200,
      tbmProgressTotal: 300,
      tbmTPlanTotal: 500,
      tbmProjectName: "深大城际2-2标项目部",
      tbmSection: "五和站~五白1#工作井左线",
      tbmCurrentRing: 200,
      tbmAdvanceSpeed: 5,
      areaName: "华东地区",
    },
    {
      tbmCode: "TBM-003",
      tbmLabel: "中铁装备982",
      tbmStatus: Math.floor(Math.random() * 4),
      tbmProgressToday: 2,
      tbmTPlanToday: 5,
      tbmProgressThisWeek: 10,
      tbmTPlanThisWeek: 20,
      tbmProgressThisMonth: 30,
      tbmTPlanThisMonth: 50,
      tbmProgressThisYear: 100,
      tbmTPlanThisYear: 200,
      tbmProgressTotal: 300,
      tbmTPlanTotal: 500,
      tbmProjectName: "深大城际2-2标项目部",
      tbmSection: "五和站~五白1#工作井左线",
      tbmCurrentRing: 200,
      tbmAdvanceSpeed: 5,
      areaName: "西南地区",
    },
    {
      tbmCode: "TBM-003",
      tbmLabel: "中铁装备982",
      tbmStatus: Math.floor(Math.random() * 4),
      tbmProgressToday: 2,
      tbmTPlanToday: 5,
      tbmProgressThisWeek: 10,
      tbmTPlanThisWeek: 20,
      tbmProgressThisMonth: 30,
      tbmTPlanThisMonth: 50,
      tbmProgressThisYear: 100,
      tbmTPlanThisYear: 200,
      tbmProgressTotal: 300,
      tbmTPlanTotal: 500,
      tbmProjectName: "深大城际2-2标项目部",
      tbmSection: "五和站~五白1#工作井左线",
      tbmCurrentRing: 200,
      tbmAdvanceSpeed: 5,
      areaName: "东北地区",
    },
    {
      tbmCode: "TBM-004",
      tbmLabel: "中铁装备982",
      tbmStatus: Math.floor(Math.random() * 4),
      tbmProgressToday: 2,
      tbmTPlanToday: 5,
      tbmProgressThisWeek: 10,
      tbmTPlanThisWeek: 20,
      tbmProgressThisMonth: 30,
      tbmTPlanThisMonth: 50,
      tbmProgressThisYear: 100,
      tbmTPlanThisYear: 200,
      tbmProgressTotal: 300,
      tbmTPlanTotal: 500,
      tbmProjectName: "深大城际2-2标项目部",
      tbmSection: "五和站~五白1#工作井左线",
      tbmCurrentRing: 200,
      tbmAdvanceSpeed: 5,
      areaName: "东北地区",
    },
  ];

  const [selectedArea, setSelectedArea] = useState<string>("所有地区");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const areaOptions = [
    "所有地区",
    ...new Set(tbmData.map((item) => item.areaName)),
  ];
  const statusOptions = [
    { label: "全部状态", value: "all" },
    { label: "掘进中", value: "1" },
    { label: "拼装中", value: "2" },
    { label: "停机中", value: "3" },
    { label: "待命", value: "0" },
  ];

  const filteredData = tbmData.filter((item) => {
    const areaMatch =
      selectedArea === "所有地区" || item.areaName === selectedArea;
    const statusMatch =
      selectedStatus === "all" || item.tbmStatus === Number(selectedStatus);
    return areaMatch && statusMatch;
  });
  return (
    <div className="w-full h-full flex flex-col items-center justify-start">
      <div className="w-full h-8 flex flex-row bg-gray-200">
        <Select onValueChange={setSelectedArea}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="选择区域" />
          </SelectTrigger>
          <SelectContent>
            {areaOptions.map((area) => (
              <SelectItem key={area} value={area}>
                {area}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* 状态筛选 */}
        <Select onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="盾构机状态" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((status) => (
              <SelectItem key={status.value} value={status.value}>
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-4 gap-4 p-4">
        {/* {filteredData.map((tbmData, index) => (
          <TbmTab key={index} {...tbmData} />
        ))} */}
        <TbmStatusCard />
      </div>
    </div>
  );
}
