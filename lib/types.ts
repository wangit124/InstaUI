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
  baseFramework: "nextjs" | "reactjs" | "angular" | "jquery";
  enableTailwind: boolean;
  styling: {
    componentSplitting: "minimal" | "moderate" | "aggressive";
  };
  libraries: {
    ui: string;
    state: string[];
    forms: string[];
  };
}

export interface GeneratedFile {
  id: string;
  fileName: string;
  code: string;
}

export interface GeneratedResponse {
  full?: {
    files: GeneratedFile[];
    structure: Record<string, string[]>;
  };
  sharedComponents?: GeneratedFile[];
}
