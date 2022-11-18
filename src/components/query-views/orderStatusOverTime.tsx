import React from "react";
import { Query } from "@cubejs-client/core";
import { DataViewBar, DataViewLine } from "../data-view";
import { useCubeJSQuery } from "../../hooks/useCubeJSQuery";
import { Chart } from "../chart";

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
  dimensions: ["Orders.status"],
  order: {
    "Orders.count": "desc",
  },
};

const pivotConfig = {
  x: ["Order.createdAt"],
  y: ["Orders.status", "measures"],
};

export const OrderStatusOverTime = (props: Props): JSX.Element => {
  const { status, error, dataSource } = useCubeJSQuery({
    query,
    pivotConfig,
  });

  return (
    <Chart status={status} error={error}>
      <DataViewBar
        dataSource={dataSource}
        valueKey="completed,Orders.count"
        labelKey="Orders.createdAt.month"
        width={400}
        height={300}
      />
      <DataViewLine
        dataSource={dataSource}
        valueKey="shipped,Orders.count"
        labelKey="Orders.createdAt.month"
        width={400}
        height={300}
      />
      <DataViewLine
        dataSource={dataSource}
        valueKey="processing,Orders.count"
        labelKey="Orders.createdAt.month"
        fillColor="orange"
        width={400}
        height={300}
      />
    </Chart>
  );
};
