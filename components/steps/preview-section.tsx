"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Eye,
  Code,
  Monitor,
  Smartphone,
  Tablet,
  RefreshCw,
} from "lucide-react";

interface PreviewSectionProps {
  originalDesigns: File[];
  generatedCode: any;
  components: any[];
}

export default function PreviewSection({
  originalDesigns,
  generatedCode,
  components,
}: PreviewSectionProps) {
  const [selectedComponent, setSelectedComponent] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">(
    "desktop"
  );
  const [previewMode, setPreviewMode] = useState<
    "before-after" | "components" | "full-app"
  >("before-after");

  const getViewportClass = () => {
    switch (viewMode) {
      case "mobile":
        return "max-w-sm mx-auto";
      case "tablet":
        return "max-w-2xl mx-auto";
      default:
        return "w-full";
    }
  };

  const renderComponentPreview = (component: any) => {
    // Mock component preview based on type
    switch (component.type) {
      case "Button":
        return (
          <div className="space-y-4">
            <Button>Primary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="destructive">Destructive Button</Button>
          </div>
        );
      case "Card":
        return (
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Product Title</CardTitle>
              <CardDescription>Product description goes here</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-4">$99.00</div>
              <Button className="w-full">Add to Cart</Button>
            </CardContent>
          </Card>
        );
      case "Navigation":
        return (
          <div className="border-b p-4 w-full">
            <div className="flex items-center justify-between">
              <div className="text-xl font-bold">Logo</div>
              <nav className="flex items-center gap-4">
                <a href="#" className="hover:underline">
                  Home
                </a>
                <a href="#" className="hover:underline">
                  Products
                </a>
                <a href="#" className="hover:underline">
                  About
                </a>
                <Button size="sm">Sign In</Button>
              </nav>
            </div>
          </div>
        );
      case "Form":
        return (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Contact Form</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <input
                  className="w-full p-2 border rounded mt-1"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <input
                  className="w-full p-2 border rounded mt-1"
                  placeholder="your@email.com"
                />
              </div>
              <Button className="w-full">Submit</Button>
            </CardContent>
          </Card>
        );
      default:
        return (
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
            <div className="text-muted-foreground">
              {component.name} Preview
            </div>
          </div>
        );
    }
  };

  const renderFullAppPreview = () => {
    return (
      <div className="space-y-0 border rounded-lg overflow-hidden">
        {/* Navigation */}
        <div className="border-b p-4 bg-background">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold">Your App</div>
            <nav className="flex items-center gap-4">
              <a href="#" className="hover:underline">
                Home
              </a>
              <a href="#" className="hover:underline">
                Products
              </a>
              <a href="#" className="hover:underline">
                About
              </a>
              <Button size="sm">Sign In</Button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 bg-muted/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle>Product {i}</CardTitle>
                  <CardDescription>Product description</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-4">
                    ${99 + i * 50}.00
                  </div>
                  <Button className="w-full">Add to Cart</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Preview Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Preview Controls</CardTitle>
          <CardDescription>
            Configure how you want to preview your generated components and
            application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Preview Mode:</label>
              <Select
                value={previewMode}
                onValueChange={(value: any) => setPreviewMode(value)}
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="before-after">Before & After</SelectItem>
                  <SelectItem value="components">Components</SelectItem>
                  <SelectItem value="full-app">Full Application</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Viewport:</label>
              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === "desktop" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("desktop")}
                >
                  <Monitor className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "tablet" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("tablet")}
                >
                  <Tablet className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "mobile" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("mobile")}
                >
                  <Smartphone className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Preview
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preview Content */}
      <div className={getViewportClass()}>
        <Tabs
          value={previewMode}
          onValueChange={(value: any) => setPreviewMode(value)}
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="before-after">Before & After</TabsTrigger>
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="full-app">Full Application</TabsTrigger>
          </TabsList>

          <TabsContent value="before-after" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Before */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Original Design
                  </CardTitle>
                  <CardDescription>Your uploaded design files</CardDescription>
                </CardHeader>
                <CardContent>
                  {originalDesigns.length > 0 ? (
                    <div className="space-y-4">
                      {originalDesigns.slice(0, 3).map((file, index) => (
                        <div
                          key={index}
                          className="border rounded-lg p-4 bg-muted/20"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">{file.type}</Badge>
                            <span className="text-sm font-medium">
                              {file.name}
                            </span>
                          </div>
                          <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 rounded border-2 border-dashed border-muted-foreground/25 flex items-center justify-center">
                            <span className="text-muted-foreground">
                              Design Preview
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No original designs uploaded
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* After */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-4 w-4" />
                    Generated Result
                  </CardTitle>
                  <CardDescription>
                    Your generated Next.js components
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {generatedCode ? (
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <div className="mb-4">
                          <Badge>Live Preview</Badge>
                        </div>
                        {renderFullAppPreview()}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      Generate code to see the result
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="components" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Component Preview</h3>
                <p className="text-sm text-muted-foreground">
                  Preview individual components in isolation
                </p>
              </div>
              <Select
                value={selectedComponent}
                onValueChange={setSelectedComponent}
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select component" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Components</SelectItem>
                  {components.map((component) => (
                    <SelectItem key={component.id} value={component.id}>
                      {component.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-6">
              {selectedComponent === "all"
                ? components.map((component) => (
                    <Card key={component.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle>{component.name}</CardTitle>
                            <CardDescription>
                              {component.description}
                            </CardDescription>
                          </div>
                          <Badge>{component.type}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="border rounded-lg p-6 bg-muted/20">
                          {renderComponentPreview(component)}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                : (() => {
                    const component = components.find(
                      (c) => c.id === selectedComponent
                    );
                    return component ? (
                      <Card>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle>{component.name}</CardTitle>
                              <CardDescription>
                                {component.description}
                              </CardDescription>
                            </div>
                            <Badge>{component.type}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="border rounded-lg p-6 bg-muted/20">
                            {renderComponentPreview(component)}
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        Component not found
                      </div>
                    );
                  })()}
            </div>
          </TabsContent>

          <TabsContent value="full-app" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Full Application Preview</CardTitle>
                <CardDescription>
                  Preview your complete Next.js application with all components
                  integrated
                </CardDescription>
              </CardHeader>
              <CardContent>
                {generatedCode ? (
                  <div className="border rounded-lg overflow-hidden">
                    {renderFullAppPreview()}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Code className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium mb-2">
                      No Generated Code
                    </h3>
                    <p>
                      Generate your application code to see the full preview
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
