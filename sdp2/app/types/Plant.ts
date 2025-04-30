import { Machine } from "./Machine";

export interface Plant {
  id: number;
  NAME: string;
  status: string;
  health: number;
  maintenance: number;
  location: string;
  currentProduction: number;
  efficiencyRate: number;
  verantwoordelijke: string;
  MACHINES: Machine[];
}
