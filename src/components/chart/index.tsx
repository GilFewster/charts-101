import React, { ReactNode } from "react";
import { Status } from "../../util/status";
import { ErrorMessage, LoadingMessage } from "../queryStatusMessage";

type Props = {
  status?: Status;
  error?: Error | null;
  children?: React.ReactNode;
};

export const Chart = ({ status = Status.Ready, error, children }: Props) => (
  <div>
    {status === Status.Idle && <p>Ready to query</p>}
    {status === Status.Loading && <LoadingMessage />}
    {status === Status.Failed && <ErrorMessage err={error} />}
    {status === Status.Complete && children}
  </div>
);
