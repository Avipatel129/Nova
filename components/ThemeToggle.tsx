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
            className="px-3 rounded-full hover:bg-zinc-200 duration-300 dark:hover:bg-zinc-800"
        >
            {theme === "light" ? <Sun size={16} /> : <Moon size={16} />}
        </Button>
    );
}
