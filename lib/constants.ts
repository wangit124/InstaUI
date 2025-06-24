import { StepNavItem, StepType } from "./types";

export const steps: StepNavItem[] = [
  {
    id: StepType.UPLOAD,
    title: "Upload",
    description: "Import designs",
    component: "upload",
  },
  {
    id: StepType.CONFIG,
    title: "Configure",
    description: "Setup preferences",
    component: "config",
  },
  {
    id: StepType.GENERATE,
    title: "Generate",
    description: "Create code & components",
    component: "generate",
  },
  {
    id: StepType.PREVIEW,
    title: "Preview",
    description: "Review results",
    component: "preview",
  },
  {
    id: StepType.EXPORT,
    title: "Export",
    description: "Download & deploy",
    component: "export",
  },
];
