'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import Marquee from '@/components/ui/Marquee'

const MARQUEE_ITEMS = [
    'Carte du Printemps 2025',
    'Entrées',
    'Plats',
    'Desserts',
    'Boissons',
    'Maison Ōra',
    'Paris 8e',
    'Mardi — Samedi',
]

// Révélation lettre par lettre
function SplitTitle({ text }: { text: string }) {
    const letters = text.split('')
    return (
        <motion.span
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
            className="block"
            aria-label={text}
        >
            {letters.map((char, i) => (
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
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end start'],
    })
    const imageY    = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
    const textY     = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])
    const opacity   = useTransform(scrollYProgress, [0, 0.7], [1, 0])

    return (
        <>
            {/* ── Hero ── */}
            <div
                ref={ref}
                className="relative flex min-h-[88vh] flex-col justify-end overflow-hidden"
                style={{ backgroundColor: 'var(--color-dark)' }}
            >
                {/* Image parallax */}
                <motion.div className="absolute inset-0" style={{ y: imageY }}>
                    <Image
                        src="/images/menu-hero.png"
                        alt=""
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover"
                        style={{ opacity: 0.38 }}
                    />
                </motion.div>

                {/* Dégradé bas renforcé */}
                <div
                    className="absolute inset-x-0 bottom-0 h-4/5 pointer-events-none"
                    style={{ background: 'linear-gradient(to top, var(--color-dark) 15%, transparent 100%)' }}
                />

                {/* Contenu texte */}
                <motion.div
                    className="relative z-10 px-6 pb-12 lg:px-12"
                    style={{ y: textY, opacity }}
                >
                    {/* Eyebrow */}
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="mb-6 text-[10px] tracking-[0.4em] uppercase"
                        style={{ color: 'var(--color-gold)' }}
                    >
                        Maison Ōra — Paris
                    </motion.p>

                    {/* Titre géant qui déborde */}
                    <h1
                        className="font-light leading-[0.88] overflow-visible"
                        style={{
                            fontFamily: 'var(--font-serif)',
                            color: 'var(--color-cream)',
                            fontSize: 'clamp(5rem, 18vw, 18rem)',
                            letterSpacing: '-0.02em',
                        }}
                    >
                        <SplitTitle text="La Carte" />
                    </h1>

                    {/* Sous-titre */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.9 }}
                        className="mt-8 max-w-xs text-sm font-light leading-relaxed"
                        style={{ color: 'var(--color-stone)' }}
                    >
                        Une cuisine de précision,<br />ancrée dans la saison.
                    </motion.p>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    className="absolute bottom-8 right-8 flex flex-col items-center gap-2"
                    style={{ opacity }}
                >
                    <div
                        className="h-10 w-px"
                        style={{ background: `linear-gradient(to bottom, transparent, var(--color-gold))` }}
                    />
                    <span
                        className="text-[9px] tracking-[0.3em] uppercase"
                        style={{ color: 'var(--color-gold)', writingMode: 'vertical-rl' }}
                    >
            Scroll
          </span>
                </motion.div>
            </div>

            {/* ── Marquee ── */}
            <Marquee items={MARQUEE_ITEMS} speed={45} />
        </>
    )
}
