"use client";

import { useState, useMemo } from "react";
import SiteCard from "./SiteCard";
import SearchField from "@/components/ui/SearchField";
import { Plant } from "@/app/types/Plant";

interface SiteCardsListProps {
  sites: Plant[];
}

export default function SiteCardsList({ sites }: SiteCardsListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSites = useMemo(() => {
    if (!searchTerm.trim()) return sites;

    const lowerCaseSearch = searchTerm.toLowerCase();
    return sites.filter(
      (site) =>
        site.NAME.toLowerCase().includes(lowerCaseSearch) ||
        site.location.toLowerCase().includes(lowerCaseSearch) ||
        site.verantwoordelijke.toLowerCase().includes(lowerCaseSearch)
    );
  }, [sites, searchTerm]);

  return (
    <div className="space-y-6 w-full">
      <div className="flex justify-center rounded-lg w-full">
        <SearchField
          className="mt-8 w-[50%]"
          placeholder="Zoek op naam, adres of verantwoordelijke..."
          onSearch={setSearchTerm}
        />
      </div>

      {filteredSites.length === 0 ? (
        <div className="text-center py-8 text-white bg-delawareRed dark:bg-navy rounded-lg">
          <p>Geen locaties gevonden die overeenkomen met je zoekopdracht.</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4 w-full">
          {filteredSites.map((site) => (
            <SiteCard
              key={site.NAME}
              siteNaam={site.NAME}
              siteAdres={site.location}
              // aantalMachines={site.MACHINES.length}
              verantwoordelijke={site.verantwoordelijke}
            />
          ))}
        </div>
      )}
    </div>
  );
}
