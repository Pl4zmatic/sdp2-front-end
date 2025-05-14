import { Plant } from "@/app/types/Plant";
import { Breadcrumb,
    BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
 } from "@/components/ui/breadcrumb";

interface BreadcrumbsProps {
  value: string;
  site: string;
  machine: string;
  setSite: (value: string) => void;
  setMachine: (value: string) => void;
}

 const Breadcrumbs = ({value, site, machine, setSite, setMachine} : BreadcrumbsProps) => {
    return (
    <Breadcrumb>
      <BreadcrumbList>
        <button onClick={() => {
            setSite("None");
            setMachine("None");
          }}>{value}
        </button>
        {site !== "None"  ? 
          <>
            <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <button onClick={() => {
                        console.log(machine);
                        setMachine("None");
                        }}>{site}
                    </button>
                </BreadcrumbItem>
            { machine !== "None"?
            <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>{machine}</BreadcrumbPage>
                </BreadcrumbItem>
            </> 
            : null}
          </> 
           : null}

      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default Breadcrumbs;