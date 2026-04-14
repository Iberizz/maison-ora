'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function NotFound() {
    const containerRef = useRef<HTMLDivElement>(null)

    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const springX = useSpring(mouseX, { stiffness: 40, damping: 20 })
    const springY = useSpring(mouseY, { stiffness: 40, damping: 20 })

    const moveX = useTransform(springX, [-1, 1], ['-3%', '3%'])
    const moveY = useTransform(springY, [-1, 1], ['-3%', '3%'])

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        const rect = containerRef.current?.getBoundingClientRect()
        if (!rect) return
        mouseX.set((e.clientX - rect.left) / rect.width * 2 - 1)
        mouseY.set((e.clientY - rect.top) / rect.height * 2 - 1)
    }

    function handleMouseLeave() {
        mouseX.set(0)
        mouseY.set(0)
    }

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative flex min-h-screen items-center justify-center overflow-hidden bg-dark"
        >
            {/* Image atmosphérique */}
            <Image
                src="/images/not-found-bg.png"
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover opacity-25"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-dark/60" />

            {/* 404 géant — suit le curseur */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
                style={{ x: moveX, y: moveY }}
            >
        <span
            className="font-serif font-light text-cream"
            style={{
                fontSize: 'clamp(18rem, 40vw, 42rem)',
                lineHeight: 1,
                letterSpacing: '-0.05em',
                opacity: 0.06,
            }}
            aria-hidden
        >
          404
        </span>
            </motion.div>

            {/* Contenu centré */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 text-center px-6"
            >
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="eyebrow mb-10"
                >
                    Maison Ōra — 404
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="font-serif font-light text-cream leading-tight mb-4"
                    style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
                >
                    Cette table n'existe pas.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.55 }}
                    className="text-base font-light italic text-stone mb-14"
                    style={{ fontFamily: 'var(--font-serif)' }}
                >
                    Mais la nôtre vous attend.
                </motion.p>

                {/* Ornament */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center justify-center gap-4 mb-14"
                >
                    <span className="h-px w-16 block" style={{ backgroundColor: '#2a2a2a' }} />
                    <span className="h-1.5 w-1.5 rotate-45 block bg-gold" />
                    <span className="h-px w-16 block" style={{ backgroundColor: '#2a2a2a' }} />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.85 }}
                >
                    <Link href="/" className="btn-ora-gold">
                        <span className="h-px w-5 bg-current block" aria-hidden />
                        Retour à l'accueil
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    )
}