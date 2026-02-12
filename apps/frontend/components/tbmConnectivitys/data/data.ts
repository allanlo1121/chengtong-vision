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

export const tbmOperationStatuses = [
  {
    value: "41010001",
    label: "掘进",
    icon: Circle,
  },
  {
    value: "41010002",
    label: "维修中",
    icon: Timer,
  },
  {
    value: "41010003",
    label: "暂停",
    icon: CheckCircle,
  },
  {
    value: "41010004",
    label: "存放",
    icon: CirclePause,
  },
  {
    value: "41010005",
    label: "运输",
    icon: ArrowDown,
  },
  {
    value: "41010006",
    label: "组装",
    icon: ArrowRight,
  },
];

export const tbmTypes = [
  {
    label: "敞开式TBM",
    value: "40900001",
    icon: TrainFront,
  },
  {
    label: "双护盾TBM",
    value: "40900002",
    icon: TrainTrack,
  },
  {
    label: "土压平衡盾构机",
    value: "40900003",
    icon: Waves,
  },
  {
    label: "泥水盾构",
    value: "40900004",
    icon: GalleryVertical,
  },
  {
    label: "顶管机",
    value: "40900005",
    icon: Layers,
  },
  {
    label: "矿用TBM",
    value: "40900006",
    icon: Building,
  },
  {
    label: "土压泥水双模",
    value: "40900007",
    icon: House,
  },
  {
    label: "土压敞开双模",
    value: "40900008",
    icon: HelpCircle,
  },
  {
    label: "单护盾TBM",
    value: "40900009",
    icon: CircleOff,
  },
  {
    label: "抽水蓄能TBM",
    value: "40900010",
    icon: Circle,
  },
];

export const mechSourceTypes = [
  { value: "40150001", label: "自购" },
  { value: "40150002", label: "调拨" },
  { value: "40150003", label: "租赁" },
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
