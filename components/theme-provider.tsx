"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps as NextThemeProviderProps } from "next-themes/dist/types"

type ColorTheme = "default" | "blue" | "green" | "purple" | "orange" | "red"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultColorTheme?: ColorTheme
  storageKey?: string
} & NextThemeProviderProps

type ThemeProviderState = {
  colorTheme: ColorTheme
  setColorTheme: (theme: ColorTheme) => void
}

const initialState: ThemeProviderState = {
  colorTheme: "default",
  setColorTheme: () => null,
}

const ColorThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function useColorTheme() {
  const context = useContext(ColorThemeProviderContext)

  if (context === undefined) throw new Error("useColorTheme must be used within a ThemeProvider")

  return context
}

export default function ThemeProvider({
  children,
  defaultColorTheme = "default",
  storageKey = "designgen-color-theme",
  ...props
}: ThemeProviderProps) {
  const [colorTheme, setColorTheme] = useState<ColorTheme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage?.getItem(storageKey) as ColorTheme) || defaultColorTheme
    }
    return defaultColorTheme
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      const root = window.document.documentElement

      // Remove all color theme classes
      root.classList.remove("theme-default", "theme-blue", "theme-green", "theme-purple", "theme-orange", "theme-red")

      // Add current color theme class
      root.classList.add(`theme-${colorTheme}`)
    }
  }, [colorTheme])

  const value = {
    colorTheme,
    setColorTheme: (theme: ColorTheme) => {
      if (typeof window !== "undefined") {
        localStorage?.setItem(storageKey, theme)
      }
      setColorTheme(theme)
    },
  }

  return (
    <ColorThemeProviderContext.Provider value={value}>
      <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange {...props}>
        {children}
      </NextThemesProvider>
    </ColorThemeProviderContext.Provider>
  )
}
