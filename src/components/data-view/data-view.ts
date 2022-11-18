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

/**
 * Individual DataView components may be extended to support additional props via `type MyDataView = IDataViewProps & {...}`.
 * However, to ensure that dataviews are universally interchangeable, you must ensure
 * - any additional props via extend MUST be optional
 * - the component must have a suitable default fallback option for cases when one of the optional props is not supplied
 */
export interface IDataViewProps {
  /**
   * Sets the width of the svg graph in pixels. This should ultimately be optional, and default to 100% of the graph's container.
   */
  width: number;
  /**
   * Sets the height of the svg graph in pixels. This should ultimately be optional, and default to 100% of the graph's container.
   */
  height: number;
  /**
   * The normalised data from a CubeJS Query
   */
  dataSource: DataSource;
  /**
   * Name of the datum key which holds the value for each point to be plotted on the graph
   */
  valueKey: string;
  /**
   * Name of the datum key which holds the label for each point to be plotted on the graph
   */
  labelKey: string;
  /**
   *
   */
  fillColor?: string;

  onMouseEnter?: DataViewInteractionHandler;
  onMouseLeave?: DataViewInteractionHandler;
}
export interface IDataView {
  (props: IDataViewProps): JSX.Element;
}
