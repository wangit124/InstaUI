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
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Play,
  CheckCircle,
  AlertCircle,
  Download,
  Code2,
  Loader2,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Upload,
  Link,
} from "lucide-react";

interface GenerateSectionProps {
  uploadedFiles: File[];
  figmaLinks: string[];
  extractedComponents: any[];
  setExtractedComponents: (components: any[]) => void;
  configuration: any;
  onCodeGenerated: (code: any) => void;
}

export default function GenerateSection({
  uploadedFiles,
  figmaLinks,
  extractedComponents,
  setExtractedComponents,
  configuration,
  onCodeGenerated,
}: GenerateSectionProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generationStep, setGenerationStep] = useState("");
  const [generationComplete, setGenerationComplete] = useState(false);
  const [generatedFiles, setGeneratedFiles] = useState<any[]>([]);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionProgress, setExtractionProgress] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedComponent, setSelectedComponent] = useState<any | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

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
    const mockComponents = [
      {
        id: "button-primary",
        name: "Primary Button",
        type: "Button",
        description: "Main call-to-action button with primary styling",
        props: ["children", "onClick", "disabled"],
        variants: ["default", "destructive", "outline"],
      },
      {
        id: "card-product",
        name: "Product Card",
        type: "Card",
        description: "Product display card with image, title, and price",
        props: ["title", "price", "image", "onAddToCart"],
        variants: ["default", "featured"],
      },
      {
        id: "nav-header",
        name: "Navigation Header",
        type: "Navigation",
        description: "Main navigation header with logo and menu items",
        props: ["logo", "menuItems", "user"],
        variants: ["default", "transparent"],
      },
      {
        id: "form-contact",
        name: "Contact Form",
        type: "Form",
        description: "Contact form with validation and submission handling",
        props: ["onSubmit", "initialValues"],
        variants: ["default", "compact"],
      },
    ];

    setExtractedComponents(mockComponents);
    setIsExtracting(false);
    setExtractionProgress(100);
  };

  const generateCode = async () => {
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
    const mockGeneratedCode = {
      files: [
        {
          path: "app/page.tsx",
          content: `import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ProductCard } from "@/components/product-card"
import { NavigationHeader } from "@/components/navigation-header"

export default function Home() {
  return (
    <div className="min-h-screen">
      <NavigationHeader />
      <main className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ProductCard title="Product 1" price="$99" />
          <ProductCard title="Product 2" price="$149" />
          <ProductCard title="Product 3" price="$199" />
        </div>
      </main>
    </div>
  )
}`,
          type: "page",
        },
        {
          path: "components/product-card.tsx",
          content: `import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ProductCardProps {
  title: string
  price: string
  image?: string
  onAddToCart?: () => void
}

export function ProductCard({ title, price, image, onAddToCart }: ProductCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{price}</p>
        <Button onClick={onAddToCart} className="w-full mt-4">
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  )
}`,
          type: "component",
        },
        {
          path: "components/navigation-header.tsx",
          content: `import Link from "next/link"
import { Button } from "@/components/ui/button"

interface NavigationHeaderProps {
  logo?: string
  menuItems?: Array<{ label: string; href: string }>
  user?: any
}

export function NavigationHeader({ logo, menuItems, user }: NavigationHeaderProps) {
  return (
    <header className="border-b">
      <div className="container mx-auto flex items-center justify-between py-4">
        <Link href="/" className="text-xl font-bold">
          {logo || "Logo"}
        </Link>
        <nav className="flex items-center gap-4">
          {menuItems?.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <Button>Sign In</Button>
        </nav>
      </div>
    </header>
  )
}`,
          type: "component",
        },
      ],
      structure: {
        "app/": ["page.tsx", "layout.tsx", "globals.css"],
        "components/": ["product-card.tsx", "navigation-header.tsx"],
        "components/ui/": ["button.tsx", "card.tsx", "input.tsx"],
        "lib/": ["utils.ts"],
      },
    };

    setGeneratedFiles(mockGeneratedCode.files);
    onCodeGenerated(mockGeneratedCode);
    setGenerationComplete(true);
    setIsGenerating(false);
  };

  const downloadCode = () => {
    // Mock download functionality
    const blob = new Blob([JSON.stringify(generatedFiles, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "generated-code.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const filteredComponents = extractedComponents.filter((component) => {
    const matchesSearch =
      component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      component.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterType === "all" ||
      component.type.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const componentTypes = [...new Set(extractedComponents.map((c) => c.type))];

  const handleEditComponent = (component: any) => {
    setSelectedComponent(component);
    setIsEditDialogOpen(true);
  };

  const handleDeleteComponent = (componentId: string) => {
    const updatedComponents = extractedComponents.filter(
      (c) => c.id !== componentId
    );
    setExtractedComponents(updatedComponents);
  };

  const generateComponentCode = (component: any) => {
    return `import React from 'react'
import { cn } from '@/lib/utils'

interface ${component.name.replace(/\s+/g, "")}Props {
  ${component.props.map((prop: string) => `${prop}?: any`).join("\n  ")}
  className?: string
}

export function ${component.name.replace(/\s+/g, "")}({ 
  ${component.props.join(", ")}, 
  className,
  ...props 
}: ${component.name.replace(/\s+/g, "")}Props) {
  return (
    <div className={cn("${component.type.toLowerCase()}", className)} {...props}>
      {/* Component implementation */}
    </div>
  )
}`;
  };

  return (
    <div className="space-y-6">
      {/* Step 1: Extract Components */}
      {extractedComponents.length === 0 && (
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
                <div className="space-y-1">
                  {uploadedFiles.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No files uploaded
                    </p>
                  ) : (
                    uploadedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between text-sm"
                      >
                        <span>{file.name}</span>
                        <Badge variant="outline">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </Badge>
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Figma Links</h4>
                <div className="space-y-1">
                  {figmaLinks.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No Figma links added
                    </p>
                  ) : (
                    figmaLinks.map((link, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm"
                      >
                        <Link className="h-3 w-3" />
                        <span className="truncate">{link}</span>
                      </div>
                    ))
                  )}
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
                  (uploadedFiles.length === 0 && figmaLinks.length === 0) ||
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
      )}

      {/* Step 2: Component Library (only shown after extraction) */}
      {extractedComponents.length > 0 && !generationComplete && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code2 className="h-5 w-5" />
              Component Library
            </CardTitle>
            <CardDescription>
              Review and manage your extracted components before generating code
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search components..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-40">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {componentTypes.map((type) => (
                      <SelectItem key={type} value={type.toLowerCase()}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Component
                </Button>
              </div>
            </div>

            {/* Components Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredComponents.map((component) => (
                <Card
                  key={component.id}
                  className="group hover:shadow-md transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          {component.name}
                        </CardTitle>
                        <Badge variant="secondary" className="mt-1">
                          {component.type}
                        </Badge>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <DialogHeader>
                              <DialogTitle>{component.name}</DialogTitle>
                              <DialogDescription>
                                {component.description}
                              </DialogDescription>
                            </DialogHeader>
                            <Tabs defaultValue="preview" className="w-full">
                              <TabsList>
                                <TabsTrigger value="preview">
                                  Preview
                                </TabsTrigger>
                                <TabsTrigger value="code">Code</TabsTrigger>
                                <TabsTrigger value="props">Props</TabsTrigger>
                              </TabsList>
                              <TabsContent value="preview" className="mt-4">
                                <div className="border rounded-lg p-8 bg-muted/20">
                                  <div className="text-center text-muted-foreground">
                                    Component preview would render here
                                  </div>
                                </div>
                              </TabsContent>
                              <TabsContent value="code" className="mt-4">
                                <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                                  <code>
                                    {generateComponentCode(component)}
                                  </code>
                                </pre>
                              </TabsContent>
                              <TabsContent value="props" className="mt-4">
                                <div className="space-y-4">
                                  <div>
                                    <Label className="text-base font-medium">
                                      Props
                                    </Label>
                                    <div className="mt-2 space-y-2">
                                      {component.props.map((prop: string) => (
                                        <Badge key={prop} variant="outline">
                                          {prop}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                  <div>
                                    <Label className="text-base font-medium">
                                      Variants
                                    </Label>
                                    <div className="mt-2 space-y-2">
                                      {component.variants.map(
                                        (variant: string) => (
                                          <Badge
                                            key={variant}
                                            variant="secondary"
                                          >
                                            {variant}
                                          </Badge>
                                        )
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </TabsContent>
                            </Tabs>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditComponent(component)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteComponent(component.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-3">
                      {component.description}
                    </CardDescription>
                    <div className="space-y-2">
                      <div>
                        <Label className="text-xs font-medium text-muted-foreground">
                          Props
                        </Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {component.props.slice(0, 3).map((prop: string) => (
                            <Badge
                              key={prop}
                              variant="outline"
                              className="text-xs"
                            >
                              {prop}
                            </Badge>
                          ))}
                          {component.props.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{component.props.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs font-medium text-muted-foreground">
                          Variants
                        </Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {component.variants.map((variant: string) => (
                            <Badge
                              key={variant}
                              variant="secondary"
                              className="text-xs"
                            >
                              {variant}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Generate Code */}
      {extractedComponents.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Code Generation</CardTitle>
            <CardDescription>
              Generate your Next.js application with the configured settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isGenerating && !generationComplete && (
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Ready to Generate</p>
                  <p className="text-sm text-muted-foreground">
                    This will create a complete Next.js application with your
                    components
                  </p>
                </div>
                <Button onClick={generateCode} size="lg">
                  <Play className="h-4 w-4 mr-2" />
                  Generate Code
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
                    {generatedFiles.length} files generated.
                  </AlertDescription>
                </Alert>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Generation Complete</p>
                    <p className="text-sm text-muted-foreground">
                      Your Next.js application is ready for preview and download
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={downloadCode}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
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

      {/* Generated Files Preview */}
      {generatedFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Files</CardTitle>
            <CardDescription>
              Preview of the generated application structure
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {generatedFiles.map((file, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Code2 className="h-4 w-4" />
                      <span className="font-mono text-sm">{file.path}</span>
                    </div>
                    <Badge
                      variant={
                        file.type === "component" ? "default" : "secondary"
                      }
                    >
                      {file.type}
                    </Badge>
                  </div>
                  <pre className="text-xs bg-muted p-2 rounded overflow-x-auto max-h-32">
                    <code>{file.content.substring(0, 200)}...</code>
                  </pre>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Validation Warnings */}
      {extractedComponents.length === 0 &&
        uploadedFiles.length === 0 &&
        figmaLinks.length === 0 && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              No designs have been uploaded yet. Please go back to the Upload
              step to add design files or Figma links.
            </AlertDescription>
          </Alert>
        )}

      {/* Edit Component Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Component</DialogTitle>
            <DialogDescription>
              Modify component properties and configuration
            </DialogDescription>
          </DialogHeader>
          {selectedComponent && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Component Name</Label>
                <Input id="name" defaultValue={selectedComponent.name} />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  defaultValue={selectedComponent.description}
                />
              </div>
              <div>
                <Label htmlFor="type">Type</Label>
                <Select defaultValue={selectedComponent.type}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Button">Button</SelectItem>
                    <SelectItem value="Card">Card</SelectItem>
                    <SelectItem value="Form">Form</SelectItem>
                    <SelectItem value="Navigation">Navigation</SelectItem>
                    <SelectItem value="Layout">Layout</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={() => setIsEditDialogOpen(false)}>
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
