"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, X, FileImage, Link, Loader2, CheckCircle } from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface UploadSectionProps {
  uploadedFiles: File[]
  setUploadedFiles: (files: File[]) => void
  figmaLinks: string[]
  setFigmaLinks: (links: string[]) => void
  onExtractComponents: (components: any[]) => void
}

export default function UploadSection({
  uploadedFiles,
  setUploadedFiles,
  figmaLinks,
  setFigmaLinks,
  onExtractComponents,
}: UploadSectionProps) {
  const [figmaUrl, setFigmaUrl] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingProgress, setProcessingProgress] = useState(0)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setUploadedFiles([...uploadedFiles, ...acceptedFiles])
    },
    [uploadedFiles, setUploadedFiles],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".svg"],
      "application/pdf": [".pdf"],
    },
    multiple: true,
  })

  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index)
    setUploadedFiles(newFiles)
  }

  const addFigmaLink = () => {
    if (figmaUrl && !figmaLinks.includes(figmaUrl)) {
      setFigmaLinks([...figmaLinks, figmaUrl])
      setFigmaUrl("")
    }
  }

  const removeFigmaLink = (index: number) => {
    const newLinks = figmaLinks.filter((_, i) => i !== index)
    setFigmaLinks(newLinks)
  }

  const extractComponents = async () => {
    setIsProcessing(true)
    setProcessingProgress(0)

    // Simulate component extraction process
    const steps = [
      "Analyzing uploaded designs...",
      "Identifying UI patterns...",
      "Extracting components...",
      "Generating component metadata...",
      "Finalizing component library...",
    ]

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setProcessingProgress((i + 1) * 20)
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
    ]

    onExtractComponents(mockComponents)
    setIsProcessing(false)
    setProcessingProgress(100)
  }

  return (
    <div className="space-y-6">
      {/* File Upload */}
      <div className="space-y-4">
        <div>
          <Label className="text-base font-medium">Upload Design Files</Label>
          <p className="text-sm text-muted-foreground">Support for PNG, JPG, SVG, and PDF files</p>
        </div>

        <div
          {...getRootProps()}
          data-upload-area
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? "border-primary bg-primary/5 dark:bg-primary/10"
              : "border-muted-foreground/25 hover:border-muted-foreground/50 dark:border-muted-foreground/40 dark:hover:border-muted-foreground/60"
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          {isDragActive ? (
            <p className="text-lg">Drop the files here...</p>
          ) : (
            <div>
              <p className="text-lg mb-2">Drag & drop design files here</p>
              <p className="text-sm text-muted-foreground mb-4">or click to browse</p>
              <Button variant="outline">Browse Files</Button>
            </div>
          )}
        </div>

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Uploaded Files ({uploadedFiles.length})</Label>
            <div className="grid gap-2">
              {uploadedFiles.map((file, index) => (
                <Card key={index}>
                  <CardContent className="flex items-center justify-between p-3">
                    <div className="flex items-center gap-3">
                      <FileImage className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      <Separator />

      {/* Figma Links */}
      <div className="space-y-4">
        <div>
          <Label className="text-base font-medium">Figma Links</Label>
          <p className="text-sm text-muted-foreground">Add Figma file or frame URLs to extract components</p>
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="https://www.figma.com/file/..."
            value={figmaUrl}
            onChange={(e) => setFigmaUrl(e.target.value)}
            className="flex-1"
          />
          <Button onClick={addFigmaLink} disabled={!figmaUrl}>
            <Link className="h-4 w-4 mr-2" />
            Add Link
          </Button>
        </div>

        {/* Figma Links List */}
        {figmaLinks.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Added Links ({figmaLinks.length})</Label>
            <div className="grid gap-2">
              {figmaLinks.map((link, index) => (
                <Card key={index}>
                  <CardContent className="flex items-center justify-between p-3">
                    <div className="flex items-center gap-3">
                      <Link className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium truncate max-w-md">{link}</p>
                        <Badge variant="secondary" className="text-xs">
                          Figma
                        </Badge>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => removeFigmaLink(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      <Separator />

      {/* Extract Components */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base font-medium">Extract Components</Label>
            <p className="text-sm text-muted-foreground">Analyze designs and extract reusable UI components</p>
          </div>
          <Button
            onClick={extractComponents}
            disabled={(uploadedFiles.length === 0 && figmaLinks.length === 0) || isProcessing}
            size="lg"
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Extract Components
              </>
            )}
          </Button>
        </div>

        {isProcessing && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Processing designs...</span>
              <span>{processingProgress}%</span>
            </div>
            <Progress value={processingProgress} className="w-full" />
          </div>
        )}
      </div>
    </div>
  )
}
