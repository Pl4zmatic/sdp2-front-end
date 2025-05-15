import { User } from "@/types/user";
import { Machine } from "./Machine";

export interface Plant {
  ID: number;
  NAME: string;
  STATUS: string;
  HEALTH: number;
  MAINTENANCE: number;
  ADDRESS: string;
  CURRENTPRODUCTION: number;
  EFFICIENCYRATE: number;
  VERANTWOORDELIJKE: User;
  MACHINES: Machine[];
}

export interface CreatePlantBody {
  NAME: string;
  STATUS: string;
  HEALTH: number;
  ADDRESS: string;
  CURRENTPRODUCTION: number;
  EFFICIENCYRATE: number;
  VERANTWOORDELIJKE: User;
}
