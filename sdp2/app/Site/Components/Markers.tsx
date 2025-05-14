import { useState, useEffect } from "react";
import { getCoordinates } from "../../../api/coordinates";
import { InfoWindow, Marker } from "@vis.gl/react-google-maps";
import { Plant } from "@/app/types/Plant";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface MarkersProps {
  sites: Plant[];
}



export default function Markers({ sites }: MarkersProps) {
  const [selectedMarker, setSelectedMarker] = useState<{ lat: number; lng: number, site:Plant } | null>(null);
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }[]>([]);

  useEffect(() => {
    async function fetchCoordinates() {
      try {
            const fetchedCoordinates = await Promise.all(
              sites.map(async (site) => {
                console.log(site)
                const response = await getCoordinates(site.ID);
                if(response){
                    return response.data; 
                }
              })
            );
            setCoordinates(fetchedCoordinates);
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    }

    fetchCoordinates();
  }, [sites]);

  return (
    <>
      {coordinates.map((coord, index) => (
        <Marker key={index} position={coord} onClick={() => {
          setSelectedMarker({ lat: coord.lat, lng: coord.lng, site: sites[index] });
        }} />
      ))}
      {selectedMarker && <InfoWindow  headerContent={<p className="text-black">{selectedMarker.site.NAME}</p>} className="min-h-1" 
      position={selectedMarker} onCloseClick={() => setSelectedMarker(null)}>
        <p className="text-black mb-2">{selectedMarker.site.ADDRESS}</p>
        <Link href={`${selectedMarker.site.ID}`}>
          <Button className="bg-white hover:bg-white/90 dark:bg-lightestNavy dark:hover:bg-blueTransparant text-delawareRed dark:text-white border-0 transition-colors w-full">
            Select Plant
          </Button>
        </Link>
         </InfoWindow>}      
    </>
  );
}