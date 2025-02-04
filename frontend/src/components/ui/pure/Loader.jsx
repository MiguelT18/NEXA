"use client";

import { useTheme } from "@/hooks/useTheme";
import React, { useEffect, useState } from "react";
import ContentLoader from "react-content-loader";

const Loader = ({ uniqueId, className = "" }) => {
  const { theme } = useTheme();
  const [id, setId] = useState(null);

  useEffect(() => {
    // Asegúrate de que el ID sea único pero consistente entre cliente y servidor
    setId(`loader-${uniqueId}`);
  }, [uniqueId]);

  if (!id) {
    return null; // Evitar renderizar hasta que el ID esté listo
  }

  return (
    <ContentLoader
      speed={1}
      viewBox="0 0 100 100"
      backgroundColor={theme === "dark" ? "#1f1f22" : "#e6e6ed"}
      foregroundColor={theme === "dark" ? "#38383b" : "#f4f4f9"}
      className={className}
    >
      <rect x="0" y="0" rx="0" ry="0" width="100%" height="100%" />
      <defs>
        <clipPath id={`clipPath-${id}`}>
          <linearGradient
            id={`gradient-${id}`}
            gradientTransform="translate(-2 0)"
          >
            {/* Aquí podrías hacer que los IDs sean consistentes */}
          </linearGradient>
        </clipPath>
      </defs>
    </ContentLoader>
  );
};

export default Loader;
