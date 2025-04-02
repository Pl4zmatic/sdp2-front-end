import {APIProvider, Map} from '@vis.gl/react-google-maps';
import { useState } from "react";
import React from 'react';
import {createRoot} from 'react-dom/client';



export default function SiteMap() {
    const [viewport, setViewport] = useState({
        latitude: 51.032961,
        longitude:  3.703077,
        zoom: 10,
        width: "100%",
        height: "100%",
    })

    const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    console.log(API_KEY);
    return(
        <div>
            <APIProvider apiKey={"AIzaSyATaM2lc81FB86XfU2iM3ZuDNnofKei_mw"}>
    <Map
      style={{width: '50vw', height: '25vw'}}
      defaultCenter={{lat: viewport.latitude, lng: viewport.longitude}}
      defaultZoom={10}
      gestureHandling={'greedy'}
      disableDefaultUI={true}
    />
  </APIProvider>
        </div>
    )
}