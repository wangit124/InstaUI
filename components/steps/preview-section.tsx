"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Monitor, Smartphone, Tablet } from "lucide-react";
import { useGlobalFormStore } from "@/hooks/use-global-form-store";
import Image from "next/image";

export default function PreviewSection() {
  const { generatedResponse, figmaImages } = useGlobalFormStore();

  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">(
    "desktop"
  );

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

  const fullAppPreview = (
    <div className="grid gap-2">
      {figmaImages.slice(0).map((image, index) => (
        <Card key={index}>
          <CardContent className="flex justify-center p-3">
            <div className="flex items-center justify-center gap-3">
              <Image
                src={image}
                alt={image}
                width={0}
                height={0}
                style={{ width: 200, height: "auto" }}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

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
          </div>
        </CardContent>
      </Card>

      {/* Preview Content */}
      <div className={getViewportClass()}>
        <Card>
          <CardHeader>
            <CardTitle>Full Application Preview</CardTitle>
            <CardDescription>
              Preview your complete application with all components integrated
            </CardDescription>
          </CardHeader>
          <CardContent>
            {generatedResponse?.full ? (
              <div className="border rounded-lg overflow-hidden">
                {fullAppPreview}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Code className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">No Generated Code</h3>
                <p>Generate your application code to see the full preview</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
