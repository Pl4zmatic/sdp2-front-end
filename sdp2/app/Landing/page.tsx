import { Welcome } from "./Components/WelcomeMsg"

export default function Landing() {
  return (
    <div className="flex items-center justify-center h-full">
        <Welcome name="John Doe" /> {/* Naam moet nog dynamisch aangepast worden */}
    </div>
  )
}

