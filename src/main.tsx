import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root"); // Wybór elementu

if (rootElement) {
  const root = createRoot(rootElement); // Utworzenie root

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Nie znaleziono elementu o id 'root'");
}
