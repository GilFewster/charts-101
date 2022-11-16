import { DataSource, Datum } from "../types";

type InteractionHandlerProps = {
  data?: Datum;
  value?: number;
  target?: SVGElement;
};

export type DataViewInteractionHandler = ({
  data,
  value,
}: InteractionHandlerProps) => void;

type DataViewProps = {
  /**
   * Sets the size of the svg graph in pixels. This should ultimately be optional, and default to 100% of the graph's container.
   */
  width: number;
  /**
   * The normalised data from a CubeJS Query
   */
  dataSource: DataSource;
  /**
   * Name of the datum key which holds the value for each point to be plotted on the graph
   */
  valueKey: string;

  onMouseEnter?: DataViewInteractionHandler;
  onMouseLeave?: DataViewInteractionHandler;
};

export interface IDataView {
  (props: DataViewProps): JSX.Element;
}
