'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { STORY_FACTS } from './Story.data'

function Counter({ value }: { value: string }) {
    const ref = useRef<HTMLSpanElement>(null)
    const [displayed, setDisplayed] = useState('0')
    const hasDigits = /^\d/.test(value)
    const numeric = parseInt(value.replace(/\D/g, ''), 10)
    const suffix = value.replace(/\d/g, '')

    useEffect(() => {
        if (!hasDigits) { setDisplayed(value); return }
        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return
            observer.disconnect()
            const start = performance.now()
            const duration = 1600
            const tick = (now: number) => {
                const progress = Math.min((now - start) / duration, 1)
                const ease = 1 - Math.pow(1 - progress, 3)
                setDisplayed(String(Math.round(ease * numeric)))
                if (progress < 1) requestAnimationFrame(tick)
                else setDisplayed(String(numeric))
            }
            requestAnimationFrame(tick)
        }, { threshold: 0.5 })
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [numeric, hasDigits, value])

    return (
        <span ref={ref} className="font-serif font-light text-cream leading-none">
      {hasDigits ? displayed : value}{hasDigits ? suffix : ''}
    </span>
    )
}

export default function StoryNumbers() {
    return (
        <section className="bg-dark py-24 lg:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-12">

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="eyebrow mb-16"
                >
                    En chiffres
                </motion.p>

                <div className="grid grid-cols-2 gap-0 lg:grid-cols-4">
                    {STORY_FACTS.map((fact, i) => (
                        <motion.div
                            key={fact.label}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="border-l border-gold/30 px-8 py-6 first:border-l-0 lg:px-10"
                        >
                            <div style={{ fontSize: 'clamp(3.5rem, 6vw, 6rem)' }}>
                                <Counter value={fact.value} />
                            </div>
                            <p className="mt-3 text-[10px] tracking-label uppercase text-stone">
                                {fact.label}
                            </p>
                            <p className="mt-1 text-xs font-light italic text-stone/60">
                                {fact.subline}
                            </p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    )
}