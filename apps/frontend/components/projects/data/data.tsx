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

export const projectStatuses = [
  {
    value: "10200001",
    label: "未开工",
    icon: Circle,
  },
  {
    value: "10200002",
    label: "在建",
    icon: Timer,
  },
  {
    value: "10200003",
    label: "收尾",
    icon: CheckCircle,
  },
  {
    value: "10200004",
    label: "竣工",
    icon: CheckCircle,
  },
];

export const projectTypes = [
  {
    label: "城市轨道",
    value: "10110005",
    icon: TrainFront,
  },
  {
    label: "铁路工程",
    value: "10110001",
    icon: TrainTrack,
  },
  {
    label: "水利水电",
    value: "10110006",
    icon: Waves,
  },
  {
    label: "公路工程",
    value: "10110002",
    icon: GalleryVertical,
  },
  {
    label: "其他工程",
    value: "10110007",
    icon: Layers,
  },
  {
    label: "市政工程",
    value: "10110003",
    icon: Building,
  },
  {
    label: "房建工程",
    value: "10110004",
    icon: House,
  },
];

export const regions = [
  { value: "10090001", label: "京津冀区域" },
  { value: "10090002", label: "北方区域" },
  { value: "10090003", label: "晋鲁豫区域" },
  { value: "10090004", label: "西部区域" },
  { value: "10090005", label: "华东区域" },
  { value: "10090006", label: "华南区域" },
  { value: "10090007", label: "中南区域" },
  { value: "10090008", label: "西南区域" },
  { value: "10090009", label: "川渝区域" },
  { value: "10090010", label: "海外区域" },
];
