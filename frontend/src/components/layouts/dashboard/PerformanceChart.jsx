import React, { useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const fullChartData = [
  { month: "Enero", desktop: 8000 },
  { month: "Febrero", desktop: 1200 },
  { month: "Marzo", desktop: 1400 },
  { month: "Abril", desktop: 1600 },
  { month: "Mayo", desktop: 20000 },
  { month: "Junio", desktop: 21000 },
  { month: "Julio", desktop: 25000 },
  { month: "Agosto", desktop: 30000 },
  { month: "Septiembre", desktop: 34000 },
  { month: "Octubre", desktop: 38000 },
  { month: "Noviembre", desktop: 42000 },
  { month: "Diciembre", desktop: 57000 },
];

export default function PerformanceChart() {
  const { theme } = useTheme();

  const [interval, setInterval] = useState("6m");

  const filterData = () => {
    switch (interval) {
      case "3m":
        return fullChartData.slice(-3);
      case "6m":
        return fullChartData.slice(-6);
      case "1y":
        return fullChartData;
    }
  };

  const filteredData = filterData();

  const chartConfig = {
    desktop: {
      label: "Capital",
      color: theme === "dark" ? "#1f618d" : "#25b763",
    },
  };

  return (
    <Card className="mt-6 max-w-[700px] relative">
      <CardHeader className="max-w-[70%]">
        <CardTitle className="leading-6">Visualiza tu Rendimiento</CardTitle>
        <CardDescription>
          Selecciona el intervalo de tiempo que deseas visualizar.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Select value={interval} onValueChange={(value) => setInterval(value)}>
          <SelectTrigger className="w-[180px] mb-10 md:mb-4 md:absolute top-5 right-5">
            <SelectValue placeholder="Intervalo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3m">3 Meses</SelectItem>
            <SelectItem value="6m">6 Meses</SelectItem>
            <SelectItem value="1y">1 Año</SelectItem>
          </SelectContent>
        </Select>

        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={filteredData}
            margin={{
              left: 20,
              right: 20,
            }}
          >
            <defs>
              <linearGradient id="fillGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={theme === "dark" ? "#1f618d" : "#25b763"}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={theme === "dark" ? "#1f618d" : "#25b763"}
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillGradient)"
              fillOpacity={0.4}
              stroke={theme === "dark" ? "#1f618d" : "#25b763"}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
