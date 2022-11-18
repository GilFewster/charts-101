import React, { useMemo } from "react";
import { LinePath } from "@visx/shape";
import { Group } from "@visx/group";
import { IDataView, IDataViewProps } from "./data-view";
import { curveLinear, curveNatural } from "@visx/curve";

import {
  createPositionAccessor,
  createValueAccessor,
  getScaleBand,
  getScaleLinear,
} from "./util";

type Props = IDataViewProps & {
  curveStyle?: typeof curveLinear | typeof curveNatural;
};

export const DataViewLine: IDataView = ({
  width,
  height,
  dataSource,
  valueKey,
  labelKey,
  fillColor,
  curveStyle = curveNatural,
  onMouseEnter = () => null,
  onMouseLeave = () => null,
}: Props): JSX.Element => {
  const xMax = width;
  const yMax = height;

  const x = createValueAccessor<string>(labelKey);
  const y = createValueAccessor<number>(valueKey);

  const xScale = useMemo(getScaleBand(xMax, dataSource, x), [xMax]);
  const yScale = useMemo(getScaleLinear(yMax, dataSource, y), [yMax]);

  const xPoint = createPositionAccessor(xScale, x);
  const yPoint = createPositionAccessor(yScale, y);

  return (
    <Group>
      <LinePath
        curve={curveStyle}
        data={dataSource}
        x={(d) => xPoint(d)}
        y={(d) => yPoint(d)}
        stroke={fillColor || "#333"}
        strokeWidth={3}
        strokeOpacity={1}
        shapeRendering="geometricPrecision"
      />
    </Group>
  );
};
