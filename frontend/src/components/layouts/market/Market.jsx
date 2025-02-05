import { useTheme } from "@/hooks/useTheme";
import { createChart } from "lightweight-charts";
import React, { useEffect, useRef } from "react";
import data from "@/data/candlestick_data.json";

export default function Market() {
  const { theme } = useTheme();
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const seriesRef = useRef(null);
  const resizeObserverRef = useRef(null);

  useEffect(() => {
    const container = chartContainerRef.current;
    if (!container) return;

    if (!chartRef.current) {
      chartRef.current = createChart(container, {
        width: container.clientWidth,
        height: container.clientHeight,
      });

      seriesRef.current = chartRef.current.addCandlestickSeries({
        upColor: "#26a69a",
        downColor: "#ef5350",
        borderVisible: false,
        wickUpColor: "#26a69a",
        wickDownColor: "#ef5350",
      });

      seriesRef.current.setData(data);
    }

    const resizeChart = () => {
      if (chartRef.current) {
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;

        chartRef.current.resize(newWidth, newHeight);

        requestAnimationFrame(() => {
          chartRef.current.timeScale().fitContent();
        });
      }
    };

    if (!resizeObserverRef.current) {
      resizeObserverRef.current = new ResizeObserver(() => {
        setTimeout(resizeChart, 50);
      });
      resizeObserverRef.current.observe(container);
    }

    return () => {
      resizeObserverRef.current?.disconnect();
      resizeObserverRef.current = null;
      chartRef.current?.remove();
      chartRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.applyOptions({
        layout: {
          background: { color: theme === "light" ? "#fff" : "#09090b" },
          textColor: theme === "light" ? "#000" : "#d1d4dc",
        },
        grid: {
          vertLines: { color: theme === "light" ? "#d1d4dc" : "#27272A" },
          horzLines: { color: theme === "light" ? "#d1d4dc" : "#27272A" },
        },
      });
    }
  }, [theme]);

  return (
    <div ref={chartContainerRef} className="absolute inset-0 w-full h-full" />
  );
}
