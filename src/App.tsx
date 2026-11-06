import { useState } from "react";
import { CitySearchModal } from "./components/city-search-modal/city-search-modal";
import { useSelectedCity } from "./hooks/use-selected-city";

function App() {
  const { city, selectCity } = useSelectedCity();
  // first visit: nothing saved yet, so ask for a city right away
  const [isPickerOpen, setPickerOpen] = useState(city === null);

  return (
    <main>
      <button type="button" onClick={() => setPickerOpen(true)}>
        {city?.name ?? "Válassz várost"}
      </button>

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
