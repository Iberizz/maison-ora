'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useMotionValue, useSpring, animate } from 'framer-motion'
import { useEffect } from 'react'
import { STORY_CHAPTERS, STORY_FACTS } from './Story.data'
import type { StoryChapter, StoryFact } from './Story.types'

// ─── Counter animé ────────────────────────────────────────────────

function AnimatedCounter({ value }: { value: string }) {
    const hasNumber = /\d+/.test(value)
    const numericPart = parseInt(value.replace(/\D/g, ''), 10)
    const suffix = value.replace(/[\d]/g, '')

    const motionVal = useMotionValue(0)
    const spring = useSpring(motionVal, { stiffness: 60, damping: 20 })
    const ref = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    animate(motionVal, numericPart, { duration: 1.8, ease: 'easeOut' })
                    observer.disconnect()
                }
            },
            { threshold: 0.5 }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [numericPart, motionVal])

    if (!hasNumber) {
        return (
            <span
                className="font-light"
                style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--color-dark)' }}
            >
        {value}
      </span>
        )
    }

    return (
        <span
            ref={ref}
            className="font-light"
            style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--color-dark)' }}
        >
      <motion.span>
        {spring.get() === 0 ? '0' : Math.round(spring.get())}
      </motion.span>
            {suffix}
    </span>
    )
}

function FactsCounter() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-5xl px-6 py-16 lg:px-12"
        >
            <p
                className="mb-10 text-[10px] tracking-[0.35em] uppercase"
                style={{ color: 'var(--color-gold)' }}
            >
                Signatures
            </p>
            <div
                className="grid grid-cols-2 gap-8 border-y py-10 sm:grid-cols-4"
                style={{ borderColor: 'var(--color-border)' }}
            >
                {STORY_FACTS.map((fact, i) => (
                    <motion.div
                        key={fact.label}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                    >
                        <p
                            className="mb-3 text-[10px] uppercase tracking-[0.2em]"
                            style={{ color: 'var(--color-stone)' }}
                        >
                            {fact.label}
                        </p>
                        <AnimatedCounter value={fact.value} />
                    </motion.div>
                ))}
            </div>
        </motion.section>
    )
}

// ─── Chapter Card avec parallax ───────────────────────────────────

function ChapterCard({ chapter, index }: { chapter: StoryChapter; index: number }) {
    const ref = useRef<HTMLDivElement>(null)
    const reversed = index % 2 !== 0

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    })
    const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

    return (
        <motion.article
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
            className={`grid items-stretch md:grid-cols-2 ${reversed ? 'md:[&>*:first-child]:order-2' : ''}`}
            style={{ borderTop: '1px solid var(--color-border)' }}
        >
            {/* Image avec parallax */}
            <div className="relative min-h-[320px] overflow-hidden md:min-h-[480px]">
                <motion.div className="absolute inset-0" style={{ y: imageY }}>
                    <Image
                        src={chapter.imageSrc}
                        alt={chapter.title}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                        style={{ scale: 1.1 }}
                    />
                </motion.div>
                {/* Overlay subtil */}
                <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(135deg, rgba(13,13,13,0.15) 0%, transparent 60%)' }}
                />
            </div>

            {/* Texte */}
            <div
                className="flex flex-col justify-center px-8 py-12 lg:px-14 lg:py-16"
                style={{ backgroundColor: 'var(--color-cream)' }}
            >
                {/* Numéro décoratif */}
                <span
                    className="mb-6 block text-[80px] font-light leading-none"
                    style={{
                        fontFamily: 'var(--font-serif)',
                        color: 'var(--color-border)',
                        lineHeight: 1,
                    }}
                    aria-hidden
                >
          {String(index + 1).padStart(2, '0')}
        </span>

                <p
                    className="mb-3 text-[10px] tracking-[0.3em] uppercase"
                    style={{ color: 'var(--color-gold)' }}
                >
                    {chapter.eyebrow}
                </p>

                <h2
                    className="mb-5 font-light leading-tight"
                    style={{
                        fontFamily: 'var(--font-serif)',
                        color: 'var(--color-dark)',
                        fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                    }}
                >
                    {chapter.title}
                </h2>

                <div
                    className="mb-6 h-px w-12"
                    style={{ backgroundColor: 'var(--color-gold)' }}
                />

                <p
                    className="text-sm font-light leading-relaxed"
                    style={{ color: 'var(--color-stone)' }}
                >
                    {chapter.description}
                </p>
            </div>
        </motion.article>
    )
}

// ─── Export ───────────────────────────────────────────────────────

export default function StoryChapters() {
    return (
        <section style={{ backgroundColor: 'var(--color-cream)' }}>
            <FactsCounter />
            <div className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                {STORY_CHAPTERS.map((chapter, i) => (
                    <ChapterCard key={chapter.id} chapter={chapter} index={i} />
                ))}
            </div>
        </section>
    )
}
