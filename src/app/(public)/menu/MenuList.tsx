'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { MENU_CATEGORIES } from './Menu.types'
import type { MenuItemRow, CategoryFilterProps } from './Menu.types'
import { MenuCard, SignatureCard } from './MenuCard'

// ─── Category Filter ──────────────────────────────────────────────

function CategoryFilter({ activeCategory, onChange, items }: CategoryFilterProps & { items: MenuItemRow[] }) {
    const all = [{ label: 'Tout', value: 'all' as const }, ...MENU_CATEGORIES]

    const countFor = (value: string) =>
        value === 'all'
            ? items.length
            : items.filter((i) => i.category === value).length

    return (
        <nav className="flex items-center gap-6 overflow-x-auto pb-1 scrollbar-hide">
            {all.map((cat) => {
                const isActive = activeCategory === cat.value
                const count = countFor(cat.value)
                return (
                    <button
                        key={cat.value}
                        onClick={() => onChange(cat.value)}
                        className="relative shrink-0 flex flex-col items-start pb-3 transition-colors duration-300"
                        style={{ color: isActive ? 'var(--color-dark)' : 'var(--color-stone)' }}
                    >
                        <span className="text-xs tracking-[0.25em] uppercase">{cat.label}</span>
                        <span
                            className="mt-0.5 text-[10px]"
                            style={{ color: isActive ? 'var(--color-gold)' : 'var(--color-stone)', opacity: 0.7 }}
                        >
              {count} plat{count > 1 ? 's' : ''}
            </span>
                        {isActive && (
                            <motion.span
                                layoutId="filter-underline"
                                className="absolute bottom-0 left-0 right-0 h-px"
                                style={{ backgroundColor: 'var(--color-gold)' }}
                                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                            />
                        )}
                    </button>
                )
            })}
        </nav>
    )
}

// ─── Ornament ─────────────────────────────────────────────────────

function Ornament() {
    return (
        <div className="flex items-center justify-center gap-4">
            <div className="h-px flex-1" style={{ backgroundColor: 'var(--color-border)' }} />
            <div className="h-1.5 w-1.5 rotate-45" style={{ backgroundColor: 'var(--color-gold)' }} />
            <div className="h-px flex-1" style={{ backgroundColor: 'var(--color-border)' }} />
        </div>
    )
}

// ─── MenuList ─────────────────────────────────────────────────────

interface MenuListProps {
    items: MenuItemRow[]
    activeCategory: CategoryFilterProps['activeCategory']
    setActiveCategory: (c: CategoryFilterProps['activeCategory']) => void
}

export default function MenuList({ items, activeCategory, setActiveCategory }: MenuListProps) {
    const filtered =
        activeCategory === 'all'
            ? items
            : items.filter((i) => i.category === activeCategory)

    const isSignature = (item: MenuItemRow) => item.price > 28

    return (
        <section
            className="py-20"
            style={{ backgroundColor: 'var(--color-cream)' }}
        >
            <div className="mx-auto max-w-5xl px-6 lg:px-12">

                {/* Header filtres */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-14"
                >
                    <p
                        className="mb-6 text-[10px] tracking-[0.35em] uppercase"
                        style={{ color: 'var(--color-gold)' }}
                    >
                        Choisissez votre moment
                    </p>
                    <CategoryFilter
                        activeCategory={activeCategory}
                        onChange={setActiveCategory}
                        items={items}
                    />
                    <div className="mt-6">
                        <Ornament />
                    </div>
                </motion.div>

                {/* Grille */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col gap-4"
                    >
                        {filtered.length === 0 && (
                            <p
                                className="py-20 text-center text-sm tracking-[0.2em] uppercase"
                                style={{ color: 'var(--color-stone)' }}
                            >
                                Aucun plat dans cette catégorie
                            </p>
                        )}

                        {filtered.map((item, i) =>
                            isSignature(item) ? (
                                <SignatureCard key={item.id} item={item} />
                            ) : null
                        )}

                        {/* Grille 2 colonnes pour les items normaux */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {filtered.map((item, i) =>
                                !isSignature(item) ? (
                                    <MenuCard key={item.id} item={item} index={i} />
                                ) : null
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Note bas */}
                {filtered.length > 0 && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mt-16 text-center text-[10px] tracking-[0.25em] uppercase"
                        style={{ color: 'var(--color-stone)' }}
                    >
                        Prix en euros · Service compris · Selon arrivages
                    </motion.p>
                )}

            </div>
        </section>
    )
}
