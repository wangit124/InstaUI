"use client";

import { toast } from "sonner";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Upload, X, Link } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useGlobalFormStore } from "@/hooks/use-global-form-store";
import { useConvertFigmaFile } from "@/hooks/use-convert-figma-file";

export default function UploadSection() {
  const { uploadedFiles, setUploadedFiles, figmaImages, setFigmaImages } =
    useGlobalFormStore();

  const [figmaUrl, setFigmaUrl] = useState("");

  const { mutate: convertFigmaFile, isPending } = useConvertFigmaFile();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setUploadedFiles([...uploadedFiles, ...acceptedFiles]);
    },
    [uploadedFiles, setUploadedFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".svg"],
      "application/pdf": [".pdf"],
    },
    multiple: true,
  });

  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
  };

  const addFigmaImage = () => {
    convertFigmaFile(
      { figmaUrl },
      {
        onSuccess: (data) => {
          setFigmaImages([...figmaImages, ...(data?.images || [])]);
          setFigmaUrl("");
        },
        onError: () => {
          toast.error("Failed to convert figma image, please try again.");
        },
      }
    );
  };

  const removeFigmaImage = (image: string) => {
    setFigmaImages(figmaImages.filter((img) => img !== image));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label className="text-base font-medium">Upload Design Files</Label>
          <p className="text-sm text-muted-foreground">
            Support for PNG, JPG, SVG, and PDF files
          </p>
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
              <p className="text-sm text-muted-foreground mb-4">
                or click to browse
              </p>
              <Button>Browse Files</Button>
            </div>
          )}
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <div>
          <Label className="text-base font-medium">Figma Links</Label>
          <p className="text-sm text-muted-foreground">
            Add Figma node urls to extract components
          </p>
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="https://www.figma.com/file/..."
            value={figmaUrl}
            onChange={(e) => setFigmaUrl(e.target.value)}
            disabled={isPending}
            className="flex-1"
          />
          <Button
            onClick={addFigmaImage}
            disabled={!figmaUrl || isPending}
            loading={isPending}
          >
            <Link className="h-4 w-4 mr-2" />
            Add Link
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">
          Uploaded Files ({uploadedFiles.length + figmaImages.length})
        </Label>
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
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
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
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFigmaImage(image)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
