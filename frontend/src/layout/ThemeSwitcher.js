import React, { useState, useEffect } from "react";
import { Contrast } from "@mui/icons-material";
const ThemeSwitcher = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className="theme-switcher">
      <button onClick={toggleTheme} className="button-theme">
        <Contrast />
      </button>
    </div>
  );
};

export default ThemeSwitcher;
