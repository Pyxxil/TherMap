import React, { useState } from "react";
import { Location } from "./Location";

import "./styles.css";

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
        className="container suggestions"
        style={{
          display: !updated || destination.length === 0 ? "none" : "block",
        }}
      >
        {suggestions
          .filter((suggestion) =>
            suggestion.name.toLowerCase().includes(destination.toLowerCase())
          )
          .map((suggestion) => (
            <button
              key={suggestion.name}
              className="row button button-outline dropdown-button"
              onClick={() => {
                setUpdated(false);
                setDestination(suggestion.name);
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
