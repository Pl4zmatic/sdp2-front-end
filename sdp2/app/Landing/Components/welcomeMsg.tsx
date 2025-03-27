import { Compass, BarChart2, FileText, Users } from "lucide-react"

interface WelcomeProps {
  name: string
}

export function Welcome({ name }: WelcomeProps) {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)]">
      <h1 className="text-7xl font-bold text-white mb-4">Welcome</h1>
      <p className="text-6xl font-bold text-redAccent mb-8">{name}</p>

      <div className="flex gap-4 bg-blueTransparant px-4 py-2 rounded-lg">
        <Compass size={24} className="text-gray-400 hover:text-white transition-colors cursor-pointer" />
        <BarChart2 size={24} className="text-gray-400 hover:text-white transition-colors cursor-pointer" />
        <FileText size={24} className="text-gray-400 hover:text-white transition-colors cursor-pointer" />
        <Users size={24} className="text-gray-400 hover:text-white transition-colors cursor-pointer" />
      </div>
    </div>
  )
}

