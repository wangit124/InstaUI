export interface StepNavItem {
  id: StepType;
  title: string;
  description: string;
  component: string;
}

export enum StepType {
  UPLOAD = "upload",
  CONFIG = "config",
  GENERATE = "generate",
  PREVIEW = "preview",
  EXPORT = "export",
}

export enum StepStatus {
  COMPLETED = "completed",
  ACTIVE = "active",
  AVAILABLE = "available",
  LOCKED = "locked",
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

export interface Configuration {
  baseFramework: "nextjs" | "reactjs" | "raw";
  libraries: {
    ui: string[];
    state: string[];
    forms: string[];
  };
  styling: {
    componentSplitting: "minimal" | "moderate" | "aggressive";
    eslintConfig: string;
  };
}
