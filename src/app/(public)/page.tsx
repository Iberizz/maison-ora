import Navbar from '@/components/layout/Navbar/Navbar'
import Hero from '@/components/sections/Hero/Hero'
import Stats from '@/components/sections/Stats/Stats'
import Philosophy from '@/components/sections/Philosophy/Philosophy'
import Menu from "@/components/sections/Menu/Menu";
import Reservation from "@/components/sections/Reservation/Reservation";
import Press from "@/components/sections/Press/Press";
import Footer from "@/components/layout/Footer/Footer";

export default function Home() {
    return (
        <main>
            <Navbar />
            <Hero />
            <Philosophy />
            <Menu />
            <Stats />
            <Press />
            <Reservation />
            <Footer />
        </main>
    )
}