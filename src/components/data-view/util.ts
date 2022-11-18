import { scaleBand, scaleLinear } from "@visx/scale";
import { ScaleBand, ScaleLinear } from "d3-scale";
import { Accessor, DataSource, Datum, DatumValue } from "../types";

export const getScaleBand = (
  max: number,
  dataSource: DataSource,
  accessor: (d: Datum) => string
) => {
  return () =>
    scaleBand<string>({
      range: [0, max],
      round: true,
      domain: dataSource.map(accessor),
      padding: 0.4,
    });
};

export const getScaleLinear = (
  max: number,
  dataSource: DataSource,
  accessor: (d: Datum) => number
) => {
  return () =>
    scaleLinear<number>({
      range: [max, 0],
      round: true,
      domain: [0, Math.max(...dataSource.map(accessor))],
    });
};

export function createPositionAccessor(
  scale: ScaleBand<string>,
  accessor: Accessor<string>
): (data: Datum) => number;
export function createPositionAccessor(
  scale: ScaleLinear<number, number>,
  accessor: Accessor<number>
): (data: Datum<number>) => number;
export function createPositionAccessor(
  scaleLinearOrBand: ScaleBand<string> | ScaleLinear<number, number>,
  accessor: Accessor<any>
): (data: Datum) => number {
  if ("interpolate" in scaleLinearOrBand) {
    return (d: Datum) => scaleLinearOrBand(accessor(d)) || 0;
  }

  return (d: Datum<string>) => scaleLinearOrBand(accessor(d)) || 0;
}

export const compose =
  (
    scale: ScaleBand<string> | ScaleLinear<number, number>,
    accessor: Accessor<any>
  ) =>
  (data: Datum) =>
    scale(accessor(data)) || 0;

export const createValueAccessor = <T extends DatumValue>(
  key: string
): Accessor<T> => {
  return (d: Datum) => d[key];
};
