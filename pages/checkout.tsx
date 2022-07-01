import type { NextPage } from "next";
import React, { useState, useRef, useEffect, MutableRefObject } from "react";
import {
  GoogleMap,
  MarkerF,
  Marker,
  useJsApiLoader,
  InfoWindowF,
  InfoWindow,
  DirectionsRenderer,
  Autocomplete
  } from "@react-google-maps/api";


import { Button, TextInput, Box, Text, Slider, SimpleGrid, Stack, Title } from '@mantine/core';
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
  const [searchValue, setSearchValue] = useState<String>(null);
  // For hovering the current location icon
  const [isCurrentLocationHovering, setIsCurrentLocationHovering] = useState(false);
  const [map, setMap] = useState<google.maps.Map>(null)
  // This is the backup storage for the original stores fetched
  const [storesDefault, setStoresDefault] = useState(stores);
  // This is the updated stores list for the locations based on search. Also, we will modifiy this when a store is routed to bc we will need to remove everything that isn't this index
  const [newStores, setNewStores] = useState(stores);

  const [origin, setOrigin] = useState(null);


  // For the directions
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');


  // For the geocode and places API for location
  const [currentLocation, setCurrentLocation] = useState(center);
  // this will be for the input box
  const [currentLocationInput, setCurrentLocationInput] = useState('');

  // For the slider values
  const [value, setValue] = useState(5);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: google_maps_api_key,
    libraries: libraries,
  })


  // This is for clicking on the individual marker
  const handleMarkerClick = (index) => {
    setSelectedMarker(index);
  }


  // This is for the search bar
  const handleSearchInput = (e) => {
    setSearchValue(e.target.value);
  }

  // For geocode API and places to get current input
  const handleCurrentLocationInput = (e) => {
    setCurrentLocationInput(e.target.value);
  }

  // This will need to reference an api to get the geocode using fetch and the url
  const handleCurrentLocationSubmit = async (e) => {
      const res = await fetch('/api/current_location?' + new URLSearchParams({address: currentLocationInput}).toString());
      const data = await res.json();
      await setCurrentLocation(data);
  }

  // IGNORE FOR NOW
  const searchSubmitClick = async () => {
    // going to rerun the fetch for this new value. I think we'll
    // keep the default zoom and stuff for now
    let params = {searchValue: searchValue, ...currentLocation}
    // console.log('PARAMS')
    // console.log(params)
    const new_places = await fetch('/api/map?' + new URLSearchParams(params).toString());
    const new_places_data = await new_places.json();
    console.log(new_places_data);
    await setNewStores(new_places_data.stores)
  }

  // IGNORE FOR NOW
  const autoCompleted = (val) => {
    console.log(val)
    console.log('hello')
  }

  const handleMyMarkerClick = () => {
    console.log('clicked')
    setSelectedMarker(null)
  }

  // THIS IS DIRECTIONS ROUTING
  const placeRouter = async () => {
    // We can use selectedMarker as the index value for this
    console.log('routing to ' + storesDefault[selectedMarker].name)
    // THIS IS WHERE I WANT TO DO THE ROUTING
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: currentLocation,
      destination: newStores[selectedMarker].geometry.location,
      travelMode: google.maps.TravelMode.DRIVING
    })

    console.log(results);
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }

  const routeCancelled = async () => {
    console.log('route cancelled')
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
  }

  const updateRadius = async () => {
    console.log('Radius value')
    console.log(value);
  }


  // Both functions for handling the current location hovering
  const handleMouseEnterCurrentLocation = () => {
    setIsCurrentLocationHovering(true);
  }
  const handleMouseLeaveCurrentLocation = () => {
    setIsCurrentLocationHovering(false);
  }

  const gopherCompleted = async () => {
    // await fetch(`/lists/${listId}`, {
    //   method: "DELETE",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ listId }),
    // });
  };

  useEffect(() => {
    searchSubmitClick();
  }, [currentLocation])


  // ------------------------------------------------
  //                  Rendering
  // ------------------------------------------------
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <SimpleGrid cols={2}>
      <Stack align='flex-start'>
        {/* replace hardcoded gopher with gopher.nickname */}
        <Title order={1}>Gopher: Ryan</Title>
        {/* need to pass down listId, items, users */}
        {/* <List listId={listId} items={items} users={users} /> */}
        {/* update with list information for totals */}
        <Text weight={500}>List Total: $xxx.xx</Text>
        <Text weight={500}>Your Total: $xx.xx</Text>
        <Button onClick={gopherCompleted} size="sm">
          Gopher Completed!
        </Button>
      </Stack>

      <div style={{width: 'auto', height: '455px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{width: '850px', height: '450px', position: 'relative'}}>

        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentLocation}
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
            position={currentLocation}
            icon={'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'}
            onClick={() => {
              setSelectedMarker('current location');
              // setOrigin(center);
            }}
          >
            {selectedMarker === 'current location' &&
                <InfoWindowF onCloseClick={handleMyMarkerClick}>
                {/* <InfoWindowF onCloseClick={() => console.log('hello')}> */}
                  <span>Current Location</span>
                </InfoWindowF>
              }
          </MarkerF>
          {/* {stores.map((store, index) => ( */}
          {newStores.map((store, index) => (
            <MarkerF
              position={store.geometry.location}
              key={index}
              onClick={() => handleMarkerClick(index)}
            >
              {selectedMarker === index ? (
                // This is for if the selected Marker is chosen, so we want
                // another conditional here

                // -------------------------------------------------------
                // This is the one that works I believe
                <InfoWindowF
                  onCloseClick={() => {
                    setSelectedMarker(null);
                  }}
                >
                  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '1rem'}}>
                    <Text size='sm'>{store.name}</Text>
                    {/* This is the routing to the store */}

                    {/* I could have another rendering here */}
                    {directionsResponse !== null ?
                      <>
                        <Text size='sm'>Distance: {distance}</Text>
                        <Text size='sm'>Duration: {duration}</Text>
                        <Button
                          size='xs'
                          compact
                          onClick={routeCancelled}
                          color='red'
                        >
                          Cancel Route
                        </Button>
                      </>
                    : <>
                        <Button
                            size='xs'
                            compact
                            onClick={placeRouter}
                          >
                            Route Here
                        </Button>
                      </>
                    }
                  </div>
                </InfoWindowF>
              ) : null}
            </MarkerF>
          ))}

          {/* THIS IS HOW THE PAGE GETS POPULATED WITH THE DIRECTIONS */}
          {directionsResponse &&
            <DirectionsRenderer
              directions={directionsResponse}
            />
          }

        </GoogleMap>


        {/* This is all to do with the boxes, nothing inside of map */}
        <Box>
          <Box
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              width: '24rem',
              height: '6rem',
              transform: 'translate(1rem, -27.5rem)',
              padding: '11px',
              backgroundColor: 'white',
              borderRadius: '8px'
            }}
          >
            <Autocomplete>
              <TextInput
                placeholder="Search"
                style={
                  {
                    width: '250px',
                  }
                }
                onChange={handleSearchInput}
                // ref={destinationRef}
              />
            </Autocomplete>
            <Button
              onClick={searchSubmitClick}
            >
              Search
            </Button>
          </Box>

          {/* This is where I will add a slider */}
          <Box>
            <Slider
              value={value * 10}
              onChange={(value) => setValue(value/10)}
              label={(value) => `${value / 10}`}
              style={{
                width: '14rem',
                // transform: 'translate(3.75rem, -30rem)'
                position: 'absolute',
                bottom: '23rem',
                left: '2rem'
              }}
              marks={[
                { value: 1, label: '1mi' },
                { value: 25, label: '2.5mi' },
                { value: 50, label: '5mi' },
                { value: 75, label: '7.5mi' },
                { value: 100, label: '10mi' },
              ]}
            />
            <Button
              size='xs'
              compact
              style ={{
                position: 'absolute',
                bottom: '22.5rem',
                left: '18rem'
              }}
              onClick={updateRadius}
            >
              Update Radius
            </Button>
          </Box>
        </Box>


        <Box
          sx={(theme) => ({
            backgroundColor: 'white',
            width: '2.5rem',
            height: '2.5rem',
            // transform: 'translate(49.95rem, -16.3rem)',
            borderRadius: '2.25px',
            cursor: 'pointer',
            boxShadow: '0px 0px 1.5px 0px grey',
            position: 'absolute',
            right: '0.65rem',
            bottom: '7rem'
          })}

          onMouseEnter={handleMouseEnterCurrentLocation}
          onMouseLeave={handleMouseLeaveCurrentLocation}
          onClick={() => map.panTo(currentLocation)}
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

        {/* This is the temp box for understanding how the geocode api and places will work*/}
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            width: '24rem',
            // transform: 'translate(28rem, -34.5rem)',
            padding: '11px',
            backgroundColor: 'white',
            borderRadius: '8px',
            position: 'absolute',
            top: '0.75rem',
            right: '1rem'
          }}
        >
          <TextInput
            placeholder="Address,ex '1234 Santa Claus Ln, Santa Barbara, CA, 98361"
            style={
              {
                width: '250px',
              }
            }
            onChange={handleCurrentLocationInput}
          />
          <Button
            onClick={handleCurrentLocationSubmit}
          >
          Submit
        </Button>
        </Box>
      </div>
    </div>
    </SimpleGrid>
  );
};

export async function getStaticProps() {
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${center.lat}%2C${center.lng}&radius=500&type=store&keyword=grocery&key=${google_maps_api_key}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  const stores = data.results;

  return {
    props: {
      stores,
    },
  };
}

export default Map;
