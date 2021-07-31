import React, { useContext } from "react";

import { Location, LocationContext } from "./Location";

import Tree from "./img/tree.png";
import "./styles.css";

interface Props {
  destination?: Location;
}

const Dashboard: React.FC<Props> = (props) => {
  const { location } = useContext(LocationContext);
  let temperature = 0; // 0 cold, 100 hot

  if (props.destination) {
    return (
      <div>
        <p>
          Cool, lets go to {props.destination.lat},{props.destination.lng} from{" "}
          {location?.lat},{location?.lng}
        </p>
      <img src={Tree} className="tree" 
        style={{filter: `sepia(${(temperature - 50) * 2})`, WebkitFilter: `sepia(${(temperature - 50) * 2}%)`}} />
      </div>
    );
  }

  return <></>;
};

export default Dashboard;
