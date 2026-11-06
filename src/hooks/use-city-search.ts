import { useQuery } from "@tanstack/react-query";
import { searchCities } from "../api/open-meteo";
import { useDebouncedValue } from "./use-debounced-value";

// the API returns nothing useful for a single character
const MIN_LENGTH = 2;

export function useCitySearch(query: string) {
  const debouncedQuery = useDebouncedValue(query.trim());

  return useQuery({
    queryKey: ["cities", debouncedQuery],
    queryFn: ({ signal }) => searchCities(debouncedQuery, signal),
    enabled: debouncedQuery.length >= MIN_LENGTH,
    staleTime: 5 * 60 * 1000, // same search within 5 minutes comes from cache
  });
}
