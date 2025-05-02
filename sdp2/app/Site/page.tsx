"use client";
import useSWR from "swr";
import { useState } from "react";
import SiteCardList from "./Components/SiteCardsList";
import { arrPlants } from "./Mock";
import SiteMap from "./Components/Map";
import {getAll} from "../../api/index";
import { Plant } from "@/app/types/Plant";

export default function Site() {
  const [search, setSearch] = useState("");

  const { data: sites = [], error, isLoading } = useSWR("sites", () => getAll("sites")); 
  const filteredSites = !isLoading ? sites.filter((site : Plant) =>
    site.NAME.toLowerCase().includes(search.toLowerCase())
  ) : [];

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
