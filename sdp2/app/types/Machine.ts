export interface Machine {
  name: string;
  machineCode: string;
  status: string;
  supervisor: string;
  technician: string;
  uptime: number;
  lastMaintenance: string;
  nextMaintenance: string;
}
