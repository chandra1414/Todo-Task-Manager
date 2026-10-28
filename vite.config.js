import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Vite configuration. The two plugins below are all this project needs:
// - react() lets Vite understand JSX
// - tailwindcss() turns Tailwind class names into real CSS
export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    // Your tasks are saved in the browser *per web address*. If the address
    // changed (for example localhost:5173 one day and localhost:5174 the
    // next), the app would look empty. So we always use this same port.
    port: 5300,
    // If something else is already using this port, stop with a clear
    // error instead of silently switching to a different one.
    strictPort: true,
    // Open the app in your browser automatically when it starts.
    open: true,
  },
});
