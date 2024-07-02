"use client";

import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { getTheme } from "@/utils/localStorage";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  const theme = getTheme();

  function handleModeToggle() {
    if (theme === "light") setTheme("dark");
    if (theme === "dark") setTheme("light");
  }

  return (
    <Button
      variant="ghost"
      onClick={handleModeToggle}
      className="rounded-full px-3 duration-300 hover:bg-zinc-200 dark:hover:bg-zinc-800"
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </Button>
  );
}
