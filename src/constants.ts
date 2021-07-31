import { getFlameImage, getFlameSize } from "./Utils";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY?.toString() ?? "";

export const GEOLOCATION_API = `https://www.googleapis.com/geolocation/v1/geolocate?key=${API_KEY}`;

export const fireLocations = [ // image, bottom, left, size
    [getFlameImage(), "400px", "140", getFlameSize()], 
    [getFlameImage(), "380px", "220", getFlameSize()],
    [getFlameImage(), "320px", "80", getFlameSize()], 
    [getFlameImage(), "305px", "20", getFlameSize()],  
    [getFlameImage(), "300px", "220", getFlameSize()], 
    [getFlameImage(), "290px", "320", getFlameSize()], 
    [getFlameImage(), "250px", "40", getFlameSize()], 
    [getFlameImage(), "230px", "130", getFlameSize()], 
    [getFlameImage(), "205px", "350", getFlameSize()], 
    [getFlameImage(), "174px", "235", getFlameSize()], 
    [getFlameImage(), "160px", "30", getFlameSize()], 
    [getFlameImage(), "140px", "310", getFlameSize()], 
    [getFlameImage(), "140px", "90", getFlameSize()], 
    [getFlameImage(), "60px", "70", getFlameSize()],
    [getFlameImage(), "40px", "140", getFlameSize()], 
    [getFlameImage(), "40px", "270", getFlameSize()], 
    [getFlameImage(), "30px", "20", getFlameSize()], 
    [getFlameImage(), "10px", "210", getFlameSize()], 
    [getFlameImage(), "5px", "330", getFlameSize()], 
    [getFlameImage(), "-10px", "100", getFlameSize()]
  ]