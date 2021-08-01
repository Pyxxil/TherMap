import React, { useEffect, useRef, useState } from "react";
import { Location } from "./Location";

import "./styles.css";

interface Props {
  found: (_?: Location) => void;
}

const Search: React.FC<Props> = (props) => {
  const [updated, setUpdated] = useState(false);
  const autocomplete = useRef<HTMLInputElement>(null);
  const autocompleteElement = useRef<google.maps.places.Autocomplete>();
  const [destination, setDestination] = useState("");

  useEffect(() => {
    if (autocomplete.current) {
      const options = {
        componentRestrictions: { country: "nz" },
        fields: ["address_components", "geometry", "icon", "name"],
        strictBounds: false,
        types: ["establishment"],
      };

      autocompleteElement.current = new google.maps.places.Autocomplete(
        autocomplete.current,
        options
      );

      autocompleteElement.current.addListener("place_changed", () => {
        const place = autocompleteElement.current?.getPlace();
        if (place)
          props.found({
            lat: place.geometry?.location?.lat() ?? 0,
            lng: place.geometry?.location?.lng() ?? 0,
          });
        setDestination(place?.name ?? destination);
      });
    }
  }, [autocomplete]);

  useEffect(() => {
    // if (destination.length > 0) {
    //   fetch(`${SEARCH_API}&input=${destination}`, { method: "POST" }).then(
    //     (resp) => {
    //       resp.json().then((locations: any[]) => {
    //         console.debug(locations);
    //         // setSuggestions(
    //         //   locations
    //         //     .filter((location) => !!location.geometry)
    //         //     .map((location) => {})
    //         // );
    //       });
    //     }
    //   );
    // }
  }, [destination]);

  return (
    <div>
      <input
        ref={autocomplete}
        placeholder="Where would you like to go?"
        value={destination}
        onChange={(event) => {
          setUpdated(true);
          setDestination(event.target.value);
        }}
        className="input-field"
      />
    </div>
  );
};

export default Search;
