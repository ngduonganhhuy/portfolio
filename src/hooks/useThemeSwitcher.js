import { useEffect, useState } from "react";
import { DEFAULT_THEME, getThemeById, normalizeThemeId } from "@/data/themes";

const useThemeSwitcher = () => {
  const [themeId, setThemeId] = useState(DEFAULT_THEME);
  const [isMounted, setIsMounted] = useState(false);

  const applyTheme = (nextThemeId) => {
    const theme = getThemeById(nextThemeId);
    const resolvedThemeId = theme?.id || DEFAULT_THEME;

    document.documentElement.dataset.theme = resolvedThemeId;
    if (theme?.mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme");
    const nextThemeId = normalizeThemeId(storedTheme);

    setThemeId(nextThemeId);
    applyTheme(nextThemeId);
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    window.localStorage.setItem("theme", themeId);
    applyTheme(themeId);
  }, [isMounted, themeId]);

  return [themeId, setThemeId, isMounted];
};

export default useThemeSwitcher;
