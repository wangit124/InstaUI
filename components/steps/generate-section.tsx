"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Play,
  CheckCircle,
  Code2,
  Loader2,
  Upload,
  Copy,
  Check,
} from "lucide-react";
import { useGlobalFormStore } from "@/hooks/use-global-form-store";
import Image from "next/image";
import { GeneratedFile, GeneratedResponse } from "@/lib/types";

export default function GenerateSection() {
  const {
    uploadedFiles,
    figmaImages,
    generatedResponse,
    setGeneratedResponse,
  } = useGlobalFormStore();

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generationStep, setGenerationStep] = useState("");
  const [generationComplete, setGenerationComplete] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionProgress, setExtractionProgress] = useState(0);
  const [copiedIds, setCopiedIds] = useState<Set<string>>(new Set());

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIds((prev) => new Set(prev).add(id));
      setTimeout(() => {
        setCopiedIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const extractComponents = async () => {
    setIsExtracting(true);
    setExtractionProgress(0);

    // Simulate component extraction process
    const steps = [
      "Analyzing uploaded designs...",
      "Identifying UI patterns...",
      "Extracting components...",
      "Generating component metadata...",
      "Finalizing component library...",
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setExtractionProgress((i + 1) * 20);
    }

    // Mock extracted components
    const mockComponents: GeneratedFile[] = [
      {
        id: "button-primary",
        fileName: "button-primary.tsx",
        code: `import { Button } from "@/components/ui/button"

export function ButtonPrimary() {
  return <Button>Click me</Button>
}`,
      },
    ];
    setGeneratedResponse({
      ...(generatedResponse || {}),
      sharedComponents: mockComponents,
    });
    setIsExtracting(false);
    setExtractionProgress(100);
  };

  const generateFullApp = async () => {
    setIsGenerating(true);
    setGenerationProgress(0);
    setGenerationComplete(false);

    const steps = [
      { step: "Initializing MCP server connection...", progress: 10 },
      { step: "Analyzing component structure...", progress: 25 },
      { step: "Generating component files...", progress: 45 },
      { step: "Creating application structure...", progress: 65 },
      { step: "Applying styling and configuration...", progress: 80 },
      { step: "Optimizing and finalizing code...", progress: 95 },
      { step: "Generation complete!", progress: 100 },
    ];

    for (const { step, progress } of steps) {
      setGenerationStep(step);
      setGenerationProgress(progress);
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }

    // Mock generated code structure
    const mockGeneratedCode: GeneratedResponse["full"] = {
      files: [
        {
          id: "button-primary",
          fileName: "button-primary.tsx",
          code: `import { Button } from "@/components/ui/button"
  
  export function ButtonPrimary() {
    return <Button>Click me</Button>
  }`,
        },
      ],
      structure: {
        "app/": ["page.tsx", "layout.tsx", "globals.css"],
        "components/": ["product-card.tsx", "navigation-header.tsx"],
        "components/ui/": ["button.tsx", "card.tsx", "input.tsx"],
        "lib/": ["utils.ts"],
      },
    };

    setGeneratedResponse({ ...generatedResponse, full: mockGeneratedCode });
    setGenerationComplete(true);
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6">
      {/* Step 1: Extract Components */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Extract Components
          </CardTitle>
          <CardDescription>
            First, extract reusable components from your uploaded designs and
            Figma links
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-medium mb-2">Uploaded Files</h4>
              <div className="grid gap-2">
                {uploadedFiles.map((file, index) => (
                  <Card key={index}>
                    <CardContent className="flex justify-between p-3">
                      <div className="flex items-center gap-3">
                        <Image
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          width={0}
                          height={0}
                          style={{ width: 150, height: "auto" }}
                        />
                        <div>
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {figmaImages.map((image, index) => (
                  <Card key={index}>
                    <CardContent className="flex justify-between p-3">
                      <div className="flex items-center gap-3">
                        <Image
                          src={image}
                          alt={image}
                          width={0}
                          height={0}
                          style={{ width: 150, height: "auto" }}
                        />
                        <p className="text-sm font-medium">{image}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div>
              <p className="font-medium">Ready to Extract Components</p>
              <p className="text-sm text-muted-foreground">
                Analyze your designs to identify reusable UI components
              </p>
            </div>
            <Button
              onClick={extractComponents}
              disabled={
                (uploadedFiles.length === 0 && figmaImages.length === 0) ||
                isExtracting
              }
              size="lg"
            >
              {isExtracting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Extracting...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Extract Components
                </>
              )}
            </Button>
          </div>

          {isExtracting && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Extracting components...</span>
                <span>{extractionProgress}%</span>
              </div>
              <Progress value={extractionProgress} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Step 2: Component Library (only shown after extraction) */}
      {!!generatedResponse?.sharedComponents?.length && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code2 className="h-5 w-5" />
              Component Library
            </CardTitle>
            <CardDescription>
              Review and manage your extracted components before generating the
              full application
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Components Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {generatedResponse?.sharedComponents?.map((component) => (
                <Card
                  key={component.id}
                  className="group hover:shadow-md transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">
                        {component.fileName}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <Button
                        size="sm"
                        className="absolute top-2 right-2 z-10"
                        onClick={() =>
                          copyToClipboard(component.code, component.id)
                        }
                      >
                        {copiedIds.has(component.id) ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                      <pre className="bg-muted rounded-md p-4 text-sm overflow-x-auto">
                        <code className="language-typescript">
                          {component.code}
                        </code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Generate Code */}
      {!!generatedResponse?.sharedComponents?.length && (
        <Card>
          <CardHeader>
            <CardTitle>Full App Generation</CardTitle>
            <CardDescription>
              Generate your application with the configured settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isGenerating && !generationComplete && (
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Ready to Generate</p>
                  <p className="text-sm text-muted-foreground">
                    This will create a complete application with your components
                  </p>
                </div>
                <Button onClick={generateFullApp} size="lg">
                  <Play className="h-4 w-4 mr-2" />
                  Generate App
                </Button>
              </div>
            )}

            {isGenerating && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="font-medium">Generating...</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>{generationStep}</span>
                    <span>{generationProgress}%</span>
                  </div>
                  <Progress value={generationProgress} className="w-full" />
                </div>
              </div>
            )}

            {generationComplete && (
              <div className="space-y-4">
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Code generation completed successfully!{" "}
                    {generatedResponse?.full?.files?.length || 0} files
                    generated.
                  </AlertDescription>
                </Alert>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Generation Complete</p>
                    <p className="text-sm text-muted-foreground">
                      Your application is ready for preview
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => setGenerationComplete(false)}>
                      <Code2 className="h-4 w-4 mr-2" />
                      Regenerate
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
