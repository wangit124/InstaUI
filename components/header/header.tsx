"use client";

import { Badge } from "@/components/ui/badge";
import { Code2 } from "lucide-react";
import ThemeSelector from "@/components/header/theme-selector";

export default function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Code2 className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold">InstaUI</h1>
            <p className="text-xs text-muted-foreground">
              Design to Code Generator
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ThemeSelector />
          <Badge variant="secondary">Beta</Badge>
        </div>
      </div>
    </header>
  );
}
