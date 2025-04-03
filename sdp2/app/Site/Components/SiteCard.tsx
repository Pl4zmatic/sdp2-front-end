import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

interface PlantCardProps {
  siteId: number;
  siteNaam: string;
  siteAdres: string;
  aantalMachines: number;
  verantwoordelijke: string;
}

export default function SiteCard({
  siteId,
  siteNaam,
  siteAdres,
  aantalMachines,
  verantwoordelijke,
}: PlantCardProps) {
  return (
    <div className="flex">
      <Card>
        <CardHeader>
          <CardTitle>{siteNaam}</CardTitle>
          <CardDescription>{siteAdres}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>aantal machines: {aantalMachines}</p>
          <p>verantwoordelijke: {verantwoordelijke}</p>
        </CardContent>
        <CardFooter>
          <a key={siteNaam} href={`${siteNaam}`}>
            <Button>Select Plant{siteNaam}</Button>
          </a>
        </CardFooter>
      </Card>
    </div>
  );
}
