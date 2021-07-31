import React, { useContext } from "react";

import { Location, LocationContext } from "./Location";

import Tree from "./img/tree.png";
import "./styles.css";

interface Props {
  destination?: Location;
}

const Dashboard: React.FC<Props> = (props) => {
  const { location } = useContext(LocationContext);

  if (props.destination) {
    return (
      <div>
        <p>
          Cool, lets go to {props.destination.lat},{props.destination.lng} from{" "}
          {location?.lat},{location?.lng}
        </p>
        <img src={Tree} className="tree" />
      </div>
    );
  }

  return <></>;
};

export default Dashboard;
