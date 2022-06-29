// import type { NextPage } from "next";

// // const Map: NextPage = () => {
// //   return (
// //     <div>{process.env.NEXT_PUBLIC_GOOGLE_MAPS}</div>
// //   )
// // }

import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  MarkerF,
  useJsApiLoader,
  InfoWindowF,
  DirectionsRenderer } from "@react-google-maps/api";

  import { Button } from '@mantine/core';


const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 47.6205,
  lng: -122.349358,
};


const google_maps_api_key: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS ?? '';

function HomePage({ stores }) {

  const [selectedMarker, setSelectedMarker] = useState(null);


  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: google_maps_api_key,
  })

  const handleMarkerClick = (index) => {
    console.log('im clicked')
    console.log(index);
    console.log(stores[index])
    setSelectedMarker(index);

  }

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  return (
    <div style={{width: 'auto', height: '455px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{width: '700px', height: '400px'}}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={14}
          options={{
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false
          }}
        >
          <MarkerF
            position={center}
            icon={'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'}
            onClick={() => setSelectedMarker('current location')}
          >
            {selectedMarker === 'current location' ? (
                <InfoWindowF
                  onCloseClick={() => {
                    setSelectedMarker(null);
                  }}
                >
                  <div>Current Location</div>
                </InfoWindowF>
              ) : null}
          {/* I could add some logic here for popping up the info d */}
          </MarkerF>
          {stores.map((store, index) => (
            <MarkerF
              position={store.geometry.location}
              key={index}
              onClick={() => handleMarkerClick(index)}
            >
              {selectedMarker === index ? (
                <InfoWindowF
                  onCloseClick={() => {
                    setSelectedMarker(null);
                  }}
                >
                  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '1rem'}}>
                    {store.name}
                    <Button size='xs' compact>
                      Route Here
                    </Button>
                  </div>
                </InfoWindowF>
              ) : null}
            </MarkerF>
          ))}
        </GoogleMap>
      </div>
    </div>

  );
}


export async function getStaticProps() {


  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${center.lat}%2C${center.lng}&radius=500&type=store&keyword=grocery&key=${google_maps_api_key}`

  const res = await fetch(url, {
    method: 'GET',
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