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
  const mapRef = useRef(null);
  const [distance, setDistance] = useState(0);
  const [originalDistance, setOriginalDistance] = useState(0);
  const [detour, setDetour] = useState(false);
  const [detourLocation, setDetourLocation] = useState<Location>();
  const [detourName, setDetourName] = useState("");
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
    savedCallback.current = setTimeout(() => nearbyLocations(), 10000);
    return () => {
      if (savedCallback.current) {
        clearTimeout(savedCallback.current);
      }
    };
  }, [location]);

  function nearbyLocations() {
    if (location) {
      var currentCoordinates = new google.maps.LatLng(location.lat,location.lng);
      var map = new google.maps.Map(mapRef.current!, {
        center: currentCoordinates,
      });
      var service = new google.maps.places.PlacesService(map);
      var request = {
        location: currentCoordinates,
        radius: 1000,
      };
      //use setDetour and create ternary operator in return checking if detour in progress
      //if detour ? mapToDetour : mapToDestination
    }
  }

  function callback(results: google.maps.places.PlaceResult[] | null, status: google.maps.places.PlacesServiceStatus) {
    if (status == google.maps.places.PlacesServiceStatus.OK && results) {
        console.log(results)
        const index = Math.floor(Math.random() * results.length);
        const detourLat = results[index].geometry?.location?.lat();
        const detourLng = results[index].geometry?.location?.lng();
        setDetourLocation({ lat: detourLat ?? 0, lng: detourLng ?? 0});
        setDetourName(results[index].name ?? "");
        setDetour(true);
    }
  }

  if (props.destination) {
    return (
      <div>
        <p>
          Cool, lets go to {props.destination.lat},{props.destination.lng} from{" "}
          {location?.lat},{location?.lng} with distance {distance} KM.
        </p>

        { detour && <p>Detouring to: {detourName}</p>}

        <img
          src={Tree}
          className="tree"
          style={{
            filter: `sepia(${(temperature - 50) * 2})`,
            WebkitFilter: `sepia(${(temperature - 50) * 2}%)`,
          }}
        />
        <div style={{display: "none"}} ref={mapRef}></div>

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
