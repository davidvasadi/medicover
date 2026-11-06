import { formatTemp } from "@/lib/format";
import { getWeather } from "@/lib/weather-codes";
import styles from "./current-weather.module.css";

type Props = {
  cityName: string;
  onCityClick: () => void;
  temperature?: number;
  weatherCode?: number;
};

// city name, current temperature and condition (top-left block in the design)
export function CurrentWeather({
  cityName,
  onCityClick,
  temperature,
  weatherCode,
}: Props) {
  return (
    <section className={styles.current}>
      <button
        type="button"
        className={styles.city}
        onClick={onCityClick}
        aria-label={`Város módosítása: ${cityName}`}
      >
        {cityName}
      </button>

      {temperature !== undefined && weatherCode !== undefined && (
        <>
          <p className={styles.temp}>{formatTemp(temperature)}</p>
          <p className={styles.condition}>{getWeather(weatherCode).label}</p>
        </>
      )}
    </section>
  );
}
