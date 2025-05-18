import { Plant } from "@/app/types/Plant";
import { Machine } from "@/app/types/Machine";
import {
    DropdownMenu,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FilterDropdownProps {
    position: string;
    setPosition: (position: string) => void;
    objects: any[];
    setSite: any,
    site: string,
    setMachine: any,
    machine: string,
}

const FilterDropdown = ({
    position,
    setPosition,
    objects,
}: FilterDropdownProps) => (
    <div className="border-black border-2 rounded p-2 mw-50 flex justify-center dark:border-white">
        <DropdownMenu>
            <DropdownMenuTrigger>
                {position === "None" ? "choose" : position}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                    {objects.map((o: any) => (
                        <DropdownMenuRadioItem
                            key={o.ID}
                            value={o.NAME ? o.NAME : o.CODE}
                        >
                            {o.NAME ? o.NAME : o.CODE}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
);

export default FilterDropdown;