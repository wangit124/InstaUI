"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Code, Package } from "lucide-react";
import { useGlobalFormStore } from "@/hooks/use-global-form-store";
import { Configuration } from "@/lib/types";
import {
  uiLibraries,
  stateLibraries,
  formLibraries,
  baseFrameworks,
  componentSplittingLevels,
} from "@/lib/constants";
import { Switch } from "@/components/ui/switch";

export default function ConfigSection() {
  const { configuration, setConfiguration } = useGlobalFormStore();

  const toggleLibrary = (
    category: Exclude<keyof Configuration["libraries"], "ui">,
    library: string
  ) => {
    const currentLibraries = configuration.libraries[category];
    const newLibraries = currentLibraries.includes(library)
      ? currentLibraries.filter((lib) => lib !== library)
      : [...currentLibraries, library];
    setConfiguration({
      ...configuration,
      libraries: { ...configuration.libraries, [category]: newLibraries },
    });
  };

  return (
    <div className="space-y-6">
      {/* Base Framework */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Base Framework
          </CardTitle>
          <CardDescription>
            Configure which base framework to use for your project
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 gap-2">
          <div className="space-y-2">
            <Label htmlFor="base-framework">Framework</Label>
            <Select
              value={configuration.baseFramework}
              onValueChange={(value) =>
                setConfiguration({
                  ...configuration,
                  baseFramework: value as Configuration["baseFramework"],
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select base framework" />
              </SelectTrigger>
              <SelectContent>
                {baseFrameworks.map((f) => (
                  <SelectItem key={f.id} defaultChecked value={f.id}>
                    {f.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex align-center pt-2 gap-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="tailwind">Enable Tailwind CSS</Label>
              </div>
              <Switch
                style={{ margin: 0 }}
                checked={configuration.enableTailwind}
                onCheckedChange={(value) =>
                  setConfiguration({
                    ...configuration,
                    enableTailwind: value,
                  })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Code Styling & Refactoring */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Code Styling & Refactoring
          </CardTitle>
          <CardDescription>
            Configure how components are structured and styled
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="component-splitting">Component Splitting</Label>
              <Select
                value={configuration.styling.componentSplitting}
                onValueChange={(value) =>
                  setConfiguration({
                    ...configuration,
                    styling: {
                      ...configuration.styling,
                      componentSplitting:
                        value as Configuration["styling"]["componentSplitting"],
                    },
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select splitting level" />
                </SelectTrigger>
                <SelectContent>
                  {componentSplittingLevels.map((f) => (
                    <SelectItem key={f.id} defaultChecked value={f.id}>
                      {f.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Controls how deeply nested components are split into separate
                files
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Library Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Library Selection
          </CardTitle>
          <CardDescription>
            Choose the libraries to include in your generated code
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* UI Libraries */}
          <div className="space-y-4">
            <div>
              <Label className="text-base font-medium">
                Design & UI Libraries
              </Label>
              <p className="text-sm text-muted-foreground">
                Select UI component library
              </p>
            </div>
            <div className="space-y-2">
              <Select
                value={configuration.libraries.ui}
                onValueChange={(value) =>
                  setConfiguration({
                    ...configuration,
                    libraries: {
                      ...configuration.libraries,
                      ui: value as Configuration["libraries"]["ui"],
                    },
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select splitting level" />
                </SelectTrigger>
                <SelectContent>
                  {uiLibraries.map((l) => (
                    <SelectItem key={l.id} defaultChecked value={l.id}>
                      {l.name} - {l.description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          {/* State Management */}
          <div className="space-y-4">
            <div>
              <Label className="text-base font-medium">State Management</Label>
              <p className="text-sm text-muted-foreground">
                Choose state management solutions for your application
              </p>
            </div>
            <div className="grid gap-3">
              {stateLibraries.map((library) => (
                <div
                  key={library.id}
                  className="flex items-start space-x-3 p-3 border rounded-lg"
                >
                  <Checkbox
                    id={library.id}
                    checked={configuration.libraries.state.includes(library.id)}
                    onCheckedChange={() => toggleLibrary("state", library.id)}
                  />
                  <div className="flex-1">
                    <Label
                      htmlFor={library.id}
                      className="font-medium cursor-pointer"
                    >
                      {library.name}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {library.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <Label className="text-sm">Selected:</Label>
              {configuration.libraries.state.map((lib) => (
                <Badge key={lib} variant="secondary">
                  {lib}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Form Libraries */}
          <div className="space-y-4">
            <div>
              <Label className="text-base font-medium">Form Libraries</Label>
              <p className="text-sm text-muted-foreground">
                Select form handling and validation libraries
              </p>
            </div>
            <div className="grid gap-3">
              {formLibraries.map((library) => (
                <div
                  key={library.id}
                  className="flex items-start space-x-3 p-3 border rounded-lg"
                >
                  <Checkbox
                    id={library.id}
                    checked={configuration.libraries.forms.includes(library.id)}
                    onCheckedChange={() => toggleLibrary("forms", library.id)}
                  />
                  <div className="flex-1">
                    <Label
                      htmlFor={library.id}
                      className="font-medium cursor-pointer"
                    >
                      {library.name}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {library.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <Label className="text-sm">Selected:</Label>
              {configuration.libraries.forms.map((lib) => (
                <Badge key={lib} variant="secondary">
                  {lib}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
