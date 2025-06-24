"use client";

import StepNavigation from "@/components/steps/step-navigation";
import ThemeProvider from "@/providers/theme-provider";
import Header from "@/components/header/header";
import StepWrapper from "@/components/steps/step-wrapper";

export default function Root() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <StepNavigation />
        <StepWrapper />
      </div>
    </ThemeProvider>
  );
}
