export function formatDay(date: string, index: number) {
  if (index === 0) return "Ma";

  // the API date has no time zone, read and print it as UTC so the day doesn't shift
  const name = new Date(date).toLocaleDateString("hu-HU", {
    weekday: "long",
    timeZone: "UTC",
  });
  return name[0].toUpperCase() + name.slice(1);
}

export function formatTemp(value: number) {
  return `${Math.round(value)} °C`;
}

// precipitation can be null
export function formatPercent(value: number | null) {
  return value === null ? "-" : `${value}%`;
}
