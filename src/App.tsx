import React, { useContext, useState } from "react";

import "./styles.css"

import Dashboard from "./Dashboard";
import { LocationContext } from "./Location";
import Search from "./Search";

const App: React.FC = () => {
  const [destination, setDestination] = useState("");

  const { location } = useContext(LocationContext);

  return (
    <div className="container">
      <h1 className="column">TherMap</h1>

      <Search found={setDestination} />

      <Dashboard destination={destination} />

      {location?.lat}
    </div>
  );
};

export default App;
