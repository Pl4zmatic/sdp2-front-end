import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Factory, User } from "lucide-react";
import Link from "next/link";
import type { Plant } from "@/app/types/Plant";
import { getById } from "../../../api/index";
import useSWR from "swr";

interface SiteCardProps {
  site: Plant;
  aantalMachines?: number;
  verantwoordelijke?: string;
}

export default function SiteCard({
  site,
  aantalMachines = 0,
  verantwoordelijke = "",
}: SiteCardProps) {
  const {
    data: machines = [],
    isLoading: isLoadingMachines,
    error: errorMachines,
  } = useSWR(`sites/${site?.NAME}/machines`, getById);

  // Format the responsible person's name
  const formatName = (name: string) => {
    if (!name) return "";

    const nameParts = name.trim().split(" ");
    if (nameParts.length < 2) return name;

    const firstInitial = nameParts[0][0].toUpperCase();
    const lastName = nameParts.slice(1).join(" ");

    return `${firstInitial}. ${lastName}`;
  };

  const formattedName = formatName(verantwoordelijke);

  return (
    <Card className="bg-neutral-100 dark:bg-navy border-0 text-black dark:text-white hover:shadow-lg transition-all duration-300 w-64 flex-1 flex flex-col h-64">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-black dark:text-white">
          {site.NAME}
        </CardTitle>
        <CardDescription className="text-black/60 dark:text-white/80 flex items-start">
          <MapPin
            size={16}
            className="mr-1 text-black/60 dark:text-white/80 shrink-0 mt-1"
          />
          <span className="break-words">{site.ADDRESS}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-4 flex-grow">
        <div className="space-y-2 border-l-2 border-white/20 dark:border-lightestNavy pl-3 mt-2">
          <div className="text-white/80 flex flex-col md:flex-row md:items-center">
            <div className="flex items-center">
              <Factory
                size={16}
                className="mr-2 text-black/60 dark:text-white/80 shrink-0"
              />
              <span className="font-medium text-black dark:text-white whitespace-nowrap">
                Machines:
              </span>
            </div>
            <span className="md:ml-2 text-black/70 dark:text-white/70 break-words">
              {machines.length}
            </span>
          </div>
          <div className="text-black/70 dark:text-white/70 flex flex-col md:flex-row md:items-start">
            <div className="flex items-center">
              <User
                size={16}
                className="mr-2 text-black/70 dark:text-white/70 shrink-0"
              />
              <span className="font-medium text-black dark:text-white whitespace-nowrap">
                Responsible:
              </span>
            </div>
            <span className="md:ml-2 text-black/70 dark:text-white/70 break-words">
              {formattedName}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0 mt-auto">
        <Link href={`Site/${site.ID}`} className="w-full">
          <Button className="bg-delawareRed text-white hover:bg-delawareRed dark:bg-lightestNavy dark:hover:bg-blueTransparant dark:text-white border-0 transition-colors w-full">
            Select Plant
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
