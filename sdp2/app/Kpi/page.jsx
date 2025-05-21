"use client";

import ProtectedRoute from "../../components/ProtectedRoute.tsx";
import { getAll } from "../../api/index.js";
import SiteMap from "../Kpi/Components/Map";
import Breadcrumbs from "./Components/Breadcrumbs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useMemo, useState } from "react";
import SelectMachine from "./Components/charts/SelectMachine.jsx";
import FilterDropdown from "./Components/FilterDropdown";

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
  DefectsByTime,
} from "./Components/charts/PerMachineCharts.jsx";

// interface props {}

export default function Kpi({}) {
  const [site, setSite] = useState("None");
  const [machine, setMachine] = useState("None");
  const [chartData, setChartData] = useState(null);
  const [sites, setSites] = useState(null);
  const [machines, setMachines] = useState(null);
  const [value, setValue] = useState("all");
  const [sitePosition, setSitePosition] = useState("None");
  const [machinePosition, setMachinePosition] = useState("None");

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

    // const fetchMachines = async () => {
    //   console.log("test", sites)
    //   setMachines(await getAll(`sites/${site.ID}/machines`));
    // };
    // fetchMachines();
  }, []);

  useEffect(() => {
    setSite(sitePosition);
  }, [sitePosition]);

  useEffect(() => {
    setMachine(machinePosition);
  }, [machinePosition]);

  useEffect(() => {
    const fetchMachines = async () => {
      if (site != "None") {
        setMachines(await getAll(`sites/${site}/machines`));
      }
    };
    fetchMachines();
  }, [site]);

  return (
    <ProtectedRoute>
      <div className="px-10">
        <div className="my-4">
          <Breadcrumbs
            value={value}
            site={site}
            machine={machine}
            setSite={setSite}
            setMachine={setMachine}
          ></Breadcrumbs>
        </div>
        <Tabs
          defaultValue="all"
          className="bg-transparent  text-white rounded-lg size-full"
        >
          <TabsList className="grid w-full grid-cols-3 dark:bg-[var(--navy)] bg-red-300">
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
            className="flex-col justify-start items-center bg-transparent dark:bg-transparent"
          >
            <h1 className="text-4xl font-bold text-black dark:text-white mb-1 py-2">
              All Charts
            </h1>
            <div className="flex flex-wrap gap-4 justify-center bg-neutral-100 dark:bg-lightestNavy p-4 rounded-lg size-full ">
              <TotalProduced />
              <TotalDefectsOverTime />
              <TotalDefectsBySite />
              <AverageCostsBySite />
              <TotalMaintenanceCost />
            </div>
          </TabsContent>

          <TabsContent
            value="site"
            className="flex flex-wrap gap-4 justify-center rounded-lg size-full "
          >
            {site == "None" ? (
              sites == null ? (
                <div className="text-white">loading...</div>
              ) : (
                <SiteMap sites={sites} setSite={setSite}></SiteMap>
              )
            ) : (
              <div className="relative w-full ">
                <div className="flex justify-start items-center py-2 mb-2">
                  <h1 className="text-4xl font-bold text-black dark:text-white ">
                    {site}
                  </h1>
                  <div className="w-full flex justify-end items-center">
                    <FilterDropdown
                      position={sitePosition}
                      setPosition={setSitePosition}
                      objects={sites}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 justify-center bg-neutral-100 dark:bg-lightNavy p-4  rounded-lg size-full">
                  <TotalProducedByProduct siteName={site} />
                  <AverageThroughputByProduct siteName={site} />
                  <DefectsByProduct siteName={site} />
                  <ProductionCostByProduct siteName={site} />
                  <AverageAttainmentByProduct siteName={site} />
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent
            value="machine"
            className="flex flex-wrap gap-4 justify-start rounded-lg size-full pb-2"
          >
            {site == "None" ? (
              sites == null ? (
                <div className="text-white">loading...</div>
              ) : (
                <SiteMap sites={sites} setSite={setSite}></SiteMap>
              )
            ) : machine == "None" ? (
              <>
                <h1 className="text-4xl font-bold text-black dark:text-white ">
                  {site}
                </h1>
                <SelectMachine
                  chartData={chartData}
                  site={site}
                  setMachine={setMachine}
                />
              </>
            ) : (
              <div className="relative w-full">
                <div className="mb-4 flex">
                  <h1 className="text-4xl font-bold text-black dark:text-white ">
                    {site} : {machine}
                  </h1>
                  <div className="w-full flex justify-end items-center">
                    <FilterDropdown
                      position={machinePosition}
                      setPosition={setMachinePosition}
                      objects={machines}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 justify-center w-full bg-neutral-100 dark:bg-lightestNavy p-4 rounded-xl">
                  <TotalProducedByTime siteName={site} machineCode={machine} />
                  <ThroughputByTime siteName={site} machineCode={machine} />
                  <AttainmentByTime siteName={site} machineCode={machine} />
                  <DefectsByTime siteName={site} machineCode={machine} />
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  );
}
