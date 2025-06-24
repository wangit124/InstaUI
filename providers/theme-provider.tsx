"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps as NextThemeProviderProps } from "next-themes/dist/types";
import { Color } from "@/lib/types";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultColorTheme?: Color;
  storageKey?: string;
} & NextThemeProviderProps;

type ThemeProviderState = {
  colorTheme: Color;
  setColorTheme: (theme: Color) => void;
};

const initialState: ThemeProviderState = {
  colorTheme: Color.BLUE,
  setColorTheme: () => null,
};

const ColorThemeProviderContext =
  createContext<ThemeProviderState>(initialState);

export function useColorTheme() {
  const context = useContext(ColorThemeProviderContext);

  if (context === undefined)
    throw new Error("useColorTheme must be used within a ThemeProvider");

  return context;
}

export default function ThemeProvider({
  children,
  defaultColorTheme = "blue",
  storageKey = "instaui-color-theme",
  ...props
}: ThemeProviderProps) {
  const [colorTheme, setColorTheme] = useState<Color>(() => {
    if (typeof window !== "undefined") {
      return (localStorage?.getItem(storageKey) as Color) || defaultColorTheme;
    }
    return defaultColorTheme;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const root = window.document.getElementsByTagName("html")?.[0];

      // Remove all color theme classes
      root?.classList.remove(
        "theme-black",
        "theme-blue",
        "theme-green",
        "theme-purple",
        "theme-orange",
        "theme-red"
      );

      // Add current color theme class
      root?.classList.add(`theme-${colorTheme}`);
    }
  }, [colorTheme]);

  const value = {
    colorTheme,
    setColorTheme: (theme: Color) => {
      if (typeof window !== "undefined") {
        localStorage?.setItem(storageKey, theme);
      }
      setColorTheme(theme);
    },
  };

  return (
    <ColorThemeProviderContext.Provider value={value}>
      <NextThemesProvider attribute="class" defaultTheme="dark" {...props}>
        {children}
      </NextThemesProvider>
    </ColorThemeProviderContext.Provider>
  );
}
