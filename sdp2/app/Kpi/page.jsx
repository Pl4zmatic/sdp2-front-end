"use client";

import ProtectedRoute from "../../components/ProtectedRoute.tsx";
import { getAll } from "../../api/index.js";
import SiteMap from "../Kpi/Components/Map";
import Breadcrumbs from "./Components/Breadcrumbs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useMemo, useState } from "react";
import SelectMachine from "./Components/charts/SelectMachine.jsx";

import {
  TotalProduced,
  TotalMaintenanceCost,
  TotalDefectsOverTime,
  TotalDefectsBySite,
  AverageCostsBySite,
} from "./Components/charts/AllSiteCharts.jsx";

import {
  TotalProducedByProduct,
  AverageThroughputByProduct,
  AverageAttainmentByProduct,
  DefectsByProduct,
  ProductionCostByProduct,
} from "./Components/charts/PerSiteCharts.jsx";

import {
  TotalProducedByTime,
  ThroughputByTime,
  AttainmentByTime,
  DefectsByTime
} from "./Components/charts/PerMachineCharts.jsx";

// interface props {}

export default function Kpi({}) {
  const [site, setSite] = useState("None");
  const [machine, setMachine] = useState("None");
  const [chartData, setChartData] = useState(null);
  const [sites, setSites] = useState(null);
  const [value, setValue] = useState("all");

  // const { data: sites = [], error, isLoading } = useSWR("sites", () => getAll("sites"));
  // const filteredSites = !isLoading ? sites.filter((site) =>
  //   site.NAME.toLowerCase().includes(search.toLowerCase())
  // ) : [];

  useEffect(() => {
    const fetch = async () => {
      setChartData(await getAll("kpi"));
    };
    fetch();
    const fetchSites = async () => {
      setSites(await getAll("sites"));
    };
    fetchSites();
  }, []);

  return (
    <ProtectedRoute>
      <Breadcrumbs
        value={value}
        site={site}
        machine={machine}
        setSite={setSite}
        setMachine={setMachine}
      ></Breadcrumbs>
      <Tabs
        defaultValue="all"
        className="bg-[--lightGray] dark:bg-[var(--lightestNavy)] text-white shadow-xl rounded-lg size-full"
      >
        <TabsList className="grid w-full grid-cols-3 dark:bg-[var(--navy)] bg-[var(--delawareRed)]">
          <TabsTrigger
            value="all"
            onClick={() => setValue("all")}
            className="data-[state=inactive]:text-white dark:data-[state=inactive]:text-gray"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="site"
            onClick={() => {
              setValue("site");
              setMachine("None");
            }}
            className="data-[state=inactive]:text-white dark:data-[state=inactive]:text-gray"
          >
            Site
          </TabsTrigger>
          <TabsTrigger
            value="machine"
            onClick={() => setValue("machine")}
            className="data-[state=inactive]:text-white dark:data-[state=inactive]:text-gray"
          >
            Machine
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="all"
          className="flex flex-wrap gap-4 justify-center rounded-lg size-full pb-2 px-4"
        >
          <TotalProduced />
          <TotalDefectsOverTime />
          <TotalDefectsBySite />
          <AverageCostsBySite />
          <TotalMaintenanceCost />
        </TabsContent>

        <TabsContent
          value="site"
          className="flex flex-wrap gap-4 justify-center rounded-lg size-full pb-2 px-4"
        >
          {site == "None" ? (
            sites == null ? (
              <div className="text-white">loading...</div>
            ) : (
              <SiteMap sites={sites} setSite={setSite}></SiteMap>
            )
          ) : (
            <>
              <span className="w-full text-center text-[2em] text-black dark:text-white"><b>{site}</b></span>
              <TotalProducedByProduct siteName={site} />
              <AverageThroughputByProduct siteName={site} />
              <DefectsByProduct siteName={site} />
              <ProductionCostByProduct siteName={site} />
              <AverageAttainmentByProduct siteName={site} />
            </>
          )}
        </TabsContent>

        <TabsContent
          value="machine"
          className="flex flex-wrap gap-4 justify-center rounded-lg size-full pb-2 px-4"
        >
          {site == "None" ? (
            sites == null ? (
              <div className="text-white">loading...</div>
            ) : (
              <SiteMap sites={sites} setSite={setSite}></SiteMap>
            )
          ) : machine == "None" ? (
            <>
              <span className="w-full text-center text-[2em] text-black dark:text-white"><b>{site}</b></span>
              <SelectMachine chartData={chartData} site={site} setMachine={setMachine}/>
            </>
          ) : (
            <>
              <span className="w-full text-center text-[2em] text-black dark:text-white"><b>{site}</b> : <b>{machine}</b></span>
              <TotalProducedByTime siteName={site} machineCode={machine}/>
              <ThroughputByTime siteName={site} machineCode={machine}/>
              <AttainmentByTime siteName={site} machineCode={machine}/>
              <DefectsByTime siteName={site} machineCode={machine}/>
            </>
          )}
        </TabsContent>
      </Tabs>
    </ProtectedRoute>
  );
}
