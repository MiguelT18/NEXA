import { useTheme } from "@/hooks/useTheme";
import { createChart } from "lightweight-charts";
import React, { useEffect, useRef } from "react";
import data from "@/data/candlestick_data.json";

export default function Market() {
  const { theme } = useTheme();
  const chartContainerRef = useRef();
  const chartRef = useRef(null);

  useEffect(() => {
    const container = chartContainerRef.current;

    if (!chartRef.current) {
      chartRef.current = createChart(container, {
        width: container.offsetWidth, // Usar offsetWidth para dimensiones consistentes
        height: 500,
      });

      const newSeries = chartRef.current.addCandlestickSeries({
        upColor: "#26a69a",
        downColor: "#ef5350",
        borderVisible: false,
        wickUpColor: "#26a69a",
        wickDownColor: "#ef5350",
      });

      newSeries.setData(data);
    }

    chartRef.current.applyOptions({
      layout: {
        background: { color: theme === "light" ? "#fff" : "#09090b" },
        textColor: theme === "light" ? "#000" : "#d1d4dc",
      },
      grid: {
        vertLines: { color: theme === "light" ? "#ccc" : "#444" },
        horzLines: { color: theme === "light" ? "#ccc" : "#444" },
      },
    });

    const handleResize = () => {
      chartRef.current.applyOptions({
        width: container.offsetWidth, // Asegurarse de usar el ancho dinámico correcto
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, [theme]);

  return (
    <div
      ref={chartContainerRef}
      className="h-[500px] w-full" // Ancho y altura explícitos
    />
  );
}
