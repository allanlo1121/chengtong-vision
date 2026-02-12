import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CheckCircle,
  Circle,
  CircleOff,
  HelpCircle,
  Timer,
  CirclePause,
  TrainFront,
  TrainTrack,
  House,
  Waves,
  Building,
  GalleryVertical,
  Layers,
} from "lucide-react";

export const tunnelStatuses = [
  {
    value: "未开始",
    label: "未开始",
    icon: Circle,
  },
  {
    value: "正在施工",
    label: "正在施工",
    icon: Timer,
  },
  {
    value: "已完成",
    label: "已完成",
    icon: CheckCircle,
  },
];

export const tunnelTypes = [
  {
    label: "城市轨道",
    value: "城市轨道交通工程",
    icon: TrainFront,
  },
  {
    label: "铁路工程",
    value: "铁路工程",
    icon: TrainTrack,
  },
  {
    label: "水利水电",
    value: "水利水电工程",
    icon: Waves,
  },
  {
    label: "公路工程",
    value: "公路工程",
    icon: GalleryVertical,
  },
  {
    label: "其他工程",
    value: "其他工程",
    icon: Layers,
  },
  {
    label: "市政工程",
    value: "市政工程",
    icon: Building,
  },
  {
    label: "房建工程",
    value: "房建工程",
    icon: House,
  },
];

export const regionNames = [
  { value: "京津冀区域", label: "京津冀区域" },
  { value: "北方区域", label: "北方区域" },
  { value: "晋鲁豫区域", label: "晋鲁豫区域" },
  { value: "西部区域", label: "西部区域" },
  { value: "华东区域", label: "华东区域" },
  { value: "华南区域", label: "华南区域" },
  { value: "中南区域", label: "中南区域" },
  { value: "西南区域", label: "西南区域" },
  { value: "川渝区域", label: "川渝区域" },
  { value: "海外区域", label: "海外区域" },
];
