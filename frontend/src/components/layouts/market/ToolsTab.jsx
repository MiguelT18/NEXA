import React from "react";

export default function ToolsTab({ isVisible }) {
  return (
    <div
      className={`mt-4 border-2 rounded-lg border-black ${!isVisible ? "hidden" : ""}`}
    >
      <h1>Herramientas disponibles</h1>
    </div>
  );
}
