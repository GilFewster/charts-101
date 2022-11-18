import React, { useMemo } from "react";
import { Bar } from "@visx/shape";
import { Group } from "@visx/group";
import { IDataView } from "./data-view-interface";
import { scaleBand, scaleLinear } from "@visx/scale";
import { ScaleBand, ScaleLinear } from "d3-scale";

export const DataViewBar: IDataView = ({
  width,
  height,
  dataSource,
  valueKey,
  labelKey,
  onMouseEnter = () => null,
  onMouseLeave = () => null,
}): JSX.Element => {
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
    // <svg width={width} height={height}>
    <Group>
      {dataSource.map((d, i) => {
        const barHeight = yMax - (yPoint(d) || 0);
        return (
          <Group key={`bar-${i}`}>
            <Bar
              x={xPoint(d)}
              y={yMax - barHeight}
              height={barHeight}
              width={xScale.bandwidth()}
              style={{ fill: "#2eff00" }}
            />
          </Group>
        );
      })}
      {/* </svg> */}
    </Group>
  );
};
