'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import Marquee from '@/components/ui/Marquee'

const MARQUEE_ITEMS = [
    'Carte du Printemps 2025', 'Entrées', 'Plats', 'Desserts',
    'Boissons', 'Maison Ōra', 'Paris 8e', 'Mardi — Samedi',
]

function SplitTitle({ text }: { text: string }) {
    return (
        <motion.span
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
            className="block"
            aria-label={text}
        >
            {text.split('').map((char, i) => (
                <motion.span
                    key={i}
                    variants={{
                        hidden: { opacity: 0, y: 40, rotateX: -20 },
                        visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
                    }}
                    className="inline-block"
                    style={{ transformOrigin: 'bottom center' }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </motion.span>
    )
}

export default function MenuHero() {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
    const imageY  = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
    const textY   = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])
    const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

    return (
        <>
            <div ref={ref} className="relative flex min-h-[88vh] flex-col justify-end overflow-hidden bg-dark">
                <motion.div className="absolute inset-0" style={{ y: imageY }}>
                    <Image src="/images/menu-hero.png" alt="" fill priority sizes="100vw" className="object-cover opacity-35" />
                </motion.div>
                <div className="absolute inset-x-0 bottom-0 h-4/5 pointer-events-none"
                     style={{ background: 'linear-gradient(to top, var(--color-dark) 15%, transparent 100%)' }} />

                <motion.div
                    className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-44 lg:px-12 text-center"
                    style={{ y: textY, opacity }}
                >
                    <motion.p
                        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="eyebrow mb-6"
                    >
                        Maison Ōra — Paris
                    </motion.p>

                    <h1 className="font-serif font-light leading-none overflow-visible text-cream"
                        style={{ fontSize: 'clamp(5rem, 18vw, 18rem)', letterSpacing: '-0.02em' }}>
                        <SplitTitle text="La Carte" />
                    </h1>

                    <motion.p
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.9 }}
                        className="mt-8 text-sm font-light leading-relaxed text-stone"
                    >
                        Une cuisine de précision, ancrée dans la saison.
                    </motion.p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-8 right-8 flex flex-col items-center gap-2"
                    style={{ opacity }}
                >
                    <div className="h-10 w-px bg-gradient-to-b from-transparent to-gold" />
                    <span className="eyebrow text-gold" style={{ writingMode: 'vertical-rl', fontSize: '9px' }}>Scroll</span>
                </motion.div>
            </div>
            <Marquee items={MARQUEE_ITEMS} speed={45} />
        </>
    )
}