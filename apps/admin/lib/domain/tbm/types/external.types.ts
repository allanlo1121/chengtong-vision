export interface TbmImportRow {
  id: string;

  billOrgId: string;
  billOrgName: string;
  billOrgTreepath: string;

  creator: string | null;
  createTime: string | null;

  modifier: string | null;
  updateTime: string | null;

  version: number;

  deleted: number;

  deleteUser: string | null;
  deletedDate: string | null;

  modifierId: string | null;
  creatorId: string | null;

  projectId: string | null;
  projectName: string | null;

  unitId: string | null;
  unitName: string | null;

  publishInfoId: string | null;

  deviceId: string;

  number: number;

  qrCode: string | null;

  manageNumber: string;

  licenseNumber: string;

  deviceName: string;

  deviceSpec: string | null;

  deviceModel: string;

  devicePower: string | null;

  deviceState: string | null;

  technicalCondition: string | null;

  propertyUnitName: string | null;

  onUnitName: string | null;

  keepingUnitName: string | null;

  provinceName: string | null;

  cityName: string | null;

  deviceAddress: string | null;

  formationDate: string | null;

  originalValue: string | null;

  financeNetValue: string | null;

  systemNetValue: string | null;

  depreciationMethod: string | null;

  deviceUnit: string | null;

  deviceLicense: string;

  manufacturer: string | null;

  productionDate: string | null;

  specialDevice: string | null;

  deviceType: string | null;

  domesticForeign: string | null;

  publishStatus: string | null;

  otherMark: string | null;

  editRunStr: string | null;

  status: string | null;

  remarks: string | null;

  editRun: boolean;

  deviceNumber: string | null;

  manageCategory: string | null;

  propertyUnit: string | null;

  onUnit: string | null;

  keepingUnit: string | null;

  province: string | null;

  city: string | null;

  capitalSource: string | null;

  costBear: string | null;

  deviceSource: string | null;

  buyContractId: string | null;

  buyContractNumber: string | null;

  useDate: string | null;

  registerDate: string | null;

  fixAssetsNumber: string | null;

  depreciationRules: number | null;

  depreciationResidualRatio: number | null;

  stockBuyNumber: string | null;

  groupBuyNumber: string | null;

  subBuyNumber: string | null;

  originalManageNumber: string | null;

  factoryNumber: string | null;

  designUnit: string | null;

  engineType: string | null;

  energyModel: string | null;

  manufactureDate: string | null;

  deviceWeight: string | null;

  shapeSize: string | null;

  loadMaxSize: string | null;

  engineName: string | null;

  engineModel: string | null;

  engineSpecification: string | null;

  engineManufacturer: string | null;

  engineNumber: string | null;

  engineProductionDate: string | null;

  chassisModel: string | null;

  chassisNumber: string | null;

  chassisFactory: string | null;

  chassisSpecification: string | null;

  enterFile: string | null;

  enterId: string | null;

  checkFile: string | null;

  dictData: unknown;

  registerDateStr: string | null;

  useDateStr: string | null;

  maintainCycleId: string | null;

  deviceClassify: string | null;

  totalRunningLength: number | null;

  catalogue1: string | null;

  catalogue2: string | null;

  catalogue3: string | null;

  catalogueName1: string | null;

  catalogueName2: string | null;

  catalogueName3: string | null;

  companyCode: string | null;

  oldDeviceId: string | null;

  measureWay: string | null;

  runningDistance: number | null;

  newState: string | null;

  financialAssetsId: string | null;

  merchantId: string | null;

  hid: string | null;

  accountDeviceId: string | null;

  deviceStates: unknown;

  publishStartDate: string | null;

  contactsName: string | null;

  contactsPhone: string | null;

  rentStartDate: string | null;

  rentEndDate: string | null;

  storagePlace: string | null;

  workload: number | null;

  showPage: unknown;

  cumuDrpMoney: number | null;

  excludeOut: unknown;
}
