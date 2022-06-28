import type { NextPage } from "next";

// const Map: NextPage = () => {
//   return (
//     <div>{process.env.NEXT_PUBLIC_GOOGLE_MAPS}</div>
//   )
// }

// export default Map;


import React from 'react'
import { GoogleMap, LoadScript, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import styled from 'styled-components';

const containerStyle = {
  width: '750px',
  height: '500px'
  // width: '100%',
  // height: '100%'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const MapWrapper = styled.div`
  position: absolute;
  max-height: 500px;
  min-height: 500px;
  max-width: 750px;
  min-width: 750px;
`;


const google_maps_api_key: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS ?? '';

const Map: NextPage = () => {

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: google_maps_api_key,
  })

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  return (
    <MapWrapper>
        <GoogleMap
        mapContainerStyle={containerStyle}
        // mapContainerStyle={{width: '100%', height: '100%'}}
        center={center}
        zoom={10}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false
        }}
        >
        { /* Child components, such as markers, info windows, etc. */ }

        <MarkerF position={center} />
      </GoogleMap>
    </MapWrapper>

  )
}

export default React.memo(Map)