import React, { ReactNode } from "react";
import { Status } from "../../util/status";
import { ErrorMessage, LoadingMessage } from "../queryStatusMessage";

type Props = {
  status?: Status;
  error?: Error | null;
  children?: React.ReactNode;
  width: number;
  height: number;
};

export const Chart = ({
  status = Status.Ready,
  error,
  width = 400,
  height = 300,
  children,
}: Props) => {
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
