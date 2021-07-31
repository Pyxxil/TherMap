import React, { useState } from "react";

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
