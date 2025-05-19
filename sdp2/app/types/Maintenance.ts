export interface Maintenance {
  MAINTENANCEID: number;
  MACHINECODE: string;
  CURRENTSTATESTRING: string;
  ENDDATE: Date;
  STARTDATE: Date;
  machine_id: number;
  REMARKS: string;
  REASON: string;
  NAMETECHNICIAN: string;
  MAINTENANCEREPORT_RAPPORTID: number;
  maintenanceCost: number;
}