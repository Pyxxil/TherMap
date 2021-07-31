import React, { useState } from "react";
import { Location } from "./Location";

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
    { name: "Pakuranga", location: { lat: -36.88333, lng: 174.91667}}
  ]);

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
        className="container"
        style={{
          display: !updated || destination.length === 0 ? "none" : "block",
          position: "absolute",
          left: 0,
          width: "100%",
          boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
          zIndex: 1,
          padding: 10,
          backgroundColor: "white",
        }}
      >
        {suggestions
          .filter((suggestion) =>
            suggestion.name.toLowerCase().includes(destination.toLowerCase())
          )
          .map((suggestion) => (
            <button
              key={suggestion.name}
              className="row button button-outline"
              onClick={() => {
                setUpdated(false);
                props.found(suggestion.location);
              }}
            >
              {suggestion.name}
            </button>
          ))}
      </div>
    </div>
  );
};

export default Search;
