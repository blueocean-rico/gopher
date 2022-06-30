import type { NextPage } from "next";
import React, { useState } from "react";
import {
  GoogleMap,
  MarkerF,
  useJsApiLoader,
  InfoWindowF,
  DirectionsRenderer,
  Autocomplete
  } from "@react-google-maps/api";

  import { Button, TextInput, Box, THEME_ICON_SIZES } from '@mantine/core';
import { Location } from "tabler-icons-react";


const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 47.6205,
  lng: -122.349358,
};

const libraries = ['places'];

const google_maps_api_key: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS ?? '';

// function HomePage({ stores }) {
const Map: NextPage = ({ stores }) => {

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [searchValue, setSearchValue] = useState(null);
  // For hovering the current location icon
  const [isCurrentLocationHovering, setIsCurrentLocationHovering] = useState(false);
  // const [map, setMap] = useState<google.maps.Map>(null)
  // const [map, setMap] = useState(null)
  // This is the backup storage for the original stores fetched
  const [storesDefault, setStoresDefault] = useState(stores);
  // This is the updated stores list for the locations based on search. Also, we will modifiy this when a store is routed to bc we will need to remove everything that isn't this index
  const [newStores, setNewStores] = useState(stores);


  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: google_maps_api_key,
    libraries: libraries,
  })

  const [map, setMap] = useState<google.maps.Map>(null)
  // This is for clicking on the individual marker
  const handleMarkerClick = (index) => {
    setSelectedMarker(index);
  }


  // This is for the search bar
  const handleSearchInput = (e) => {
    setSearchValue(e.target.value);
  }

  // IGNORE FOR NOW
  const searchSubmitClick = async (e) => {
    // going to rerun the fetch for this new value. I think we'll
    // keep the default zoom and stuff for now
    console.log(searchValue)


    // const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${center.lat}%2C${center.lng}&radius=500&type=store&keyword=${searchValue}&key=${google_maps_api_key}`

    // const res = await fetch(url, {
    //   method: 'GET',
    //   mode: 'cors',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // });

    // const data = await res.json();

    // const stores = data.results;

    // console.log(stores);
    // await setNewStores(stores);
  }
  // IGNORE FOR NOW
  const autoCompleted = (val) => {
    console.log(val)
    console.log('hello')
  }


  // This will be the client side data fetching for getting the directions to this specific place
  const placeRouter = async () => {
    // We can use selectedMarker as the index value for this
    console.log('routing to ' + storesDefault[selectedMarker].name)
  }


  // Both functions for handling the current location hovering
  const handleMouseEnterCurrentLocation = () => {
    setIsCurrentLocationHovering(true);
  }
  const handleMouseLeaveCurrentLocation = () => {
    setIsCurrentLocationHovering(false);
  }



  // ------------------------------------------------
  //                  Rendering
  // ------------------------------------------------
  if (!isLoaded) {
    return <div>Loading...</div>
  }

  return (
    <div style={{width: 'auto', height: '455px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{width: '700px', height: '400px'}}>

        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          options={{
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false
          }}
          onLoad={(map) => setMap(map)}
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
          {/* {stores.map((store, index) => ( */}
          {newStores.map((store, index) => (
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

                    {/* This is the routing to the store */}

                    <Button
                      size='xs'
                      compact
                      onClick={placeRouter}
                    >
                      Route Here
                    </Button>

                  </div>
                </InfoWindowF>
              ) : null}
            </MarkerF>
          ))}
        </GoogleMap>

        <Box
          // sx={(theme) => ({
          //   backgroundColor: theme.colors.white[0],
          //   borderRadius: theme.radius.md
          // })}
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            width: '24rem',
            transform: 'translate(1rem, -24rem)',
            padding: '11px',
            backgroundColor: 'white',
            borderRadius: '8px'
          }}
        >
          <Autocomplete
            onPlaceChanged={autoCompleted}
          >
            <TextInput
              placeholder="Search"
              style={
                {
                  width: '250px',
                }
              }
              onChange={handleSearchInput}
            />
          </Autocomplete>
          <Button
            onClick={searchSubmitClick}
          >
            Search
          </Button>
        </Box>

        <Box
          sx={(theme) => ({
            backgroundColor: 'white',
            width: '2.5rem',
            height: '2.5rem',
            transform: 'translate(40.62rem, -13rem)',
            borderRadius: '2.25px',
            cursor: 'pointer',
            boxShadow: '0px 0px 1.5px 0px grey'
          })}

          onMouseEnter={handleMouseEnterCurrentLocation}
          onMouseLeave={handleMouseLeaveCurrentLocation}
          onClick={() => map.panTo(center)}
        >
        <Location
            size={28}
            strokeWidth={2.3}
            style={{
              transform: 'translate(5px, 6px)',
              color: isCurrentLocationHovering ? '#0F0F0F' : '#545454'
            }}
          />
        </Box>


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


export default Map;