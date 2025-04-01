interface MachineInfoProps {
    supervisor: string,
    nameTechnician: string,
    status: string,
    uptime: number,
    lastMaintenance: string,
    nextMaintenance: string
}

const MachineInfo = ({ supervisor, nameTechnician, status, uptime, lastMaintenance, nextMaintenance}: MachineInfoProps) => {
  return (
    <div>
      <p>Supervisor: {supervisor}</p>
      <p>Technician: {nameTechnician}</p>
      <p>Status: {status}</p>
      <p>Uptime: {uptime}s</p>
      <p>Last maintenance: {lastMaintenance}</p>
      <p>Next maintenance: {nextMaintenance}</p>
    </div>
  )
}

export default MachineInfo;
