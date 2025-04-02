import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Factory, User } from "lucide-react"

interface SiteCardProps {
  siteNaam?: string
  siteAdres?: string
  aantalMachines?: number
  verantwoordelijke?: string
}

export default function SiteCard({
  siteNaam = "Antwerpen",
  siteAdres = "Antwerpen 23, 9140 Elversele",
  aantalMachines = 0,
  verantwoordelijke = "",
}: SiteCardProps) {
  return (
    <Card className="bg-navy border-0 text-white hover:shadow-lg transition-all duration-300 w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-delawareRed">{siteNaam}</CardTitle>
        <CardDescription className="text-gray-400 flex items-start">
          <MapPin size={16} className="mr-1 text-gray-400 shrink-0 mt-1" />
          <span className="break-words">{siteAdres}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="space-y-2 border-l-2 border-lightestNavy pl-3 mt-2">
          <div className="text-gray-400 flex flex-col md:flex-row md:items-center">
            <div className="flex items-center">
              <Factory size={16} className="mr-2 text-gray-400 shrink-0" />
              <span className="font-medium text-white whitespace-nowrap">Machines:</span>
            </div>
            <span className="md:ml-2 break-words">{aantalMachines}</span>
          </div>
          <div className="text-gray-400 flex flex-col md:flex-row md:items-start">
            <div className="flex items-center">
              <User size={16} className="mr-2 text-gray-400 shrink-0" />
              <span className="font-medium text-white whitespace-nowrap">Verantwoordelijke:</span>
            </div>
            <span className="md:ml-2 break-words">{verantwoordelijke}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button className="bg-lightestNavy hover:bg-blueTransparant text-white border-0 transition-colors w-full">
          Select Plant
        </Button>
      </CardFooter>
    </Card>
  )
}

