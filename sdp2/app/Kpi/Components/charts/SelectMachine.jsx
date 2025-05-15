import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function SelectMachine({ chartData, site, setMachine }) {
  function mergedUniqueMachines() {
    const filteredData = chartData.filter((obj) => obj.siteName == site);
    const uniqueKeys = new Set(filteredData.map((obj) => obj["machineCode"]));

    let mergedObjects = [];

    for (const uniqueMachineCode of uniqueKeys) {
      let mergedObject = filteredData
        .filter((obj) => (obj.machineCode = uniqueMachineCode))
        .reduce(
          (prev, curr) => {
            prev.products.push(curr.productName);
            prev.uptime += curr.uptime;
            prev.produced += curr.produced;
            return prev;
          },
          {
            machineCode: uniqueMachineCode,
            products: [],
            uptime: 0,
            produced: 0,
          }
        );
      mergedObjects.push(mergedObject);
    }

    return mergedObjects;
  }

  return (
    <div className="size-full flex flex-wrap gap-2 justify-center">
      {mergedUniqueMachines().map((obj, index) => (
        <div
          className="hover:cursor-pointer w-[24%]"
          onClick={() => setMachine(obj.machineCode)}
          key={index}
        >
          <Card className="border-[var(--darkGray)] dark:border-[var(--navy)] dark:bg-[var(--navy)] rounded-t-lg size-full">
            <CardHeader className="dark:bg-[var(--lightestNavy)] rounded-t-lg p-2 font-semibold border-b-2">
              <strong>{obj.machineCode}</strong>
            </CardHeader>
            <CardContent className="py-2">
              <div className="overflow-hidden text-ellipsis w-full text-nowrap"> <small className="text-gray">Products:</small> {obj.products.join(', ')}</div>
              <small className="text-gray">Total Produced:</small> {obj.produced}
              <br />
              <small className="text-gray">Total Uptime:</small> {obj.uptime}h
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
