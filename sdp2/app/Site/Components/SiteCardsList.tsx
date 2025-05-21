"use client";

import { useState, useMemo } from "react";
import SiteCard from "./SiteCard";
import SearchField from "@/components/ui/SearchField";
import { Plant } from "@/app/types/Plant";
import useSWR from "swr";
import { getAll } from "@/api";

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
        site.ADDRESS.toLowerCase().includes(lowerCaseSearch) ||
        site.verantwoordelijke?.FIRSTNAME?.toLowerCase().includes(
          lowerCaseSearch,
        ) ||
        site.verantwoordelijke?.LASTNAME?.toLowerCase().includes(
          lowerCaseSearch,
        ),
    );
  }, [sites, searchTerm]);

  return (
    <div className="space-y-6 w-full">
      <div className="flex justify-left rounded-lg w-full">
        <SearchField
          className="mt-8 w-96"
          placeholder="Search name, address or responsible person..."
          onSearch={setSearchTerm}
        />
      </div>

      {filteredSites.length === 0 ? (
        <div className="text-center py-8 text-black/90 bg-neutral-100 dark:bg-navy rounded-lg">
          <p>No plants found with current filters</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4 w-full">
          {filteredSites.map((site) => (
            <SiteCard
              key={site.ID}
              site={site}
              verantwoordelijke={
                site.verantwoordelijke?.FIRSTNAME +
                " " +
                site.verantwoordelijke?.LASTNAME
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
