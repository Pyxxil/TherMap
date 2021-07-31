import React, { useEffect, useRef, useState } from "react";

import { GEOLOCATION_API } from "./constants";

export const LocationContext = React.createContext<{
  location?: { lat: number; lng: number };
  accuracy?: number;
}>({});

const LocationProvider: React.FC = (props) => {
  const timer = useRef<number>();
  const [location, setLocation] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    // timer.current = setInterval(() => {
    //   fetch(GEOLOCATION_API, { method: "POST" }).then((resp) =>
    //     resp.json().then((loc) => {
    //       setLocation(loc.location);
    //       console.debug(loc.location);
    //     })
    //   );
    // }, 10000);

    () => {
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
