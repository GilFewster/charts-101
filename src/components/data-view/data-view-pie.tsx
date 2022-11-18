import React, { useCallback, useEffect, useMemo } from "react";
import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import { IDataView } from "./data-view";
import { getColorRange } from "../../util/colorRange";
import { Accessor } from "../types";

export const DataViewPie: IDataView = ({
  width,
  height,
  dataSource,
  valueKey,
  onMouseEnter = () => null,
  onMouseLeave = () => null,
}): JSX.Element => {
  const size = Math.min(width, height);
  const half = size / 2;

  const colors = useMemo(
    () => (dataSource ? getColorRange(dataSource.length) : []),
    [dataSource]
  );

  const getColor = (index: number) => {
    const col = index <= colors.length ? colors[index] : colors[0];
    return col;
  };

  const arcValue: Accessor<number> = (d) => d[valueKey];

  return (
    <Group top={half} left={half}>
      <Pie
        data={dataSource}
        pieValue={arcValue}
        outerRadius={half}
        innerRadius={half - 50}
        padAngle={0.01}
      >
        {(pie) => {
          return pie.arcs.map((arc, index) => {
            return (
              <g key={JSON.stringify(arc)}>
                <path
                  d={pie.path(arc) || ""}
                  fill={getColor(index)}
                  onMouseEnter={(e) =>
                    onMouseEnter({ ...arc, target: e.currentTarget })
                  }
                  onMouseLeave={(e) =>
                    onMouseLeave({ ...arc, target: e.currentTarget })
                  }
                ></path>
              </g>
            );
          });
        }}
      </Pie>
    </Group>
  );
};
