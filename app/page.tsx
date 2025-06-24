"use client";

import { useState } from "react";
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
import UploadSection from "@/components/upload-section";
import ConfigurationPanel from "@/components/configuration-panel";
import GenerateSection from "@/components/generate-section";
import PreviewSection from "@/components/preview-section";
import ExportSection from "@/components/export-section";
import StepperNavigation from "@/components/stepper-navigation";
import ThemeProvider from "@/components/theme-provider";
import { Steps } from "@/lib/types";
import Header from "@/components/header";

const steps = [
  {
    id: Steps.UPLOAD,
    title: "Upload",
    description: "Import designs",
    component: "upload",
  },
  {
    id: Steps.CONFIG,
    title: "Configure",
    description: "Setup preferences",
    component: "config",
  },
  {
    id: Steps.GENERATE,
    title: "Generate",
    description: "Create code & components",
    component: "generate",
  },
  {
    id: Steps.PREVIEW,
    title: "Preview",
    description: "Review results",
    component: "preview",
  },
  {
    id: Steps.EXPORT,
    title: "Export",
    description: "Download & deploy",
    component: "export",
  },
];

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
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

  const handleStepComplete = (stepIndex: number) => {
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps([...completedSteps, stepIndex]);
    }
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      handleStepComplete(currentStep);
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 0: // Upload
        return uploadedFiles.length > 0 || figmaLinks.length > 0;
      case 1: // Config
        return true; // Always can proceed from config
      case 2: // Generate
        return generatedCode !== null;
      case 3: // Preview
        return true; // Always can proceed from preview
      default:
        return true;
    }
  };

  const renderStepContent = () => {
    switch (steps[currentStep].component) {
      case Steps.UPLOAD:
        return (
          <UploadSection
            uploadedFiles={uploadedFiles}
            setUploadedFiles={setUploadedFiles}
            figmaLinks={figmaLinks}
            setFigmaLinks={setFigmaLinks}
          />
        );
      case Steps.CONFIG:
        return (
          <ConfigurationPanel
            configuration={configuration}
            onConfigurationChange={setConfiguration}
          />
        );
      case Steps.GENERATE:
        return (
          <GenerateSection
            uploadedFiles={uploadedFiles}
            figmaLinks={figmaLinks}
            extractedComponents={extractedComponents}
            setExtractedComponents={setExtractedComponents}
            configuration={configuration}
            onCodeGenerated={(code) => {
              setGeneratedCode(code);
              handleStepComplete(2);
            }}
          />
        );
      case Steps.PREVIEW:
        return (
          <PreviewSection
            originalDesigns={uploadedFiles}
            generatedCode={generatedCode}
            components={extractedComponents}
          />
        );
      case Steps.EXPORT:
        return (
          <ExportSection
            generatedCode={generatedCode}
            components={extractedComponents}
          />
        );
      default:
        return null;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <Header />

        {/* Stepper Navigation */}
        <div className="border-b bg-background/50">
          <div className="container py-4">
            <StepperNavigation
              steps={steps}
              currentStep={currentStep}
              completedSteps={completedSteps}
              onStepClick={handleStepClick}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="container py-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {steps[currentStep].title}
                    <Badge variant="outline">
                      Step {currentStep + 1} of {steps.length}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    {steps[currentStep].description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {renderStepContent()}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={handlePrevStep}
                  disabled={currentStep === 0}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                <div className="text-sm text-muted-foreground">
                  {currentStep + 1} of {steps.length} steps
                </div>

                <Button
                  onClick={handleNextStep}
                  disabled={
                    currentStep === steps.length - 1 || !canProceedToNext()
                  }
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ThemeProvider>
  );
}
