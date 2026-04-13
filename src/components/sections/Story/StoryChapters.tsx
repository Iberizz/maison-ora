'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { STORY_CHAPTERS } from './Story.data'

export default function StoryChapters() {
    return (
        <section>
            <div className="mx-auto max-w-7xl px-6 lg:px-12 py-12">
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="eyebrow mb-16"
                >
                    L'histoire
                </motion.p>
            </div>

            {STORY_CHAPTERS.map((chapter, i) => (
                <motion.div
                    key={chapter.id}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8 }}
                    className="relative min-h-[80vh] flex items-center overflow-hidden"
                    style={{ backgroundColor: i % 2 === 0 ? '#0F0E0D' : '#F5F0E8' }}
                >
                    {/* Image plein fond */}
                    <Image
                        src={chapter.imageSrc}
                        alt={chapter.title}
                        fill
                        sizes="100vw"
                        className="object-cover"
                        style={{ opacity: i % 2 === 0 ? 0.25 : 0.15 }}
                    />

                    {/* Contenu */}
                    <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-12 py-24">
                        <div className="max-w-xl">
                            {/* Numéro décoratif */}
                            <span
                                className="block font-serif font-light leading-none mb-6 select-none"
                                style={{
                                    fontSize: 'clamp(6rem, 15vw, 12rem)',
                                    color: i % 2 === 0 ? 'rgba(201,169,110,0.15)' : 'rgba(15,14,13,0.08)',
                                    position: 'absolute',
                                    top: '2rem',
                                    right: '3rem',
                                }}
                                aria-hidden
                            >
                {String(i + 1).padStart(2, '0')}
              </span>

                            <p className="eyebrow mb-5">{chapter.eyebrow}</p>

                            <h2
                                className="font-serif font-light leading-tight mb-6"
                                style={{
                                    fontSize: 'clamp(3rem, 6vw, 5.5rem)',
                                    color: i % 2 === 0 ? '#FAF8F5' : '#0F0E0D',
                                }}
                            >
                                {chapter.title}
                            </h2>

                            <span className="ora-line-gold block w-12 mb-8" />

                            <p
                                className="text-base font-light leading-relaxed"
                                style={{ color: i % 2 === 0 ? 'rgba(250,248,245,0.7)' : '#6B6560' }}
                            >
                                {chapter.description}
                            </p>
                        </div>
                    </div>
                </motion.div>
            ))}
        </section>
    )
}