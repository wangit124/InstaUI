"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Palette, Check, Sun, Moon } from "lucide-react";
import { useColorTheme } from "../../providers/theme-provider";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Color, ColorTheme } from "@/lib/types";

const colorThemes: ColorTheme[] = [
  {
    name: Color.BLUE,
    label: "Blue",
    color: "bg-blue-600",
  },
  {
    name: Color.BLACK,
    label: "Black",
    color: "bg-slate-900 dark:bg-slate-100",
  },
  {
    name: Color.GREEN,
    label: "Green",
    color: "bg-green-600",
  },
  {
    name: Color.PURPLE,
    label: "Purple",
    color: "bg-purple-600",
  },
  {
    name: Color.ORANGE,
    label: "Orange",
    color: "bg-orange-600",
  },
  {
    name: Color.RED,
    label: "Red",
    color: "bg-red-600",
  },
];

const darkModeOptions = [
  {
    value: "light",
    label: "Light",
    icon: Sun,
  },
  {
    value: "dark",
    label: "Dark",
    icon: Moon,
  },
];

export default function ThemeSelector() {
  const { colorTheme, setColorTheme } = useColorTheme();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="outline" size="sm" className="gap-2">
        <Palette className="h-4 w-4" />
        <div className="w-3 h-3 rounded-full bg-slate-900" />
      </Button>
    );
  }

  const currentColorTheme = colorThemes.find((t) => t.name === colorTheme);
  const currentDarkModeOption = darkModeOptions.find(
    (option) => option.value === theme
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Palette className="h-4 w-4" />
          <div className={`w-3 h-3 rounded-full ${currentColorTheme?.color}`} />
          {currentDarkModeOption && (
            <currentDarkModeOption.icon className="h-3 w-3" />
          )}
          <span className="hidden sm:inline">{currentColorTheme?.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-1.5 text-sm font-semibold">Dark Mode</div>
        {darkModeOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => setTheme(option.value)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <option.icon className="h-4 w-4" />
              <span>{option.label}</span>
            </div>
            {theme === option.value && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        <div className="px-2 py-1.5 text-sm font-semibold">Color Theme</div>
        {colorThemes.map((themeOption) => (
          <DropdownMenuItem
            key={themeOption.name}
            onClick={() => setColorTheme(themeOption.name)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full ${themeOption.color}`} />
              <span>{themeOption.label}</span>
            </div>
            {colorTheme === themeOption.name && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
