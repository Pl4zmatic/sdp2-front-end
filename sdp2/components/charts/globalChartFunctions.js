import { chartConfig } from "./config";

export const isDate = function (date) {
  return new Date(date) !== "Invalid Date" && !isNaN(new Date(date));
};

export function mergeObjectsByKey(objects, key) {
  console.log('in merge')
  console.log(objects)

  const uniqueKeys = new Set(objects.map((obj) => obj[key]));
  let mergedObjects = [];
  for (const uniqueKey of uniqueKeys) {
    let mergedObject = objects
      .filter((obj) => obj[key] == uniqueKey)
      .reduce(
        (prev, current) => {
          return {
            date: null,
            siteName: null,
            productName: null,
            machineCode: null,
            uptime: current.uptime + prev.uptime,
            produced: current.produced + prev.produced,
            target: current.target + prev.target,
            maintenances: current.maintenances + prev.maintenances,
            averageCost: current.averageCost * current.maintenances,
            productionCost: parseFloat(current.productionCost) * current.produced + parseFloat(prev.productionCost),
          };
        },
        {
          date: null,
          siteName: null,
          productName: null,
          machineCode: null,
          uptime: 0,
          produced: 0,
          target: 0,
          maintenances: 0,
          averageCost: 0,
          productionCost: 0,
        }
      );
    mergedObject[key] = uniqueKey;
    mergedObjects.push(mergedObject);
  }
  console.log('out merge')
  console.log(mergedObjects)
  return mergedObjects;
}

export function rotateValueToKeyMergeByKey(objects, nameKey, valueKey, key) {
  const uniqueKeys = new Set(objects.map((obj) => obj[key]));
  let rotatedObjects = [];
  for (const uniqueKey of uniqueKeys) {
    let rotatedObject = objects
      .filter((obj) => obj[key] == uniqueKey)
      .reduce((prev, cur) => {
        // console.log('========================')
        // console.log(prev)
        // console.log(prev[nameKey])
        // console.log(prev[valueKey])
        // console.log('=>')
        prev[cur[nameKey]] = cur[valueKey]
        // console.log(cur[prev[nameKey]])
        // console.log('========================')
        return prev
      }, { [key]: uniqueKey, [objects[0][nameKey]]: objects[0][valueKey] });
    rotatedObject[key] = uniqueKey;
    // console.log(rotatedObject);
    rotatedObjects.push(rotatedObject);
  }
  // console.log(rotatedObjects);
  return rotatedObjects;
}

export function getUniqueValuesByKey(objects, key) {
  return Array.from(new Set(objects.map(obj => obj[key])));
}

export function addFillFromConfig(chartData, key) {
  return chartData.map(obj => {
    obj['fill'] = chartConfig[obj[key]] == null || chartConfig[obj[key]] == undefined ? `hsl(var(--chart-${Math.floor(Math.random() * 6)}))` : chartConfig[obj[key]].color
    return obj
  })
}