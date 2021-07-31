import React, { useContext, useEffect, useState } from "react";

import { Location, LocationContext } from "./Location";
import { EuclideanDistance, getFlameLeft } from './Utils';

import Tree from "./img/tree.png";

import Snowflake1 from "./img/snowflake1.png";
import Snowflake2 from "./img/snowflake2.png";
import Snowflake3 from "./img/snowflake3.png";
import Snowflake4 from "./img/snowflake4.png";

import Snow3 from "./img/snow03.png";
import Snow5 from "./img/snow05.png";
import Snow7 from "./img/snow07.png";
import Snow9 from "./img/snow09.png";
import Snow10 from "./img/snow10.png";
import Snow16 from "./img/snow16.png";
import Snow17 from "./img/snow17.png";
import Snow18 from "./img/snow18.png";

import "./styles.css";
import { fireLocations } from "./constants";

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
  
  let temperature = 100; // 0 cold, 100 hot

  // image, bottom, left, width, height, angle, flip
  // const snowflakeLocations = [[Snowflake1, "500px", "50px", "40px", "auto", "0deg", "1"],
  //                             [Snowflake4, "450px", "30px", "20px", "auto", "0deg", "1"],
  //                             [Snowflake3, "280px", "50px", "150px", "auto", "0deg", "1"],
  //                             [Snowflake4, "280px", "50px", "150px", "auto", "0deg", "1"]];

  const snowLocations = [[Snow3, "280px", "-10px", "80px", "auto", "0deg", "1"], 
                        [Snow16, "370px", "90px", "130px", "70px", "0deg", "1"], 
                        [Snow17, "250px", "300px", "80px", "100px", "0deg", "1"], 
                        [Snow7, "270px", "140px", "150px", "70px", "0deg", "1"],
                        [Snow5, "200px", "-5px", "150px", "80px", "0deg", "1"],
                        [Snow9, "140px", "10px", "50px", "auto", "0deg", "-1"],
                        [Snow10, "130px", "80px", "60px", "40px", "0deg", "1"],
                        [Snow10, "125px", "180px", "60px", "40px", "-35deg", "-1"],
                        [Snow9, "170px", "260px", "50px", "auto", "-30deg", "1"]];

  const groundSnowLocations = [[Snow18, "45px", "-6px", "160px", "auto", "0deg", "-1"],
                              [Snow18, "35px", "205px", "150px", "auto", "0deg", "-1"],
                              [Snow18, "40px", "270px", "140px", "auto", "0deg", "1"],
                              [Snow18, "20px", "280px", "120px", "auto", "0deg", "1"],
                              [Snow18, "10px", "230px", "120px", "auto", "0deg", "1"],
                              [Snow18, "10px", "190px", "130px", "auto", "0deg", "-1"],
                              [Snow18, "15px", "135px", "120px", "auto", "0deg", "-1"],
                              [Snow18, "10px", "110px", "120px", "auto", "0deg", "-1"],
                              [Snow18, "20px", "90px", "150px", "auto", "0deg", "1"],
                              [Snow18, "20px", "40px", "150px", "auto", "0deg", "1"],
                              [Snow18, "23px", "-30px", "160px", "auto", "0deg", "-1"],
                              [Snow18, "-5px", "-30px", "160px", "auto", "0deg", "1"],
                              [Snow18, "-4px", "20px", "160px", "auto", "0deg", "-1"],
                              [Snow18, "-10px", "80px", "160px", "auto", "0deg", "1"],
                              [Snow18, "10px", "150px", "200px", "auto", "0deg", "1"],
                              [Snow18, "-8px", "200px", "220px", "auto", "0deg", "1"]];

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
          
        {snowLocations.map((location: string[]) => {
          console.log(location[0]);
          return <img src={location[0]} className="snow" style={{bottom: location[1], left: location[2], width: location[3], height: location[4], transform: `rotate(${location[5]}) scaleX(${location[6]})`}}/>
        })}

        {groundSnowLocations.map((location: string[]) => {
          console.log(location[0]);
          return <img src={location[0]} className="snow" style={{bottom: location[1], left: location[2], width: location[3], height: location[4], transform: `rotate(${location[5]}) scaleX(${location[6]})`}}/>
        })}

        {/* {snowflakeLocations.map((location: string[]) => {
          console.log(location[0]);
          return <img src={location[0]} className="snow" style={{bottom: location[1], left: location[2], width: location[3], height: location[4], transform: `rotate(${location[5]}) scaleX(${location[6]})`}}/>
        })} */}
     
      <img src={Tree} className="tree" 
        style={{filter: `sepia(${(temperature - 50) * 2})`, WebkitFilter: `sepia(${(temperature - 50) * 2}%)`}} />

      {temperature > 50 && fireLocations.map((location: string[]) => {
        return <img src={location[0]} style={{bottom: location[1], left: getFlameLeft(location[2], location[3]), width: location[3] + "px"}} className="fire" key={location[1] + location[2]} />
      })}

      </div>
    );
  }

  return <></>;
};

export default Dashboard;
