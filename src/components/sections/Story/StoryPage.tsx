'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { STORY_CHAPTERS, STORY_CLOSING, STORY_FACTS, STORY_HERO, STORY_MILESTONES } from './Story.data'

const StoryPage = () => {
    return (
        <main className="bg-cream pt-20">
            <section className="relative min-h-[80vh] overflow-hidden border-b border-border">
                <div className="absolute inset-0">
                    <Image
                        src="/images/philosophy.png"
                        alt="Cuisine Maison Ora"
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-dark/55" />
                </div>
                <div className="relative mx-auto flex min-h-[80vh] max-w-7xl items-end px-6 pb-16 lg:pb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="max-w-3xl"
                    >
                        <p className="mb-4 text-xs uppercase tracking-[0.32em] text-gold">
                            {STORY_HERO.eyebrow}
                        </p>
                        <h1 className="mb-5 font-serif text-4xl text-cream sm:text-6xl">
                            {STORY_HERO.title}
                        </h1>
                        <p className="text-sm leading-relaxed text-cream/80 sm:text-base">
                            {STORY_HERO.description}
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="mb-10"
                >
                    <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold">
                        Signatures
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 gap-4 border-y border-border py-8 sm:grid-cols-4">
                    {STORY_FACTS.map((fact) => (
                        <div key={fact.label}>
                            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-stone">
                                {fact.label}
                            </p>
                            <p className="font-serif text-2xl text-dark">{fact.value}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mx-auto max-w-7xl space-y-10 px-6 py-8 lg:py-12">
                {STORY_CHAPTERS.map((chapter, index) => {
                    const reversed = index % 2 !== 0
                    return (
                        <motion.article
                            key={chapter.id}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                            className={`grid items-stretch gap-0 overflow-hidden rounded-2xl border border-border bg-white md:grid-cols-2 ${reversed ? 'md:[&>*:first-child]:order-2' : ''}`}
                        >
                            <div className="relative min-h-[260px]">
                                <Image
                                    src={chapter.imageSrc}
                                    alt={chapter.title}
                                    fill
                                    sizes="(min-width: 768px) 50vw, 100vw"
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex flex-col justify-center p-7 sm:p-10">
                                <p className="mb-3 text-xs uppercase tracking-[0.28em] text-gold">
                                    {chapter.eyebrow}
                                </p>
                                <h2 className="mb-4 font-serif text-3xl text-dark">{chapter.title}</h2>
                                <p className="text-sm leading-relaxed text-stone sm:text-base">
                                    {chapter.description}
                                </p>
                            </div>
                        </motion.article>
                    )
                })}
            </section>

            <section className="mx-auto max-w-7xl px-6 py-14 lg:py-20">
                <p className="mb-8 text-xs uppercase tracking-[0.3em] text-gold">Timeline</p>
                <div className="space-y-4">
                    {STORY_MILESTONES.map((item, index) => (
                        <motion.div
                            key={`${item.year}-${item.title}`}
                            initial={{ opacity: 0, x: -16 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45, delay: index * 0.06 }}
                            className="grid grid-cols-1 gap-3 border-b border-border py-5 md:grid-cols-[120px_1fr]"
                        >
                            <span className="text-xs uppercase tracking-[0.2em] text-gold">{item.year}</span>
                            <div>
                                <h3 className="mb-1 font-serif text-xl text-dark">{item.title}</h3>
                                <p className="text-sm leading-relaxed text-stone">{item.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 pb-24 pt-8 lg:pb-32">
                <div className="rounded-2xl border border-border bg-dark px-8 py-14 text-center sm:px-14">
                    <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold">Finale</p>
                    <h2 className="mb-4 font-serif text-4xl text-cream">{STORY_CLOSING.title}</h2>
                    <p className="mx-auto max-w-2xl text-sm leading-relaxed text-cream/80 sm:text-base">
                        {STORY_CLOSING.description}
                    </p>
                </div>
            </section>
        </main>
    )
}

export default StoryPage
