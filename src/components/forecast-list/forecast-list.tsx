import type { Forecast } from "@/api/open-meteo";
import { formatDay, formatPercent, formatTemp } from "@/lib/format";
import { getWeather } from "@/lib/weather-codes";
import styles from "./forecast-list.module.css";

type Props = {
  daily: Forecast["daily"];
};

// 7-day forecast: day, icon, chance of rain, min / max
export function ForecastList({ daily }: Props) {
  return (
    <section>
      <h2 className={styles.title}>7 napos előrejelzés</h2>

      <ul className={styles.list}>
        {daily.time.map((date, index) => {
          const weather = getWeather(daily.weather_code[index]);
          const WeatherIcon = weather.icon;

          return (
            <li key={date} className={styles.row}>
              <span>{formatDay(date, index)}</span>

              <span className={styles.rain}>
                <WeatherIcon
                  size={16}
                  weight="fill"
                  role="img"
                  aria-label={weather.label}
                />
                {formatPercent(daily.precipitation_probability_max[index])}
              </span>

              <span className={styles.temps}>
                {formatTemp(daily.temperature_2m_min[index])} /{" "}
                {formatTemp(daily.temperature_2m_max[index])}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
