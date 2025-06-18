"use client"
import { Badge } from "@/components/ui/badge"
import { Check, Circle, Lock } from "lucide-react"
import { cn } from "@/lib/utils"

interface Step {
  id: string
  title: string
  description: string
  component: string
}

interface StepperNavigationProps {
  steps: Step[]
  currentStep: number
  completedSteps: number[]
  onStepClick: (stepIndex: number) => void
}

export default function StepperNavigation({ steps, currentStep, completedSteps, onStepClick }: StepperNavigationProps) {
  const getStepStatus = (stepIndex: number) => {
    if (completedSteps.includes(stepIndex)) return "completed"
    if (stepIndex === currentStep) return "current"
    if (stepIndex < currentStep) return "available"
    return "locked"
  }

  const getStepIcon = (stepIndex: number) => {
    const status = getStepStatus(stepIndex)

    switch (status) {
      case "completed":
        return <Check className="h-4 w-4" />
      case "current":
        return <Circle className="h-4 w-4 fill-current" />
      case "available":
        return <Circle className="h-4 w-4" />
      case "locked":
        return <Lock className="h-4 w-4" />
      default:
        return <Circle className="h-4 w-4" />
    }
  }

  const getStepClasses = (stepIndex: number) => {
    const status = getStepStatus(stepIndex)

    const baseClasses = "flex items-center gap-3 p-3 rounded-lg transition-all duration-200"

    switch (status) {
      case "completed":
        return cn(
          baseClasses,
          "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 cursor-pointer",
          "dark:bg-green-900/30 dark:text-green-300 dark:border-green-700/50 dark:hover:bg-green-900/50",
        )
      case "current":
        return cn(
          baseClasses,
          "bg-primary/10 text-primary border border-primary/20 shadow-sm",
          "dark:bg-primary/20 dark:border-primary/30",
        )
      case "available":
        return cn(
          baseClasses,
          "bg-muted/50 text-muted-foreground hover:bg-muted cursor-pointer",
          "dark:bg-muted/30 dark:hover:bg-muted/50",
        )
      case "locked":
        return cn(
          baseClasses,
          "bg-muted/20 text-muted-foreground/50 cursor-not-allowed",
          "dark:bg-muted/10 dark:text-muted-foreground/40",
        )
      default:
        return baseClasses
    }
  }

  const getConnectorClasses = (stepIndex: number) => {
    const isCompleted = completedSteps.includes(stepIndex) || stepIndex < currentStep
    return cn(
      "h-0.5 flex-1 transition-colors duration-300",
      isCompleted ? "bg-green-300 dark:bg-green-600" : "bg-muted dark:bg-muted/50",
    )
  }

  const canClickStep = (stepIndex: number) => {
    return stepIndex <= currentStep || completedSteps.includes(stepIndex)
  }

  return (
    <div className="w-full">
      {/* Desktop Stepper */}
      <div className="hidden md:flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            <div className={getStepClasses(index)} onClick={() => canClickStep(index) && onStepClick(index)}>
              <div className="flex-shrink-0">{getStepIcon(index)}</div>
              <div className="min-w-0">
                <div className="font-medium text-sm truncate">{step.title}</div>
                <div className="text-xs opacity-75 truncate">{step.description}</div>
              </div>
              {getStepStatus(index) === "current" && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  Active
                </Badge>
              )}
            </div>
            {index < steps.length - 1 && <div className={cn("mx-2", getConnectorClasses(index))} />}
          </div>
        ))}
      </div>

      {/* Mobile Stepper */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-medium">
            Step {currentStep + 1} of {steps.length}
          </div>
          <div className="flex items-center gap-1">
            {steps.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "h-2 w-8 rounded-full transition-colors",
                  index <= currentStep ? "bg-primary" : "bg-muted dark:bg-muted/50",
                )}
              />
            ))}
          </div>
        </div>

        <div className={getStepClasses(currentStep)}>
          <div className="flex-shrink-0">{getStepIcon(currentStep)}</div>
          <div>
            <div className="font-medium">{steps[currentStep].title}</div>
            <div className="text-sm opacity-75">{steps[currentStep].description}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
