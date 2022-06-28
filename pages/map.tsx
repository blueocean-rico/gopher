import React, { useState } from "react";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import PlaceSearch from "./api/map";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 33.51875,
  lng: -112.08137,
};

function HomePage() {
  const [places, setPlaces] = useState(PlaceSearch);

  console.log(places);

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS} places>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        <MarkerF position={center} />
      </GoogleMap>
    </LoadScript>
  );
}
export default HomePage;
