import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("theme") || "light",
  setTheme: (newTheme) => {
    const theme =
      typeof newTheme === "function"
        ? newTheme(localStorage.getItem("theme") || "light")
        : newTheme;

    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme); // Fixed typo in "theme"
    set({ theme });
  },
  toggleTheme: () => {
    set((state) => {
      const newTheme =
        state.theme === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      return { theme: newTheme };
    });
  },
}));
