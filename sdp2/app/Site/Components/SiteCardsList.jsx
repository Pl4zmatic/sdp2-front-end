import SiteCard from "./SiteCard";

export default function SiteCardsList({ sites }) {
  return (
    <div className="flex flex-wrap gap-4">
      {sites.map((site) => (
        <SiteCard key={site.siteNaam} siteNaam={site.siteNaam} siteAdres={site.siteAdres} 
        aantalMachines={site.aantalMachines} verantwoordelijke={site.verantwoordelijke}></SiteCard>
      ))}
    </div>
  );
}