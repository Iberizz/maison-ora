'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { MenuItemRow, MenuCategory, CategoryFilterProps } from './Menu.types'
import MenuHero from './MenuHero'
import MenuList from './MenuList'

interface MenuClientProps {
    initialItems: MenuItemRow[]
}

// ─── CTA Final — section noire ─────────────────────────────────────

function MenuCTA() {
    return (
        <section
            className="py-24 text-center"
            style={{ backgroundColor: 'var(--color-dark)' }}
        >
            <div className="mx-auto max-w-lg px-6">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    <p
                        className="mb-3 text-[10px] tracking-[0.35em] uppercase"
                        style={{ color: 'var(--color-gold)' }}
                    >
                        Maison Ōra
                    </p>
                    <h2
                        className="mb-4 text-4xl font-light leading-tight"
                        style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-cream)' }}
                    >
                        Réservez votre table
                    </h2>
                    <p
                        className="mb-10 text-sm font-light"
                        style={{ color: 'var(--color-stone)' }}
                    >
                        Ouvert mardi — samedi · 19h00 – 22h30
                    </p>

                    <Link
                        href="/reservation"
                        className="inline-flex items-center gap-4 px-12 py-4 text-xs tracking-[0.3em] uppercase transition-all duration-400 group"
                        style={{
                            border: '1px solid var(--color-gold)',
                            color: 'var(--color-gold)',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--color-gold)'
                            e.currentTarget.style.color = 'var(--color-dark)'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent'
                            e.currentTarget.style.color = 'var(--color-gold)'
                        }}
                    >
            <span
                className="h-px w-5 transition-all duration-300 group-hover:w-8"
                style={{ backgroundColor: 'currentColor' }}
                aria-hidden
            />
                        Réserver
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}

// ─── CTA Flottant Mobile ──────────────────────────────────────────

function FloatingCTA() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 md:hidden"
        >
            <Link
                href="/reservation"
                className="flex items-center gap-3 px-8 py-3.5 text-xs tracking-[0.25em] uppercase"
                style={{
                    backgroundColor: 'var(--color-dark)',
                    color: 'var(--color-gold)',
                    border: '1px solid var(--color-gold)',
                }}
            >
                <span className="h-px w-4" style={{ backgroundColor: 'var(--color-gold)' }} aria-hidden />
                Réserver
            </Link>
        </motion.div>
    )
}

// ─── Shell principal ──────────────────────────────────────────────

export default function MenuClient({ initialItems }: MenuClientProps) {
    const [activeCategory, setActiveCategory] =
        useState<MenuCategory | 'all'>('all')

    return (
        <>
            <MenuHero />
            <MenuList
                items={initialItems}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
            />
            <MenuCTA />
            <FloatingCTA />
        </>
    )
}
