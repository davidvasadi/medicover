// Finding a city and getting its weather

const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

export type City = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  admin1?: string; // county / region
  timezone?: string;
};

export type Forecast = {
  current: {
    temperature_2m: number;
    weather_code: number;
    is_day: number; // 1 = day, 0 = night
  };
  daily: {
    time: string[]; // "2026-11-06"
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: (number | null)[];
  };
};

// throws on non-2xx so React Query can show the error
async function fetchJson<Data>(
  url: string,
  signal?: AbortSignal,
): Promise<Data> {
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json() as Promise<Data>;
}

// up to 10 matching cities, names in Hungarian
export async function searchCities(
  query: string,
  signal?: AbortSignal,
): Promise<City[]> {
  const params = new URLSearchParams({
    name: query,
    count: "10",
    language: "hu",
    format: "json",
  });
  const data = await fetchJson<{ results?: City[] }>(
    `${GEOCODING_URL}?${params}`,
    signal,
  );
  // no "results" key when nothing is found
  return data.results ?? [];
}

// current weather + 7-day forecast for one location
export function getForecast(
  latitude: number,
  longitude: number,
  signal?: AbortSignal,
): Promise<Forecast> {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: "temperature_2m,weather_code,is_day",
    daily:
      "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
    timezone: "auto",
    forecast_days: "7",
  });
  return fetchJson<Forecast>(`${FORECAST_URL}?${params}`, signal);
}
