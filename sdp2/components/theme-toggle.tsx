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
      className="text-black dark:text-white p-4 hover:text-delawareRed p-4 transition-colors duration-200 dark:hover:text-delawareRed p-4 transition-colors duration-200"
    >
      {theme === "light" ? <Moon size={26} /> : <Sun size={26} />}
    </button>
  );
}
