"use client";

import BarChart from "@/components/charts/barchart";
import FilteredAreaChart from "@/components/charts/filteredAreaChart";
import PieChart from "@/components/charts/pieChart";
import RadarChart from "@/components/charts/radarChart";
import RadialChart from "@/components/charts/radialChart";
import LineChart from "@/components/charts/lineChart";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { chartData, chartDataPie } from "@/components/charts/exampledata";
import {
  getUniqueValuesByKey,
  mergeObjectsByKey,
  rotateValueToKeyMergeByKey,
} from "@/components/charts/globalChartFunctions.js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { useState } from "react";

// interface props {}

export default function Kpi({ }) {
  const [site, setSite] = useState("None");
  const [machine, setMachine] = useState("None");

  return (
    <Tabs defaultValue="account" className="bg-[var(--lightestNavy)] text-white shadow-xl rounded-lg size-full">
      <TabsList className="grid w-full grid-cols-3 bg-[var(--navy)]">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="site">Site</TabsTrigger>
        <TabsTrigger value="machine">Machine</TabsTrigger>
      </TabsList>

      <TabsContent value="all" className='flex flex-wrap gap-4 justify-center rounded-lg'>
        <BarChart
          title="Produced Items"
          chartData={mergeObjectsByKey(chartData, "product")}
          axisName={"product"}
          valueKeys={["produced"]}
          horizontal={false}
        />

        <PieChart
          title="Produced Items by Site"
          chartData={mergeObjectsByKey(chartData, "site")}
          nameKey={"site"}
          dataKey="produced"
        ></PieChart>

        <BarChart
          title="Total Maintenance Costs By Site"
          chartData={mergeObjectsByKey(chartData, "site")}
          axisName={"site"}
          valueKeys={["maintenanceCost"]}
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
            "site",
            "maintenances",
            "date"
          )}
          axisName={"date"}
          // valueKeys={['Brussel']}
          horizontal={false}
        />

        <BarChart
          title="Defect Rate in % by Site"
          chartData={mergeObjectsByKey(chartData, "site").map((obj) => {
            obj["defectRate"] = (obj.maintenances / obj.produced) * 100;
            return obj;
          })}
          axisName={"site"}
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
      </TabsContent>

      <TabsContent value="site" className='flex flex-wrap gap-4 justify-center rounded-lg'>
        {site == 'None' ? null : (
          <>
            <BarChart
              title="Produced Items"
              chartData={mergeObjectsByKey(
                chartData.filter((obj) => obj.site == site),
                "product"
              )}
              axisName={"product"}
              valueKeys={["produced"]}
              horizontal={false}
            />
            <PieChart
              title="Produced Items in %"
              chartData={mergeObjectsByKey(
                chartData.filter((obj) => obj.site == site),
                "product"
              ).map((obj, index, array) => {
                obj["producedPercentage"] = Math.round(
                  (obj.produced /
                    array.reduce((prev, cur) => prev + cur.produced, 0)) *
                  100
                );
                return obj;
              })}
              nameKey={"product"}
              dataKey="producedPercentage"
            ></PieChart>
            <RadialChart
              title="Total Production Cost"
              chartData={mergeObjectsByKey(
                chartData.filter((obj) => obj.site == site),
                "site"
              )}
              dataName="Euro"
              dataKey="productionCost"
            ></RadialChart>
          </>
        )
        }
      </TabsContent>

      <TabsContent value="machine" className='flex flex-wrap gap-4 justify-center rounded-lg'>
        {machine == "None" ? null : (
          <>
            <RadialChart
              title="Total Produced"
              chartData={[chartData[Number.parseInt(machine)]]}
              dataName={chartData[Number.parseInt(machine)].product}
              dataKey="produced"
            ></RadialChart>
            <RadialChart
              title="Throughput Rate"
              chartData={[chartData[Number.parseInt(machine)]].map((obj, index, array) => {
                obj['throughputRate'] = Math.round(obj.produced / obj.uptime)
                return obj
              })}
              dataName={`${chartData[Number.parseInt(machine)].product} / h`}
              dataKey="throughputRate"
            ></RadialChart>
            <RadialChart
              title="Attainment %"
              chartData={[chartData[Number.parseInt(machine)]].map((obj, index, array) => {
                obj['attainment'] = Math.round(obj.produced / obj.target) * 100
                return obj
              })}
              dataName={`Percent`}
              dataKey="attainment"
            ></RadialChart>
            <RadialChart
              title="Unit Maintenance Cost %"
              chartData={[chartData[Number.parseInt(machine)]].map((obj, index, array) => {
                obj['unitMaintenanceCost'] = Math.round(obj.maintenanceCost * obj.maintenances / obj.produced * 100)
                return obj
              })}
              dataName={`Percent`}
              dataKey="unitMaintenanceCost"
            ></RadialChart>
            <RadialChart
              title="Defect Rate %"
              chartData={[chartData[Number.parseInt(machine)]].map((obj, index, array) => {
                obj['defectRate'] = (obj.maintenances / obj.produced * 100).toFixed(3)
                return obj
              })}
              dataName={`Percent`}
              dataKey="defectRate"
            ></RadialChart>
            <RadialChart
              title="Total Production Cost"
              chartData={[chartData[Number.parseInt(machine)]].map((obj, index, array) => {
                obj['totalProductionCost'] = Math.round(obj.produced / obj.productionCost)
                return obj
              })}
              dataName={`Euro`}
              dataKey="totalProductionCost"
            ></RadialChart>
          </>
        )}
      </TabsContent>
    </Tabs>
  );
}
