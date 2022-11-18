import React from "react";
import { Query } from "@cubejs-client/core";
import {
  DataViewPie,
  DataViewInteractionHandler,
  DataViewBar,
  DataViewLine,
} from "../data-view";
import { useCubeJSQuery } from "../../hooks/useCubeJSQuery";
import { Chart } from "../chart";
import { overrideSVGFill, restoreSVGFill } from "../../util/svgFillToggle";

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

export const OrdersOverTime = (props: Props): JSX.Element => {
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
    <Chart status={status} error={error} width={300} height={400}>
      <DataViewPie
        dataSource={dataSource}
        valueKey="Orders.count"
        labelKey="Orders.createdAt.month"
        width={400}
        height={300}
        fillColor={"blue"}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
      <DataViewBar
        dataSource={dataSource}
        valueKey="Orders.count"
        labelKey="Orders.createdAt.month"
        width={400}
        height={300}
        fillColor={"blue"}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    </Chart>
  );
};
