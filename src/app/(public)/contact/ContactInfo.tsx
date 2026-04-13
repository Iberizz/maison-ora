'use client'

import { motion } from 'framer-motion'

const INFO_LEFT = [
    {
        label: 'Adresse',
        lines: ['12 rue du Faubourg', 'Saint-Honoré, 75008 Paris'],
    },
    {
        label: 'Horaires',
        lines: ['Mardi — Vendredi  19h00 – 22h30', 'Samedi  12h00 – 14h30 · 19h00 – 23h00'],
        note: 'Fermé dimanche et lundi',
    },
]

const INFO_RIGHT = [
    { label: 'Téléphone', value: '+33 1 42 00 00 00', href: 'tel:+33142000000' },
    { label: 'Email', value: 'contact@maison-ora.fr', href: 'mailto:contact@maison-ora.fr' },
    { label: 'Instagram', value: '@maisonora', href: '#' },
]

export default function ContactInfo() {
    return (
        <section className="bg-cream py-24 lg:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-12">

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="eyebrow mb-16"
                >
                    Nous trouver
                </motion.p>

                <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1px_1fr]">

                    {/* Gauche — adresse & horaires */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col gap-12"
                    >
                        {INFO_LEFT.map((block) => (
                            <div key={block.label}>
                                <p className="eyebrow mb-4">{block.label}</p>
                                {block.lines.map((line, i) => (
                                    <p
                                        key={i}
                                        className="font-serif font-light text-dark leading-snug"
                                        style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)' }}
                                    >
                                        {line}
                                    </p>
                                ))}
                                {block.note && (
                                    <p className="mt-3 text-sm font-light italic text-stone">{block.note}</p>
                                )}
                            </div>
                        ))}
                    </motion.div>

                    {/* Séparateur vertical */}
                    <div className="hidden lg:block bg-border" />

                    {/* Droite — contacts */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col gap-10"
                    >
                        {INFO_RIGHT.map((item) => (
                            <div key={item.label}>
                                <p className="eyebrow mb-3">{item.label}</p>
                                <a
                                    href={item.href}
                                    className="font-serif font-light text-dark transition-colors duration-300 hover:text-gold"
                                    style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)' }}
                                >
                                    {item.value}
                                </a>
                            </div>
                        ))}
                    </motion.div>

                </div>
            </div>
        </section>
    )
}