"use client";

import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
    const { setTheme } = useTheme();
    const [mode, setMode] = useState<"dark" | "light">("light");

    function handleModeToggle() {
        if (mode === "light") {
            setTheme("dark");
            setMode("dark");
            return;
        }
        setTheme(() => "light");
        setMode("light");
        return;
    }

    return (
        <Button
            variant="ghost"
            onClick={handleModeToggle}
            className="px-3 rounded-full hover:bg-zinc-200 duration-300 dark:hover:bg-zinc-800"
        >
            {mode === "light" ? <Sun size={16} /> : <Moon size={16} />}
        </Button>
    );
}
