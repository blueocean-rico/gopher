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
  Autocomplete,
} from "@react-google-maps/api";

import {
  Button,
  TextInput,
  Box,
  Text,
  Title,
  SimpleGrid,
  Stack,
} from "@mantine/core";
import { Location } from "tabler-icons-react";

import { PlacesFetcher } from "./api/map";
import { setGopher } from "@/server/lists";

import { List } from "@/components/index";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 47.6205,
  lng: -122.349358,
};

const libraries = ["places"];

const google_maps_api_key: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS ?? "";

// function HomePage({ stores }) {
const Map: NextPage = ({ stores }) => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [searchValue, setSearchValue] = useState<String>(null);
  // For hovering the current location icon
  const [isCurrentLocationHovering, setIsCurrentLocationHovering] =
    useState(false);
  const [map, setMap] = useState<google.maps.Map>(null);
  // This is the backup storage for the original stores fetched
  const [storesDefault, setStoresDefault] = useState(stores);
  // This is the updated stores list for the locations based on search. Also, we will modifiy this when a store is routed to bc we will need to remove everything that isn't this index
  const [newStores, setNewStores] = useState(stores);

  const [origin, setOrigin] = useState(null);

  // For the directions
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: google_maps_api_key,
    libraries: libraries,
  });

  // This is for clicking on the individual marker
  const handleMarkerClick = (index) => {
    setSelectedMarker(index);
  };

  // This is for the search bar
  const handleSearchInput = (e) => {
    setSearchValue(e.target.value);
  };

  // IGNORE FOR NOW
  const searchSubmitClick = async (e) => {
    // going to rerun the fetch for this new value. I think we'll
    // keep the default zoom and stuff for now
    console.log(searchValue);

    let params = { searchValue: searchValue, ...center };
    console.log("PARAMS");
    console.log(params);

    if (searchValue.length > 0) {
      fetch("/api/map?" + new URLSearchParams(params).toString())
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          // This is where we would reset the value of newStores
          setNewStores(data.stores);
        });

      // console.log(stores);
      // await setNewStores(stores);
    }
  };
  // IGNORE FOR NOW
  const autoCompleted = (val) => {
    console.log(val);
    console.log("hello");
  };

  const handleMyMarkerClick = () => {
    console.log("clicked");
    setSelectedMarker(null);
  };

  // THIS IS DIRECTIONS ROUTING
  const placeRouter = async () => {
    // We can use selectedMarker as the index value for this
    console.log("routing to " + storesDefault[selectedMarker].name);
    // THIS IS WHERE I WANT TO DO THE ROUTING
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: center,
      destination: newStores[selectedMarker].geometry.location,
      travelMode: google.maps.TravelMode.DRIVING,
    });

    console.log(results);
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  };

  const routeCancelled = async () => {
    console.log("route cancelled");
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
  };

  // Both functions for handling the current location hovering
  const handleMouseEnterCurrentLocation = () => {
    setIsCurrentLocationHovering(true);
  };
  const handleMouseLeaveCurrentLocation = () => {
    setIsCurrentLocationHovering(false);
  };

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

  // ------------------------------------------------
  //                  Rendering
  // ------------------------------------------------
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <SimpleGrid cols={2}>
      <Stack>
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
      <div
        style={{
          width: "auto",
          height: "455px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ width: "700px", height: "400px" }}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            options={{
              zoomControl: true,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
            onLoad={(map) => setMap(map)}
          >
            <Marker
              position={center}
              icon={"http://maps.google.com/mapfiles/ms/icons/blue-dot.png"}
              onClick={() => {
                setSelectedMarker("current location");
                // setOrigin(center);
              }}
            >
              {selectedMarker === "current location" && (
                <InfoWindowF onCloseClick={handleMyMarkerClick}>
                  {/* <InfoWindowF onCloseClick={() => console.log('hello')}> */}
                  <span>Current Location</span>
                </InfoWindowF>
              )}
            </Marker>
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
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        margin: "1rem",
                      }}
                    >
                      <Text size="sm">{store.name}</Text>
                      {/* This is the routing to the store */}

                      {/* I could have another rendering here */}
                      {directionsResponse !== null ? (
                        <>
                          <Text size="sm">Distance: {distance}</Text>
                          <Text size="sm">Duration: {duration}</Text>
                          <Button
                            size="xs"
                            compact
                            onClick={routeCancelled}
                            color="red"
                          >
                            Cancel Route
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button size="xs" compact onClick={placeRouter}>
                            Route Here
                          </Button>
                        </>
                      )}
                    </div>
                  </InfoWindowF>
                ) : null}
              </MarkerF>
            ))}

            {/* THIS IS HOW THE PAGE GETS POPULATED WITH THE DIRECTIONS */}
            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
          </GoogleMap>

          {/* This is all to do with the boxes, nothing inside of map */}
          <Box
            style={{
              display: "flex",
              justifyContent: "space-around",
              width: "24rem",
              transform: "translate(1rem, -24rem)",
              padding: "11px",
              backgroundColor: "white",
              borderRadius: "8px",
            }}
          >
            <Autocomplete>
              <TextInput
                placeholder="Search"
                style={{
                  width: "250px",
                }}
                onChange={handleSearchInput}
                // ref={destinationRef}
              />
            </Autocomplete>
            <Button onClick={searchSubmitClick}>Search</Button>
          </Box>

          <Box
            sx={(theme) => ({
              backgroundColor: "white",
              width: "2.5rem",
              height: "2.5rem",
              transform: "translate(40.62rem, -13rem)",
              borderRadius: "2.25px",
              cursor: "pointer",
              boxShadow: "0px 0px 1.5px 0px grey",
            })}
            onMouseEnter={handleMouseEnterCurrentLocation}
            onMouseLeave={handleMouseLeaveCurrentLocation}
            onClick={() => map.panTo(center)}
          >
            <Location
              size={28}
              strokeWidth={2.3}
              style={{
                transform: "translate(5px, 6px)",
                color: isCurrentLocationHovering ? "#0F0F0F" : "#545454",
              }}
            />
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