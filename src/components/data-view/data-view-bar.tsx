import React, { useMemo } from "react";
import { Bar } from "@visx/shape";
import { Group } from "@visx/group";
import { IDataView } from "./data-view";
import {
  createPositionAccessor,
  createValueAccessor,
  getScaleBand,
  getScaleLinear,
} from "./util";

export const DataViewBar: IDataView = ({
  width,
  height,
  dataSource,
  valueKey,
  labelKey,
  fillColor,
  onMouseEnter = () => null,
  onMouseLeave = () => null,
}): JSX.Element => {
  const xMax = width;
  const yMax = height;

  const xValueAccessor = createValueAccessor<string>(labelKey);
  const yValueAccessor = createValueAccessor<number>(valueKey);

  const xScale = useMemo(getScaleBand(xMax, dataSource, xValueAccessor), [
    xMax,
  ]);

  const yScale = useMemo(getScaleLinear(yMax, dataSource, yValueAccessor), [
    yMax,
  ]);

  const xPoint = createPositionAccessor(xScale, xValueAccessor);
  const yPoint = createPositionAccessor(yScale, yValueAccessor);

  return (
    <Group>
      {dataSource.map((d, i) => {
        const barHeight = yMax - yPoint(d);
        return (
          <Bar
            key={`bar-${xPoint(d)}-${barHeight}`}
            x={xPoint(d)}
            y={yMax - barHeight}
            height={barHeight}
            width={xScale.bandwidth()}
            style={{ fill: fillColor || "#333" }}
          />
        );
      })}
    </Group>
  );
};
