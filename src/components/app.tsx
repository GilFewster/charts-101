import React from "react";
import { Query } from "@cubejs-client/core";
import { PieChart } from "./pieChart";
import { useCubeJSQuery } from "../hooks/useCubeJSQuery";
import { Status } from "../util/status";
import { ErrorMessage, LoadingMessage } from "./queryStatusMessage";
import { Datum, DataSource, MouseInteractionHandler } from "./types";

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

  const width = 400;

  const onMouseEnter: MouseInteractionHandler = ({ data, value, target }) => {
    console.log(data, value, target);
    target?.setAttribute("fill", "green");
  };

  const onMouseLeave: MouseInteractionHandler = ({ data, value, target }) => {
    console.log(data, value, target);
    target?.setAttribute("fill", "inherit");
  };

  return (
    <div>
      {status === Status.Idle && <p>Ready to query</p>}
      {status === Status.Loading && <LoadingMessage />}
      {status === Status.Failed && <ErrorMessage err={error} />}
      {status === Status.Complete && (
        <PieChart
          dataSource={dataSource}
          valueKey="Orders.count"
          width={width}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
      )}
    </div>
  );
};
