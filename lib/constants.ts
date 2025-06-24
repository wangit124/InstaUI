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

export const uiLibraries = [
  {
    id: "shadcn/ui",
    name: "shadcn/ui",
    description: "Beautifully designed components",
  },
  {
    id: "tailwindcss",
    name: "Tailwind CSS",
    description: "Utility-first CSS framework",
  },
  {
    id: "chakra-ui",
    name: "Chakra UI",
    description: "Modular and accessible component library",
  },
  {
    id: "mantine",
    name: "Mantine",
    description: "Full-featured React components library",
  },
  {
    id: "ant-design",
    name: "Ant Design",
    description: "Enterprise-class UI design language",
  },
];

export const stateLibraries = [
  {
    id: "zustand",
    name: "Zustand",
    description: "Small, fast and scalable state management",
  },
  {
    id: "redux-toolkit",
    name: "Redux Toolkit",
    description: "Official, opinionated Redux toolset",
  },
  {
    id: "jotai",
    name: "Jotai",
    description: "Primitive and flexible state management",
  },
  { id: "valtio", name: "Valtio", description: "Proxy-state made simple" },
];

export const formLibraries = [
  {
    id: "react-hook-form",
    name: "React Hook Form",
    description: "Performant, flexible forms",
  },
  { id: "formik", name: "Formik", description: "Build forms without tears" },
  {
    id: "react-final-form",
    name: "React Final Form",
    description: "High performance subscription-based form state management",
  },
];
