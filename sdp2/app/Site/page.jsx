'use client'
import { useState } from "react";
import SiteCardList from "./Components/SiteCardsList";

const sites = [
    {
        siteNaam: "Antwerpen",
        siteAdres: "Antwerpen 23, 9140 Elversele",
        aantalMachines: 5,
        verantwoordelijke: "John Doe",
    },
    {
        siteNaam: "Brussel",
        siteAdres: "Brussel 45, 1000 Brussel",
        aantalMachines: 3,
        verantwoordelijke: "Jane Smith",
    }
];

export default function Site() {
    const [search, setSearch] = useState('');

    const filteredSites = sites.filter(site =>
        site.siteNaam.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex min-h-screen">
            <div className="hidden md:block w-64"></div>
            <main className="flex-1 p-8">
                <h1 className="text-3xl font-bold mb-4 text-white">Plants</h1>
                <SiteCardList sites={filteredSites}></SiteCardList>
            </main>
        </div>
    );
}