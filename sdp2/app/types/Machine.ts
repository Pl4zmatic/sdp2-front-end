export interface Machine {
  ID: number;
  CODE: string;
  CURRENTSTATESTRING: string;
  datum_toekomstige_onderhoud: Date;
  DELETED: number;
  laatste_onderhoud_beschrijving: string;
  laatste_onderhoud_datum: Date;
  LOCATIE: string;
  PRODUCTINFO: string;
  PRODUCTIESTATUS: string;
  technieker_naam: string;
  UPTIMEINHOURS: number;
  supervisor: string;
}
