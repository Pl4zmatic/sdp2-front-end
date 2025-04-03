import { Plant } from "@/app/types/Plant";
import SiteCard from "./SiteCard";

interface SiteProps {
  sites: Plant[];
}

export default function SiteCardsList({ sites }: SiteProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {sites.map((site) => (
        <SiteCard
          key={site.name}
          siteId={site.id}
          siteNaam={site.name}
          siteAdres={site.location}
          aantalMachines={site.machines.length}
          verantwoordelijke={site.verantwoordelijke}
        ></SiteCard>
      ))}
    </div>
  );
}
