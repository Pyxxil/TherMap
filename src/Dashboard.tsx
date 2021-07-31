import React, { useContext, useEffect, useState } from "react";

import { Location, LocationContext } from "./Location";
import { EuclideanDistance } from './Utils';

import Tree from "./img/tree.png";
import "./styles.css";

interface Props {
  destination?: Location;
}

const Dashboard: React.FC<Props> = (props) => {
  const { location } = useContext(LocationContext);
  const [distance, setDistance]= useState(0);
  const [originalDistance, setOriginalDistance] = useState(0);

  useEffect(() => {
    let distance;

    if (originalDistance == 0 && location && props.destination){
      setOriginalDistance(EuclideanDistance(location, props.destination));
      setDistance(EuclideanDistance(location, props.destination));
    } else if (location && props.destination){
      setDistance(EuclideanDistance(location, props.destination));
    }
    
  }, [location, props.destination]);
  
  let temperature = 0; // 0 cold, 100 hot

  if (props.destination) {
    return (
      <div>
        <p>
          Cool, lets go to {props.destination.lat},{props.destination.lng} from{" "}
          {location?.lat},{location?.lng} with distance {distance} KM.
        </p>
        
        <img src={Tree} className="tree" style={{filter: `sepia(${(temperature - 50) * 2})`, WebkitFilter: `sepia(${(temperature - 50) * 2}%)`}} />

        <p>
          {distance - originalDistance < 0 ? 
          <div>
            warmer (closer)
          </div> : distance - originalDistance > 0 ?
          <p>colder (further)</p> : 
          <div>
            same
          </div>}
        </p>
     
      </div>
    );
  }

  return <></>;
};

export default Dashboard;
