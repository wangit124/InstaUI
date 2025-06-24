import { Configuration } from "@/lib/types";
import { create } from "zustand";

type GlobalFormStoreType = {
  uploadedFiles: File[];
  setUploadedFiles: (files: File[]) => void;
  configuration: Configuration;
  setConfiguration: () => void;
  generatedResponse: {
    full: any;
    sharedComponents: any[];
  } | null;
  setGeneratedResponse: () => void;
};

export const useGlobalFormStore = create<GlobalFormStoreType>(() => ({
  uploadedFiles: [],
  setUploadedFiles: () => {},
  configuration: {
    baseFramework: "nextjs",
    libraries: {
      ui: [],
      state: [],
      forms: [],
    },
    styling: {
      componentSplitting: "moderate",
      eslintConfig: "recommended",
    },
  },
  setConfiguration: () => {},
  generatedResponse: null,
  setGeneratedResponse: () => {},
}));
