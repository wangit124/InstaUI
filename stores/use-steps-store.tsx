import { StepType } from "@/lib/types";
import { create } from "zustand";

type StepsStoreType = {
  currentStep: StepType;
  setCurrentStep: (step: StepType) => void;
  completedSteps: Set<StepType> | null;
  addCompletedStep: (step: StepType) => void;
};

export const useStepsStore = create<StepsStoreType>((set) => ({
  currentStep: StepType.UPLOAD,
  setCurrentStep: (step) => set(() => ({ currentStep: step })),
  completedSteps: null,
  addCompletedStep: (step) =>
    set((state) => ({
      completedSteps: new Set([...(state.completedSteps || []), step]),
    })),
}));
