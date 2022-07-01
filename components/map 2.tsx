import React, { useMemo, useState, useEffect } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

export default function Map() {
  const center = useMemo(() => ({ lat: 33.51875, lng: -112.08137 }), []);
  return (
    <GoogleMap zoom={10} center={center}>
      <MarkerF key="test" position={center} />
    </GoogleMap>
  );
}
