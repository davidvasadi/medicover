import { useState } from "react";
import { Chart } from "@/components/chart/chart";
import { CitySearchModal } from "@/components/city-search-modal/city-search-modal";
import { CurrentWeather } from "@/components/current-weather/current-weather";
import { ForecastList } from "@/components/forecast-list/forecast-list";
import { useForecast } from "@/hooks/use-forecast";
import { useSelectedCity } from "@/hooks/use-selected-city";

// main page
function App() {
  const { city, selectCity } = useSelectedCity();

  // first visit: nothing saved yet, so ask for a city right away
  const [isPickerOpen, setPickerOpen] = useState(city === null);
  const forecast = useForecast(city);

  return (
    <main>
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
        <>
          <ForecastList daily={forecast.data.daily} />
          <Chart daily={forecast.data.daily} />
        </>
      )}

      <CitySearchModal
        open={isPickerOpen}
        onOpenChange={setPickerOpen}
        canClose={city !== null}
        onSelect={(picked) => {
          selectCity(picked);
          setPickerOpen(false);
        }}
      />
    </main>
  );
}

export default App;
