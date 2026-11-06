import { useState } from "react";
import { CitySearchModal } from "@/components/city-search-modal/city-search-modal";
import { CurrentWeather } from "@/components/current-weather/current-weather";
import { useForecast } from "@/hooks/use-forecast";
import { useSelectedCity } from "@/hooks/use-selected-city";

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
