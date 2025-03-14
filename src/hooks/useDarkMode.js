import { useState, useEffect } from "react";

export function useDarkMode() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const className = darkMode ? "dark" : "light";
    if (document.body.className !== className) {
      document.body.className = className;
      localStorage.setItem("theme", className);
    }
  }, [darkMode]);

  return [darkMode, setDarkMode];
}
