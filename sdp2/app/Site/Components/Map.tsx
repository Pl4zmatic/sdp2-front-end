import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { useState } from "react";
import React from "react";
import { createRoot } from "react-dom/client";

export default function SiteMap() {
  const [viewport, setViewport] = useState({
    latitude: 50.832961,
    longitude: 4.503077,
    zoom: 10,
    width: "100%",
    height: "100%",
  });

  return (
    <div>
      <APIProvider
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
      >
        <Map
          style={{ width: "100%", height: "25vw" }}
          defaultCenter={{ lat: viewport.latitude, lng: viewport.longitude }}
          defaultZoom={8}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        >
          <Marker position={{ lat: 51.2, lng: 4.43 }} />
          <Marker position={{ lat: 50.85, lng: 4.35 }} />
        </Map>
      </APIProvider>
    </div>
  );
}
