import React from "react";
import ReactDOM from "react-dom";

import "milligram";

import LocationProvider from "./Location";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <LocationProvider>
      <App />
    </LocationProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
