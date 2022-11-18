import React, { ReactNode } from "react";
import { Status } from "../../util/status";
import { ErrorMessage, LoadingMessage } from "../queryStatusMessage";
import { withParentSize } from "@visx/responsive";

type Props = {
  status?: Status;
  error?: Error | null;
  children?: React.ReactNode;
};

const ResponsiveChart = ({
  width,
  height,
  children,
}: {
  width: number;
  height: number;
  children?: React.ReactNode;
}) => {
  <div>{children}</div>;
};

export const Chart = ({ status = Status.Ready, error, children }: Props) => {
  const width = 400;
  const height = 300;

  return (
    <div>
      {status === Status.Idle && <p>Ready to query</p>}
      {status === Status.Loading && <LoadingMessage />}
      {status === Status.Failed && <ErrorMessage err={error} />}
      {status === Status.Complete && (
        <svg width={width} height={height}>
          {children}
        </svg>
      )}
    </div>
  );
};
