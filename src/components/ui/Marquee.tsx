'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface MarqueeProps {
    items: string[]
    speed?: number        // px/s — default 60
    direction?: 'left' | 'right'
    bgColor?: string
    textColor?: string
    separator?: string
}

export default function Marquee({
                                    items,
                                    speed = 60,
                                    direction = 'left',
                                    bgColor = 'var(--color-dark)',
                                    textColor = 'var(--color-gold)',
                                    separator = '·',
                                }: MarqueeProps) {
    // On duplique les items pour le loop infini
    const repeated = [...items, ...items, ...items]
    const duration = (items.length * 120) / speed

    return (
        <div
            className="relative overflow-hidden py-4"
            style={{ backgroundColor: bgColor }}
            aria-hidden
        >
            <motion.div
                className="flex shrink-0 gap-8 whitespace-nowrap"
                animate={{ x: direction === 'left' ? ['0%', '-33.333%'] : ['-33.333%', '0%'] }}
                transition={{ duration, ease: 'linear', repeat: Infinity }}
            >
                {repeated.map((item, i) => (
                    <span
                        key={i}
                        className="flex items-center gap-8 text-[11px] tracking-[0.3em] uppercase font-light"
                        style={{ color: textColor }}
                    >
            {item}
                        <span style={{ color: textColor, opacity: 0.4 }}>{separator}</span>
          </span>
                ))}
            </motion.div>
        </div>
    )
}
