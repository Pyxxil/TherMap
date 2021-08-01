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
  const timer = useRef<number>();
  const [location, setLocation] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    // FOR WHEN WE ACTUALLY GO LIVE
    // timer.current = setInterval(() => {
    //   fetch(GEOLOCATION_API, { method: "POST" }).then((resp) =>
    //     resp.json().then((loc) => {
    //       setLocation(loc.location);
    //       console.debug(loc.location);
    //     })
    //   );
    // }, 10000);

    // THIS IS ONLY FOR NOW
    // fetch(GEOLOCATION_API, { method: "POST" }).then((resp) =>
    //   resp.json().then((loc) => {
    //     setLocation(loc.location);
    //     console.debug(loc.location);
    //   })
    // );

    navigator.geolocation.watchPosition((location) => {
      setLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    });

    return () => {
      if (timer.current) clearInterval(timer.current);
    };
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
