import React, { useState } from "react";

import "./styles.css"

import Dashboard from "./Dashboard";
import Search from "./Search";

const App: React.FC = () => {
  const [destination, setDestination] = useState("");

  return (
    <div className="container">
      <h1 className="column">TherMap</h1>

      <Search found={setDestination} />

      <Dashboard destination={destination} />
    </div>
  );
};

export default App;
