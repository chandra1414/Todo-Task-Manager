import { useEffect, useState } from "react";

/**
 * Works like useState, but the value is also saved in the browser's
 * localStorage, so it is still there after a page refresh.
 *
 *   const [tasks, setTasks] = useLocalStorage("my-key", []);
 */
export default function useLocalStorage(key, initialValue) {
  // The function passed to useState runs only once, on the first render.
  const [value, setValue] = useState(() => {
    try {
      const saved = window.localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : initialValue;
    } catch {
      // Storage is blocked or the saved text is damaged: start fresh.
      return initialValue;
    }
  });

  // Every time the value changes, write it back to localStorage.
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage is full or blocked. The app keeps working, it just
      // can't remember the data after a refresh.
    }
  }, [key, value]);

  return [value, setValue];
}