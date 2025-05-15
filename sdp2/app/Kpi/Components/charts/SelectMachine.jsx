import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"

export default function SelectMachine({chartData, site, setMachine}) {
  return (
    <div className="size-full flex flex-wrap gap-2 justify-center">
      {chartData
        .filter((obj) => obj.siteName == site)
        .map((obj, index) => (
          <div
            className="hover:cursor-pointer w-[24%]"
            onClick={() => setMachine(obj.machineCode)}
            key={index}
          >
            <Card className="border-[var(--darkGray)] dark:border-[var(--navy)] dark:bg-[var(--navy)] rounded-t-lg size-full">
              <CardHeader className="dark:bg-[var(--lightestNavy)] rounded-t-lg p-2">
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
  );
}
