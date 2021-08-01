import React from "react";
import ReactDOM from "react-dom";
import { Wrapper } from "@googlemaps/react-wrapper";

import "milligram";

import LocationProvider from "./Location";
import App from "./App";
import { API_KEY } from "./constants";

ReactDOM.render(
  <React.StrictMode>
    <Wrapper apiKey={API_KEY} libraries={["places"]}>
      <LocationProvider>
        <App />
      </LocationProvider>
    </Wrapper>
  </React.StrictMode>,
  document.getElementById("root")
);
