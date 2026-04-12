'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { STORY_MILESTONES, STORY_CLOSING } from './Story.data'

// ─── Ligne verticale animée ───────────────────────────────────────

function TimelineLine() {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start 80%', 'end 20%'],
    })
    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

    return (
        <div ref={ref} className="absolute left-[7px] top-0 bottom-0 w-px overflow-hidden md:left-[119px]">
            <motion.div
                className="h-full w-full origin-top"
                style={{ scaleY, backgroundColor: 'var(--color-gold)', opacity: 0.4 }}
            />
        </div>
    )
}

// ─── Timeline ─────────────────────────────────────────────────────

function Timeline() {
    const ref = useRef<HTMLDivElement>(null)

    return (
        <section
            className="mx-auto max-w-5xl px-6 py-20 lg:px-12 lg:py-28"
            style={{ backgroundColor: 'var(--color-cream)' }}
        >
            <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-12 text-[10px] tracking-[0.35em] uppercase"
                style={{ color: 'var(--color-gold)' }}
            >
                Timeline
            </motion.p>

            <div ref={ref} className="relative">
                <TimelineLine />

                <div className="flex flex-col gap-0">
                    {STORY_MILESTONES.map((item, index) => (
                        <motion.div
                            key={`${item.year}-${item.title}`}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                            className="grid grid-cols-1 gap-4 py-8 md:grid-cols-[120px_1fr] md:gap-10"
                            style={{ borderBottom: '1px solid var(--color-border)' }}
                        >
                            {/* Année + point */}
                            <div className="flex items-start gap-4">
                                {/* Point doré */}
                                <div
                                    className="relative z-10 mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full ring-4"
                                    style={{
                                        backgroundColor: 'var(--color-gold)',
                                        ringColor: 'var(--color-cream)',
                                        boxShadow: '0 0 0 4px var(--color-cream)',
                                    }}
                                />
                                <span
                                    className="text-sm font-light tracking-[0.15em]"
                                    style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-serif)' }}
                                >
                  {item.year}
                </span>
                            </div>

                            {/* Contenu */}
                            <div className="pl-7 md:pl-0">
                                <h3
                                    className="mb-2 font-light leading-snug"
                                    style={{
                                        fontFamily: 'var(--font-serif)',
                                        color: 'var(--color-dark)',
                                        fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
                                    }}
                                >
                                    {item.title}
                                </h3>
                                <p
                                    className="text-sm font-light leading-relaxed"
                                    style={{ color: 'var(--color-stone)' }}
                                >
                                    {item.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// ─── CTA Final ────────────────────────────────────────────────────

function StoryCTA() {
    return (
        <section
            className="py-28"
            style={{ backgroundColor: 'var(--color-dark)' }}
        >
            <div className="mx-auto max-w-3xl px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    <p
                        className="mb-4 text-[10px] tracking-[0.4em] uppercase"
                        style={{ color: 'var(--color-gold)' }}
                    >
                        Finale
                    </p>

                    <h2
                        className="mb-5 font-light leading-tight"
                        style={{
                            fontFamily: 'var(--font-serif)',
                            color: 'var(--color-cream)',
                            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                        }}
                    >
                        {STORY_CLOSING.title}
                    </h2>

                    <p
                        className="mx-auto mb-12 max-w-xl text-sm font-light leading-relaxed"
                        style={{ color: 'var(--color-stone)' }}
                    >
                        {STORY_CLOSING.description}
                    </p>

                    {/* Ornament */}
                    <div className="mb-12 flex items-center justify-center gap-4">
                        <div className="h-px w-16" style={{ backgroundColor: '#2a2a2a' }} />
                        <div className="h-1.5 w-1.5 rotate-45" style={{ backgroundColor: 'var(--color-gold)' }} />
                        <div className="h-px w-16" style={{ backgroundColor: '#2a2a2a' }} />
                    </div>

                    <Link
                        href="/reservation"
                        className="inline-flex items-center gap-4 px-12 py-4 text-xs tracking-[0.3em] uppercase transition-all duration-300"
                        style={{ border: '1px solid var(--color-gold)', color: 'var(--color-gold)' }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--color-gold)'
                            e.currentTarget.style.color = 'var(--color-dark)'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent'
                            e.currentTarget.style.color = 'var(--color-gold)'
                        }}
                    >
                        <span className="h-px w-5" style={{ backgroundColor: 'currentColor' }} aria-hidden />
                        Vivre l'expérience
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}

// ─── Export ───────────────────────────────────────────────────────

export default function StoryTimeline() {
    return (
        <>
            <Timeline />
            <StoryCTA />
        </>
    )
}
