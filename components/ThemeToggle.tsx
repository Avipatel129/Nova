"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { getTheme } from "@/utils/localStorage";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  // to prevent hydration error
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const theme = getTheme();

  function handleModeToggle() {
    if (theme === "light") setTheme("dark");
    if (theme === "dark") setTheme("light");
  }

  if (!mounted) return null;

  return (
    <Button
      variant="ghost"
      onClick={handleModeToggle}
      className="h-10 w-10 rounded-full p-1 duration-300 hover:bg-zinc-200 dark:hover:bg-zinc-800"
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </Button>
  );
}
