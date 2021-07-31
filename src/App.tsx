import React, { useState } from "react";

import Dashboard from "./Dashboard";
import Search from "./Search";

const App: React.FC = () => {
  const [destination, setDestination] = useState("");

  return (
    <div className="container">
      <h3 className="column">TherMap</h3>

      <Search found={setDestination} />

      <Dashboard destination={destination} />
    </div>
  );
};

export default App;
