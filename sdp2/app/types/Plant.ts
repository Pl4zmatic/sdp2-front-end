import { Machine } from "./Machine";

export interface Plant {
  id: number;
  name: string;
  status: string;
  health: number;
  maintenance: number;
  location: string;
  currentProduction: number;
  efficiencyRate: number;
  verantwoordelijke: string;
  machines: Machine[];
}
