"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronDown, ChevronRight, File, Folder, FolderOpen, Code2, FileText, Settings, Package } from "lucide-react"

interface DirectoryViewerProps {
  generatedCode: any;
  components: any[];
}

export default function DirectoryViewer({ generatedCode, components }: DirectoryViewerProps) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(["app", "components"]))

  const toggleFolder = (folderPath: string) => {
    const newExpanded = new Set(expandedFolders)
    if (newExpanded.has(folderPath)) {
      newExpanded.delete(folderPath)
    } else {
      newExpanded.add(folderPath)
    }
    setExpandedFolders(newExpanded)
  }

  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith(".tsx") || fileName.endsWith(".ts")) {
      return <Code2 className="h-4 w-4 text-blue-500" />
    }
    if (fileName.endsWith(".css")) {
      return <FileText className="h-4 w-4 text-green-500" />
    }
    if (fileName.endsWith(".json")) {
      return <Settings className="h-4 w-4 text-yellow-500" />
    }
    return <File className="h-4 w-4 text-muted-foreground" />
  }

  const mockDirectoryStructure = {
    "app/": {
      type: "folder",
      children: {
        "page.tsx": {
          type: "file",
          content: generatedCode?.files?.find((f: any) => f.path === "app/page.tsx")?.content,
        },
        "layout.tsx": { type: "file", content: "// Layout component" },
        "globals.css": { type: "file", content: "/* Global styles */" },
      },
    },
    "components/": {
      type: "folder",
      children: {
        "product-card.tsx": {
          type: "file",
          content: generatedCode?.files?.find((f: any) => f.path === "components/product-card.tsx")?.content,
        },
        "navigation-header.tsx": {
          type: "file",
          content: generatedCode?.files?.find((f: any) => f.path === "components/navigation-header.tsx")?.content,
        },
        "ui/": {
          type: "folder",
          children: {
            "button.tsx": { type: "file", content: "// Button component" },
            "card.tsx": { type: "file", content: "// Card component" },
            "input.tsx": { type: "file", content: "// Input component" },
          },
        },
      },
    },
    "lib/": {
      type: "folder",
      children: {
        "utils.ts": { type: "file", content: "// Utility functions" },
      },
    },
    "package.json": { type: "file", content: "// Package configuration" },
    "tailwind.config.js": { type: "file", content: "// Tailwind configuration" },
    "next.config.js": { type: "file", content: "// Next.js configuration" },
  }

  const renderDirectoryTree = (structure: any, basePath = "") => {
    return Object.entries(structure).map(([name, item]: [string, any]) => {
      const fullPath = basePath ? `${basePath}/${name}` : name
      const isFolder = item.type === "folder"
      const isExpanded = expandedFolders.has(fullPath)

      if (isFolder) {
        return (
          <div key={fullPath}>
            <Collapsible open={isExpanded} onOpenChange={() => toggleFolder(fullPath)}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-start h-8 px-2 font-normal">
                  {isExpanded ? <ChevronDown className="h-4 w-4 mr-1" /> : <ChevronRight className="h-4 w-4 mr-1" />}
                  {isExpanded ? (
                    <FolderOpen className="h-4 w-4 mr-2 text-blue-500" />
                  ) : (
                    <Folder className="h-4 w-4 mr-2 text-blue-500" />
                  )}
                  {name}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="ml-4">{renderDirectoryTree(item.children, fullPath)}</CollapsibleContent>
            </Collapsible>
          </div>
        )
      } else {
        return (
          <Button
            key={fullPath}
            variant={selectedFile === fullPath ? "secondary" : "ghost"}
            className="w-full justify-start h-8 px-2 font-normal ml-5"
            onClick={() => setSelectedFile(fullPath)}
          >
            {getFileIcon(name)}
            <span className="ml-2">{name}</span>
          </Button>
        )
      }
    })
  }

  const getSelectedFileContent = () => {
    if (!selectedFile) return null

    const pathParts = selectedFile.split("/")
    let current = mockDirectoryStructure

    for (const part of pathParts) {
      if (current[part]) {
        if (current[part].type === "file") {
          return current[part].content
        } else {
          current = current[part].children
        }
      }
    }
    return null
  }

  const getComponentDocumentation = (fileName: string) => {
    const componentName = fileName.replace(".tsx", "").replace(".ts", "")
    const component = components.find(
      (c) => c.name.toLowerCase().replace(/\s+/g, "-") === componentName || c.id === componentName,
    )

    if (!component) return null

    return {
      name: component.name,
      description: component.description,
      type: component.type,
      props: component.props,
      variants: component.variants,
    }
  }

  return (
    <div className="space-y-6">
      {!generatedCode ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No Generated Code</h3>
            <p className="text-muted-foreground text-center">
              Generate your application code to explore the directory structure
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Directory Tree */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-base">Project Structure</CardTitle>
              <CardDescription>Navigate through your generated files</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-96 overflow-y-auto">{renderDirectoryTree(mockDirectoryStructure)}</div>
            </CardContent>
          </Card>

          {/* File Content & Documentation */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">{selectedFile ? selectedFile : "Select a file"}</CardTitle>
              <CardDescription>
                {selectedFile ? "File content and documentation" : "Choose a file from the directory tree"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedFile ? (
                <Tabs defaultValue="content" className="w-full">
                  <TabsList>
                    <TabsTrigger value="content">Content</TabsTrigger>
                    {selectedFile.endsWith(".tsx") && <TabsTrigger value="docs">Documentation</TabsTrigger>}
                  </TabsList>

                  <TabsContent value="content" className="mt-4">
                    <div className="border rounded-lg">
                      <div className="bg-muted px-3 py-2 border-b">
                        <div className="flex items-center gap-2">
                          {getFileIcon(selectedFile.split("/").pop() || "")}
                          <span className="font-mono text-sm">{selectedFile}</span>
                        </div>
                      </div>
                      <pre className="p-4 text-sm overflow-x-auto max-h-96">
                        <code>{getSelectedFileContent() || "// File content not available"}</code>
                      </pre>
                    </div>
                  </TabsContent>

                  {selectedFile.endsWith(".tsx") && (
                    <TabsContent value="docs" className="mt-4">
                      {(() => {
                        const fileName = selectedFile.split("/").pop() || ""
                        const docs = getComponentDocumentation(fileName)

                        return docs ? (
                          <div className="space-y-6">
                            <div>
                              <h3 className="text-lg font-medium mb-2">{docs.name}</h3>
                              <p className="text-muted-foreground mb-4">{docs.description}</p>
                              <Badge>{docs.type}</Badge>
                            </div>

                            <div>
                              <h4 className="font-medium mb-2">Props</h4>
                              <div className="grid gap-2">
                                {docs.props.map((prop: string) => (
                                  <div key={prop} className="flex items-center justify-between p-2 border rounded">
                                    <code className="text-sm">{prop}</code>
                                    <Badge variant="outline">any</Badge>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium mb-2">Variants</h4>
                              <div className="flex flex-wrap gap-2">
                                {docs.variants.map((variant: string) => (
                                  <Badge key={variant} variant="secondary">
                                    {variant}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium mb-2">Usage Example</h4>
                              <pre className="bg-muted p-3 rounded text-sm">
                                <code>{`import { ${docs.name.replace(/\s+/g, "")} } from "@/components/${fileName.replace(".tsx", "")}"

export default function Example() {
  return (
    <${docs.name.replace(/\s+/g, "")} 
      ${docs.props
        .slice(0, 2)
        .map((prop) => `${prop}="example"`)
        .join("\n      ")}
    />
  )
}`}</code>
                              </pre>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-8 text-muted-foreground">
                            <FileText className="h-8 w-8 mx-auto mb-2" />
                            <p>No documentation available for this component</p>
                          </div>
                        )
                      })()}
                    </TabsContent>
                  )}
                </Tabs>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <File className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select a file from the directory tree to view its content</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
