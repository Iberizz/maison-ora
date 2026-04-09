'use client'

import { motion } from 'framer-motion'
import { useStats } from './useStats'
import { Stat, StatsProps } from './Stats.types'

const defaultStats: Stat[] = [
    { value: '3', label: 'Étoiles Michelin' },
    { value: '800', label: 'Expériences vécues' },
    { value: '1', label: 'Restaurant de Paris' },
]

const StatItem = ({ stat, index }: { stat: Stat, index: number }) => {
    const numericValue = parseInt(stat.value.replace(/\D/g, ''))
    const suffix = stat.value.replace(/[0-9]/g, '')
    const { count, ref } = useStats(numericValue)

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center px-8"
            style={{
                borderRight: index < defaultStats.length - 1
                    ? '1px solid rgba(201,169,110,0.15)'
                    : 'none',
            }}
        >
      <span
          className="font-serif font-light mb-4"
          style={{ fontSize: 'clamp(4rem, 8vw, 7rem)', color: '#C9A96E' }}
      >
        {index === 2 ? 'Nº1' : `${count}${suffix}`}
      </span>
            <span
                className="text-xs tracking-widest uppercase font-light"
                style={{ color: 'rgba(250,248,245,0.5)' }}
            >
        {stat.label}
      </span>
        </motion.div>
    )
}

const Stats = ({ stats = defaultStats }: StatsProps) => {
    return (
        <section
            className="bg-dark py-24 px-6"
            style={{ borderTop: '1px solid rgba(201,169,110,0.2)' }}
        >
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-0">
                {stats.map((stat, i) => (
                    <StatItem key={i} stat={stat} index={i} />
                ))}
            </div>
        </section>
    )
}

export default Stats