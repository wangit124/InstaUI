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
      "flex items-center gap-3 p-3 rounded-lg transition-all duration-200";
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
          "bg-muted/20 text-muted-foreground/50 cursor-not-allowed",
          "dark:bg-muted/10 dark:text-muted-foreground/40"
        );
      default:
        return baseClasses;
    }
  };

  const getConnectorClasses = (step: StepType) => {
    const isCompleted =
      completedSteps?.has(step) ||
      steps.findIndex((s) => s.id === step) < currentStepIndex;
    return cn(
      "h-0.5 flex-1 transition-colors duration-300",
      isCompleted
        ? "bg-green-300 dark:bg-green-600"
        : "bg-muted dark:bg-muted/50"
    );
  };

  const canClickStep = (step: StepType) => {
    return (
      steps.findIndex((s) => s.id === step) < currentStepIndex ||
      completedSteps?.has(step)
    );
  };

  return (
    <div className="border-b bg-background/50">
      <div className="container py-4">
        <div className="w-full">
          {/* Desktop Stepper */}
          <div className="hidden md:flex items-center justify-between">
            {steps.map((stepNavItem, index) => (
              <div key={stepNavItem.id} className="flex items-center flex-1">
                <div
                  className={getStepClasses(stepNavItem.id)}
                  onClick={() =>
                    canClickStep(stepNavItem.id) &&
                    setCurrentStep(stepNavItem.id)
                  }
                >
                  <div className="flex-shrink-0">
                    {getStepIcon(stepNavItem.id)}
                  </div>
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
                {index < steps.length - 1 && (
                  <div
                    className={cn("mx-2", getConnectorClasses(stepNavItem.id))}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Mobile Stepper */}
          <div className="md:hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium">
                Step {currentStep + 1} of {steps.length}
              </div>
              <div className="flex items-center gap-1">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      "h-2 w-8 rounded-full transition-colors",
                      index <= currentStepIndex
                        ? "bg-primary"
                        : "bg-muted dark:bg-muted/50"
                    )}
                  />
                ))}
              </div>
            </div>

            <div className={getStepClasses(currentStep)}>
              <div className="flex-shrink-0">{getStepIcon(currentStep)}</div>
              <div>
                <div className="font-medium">
                  {steps[currentStepIndex].title}
                </div>
                <div className="text-sm opacity-75">
                  {steps[currentStepIndex].description}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
