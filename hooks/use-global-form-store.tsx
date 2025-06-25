import { Configuration } from "@/lib/types";
import { create } from "zustand";

type GlobalFormStoreType = {
  uploadedFiles: File[];
  setUploadedFiles: (files: File[]) => void;
  figmaImages: string[];
  setFigmaImages: (images: string[]) => void;
  configuration: Configuration;
  setConfiguration: (configuration: Configuration) => void;
  generatedResponse: {
    full: any;
    sharedComponents: any[];
  } | null;
  setGeneratedResponse: () => void;
};

export const useGlobalFormStore = create<GlobalFormStoreType>((set) => ({
  uploadedFiles: [],
  setUploadedFiles: (files) => set({ uploadedFiles: files }),
  figmaImages: [],
  setFigmaImages: (images) => set({ figmaImages: Array.from(new Set(images)) }),
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
  setConfiguration: (configuration) => set({ configuration }),
  generatedResponse: null,
  setGeneratedResponse: () => {},
}));
