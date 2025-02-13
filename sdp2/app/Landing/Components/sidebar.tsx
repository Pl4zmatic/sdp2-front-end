import Link from "next/link"
import { Compass, BarChart2, FileText, Users, Bell } from "lucide-react"
import Image from "next/image"

export function Sidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col justify-between bg-navy p-6">
      <div className="space-y-8">
        <div className="flex items-center gap-2">
          <Image src="/logo.svg" width={2560} height={856} layout="responsive" alt="Logo" />
        </div>

        <nav className="space-y-6">
          <Link href="#" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"> {/* href moet nog aangepast worden */}
            <Compass size={20} />
            <span>Plant Overview</span>
          </Link>

          <Link href="#" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"> {/* href moet nog aangepast worden */}
            <BarChart2 size={20} />
            <span>Plant Details</span>
          </Link>

          <Link href="#" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"> {/* href moet nog aangepast worden */}
            <FileText size={20} />
            <span>Quality Registration</span>
          </Link>

          <Link href="#" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"> {/* href moet nog aangepast worden */}
            <Users size={20} />
            <span>Employees</span>
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors cursor-pointer">
        <Bell size={20} />
        <span>Notifications</span>
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs text-redAccent">3</span> {/* Dit is een vb, later checken of er nieuwe notifs zijn --> dan tonen */}
      </div>
    </aside>
  )
}

