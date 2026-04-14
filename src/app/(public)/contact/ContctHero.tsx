'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function ContactHero() {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
    const imageY  = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

    return (
        <div ref={ref} className="relative flex min-h-[85vh] flex-col justify-end overflow-hidden bg-dark">
            <motion.div className="absolute inset-0" style={{ y: imageY }}>
                <Image src="/images/contact-hero.png" alt="" fill priority sizes="100vw" className="object-cover opacity-30" />
            </motion.div>
            <div className="absolute inset-x-0 bottom-0 h-3/4 pointer-events-none"
                 style={{ background: 'linear-gradient(to top, var(--color-dark) 15%, transparent 100%)' }} />

            <motion.div
                className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-44 lg:px-12 text-center"
                style={{ opacity }}
            >
                <motion.p
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="eyebrow mb-8"
                >
                    Maison Ōra — Contact
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="font-serif font-light text-cream leading-none"
                    style={{ fontSize: 'clamp(5rem, 16vw, 16rem)', letterSpacing: '-0.02em' }}
                >
                    Parlons.
                </motion.h1>
            </motion.div>
        </div>
    )
}