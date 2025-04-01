import SiteCard from "./Components/SiteCard"

export default function Site(){
    return(
        <div className="flex min-h-screen">
            <div className="hidden md:block w-64"></div>
            <main className="flex-1 p-8">
                <SiteCard></SiteCard>
            </main>
        </div>
    )
}