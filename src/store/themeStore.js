import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("theme") || "caramellatte",
  setTheme: (newTheme) => {
    const theme =
      typeof newTheme === "function"
        ? newTheme(localStorage.getItem("theme") || "caramellatte")
        : newTheme;

    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme); // Fixed typo in "theme"
    set({ theme });
  },
  toggleTheme: () => {
    set((state) => {
      const newTheme =
        state.theme === "caramellatte" ? "night" : "caramellatte";
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      return { theme: newTheme };
    });
  },
}));
