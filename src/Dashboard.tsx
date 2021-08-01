import React, { useContext, useEffect, useState } from "react";

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
  const [distance, setDistance] = useState(0);
  const [originalDistance, setOriginalDistance] = useState<number>();
  const [closer, setCloser] = useState(false);
  const [temperature, setTemparature] = useState(0); // 0 cold, 100 hot

  useEffect(() => {
    if (!originalDistance && location && props.destination) {
      const newDistance = EuclideanDistance(location, props.destination);
      setOriginalDistance(newDistance);
      setDistance(newDistance);
      setCloser(newDistance < distance);
    } else if (location && props.destination) {
      const newDistance = EuclideanDistance(location, props.destination);
      setDistance(EuclideanDistance(location, props.destination));
      setCloser(newDistance < distance);
    }
  }, [location, props.destination]);

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
        snowflakeLocations.map((snowflakeLocation) => {
          return (
            <img
              src={snowflakeLocation[0]}
              className="snow"
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
        fireLocations.map((fireLocation) => {
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

      {temperature < 50 &&
        snowflakeLocations.map((location) => {
          return (
            <img
              src={location[0]}
              className="snow"
              style={{
                bottom: location[1],
                left: location[2],
                width: location[3],
              }}
            />
          );
        })}

      {temperature > 50 &&
        fireLocations.map((location) => {
          return (
            <img
              src={location[0]}
              style={{
                bottom: location[1],
                left: determineFlameLeft(location[2], location[3]),
                width: location[3] + "px",
              }}
              className="fire"
              key={location[1] + location[2]}
            />
          );
        })}
    </div>
  );
};

export default Dashboard;
