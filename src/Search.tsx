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
          run(1.11,2.22);
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
            className="row button button-outline"
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
