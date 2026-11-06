import {
  CloudFogIcon,
  CloudIcon,
  CloudLightningIcon,
  CloudRainIcon,
  CloudSnowIcon,
  CloudSunIcon,
  SunIcon,
  type Icon,
} from "@phosphor-icons/react";

type Weather = { label: string; icon: Icon };

// WMO codes from Open-Meteo, grouped in ranges
export function getWeather(code: number): Weather {
  if (code === 0) return { label: "Tiszta idő", icon: SunIcon };
  if (code === 1) return { label: "Napos", icon: SunIcon };
  if (code <= 2) return { label: "Részben felhős", icon: CloudSunIcon };
  if (code === 3) return { label: "Borult", icon: CloudIcon };
  if (code <= 48) return { label: "Köd", icon: CloudFogIcon };
  if (code <= 57) return { label: "Szitálás", icon: CloudRainIcon };
  if (code <= 67) return { label: "Eső", icon: CloudRainIcon };
  if (code <= 77) return { label: "Havazás", icon: CloudSnowIcon };
  if (code <= 82) return { label: "Zápor", icon: CloudRainIcon };
  if (code <= 86) return { label: "Hózápor", icon: CloudSnowIcon };
  return { label: "Zivatar", icon: CloudLightningIcon };
}
