import { useEffect } from "react";
import { useThemeStore } from "../store/themeStore";

export const useTheme = () => {
  const { theme, setTheme, toggleTheme } = useThemeStore();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, []); // Only run once on mount

  return {
    changeTheme: theme,
    setChangeTheme: setTheme,
    toggleTheme,
    mounted: true,
  };
};
