'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import Marquee from '@/components/ui/Marquee'
import { STORY_HERO, STORY_MILESTONES } from './Story.data'

// Marquee items — les jalons de l'histoire
const MARQUEE_ITEMS = STORY_MILESTONES.map((m) => `${m.year} · ${m.title}`)

function SplitTitle({ text }: { text: string }) {
    const words = text.split(' ')
    return (
        <motion.h1
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
            className="font-light leading-[0.9]"
            style={{
                fontFamily: 'var(--font-serif)',
                color: 'var(--color-cream)',
                fontSize: 'clamp(2.8rem, 7vw, 7rem)',
                letterSpacing: '-0.02em',
            }}
            aria-label={text}
        >
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    variants={{
                        hidden: { opacity: 0, y: 40 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
                    }}
                    className="inline-block mr-4"
                >
                    {word}
                </motion.span>
            ))}
        </motion.h1>
    )
}

export default function StoryHero() {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end start'],
    })
    const imageY  = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
    const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

    return (
        <>
            <div
                ref={ref}
                className="relative flex min-h-[88vh] flex-col justify-end overflow-hidden"
                style={{ backgroundColor: 'var(--color-dark)' }}
            >
                {/* Image parallax */}
                <motion.div className="absolute inset-0" style={{ y: imageY }}>
                    <Image
                        src="/images/histoire-hero.png"
                        alt=""
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover"
                        style={{ opacity: 0.4 }}
                    />
                </motion.div>

                {/* Dégradé bas */}
                <div
                    className="absolute inset-x-0 bottom-0 h-4/5 pointer-events-none"
                    style={{ background: 'linear-gradient(to top, var(--color-dark) 10%, transparent 100%)' }}
                />

                {/* Contenu */}
                <motion.div
                    className="relative z-10 mx-auto w-full max-w-5xl px-6 pb-16 pt-44 lg:px-12"
                    style={{ opacity }}
                >
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="mb-6 text-[10px] tracking-[0.4em] uppercase"
                        style={{ color: 'var(--color-gold)' }}
                    >
                        {STORY_HERO.eyebrow}
                    </motion.p>

                    <SplitTitle text={STORY_HERO.title} />

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.9, delay: 0.7 }}
                        className="mt-8 max-w-md text-sm font-light leading-relaxed"
                        style={{ color: 'var(--color-stone)' }}
                    >
                        {STORY_HERO.description}
                    </motion.p>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
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

            {/* Marquee */}
            <Marquee items={MARQUEE_ITEMS} speed={35} />
        </>
    )
}
