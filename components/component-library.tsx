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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Edit, Trash2, Plus, Search, Filter } from "lucide-react";

interface Component {
  id: string;
  name: string;
  type: string;
  description: string;
  props: string[];
  variants: string[];
}

interface ComponentLibraryProps {
  components: Component[];
  onComponentsChange: (components: Component[]) => void;
}

export default function ComponentLibrary({
  components,
  onComponentsChange,
}: ComponentLibraryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(
    null
  );
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const filteredComponents = components.filter((component) => {
    const matchesSearch =
      component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      component.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterType === "all" ||
      component.type.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const componentTypes = [...new Set(components.map((c) => c.type))];

  const handleEditComponent = (component: Component) => {
    setSelectedComponent(component);
    setIsEditDialogOpen(true);
  };

  const handleDeleteComponent = (componentId: string) => {
    const updatedComponents = components.filter((c) => c.id !== componentId);
    onComponentsChange(updatedComponents);
  };

  const generateComponentCode = (component: Component) => {
    return `import React from 'react'
import { cn } from '@/lib/utils'

interface ${component.name.replace(/\s+/g, "")}Props {
  ${component.props.map((prop) => `${prop}?: any`).join("\n  ")}
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
      {filteredComponents.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">No components found</h3>
              <p className="text-muted-foreground mb-4">
                {components.length === 0
                  ? "Upload designs and extract components to get started"
                  : "Try adjusting your search or filter criteria"}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredComponents.map((component) => (
            <Card
              key={component.id}
              className="group hover:shadow-md transition-shadow"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{component.name}</CardTitle>
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
                            <TabsTrigger value="preview">Preview</TabsTrigger>
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
                              <code>{generateComponentCode(component)}</code>
                            </pre>
                          </TabsContent>
                          <TabsContent value="props" className="mt-4">
                            <div className="space-y-4">
                              <div>
                                <Label className="text-base font-medium">
                                  Props
                                </Label>
                                <div className="mt-2 space-y-2">
                                  {component.props.map((prop) => (
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
                                  {component.variants.map((variant) => (
                                    <Badge key={variant} variant="secondary">
                                      {variant}
                                    </Badge>
                                  ))}
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
                      {component.props.slice(0, 3).map((prop) => (
                        <Badge key={prop} variant="outline" className="text-xs">
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
                      {component.variants.map((variant) => (
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
