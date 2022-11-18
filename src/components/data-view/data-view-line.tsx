import React, { useMemo } from "react";
import { LinePath } from "@visx/shape";
import { Group } from "@visx/group";
import { IDataView, IDataViewProps } from "./data-view-interface";
import { scaleBand, scaleLinear } from "@visx/scale";
import * as allCurves from "@visx/curve";
import { ScaleBand, ScaleLinear } from "d3-scale";

type CurveType = keyof typeof allCurves;
const curveTypes = Object.keys(allCurves);

type Props = IDataViewProps & {
  curveStyle?: CurveType;
};

export const DataViewLine: IDataView = ({
  width,
  height,
  dataSource,
  valueKey,
  labelKey,
  fillColor,
  curveStyle = "curveNatural",
  onMouseEnter = () => null,
  onMouseLeave = () => null,
}: Props): JSX.Element => {
  const margin = { top: 20, bottom: 20, left: 20, right: 20 };
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const x = (d: any): string => d[labelKey];
  const y = (d: any): number => +d[valueKey];

  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
        round: true,
        domain: dataSource.map(x),
        padding: 0.4,
      }),
    [xMax]
  );
  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...dataSource.map(y))],
      }),
    [yMax]
  );

  const compose =
    (
      scale: ScaleBand<string> | ScaleLinear<number, number, never>,
      accessor: (d: any) => any
    ) =>
    (data: any) =>
      scale(accessor(data));

  const xPoint = compose(xScale, x);
  const yPoint = compose(yScale, y);

  return (
    <Group>
      <LinePath
        curve={allCurves["curveNatural"]}
        data={dataSource}
        x={(d) => xPoint(d) || 0}
        y={(d) => yPoint(d) || 0}
        stroke={fillColor || "#333"}
        strokeWidth={3}
        strokeOpacity={1}
        shapeRendering="geometricPrecision"
      />
    </Group>
  );
};
