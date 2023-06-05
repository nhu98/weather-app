/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_OPENWEATHER_API_BASEURL: string;
  VITE_OPENWEATHER_API_KEY: string;
  VITE_GEOLOCATION_GEOCODE_BASEURL: string;
  VITE_GEOLOCATION_API_KEY: string;
  VITE_WEATHER_API_BASEURL: string;
  VITE_WEATHER_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
