import React from "react";

export const ErrorMessage = ({ err }: { err?: Error | null }): JSX.Element => (
  <p>Error: {(err && err?.message) || "something went wrong."}</p>
);

export const LoadingMessage = (): JSX.Element => <p>Loading...</p>;
