"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Code, Package, FileText } from "lucide-react"

interface Configuration {
  styling: {
    componentSplitting: string
    eslintConfig: string
  }
  libraries: {
    ui: string[]
    stateManagement: string[]
    forms: string[]
  }
}

interface ConfigurationPanelProps {
  configuration: Configuration
  onConfigurationChange: (config: Configuration) => void
}

export default function ConfigurationPanel({ configuration, onConfigurationChange }: ConfigurationPanelProps) {
  const updateConfiguration = (section: string, key: string, value: any) => {
    const newConfig = {
      ...configuration,
      [section]: {
        ...configuration[section as keyof Configuration],
        [key]: value,
      },
    }
    onConfigurationChange(newConfig)
  }

  const toggleLibrary = (category: keyof Configuration["libraries"], library: string) => {
    const currentLibraries = configuration.libraries[category]
    const newLibraries = currentLibraries.includes(library)
      ? currentLibraries.filter((lib) => lib !== library)
      : [...currentLibraries, library]

    updateConfiguration("libraries", category, newLibraries)
  }

  const uiLibraries = [
    { id: "shadcn/ui", name: "shadcn/ui", description: "Beautifully designed components" },
    { id: "tailwindcss", name: "Tailwind CSS", description: "Utility-first CSS framework" },
    { id: "chakra-ui", name: "Chakra UI", description: "Modular and accessible component library" },
    { id: "mantine", name: "Mantine", description: "Full-featured React components library" },
    { id: "ant-design", name: "Ant Design", description: "Enterprise-class UI design language" },
  ]

  const stateManagementLibraries = [
    { id: "zustand", name: "Zustand", description: "Small, fast and scalable state management" },
    { id: "redux-toolkit", name: "Redux Toolkit", description: "Official, opinionated Redux toolset" },
    { id: "jotai", name: "Jotai", description: "Primitive and flexible state management" },
    { id: "valtio", name: "Valtio", description: "Proxy-state made simple" },
  ]

  const formLibraries = [
    { id: "react-hook-form", name: "React Hook Form", description: "Performant, flexible forms" },
    { id: "formik", name: "Formik", description: "Build forms without tears" },
    {
      id: "react-final-form",
      name: "React Final Form",
      description: "High performance subscription-based form state management",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Code Styling & Refactoring */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Code Styling & Refactoring
          </CardTitle>
          <CardDescription>Configure how components are structured and styled</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="component-splitting">Component Splitting</Label>
              <Select
                value={configuration.styling.componentSplitting}
                onValueChange={(value) => updateConfiguration("styling", "componentSplitting", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select splitting level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minimal">Minimal - Keep components large</SelectItem>
                  <SelectItem value="moderate">Moderate - Balance size and reusability</SelectItem>
                  <SelectItem value="aggressive">Aggressive - Split into smallest components</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Controls how deeply nested components are split into separate files
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="eslint-config">ESLint Configuration</Label>
              <Select
                value={configuration.styling.eslintConfig}
                onValueChange={(value) => updateConfiguration("styling", "eslintConfig", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select ESLint config" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended - Standard rules</SelectItem>
                  <SelectItem value="strict">Strict - Enforce best practices</SelectItem>
                  <SelectItem value="airbnb">Airbnb - Popular style guide</SelectItem>
                  <SelectItem value="custom">Custom - Import your config</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">Choose the ESLint configuration for code quality</p>
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
          <CardDescription>Choose the libraries to include in your generated code</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* UI Libraries */}
          <div className="space-y-4">
            <div>
              <Label className="text-base font-medium">Design & UI Libraries</Label>
              <p className="text-sm text-muted-foreground">Select UI component libraries and styling frameworks</p>
            </div>
            <div className="grid gap-3">
              {uiLibraries.map((library) => (
                <div key={library.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <Checkbox
                    id={library.id}
                    checked={configuration.libraries.ui.includes(library.id)}
                    onCheckedChange={() => toggleLibrary("ui", library.id)}
                  />
                  <div className="flex-1">
                    <Label htmlFor={library.id} className="font-medium cursor-pointer">
                      {library.name}
                    </Label>
                    <p className="text-sm text-muted-foreground">{library.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <Label className="text-sm">Selected:</Label>
              {configuration.libraries.ui.map((lib) => (
                <Badge key={lib} variant="secondary">
                  {lib}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* State Management */}
          <div className="space-y-4">
            <div>
              <Label className="text-base font-medium">State Management</Label>
              <p className="text-sm text-muted-foreground">Choose state management solutions for your application</p>
            </div>
            <div className="grid gap-3">
              {stateManagementLibraries.map((library) => (
                <div key={library.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <Checkbox
                    id={library.id}
                    checked={configuration.libraries.stateManagement.includes(library.id)}
                    onCheckedChange={() => toggleLibrary("stateManagement", library.id)}
                  />
                  <div className="flex-1">
                    <Label htmlFor={library.id} className="font-medium cursor-pointer">
                      {library.name}
                    </Label>
                    <p className="text-sm text-muted-foreground">{library.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <Label className="text-sm">Selected:</Label>
              {configuration.libraries.stateManagement.map((lib) => (
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
              <p className="text-sm text-muted-foreground">Select form handling and validation libraries</p>
            </div>
            <div className="grid gap-3">
              {formLibraries.map((library) => (
                <div key={library.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <Checkbox
                    id={library.id}
                    checked={configuration.libraries.forms.includes(library.id)}
                    onCheckedChange={() => toggleLibrary("forms", library.id)}
                  />
                  <div className="flex-1">
                    <Label htmlFor={library.id} className="font-medium cursor-pointer">
                      {library.name}
                    </Label>
                    <p className="text-sm text-muted-foreground">{library.description}</p>
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

      {/* Configuration Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Configuration Summary
          </CardTitle>
          <CardDescription>Review your current configuration settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label className="font-medium">Code Style</Label>
              <div className="mt-1 space-y-1">
                <p className="text-sm">
                  Component Splitting: <Badge variant="outline">{configuration.styling.componentSplitting}</Badge>
                </p>
                <p className="text-sm">
                  ESLint Config: <Badge variant="outline">{configuration.styling.eslintConfig}</Badge>
                </p>
              </div>
            </div>
            <div>
              <Label className="font-medium">Selected Libraries</Label>
              <div className="mt-2 space-y-2">
                <div>
                  <Label className="text-sm text-muted-foreground">UI:</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {configuration.libraries.ui.map((lib) => (
                      <Badge key={lib} variant="secondary" className="text-xs">
                        {lib}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">State:</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {configuration.libraries.stateManagement.map((lib) => (
                      <Badge key={lib} variant="secondary" className="text-xs">
                        {lib}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Forms:</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {configuration.libraries.forms.map((lib) => (
                      <Badge key={lib} variant="secondary" className="text-xs">
                        {lib}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
