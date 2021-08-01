import React, { useContext, useEffect, useState, useRef } from "react";

import { Location, LocationContext } from "./Location";
import { EuclideanDistance, getFlameLeft, generateSnowflakes } from './Utils';
import { fireLocations, snowLocations, groundSnowLocations } from "./constants";

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
    if (!originalDistance && location && props.destination){
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
      if (newDistance < 100) (setDetour(false))
    }
  }, [location, props.destination]);

  useEffect(() => {
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
        setDetourLocation({ lat: detourLat ?? 0, lng: detourLng ?? 0});
        setDetourName(results[index].name ?? "");
        setDetour(true);
        setDetourNumber(detourNumber + 1);
        setOriginalDetourDistance(EuclideanDistance(location!, detourLocation!))
    }
  }

  const snowflakeLocations = generateSnowflakes();

  if (location && props.destination && originalDistance) {
    return (
      <div>
        <p>
          Cool, lets go to {props.destination.lat},{props.destination.lng} from{" "}
          {location?.lat},{location?.lng} with distance {distance} KM.
        </p>

        { detour && <p>Detouring to: {detourName}</p>}
        <div style={{display: "none"}} ref={mapRef}></div>

        <p>
          {detour ?
            distance - originalDetourDistance < 0 ? (
              <div>warmer (closer)</div>
            ) : distance - originalDetourDistance > 0 ? (
              <p>colder (further)</p>
            ) : (
              <div>same</div>
            )
            :
            distance - originalDistance < 0 ? (
              <div>warmer (closer)</div>
            ) : distance - originalDistance > 0 ? (
              <p>colder (further)</p>
            ) : (
              <div>same</div>
            )
          }
        </p>
        
        <p>
          { closer ? 
            "warmer (closer)":
            "colder (further)"
          }
        </p>

        <img src={Tree} className="tree" 
          style={{filter: `sepia(${(temperature - 50) * 2})`, WebkitFilter: `sepia(${(temperature - 50) * 2}%)`}} />
          
        {temperature < 50 && snowLocations.map((location) => {
          return <img src={location[0]} className="snow" style={{bottom: location[1], left: location[2], width: location[3], height: location[4], transform: `rotate(${location[5]}) scaleX(${location[6]})`}}/>
        })}

        {temperature < 50 && groundSnowLocations.map((location) => {
          return <img src={location[0]} className="snow" style={{bottom: location[1], left: location[2], width: location[3], transform: `scaleX(${location[4]})`}}/>
        })}
        
        {temperature < 50 && snowflakeLocations.map((location: any[]) => {
          return <img src={location[0]} className="snow" style={{bottom: location[1], left: location[2], width: location[3]}}/>
        })}

        {temperature > 50 && fireLocations.map((location) => {
          return <img src={location[0]} style={{bottom: location[1], left: getFlameLeft(location[2], location[3]), width: location[3] + "px"}} className="fire" key={location[1] + location[2]} />
        })}

      </div>
    );
  }

  return <></>;
};

export default Dashboard;
