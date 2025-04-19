import { useState, useEffect } from "react";
import { getCoordinates } from "../../../api/coordinates";
import { Marker } from "@vis.gl/react-google-maps";
import { Plant } from "@/app/types/Plant";

interface MarkersProps {
  sites: Plant[];
}

export default function Markers({ sites }: MarkersProps) {
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }[]>([]);

  useEffect(() => {
    async function fetchCoordinates() {
      try {
            const fetchedCoordinates = await Promise.all(
              sites.map(async (site) => {
                console.log(site)
                const response = await getCoordinates(site.id);
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
        <Marker key={index} position={coord} />
      ))}
    </>
  );
}