import React, { useCallback } from "react";
import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import { IDataView } from "./data-view-interface";

const color = [
  "yellow",
  "orange",
  "cyan",
  "black",
  "red",
  "goldenrod",
  "purple",
  "tomato",
];

export const DataViewPie: IDataView = ({
  width,
  dataSource,
  valueKey,
  onMouseEnter = () => null,
  onMouseLeave = () => null,
}): JSX.Element => {
  const half = width / 2;

  const getColor = useCallback(() => {
    return color[~~(Math.random() * color.length)];
  }, [dataSource]);

  return (
    <svg width={width} height={width}>
      <Group top={half} left={half}>
        <Pie
          data={dataSource}
          pieValue={(dataSource) => Number(dataSource[valueKey])}
          outerRadius={half}
          innerRadius={half - 20}
          padAngle={0.01}
        >
          {(pie) => {
            return pie.arcs.map((arc) => {
              return (
                <g key={JSON.stringify(arc)}>
                  <path
                    d={pie.path(arc) || ""}
                    fill={getColor()}
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
    </svg>
  );
};
