"use client"

import { useState, useMemo } from "react"
import SiteCard from "./SiteCard"
import SearchField from "@/components/ui/SearchField"

interface Site {
  siteNaam: string
  siteAdres: string
  aantalMachines: number
  verantwoordelijke: string
}

interface SiteCardsListProps {
  sites: Site[]
}

export default function SiteCardsList({ sites }: SiteCardsListProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredSites = useMemo(() => {
    if (!searchTerm.trim()) return sites

    const lowerCaseSearch = searchTerm.toLowerCase()
    return sites.filter(
      (site) =>
        site.siteNaam.toLowerCase().includes(lowerCaseSearch) ||
        site.siteAdres.toLowerCase().includes(lowerCaseSearch) ||
        site.verantwoordelijke.toLowerCase().includes(lowerCaseSearch),
    )
  }, [sites, searchTerm])

  return (
    <div className="space-y-6">
      <div className="bg-lightNavy rounded-lg">
        <SearchField
          placeholder="Zoek op naam, adres of verantwoordelijke..."
          onSearch={setSearchTerm}
  
        />
      </div>

      {filteredSites.length === 0 ? (
        <div className="text-center py-8 text-white bg-navy rounded-lg">
          <p>Geen locaties gevonden die overeenkomen met je zoekopdracht.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSites.map((site) => (
            <SiteCard
              key={site.siteNaam}
              siteNaam={site.siteNaam}
              siteAdres={site.siteAdres}
              aantalMachines={site.aantalMachines}
              verantwoordelijke={site.verantwoordelijke}
            />
          ))}
        </div>
      )}
    </div>
  )
}

