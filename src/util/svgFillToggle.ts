const DATA_ATTRIBUTE = "data-original-fill";

export const overrideSVGFill = (target: SVGElement, newColor: string) => {
  const current = target.getAttribute("fill");
  current && target.setAttribute(DATA_ATTRIBUTE, current);
  target.setAttribute("fill", newColor);
};

export const restoreSVGFill = (target: SVGElement) => {
  const value = target.getAttribute(DATA_ATTRIBUTE);
  value ? target.setAttribute("fill", value) : target.removeAttribute("fill");
};
