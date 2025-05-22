import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";    // ← import BrowserRouter
import App from "./App.jsx";
import "./index.css";

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(
      <BrowserRouter>           {/* ← wrap your entire app here */}
        <App />
      </BrowserRouter>
  );
}
