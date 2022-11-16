import chroma from "chroma-js";

type ScaleOptions = {
  /**
   * array of color values t base the scale on
   */
  colors?: string[];
};

const defaultOptions: Required<ScaleOptions> = {
  colors: ["cyan", "purple", "#ff3399"],
};

export const getColorRange = (
  size: number,
  options?: ScaleOptions
): string[] => {
  const { colors } = {
    ...defaultOptions,
    ...options,
  };

  return chroma.scale(colors).mode("rgb").correctLightness().colors(size);
};
