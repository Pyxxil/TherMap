import React, { useContext, useEffect, useState } from "react";

import { Location, LocationContext } from "./Location";
import { EuclideanDistance } from './Utils';

import Tree from "./img/tree.png";
import Fire1 from "./img/fire1.jpg";
import Fire2 from "./img/fire2.jpg";
import "./styles.css";

interface Props {
  destination?: Location;
}

const Dashboard: React.FC<Props> = (props) => {

  function getFlameSize() {
    return (Math.round(Math.random() * 20) + 40).toString();
  }
  function getFlameImage() {
    return Math.random() > 0.5 ? Fire1 : Fire2;
  }
  function getFlameLeft(left: string, size: string) {
    return (parseInt(left) - parseInt(size) / 2).toString() + "px"
  }

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
  
  let temperature = 0; // 0 cold, 100 hot
  
  const fireLocations = [ // image, bottom, left, size
    [getFlameImage(), "400px", "140", getFlameSize()], 
    [getFlameImage(), "380px", "220", getFlameSize()],
    [getFlameImage(), "320px", "80", getFlameSize()], 
    [getFlameImage(), "305px", "20", getFlameSize()],  
    [getFlameImage(), "300px", "220", getFlameSize()], 
    [getFlameImage(), "290px", "320", getFlameSize()], 
    [getFlameImage(), "250px", "40", getFlameSize()], 
    [getFlameImage(), "230px", "130", getFlameSize()], 
    [getFlameImage(), "205px", "350", getFlameSize()], 
    [getFlameImage(), "174px", "235", getFlameSize()], 
    [getFlameImage(), "160px", "30", getFlameSize()], 
    [getFlameImage(), "140px", "310", getFlameSize()], 
    [getFlameImage(), "140px", "90", getFlameSize()], 
    [getFlameImage(), "60px", "70", getFlameSize()],
    [getFlameImage(), "40px", "140", getFlameSize()], 
    [getFlameImage(), "40px", "270", getFlameSize()], 
    [getFlameImage(), "30px", "20", getFlameSize()], 
    [getFlameImage(), "10px", "210", getFlameSize()], 
    [getFlameImage(), "5px", "330", getFlameSize()], 
    [getFlameImage(), "-10px", "100", getFlameSize()]
  ]

  if (location && props.destination && originalDistance) {
    return (
      <div>
        <p>
          Cool, lets go to {props.destination.lat},{props.destination.lng} from{" "}
          {location?.lat},{location?.lng} with distance {distance} KM.
        </p>
        
        <p>
          {closer ? 
            "warmer (closer)":
            "colder (further)"
        }
        </p>
     
      <img src={Tree} className="tree" 
        style={{filter: `sepia(${(temperature - 50) * 2})`, WebkitFilter: `sepia(${(temperature - 50) * 2}%)`}} />

      {fireLocations.map((location: string[]) => {
        return <img src={location[0]} style={{bottom: location[1], left: getFlameLeft(location[2], location[3]), width: location[3] + "px"}} className="fire" key={location[0] + location[1]} />
      })}
      
      </div>
    );
  }

  return <></>;
};

export default Dashboard;
