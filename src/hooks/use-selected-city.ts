import { useState } from "react";
import type { City } from "@/api/open-meteo";

const STORAGE_KEY = "weather:city";

// anythin missing or broken counts as "no city yet"
function loadCity(): City | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    const city = JSON.parse(saved);
    const isValid =
      typeof city?.name === "string" &&
      typeof city?.latitude === "number" &&
      typeof city?.longitude === "number";
    return isValid ? city : null;
  } catch {
    return null;
  }
}

// saved city; null on first visit, so the city picker opens right away
export function useSelectedCity() {
  const [city, setCity] = useState<City | null>(loadCity); //runs only on first render

  function selectCity(next: City) {
    setCity(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // storage can be blocked (e.g. private mode), the app still works
    }
  }
  return { city, selectCity };
}
