import React from "react";
import { Query } from "@cubejs-client/core";
import { OrdersOverTime } from "./query-views/ordersOverTime";
import { OrderStatusOverTime } from "./query-views/orderStatusOverTime";

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
  return (
    <>
      <OrderStatusOverTime />
    </>
  );
};
