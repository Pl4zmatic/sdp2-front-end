"use client";
import { useState } from "react";
import SiteCardList from "./Components/SiteCardsList";
import { arrPlants } from "./Mock";
import SiteMap from "./Components/Map";

export default function Site() {
  const [search, setSearch] = useState("");

  const filteredSites = arrPlants.filter((site) =>
    site.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen justify-center items-center">
      <main className="p-8 w-[68%]">
        <div>
          <h1 className="text-3xl font-bold mb-4 text-darkGray dark:text-white text-center">
            Plants
          </h1>
          <SiteMap sites={filteredSites}></SiteMap>
          <SiteCardList sites={filteredSites}></SiteCardList>
        </div>
      </main>
    </div>
  );
}
