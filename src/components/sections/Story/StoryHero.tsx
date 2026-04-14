'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import Marquee from '@/components/ui/Marquee'
import { STORY_HERO, STORY_MILESTONES } from './Story.data'

const MARQUEE_ITEMS = STORY_MILESTONES.map((m) => `${m.year} · ${m.title}`)

function SplitTitle({ text }: { text: string }) {
    return (
        <motion.h1
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
            className="font-serif font-light text-cream leading-tight"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)', letterSpacing: '-0.02em' }}
            aria-label={text}
        >
            {text.split(' ').map((word, i) => (
                <motion.span
                    key={i}
                    variants={{
                        hidden: { opacity: 0, y: 40 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
                    }}
                    className="inline-block mr-3 lg:mr-5"
                >
                    {word}
                </motion.span>
            ))}
        </motion.h1>
    )
}

export default function StoryHero() {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
    const imageY  = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
    const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

    return (
        <>
            <div ref={ref} className="relative flex min-h-[88vh] flex-col justify-end overflow-hidden bg-dark">
                <motion.div className="absolute inset-0" style={{ y: imageY }}>
                    <Image src="/images/histoire-hero.png" alt="" fill priority sizes="100vw" className="object-cover opacity-40" />
                </motion.div>
                <div className="absolute inset-x-0 bottom-0 h-4/5 pointer-events-none"
                     style={{ background: 'linear-gradient(to top, var(--color-dark) 10%, transparent 100%)' }} />

                <motion.div
                    className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-44 lg:px-12 text-center"
                    style={{ opacity }}
                >
                    <motion.p
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="eyebrow mb-6"
                    >
                        {STORY_HERO.eyebrow}
                    </motion.p>

                    <SplitTitle text={STORY_HERO.title} />

                    <motion.p
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        transition={{ duration: 0.9, delay: 0.8 }}
                        className="mt-8 text-sm font-light leading-relaxed text-stone"
                    >
                        {STORY_HERO.description}
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
            <Marquee items={MARQUEE_ITEMS} speed={35} />
        </>
    )
}