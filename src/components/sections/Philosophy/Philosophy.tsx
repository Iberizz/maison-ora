'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const words = ['La', 'précision', 'comme', 'langage']

const Philosophy = () => {
    const sectionRef = useRef(null)
    const imageRef = useRef(null)

    const { scrollYProgress: sectionProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    })

    const { scrollYProgress: imageProgress } = useScroll({
        target: imageRef,
        offset: ['start end', 'end start'],
    })

    const imageY = useTransform(imageProgress, [0, 1], ['-10%', '10%'])

    return (
        <section
            ref={sectionRef}
            className="grid grid-cols-1 md:grid-cols-2 min-h-screen overflow-hidden"
        >
            <div
                className="flex flex-col justify-center px-16 py-32"
                style={{ backgroundColor: '#FAF8F5' }}
            >
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-xs tracking-widest uppercase font-light mb-10"
                    style={{ color: '#C9A96E' }}
                >
                    Notre philosophie
                </motion.span>

                <h2 className="mb-10 overflow-hidden" style={{ color: '#0F0E0D' }}>
                    {words.map((word, i) => (
                        <motion.span
                            key={i}
                            initial={{ opacity: 0, y: '100%' }}
                            whileInView={{ opacity: 1, y: '0%' }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.7,
                                delay: i * 0.12,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="inline-block mr-4"
                        >
                            {word}
                        </motion.span>
                    ))}
                </h2>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="font-light text-lg leading-relaxed mb-6"
                    style={{ color: '#6B6560' }}
                >
                    Chez Maison Ōra, chaque assiette est une déclaration. Nous ne cuisinons pas pour nourrir — nous créons pour émouvoir.
                </motion.p>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.65 }}
                    className="font-light text-lg leading-relaxed mb-14"
                    style={{ color: '#6B6560' }}
                >
                    Nos produits viennent de producteurs qui partagent notre obsession du détail. Nos gestes, affinés sur douze ans, transforment le simple en mémorable.
                </motion.p>

                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '3rem' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="h-px"
                    style={{ backgroundColor: '#C9A96E' }}
                />
            </div>

            <div ref={imageRef} className="relative min-h-screen overflow-hidden">
                <motion.div
                    style={{ y: imageY }}
                    className="absolute inset-0 scale-110"
                >
                    <Image
                        src="/images/philosophy.png"
                        alt="La philosophie de Maison Ōra"
                        fill
                        className="object-cover"
                    />
                </motion.div>
            </div>
        </section>
    )
}

export default Philosophy