"use client";

import { useTheme } from "./ThemeProvider";
import styles from "./ThemeToggle.module.css";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      data-cursor="default"
    >
      <span className={styles.track} aria-hidden="true">
        <span className={styles.thumb} data-theme={theme} />
      </span>
      <span className={styles.label}>{theme === "light" ? "Light" : "Dark"}</span>
    </button>
  );
}
