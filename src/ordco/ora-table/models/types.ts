export interface Dictionary {
  [key: string]: any;
}

///DateTime-> DateTimeLuxon
export type COL_DATA_TYPE =
  'Select'
  | 'Text'
  | 'Number'
  | 'Currency'
  | 'Date'
  | 'DateTime'
  | 'DateTimeFull'
  | 'STT'
  | "Boolean";
