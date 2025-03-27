import { Navbar } from "../../components/navbar"
import { Welcome } from "./Components/welcomeMsg"

export default function Home() {
  return (
    <div className="flex min-h-screen ">
      <main className="flex-1 p-8">
        <Welcome name="John Doe" /> {/* Naam moet nog dynamisch worden */}
      </main>
    </div>
  )
}

