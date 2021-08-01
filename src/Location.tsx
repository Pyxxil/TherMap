import React, { useEffect, useRef, useState } from "react";

export interface Location {
  lat: number;
  lng: number;
}

export const LocationContext = React.createContext<{
  location?: Location;
  accuracy?: number;
}>({});

const LocationProvider: React.FC = (props) => {
  const [location, setLocation] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    navigator.geolocation.watchPosition((location) => {
      setLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    });
  }, []);

  return (
    <LocationContext.Provider
      value={{
        location,
      }}
    >
      {props.children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;
