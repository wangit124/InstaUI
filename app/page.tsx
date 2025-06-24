"use client";

import StepNavigation from "@/components/steps/step-navigation";
import ThemeProvider from "@/providers/theme-provider";
import Header from "@/components/header/header";
import StepWrapper from "@/components/steps/step-wrapper";

export default function Root() {
  return (
    <ThemeProvider>
      <div id="theme-root" className="bg-background">
        <Header />
        <div className="flex">
          <StepNavigation />
          <StepWrapper />
        </div>
      </div>
    </ThemeProvider>
  );
}
