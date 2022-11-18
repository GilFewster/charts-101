export type DatumValue = string | number | boolean;

export type Datum<T extends DatumValue = any> = {
  [key: string]: T;
};
export type DataSource = Datum[];

export type Accessor<T extends DatumValue> = {
  (d: Datum): T;
};
