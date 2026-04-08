'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MenuItem } from './Menu.types'

const items: MenuItem[] = [
    {
        title: 'Bar de ligne, écume iodée',
        description: 'Fèves, concombre de mer, microgreens du jardin',
        category: 'Poisson',
        image: '/images/menu-fish.png',
    },
    {
        title: 'Betterave & truffe noire',
        description: 'Crème de chou-fleur, fleurs comestibles, graines torréfiées',
        category: 'Végétal',
        image: '/images/menu-vegetal.png',
    },
    {
        title: 'Sphère chocolat grand cru',
        description: 'Coulis framboise, feuilletine, feuille d\'or',
        category: 'Dessert',
        image: '/images/menu-dessert.png',
    },
]

const MenuCard = ({ item, index }: { item: MenuItem, index: number }) => {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    })
    const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex-shrink-0 w-96 overflow-hidden cursor-pointer group"
            style={{ height: '520px' }}
        >
            <div className="absolute inset-0 overflow-hidden">
                <motion.div style={{ y: imageY }} className="absolute inset-0 scale-110">
                    <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </motion.div>
            </div>

            <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(15,14,13,0.9) 0%, rgba(15,14,13,0.2) 50%, transparent 100%)' }}
            />

            <div className="absolute bottom-0 left-0 right-0 p-8">
        <span
            className="text-xs tracking-widest uppercase font-light mb-3 block"
            style={{ color: '#C9A96E' }}
        >
          {item.category}
        </span>
                <h3
                    className="mb-3 font-serif font-light"
                    style={{ color: '#FAF8F5', fontSize: '1.4rem', lineHeight: 1.2 }}
                >
                    {item.title}
                </h3>
                <p
                    className="text-sm font-light leading-relaxed"
                    style={{ color: 'rgba(250,248,245,0.6)' }}
                >
                    {item.description}
                </p>
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '2rem' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 + index * 0.15 }}
                    className="h-px mt-6"
                    style={{ backgroundColor: '#C9A96E' }}
                />
            </div>
        </motion.div>
    )
}

const Menu = () => {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    })
    const x = useTransform(scrollYProgress, [0, 1], ['15%', '-15%'])

    return (
        <section
            ref={containerRef}
            className="py-32 overflow-hidden"
            style={{ backgroundColor: '#0F0E0D' }}
        >
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="px-16 mb-16"
            >
        <span
            className="text-xs tracking-widest uppercase font-light mb-4 block"
            style={{ color: '#C9A96E' }}
        >
          Nos signatures
        </span>
                <h2 style={{ color: '#FAF8F5' }}>La carte</h2>
            </motion.div>

            <motion.div
                style={{ x }}
                className="flex gap-8 px-16"
            >
                {items.map((item, i) => (
                    <MenuCard key={i} item={item} index={i} />
                ))}
            </motion.div>
        </section>
    )
}

export default Menu