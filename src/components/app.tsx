import React from "react";
import { Query } from "@cubejs-client/core";
import { DataViewPie, DataViewInteractionHandler } from "./data-view";
import { useCubeJSQuery } from "../hooks/useCubeJSQuery";
import { Status } from "../util/status";
import { ErrorMessage, LoadingMessage } from "./queryStatusMessage";

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

  const onMouseEnter: DataViewInteractionHandler = ({
    data,
    value,
    target,
  }) => {
    console.log(data, value, target);
    target?.setAttribute("fill", "green");
  };

  const onMouseLeave: DataViewInteractionHandler = ({
    data,
    value,
    target,
  }) => {
    console.log(data, value, target);
    target?.setAttribute("fill", "inherit");
  };

  return (
    <div>
      {status === Status.Idle && <p>Ready to query</p>}
      {status === Status.Loading && <LoadingMessage />}
      {status === Status.Failed && <ErrorMessage err={error} />}
      {status === Status.Complete && (
        <DataViewPie
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
