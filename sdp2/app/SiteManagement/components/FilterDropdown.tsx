import {
  DropdownMenu,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/types/user";

interface FilterDropdownProps {
  position: string;
  setPosition: (position: string) => void;
  verantwoordelijken: User[];
}

const FilterDropdown = ({
  position,
  setPosition,
  verantwoordelijken,
}: FilterDropdownProps) => (
  <div className="border-black border-2 rounded p-2 mw-50 flex justify-center dark:border-white">
    <DropdownMenu>
      <DropdownMenuTrigger>
        {position === "" ? "Filter Verantwoordelijke" : position}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
        <DropdownMenuRadioItem
              key={"cancel"}
              value={""}
            >
              cancel filter
            </DropdownMenuRadioItem>
          {verantwoordelijken.map((verantwoordelijke: User) => (
            <DropdownMenuRadioItem
              key={verantwoordelijke.ID}
              value={`${verantwoordelijke.FIRSTNAME} ${verantwoordelijke.LASTNAME}`}
            >
              {verantwoordelijke.FIRSTNAME} {verantwoordelijke.LASTNAME}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);

export default FilterDropdown;