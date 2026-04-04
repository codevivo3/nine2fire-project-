export type ThemeMode = "light" | "dark" | "system";

export const THEME_STORAGE_KEY = "theme";
export const THEME_EVENT = "nine2fire-theme-change";

export function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function getStoredTheme(): ThemeMode | null {
  if (typeof window === "undefined") return null;

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  return storedTheme === "light" || storedTheme === "dark" || storedTheme === "system" ? storedTheme : null;
}

export function resolveTheme(theme: ThemeMode): "light" | "dark" {
  if (theme === "system") {
    return getSystemTheme();
  }
  return theme;
}

export function applyTheme(theme: ThemeMode) {
  if (typeof document === "undefined") return;

  const resolvedTheme = resolveTheme(theme);

  const html = document.documentElement;
  html.classList.remove("light", "dark");
  html.classList.add(resolvedTheme);
  html.setAttribute("data-theme", resolvedTheme);
}

