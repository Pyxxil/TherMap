import React, { useState } from "react";

import "./styles.css"

interface Props {
  found: (_: string) => void;
}

const Search: React.FC<Props> = (props) => {
  const [updated, setUpdated] = useState(false);
  const [destination, setDestination] = useState("");
  const [suggestions, setSuggestions] = useState([
    "test",
    "auckland",
    "Grid AKL",
  ]);

  return (
    <div>
      <input
        placeholder="Where would you like to go?"
        value={destination}
        onChange={(event) => {
          setUpdated(true);
          setDestination(event.target.value);
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
