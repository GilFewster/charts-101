import React, { useEffect, useState } from "react";
import { useCubeQuery } from "@cubejs-client/react";
import { Status } from "../util/status";
import { PivotConfig, Query, TableColumn } from "@cubejs-client/core";
import { getCubeJs } from "../util/getCubeJs";

type Props = {
  query: Query | Query[];
  pivotConfig?: PivotConfig;
};

type normalisedData = { [key: string]: string | number | boolean }[];

export const useCubeJSQuery = ({ query, pivotConfig }: Props) => {
  const cubeJs = getCubeJs();
  const [status, setStatus] = useState<Status>(Status.Ready);
  const [dataSource, setDataSource] = useState<normalisedData>([]);
  const [columns, setColumns] = useState<TableColumn[]>([]);

  const { resultSet, isLoading, error } = useCubeQuery(query, {
    cubejsApi: cubeJs,
  });

  useEffect(() => {
    // map the cubeQuery status flags to the APSYS Status enum
    const currentStatus = isLoading
      ? Status.Loading
      : error
      ? Status.Failed
      : resultSet
      ? Status.Complete
      : Status.Ready;
    setStatus(currentStatus);
    if (resultSet) {
      setDataSource(resultSet.tablePivot(pivotConfig));
      setColumns(resultSet.tableColumns());
    }
  }, [isLoading, error, resultSet]);

  return { status, resultSet, dataSource, columns, error };
};
