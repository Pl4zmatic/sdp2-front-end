"use client";

import BarChart from "@/components/charts/barchart";
import FilteredAreaChart from "@/components/charts/filteredAreaChart";
import PieChart from "@/components/charts/pieChart";
import RadarChart from "@/components/charts/radarChart";
import RadialChart from "@/components/charts/radialChart";
import LineChart from "@/components/charts/lineChart";
import { getAll } from "../../api/index.js";
import SiteMap from "../Kpi/Components/Map";
import useSWR from "swr";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getUniqueValuesByKey,
  mergeObjectsByKey,
  rotateValueToKeyMergeByKey,
  addFillFromConfig,
} from "@/components/charts/globalChartFunctions.js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useEffect, useMemo, useState } from "react";

// interface props {}

export default function Kpi({}) {
  const [site, setSite] = useState("None");
  const [machine, setMachine] = useState("None");
  const [chartData, setChartData] = useState(null);
  const [sites, setSites] = useState(null);

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
    <Tabs
      defaultValue="account"
      className="bg-[var(--lightestNavy)] text-white shadow-xl rounded-lg size-full"
    >
      <TabsList className="grid w-full grid-cols-3 bg-[var(--navy)]">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="site">Site</TabsTrigger>
        <TabsTrigger value="machine">Machine</TabsTrigger>
      </TabsList>

      <TabsContent
        value="all"
        className="flex flex-wrap pb-2 gap-4 justify-center rounded-lg"
      >
        {chartData == null ? (
          <div className="text-white">Loading...</div>
        ) : (
          <>
            <BarChart
              title="Produced Items"
              chartData={mergeObjectsByKey(chartData, "productName")}
              axisName={"productName"}
              valueKeys={["produced"]}
              horizontal={false}
            />

            <PieChart
              title="Produced Items by Site"
              chartData={mergeObjectsByKey(chartData, "siteName")}
              nameKey={"siteName"}
              dataKey="produced"
            ></PieChart>

            <BarChart
              title="Total Maintenance Costs By Site"
              chartData={mergeObjectsByKey(chartData, "siteName")}
              axisName={"siteName"}
              valueKeys={["averageCost"]}
              horizontal={true}
            />

            <LineChart
              title="Defects Per Site"
              chartData={rotateValueToKeyMergeByKey(
                chartData
                  .sort(
                    (obj1, obj2) =>
                      new Date(obj1.date).getTime() -
                      new Date(obj2.date).getTime()
                  )
                  .map((obj) => {
                    obj.date = `${new Date(obj.date).getFullYear()}`;
                    return obj;
                  }),
                "siteName",
                "maintenances",
                "date"
              )}
              axisName={"date"}
              // valueKeys={['Brussel']}
              horizontal={false}
            />

            <BarChart
              title="Defect Rate in % by Site"
              chartData={mergeObjectsByKey(chartData, "siteName").map((obj) => {
                obj["defectRate"] = (obj.maintenances / obj.produced) * 100;
                return obj;
              })}
              axisName={"siteName"}
              valueKeys={["defectRate"]}
              horizontal={false}
            />

            {/* <BarChart
            title="Average Production Cost Per Product by Site"
            chartData={}
            axisName={"site"}
            valueKeys={["averageProductionCost"]}
            horizontal={false}
          /> */}
          </>
        )}
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
            <BarChart
              title="Produced Items"
              chartData={mergeObjectsByKey(
                chartData.filter((obj) => obj.siteName == site),
                "productName"
              )}
              axisName={"productName"}
              valueKeys={["produced"]}
              horizontal={false}
            />
            <PieChart
              title="Produced Items in %"
              chartData={mergeObjectsByKey(
                chartData.filter((obj) => obj.siteName == site),
                "productName"
              ).map((obj, index, array) => {
                obj["producedPercentage"] = Math.round(
                  (obj.produced /
                    array.reduce((prev, cur) => prev + cur.produced, 0)) *
                    100
                );
                return obj;
              })}
              nameKey={"productName"}
              dataKey="producedPercentage"
            ></PieChart>
            <RadialChart
              title="Total Production Cost"
              chartData={addFillFromConfig(
                mergeObjectsByKey(
                  chartData.filter((obj) => obj.siteName == site),
                  "siteName"
                ),
                "siteName"
              )}
              dataName="Euro"
              dataKey="averageCost"
            ></RadialChart>
          </>
        )}
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
                <div className="hover:cursor-pointer w-[24%]" onClick={() => setMachine(obj.machineCode)} key={index}>
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
              chartData={mergeObjectsByKey(chartData.filter(obj => obj.siteName == site && obj.machineCode == machine), 'machineCode')}
              dataName={'Items'}
              dataKey="produced"
            ></RadialChart>
            <RadialChart
              title="Throughput Rate"
              chartData={mergeObjectsByKey(chartData.filter(obj => obj.siteName == site && obj.machineCode == machine)).map(
                (obj, index, array) => {
                  obj["throughputRate"] = Math.round(obj.produced / obj.uptime);
                  return obj;
                }
              )}
              dataName={`Items / h`}
              dataKey="throughputRate"
            ></RadialChart>
            <RadialChart
              title="Attainment (Produced / Target) %"
              chartData={mergeObjectsByKey(chartData.filter(obj => obj.siteName == site && obj.machineCode == machine)).map(
                (obj, index, array) => {
                  obj["attainment"] =
                    Math.round(obj.produced / obj.target) * 100;
                  return obj;
                }
              )}
              dataName={`Percent`}
              dataKey="attainment"
            ></RadialChart>
            <RadialChart
              title="Unit Maintenance Cost %"
              chartData={mergeObjectsByKey(chartData.filter(obj => obj.siteName == site && obj.machineCode == machine)).map(
                (obj, index, array) => {
                  obj["unitMaintenanceCost"] = Math.round(
                    ((obj.averageCost) / obj.produced) *
                      100
                  );
                  return obj;
                }
              )}
              dataName={`Percent`}
              dataKey="unitMaintenanceCost"
            ></RadialChart>
            <RadialChart
              title="Defect Rate %"
              chartData={mergeObjectsByKey(chartData.filter(obj => obj.siteName == site && obj.machineCode == machine)).map(
                (obj, index, array) => {
                  obj["defectRate"] = (
                    (obj.maintenances / obj.produced) *
                    100
                  ).toFixed(3);
                  return obj;
                }
              )}
              dataName={`Percent`}
              dataKey="defectRate"
            ></RadialChart>
            <RadialChart
              title="Total Production Cost"
              chartData={mergeObjectsByKey(chartData.filter(obj => obj.siteName == site && obj.machineCode == machine)).map(
                (obj, index, array) => {
                  obj["totalProductionCost"] = obj.productionCost;
                  return obj;
                }
              )}
              dataName={`Euro`}
              dataKey="totalProductionCost"
            ></RadialChart>
          </>
        )}
      </TabsContent>
    </Tabs>
  );
}
