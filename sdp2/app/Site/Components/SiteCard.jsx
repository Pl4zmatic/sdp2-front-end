import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

  import {Button} from "@/components/ui/button"

export default function SiteCard({siteNaam = "Antwerpen", siteAdres = "Antwerpen 23, 9140 Elversele", aantalMachines, verantwoordelijke}){
    return(<div className="flex">
<Card > 
    <CardHeader>
    <CardTitle> {siteNaam}</CardTitle>
    <CardDescription>{siteAdres}</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <Button>Select Plant</Button>
  </CardFooter>
</Card>
    </div>
        

    )
}
