export function getTheme() {
  if (typeof window !== "undefined") {
    const theme = localStorage.getItem("theme");
    if (theme === null) return "light";
    return theme;
  }
}
