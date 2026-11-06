import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  YAxis,
  type TooltipContentProps,
} from "recharts";
import type { Forecast } from "@/api/open-meteo";
import { formatDay, formatTemp } from "@/lib/format";
import { getWeather } from "@/lib/weather-codes";
import styles from "./chart.module.css";

type Props = {
  daily: Forecast["daily"];
};

// daily max temperatures as a line, like the wave in the design
export function Chart({ daily }: Props) {
  const data = daily.time.map((date, index) => ({
    day: formatDay(date, index),
    max: daily.temperature_2m_max[index],
    weather: getWeather(daily.weather_code[index]),
  }));

  // in the design the line sits in the lower half of the box
  const min = Math.min(...daily.temperature_2m_max);
  const max = Math.max(...daily.temperature_2m_max);
  const range = Math.max(max - min, 1); // avoid 0 when every day is the same

  // screen readers get the numbers instead of the drawing
  const summary = data
    .map((point) => `${point.day} ${formatTemp(point.max)}`)
    .join(", ");

  return (
    <figure
      className={styles.chart}
      role="img"
      aria-label={`Napi maximum-hőmérséklet: ${summary}`}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        >
          <CartesianGrid
            vertical={false}
            stroke="currentColor"
            strokeOpacity={0.5}
            horizontalCoordinatesGenerator={({ width, height }) => {
              const lines = [height * 0.3, height * 0.6];
              // the desktop design has a third line near the bottom
              if (width > 450) lines.push(height * 0.94);
              return lines;
            }}
          />
          <YAxis hide domain={[min - range * 0.5, max + range]} />
          <Tooltip cursor={false} content={ChartTooltip} />
          <Line
            type="natural"
            dataKey="max"
            stroke="currentColor"
            strokeWidth={1}
            dot={false}
            activeDot={{ r: 4, fill: "currentColor", stroke: "none" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </figure>
  );
}

// small bubble on hover / tap, e.g. "Kedd: 9 °C" and "Eső" below
function ChartTooltip({ active, payload }: TooltipContentProps) {
  if (!active || !payload?.length) return null;

  const { day, max, weather } = payload[0].payload;
  const WeatherIcon = weather.icon;

  return (
    <div className={styles.tooltip}>
      <p>
        {day}: {formatTemp(max)}
      </p>
      <p className={styles.condition}>
        <WeatherIcon size={14} weight="fill" aria-hidden />
        {weather.label}
      </p>
    </div>
  );
}
