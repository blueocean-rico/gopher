// import type { NextPage } from "next";

// // const Map: NextPage = () => {
// //   return (
// //     <div>{process.env.NEXT_PUBLIC_GOOGLE_MAPS}</div>
// //   )
// // }

import React, { useState } from "react";
import { GoogleMap, LoadScript, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import PlaceSearch from "./api/map";
import { constants } from "buffer";

const containerStyle = {
  width: '750px',
  height: '500px'
  // width: '100%',
  // height: '100%'
};

const center = {
  lat: 47.6205,
  lng: -122.349358,
};


const google_maps_api_key: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS ?? '';


function HomePage({ stores }) {
  // const [places, setPlaces] = useState(PlaceSearch({ center }));

  console.log(stores);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: google_maps_api_key,
  })

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
      options={{
        zoomControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false
      }}
    >
      <MarkerF position={center} icon={'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'} />
      {stores.map((store, index) => (
        <MarkerF position={store.geometry.location} key={index} />
      ))}
    </GoogleMap>
  );
}


export async function getStaticProps() {

  const center = {
    lat: 47.6205,
    lng: -122.349358,
  };

  const config = {
    method: "GET",
    url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${center.lat}%2C${center.lng}&radius=1800&type=supermarket&keyword=whole&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS}`,
  };


  const res = await fetch(config.url, {
    method: 'GET',
    // mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await res.json();

  const stores = data.results;

  return {
    props: {
      stores
    }
  };
}


export default HomePage;