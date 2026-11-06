import { useQuery } from "@tanstack/react-query";
import { getForecast, type City } from "@/api/open-meteo";

// weather for the selected city, fetched once a city is picked
export function useForecast(city: City | null) {
  return useQuery({
    queryKey: ["forecast", city?.latitude, city?.longitude],
    queryFn: ({ signal }) =>
      getForecast(city!.latitude, city!.longitude, signal),
    enabled: city !== null,
    staleTime: 10 * 60 * 1000, // 10 min
  });
}
