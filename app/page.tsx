"use client";

import StepNavigation from "@/components/steps/step-navigation";
import ThemeProvider from "@/providers/theme-provider";
import Header from "@/components/header/header";
import StepWrapper from "@/components/steps/step-wrapper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Header />
        <div className="flex">
          <StepNavigation />
          <StepWrapper />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
