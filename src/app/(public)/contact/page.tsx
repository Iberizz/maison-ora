'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import ContactInfo from './ContactInfo'
import ContactForm from './ContactForm'
import ContactHero from "@/app/(public)/contact/ContctHero";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";

function ContactQuartier() {
    return (
        <section className="relative h-[50vh] overflow-hidden">
            <Image
                src="/images/contact-hero.png"
                alt="Rue du Faubourg Saint-Honoré, Paris"
                fill
                sizes="100vw"
                className="object-cover"
                style={{ filter: 'grayscale(100%)' }}
            />
            <div className="absolute inset-0 bg-cream opacity-20" />
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="absolute bottom-8 left-8"
            >
                <p className="eyebrow text-cream/80">Paris 8e · Rue du Faubourg Saint-Honoré</p>
            </motion.div>
        </section>
    )
}

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-dark">
            <Navbar />
            <ContactHero />
            <ContactInfo />
            <ContactForm />
            <ContactQuartier />
            <Footer />
        </main>
    )
}