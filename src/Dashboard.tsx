import React, { useContext, useEffect, useState, useRef } from "react";

import { Location, LocationContext } from "./Location";

import WarmerAudio from "./Warmer.mp3";
import ColderAudio from "./Colder.mp3";
import {
  EuclideanDistance,
  determineFlameLeft,
  determinePosition,
} from "./Utils";
import {
  fireLocations,
  snowLocations,
  groundSnowLocations,
  generateSnowflakes,
} from "./constants";

import Tree from "./img/tree.png";

import "./styles.css";

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
  const [detourNumber, setDetourNumber] = useState(0);
  const [originalDetourDistance, setOriginalDetourDistance] = useState(0);
  const savedCallback = useRef<number>();
  const [closer, setCloser] = useState(false);
  const [temperature, setTemperature] = useState(0);

  useEffect(() => {
    if (!originalDistance && location && props.destination) {
      const newDistance = EuclideanDistance(location, props.destination);
      setOriginalDistance(newDistance);
      setDistance(newDistance);
      setCloser(newDistance < distance);
    } else if (location && props.destination && !detour){ //not on deetour
      const newDistance = EuclideanDistance(location, props.destination);
      setDistance(EuclideanDistance(location, props.destination));
      setCloser(newDistance < distance);
    } else if (location && props.destination && detour){ //on detour
      const newDistance = EuclideanDistance(location, detourLocation!);
      setDistance(EuclideanDistance(location, detourLocation!));
      setCloser(newDistance < distance);
      if (newDistance < 0.1) (setDetour(false))
    }
  }, [location, props.destination]);

  useEffect(() => {
    if (savedCallback.current) {
      clearTimeout(savedCallback.current);
      savedCallback.current = undefined;
    }

    savedCallback.current = setTimeout(() => nearbyLocations(), 10000);

    return () => {
      if (savedCallback.current) {
        clearTimeout(savedCallback.current);
      }
    };
  }, [location]);

  function nearbyLocations() {
    if (location && !detour && detourNumber < 3) {
      var currentCoordinates = new google.maps.LatLng(location.lat,location.lng);
      var map = new google.maps.Map(mapRef.current!, {
        center: currentCoordinates,
      });
      var service = new google.maps.places.PlacesService(map);
      var request = {
        location: currentCoordinates,
        radius: 1000,
      };
      service.nearbySearch(request,callback)
    }
  }

  function callback(results: google.maps.places.PlaceResult[] | null, status: google.maps.places.PlacesServiceStatus) {
    if (status == google.maps.places.PlacesServiceStatus.OK && results) {
        const index = Math.floor(Math.random() * results.length);
        const detourLat = results[index].geometry?.location?.lat();
        const detourLng = results[index].geometry?.location?.lng();
        const detourLoc = { lat: detourLat ?? 0, lng: detourLng ?? 0};
        setDetourLocation(detourLoc);
        setDetourName(results[index].name ?? "");
        setDetour(true);
        setDetourNumber(detourNumber + 1);
        setOriginalDetourDistance(EuclideanDistance(location!, detourLoc))
    }
  }

function determineFlameSize(original_size: string) {
    return parseInt(original_size) * ((temperature - 50) / 14);
  }

  function determineSnowFlakeSize(original_size: any) {
    return parseInt(original_size) * ((50 - temperature) / 35);
  }

  const snowflakeLocations = generateSnowflakes;

  if (!(location && props.destination && originalDistance)) {
    return <></>;
  }

  return (
    <div>
      <p>
        Cool, lets go to {props.destination.lat},{props.destination.lng} from{" "}
        {location?.lat},{location?.lng} with distance {distance} KM.
      </p>

      <audio src={closer ? WarmerAudio : ColderAudio} autoPlay loop></audio>

      <p>{closer ? "warmer (closer)" : "colder (further)"}</p>

      <img
        src={Tree}
        className="tree"
        style={{
          filter: `sepia(${(temperature - 50) * 2})`,
          WebkitFilter: `sepia(${(temperature - 50) * 2}%)`,
        }}
      />

      {temperature < 50 &&
        snowLocations.map((snowLocation) => {
          return (
            <img
              src={snowLocation[0]}
              className="snow"
              style={{
                opacity: `${(50 - temperature) / 50}`,
                bottom: snowLocation[1],
                left: snowLocation[2],
                width: snowLocation[3],
                height: snowLocation[4],
                transform: `rotate(${snowLocation[5]}) scaleX(${snowLocation[6]})`,
              }}
            />
          );
        })}

      {temperature < 50 &&
        groundSnowLocations.map((groundSnowLocation) => {
          return (
            <img
              src={groundSnowLocation[0]}
              className="snow"
              style={{
                opacity: `${(50 - temperature) / 50}`,
                bottom: groundSnowLocation[1],
                left: groundSnowLocation[2],
                width: groundSnowLocation[3],
                transform: `scaleX(${groundSnowLocation[4]})`,
              }}
            />
          );
        })}

      {temperature < 50 &&
        snowflakeLocations.map((snowflakeLocation: any[]) => {
          return (
            <img
              src={snowflakeLocation[0]}
              className="snow rotate"
              style={{
                bottom: determinePosition(
                  snowflakeLocation[1],
                  determineSnowFlakeSize(snowflakeLocation[3]).toString()
                ),
                left: determinePosition(
                  snowflakeLocation[2],
                  determineSnowFlakeSize(snowflakeLocation[3]).toString()
                ),
                width: determineSnowFlakeSize(snowflakeLocation[3]),
              }}
            />
          );
        })}

      {temperature > 50 &&
        fireLocations.map((fireLocation: any[]) => {
          return (
            <img
              src={fireLocation[0]}
              className="fire"
              key={fireLocation[1] + fireLocation[2]}
              style={{
                bottom: fireLocation[1],
                left: determineFlameLeft(fireLocation[2], fireLocation[3]),
                width: determineFlameSize(fireLocation[3]),
              }}
            />
          );
        })}
    </div>
  );
};

export default Dashboard;
