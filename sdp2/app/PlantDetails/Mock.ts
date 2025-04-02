export const arrMachines = [
  {
    name: "Machine 1",
    machineCode: "a-01",
    status: "Running",
  },
  {
    name: "Machine 2",
    machineCode: "a-02",
    status: "Running",
  },
  {
    name: "Machine 3",
    machineCode: "a-03",
    status: "Not running",
  },
  {
    name: "Machine 4",
    machineCode: "a-04",
    status: "Running",
  },
  {
    name: "Machine 5",
    machineCode: "a-05",
    status: "Not running",
  },
];

export const arrPlants = [
  {
    name: "Plant 1",
    status: "Active",
    health: 80,
    maintenance: 23,
    location: "Voorbeeld 123, 1234 Gemeentegem",
    machines: arrMachines,
  },
  {
    name: "Plant 2",
    status: "Inactive",
    health: 64,
    maintenance: 10,
    location: "Voorbeeld 456, 9000 Gent",
    machines: arrMachines,
  },
  {
    name: "Plant 3",
    status: "Active",
    health: 100,
    maintenance: 50,
    location: "Voorbeeld 789, 9620 Zottegem",
    machines: arrMachines,
  },
];
