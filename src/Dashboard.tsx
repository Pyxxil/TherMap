import React, { useContext, useEffect, useState } from "react";

import { Location, LocationContext } from "./Location";
import { EuclideanDistance, getFlameLeft } from './Utils';
import { fireLocations, snowLocations, groundSnowLocations, snowflakeLocations } from "./constants";

import Tree from "./img/tree.png";

import "./styles.css";

interface Props {
  destination?: Location;
}

const Dashboard: React.FC<Props> = (props) => {

  const { location } = useContext(LocationContext);
  const [distance, setDistance]= useState(0);
  const [originalDistance, setOriginalDistance] = useState<number>();
  const [closer, setCloser] = useState(false);

  useEffect(() => {
    if (!originalDistance && location && props.destination){
      const newDistance = EuclideanDistance(location, props.destination);
      setOriginalDistance(newDistance);
      setDistance(newDistance);
      setCloser(newDistance < distance);
    } else if (location && props.destination){
      const newDistance = EuclideanDistance(location, props.destination);
      setDistance(EuclideanDistance(location, props.destination));
      setCloser(newDistance < distance);
    }
    
  }, [location, props.destination]);
  
  let temperature = 49; // 0 cold, 100 hot

  if (location && props.destination && originalDistance) {
    return (
      <div>
        <p>
          Cool, lets go to {props.destination.lat},{props.destination.lng} from{" "}
          {location?.lat},{location?.lng} with distance {distance} KM.
        </p>
        
        <p>
          { closer ? 
            "warmer (closer)":
            "colder (further)"
          }
        </p>

        <img src={Tree} className="tree" 
          style={{filter: `sepia(${(temperature - 50) * 2})`, WebkitFilter: `sepia(${(temperature - 50) * 2}%)`}} />
          
        {temperature < 50 && snowLocations.map((location: string[]) => {
          return <img src={location[0]} className="snow" style={{bottom: location[1], left: location[2], width: location[3], height: location[4], transform: `rotate(${location[5]}) scaleX(${location[6]})`}}/>
        })}

        {temperature < 50 && groundSnowLocations.map((location: string[]) => {
          return <img src={location[0]} className="snow" style={{bottom: location[1], left: location[2], width: location[3], transform: `scaleX(${location[4]})`}}/>
        })}

        {temperature < 50 && snowflakeLocations.map((location: any[]) => {
          return <img src={location[0]} className="snow" style={{bottom: location[1], left: location[2], width: location[3]}}/>
        })}

        {temperature > 50 && fireLocations.map((location: string[]) => {
          return <img src={location[0]} style={{bottom: location[1], left: getFlameLeft(location[2], location[3]), width: location[3] + "px"}} className="fire" key={location[1] + location[2]} />
        })}

      </div>
    );
  }

  return <></>;
};

export default Dashboard;
