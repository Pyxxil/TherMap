import React, { useState } from "react";
import { Location } from "./Location";

import "./styles.css"

interface Props {
  found: (_?: Location) => void;
}

const Search: React.FC<Props> = (props) => {
  const [updated, setUpdated] = useState(false);
  const [destination, setDestination] = useState("");
  const [suggestions, setSuggestions] = useState<
    { name: string; location: Location }[]
  >([
    { name: "Grid AKL", location: { lat: -36.8421652, lng: 174.7565977 } },
    { name: "Sky Tower", location: { lat: -36.848448, lng: 174.7600023 } },
    {
      name: "The University of Auckland",
      location: { lat: -36.8523378, lng: 174.7669186 },
    },
    { name: "Albert Park", location: { lat: -36.8506426, lng: 174.7656994 } },
  ]);
  const [detour, setDetour] = useState("");

  const nearbyLocations = async (currentLat, currentLng) => {
    const jsonResponse = await fetch("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + currentLat + "," + currentLng + "&radius=1000&key=YOUR_API_KEY");
    const results = await jsonResponse.json();
    console.log(results)
    //set temp destination to a random location from results
    const index = Math.floor(Math.random() * results.candidates.length)
    const detourLat = results.candidates[index].geometry.location.lat
    const detourLng = results.candidates[index].geometry.location.lng 
    //use setDetour and create ternary operator in return checking if detour in progress
    //if detour === "" ? mapToDestination : mapToDetour
  }

  return (
    <div>
      <input
        placeholder="Where would you like to go?"
        value={destination}
        onChange={(event) => {
          setUpdated(true);
          setDestination(event.target.value);
          if (event.target.value.length === 0) {
            props.found(undefined);
          }
        }}
      />
      <div
        className="container suggestions"
        style={{
          display: !updated || destination.length === 0 ? "none" : "block"
        }}
      >
        {suggestions.map((suggestion) => (
          <button
            className="row button button-outline dropdown-button"
            onClick={() => {
              setUpdated(false);
              props.found(suggestion);
            }}
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Search;
