import React, { useContext, useState } from "react";

import Dashboard from "./Dashboard";
import { LocationContext } from "./Location";
import Search from "./Search";

const App: React.FC = () => {
  const [destination, setDestination] = useState("");

  const { location } = useContext(LocationContext);

  return (
    <div className="container">
      <h3 className="column">TherMap</h3>

      <Search found={setDestination} />

      <Dashboard destination={destination} />

      {location?.lat}
    </div>
  );
};

export default App;
