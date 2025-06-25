"use client";

import { useMemo, useCallback } from "react";
import JSZip from "jszip";
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
import { useStepsStore } from "@/hooks/use-steps-store";
import { cn } from "@/lib/utils";
import { useGlobalFormStore } from "@/hooks/use-global-form-store";

export default function StepWrapper() {
  const { currentStep, setCurrentStep, completedSteps, addCompletedStep } =
    useStepsStore();

  const currentStepIndex = useMemo(
    () => steps.findIndex((s) => s.id === currentStep),
    [currentStep]
  );

  const { uploadedFiles, figmaImages, generatedResponse } =
    useGlobalFormStore();

  const handleStepComplete = useCallback(
    (step: StepType) => {
      if (!completedSteps?.has(step)) {
        addCompletedStep(step);
      }
    },
    [addCompletedStep, completedSteps]
  );

  const exportFiles = async () => {
    const files = generatedResponse?.full?.files;

    if (!files || files.length === 0) {
      alert("No files to export. Please generate your application first.");
      return;
    }

    try {
      // Create new JSZip instance
      const zip = new JSZip();

      // Add each file to the zip with proper directory structure
      files.forEach((file) => {
        // JSZip automatically creates directories when using paths like "src/components/Button.tsx"
        zip.file(file.fileName, file.code);
      });

      // Generate the zip file
      const zipBlob = await zip.generateAsync({ type: "blob" });

      // Create download link for the zip file
      const url = URL.createObjectURL(zipBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "new-project.zip";

      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error creating zip file:", error);
      alert("Error creating zip file. Please try again.");
    }
  };

  const handleNextStep = () => {
    if (currentStepIndex === steps.length - 1) {
      exportFiles();
      return;
    }
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
        return uploadedFiles.length > 0 || figmaImages.length > 0;
      case StepType.CONFIG:
        return true;
      case StepType.GENERATE:
        return true;
      case StepType.PREVIEW:
        return true;
      default:
        return true;
    }
  };

  const stepContent = useMemo(() => {
    switch (currentStep) {
      case StepType.UPLOAD:
        return <UploadSection />;
      case StepType.CONFIG:
        return <ConfigSection />;
      case StepType.GENERATE:
        return <GenerateSection />;
      case StepType.PREVIEW:
        return <PreviewSection />;
      case StepType.EXPORT:
        return <ExportSection />;
      default:
        return null;
    }
  }, [currentStep]);

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

            <div className="flex items-center justify-between gap-2">
              <div className="text-sm font-medium">
                Step {currentStepIndex + 1} of {steps.length}
              </div>
              <div className="flex items-center gap-1">
                {steps.map((step, index) => (
                  <div
                    key={step.id}
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

            <Button onClick={handleNextStep} disabled={!canProceedToNext()}>
              {currentStepIndex === steps.length - 1 ? "Export" : "Next"}
              {currentStepIndex !== steps.length - 1 && (
                <ArrowRight className="h-4 w-4 ml-2" />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
