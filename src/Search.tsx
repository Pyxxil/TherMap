import React, { useState } from "react";
import { Location } from "./Location";

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
  ]);

  const nearbyLocations = async (latitude, longitude) => {
    const jsonResponse = await fetch("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + -33.8670522 + "," + 151.1957362 + "&radius=1000&key=YOUR_API_KEY");
    const results = await jsonResponse.json();
    console.log(results)
    //set temp destination to a random location from results
    const index = Math.floor(Math.random() * results.candidates.length)
    const detourLat = results.candidates[index].geometry.location.lat
    const detourLng = results.candidates[index].geometry.location.lng 
  }

  const run = (lat, long) => {
    console.log(lat, long)
    console.log("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + long + "&radius=500&key=YOUR_API_KEY")
    const tempData = {
      "candidates" : [
         {
            "formatted_address" : "140 George St, The Rocks NSW 2000, Australia",
            "geometry" : {
               "location" : {
                  "lat" : -33.8599358,
                  "lng" : 151.2090295
               },
               "viewport" : {
                  "northeast" : {
                     "lat" : -33.85824767010727,
                     "lng" : 151.2102470798928
                  },
                  "southwest" : {
                     "lat" : -33.86094732989272,
                     "lng" : 151.2075474201073
                  }
               }
            },
            "name" : "Museum of Contemporary Art Australia",
            "opening_hours" : {
               "open_now" : false,
               "weekday_text" : []
            },
            "photos" : [
               {
                  "height" : 2268,
                  "html_attributions" : [
                     "\u003ca href=\"https://maps.google.com/maps/contrib/113202928073475129698/photos\"\u003eEmily Zimny\u003c/a\u003e"
                  ],
                  "photo_reference" : "CmRaAAAAfxSORBfVmhZcERd-9eC5X1x1pKQgbmunjoYdGp4dYADIqC0AXVBCyeDNTHSL6NaG7-UiaqZ8b3BI4qZkFQKpNWTMdxIoRbpHzy-W_fntVxalx1MFNd3xO27KF3pkjYvCEhCd--QtZ-S087Sw5Ja_2O3MGhTr2mPMgeY8M3aP1z4gKPjmyfxolg",
                  "width" : 4032
               }
            ],
            "rating" : 4.3
         }, 
         {
          "formatted_address" : "140 George St, The Rocks NSW 2000, Australia",
          "geometry" : {
             "location" : {
                "lat" : -3323.8599358,
                "lng" : 15123.2090295
             },
             "viewport" : {
                "northeast" : {
                   "lat" : -33.85824767010727,
                   "lng" : 151.2102470798928
                },
                "southwest" : {
                   "lat" : -33.86094732989272,
                   "lng" : 151.2075474201073
                }
             }
          },
          "name" : "Museum of Contemporary Art Australia",
          "opening_hours" : {
             "open_now" : false,
             "weekday_text" : []
          },
          "photos" : [
             {
                "height" : 2268,
                "html_attributions" : [
                   "\u003ca href=\"https://maps.google.com/maps/contrib/113202928073475129698/photos\"\u003eEmily Zimny\u003c/a\u003e"
                ],
                "photo_reference" : "CmRaAAAAfxSORBfVmhZcERd-9eC5X1x1pKQgbmunjoYdGp4dYADIqC0AXVBCyeDNTHSL6NaG7-UiaqZ8b3BI4qZkFQKpNWTMdxIoRbpHzy-W_fntVxalx1MFNd3xO27KF3pkjYvCEhCd--QtZ-S087Sw5Ja_2O3MGhTr2mPMgeY8M3aP1z4gKPjmyfxolg",
                "width" : 4032
             }
          ],
          "rating" : 4.3
       }, 
      ],
      "status" : "OK",
      "info_messages" : [
         "Unsupported request parameter value: 'foo' ignored.",
         "Unsupported request parameter value: 'bar' ignored.",
     ],
   }
   console.log(tempData.candidates)
   console.log(tempData.candidates.length)
   const index = Math.floor(Math.random() * tempData.candidates.length)
   const detourLat = tempData.candidates[index].geometry.location.lat
   const detourLng = tempData.candidates[index].geometry.location.lng 
   console.log(detourLat,detourLng)
  }

  return (
    <div>
      <input
        placeholder="Where would you like to go?"
        value={destination}
        onChange={(event) => {
          setUpdated(true);
          setDestination(event.target.value);
<<<<<<< HEAD
          run(1.11,2.22);
=======
          if (event.target.value.length === 0) {
            props.found(undefined);
          }
>>>>>>> d23a788f7ddac7bb27b22fe2ac6e3c7e8a6513a7
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
        {suggestions
          .filter((suggestion) =>
            suggestion.name.toLowerCase().includes(destination.toLowerCase())
          )
          .map((suggestion) => (
            <button
              key={suggestion.name}
              className="row button button-outline"
              onClick={() => {
                setUpdated(false);
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
