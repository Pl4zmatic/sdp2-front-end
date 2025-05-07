import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { useState, useEffect } from "react";
import React from "react";
import { createRoot } from "react-dom/client";
import { getCoordinates } from "../../../api/coordinates";
import Markers from "./Markers";

export default function SiteMap({ sites, setSite }: any) {
  const [viewport, setViewport] = useState({
    latitude: 50.832961,
    longitude: 4.503077,
    zoom: 10,
    width: "100%",
    height: "100%",
  });

  return (
      <APIProvider
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
      >
        <Map
          className="w-full h-[80vh] overflow-visible"
          defaultCenter={{ lat: viewport.latitude, lng: viewport.longitude }}
          defaultZoom={8}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        >
          <Markers sites={sites} setSite={setSite}></Markers>
        </Map>
      </APIProvider>
  );
}
