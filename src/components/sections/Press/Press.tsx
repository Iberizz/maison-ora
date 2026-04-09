'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePress } from './usePress'
import { PressQuote, PressAward } from './Press.types'

const quotes: PressQuote[] = [
    {
        quote: 'La table la plus aboutie de Paris. Une précision chirurgicale au service de l\'émotion pure.',
        author: 'Jean-Pierre Corbeau',
        media: 'Le Monde',
    },
    {
        quote: 'Maison Ōra redéfinit ce que signifie dîner à Paris. Chaque plat est une œuvre d\'art comestible.',
        author: 'Sophie Brissaud',
        media: 'Le Figaro Madame',
    },
    {
        quote: 'Une expérience totale. L\'un des rares restaurants où le silence s\'installe naturellement entre les bouchées.',
        author: 'François Simon',
        media: 'Forbes France',
    },
]

const awards: PressAward[] = [
    { title: '3 Étoiles', subtitle: 'Guide Michelin' },
    { title: '19.5 / 20', subtitle: 'GaultMillau' },
    { title: 'Nº1 Paris', subtitle: 'Best of Paris 2025' },
    { title: 'Top 50', subtitle: 'World\'s Best Restaurants' },
]

const Press = () => {
    const { index, direction, next, prev } = usePress(quotes.length)
    const current = quotes[index]
    const words = current.quote.split(' ')

    return (
        <section className="py-32 px-6" style={{ backgroundColor: '#FAF8F5' }}>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">

                <div>
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-xs tracking-widest uppercase font-light mb-12 block"
                        style={{ color: '#C9A96E' }}
                    >
                        Ils parlent de nous
                    </motion.span>

                    <AnimatePresence mode="wait">
                        <motion.div key={index}>
                            <blockquote
                                className="font-serif font-light italic mb-8 leading-tight"
                                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: '#0F0E0D' }}
                            >
                                {words.map((word, i) => (
                                    <motion.span
                                        key={`${index}-${i}`}
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.4,
                                            delay: i * 0.04,
                                            ease: [0.16, 1, 0.3, 1],
                                        }}
                                        className="inline-block mr-2"
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                            </blockquote>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: words.length * 0.04 + 0.2 }}
                            >
                <span
                    className="text-xs tracking-widest uppercase font-light block mb-1"
                    style={{ color: '#6B6560' }}
                >
                  {current.author}
                </span>
                                <span
                                    className="text-xs tracking-widest uppercase font-light"
                                    style={{ color: '#C9A96E' }}
                                >
                  {current.media}
                </span>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>

                    <div className="flex gap-6 mt-12">
                        <button
                            onClick={prev}
                            className="text-sm font-light transition-all duration-300"
                            style={{ color: '#6B6560' }}
                            onMouseEnter={e => (e.currentTarget.style.color = '#C9A96E')}
                            onMouseLeave={e => (e.currentTarget.style.color = '#6B6560')}
                        >
                            ←
                        </button>
                        <div className="flex gap-2 items-center">
                            {quotes.map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{ width: i === index ? '1.5rem' : '0.4rem' }}
                                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                    className="h-px"
                                    style={{ backgroundColor: i === index ? '#C9A96E' : '#D3D1C7' }}
                                />
                            ))}
                        </div>
                        <button
                            onClick={next}
                            className="text-sm font-light transition-all duration-300"
                            style={{ color: '#6B6560' }}
                            onMouseEnter={e => (e.currentTarget.style.color = '#C9A96E')}
                            onMouseLeave={e => (e.currentTarget.style.color = '#6B6560')}
                        >
                            →
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-0">
                    {awards.map((award, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{ x: 8 }}
                            className="flex items-center justify-between py-6 cursor-default"
                            style={{ borderBottom: '1px solid #E0DDD7' }}
                        >
              <span
                  className="font-serif font-light"
                  style={{ fontSize: '1.5rem', color: '#0F0E0D' }}
              >
                {award.title}
              </span>
                            <span
                                className="text-xs tracking-widest uppercase font-light"
                                style={{ color: '#C9A96E' }}
                            >
                {award.subtitle}
              </span>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    )
}

export default Press