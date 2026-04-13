'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { STORY_MILESTONES, STORY_CLOSING } from './Story.data'

// ─── Timeline horizontale ─────────────────────────────────────────

function Timeline() {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start 80%', 'end 40%'],
    })
    const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

    return (
        <section className="bg-cream py-24 lg:py-32 overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-12">

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="eyebrow mb-20"
                >
                    Timeline
                </motion.p>

                {/* Desktop — horizontal */}
                <div ref={ref} className="hidden lg:block relative">

                    {/* Ligne de base grise */}
                    <div className="absolute top-[18px] left-0 right-0 h-px bg-border" />

                    {/* Ligne dorée animée */}
                    <motion.div
                        className="absolute top-[18px] left-0 right-0 h-px bg-gold origin-left"
                        style={{ scaleX }}
                    />

                    {/* Items */}
                    <div className="grid gap-0" style={{ gridTemplateColumns: `repeat(${STORY_MILESTONES.length}, 1fr)` }}>
                        {STORY_MILESTONES.map((item, i) => {
                            const progress = i / (STORY_MILESTONES.length - 1)
                            const itemVisible = useTransform(scrollYProgress, [progress * 0.7, progress * 0.7 + 0.15], [0, 1])

                            return (
                                <motion.div
                                    key={item.year}
                                    style={{ opacity: itemVisible }}
                                    className="pt-10 pr-8"
                                >
                                    {/* Point */}
                                    <div className="absolute top-[12px] w-3 h-3 rounded-full bg-gold ring-4 ring-cream" />

                                    <p className="font-serif font-light text-gold text-sm tracking-label mb-3">
                                        {item.year}
                                    </p>
                                    <h3 className="font-serif font-light text-dark text-xl leading-snug mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs font-light leading-relaxed text-stone">
                                        {item.description}
                                    </p>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>

                {/* Mobile — vertical */}
                <div className="lg:hidden relative pl-6">
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />
                    <motion.div
                        className="absolute left-0 top-0 bottom-0 w-px bg-gold origin-top"
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    />

                    {STORY_MILESTONES.map((item, i) => (
                        <motion.div
                            key={item.year}
                            initial={{ opacity: 0, x: -16 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="relative pb-12 last:pb-0"
                        >
                            <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full bg-gold ring-4 ring-cream" />
                            <p className="font-serif text-gold text-sm tracking-label mb-2">{item.year}</p>
                            <h3 className="font-serif font-light text-dark text-xl mb-2">{item.title}</h3>
                            <p className="text-xs font-light text-stone leading-relaxed">{item.description}</p>
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
        <section className="bg-dark py-32">
            <div className="mx-auto max-w-4xl px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    <p className="eyebrow mb-6">Finale</p>

                    <h2
                        className="font-serif font-light text-cream leading-tight mb-6"
                        style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
                    >
                        {STORY_CLOSING.title}
                    </h2>

                    <p className="mx-auto mb-14 max-w-xl text-sm font-light leading-relaxed text-stone">
                        {STORY_CLOSING.description}
                    </p>

                    {/* Ornament */}
                    <div className="flex items-center justify-center gap-4 mb-14">
                        <span className="h-px w-16 block" style={{ backgroundColor: '#2a2a2a' }} />
                        <span className="h-1.5 w-1.5 rotate-45 block bg-gold" />
                        <span className="h-px w-16 block" style={{ backgroundColor: '#2a2a2a' }} />
                    </div>

                    <Link href="/reservation" className="btn-ora-gold">
                        <span className="h-px w-5 bg-current block" aria-hidden />
                        Vivre l'expérience
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}

export default function StoryTimeline() {
    return (
        <>
            <Timeline />
            <StoryCTA />
        </>
    )
}