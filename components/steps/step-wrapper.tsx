"use client";

import { useMemo, useState, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import UploadSection from "@/components/steps/upload-section";
import ConfigSection from "@/components/steps/config-section";
import GenerateSection from "@/components/steps/generate-section";
import PreviewSection from "@/components/steps/preview-section";
import ExportSection from "@/components/steps/export-section";
import { StepType } from "@/lib/types";
import { steps } from "@/lib/constants";
import { useStepsStore } from "@/stores/use-steps-store";
import { cn } from "@/lib/utils";

export default function StepWrapper() {
  const { currentStep, setCurrentStep, completedSteps, addCompletedStep } =
    useStepsStore();

  const currentStepIndex = useMemo(
    () => steps.findIndex((s) => s.id === currentStep),
    [currentStep]
  );

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [figmaLinks, setFigmaLinks] = useState<string[]>([]);
  const [extractedComponents, setExtractedComponents] = useState<any[]>([]);
  const [configuration, setConfiguration] = useState({
    styling: {
      componentSplitting: "moderate",
      eslintConfig: "recommended",
    },
    libraries: {
      ui: ["shadcn/ui", "tailwindcss"],
      stateManagement: ["zustand"],
      forms: ["react-hook-form"],
    },
  });
  const [generatedCode, setGeneratedCode] = useState<any>(null);

  const handleStepComplete = useCallback(
    (step: StepType) => {
      if (!completedSteps?.has(step)) {
        addCompletedStep(step);
      }
    },
    [addCompletedStep, completedSteps]
  );

  const handleNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      handleStepComplete(currentStep);
      setCurrentStep(steps[currentStepIndex + 1].id);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1].id);
    }
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case StepType.UPLOAD:
        return uploadedFiles.length > 0 || figmaLinks.length > 0;
      case StepType.CONFIG:
        return true;
      case StepType.GENERATE:
        return generatedCode !== null;
      case StepType.PREVIEW:
        return true;
      default:
        return true;
    }
  };

  const stepContent = useMemo(() => {
    switch (steps[currentStepIndex].component) {
      case StepType.UPLOAD:
        return (
          <UploadSection
            uploadedFiles={uploadedFiles}
            setUploadedFiles={setUploadedFiles}
            figmaLinks={figmaLinks}
            setFigmaLinks={setFigmaLinks}
          />
        );
      case StepType.CONFIG:
        return (
          <ConfigSection
            configuration={configuration}
            onConfigurationChange={setConfiguration}
          />
        );
      case StepType.GENERATE:
        return (
          <GenerateSection
            uploadedFiles={uploadedFiles}
            figmaLinks={figmaLinks}
            extractedComponents={extractedComponents}
            setExtractedComponents={setExtractedComponents}
            configuration={configuration}
            onCodeGenerated={(code) => {
              setGeneratedCode(code);
              handleStepComplete(StepType.GENERATE);
            }}
          />
        );
      case StepType.PREVIEW:
        return (
          <PreviewSection
            originalDesigns={uploadedFiles}
            generatedCode={generatedCode}
            components={extractedComponents}
          />
        );
      case StepType.EXPORT:
        return (
          <ExportSection
            generatedCode={generatedCode}
            components={extractedComponents}
          />
        );
      default:
        return null;
    }
  }, [
    configuration,
    currentStepIndex,
    extractedComponents,
    figmaLinks,
    generatedCode,
    handleStepComplete,
    uploadedFiles,
  ]);

  return (
    <div className="container py-6 pr-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                {steps[currentStepIndex].title}
                <Badge variant="outline">
                  Step {currentStepIndex + 1} of {steps.length}
                </Badge>
              </CardTitle>
              <CardDescription>
                {steps[currentStepIndex].description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {stepContent}
          <div className="flex items-center justify-between pt-6 border-t">
            <Button
              variant="outline"
              onClick={handlePrevStep}
              disabled={currentStepIndex === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium">
                Step {currentStepIndex + 1} of {steps.length}
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

            <Button
              onClick={handleNextStep}
              disabled={
                currentStepIndex === steps.length - 1 || !canProceedToNext()
              }
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
