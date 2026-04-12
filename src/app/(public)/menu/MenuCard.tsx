'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import type { MenuItemRow } from './Menu.types'

// ─── Helpers ──────────────────────────────────────────────────────

function PriceBadge({ price, hovered }: { price: number; hovered: boolean }) {
    return (
        <div className="flex items-baseline gap-1">
      <span
          className="text-3xl font-light tabular-nums transition-colors duration-300"
          style={{
              fontFamily: 'var(--font-serif)',
              color: hovered ? 'var(--color-gold)' : 'var(--color-cream)',
          }}
      >
        {price.toFixed(0)}
      </span>
            <span
                className="text-sm font-light"
                style={{ color: 'var(--color-stone)' }}
            >
        €
      </span>
        </div>
    )
}

// ─── Card normale ─────────────────────────────────────────────────

export function MenuCard({
                             item,
                             index,
                         }: {
    item: MenuItemRow
    index: number
}) {
    const [hovered, setHovered] = useState(false)

    return (
        <motion.article
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: (index % 2) * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="group relative overflow-hidden cursor-pointer"
            style={{
                backgroundColor: 'var(--color-dark)',
                border: `0.5px solid ${hovered ? 'var(--color-gold)' : '#2a2a2a'}`,
                transition: 'border-color 0.4s ease',
            }}
        >
            {/* Image */}
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: '4/3' }}>
                {item.image ? (
                    <>
                        <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="(min-width: 768px) 50vw, 100vw"
                            className="object-cover transition-transform duration-700"
                            style={{ transform: hovered ? 'scale(1.07)' : 'scale(1)' }}
                        />
                        {/* Overlay hover */}
                        <div
                            className="absolute inset-0 transition-opacity duration-500"
                            style={{
                                background: 'linear-gradient(to top, rgba(13,13,13,0.9) 0%, rgba(13,13,13,0.2) 60%, transparent 100%)',
                                opacity: hovered ? 1 : 0.3,
                            }}
                        />
                        {/* Catégorie flottante */}
                        <div className="absolute top-4 left-4">
              <span
                  className="text-[9px] tracking-[0.25em] uppercase px-2 py-1"
                  style={{
                      backgroundColor: 'rgba(13,13,13,0.7)',
                      color: 'var(--color-gold)',
                      backdropFilter: 'blur(4px)',
                  }}
              >
                {item.category}
              </span>
                        </div>
                    </>
                ) : (
                    <div className="h-full w-full" style={{ backgroundColor: '#1a1a1a' }} />
                )}
            </div>

            {/* Contenu bas */}
            <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                        <h3
                            className="text-lg font-light leading-snug"
                            style={{
                                fontFamily: 'var(--font-serif)',
                                color: 'var(--color-cream)',
                            }}
                        >
                            {item.title}
                        </h3>
                        {item.description && (
                            <p
                                className="mt-2 text-xs font-light leading-relaxed line-clamp-2"
                                style={{ color: 'var(--color-stone)' }}
                            >
                                {item.description}
                            </p>
                        )}
                        {!item.available && (
                            <span
                                className="mt-2 inline-block text-[9px] tracking-[0.2em] uppercase"
                                style={{ color: 'var(--color-stone)' }}
                            >
                Indisponible
              </span>
                        )}
                    </div>
                    <PriceBadge price={item.price} hovered={hovered} />
                </div>
            </div>
        </motion.article>
    )
}

// ─── Card Signature — pleine largeur + tilt 3D ────────────────────

export function SignatureCard({
                                  item,
                              }: {
    item: MenuItemRow
}) {
    const ref = useRef<HTMLDivElement>(null)
    const [hovered, setHovered] = useState(false)

    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), { stiffness: 200, damping: 20 })
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), { stiffness: 200, damping: 20 })

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        const rect = ref.current?.getBoundingClientRect()
        if (!rect) return
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
    }

    function handleMouseLeave() {
        mouseX.set(0)
        mouseY.set(0)
        setHovered(false)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ perspective: 1000 }}
        >
            <motion.article
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    backgroundColor: 'var(--color-dark)',
                    border: `0.5px solid ${hovered ? 'var(--color-gold)' : '#2a2a2a'}`,
                    transition: 'border-color 0.4s ease',
                    transformStyle: 'preserve-3d',
                }}
                className="relative flex overflow-hidden cursor-pointer"
            >
                {/* Image gauche — 45% */}
                <div className="relative shrink-0 overflow-hidden" style={{ width: '45%', minHeight: '280px' }}>
                    {item.image ? (
                        <>
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                sizes="45vw"
                                className="object-cover transition-transform duration-700"
                                style={{ transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
                            />
                            <div
                                className="absolute inset-0 transition-opacity duration-500"
                                style={{
                                    background: 'linear-gradient(to right, transparent 60%, var(--color-dark) 100%)',
                                    opacity: hovered ? 1 : 0.5,
                                }}
                            />
                        </>
                    ) : (
                        <div className="h-full w-full" style={{ backgroundColor: '#1a1a1a' }} />
                    )}
                </div>

                {/* Contenu droite — 55% */}
                <div className="flex flex-1 flex-col justify-between p-8 lg:p-10">
                    <div>
                        {/* Eyebrow */}
                        <div className="mb-5 flex items-center gap-4">
              <span
                  className="text-[9px] tracking-[0.3em] uppercase"
                  style={{ color: 'var(--color-gold)' }}
              >
                Signature du Chef
              </span>
                            <div className="h-px flex-1" style={{ backgroundColor: '#2a2a2a' }} />
                        </div>

                        {/* Catégorie */}
                        <p
                            className="mb-2 text-[10px] tracking-[0.25em] uppercase"
                            style={{ color: 'var(--color-stone)' }}
                        >
                            {item.category}
                        </p>

                        {/* Titre */}
                        <h3
                            className="text-3xl font-light leading-tight"
                            style={{
                                fontFamily: 'var(--font-serif)',
                                color: 'var(--color-cream)',
                            }}
                        >
                            {item.title}
                        </h3>

                        {/* Description */}
                        {item.description && (
                            <p
                                className="mt-4 text-sm font-light leading-relaxed"
                                style={{ color: 'var(--color-stone)' }}
                            >
                                {item.description}
                            </p>
                        )}
                    </div>

                    {/* Prix + dispo */}
                    <div className="mt-6 flex items-center justify-between">
                        {!item.available && (
                            <span
                                className="text-[9px] tracking-[0.2em] uppercase"
                                style={{ color: 'var(--color-stone)' }}
                            >
                Indisponible
              </span>
                        )}
                        <div className="ml-auto">
                            <PriceBadge price={item.price} hovered={hovered} />
                        </div>
                    </div>
                </div>
            </motion.article>
        </motion.div>
    )
}
