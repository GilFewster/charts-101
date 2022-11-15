type InteractionHandlerProps = {
  data?: Datum;
  value?: number;
  target?: SVGElement;
};

export type Datum = { [key: string]: string | number | boolean };
export type DataSource = Datum[];
export type MouseInteractionHandler = ({
  data,
  value,
}: InteractionHandlerProps) => void;
