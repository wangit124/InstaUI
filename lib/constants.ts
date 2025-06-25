import { Configuration, StepNavItem, StepType } from "./types";

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

export const baseFrameworks: {
  id: Configuration["baseFramework"];
  name: string;
}[] = [
  {
    id: "nextjs",
    name: "Next.js",
  },
  {
    id: "reactjs",
    name: "React.js",
  },
  {
    id: "angular",
    name: "Angular.js",
  },
  {
    id: "jquery",
    name: "HTML & jQuery",
  },
];

export const componentSplittingLevels: {
  id: Configuration["styling"]["componentSplitting"];
  name: string;
}[] = [
  { id: "minimal", name: "Minimal - split components that exceed 800 lines" },
  { id: "moderate", name: "Moderate - split components that exceed 500 lines" },
  {
    id: "aggressive",
    name: "Aggressive - split components that exceed 300 lines",
  },
];

export const uiLibraries: {
  id: Configuration["libraries"]["ui"];
  name: string;
  link: string;
  description: string;
}[] = [
  {
    id: "shadcn",
    name: "shadcn/ui",
    link: "https://ui.shadcn.com/",
    description:
      "Beautifully designed components built with Radix UI and Tailwind CSS",
  },
  {
    id: "mui",
    name: "Material-UI (MUI)",
    link: "https://www.npmjs.com/package/@mui/material",
    description: "React components implementing Google's Material Design",
  },
  {
    id: "react-bootstrap",
    name: "React Bootstrap",
    link: "https://www.npmjs.com/package/react-bootstrap",
    description: "Bootstrap components built for React",
  },
  {
    id: "chakra-ui",
    name: "Chakra UI",
    link: "https://www.npmjs.com/package/@chakra-ui/react",
    description: "Simple, modular and accessible component library",
  },
  {
    id: "mantine",
    name: "Mantine",
    link: "https://www.npmjs.com/package/@mantine/core",
    description: "Full-featured React components and hooks library",
  },
  {
    id: "ant-design",
    name: "Ant Design",
    link: "https://www.npmjs.com/package/antd",
    description: "Enterprise-class UI design language and React components",
  },
  {
    id: "blueprint",
    name: "Blueprint",
    link: "https://www.npmjs.com/package/@blueprintjs/core",
    description: "A React-based UI toolkit for the web",
  },
  {
    id: "semantic-ui-react",
    name: "Semantic UI React",
    link: "https://www.npmjs.com/package/semantic-ui-react",
    description: "React integration for Semantic UI",
  },
  {
    id: "nextui",
    name: "NextUI",
    link: "https://www.npmjs.com/package/@nextui-org/react",
    description: "Beautiful, fast and modern React UI Library",
  },
];

export const stateLibraries: {
  id: string;
  name: string;
  link: string;
  description: string;
}[] = [
  {
    id: "zustand",
    name: "Zustand",
    link: "https://www.npmjs.com/package/zustand",
    description: "Small, fast and scalable state management solution",
  },
  {
    id: "redux-toolkit",
    name: "Redux Toolkit",
    link: "https://www.npmjs.com/package/@reduxjs/toolkit",
    description:
      "Official, opinionated, batteries-included toolset for efficient Redux development",
  },
  {
    id: "jotai",
    name: "Jotai",
    link: "https://www.npmjs.com/package/jotai",
    description: "Primitive and flexible state management for React",
  },
  {
    id: "mobx",
    name: "MobX",
    link: "https://www.npmjs.com/package/mobx",
    description:
      "Simple, scalable state management through reactive programming",
  },
];

export const formLibraries: {
  id: string;
  name: string;
  link: string;
  description: string;
}[] = [
  {
    id: "react-hook-form",
    name: "React Hook Form",
    link: "https://www.npmjs.com/package/react-hook-form",
    description:
      "Performant, flexible and extensible forms with easy validation",
  },
  {
    id: "formik",
    name: "Formik",
    link: "https://www.npmjs.com/package/formik",
    description: "Build forms in React, without the tears",
  },
  {
    id: "react-form",
    name: "React Form",
    link: "https://www.npmjs.com/package/@tanstack/react-form",
    description: "Powerful and type-safe form state management for the web",
  },
  {
    id: "yup",
    name: "Yup",
    link: "https://www.npmjs.com/package/yup",
    description: "Dead simple Object schema validation",
  },
  {
    id: "zod",
    name: "Zod",
    link: "https://www.npmjs.com/package/zod",
    description:
      "TypeScript-first schema validation with static type inference",
  },
  {
    id: "joi",
    name: "Joi",
    link: "https://www.npmjs.com/package/joi",
    description:
      "Object schema description language and validator for JavaScript objects",
  },
];
