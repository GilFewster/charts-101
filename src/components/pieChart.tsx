import React, { useCallback } from "react";
import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import { DataSource, MouseInteractionHandler } from "./types";

type Props = {
  /**
   * Sets the size of the svg graph in pixels. This should ultimately be optional, and default to 100% of the graph's container.
   */
  width: number;
  /**
   * The normalised data from a CubeJS Query
   */
  dataSource: DataSource;
  /**
   * Name of the datum key which holds the value for each point to be plotted on the graph
   */
  valueKey: string;

  onMouseEnter?: MouseInteractionHandler;
  onMouseLeave?: MouseInteractionHandler;
};

const defaultHandler: MouseInteractionHandler = ({ data, value }) => null;

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

export const PieChart = ({
  width,
  dataSource,
  valueKey,
  onMouseEnter = defaultHandler,
  onMouseLeave = defaultHandler,
}: Props) => {
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
