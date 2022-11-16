import React from "react";
import { Query } from "@cubejs-client/core";
import { DataViewPie, DataViewInteractionHandler } from "./data-view";
import { useCubeJSQuery } from "../hooks/useCubeJSQuery";
import { Chart } from "./chart";
import { overrideSVGFill, restoreSVGFill } from "../util/svgFillToggle";

type Props = {
  children?: React.ReactNode[];
};

const query: Query = {
  measures: ["Orders.count"],
  timeDimensions: [
    {
      dimension: "Orders.createdAt",
      dateRange: ["2019-01-01", "2020-01-01"],
      granularity: "month",
    },
  ],
};

export const App = (props: Props): JSX.Element => {
  const { status, error, dataSource } = useCubeJSQuery({
    query,
  });

  const onMouseEnter: DataViewInteractionHandler = ({ target }) => {
    target && overrideSVGFill(target, "green");
  };

  const onMouseLeave: DataViewInteractionHandler = ({ target }) => {
    target && restoreSVGFill(target);
  };

  return (
    <Chart status={status} error={error}>
      <DataViewPie
        dataSource={dataSource}
        valueKey="Orders.count"
        width={400}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    </Chart>
  );
};
