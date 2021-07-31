const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY?.toString() ?? "";

export const GEOLOCATION_API = `https://www.googleapis.com/geolocation/v1/geolocate?key=${API_KEY}`;
