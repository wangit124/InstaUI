"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Code2, ArrowLeft, ArrowRight } from "lucide-react"
import UploadSection from "@/components/upload-section"
import ConfigurationPanel from "@/components/configuration-panel"
import GenerateSection from "@/components/generate-section"
import PreviewSection from "@/components/preview-section"
import DirectoryViewer from "@/components/directory-viewer"
import StepperNavigation from "@/components/stepper-navigation"
import ThemeProvider from "@/components/theme-provider"
import ThemeSelector from "@/components/theme-selector"

const steps = [
  {
    id: "upload",
    title: "Upload",
    description: "Import designs",
    component: "upload",
  },
  {
    id: "config",
    title: "Configure",
    description: "Setup preferences",
    component: "config",
  },
  {
    id: "generate",
    title: "Generate",
    description: "Create code & components",
    component: "generate",
  },
  {
    id: "preview",
    title: "Preview",
    description: "Review results",
    component: "preview",
  },
  {
    id: "directory",
    title: "Export",
    description: "Download & deploy",
    component: "directory",
  },
]

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [figmaLinks, setFigmaLinks] = useState<string[]>([])
  const [extractedComponents, setExtractedComponents] = useState<any[]>([])
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
  })
  const [generatedCode, setGeneratedCode] = useState<any>(null)

  const handleStepComplete = (stepIndex: number) => {
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps([...completedSteps, stepIndex])
    }
  }

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      handleStepComplete(currentStep)
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex)
  }

  const canProceedToNext = () => {
    switch (currentStep) {
      case 0: // Upload
        return uploadedFiles.length > 0 || figmaLinks.length > 0
      case 1: // Config
        return true // Always can proceed from config
      case 2: // Generate
        return generatedCode !== null
      case 3: // Preview
        return true // Always can proceed from preview
      default:
        return true
    }
  }

  const renderStepContent = () => {
    switch (steps[currentStep].component) {
      case "upload":
        return (
          <UploadSection
            uploadedFiles={uploadedFiles}
            setUploadedFiles={setUploadedFiles}
            figmaLinks={figmaLinks}
            setFigmaLinks={setFigmaLinks}
            onExtractComponents={(components) => {
              setExtractedComponents(components)
              handleStepComplete(0)
            }}
          />
        )
      case "config":
        return <ConfigurationPanel configuration={configuration} onConfigurationChange={setConfiguration} />
      case "generate":
        return (
          <GenerateSection
            uploadedFiles={uploadedFiles}
            figmaLinks={figmaLinks}
            extractedComponents={extractedComponents}
            setExtractedComponents={setExtractedComponents}
            configuration={configuration}
            onCodeGenerated={(code) => {
              setGeneratedCode(code)
              handleStepComplete(2)
            }}
          />
        )
      case "preview":
        return (
          <PreviewSection
            originalDesigns={uploadedFiles}
            generatedCode={generatedCode}
            components={extractedComponents}
          />
        )
      case "directory":
        return <DirectoryViewer generatedCode={generatedCode} components={extractedComponents} />
      default:
        return null
    }
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Code2 className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">DesignGen</h1>
                <p className="text-xs text-muted-foreground">Design to Code Generator</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <ThemeSelector />
              <Badge variant="secondary">Beta</Badge>
            </div>
          </div>
        </header>

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
                  <CardDescription>{steps[currentStep].description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {renderStepContent()}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-6 border-t">
                <Button variant="outline" onClick={handlePrevStep} disabled={currentStep === 0}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                <div className="text-sm text-muted-foreground">
                  {currentStep + 1} of {steps.length} steps
                </div>

                <Button onClick={handleNextStep} disabled={currentStep === steps.length - 1 || !canProceedToNext()}>
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ThemeProvider>
  )
}
