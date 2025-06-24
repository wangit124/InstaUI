"use client";

import { Badge } from "@/components/ui/badge";
import { Check, Circle, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useStepsStore } from "@/stores/use-steps-store";
import { steps } from "@/lib/constants";
import { StepStatus, StepType } from "@/lib/types";
import { useMemo } from "react";

export default function StepNavigation() {
  const { currentStep, setCurrentStep, completedSteps } = useStepsStore();

  const currentStepIndex = useMemo(
    () => steps.findIndex((s) => s.id === currentStep),
    [currentStep]
  );

  const getStepStatus = (step: StepType) => {
    if (completedSteps?.has(step)) return StepStatus.COMPLETED;
    if (step === currentStep) return StepStatus.ACTIVE;
    if (steps.findIndex((s) => s.id === step) < currentStepIndex)
      return StepStatus.AVAILABLE;
    return StepStatus.LOCKED;
  };

  const getStepIcon = (step: StepType) => {
    const status = getStepStatus(step);
    switch (status) {
      case StepStatus.COMPLETED:
        return <Check className="h-4 w-4" />;
      case StepStatus.ACTIVE:
        return <Circle className="h-4 w-4 fill-current" />;
      case StepStatus.AVAILABLE:
        return <Circle className="h-4 w-4" />;
      case StepStatus.LOCKED:
        return <Lock className="h-4 w-4" />;
      default:
        return <Circle className="h-4 w-4" />;
    }
  };

  const getStepClasses = (step: StepType) => {
    const status = getStepStatus(step);
    const baseClasses =
      "flex items-center w-full gap-3 p-3 rounded-lg transition-all duration-200";
    switch (status) {
      case StepStatus.COMPLETED:
        return cn(
          baseClasses,
          "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 cursor-pointer",
          "dark:bg-green-900/30 dark:text-green-300 dark:border-green-700/50 dark:hover:bg-green-900/50"
        );
      case StepStatus.ACTIVE:
        return cn(
          baseClasses,
          "bg-primary/10 text-primary border border-primary/20 shadow-sm",
          "dark:bg-primary/20 dark:border-primary/30"
        );
      case StepStatus.AVAILABLE:
        return cn(
          baseClasses,
          "bg-muted/50 text-muted-foreground hover:bg-muted cursor-pointer",
          "dark:bg-muted/30 dark:hover:bg-muted/50"
        );
      case StepStatus.LOCKED:
        return cn(
          baseClasses,
          "bg-muted/20 text-muted-foreground/50 cursor-not-allowed border border-primary/20",
          "dark:bg-muted/10 dark:text-muted-foreground/40"
        );
      default:
        return baseClasses;
    }
  };

  const canClickStep = (step: StepType) =>
    steps.findIndex((s) => s.id === step) < currentStepIndex ||
    completedSteps?.has(step);

  return (
    <div className="flex flex-col p-6 gap-2">
      {steps.map((stepNavItem) => (
        <div
          key={stepNavItem.id}
          className="flex flex-col items-center w-full gap-2"
        >
          <div
            className={getStepClasses(stepNavItem.id)}
            onClick={() =>
              canClickStep(stepNavItem.id) && setCurrentStep(stepNavItem.id)
            }
          >
            <div className="flex-shrink-0">{getStepIcon(stepNavItem.id)}</div>
            <div className="min-w-0">
              <div className="font-medium text-sm truncate">
                {stepNavItem.title}
              </div>
              <div className="text-xs opacity-75 truncate">
                {stepNavItem.description}
              </div>
            </div>
            {getStepStatus(stepNavItem.id) === StepStatus.ACTIVE && (
              <Badge variant="secondary" className="ml-2 text-xs">
                Active
              </Badge>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
