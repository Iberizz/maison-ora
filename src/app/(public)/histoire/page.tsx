'use client'

import StoryHero from "@/components/sections/Story/StoryHero";
import StoryNumbers from "@/components/sections/Story/StoryNumbers";
import StoryChapters from "@/components/sections/Story/StoryChapters";
import StoryTimeline from "@/components/sections/Story/StoryTimeline";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";

export default function StoryPage() {
    return (
        <main className="min-h-screen bg-dark">
            <Navbar />
            <StoryHero />
            <StoryNumbers />
            <StoryChapters />
            <StoryTimeline />
            <Footer />
        </main>
    )
}