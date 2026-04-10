// MenuPage.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useMenu } from './useMenu'
import { MENU_CATEGORIES } from './Menu.types'
import type { MenuItemRow, CategoryFilterProps } from './Menu.types'
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";

// ─── Tokens Maison Ōra ────────────────────────────────────────────
const ORA = {
  cream:  '#F5F0E8',
  noir:   '#0D0D0D',
  gold:   '#C9A96E',
  muted:  '#8A8578',
  border: '#E2DDD4',
} as const

// ─── Category Filter — style nav éditoriale ───────────────────────
function CategoryFilter({ activeCategory, onChange }: CategoryFilterProps) {
  const all = [{ label: 'Tout', value: 'all' as const }, ...MENU_CATEGORIES]

  return (
      <nav className="flex items-center gap-8 overflow-x-auto scrollbar-hide">
        {all.map((cat) => {
          const isActive = activeCategory === cat.value
          return (
              <button
                  key={cat.value}
                  onClick={() => onChange(cat.value as any)}
                  className="relative shrink-0 pb-1 text-xs tracking-[0.25em] uppercase transition-colors duration-300"
                  style={{ color: isActive ? ORA.noir : ORA.muted }}
              >
                {cat.label}
                {/* Underline animé */}
                {isActive && (
                    <motion.span
                        layoutId="filter-underline"
                        className="absolute bottom-0 left-0 right-0 h-px"
                        style={{ backgroundColor: ORA.gold }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                )}
              </button>
          )
        })}
      </nav>
  )
}

// ─── Menu Row — ligne éditoriale avec hover reveal ────────────────
function MenuRow({ item, index }: { item: MenuItemRow; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
      <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, delay: index * 0.04, ease: [0.25, 0.1, 0.25, 1] }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="group cursor-default"
      >
        {/* Ligne principale */}
        <div
            className="flex items-baseline gap-4 py-5 transition-colors duration-200"
            style={{ borderBottom: `1px solid ${ORA.border}` }}
        >
          {/* Numéro */}
          <span
              className="w-6 shrink-0 text-[10px] tabular-nums transition-colors duration-200"
              style={{ color: hovered ? ORA.gold : ORA.border }}
          >
          {String(index + 1).padStart(2, '0')}
        </span>

          {/* Nom du plat */}
          <span
              className="flex-1 text-lg font-normal leading-tight transition-colors duration-200"
              style={{
                fontFamily: 'var(--font-serif)',
                color: item.is_available ? ORA.noir : ORA.muted,
              }}
          >
          {item.name}
            {!item.is_available && (
                <span
                    className="ml-3 text-[9px] tracking-[0.2em] uppercase align-middle"
                    style={{ color: ORA.muted }}
                >
              · Indisponible
            </span>
            )}
        </span>

          {/* Pointillés décoratifs */}
          <span
              className="hidden flex-1 overflow-hidden sm:block"
              style={{ color: ORA.border }}
              aria-hidden
          >
          {'· '.repeat(60)}
        </span>

          {/* Prix */}
          <span
              className="shrink-0 text-lg font-normal tabular-nums transition-colors duration-200"
              style={{
                fontFamily: 'var(--font-serif)',
                color: hovered ? ORA.gold : ORA.noir,
              }}
          >
          {item.price.toFixed(2)} €
        </span>
        </div>

        {/* Description reveal au hover */}
        <AnimatePresence>
          {hovered && item.description && (
              <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="overflow-hidden"
              >
                <p
                    className="py-3 pl-10 text-sm leading-relaxed"
                    style={{ color: ORA.muted }}
                >
                  {item.description}
                </p>
              </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
  )
}

// ─── Page principale ──────────────────────────────────────────────
export default function MenuPage() {
  const { filteredItems, activeCategory, isLoading, error, setActiveCategory } =
      useMenu()

  return (
      <>
        <Navbar />
      <main style={{ backgroundColor: ORA.cream }} className="min-h-screen">
        <div className="mx-auto max-w-4xl px-6 pb-32 pt-28 lg:px-12">

          {/* Header */}
          <header className="mb-16">
            <p
                className="mb-5 text-[10px] tracking-[0.35em] uppercase"
                style={{ color: ORA.gold }}
            >
              Maison Ōra — Paris
            </p>
            <h1
                className="mb-12 text-6xl font-normal leading-none sm:text-7xl"
                style={{ fontFamily: 'var(--font-serif)', color: ORA.noir }}
            >
              La Carte
            </h1>

            {/* Séparateur + Filtres */}
            <div
                className="flex items-center gap-10"
                style={{ borderTop: `1px solid ${ORA.border}`, paddingTop: '1.5rem' }}
            >
              <CategoryFilter
                  activeCategory={activeCategory}
                  onChange={setActiveCategory}
              />
            </div>
          </header>

          {/* Loading */}
          {isLoading && (
              <div className="flex justify-center py-32">
                <div
                    className="h-5 w-5 animate-spin rounded-full border"
                    style={{ borderColor: ORA.border, borderTopColor: ORA.gold }}
                />
              </div>
          )}

          {/* Error */}
          {error && (
              <p className="py-16 text-center text-sm tracking-wide" style={{ color: ORA.muted }}>
                {error}
              </p>
          )}

          {/* Liste éditoriale */}
          {!isLoading && !error && (
              <AnimatePresence mode="popLayout">
                <motion.div layout>
                  {filteredItems.map((item, i) => (
                      <MenuRow key={item.id} item={item} index={i} />
                  ))}
                </motion.div>
              </AnimatePresence>
          )}

          {/* Empty state */}
          {!isLoading && !error && filteredItems.length === 0 && (
              <p
                  className="py-20 text-center text-sm tracking-[0.2em] uppercase"
                  style={{ color: ORA.muted }}
              >
                Aucun plat dans cette catégorie
              </p>
          )}

          {/* Footer note */}
          {!isLoading && !error && filteredItems.length > 0 && (
              <p
                  className="mt-12 text-center text-[10px] tracking-[0.2em] uppercase"
                  style={{ color: ORA.muted }}
              >
                Les prix sont indiqués en euros, service compris.
              </p>
          )}

        </div>
      </main>
        <Footer />
      </>
  )
}