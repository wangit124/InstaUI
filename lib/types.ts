export enum Steps {
  UPLOAD = "upload",
  CONFIG = "config",
  GENERATE = "generate",
  PREVIEW = "preview",
  EXPORT = "export",
}

export enum Color {
  BLUE = "blue",
  BLACK = "black",
  GREEN = "green",
  PURPLE = "purple",
  ORANGE = "orange",
  RED = "red",
}

export type ColorTheme = {
  name: Color;
  label: string;
  color: string;
};
