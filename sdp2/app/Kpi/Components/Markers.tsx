import { useState, useEffect } from "react";
import { getCoordinates } from "../../../api/coordinates";
import { InfoWindow, Marker } from "@vis.gl/react-google-maps";
import { Plant } from "@/app/types/Plant";
import { Button } from "@/components/ui/button";

interface MarkersProps {
  sites: Plant[];
  setSite: any;
}

export default function Markers({ sites, setSite }: MarkersProps) {
  const [selectedMarker, setSelectedMarker] = useState<{
    lat: number;
    lng: number;
    site: Plant;
  } | null>(null);
  const [coordinates, setCoordinates] = useState<
    { lat: number; lng: number }[]
  >([]);

  useEffect(() => {
    async function fetchCoordinates() {
      try {
        const fetchedCoordinates = await Promise.all(
          sites.map(async (site) => {
            const response = await getCoordinates(site.ID);
            if (response) {
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
        <Marker
          key={index}
          position={coord}
          onClick={() => {
            setSelectedMarker({
              lat: coord.lat,
              lng: coord.lng,
              site: sites[index],
            });
          }}
        />
      ))}
      {selectedMarker && (
        <InfoWindow
          headerContent={
            <p className="text-black">{selectedMarker.site.NAME}</p>
          }
          className="min-h-1"
          position={selectedMarker}
          onCloseClick={() => setSelectedMarker(null)}
        >
          <p className="text-black">{selectedMarker.site.ADDRESS}</p>
          <Button
            className="mt-2 bg-[var(--navy)] text-white hover:text-[var(--navy)]"
            onClick={() => {
              setSite(selectedMarker.site.NAME);
            }}
          >
            Select
          </Button>
        </InfoWindow>
      )}
    </>
  );
}
