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
        site.name.toLowerCase().includes(lowerCaseSearch) ||
        site.location.toLowerCase().includes(lowerCaseSearch) ||
        site.verantwoordelijke.toLowerCase().includes(lowerCaseSearch)
    );
  }, [sites, searchTerm]);

  return (
    <div className="space-y-6">
      <div className="rounded-lg">
        <SearchField
          className="mt-8"
          placeholder="Zoek op naam, adres of verantwoordelijke..."
          onSearch={setSearchTerm}
        />
      </div>

      {filteredSites.length === 0 ? (
        <div className="text-center py-8 text-white bg-delawareRed dark:bg-navy rounded-lg">
          <p>Geen locaties gevonden die overeenkomen met je zoekopdracht.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSites.map((site) => (
            <SiteCard
              key={site.name}
              siteNaam={site.name}
              siteAdres={site.location}
              aantalMachines={site.machines.length}
              verantwoordelijke={site.verantwoordelijke}
            />
          ))}
        </div>
      )}
    </div>
  );
}
