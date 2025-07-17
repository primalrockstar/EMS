import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Get the root element from the HTML
const container = document.getElementById("root");
if (!container) {
  throw new Error("Root container missing in index.html");
}

// Create a root and render the App component
const root = createRoot(container);
root.render(<App />);
