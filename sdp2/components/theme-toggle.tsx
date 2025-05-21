"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // After mounting, we have access to the theme
  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="text-black w-full dark:text-white hover:text-delawareRed transition-colors duration-200 dark:hover:text-delawareRed transition-colors duration-200"
    >
      <div className="flex items-center p-3 border-b border-gray-200 dark:border-gray-700">
        {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        <p className="ml-2">Toggle Mode</p>
      </div>
    </button>
  );
}
