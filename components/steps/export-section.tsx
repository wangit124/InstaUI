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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ChevronDown,
  ChevronRight,
  File,
  Folder,
  FolderOpen,
  Code2,
  FileText,
  Settings,
  Package,
} from "lucide-react";
import { useGlobalFormStore } from "@/hooks/use-global-form-store";
import { GeneratedFile } from "@/lib/types";

interface DirectoryItem {
  type: "file" | "folder";
  content?: string;
  children?: Record<string, DirectoryItem>;
}

export default function DirectoryViewer() {
  const { generatedResponse } = useGlobalFormStore();
  const generatedCode = generatedResponse?.full;
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(["app/", "components/"])
  );

  const toggleFolder = (folderPath: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderPath)) {
      newExpanded.delete(folderPath);
    } else {
      newExpanded.add(folderPath);
    }
    setExpandedFolders(newExpanded);
  };

  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith(".tsx") || fileName.endsWith(".ts")) {
      return <Code2 className="h-4 w-4 text-blue-500" />;
    }
    if (fileName.endsWith(".css")) {
      return <FileText className="h-4 w-4 text-green-500" />;
    }
    if (fileName.endsWith(".json")) {
      return <Settings className="h-4 w-4 text-yellow-500" />;
    }
    return <File className="h-4 w-4 text-muted-foreground" />;
  };

  const getFileContent = (filePath: string): string => {
    // Find the file content from the generated files
    const file = generatedCode?.files?.find((f: GeneratedFile) => {
      // Direct match
      if (f.fileName === filePath) return true;

      // Extract just the filename from the path
      const fileNameOnly = filePath.split("/").pop();
      const generatedFileNameOnly = f.fileName.split("/").pop();

      // Match by filename only
      if (fileNameOnly === generatedFileNameOnly) return true;

      // Match if the generated file path ends with our constructed path
      if (f.fileName.endsWith(filePath)) return true;

      return false;
    });

    // Debug logging
    if (!file) {
      console.log(`File not found for path: ${filePath}`);
      console.log(
        "Available files:",
        generatedCode?.files?.map((f) => f.fileName)
      );
    }

    return file?.code || `// Content for ${filePath}`;
  };

  // Convert the flat structure from generatedResponse into a nested tree structure
  const buildDirectoryStructure = (): Record<string, DirectoryItem> => {
    if (!generatedCode?.structure) return {};

    const structure: Record<string, DirectoryItem> = {};

    // Convert flat structure to nested structure
    Object.entries(generatedCode.structure).forEach(
      ([folderPath, files]: [string, string[]]) => {
        const pathParts = folderPath.split("/").filter(Boolean);

        if (pathParts.length === 0) {
          // Root level files
          if (Array.isArray(files)) {
            files.forEach((fileName) => {
              structure[fileName] = {
                type: "file",
                content: getFileContent(fileName),
              };
            });
          }
        } else {
          // Create nested folder structure
          let current = structure;

          // Navigate/create the path
          pathParts.forEach((part, index) => {
            const isLast = index === pathParts.length - 1;
            const folderName = part.endsWith("/") ? part : part + "/";

            if (!current[folderName]) {
              current[folderName] = {
                type: "folder",
                children: {},
              };
            }

            if (isLast && Array.isArray(files)) {
              // Add files to this folder
              files.forEach((fileName) => {
                if (current[folderName].children) {
                  // Try different path combinations to find the file
                  const possiblePaths = [
                    `${folderPath}/${fileName}`,
                    fileName,
                    `${folderPath.replace(/\/$/, "")}/${fileName}`,
                  ];

                  let content = `// Content for ${fileName}`;
                  for (const path of possiblePaths) {
                    const fileContent = getFileContent(path);
                    if (fileContent !== `// Content for ${path}`) {
                      content = fileContent;
                      break;
                    }
                  }

                  current[folderName].children[fileName] = {
                    type: "file",
                    content: content,
                  };
                }
              });
            } else if (!isLast && current[folderName].children) {
              current = current[folderName].children;
            }
          });
        }
      }
    );

    return structure;
  };

  const directoryStructure = buildDirectoryStructure();

  const renderDirectoryTree = (
    structure: Record<string, DirectoryItem>,
    basePath = ""
  ): React.ReactNode[] => {
    return Object.entries(structure).map(
      ([name, item]: [string, DirectoryItem]) => {
        const fullPath = basePath ? `${basePath}/${name}` : name;
        const isFolder = item.type === "folder";
        const isExpanded = expandedFolders.has(fullPath);

        if (isFolder) {
          return (
            <div key={fullPath}>
              <Collapsible
                open={isExpanded}
                onOpenChange={() => toggleFolder(fullPath)}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-start h-8 px-2 font-normal"
                  >
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4 mr-1" />
                    ) : (
                      <ChevronRight className="h-4 w-4 mr-1" />
                    )}
                    {isExpanded ? (
                      <FolderOpen className="h-4 w-4 mr-2 text-blue-500" />
                    ) : (
                      <Folder className="h-4 w-4 mr-2 text-blue-500" />
                    )}
                    {name}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="ml-4">
                  {item.children &&
                    renderDirectoryTree(item.children, fullPath)}
                </CollapsibleContent>
              </Collapsible>
            </div>
          );
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
          );
        }
      }
    );
  };

  const getSelectedFileContent = (): string | null => {
    if (!selectedFile) return null;

    return getFileContent(selectedFile);
  };

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
              <CardDescription>
                Navigate through your generated files
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-96 overflow-y-auto">
                {renderDirectoryTree(directoryStructure)}
              </div>
            </CardContent>
          </Card>

          {/* File Content & Documentation */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">
                {selectedFile ? selectedFile : "Select a file"}
              </CardTitle>
              <CardDescription>
                {selectedFile
                  ? "File content and documentation"
                  : "Choose a file from the directory tree"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedFile ? (
                <div className="border rounded-lg">
                  <div className="bg-muted px-3 py-2 border-b">
                    <div className="flex items-center gap-2">
                      {getFileIcon(selectedFile.split("/").pop() || "")}
                      <span className="font-mono text-sm">{selectedFile}</span>
                    </div>
                  </div>
                  <pre className="p-4 text-sm overflow-x-auto max-h-96">
                    <code>
                      {getSelectedFileContent() ||
                        "// File content not available"}
                    </code>
                  </pre>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <File className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>
                    Select a file from the directory tree to view its content
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
