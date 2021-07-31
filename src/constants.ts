export const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY?.toString() ?? "";

export const GEOLOCATION_API = `https://www.googleapis.com/geolocation/v1/geolocate?key=${API_KEY}`;

export function DETOUR_API(currentLat: any, currentLng: any) {
  return `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${currentLat},${currentLng}&radius=1000&key=${API_KEY}`;
}
