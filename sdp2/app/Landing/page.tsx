import { Welcome } from "./Components/welcomeMsg"

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <div className="hidden md:block w-64"></div>
      <main className="flex-1 p-8">
        <Welcome name="John Doe" /> {/* Naam moet nog dynamisch aangepast worden */}
      </main>
    </div>
  )
}

