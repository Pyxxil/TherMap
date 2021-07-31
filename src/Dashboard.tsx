import React, { useContext, useEffect, useState } from "react";

import { Location, LocationContext } from "./Location";
import { EuclideanDistance } from "./Utils";

import WarmerAudio from "./Warmer.mp3";
import ColderAudio from "./Colder.mp3";

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

  let temperature = 0; // 0 cold, 100 hot

  if (location && props.destination && originalDistance) {
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

        <audio src={closer ? WarmerAudio : ColderAudio} autoPlay loop></audio>
        <p>{closer ? "warmer (closer)" : "colder (further)"}</p>
      </div>
    );
  }

  return <></>;
};

export default Dashboard;
