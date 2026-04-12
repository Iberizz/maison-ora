import Navbar from '@/components/layout/Navbar/Navbar'
import Footer from '@/components/layout/Footer/Footer'
import StoryPage from '@/components/sections/Story/StoryPage'
import StoryHero from "@/components/sections/Story/StoryHero";

export default function HistoirePage() {
    return (
        <>
            <Navbar />
            <StoryHero />
            <div>
                <h1 className="text-center align-center py-24">
                    Prochainement...
                </h1>
            </div>
            <Footer />
        </>
    )
}
