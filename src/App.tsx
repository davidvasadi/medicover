import { useState } from "react";
import { Chart } from "@/components/chart/chart";
import { CitySearchModal } from "@/components/city-search-modal/city-search-modal";
import { CurrentWeather } from "@/components/current-weather/current-weather";
import { ForecastList } from "@/components/forecast-list/forecast-list";
import { useForecast } from "@/hooks/use-forecast";
import { useSelectedCity } from "@/hooks/use-selected-city";
import styles from "./app.module.css";

// main page
function App() {
  const { city, selectCity } = useSelectedCity();

  // open the picker on first visit
  const [isPickerOpen, setPickerOpen] = useState(city === null);
  const forecast = useForecast(city);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {city && (
          <CurrentWeather
            cityName={city.name}
            onCityClick={() => setPickerOpen(true)}
            temperature={forecast.data?.current.temperature_2m}
            weatherCode={forecast.data?.current.weather_code}
          />
        )}

        {/* shows up once the forecast has loaded */}
        {forecast.data && (
          <div className={styles.forecast}>
            <ForecastList daily={forecast.data.daily} />
            <Chart daily={forecast.data.daily} />
          </div>
        )}

        {forecast.isLoading && <p className={styles.status}>Betöltés…</p>}

        {/* offline: React Query waits and retries by itself once back online */}
        {forecast.isPaused && (
          <p className={styles.status}>Nincs internetkapcsolat.</p>
        )}

        {forecast.isError && (
          <p className={styles.status}>
            Nem sikerült betölteni az időjárást.{" "}
            <button
              type="button"
              className={styles.retry}
              onClick={() => forecast.refetch()}
            >
              Újra
            </button>
          </p>
        )}
      </main>

      <footer className={styles.footer}>Vasadi Dávid</footer>

      <CitySearchModal
        open={isPickerOpen}
        onOpenChange={setPickerOpen}
        canClose={city !== null}
        onSelect={(picked) => {
          selectCity(picked);
          setPickerOpen(false);
        }}
      />
    </div>
  );
}

export default App;
