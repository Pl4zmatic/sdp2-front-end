"use client";

import BarChart from "@/components/charts/barchart";
import ProtectedRoute from "../../components/ProtectedRoute.tsx";
import PieChart from "@/components/charts/pieChart";

import RadialChart from "@/components/charts/radialChart";

import { getAll } from "../../api/index.js";
import SiteMap from "../Kpi/Components/Map";
import Breadcrumbs from "./Components/Breadcrumbs"

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  getUniqueValuesByKey,
  mergeObjectsByKey,
  rotateValueToKeyMergeByKey,
  addFillFromConfig,
} from "@/components/charts/globalChartFunctions.js";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useEffect, useMemo, useState } from "react";
import { TotalProduced, TotalMaintenanceCost, TotalDefectsOverTime, TotalDefectsBySite, AverageCostsBySite } from "./Components/charts/AllSiteCharts.jsx";
import { TotalProducedByProduct, AverageThroughputByProduct, AverageAttainmentByProduct, DefectsByProduct, ProductionCostByProduct } from "./Components/charts/PerSiteCharts.jsx";

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
    <Breadcrumbs value={value} site={site} machine={machine} setSite={setSite} setMachine={setMachine}></Breadcrumbs>
    <Tabs
      defaultValue="all"
      className="bg-[--lightGray] dark:bg-[var(--lightestNavy)] text-white shadow-xl rounded-lg size-full"
    >
      <TabsList className="grid w-full grid-cols-3 dark:bg-[var(--navy)] bg-[var(--delawareRed)]">
        <TabsTrigger value="all" onClick={() => setValue("all")} className='data-[state=inactive]:text-white dark:data-[state=inactive]:text-gray'>All</TabsTrigger>
        <TabsTrigger value="site" onClick={() => {setValue("site"); setMachine("None")}} className='data-[state=inactive]:text-white dark:data-[state=inactive]:text-gray'>Site</TabsTrigger>
        <TabsTrigger value="machine" onClick={() => setValue("machine")} className='data-[state=inactive]:text-white dark:data-[state=inactive]:text-gray'>Machine</TabsTrigger>
      </TabsList>

      <TabsContent
        value="all"
        className="flex flex-wrap pb-2 gap-4 justify-center rounded-lg"
      >
        <TotalProduced/>
        <TotalDefectsOverTime/>
        <TotalDefectsBySite/>
        <AverageCostsBySite/>
        <TotalMaintenanceCost/>
      </TabsContent>

        <TabsContent
          value="all"
          className="flex flex-wrap pb-2 gap-4 justify-center rounded-lg"
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
          <SiteMap sites={sites} setSite={setSite}></SiteMap>
        )}
          <>
            <TotalProducedByProduct siteName={site}/>
            <AverageThroughputByProduct siteName={site}/>
            <DefectsByProduct siteName={site}/>
            <ProductionCostByProduct siteName={site}/>
            <AverageAttainmentByProduct siteName={site}/>
          </>
       
      </TabsContent>

        <TabsContent
          value="machine"
          className="flex flex-wrap gap-4 justify-center rounded-lg pb-2"
        >
          {site == "None" ? (
            sites == null ? (
              <div className="text-white">loading...</div>
            ) : (
              <SiteMap sites={sites} setSite={setSite}></SiteMap>
            )
          ) : machine == "None" ? (
            <div className="size-full flex flex-wrap gap-2 justify-center">
              {chartData
                .filter((obj) => obj.siteName == site)
                .map((obj, index) => (
                  <div
                    className="hover:cursor-pointer w-[24%]"
                    onClick={() => setMachine(obj.machineCode)}
                    key={index}
                  >
                    <Card className="border-[var(--navy)] bg-[var(--navy)] rounded-t-lg size-full">
                      <CardHeader className="bg-[var(--lightestNavy)] rounded-t-lg p-2">
                        {obj.machineCode}
                      </CardHeader>
                      <CardContent className="py-2">
                        Product: {obj.productName}
                        <br />
                        Produced: {obj.produced} / {obj.target}
                        <br />
                        Uptime: {obj.uptime}h
                      </CardContent>
                    </Card>
                  </div>
                ))}
            </div>
          ) : (
            <>
              <RadialChart
                title="Total Produced"
                chartData={mergeObjectsByKey(
                  chartData.filter(
                    (obj) => obj.siteName == site && obj.machineCode == machine,
                  ),
                  "machineCode",
                )}
                dataName={"Items"}
                dataKey="produced"
              ></RadialChart>
              <RadialChart
                title="Throughput Rate"
                chartData={mergeObjectsByKey(
                  chartData.filter(
                    (obj) => obj.siteName == site && obj.machineCode == machine,
                  ),
                ).map((obj, index, array) => {
                  obj["throughputRate"] = Math.round(obj.produced / obj.uptime);
                  return obj;
                })}
                dataName={`Items / h`}
                dataKey="throughputRate"
              ></RadialChart>
              <RadialChart
                title="Attainment (Produced / Target) %"
                chartData={mergeObjectsByKey(
                  chartData.filter(
                    (obj) => obj.siteName == site && obj.machineCode == machine,
                  ),
                ).map((obj, index, array) => {
                  obj["attainment"] =
                    Math.round(obj.produced / obj.target) * 100;
                  return obj;
                })}
                dataName={`Percent`}
                dataKey="attainment"
              ></RadialChart>
              <RadialChart
                title="Unit Maintenance Cost %"
                chartData={mergeObjectsByKey(
                  chartData.filter(
                    (obj) => obj.siteName == site && obj.machineCode == machine,
                  ),
                ).map((obj, index, array) => {
                  obj["unitMaintenanceCost"] = Math.round(
                    (obj.averageCost / obj.produced) * 100,
                  );
                  return obj;
                })}
                dataName={`Percent`}
                dataKey="unitMaintenanceCost"
              ></RadialChart>
              <RadialChart
                title="Defect Rate %"
                chartData={mergeObjectsByKey(
                  chartData.filter(
                    (obj) => obj.siteName == site && obj.machineCode == machine,
                  ),
                ).map((obj, index, array) => {
                  obj["defectRate"] = (
                    (obj.maintenances / obj.produced) *
                    100
                  ).toFixed(3);
                  return obj;
                })}
                dataName={`Percent`}
                dataKey="defectRate"
              ></RadialChart>
              <RadialChart
                title="Total Production Cost"
                chartData={mergeObjectsByKey(
                  chartData.filter(
                    (obj) => obj.siteName == site && obj.machineCode == machine,
                  ),
                ).map((obj, index, array) => {
                  obj["totalProductionCost"] = obj.productionCost;
                  return obj;
                })}
                dataName={`Euro`}
                dataKey="totalProductionCost"
              ></RadialChart>
            </>
          )}
        </TabsContent>
      </Tabs>
    </ProtectedRoute>
  );
}
