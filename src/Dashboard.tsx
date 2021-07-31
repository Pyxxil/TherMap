import React, { useContext } from "react";

import { Location, LocationContext } from "./Location";

import Tree from "./img/tree.png";
import Snow3 from "./img/snow03.png";
import Snow5 from "./img/snow05.png";
import Snow7 from "./img/snow07.png";
import Snow9 from "./img/snow09.png";
import Snow10 from "./img/snow10.png";
import Snow16 from "./img/snow16.png";
import Snow17 from "./img/snow17.png";

import "./styles.css";

interface Props {
  destination?: Location;
}

const Dashboard: React.FC<Props> = (props) => {
  const { location } = useContext(LocationContext);
  let temperature = 0; // 0 cold, 100 hot

  // image, bottom, left, width, height, angle, flip
  const snowLocations = [[Snow3, "280px", "-10px", "80px", "auto", "0deg", "1"], 
                        [Snow16, "370px", "90px", "130px", "70px", "0deg", "1"], 
                        [Snow17, "250px", "300px", "80px", "100px", "0deg", "1"], 
                        [Snow7, "270px", "140px", "150px", "70px", "0deg", "1"],
                        [Snow5, "200px", "-5px", "150px", "80px", "0deg", "1"],
                        [Snow9, "140px", "10px", "50px", "auto", "0deg", "-1"],
                        [Snow10, "130px", "80px", "60px", "40px", "0deg", "1"],
                        [Snow10, "125px", "180px", "60px", "40px", "-35deg", "-1"],
                        [Snow9, "170px", "260px", "50px", "auto", "-30deg", "1"],]
  if (props.destination) {
    return (
      <div>
        <p>
          Cool, lets go to {props.destination.lat},{props.destination.lng} from{" "}
          {location?.lat},{location?.lng}
        </p>
        <img src={Tree} className="tree" />
        {snowLocations.map((location: string[]) => {
          console.log(location[0]);
          return <img src={location[0]} className="snow" style={{bottom: location[1], left: location[2], width: location[3], height: location[4], transform: `rotate(${location[5]}) scaleX(${location[6]})`}}/>
        })}
      </div>
    );
  }

  return <></>;
};

export default Dashboard;
