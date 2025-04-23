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

interface SiteCardProps {
  siteNaam?: string;
  siteAdres?: string;
  aantalMachines?: number;
  verantwoordelijke?: string;
}

export default function SiteCard({
  siteNaam = "Antwerpen",
  siteAdres = "Antwerpen 23, 9140 Elversele",
  aantalMachines = 0,
  verantwoordelijke = "",
}: SiteCardProps) {
  return (
    <Card className="bg-delawareRed dark:bg-navy border-0 text-white dark:text-white hover:shadow-lg transition-all duration-300 w-full flex-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-white">
          {siteNaam}
        </CardTitle>
        <CardDescription className="text-white/80 flex items-start">
          <MapPin size={16} className="mr-1 text-white/80 shrink-0 mt-1" />
          <span className="break-words">{siteAdres}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="space-y-2 border-l-2 border-white/20 dark:border-lightestNavy pl-3 mt-2">
          <div className="text-white/80 flex flex-col md:flex-row md:items-center">
            <div className="flex items-center">
              <Factory size={16} className="mr-2 text-white/80 shrink-0" />
              <span className="font-medium text-white whitespace-nowrap">
                Machines:
              </span>
            </div>
            <span className="md:ml-2 break-words">{aantalMachines}</span>
          </div>
          <div className="text-white/80 flex flex-col md:flex-row md:items-start">
            <div className="flex items-center">
              <User size={16} className="mr-2 text-white/80 shrink-0" />
              <span className="font-medium text-white whitespace-nowrap">
                Responsible:
              </span>
            </div>
            <span className="md:ml-2 break-words">{verantwoordelijke}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Link href={`${siteNaam}`}>
          <Button className="bg-white/10 hover:bg-white/20 dark:bg-lightestNavy dark:hover:bg-blueTransparant text-white border-0 transition-colors w-full">
            Select Plant
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
