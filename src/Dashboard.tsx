import React, { useContext, useEffect, useState, useRef } from "react";

import { Location, LocationContext } from "./Location";
import { EuclideanDistance } from "./Utils";

import Tree from "./img/tree.png";
import "./styles.css";
import { DETOUR_API } from "./constants";

interface Props {
  destination?: Location;
}

const Dashboard: React.FC<Props> = (props) => {
  const { location } = useContext(LocationContext);
  const [distance, setDistance] = useState(0);
  const [originalDistance, setOriginalDistance] = useState(0);
  const [detour, setDetour] = useState(false);
  const [detourLocation, setDetourLocation] = useState();
  const savedCallback = useRef<number>();

  useEffect(() => {
    if (originalDistance == 0 && location && props.destination) {
      setOriginalDistance(EuclideanDistance(location, props.destination));
      setDistance(EuclideanDistance(location, props.destination));
    } else if (location && props.destination) {
      setDistance(EuclideanDistance(location, props.destination));
    }
  }, [location, props.destination]);

  let temperature = 0; // 0 cold, 100 hot

  useEffect(() => {
    savedCallback.current = setTimeout(() => nearbyLocations(), 3000);
    return () => {
      if (savedCallback.current) {
        clearTimeout(savedCallback.current);
      }
    };
  }, [location]);

  async function nearbyLocations() {
    if (location) {
      console.log("LOCATION:", location);
      const jsonResponse = await fetch(DETOUR_API(location.lat, location.lng));
      console.debug(jsonResponse);
      const results = await jsonResponse.json();
      console.log(results);
      //set temp destination to a random location from results
      const index = Math.floor(Math.random() * results.candidates.length);
      const detourLat = results.candidates[index].geometry.location.lat;
      const detourLng = results.candidates[index].geometry.location.lng;
      setDetour(true);
      //setDetourLocation( location: { lat: detourLat, lng: detourLng});
      //use setDetour and create ternary operator in return checking if detour in progress
      //if detour ? mapToDetour : mapToDestination
    }
  }

  // console.log(location);

  if (props.destination) {
    return (
      <div>
        <p>
          Cool, lets go to {props.destination.lat},{props.destination.lng} from{" "}
          {location?.lat},{location?.lng} with distance {distance} KM.
        </p>

        <img
          src={Tree}
          className="tree"
          style={{
            filter: `sepia(${(temperature - 50) * 2})`,
            WebkitFilter: `sepia(${(temperature - 50) * 2}%)`,
          }}
        />

        <p>
          {distance - originalDistance < 0 ? (
            <div>warmer (closer)</div>
          ) : distance - originalDistance > 0 ? (
            <p>colder (further)</p>
          ) : (
            <div>same</div>
          )}
        </p>
      </div>
    );
  }

  return <></>;
};

export default Dashboard;
