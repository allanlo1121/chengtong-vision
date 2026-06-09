export type ImportPlcTagRow = {
  tagName: string;
  dataType: string;
  archive: boolean;
  internal?: string;
  bit?: number;
  comment: string;
  sortOrder: number;
};
